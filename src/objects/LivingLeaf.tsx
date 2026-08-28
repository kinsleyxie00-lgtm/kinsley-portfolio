import * as THREE from "three";
import { gsap } from "gsap";
import leafShader from "@/src/shaders/leafGrowth.glsl?raw";
import type { LeafUniforms, PlantDefinition, PlantState } from "@/src/types/botanical";

const [leafVertexShader, leafFragmentShader] = leafShader.split("/*__FRAGMENT__*/");

function createLeafGeometry() {
  const geometry = new THREE.PlaneGeometry(0.46, 0.82, 12, 20);
  geometry.translate(0, 0.41, 0);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i);
    const y = position.getY(i);
    const normalizedY = THREE.MathUtils.clamp(y / 0.82, 0, 1);
    const width = Math.pow(Math.sin(normalizedY * Math.PI), 0.62);
    const asymmetry = 1 + (x > 0 ? 0.08 : -0.035) * Math.sin(normalizedY * Math.PI);
    position.setX(i, x * width * asymmetry + Math.sin(normalizedY * Math.PI) * 0.018);
    position.setZ(i, Math.sin(normalizedY * Math.PI) * 0.072 - Math.abs(x) * 0.048 + normalizedY * 0.018);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function branchCurve(end: THREE.Vector3, bend: number) {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(end.x * 0.32, end.y * 0.32, bend),
    new THREE.Vector3(end.x * 0.7, end.y * 0.7, bend * 0.55),
    end,
  ]);
}

function leafScale(branchIndex: number) {
  return branchIndex < 3 ? 0.98 : 0.7 + branchIndex * 0.025;
}

export class LivingLeaf extends THREE.Group {
  readonly definition: PlantDefinition;
  readonly hitObject: THREE.Mesh;
  readonly uniforms: LeafUniforms;
  state: PlantState = "dormant";
  private readonly leaves: THREE.Mesh[] = [];
  private readonly branches: THREE.Mesh[] = [];
  private readonly branchEnds: THREE.Vector3[] = [];
  private readonly particles: THREE.Points;
  private readonly particleMaterial: THREE.PointsMaterial;
  private readonly leafGeometry: THREE.PlaneGeometry;
  private readonly leafMaterial: THREE.ShaderMaterial;
  private readonly branchMaterial: THREE.MeshStandardMaterial;
  private readonly dormantBranchColor = new THREE.Color(0x8c8d86);
  private readonly matureBranchColor = new THREE.Color(0x43523c);
  private timeline: gsap.core.Timeline | null = null;
  private portalTimeline: gsap.core.Timeline | null = null;
  private readonly initialScale: number;
  private portalLeaf: THREE.Mesh | null = null;
  private hoverTarget = 0;
  private readonly phase: number;

