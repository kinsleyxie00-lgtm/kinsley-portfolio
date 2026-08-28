import * as THREE from "three";
import type { LivingLeaf } from "@/src/objects/LivingLeaf";

export class BotanicalRaycaster {
  private readonly raycaster = new THREE.Raycaster();
  private readonly waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.82);
  private plants: LivingLeaf[] = [];

  registerPlants(plants: LivingLeaf[]) {
    this.plants = plants;
  }

  intersectPlant(pointer: THREE.Vector2, camera: THREE.Camera) {
    this.raycaster.setFromCamera(pointer, camera);
    const hits = this.raycaster.intersectObjects(this.plants.map((plant) => plant.hitObject), false);
    if (!hits.length) return null;
    return this.plants.find((plant) => plant.hitObject === hits[0].object) ?? null;
  }

  intersectWater(pointer: THREE.Vector2, camera: THREE.Camera, target: THREE.Vector3) {
    this.raycaster.setFromCamera(pointer, camera);
    return this.raycaster.ray.intersectPlane(this.waterPlane, target) !== null;
  }
}
