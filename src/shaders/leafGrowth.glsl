precision highp float;

uniform float uTime;
uniform float uGrowthProgress;
uniform float uBreathProgress;
uniform float uHoverStrength;
uniform vec2 uWindDirection;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  float rootToTip = smoothstep(0.0, 1.0, uv.y);
  float unfold = smoothstep(0.05, 0.92, uGrowthProgress);
  float dormantScale = 0.72 + 0.035 * sin(uBreathProgress * 6.28318);
  float matureScale = mix(dormantScale, 1.2, unfold);
  vec3 transformed = position;
  transformed.xy *= matureScale;
  transformed.x *= mix(0.25 + uv.y * 0.3, 1.0, unfold);
  transformed.z += (1.0 - unfold) * sin(uv.y * 3.14159) * 0.18;
  float wind = sin(uTime * 0.9 + uv.y * 3.4) * 0.018;
  wind += uHoverStrength * rootToTip * 0.075;
  transformed.x += (wind + uWindDirection.x * uHoverStrength * 0.045) * rootToTip;
  transformed.z += uWindDirection.y * uHoverStrength * 0.035 * rootToTip;
  vec4 world = modelMatrix * vec4(transformed, 1.0);
  vWorldPosition = world.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}

/*__FRAGMENT__*/

precision highp float;

uniform float uGrowthProgress;
uniform float uVeinProgress;
uniform float uGlowStrength;
uniform float uHoverStrength;
uniform vec3 uDormantColor;
uniform vec3 uGreenColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

float leafMask(vec2 uv) {
  vec2 p = uv * 2.0 - 1.0;
  float width = pow(sin(clamp(uv.y, 0.0, 1.0) * 3.14159), 0.62) * 0.96;
  float offset = sin(uv.y * 3.14159) * 0.045;
  return 1.0 - smoothstep(width - 0.075, width, abs(p.x - offset));
}

void main() {
  float mask = leafMask(vUv);
  if (mask < 0.02) discard;
  vec3 baseColor = mix(vec3(0.34, 0.36, 0.33), vec3(0.65, 0.67, 0.61), vUv.y * 0.34);
  float gray = dot(baseColor, vec3(0.299, 0.587, 0.114));
  vec3 grayscaleColor = mix(vec3(gray), uDormantColor, 0.42);
  vec3 greenColor = uGreenColor * (0.82 + vUv.y * 0.2);
  vec3 leafColor = mix(grayscaleColor, greenColor, smoothstep(0.0, 1.0, uGrowthProgress));

  float centralVein = 1.0 - smoothstep(0.008, 0.028, abs(vUv.x - 0.5));
  float sideVeins = pow(max(0.0, sin((vUv.x - 0.5) * 42.0 + vUv.y * 23.0)), 22.0);
  float veins = max(centralVein, sideVeins * 0.33) * uVeinProgress;
  leafColor = mix(leafColor, leafColor * 1.36, veins * 0.48);

  vec3 normal = normalize(vNormal);
  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
  float diffuse = 0.58 + max(dot(normal, normalize(vec3(-0.4, 0.8, 0.5))), 0.0) * 0.5;
  float rim = pow(1.0 - max(dot(viewDirection, normal), 0.0), 2.7);
  leafColor *= diffuse;
  leafColor += vec3(0.17, 0.27, 0.12) * rim * (uGlowStrength * 0.48 + uHoverStrength * 0.08);
  gl_FragColor = vec4(leafColor, mask);
}
