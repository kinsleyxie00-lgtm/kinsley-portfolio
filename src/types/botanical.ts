import type * as THREE from "three";

export type PlantId = "about" | "experience" | "case" | "notes";
export type PlantState = "dormant" | "activated" | "mature";

export interface PlantDefinition {
  id: PlantId;
  label: string;
  number: string;
  target: string;
  position: THREE.Vector3Tuple;
  rotation: THREE.EulerTuple;
  scale: number;
}

export interface PlantProjection {
  id: PlantId;
  x: number;
  y: number;
  visible: boolean;
}

export interface PointerState {
  current: THREE.Vector2;
  target: THREE.Vector2;
  waterPoint: THREE.Vector3;
  hasWaterPoint: boolean;
}

export interface LeafUniforms {
  uTime: { value: number };
  uGrowthProgress: { value: number };
  uBreathProgress: { value: number };
  uHoverStrength: { value: number };
  uVeinProgress: { value: number };
  uGlowStrength: { value: number };
  uWindDirection: { value: THREE.Vector2 };
  uDormantColor: { value: THREE.Color };
  uGreenColor: { value: THREE.Color };
}
