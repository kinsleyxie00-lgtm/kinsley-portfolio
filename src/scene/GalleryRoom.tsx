import * as THREE from "three";

function createMineralTexture(size = 128) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = (y * size + x) * 4;
      const broad = Math.sin(x * 0.09 + y * 0.035) * 9;
      const fine = (Math.random() - 0.5) * 20;
      const value = THREE.MathUtils.clamp(192 + broad + fine, 0, 255);
      data[index] = value;
      data[index + 1] = value * 0.985;
      data[index + 2] = value * 0.94;
      data[index + 3] = 255;
    }
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export class GalleryRoom extends THREE.Group {
  private readonly mineralTexture = createMineralTexture();
  private readonly plasterMaterial: THREE.MeshStandardMaterial;
  private readonly stoneMaterial: THREE.MeshPhysicalMaterial;
  private readonly basinMaterial: THREE.MeshStandardMaterial;
  private readonly recessMaterial: THREE.MeshStandardMaterial;

  constructor() {
    super();
    this.name = "gallery-room";
    this.plasterMaterial = new THREE.MeshStandardMaterial({
      color: 0xd5d0c3,
      roughness: 0.91,
      metalness: 0,
      bumpMap: this.mineralTexture,
      bumpScale: 0.018,
    });
    this.stoneMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb9b4a8,
      roughness: 0.48,
      metalness: 0.02,
      clearcoat: 0.1,
      clearcoatRoughness: 0.62,
      bumpMap: this.mineralTexture,
      bumpScale: 0.026,
    });
    this.basinMaterial = new THREE.MeshStandardMaterial({
      color: 0x343a34,
      roughness: 0.72,
      metalness: 0.02,
    });
    this.recessMaterial = new THREE.MeshStandardMaterial({
      color: 0xaaa79f,
      roughness: 0.88,
      metalness: 0,
    });

    this.addBox("back-wall", [17.5, 9.4, 0.42], [0, 3.35, -8.2], this.plasterMaterial);
    this.addBox("left-return", [0.42, 9.4, 17], [-8.55, 3.35, 0], this.plasterMaterial);
    this.addBox("right-return", [0.42, 9.4, 17], [8.55, 3.35, 0], this.plasterMaterial);
    this.addBox("left-pier", [1.15, 8.5, 0.2], [-6.65, 3.15, -7.9], this.recessMaterial);
    this.addBox("right-pier", [1.15, 8.5, 0.2], [6.65, 3.15, -7.9], this.recessMaterial);

    this.addBox("rear-platform", [14.2, 0.36, 3.25], [0, -0.82, -6.35], this.stoneMaterial);
    this.addBox("rear-platform-face", [14.2, 0.58, 0.3], [0, -1.08, -4.74], this.stoneMaterial);
    this.addBox("floor-left", [2.7, 0.42, 15.8], [-7.05, -1.08, 0], this.stoneMaterial);
    this.addBox("floor-right", [2.7, 0.42, 15.8], [7.05, -1.08, 0], this.stoneMaterial);
    this.addBox("floor-front", [11.5, 0.42, 3.1], [0, -1.08, 6.35], this.stoneMaterial);

    this.addBox("pool-left-edge", [0.28, 0.28, 10.8], [-5.67, -0.86, -0.35], this.stoneMaterial);
    this.addBox("pool-right-edge", [0.28, 0.28, 10.8], [5.67, -0.86, -0.35], this.stoneMaterial);
    this.addBox("pool-front-edge", [11.5, 0.28, 0.28], [0, -0.86, 5.05], this.stoneMaterial);
    this.addBox("pool-back-edge", [11.5, 0.24, 0.24], [0, -0.88, -5.75], this.stoneMaterial);
    this.addBox("pool-bed", [11.2, 0.3, 10.4], [0, -1.72, -0.35], this.basinMaterial);
    this.addBox("pool-inner-left", [0.25, 0.85, 10.4], [-5.47, -1.35, -0.35], this.basinMaterial);
    this.addBox("pool-inner-right", [0.25, 0.85, 10.4], [5.47, -1.35, -0.35], this.basinMaterial);
    this.addBox("pool-inner-front", [11.2, 0.85, 0.25], [0, -1.35, 4.78], this.basinMaterial);
    this.addBox("pool-inner-back", [11.2, 0.85, 0.25], [0, -1.35, -5.48], this.basinMaterial);

  }

  private addBox(
    name: string,
    size: THREE.Vector3Tuple,
    position: THREE.Vector3Tuple,
    material: THREE.Material,
    shadows = true,
  ) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.name = name;
    mesh.position.set(...position);
    mesh.receiveShadow = shadows;
    mesh.castShadow = shadows;
    this.add(mesh);
    return mesh;
  }

  dispose() {
    this.traverse((object) => {
      if (object instanceof THREE.Mesh) object.geometry.dispose();
    });
    this.plasterMaterial.dispose();
    this.stoneMaterial.dispose();
    this.basinMaterial.dispose();
    this.recessMaterial.dispose();
    this.mineralTexture.dispose();
  }
}
