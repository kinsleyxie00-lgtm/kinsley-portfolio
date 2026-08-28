precision highp float;

uniform float uTime;
uniform vec4 uRipples[6];
uniform mat4 textureMatrix;

varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec4 vReflectionCoord;
varying float vDisplacement;

float rippleHeight(vec2 point, vec4 ripple) {
  float age = uTime - ripple.z;
  if (age < 0.0 || age > 4.2 || ripple.w <= 0.0) return 0.0;
  float distanceFromCenter = distance(point, ripple.xy);
  float front = age * 1.35;
  float ring = sin((distanceFromCenter - front) * 13.0);
  float envelope = exp(-abs(distanceFromCenter - front) * 2.2) * exp(-age * 0.62);
  return ring * envelope * ripple.w;
}

void main() {
  vec3 displaced = position;
  vec4 worldBase = modelMatrix * vec4(position, 1.0);
  vec2 waterPoint = worldBase.xz;
  float ambientWave = sin(waterPoint.x * 0.72 + uTime * 0.38) * 0.028;
  ambientWave += cos(waterPoint.y * 0.9 - uTime * 0.31) * 0.022;
  float ripple = 0.0;
  for (int i = 0; i < 6; i++) ripple += rippleHeight(waterPoint, uRipples[i]);
  float displacement = ambientWave + ripple * 0.075;
  displaced.z += displacement;

  vec4 world = modelMatrix * vec4(displaced, 1.0);
  vWorldPosition = world.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * vec3(-0.08 * cos(waterPoint.x + uTime), -0.08 * sin(waterPoint.y - uTime), 1.0));
  vReflectionCoord = textureMatrix * world;
  vDisplacement = displacement;
  gl_Position = projectionMatrix * viewMatrix * world;
}

/*__FRAGMENT__*/

precision highp float;

uniform sampler2D uReflectionTexture;
uniform vec3 uDeepColor;
uniform vec3 uShallowColor;
uniform float uTime;

varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec4 vReflectionCoord;
varying float vDisplacement;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
  float fresnel = pow(1.0 - max(dot(viewDirection, normalize(vWorldNormal)), 0.0), 3.1);
  vec2 reflectionUv = vReflectionCoord.xy / max(vReflectionCoord.w, 0.0001);
  reflectionUv += vec2(vDisplacement * 0.24, sin(vWorldPosition.x * 1.7 + uTime) * 0.004);
  vec3 reflection = texture2D(uReflectionTexture, reflectionUv).rgb;
  float depthTone = smoothstep(-0.08, 0.08, vDisplacement);
  vec3 waterColor = mix(uDeepColor, uShallowColor, depthTone * 0.34 + 0.18);
  vec3 finalColor = mix(waterColor, reflection, 0.62 + fresnel * 0.32);
  float rootContact = 1.0 - smoothstep(0.45, 3.15, distance(vWorldPosition.xz, vec2(0.0, -1.85)));
  finalColor *= 1.0 - rootContact * 0.08;
  finalColor += vec3(0.018, 0.036, 0.027);
  finalColor += vec3(0.025, 0.04, 0.03) * fresnel;
  gl_FragColor = vec4(finalColor, 0.94);
}
