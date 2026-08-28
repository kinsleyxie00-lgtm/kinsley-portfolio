import * as THREE from "three";
import { gsap } from "gsap";
import { MuseumRoot } from "@/src/objects/MuseumRoot";
import { LivingLeaf } from "@/src/objects/LivingLeaf";
import { WaterSurface } from "@/src/objects/WaterSurface";
import { BotanicalRaycaster } from "@/src/interaction/Raycaster";
import { MouseEffects } from "@/src/interaction/MouseEffects";
import { CameraRig } from "@/src/scene/Camera";
import { GalleryRoom } from "@/src/scene/GalleryRoom";
import { createLighting } from "@/src/scene/Lighting";
import type { PlantDefinition, PlantId, PlantProjection } from "@/src/types/botanical";

export const PLANTS: PlantDefinition[] = [
  { id: "about", number: "01", label: "ABOUT", target: "about", position: [-1.72, -0.22, -1.28], rotation: [0.08, 0.35, -0.18], scale: 0.68 },
  { id: "experience", number: "02", label: "EXPERIENCE", target: "experience", position: [-0.58, 0.92, -1.7], rotation: [0.05, 0.08, -0.08], scale: 0.67 },
  { id: "case", number: "03", label: "CASE", target: "work", position: [2.1, 0.74, -2.2], rotation: [0.04, -0.34, 0.16], scale: 0.72 },
  { id: "notes", number: "04", label: "NOTES", target: "notes", position: [0.6, 2.72, -2.36], rotation: [0.12, -0.1, 0.14], scale: 0.62 },
];

interface WorldOptions {
  canvas: HTMLCanvasElement;
  reducedMotion: boolean;
  onHover: (id: PlantId | null) => void;
  onPlantState: (id: PlantId, state: "activated" | "mature") => void;
  onProjection: (projections: PlantProjection[]) => void;
  onNavigate: (target: string) => void;
  initialMature: PlantId[];
  onReady: () => void;
  onFailure: () => void;
}

export class World {
  readonly scene = new THREE.Scene();
  readonly renderer: THREE.WebGLRenderer;
  readonly cameraRig: CameraRig;
  readonly plants: LivingLeaf[];
  private readonly room = new GalleryRoom();
  private readonly root: MuseumRoot;
  private readonly water: WaterSurface;
  private readonly mouse = new MouseEffects();
  private readonly raycaster = new BotanicalRaycaster();
  private readonly options: WorldOptions;
  private readonly resizeObserver: ResizeObserver;
  private readonly visibilityObserver: IntersectionObserver;
  private animationFrame = 0;
  private running = true;
  private activePlant: LivingLeaf | null = null;
  private hoveredPlant: LivingLeaf | null = null;
  private lastRippleAt = 0;
  private elapsedTime = 0;
  private lastFrameAt = performance.now();
  private cameraProgress = { value: 0 };
  private cameraTimeline: gsap.core.Timeline | gsap.core.Tween | null = null;
  private touchFocus: LivingLeaf | null = null;
  private lastProjectionAt = 0;