  constructor(definition: PlantDefinition) {
    super();
    this.definition = definition;
    this.name = `plant-${definition.id}`;
    this.position.fromArray(definition.position);
    this.rotation.set(...definition.rotation);
    this.scale.setScalar(definition.scale);
    this.initialScale = definition.scale;
    this.phase = ["about", "experience", "case", "notes"].indexOf(definition.id) * 1.37;

    this.uniforms = {
      uTime: { value: 0 },
      uGrowthProgress: { value: 0 },
      uBreathProgress: { value: 0 },
      uHoverStrength: { value: 0 },
      uVeinProgress: { value: 0 },
      uGlowStrength: { value: 0 },
      uWindDirection: { value: new THREE.Vector2() },
      uDormantColor: { value: new THREE.Color(0xbfc0b8) },
      uGreenColor: { value: new THREE.Color(0x718964) },
    };
    this.leafGeometry = createLeafGeometry();
    this.leafMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms as unknown as Record<string, THREE.IUniform>,
      vertexShader: leafVertexShader,
      fragmentShader: leafFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: true,
    });
    this.branchMaterial = new THREE.MeshStandardMaterial({
      color: this.dormantBranchColor,
      roughness: 0.86,
      metalness: 0,
    });

    const branchEnds = [
      new THREE.Vector3(0, 1.05, 0),
      new THREE.Vector3(-0.62, 0.78, 0.08),
      new THREE.Vector3(0.63, 0.82, -0.06),
      new THREE.Vector3(-0.38, 1.25, -0.08),
      new THREE.Vector3(0.4, 1.3, 0.04),
    ];
    branchEnds.forEach((end, index) => {
      this.branchEnds.push(end.clone());
      const curve = branchCurve(end, (index % 2 ? 1 : -1) * 0.12);
      const branch = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 28, index === 0 ? 0.045 : 0.026, 7, false),
        this.branchMaterial,
      );
      branch.geometry.setDrawRange(0, 0);
      branch.castShadow = true;
      this.branches.push(branch);
      this.add(branch);

      if (index > 0) {
        const leaf = new THREE.Mesh(this.leafGeometry, this.leafMaterial);
        leaf.position.copy(end);
        leaf.rotation.z = Math.atan2(end.y, end.x) - Math.PI / 2;
        leaf.rotation.y = index % 2 ? -0.35 : 0.35;
        leaf.scale.setScalar(leafScale(index));
        leaf.castShadow = true;
        this.leaves.push(leaf);
        if (index === 3) this.portalLeaf = leaf;
        this.add(leaf);
      }
    });

    const hitMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    this.hitObject = new THREE.Mesh(new THREE.SphereGeometry(0.82, 12, 8), hitMaterial);
    this.hitObject.position.set(0, 0.82, 0);
    this.hitObject.userData.plantId = definition.id;
    this.add(this.hitObject);

    const particlePositions = new Float32Array(72 * 3);
    for (let i = 0; i < 72; i += 1) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 1.25;
      particlePositions[i * 3 + 1] = Math.random() * 1.45 + 0.3;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    this.particleMaterial = new THREE.PointsMaterial({
      color: 0xb8c89b,
      size: 0.028,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.particles = new THREE.Points(particleGeometry, this.particleMaterial);
    this.add(this.particles);

    this.updateBranchReveal(0.18);
  }

  setHovered(hovered: boolean, wind: THREE.Vector2) {
    this.hoverTarget = hovered ? 1 : 0;
    this.uniforms.uWindDirection.value.copy(wind);
  }

  activate(reducedMotion: boolean, onComplete: () => void) {
    if (this.state !== "dormant") {
      onComplete();
      return;
    }
    this.state = "activated";
    this.timeline?.kill();
    if (reducedMotion) {
      this.uniforms.uGrowthProgress.value = 1;
      this.uniforms.uVeinProgress.value = 1;
      this.uniforms.uGlowStrength.value = 0.16;
      this.branchMaterial.color.copy(this.matureBranchColor);
      this.updateBranchReveal(1);
      this.state = "mature";
      onComplete();
      return;
    }

    const growth = { value: 0 };
    const vein = { value: 0 };
    const glow = { value: 0 };
    this.timeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onUpdate: () => {
        this.uniforms.uGrowthProgress.value = growth.value;
        this.uniforms.uVeinProgress.value = vein.value;
        this.uniforms.uGlowStrength.value = glow.value;
        this.branchMaterial.color.lerpColors(this.dormantBranchColor, this.matureBranchColor, growth.value);
        this.updateBranchReveal(growth.value);
      },
      onComplete: () => {
        this.state = "mature";
        this.uniforms.uGlowStrength.value = 0.16;
        onComplete();
      },
    });
    this.timeline
      .to(growth, { value: 0.18, duration: 0.3 }, 0)
      .to(growth, { value: 0.48, duration: 0.6 }, 0.3)
      .to(growth, { value: 0.78, duration: 0.5 }, 0.9)
      .to(growth, { value: 1, duration: 0.8, ease: "power3.out" }, 1.4)
      .to(vein, { value: 1, duration: 1.2 }, 1.4)
      .to(glow, { value: 0.72, duration: 0.8 }, 1.15)
      .to(glow, { value: 0.16, duration: 1.05 }, 2.15)
      .to(this.particleMaterial, { opacity: 0.62, duration: 0.35 }, 2.22)
      .to(this.particleMaterial, { opacity: 0, duration: 0.72 }, 2.58);
  }

  restoreMature() {
    this.timeline?.kill();
    this.state = "mature";
    this.uniforms.uGrowthProgress.value = 1;
    this.uniforms.uVeinProgress.value = 1;
    this.uniforms.uGlowStrength.value = 0.16;
    this.branchMaterial.color.copy(this.matureBranchColor);
    this.updateBranchReveal(1);
  }

  beginPortal(reducedMotion: boolean, onCovered: () => void) {
    if (this.state !== "mature" || !this.portalLeaf) return;
    this.portalTimeline?.kill();
    const leaf = this.portalLeaf;
    if (reducedMotion) {
      onCovered();
      return;
    }
    this.portalTimeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: onCovered,
    });
    this.portalTimeline
      .to(leaf.rotation, { x: -0.18, y: 0, z: 0, duration: 1.05 }, 0)
      .to(leaf.position, { x: 0, y: 1.02, z: 0.46, duration: 1.05 }, 0)
      .to(leaf.scale, { x: 18, y: 18, z: 18, duration: 1.45 }, 0.35)
      .to(this.uniforms.uGlowStrength, { value: 0.42, duration: 1.1 }, 0.35);
  }

  resetPortal() {
    this.portalTimeline?.kill();
    this.portalTimeline = null;
    const index = this.leaves.indexOf(this.portalLeaf as THREE.Mesh);
    if (this.portalLeaf && index >= 0) {
      const end = this.branchEnds[index + 1];
      this.portalLeaf.position.copy(end);
      this.portalLeaf.rotation.set(0, index % 2 ? 0.35 : -0.35, Math.atan2(end.y, end.x) - Math.PI / 2);
      this.portalLeaf.scale.setScalar(leafScale(index + 1));
    }
    this.scale.setScalar(this.initialScale);
    this.uniforms.uGlowStrength.value = 0.16;
  }

  private updateBranchReveal(progress: number) {
    this.branches.forEach((branch, index) => {
      const indexCount = branch.geometry.index?.count ?? 0;
      const delay = index === 0 ? 0 : 0.13 + index * 0.045;
      const reveal = THREE.MathUtils.clamp((progress - delay) / (1 - delay), 0, 1);
      branch.geometry.setDrawRange(0, Math.floor(indexCount * reveal));
      if (index > 0) {
        const leaf = this.leaves[index - 1];
        leaf.position.copy(this.branchEnds[index]).multiplyScalar(0.18 + reveal * 0.82);
      }
    });
  }

  update(time: number, delta: number) {
    this.uniforms.uTime.value = time;
    this.uniforms.uBreathProgress.value = (time * 0.12 + this.phase) % 1;
    this.uniforms.uHoverStrength.value = THREE.MathUtils.damp(
      this.uniforms.uHoverStrength.value,
      this.hoverTarget,
      6,
      delta,
    );
    if (this.state === "mature") {
      this.rotation.z += Math.sin(time * 0.5 + this.phase) * delta * 0.0018;
    }
    if (this.particleMaterial.opacity > 0) {
      this.particles.rotation.y += delta * 0.24;
      this.particles.position.y += delta * 0.025;
    } else {
      this.particles.position.y = 0;
    }
  }

  dispose() {
    this.timeline?.kill();
    this.portalTimeline?.kill();
    this.leafGeometry.dispose();
    this.leafMaterial.dispose();
    this.branchMaterial.dispose();
    this.hitObject.geometry.dispose();
    (this.hitObject.material as THREE.Material).dispose();
    this.branches.forEach((branch) => branch.geometry.dispose());
    this.particles.geometry.dispose();
    this.particleMaterial.dispose();
  }
}
