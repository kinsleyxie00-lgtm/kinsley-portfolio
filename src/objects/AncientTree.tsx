import * as THREE from "three";

interface RootDefinition {
  points: THREE.Vector3Tuple[];
  startRadius: number;
  endRadius: number;
  wet: boolean;
  squash: number;
  twist: number;
}

function seededNoise(value: number, seed: number) {
  return Math.sin(value * 12.9898 + seed * 78.233) * 43758.5453 % 1;
}

function createBarkTexture() {
  const size = 256;
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const ridge = Math.pow(Math.abs(Math.sin(x * 0.085 + Math.sin(y * 0.035) * 2.4)), 5) * 58;
      const fracture = Math.abs(Math.sin(y * 0.19 + x * 0.023)) > 0.975 ? -72 : 0;
      const value = THREE.MathUtils.clamp(116 + ridge + fracture + seededNoise(x + y * size, 7) * 28, 18, 225);
      data[index] = value;
      data[index + 1] = value * 0.82;
      data[index + 2] = value * 0.62;
      data[index + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(0.9, 1.7);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createTaperedRoot(definition: RootDefinition, seed: number) {
  const curve = new THREE.CatmullRomCurve3(definition.points.map((point) => new THREE.Vector3(...point)));
  const tubularSegments = 120;
  const radialSegments = 32;
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const center = new THREE.Vector3();
  const radial = new THREE.Vector3();

  for (let segment = 0; segment <= tubularSegments; segment += 1) {
    const t = segment / tubularSegments;
    curve.getPointAt(t, center);
    const taper = Math.pow(1 - t, 0.72);
    const junctionBulge = 1 + Math.sin(Math.min(t * 2.4, 1) * Math.PI) * 0.16;
    const radius = THREE.MathUtils.lerp(definition.endRadius, definition.startRadius, taper) * junctionBulge;
    for (let side = 0; side <= radialSegments; side += 1) {
      const v = side / radialSegments;
      const angle = v * Math.PI * 2 + t * definition.twist;
      const ridge = Math.pow(Math.abs(Math.sin(angle * 5 + t * 17 + seed)), 7) * 0.045;
      const irregular = 1 + Math.sin(angle * 3 + t * 9 + seed) * 0.045 + ridge;
      const radiusX = radius * irregular;
      const radiusY = radius * definition.squash * (1 + Math.sin(angle * 2 - t * 11) * 0.06);
      radial.copy(frames.normals[segment]).multiplyScalar(Math.cos(angle) * radiusX);
      radial.addScaledVector(frames.binormals[segment], Math.sin(angle) * radiusY);
      const barkBreak = Math.sin(t * 91 + angle * 7 + seed) * 0.012 * radius;
      radial.multiplyScalar(1 + barkBreak);
      const position = center.clone().add(radial);
      positions.push(position.x, position.y, position.z);
      normals.push(radial.x, radial.y, radial.z);
      uvs.push(v, t * 2.2);
    }
  }

  for (let segment = 1; segment <= tubularSegments; segment += 1) {
    for (let side = 1; side <= radialSegments; side += 1) {
      const a = (radialSegments + 1) * (segment - 1) + side - 1;
      const b = (radialSegments + 1) * segment + side - 1;
      const c = (radialSegments + 1) * segment + side;
      const d = (radialSegments + 1) * (segment - 1) + side;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

export class AncientTree extends THREE.Group {
  private readonly barkTexture = createBarkTexture();
  private readonly dryMaterial: THREE.MeshPhysicalMaterial;
  private readonly wetMaterial: THREE.MeshPhysicalMaterial;

  constructor() {
    super();
    this.name = "ancient-root-installation";
    this.position.set(0, -0.04, -2.15);
    this.dryMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3f3024,
      bumpMap: this.barkTexture,
      bumpScale: 0.16,
      roughness: 0.76,
      metalness: 0,
    });
    this.wetMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x392f27,
      bumpMap: this.barkTexture,
      bumpScale: 0.12,
      roughness: 0.4,
      metalness: 0.02,
      clearcoat: 0.36,
      clearcoatRoughness: 0.26,
    });

    const roots: RootDefinition[] = [
      { points: [[0,-.82,.15],[-.18,.05,0],[.04,1.55,-.4],[.42,3.45,-.92],[1.1,6.25,-1.65]], startRadius: 1.08, endRadius: .2, wet: false, squash: .9, twist: .72 },
      { points: [[.06,-.7,.03],[1.2,-.56,-.16],[2.75,-.18,-.78],[4.55,.62,-1.8],[7.4,1.35,-3.9]], startRadius: .76, endRadius: .055, wet: false, squash: .72, twist: -.5 },
      { points: [[-.08,-.76,.08],[-1.35,-.66,-.16],[-3.0,-.5,-.7],[-5.3,-.18,-2.05],[-8.4,.08,-4.5]], startRadius: .72, endRadius: .04, wet: true, squash: .68, twist: .54 },
      { points: [[.1,-.85,.34],[1.15,-.92,.9],[2.9,-.9,1.72],[5.8,-.86,4.4]], startRadius: .48, endRadius: .035, wet: true, squash: .54, twist: .3 },
    ];

    roots.forEach((definition, index) => {
      const mesh = new THREE.Mesh(
        createTaperedRoot(definition, index * 1.93),
        definition.wet ? this.wetMaterial : this.dryMaterial,
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.add(mesh);
    });

    const junctionGeometry = new THREE.SphereGeometry(1, 64, 40);
    const junctionPositions = junctionGeometry.getAttribute("position") as THREE.BufferAttribute;
    const junctionVertex = new THREE.Vector3();
    for (let index = 0; index < junctionPositions.count; index += 1) {
      junctionVertex.fromBufferAttribute(junctionPositions, index);
      const barkVariation = 1 + Math.sin(junctionVertex.x * 9 + junctionVertex.y * 13 + junctionVertex.z * 7) * 0.035;
      junctionVertex.multiplyScalar(barkVariation);
      junctionPositions.setXYZ(index, junctionVertex.x, junctionVertex.y, junctionVertex.z);
    }
    junctionGeometry.computeVertexNormals();
    const junction = new THREE.Mesh(junctionGeometry, this.dryMaterial);
    junction.name = "continuous-root-junction";
    junction.position.set(0, -0.5, 0.02);
    junction.scale.set(1.18, 0.72, 0.94);
    junction.rotation.set(0.06, 0.18, -0.03);
    junction.castShadow = true;
    junction.receiveShadow = true;
    this.add(junction);

  }

  dispose() {
    this.traverse((object) => {
      if (object instanceof THREE.Mesh) object.geometry.dispose();
    });
    this.dryMaterial.dispose();
    this.wetMaterial.dispose();
    this.barkTexture.dispose();
  }
}
