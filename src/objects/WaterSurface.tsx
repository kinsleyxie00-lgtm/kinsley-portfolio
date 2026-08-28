import * as THREE from "three";
import waterShader from "@/src/shaders/waterRipple.glsl?raw";

const [waterVertexShader, waterFragmentShader] = waterShader.split("/*__FRAGMENT__*/");

interface Ripple {
  center: THREE.Vector2;
  startedAt: number;
  strength: number;
}

export class WaterSurface extends THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial> {
  private readonly ripples: Ripple[] = [];
  private readonly reflectionTarget: THREE.WebGLRenderTarget;
  private readonly reflectionCamera = new THREE.PerspectiveCamera();
  private readonly textureMatrix = new THREE.Matrix4();

  constructor(lowPower = false) {
    const geometry = new THREE.PlaneGeometry(11.2, 10.4, lowPower ? 64 : 144, lowPower ? 60 : 132);
    const reflectionTarget = new THREE.WebGLRenderTarget(lowPower ? 512 : 1024, lowPower ? 512 : 1024, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      type: THREE.HalfFloatType,
    });
    const rippleUniforms = Array.from({ length: 6 }, () => new THREE.Vector4(999, 999, -10, 0));
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRipples: { value: rippleUniforms },
        uReflectionTexture: { value: reflectionTarget.texture },
        uDeepColor: { value: new THREE.Color(0x4b514b) },
        uShallowColor: { value: new THREE.Color(0xb0afa5) },
        textureMatrix: { value: new THREE.Matrix4() },
      },
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      transparent: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    });
    super(geometry, material);
    this.reflectionTarget = reflectionTarget;
    this.rotation.x = -Math.PI / 2;
    this.position.set(0, -0.82, -0.35);
    this.receiveShadow = true;
    this.name = "water-nonnavigational";
  }

  addRipple(point: THREE.Vector3, time: number, strength = 0.38) {
    this.ripples.push({ center: new THREE.Vector2(point.x, point.z), startedAt: time, strength });
    while (this.ripples.length > 6) this.ripples.shift();
  }

  update(time: number) {
    for (let index = this.ripples.length - 1; index >= 0; index -= 1) {
      if (time - this.ripples[index].startedAt > 4.2) this.ripples.splice(index, 1);
    }
    this.material.uniforms.uTime.value = time;
    const uniforms = this.material.uniforms.uRipples.value as THREE.Vector4[];
    uniforms.forEach((uniform, index) => {
      const ripple = this.ripples[index];
      if (ripple) uniform.set(ripple.center.x, ripple.center.y, ripple.startedAt, ripple.strength);
      else uniform.set(999, 999, -10, 0);
    });
  }

  updateReflection(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    const cameraDirection = new THREE.Vector3();
    const mirroredTarget = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    mirroredTarget.copy(camera.position).add(cameraDirection);

    this.reflectionCamera.copy(camera);
    this.reflectionCamera.position.copy(camera.position);
    this.reflectionCamera.position.y = 2 * this.position.y - camera.position.y;
    mirroredTarget.y = 2 * this.position.y - mirroredTarget.y;
    this.reflectionCamera.up.copy(camera.up);
    this.reflectionCamera.up.y *= -1;
    this.reflectionCamera.lookAt(mirroredTarget);
    this.reflectionCamera.updateMatrixWorld();

    this.textureMatrix.set(
      0.5, 0, 0, 0.5,
      0, 0.5, 0, 0.5,
      0, 0, 0.5, 0.5,
      0, 0, 0, 1,
    );
    this.textureMatrix.multiply(this.reflectionCamera.projectionMatrix);
    this.textureMatrix.multiply(this.reflectionCamera.matrixWorldInverse);
    this.material.uniforms.textureMatrix.value.copy(this.textureMatrix);

    const currentTarget = renderer.getRenderTarget();
    const currentXr = renderer.xr.enabled;
    this.visible = false;
    renderer.xr.enabled = false;
    renderer.setRenderTarget(this.reflectionTarget);
    renderer.clear();
    renderer.render(scene, this.reflectionCamera);
    renderer.setRenderTarget(currentTarget);
    renderer.xr.enabled = currentXr;
    this.visible = true;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.reflectionTarget.dispose();
  }
}
