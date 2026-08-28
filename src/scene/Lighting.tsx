import * as THREE from "three";

export function createLighting() {
  const group = new THREE.Group();
  const ambient = new THREE.AmbientLight(0xe2ded3, 0.54);
  const hemisphere = new THREE.HemisphereLight(0xfff7e7, 0x41443d, 0.86);
  const key = new THREE.SpotLight(0xffedcf, 148, 28, Math.PI * 0.25, 0.9, 1.08);
  key.position.set(-4.2, 7.3, 3.7);
  key.target.position.set(-0.35, -0.05, -2.1);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  const fill = new THREE.SpotLight(0xc9d8cf, 72, 22, Math.PI * 0.28, 0.92, 1.3);
  fill.position.set(5.2, 4.2, 1.2);
  fill.target.position.set(1.8, -0.35, -2.4);

  group.add(ambient, hemisphere, key, key.target, fill, fill.target);
  return group;
}
