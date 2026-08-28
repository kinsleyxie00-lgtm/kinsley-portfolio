import * as THREE from "three";
import type { PointerState } from "@/src/types/botanical";

export class MouseEffects {
  readonly state: PointerState = {
    current: new THREE.Vector2(),
    target: new THREE.Vector2(),
    waterPoint: new THREE.Vector3(),
    hasWaterPoint: false,
  };

  setFromPointer(event: PointerEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    this.state.target.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -(((event.clientY - rect.top) / rect.height) * 2 - 1),
    );
  }

  update(delta: number) {
    const damping = 1 - Math.exp(-delta * 5.2);
    this.state.current.lerp(this.state.target, damping);
  }
}