  constructor(options: WorldOptions) {
    this.options = options;
    const { canvas } = options;
    const rect = canvas.getBoundingClientRect();
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 820 ? 1.35 : 1.8));
    this.renderer.setSize(rect.width, rect.height, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.shadowMap.enabled = window.innerWidth >= 820;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.scene.background = new THREE.Color(0x8f8a80);
    this.scene.fog = new THREE.FogExp2(0xa6a096, 0.014);
    this.cameraRig = new CameraRig(rect.width / rect.height);
    this.water = new WaterSurface(window.innerWidth < 820);
    this.root = new MuseumRoot({ onSettled: () => this.options.onReady() });
    this.plants = PLANTS.map((definition) => new LivingLeaf(definition));
    this.plants.forEach((plant) => {
      if (options.initialMature.includes(plant.definition.id)) plant.restoreMature();
    });
    this.raycaster.registerPlants(this.plants);
    this.scene.add(this.room, this.root, this.water, createLighting(), ...this.plants);

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerLeave = this.handlePointerLeave.bind(this);
    this.handleContextLost = this.handleContextLost.bind(this);
    canvas.addEventListener("pointermove", this.handlePointerMove, { passive: true });
    canvas.addEventListener("pointerdown", this.handlePointerDown);
    canvas.addEventListener("webglcontextlost", this.handleContextLost);
    canvas.addEventListener("pointerleave", this.handlePointerLeave);

    this.resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      if (!width || !height) return;
      this.renderer.setSize(width, height, false);
      this.cameraRig.resize(width / height);
    });
    this.resizeObserver.observe(canvas);
    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.running = entry.isIntersecting;
      if (this.running && !this.animationFrame) this.animate();
    }, { threshold: 0.02 });
    this.visibilityObserver.observe(canvas);
    this.animate();
  }

  activateById(id: PlantId) {
    const plant = this.plants.find((item) => item.definition.id === id);
    if (plant) this.activatePlant(plant);
  }

  private handlePointerMove(event: PointerEvent) {
    this.mouse.setFromPointer(event, this.options.canvas);
    const pointer = this.mouse.state.target;
    const plant = this.raycaster.intersectPlant(pointer, this.cameraRig.camera);
    this.setHoveredPlant(plant);
    const hitWater = this.raycaster.intersectWater(pointer, this.cameraRig.camera, this.mouse.state.waterPoint);
    this.mouse.state.hasWaterPoint = hitWater;
    const elapsed = this.elapsedTime;
    if (!this.options.reducedMotion && hitWater && elapsed - this.lastRippleAt > 0.16) {
      if (plant) {
        const plantPoint = new THREE.Vector3();
        plant.getWorldPosition(plantPoint);
        plantPoint.y = this.water.position.y;
        this.water.addRipple(plantPoint, elapsed, 0.22);
      } else {
        this.water.addRipple(this.mouse.state.waterPoint, elapsed, 0.12);
      }
      this.lastRippleAt = elapsed;
    }
  }

  private handlePointerDown(event: PointerEvent) {
    this.mouse.setFromPointer(event, this.options.canvas);
    const plant = this.raycaster.intersectPlant(this.mouse.state.target, this.cameraRig.camera);
    if (plant) {
      if (event.pointerType === "touch" && this.touchFocus !== plant) {
        this.touchFocus = plant;
        this.setHoveredPlant(plant);
        return;
      }
      this.activatePlant(plant);
      return;
    }
    this.touchFocus = null;
    const hitWater = this.raycaster.intersectWater(this.mouse.state.target, this.cameraRig.camera, this.mouse.state.waterPoint);
    if (hitWater) this.water.addRipple(this.mouse.state.waterPoint, this.elapsedTime, 0.36);
  }

  private handlePointerLeave() {
    this.setHoveredPlant(null);
  }

  private setHoveredPlant(plant: LivingLeaf | null) {
    if (this.hoveredPlant === plant) return;
    this.hoveredPlant?.setHovered(false, this.mouse.state.current);
    this.hoveredPlant = plant;
    plant?.setHovered(true, this.mouse.state.current);
    this.options.canvas.dataset.interactive = plant ? "true" : "false";
    this.options.onHover(plant?.definition.id ?? null);
  }

  private activatePlant(plant: LivingLeaf) {
    if (this.activePlant || plant.state === "activated") return;
    if (plant.state === "mature") {
      this.navigateThroughPlant(plant);
      return;
    }
    this.activePlant = plant;
    this.options.onPlantState(plant.definition.id, "activated");
    const worldPoint = new THREE.Vector3();
    plant.getWorldPosition(worldPoint);
    this.water.addRipple(worldPoint, this.elapsedTime, 0.72);
    this.cameraTimeline?.kill();
    this.cameraProgress.value = 0;
    if (!this.options.reducedMotion) {
      this.cameraTimeline = gsap.to(this.cameraProgress, {
        value: 1,
        duration: 2.8,
        ease: "power3.inOut",
        onUpdate: () => this.cameraRig.setApproachTarget(worldPoint, this.cameraProgress.value * 0.82),
      });
    }
    plant.activate(this.options.reducedMotion, () => {
      this.options.onPlantState(plant.definition.id, "mature");
      this.activePlant = null;
      window.setTimeout(() => {
        this.cameraRig.reset();
        this.cameraProgress.value = 0;
      }, 280);
    });
  }

  private navigateThroughPlant(plant: LivingLeaf) {
    if (this.activePlant) return;
    this.activePlant = plant;
    const worldPoint = new THREE.Vector3();
    plant.getWorldPosition(worldPoint);
    this.cameraTimeline?.kill();
    this.cameraProgress.value = 0;
    if (!this.options.reducedMotion) {
      this.cameraTimeline = gsap.timeline({ defaults: { ease: "power3.inOut" } })
        .to(this.cameraProgress, {
          value: 1,
          duration: 1.65,
          onUpdate: () => this.cameraRig.setApproachTarget(worldPoint, this.cameraProgress.value),
        }, 0);
    }
    plant.beginPortal(this.options.reducedMotion, () => {
      this.options.onNavigate(plant.definition.target);
      window.setTimeout(() => {
        plant.resetPortal();
        this.cameraRig.reset();
        this.cameraProgress.value = 0;
        this.activePlant = null;
      }, this.options.reducedMotion ? 0 : 900);
    });
  }

  private updateProjections(time: number) {
    if (time - this.lastProjectionAt < 0.08) return;
    this.lastProjectionAt = time;
    const width = this.options.canvas.clientWidth;
    const height = this.options.canvas.clientHeight;
    const point = new THREE.Vector3();
    const projections = this.plants.map((plant) => {
      plant.getWorldPosition(point);
      point.y += 0.72 * plant.definition.scale;
      point.project(this.cameraRig.camera);
      return {
        id: plant.definition.id,
        x: (point.x * 0.5 + 0.5) * width,
        y: (-point.y * 0.5 + 0.5) * height,
        visible: point.z > -1 && point.z < 1,
      };
    });
    this.options.onProjection(projections);
  }

  private animate = () => {
    if (!this.running) {
      this.animationFrame = 0;
      return;
    }
    this.animationFrame = requestAnimationFrame(this.animate);
    const frameAt = performance.now();
    const delta = Math.min((frameAt - this.lastFrameAt) / 1000, 0.05);
    this.lastFrameAt = frameAt;
    this.elapsedTime += delta;
    const time = this.elapsedTime;
    this.mouse.update(delta);
    if (!this.activePlant) this.cameraRig.update(this.mouse.state.current, delta, this.options.reducedMotion);
    this.plants.forEach((plant) => {
      plant.setHovered(plant === this.hoveredPlant, this.mouse.state.current);
      plant.update(time, delta);
    });
    this.updateProjections(time);
    this.water.update(time);
    this.water.updateReflection(this.renderer, this.scene, this.cameraRig.camera);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.cameraRig.camera);
  };

  private handleContextLost(event: Event) {
    event.preventDefault();
    this.options.onFailure();
    this.dispose();
  }

  dispose() {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
    this.cameraTimeline?.kill();
    this.options.canvas.removeEventListener("pointermove", this.handlePointerMove);
    this.options.canvas.removeEventListener("pointerdown", this.handlePointerDown);
    this.options.canvas.removeEventListener("pointerleave", this.handlePointerLeave);
    this.options.canvas.removeEventListener("webglcontextlost", this.handleContextLost);
    this.resizeObserver.disconnect();
    this.visibilityObserver.disconnect();
    this.root.dispose();
    this.room.dispose();
    this.water.dispose();
    this.plants.forEach((plant) => plant.dispose());
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material instanceof THREE.Material) object.material.dispose();
    });
    this.renderer.dispose();
  }
}
