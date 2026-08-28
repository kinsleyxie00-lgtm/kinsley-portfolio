import * as THREE from "three";

export class CameraRig {
  readonly camera: THREE.PerspectiveCamera;
  private readonly home: THREE.Vector3;
  private readonly lookHome: THREE.Vector3;
  private readonly desiredPosition: THREE.Vector3;
  private readonly desiredLook: THREE.Vector3;

  constructor(aspect: number) {
    const mobile = aspect < 0.82;
    this.home = mobile ? new THREE.Vector3(0, 1.15, 9.4) : new THREE.Vector3(0, 1.42, 7.55);
    this.lookHome = mobile ? new THREE.Vector3(0, 0.2, -1.95) : new THREE.Vector3(0, 0.18, -1.9);
    this.desiredPosition = this.home.clone();
    this.desiredLook = this.lookHome.clone();
    this.camera = new THREE.PerspectiveCamera(mobile ? 50 : 44, aspect, 0.08, 70);
    this.camera.position.copy(this.home);
    this.camera.lookAt(this.lookHome);
  }

  resize(aspect: number) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  update(pointer: THREE.Vector2, delta: number, reducedMotion: boolean) {
    if (!reducedMotion) {
      this.desiredPosition.set(
        this.home.x + pointer.x * 0.46,
        this.home.y + pointer.y * 0.24,
        this.home.z - Math.abs(pointer.x) * 0.12,
      );
      this.desiredLook.set(pointer.x * 0.58, this.lookHome.y + pointer.y * 0.2, this.lookHome.z);
    }
    const damping = 1 - Math.exp(-delta * 2.6);
    this.camera.position.lerp(this.desiredPosition, damping);
    const look = new THREE.Vector3().lerpVectors(this.lookHome, this.desiredLook, 0.75);
    this.camera.lookAt(look);
  }

  setApproachTarget(worldPoint: THREE.Vector3, progress: number) {
    const direction = this.home.clone().sub(worldPoint).normalize();
    const approach = worldPoint.clone().add(direction.multiplyScalar(3.35)).add(new THREE.Vector3(0, 0.35, 0));
    this.desiredPosition.lerpVectors(this.home, approach, progress);
    this.desiredLook.lerpVectors(this.lookHome, worldPoint, progress);
  }

  reset() {
    this.desiredPosition.copy(this.home);
    this.desiredLook.copy(this.lookHome);
  }
}
