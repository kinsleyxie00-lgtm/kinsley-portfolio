"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

const IMAGE_ASPECT = 1672 / 941;

export interface HeroEffectsHandle {
  pointerLeave: () => void;
  pointerMove: (x: number, y: number) => void;
}

interface HeroEffectsCanvasProps { reducedMotion: boolean; }

const vertexShader = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform sampler2D uWaterMask;
  uniform sampler2D uWaterDepth;
  uniform vec2 uUvScale;
  uniform vec2 uWaterPointer;
  uniform vec2 uRevealPointer;
  uniform vec2 uResolution;
  uniform float uPointerStrength;
  uniform float uRevealStrength;
  uniform float uRevealRadiusPx;
  uniform float uRevealSoftnessPx;
  uniform float uMotionStrength;
  uniform float uTime;
  varying vec2 vUv;

  vec2 coverUv(vec2 screenUv) { return (screenUv - 0.5) * uUvScale + 0.5; }
  float hash(vec2 point) { return fract(sin(dot(point, vec2(12.9898, 78.233))) * 43758.5453); }

  void main() {
    vec2 sourceUv = coverUv(vUv);
    if (sourceUv.x < 0.0 || sourceUv.x > 1.0 || sourceUv.y < 0.0 || sourceUv.y > 1.0) {
      gl_FragColor = vec4(1.0, 0.996, 0.976, 1.0);
      return;
    }
    float waterMask = texture2D(uWaterMask, sourceUv).r;
    float waterDepth = texture2D(uWaterDepth, sourceUv).r;
    vec2 pointerDelta = sourceUv - uWaterPointer;
    float pointerDistance = length(vec2(pointerDelta.x * 0.9, pointerDelta.y * 2.8));
    float pointerInfluence = (1.0 - smoothstep(0.045, 0.22, pointerDistance)) * uPointerStrength;
    float waveTime = uTime * uMotionStrength;
    float waveA = sin(sourceUv.y * 155.0 + waveTime * 1.45 + sin(sourceUv.x * 8.0) * 0.65);
    float waveB = sin(sourceUv.y * 92.0 - waveTime * 0.96 + sourceUv.x * 13.0);
    float waveC = sin(sourceUv.y * 238.0 + waveTime * 0.66 - sourceUv.x * 5.0);
    float horizontalWave = waveA * 0.52 + waveB * 0.31 + waveC * 0.17;
    float amplitudePx = mix(4.0, 9.0, pointerInfluence) * uMotionStrength;
    vec2 refraction = vec2(horizontalWave * amplitudePx / 1672.0, waveB * amplitudePx * 0.12 / 941.0) * waterDepth;
    vec3 sourceColor = texture2D(uTexture, sourceUv).rgb;
    vec3 refractedWater = texture2D(uTexture, sourceUv + refraction).rgb;
    float waveShade = horizontalWave * (0.09 + pointerInfluence * 0.04) * waterDepth * uMotionStrength;
    refractedWater = clamp(refractedWater + vec3(waveShade), 0.0, 1.0);
    float revealDistancePx = length((vUv - uRevealPointer) * uResolution);
    float revealNoise = (hash(floor(gl_FragCoord.xy * 0.18)) - 0.5) * 2.0;
    float reveal = 1.0 - smoothstep(uRevealRadiusPx, uRevealRadiusPx + uRevealSoftnessPx, revealDistancePx + revealNoise);
    reveal *= uRevealStrength;
    gl_FragColor = vec4(refractedWater, reveal * waterMask * 0.78);
  }
`;

function screenToSource(x: number, y: number, width: number, height: number) {
  const containerAspect = width / height;
  if (containerAspect < IMAGE_ASPECT) {
    const visibleWidth = containerAspect / IMAGE_ASPECT;
    return { x: (x - 0.5) * visibleWidth + 0.5, y };
  }
  const visibleHeight = IMAGE_ASPECT / containerAspect;
  return { x, y: (y - 0.5) * visibleHeight + 0.5 };
}

const HeroEffectsCanvas = forwardRef<HeroEffectsHandle, HeroEffectsCanvasProps>(function HeroEffectsCanvas(
  { reducedMotion }, forwardedRef,
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef({ width: 1, height: 1 });
  const pointerRef = useRef({ screenX: 0.5, screenY: 0.5, sourceX: 0.5, sourceY: 0.82, strength: 0 });

  useImperativeHandle(forwardedRef, () => ({
    pointerLeave: () => { pointerRef.current.strength = 0; },
    pointerMove: (x, y) => {
      const source = screenToSource(x, y, sizeRef.current.width, sizeRef.current.height);
      pointerRef.current.screenX = x;
      pointerRef.current.screenY = 1 - y;
      pointerRef.current.sourceX = source.x;
      pointerRef.current.sourceY = source.y;
      pointerRef.current.strength = 1;
    },
  }), []);

  useEffect(() => {
    const host = hostRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!host) return;
    const interactive = finePointer && !reducedMotion;
    let renderer: THREE.WebGLRenderer | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let texture: THREE.Texture | null = null;
    const waterTextures: THREE.Texture[] = [];
    let animationFrame = 0;
    let disposed = false;
    let previousTime = performance.now();
    let pointerStrength = 0;
    let revealStrength = 0;
    const revealPointer = new THREE.Vector2(0.5, 0.5);

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    } catch {
      host.dataset.effects = "fallback";
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "hero-effects__canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTexture: { value: null as THREE.Texture | null },
      uWaterMask: { value: null as THREE.Texture | null },
      uWaterDepth: { value: null as THREE.Texture | null },
      uUvScale: { value: new THREE.Vector2(1, 1) },
      uWaterPointer: { value: new THREE.Vector2(0.5, 0.82) },
      uRevealPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointerStrength: { value: 0 }, uRevealStrength: { value: 0 },
      uRevealRadiusPx: { value: 90 }, uRevealSoftnessPx: { value: 38 },
      uMotionStrength: { value: interactive ? 1 : 0 }, uTime: { value: 0 },
    };
    material = new THREE.ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      fragmentShader,
      transparent: true,
      uniforms,
      vertexShader,
    });
    geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const draw = (now: number) => {
      if (disposed || !renderer) return;
      const delta = Math.min(50, now - previousTime);
      previousTime = now;
      const targetReveal = interactive ? pointerRef.current.strength : 0;
      const targetWater = interactive && pointerRef.current.sourceY >= 0.64 ? pointerRef.current.strength : 0;
      const pointerStep = targetWater > pointerStrength ? delta / 180 : delta / 850;
      const revealStep = targetReveal > revealStrength ? delta / 150 : delta / 520;
      pointerStrength += (targetWater - pointerStrength) * Math.min(1, pointerStep);
      revealStrength += (targetReveal - revealStrength) * Math.min(1, revealStep);
      const follow = 1 - Math.exp(-delta / 72);
      revealPointer.x += (pointerRef.current.screenX - revealPointer.x) * follow;
      revealPointer.y += (pointerRef.current.screenY - revealPointer.y) * follow;
      host.parentElement?.style.setProperty("--reveal-x", `${revealPointer.x * 100}%`);
      host.parentElement?.style.setProperty("--reveal-y", `${(1 - revealPointer.y) * 100}%`);
      host.parentElement?.style.setProperty("--reveal-core", `${90 * revealStrength}px`);
      host.parentElement?.style.setProperty("--reveal-edge", `${128 * revealStrength}px`);
      uniforms.uWaterPointer.value.set(pointerRef.current.sourceX, pointerRef.current.sourceY);
      uniforms.uRevealPointer.value.copy(revealPointer);
      uniforms.uPointerStrength.value = pointerStrength;
      uniforms.uRevealStrength.value = revealStrength;
      uniforms.uTime.value = now / 1000;
      if (uniforms.uTexture.value && uniforms.uWaterMask.value && uniforms.uWaterDepth.value) renderer.render(scene, camera);
      if (interactive) animationFrame = requestAnimationFrame(draw);
    };

    const resize = () => {
      if (!renderer) return;
      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const containerAspect = width / height;
      sizeRef.current = { width, height };
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
      uniforms.uRevealRadiusPx.value = 90;
      uniforms.uRevealSoftnessPx.value = 38;
      if (containerAspect < IMAGE_ASPECT) uniforms.uUvScale.value.set(containerAspect / IMAGE_ASPECT, 1);
      else uniforms.uUvScale.value.set(1, IMAGE_ASPECT / containerAspect);
      if (!interactive) draw(performance.now());
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const loader = new THREE.TextureLoader();
    let loadedCount = 0;
    const markLoaded = () => {
      loadedCount += 1;
      if (loadedCount === 3) { host.dataset.effects = "ready"; if (!interactive) draw(performance.now()); }
    };
    const fail = () => { host.dataset.effects = "fallback"; };
    loader.load("./images/hero-photo-final-v2.png", (loadedTexture) => {
      if (disposed) return loadedTexture.dispose();
      texture = loadedTexture;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      uniforms.uTexture.value = texture;
      markLoaded();
    }, undefined, fail);
    const waterUniforms = [uniforms.uWaterMask, uniforms.uWaterDepth];
    ["water-mask.png", "water-depth.png"].forEach((filename, index) => {
      loader.load(`./images/hero-assets/${filename}`, (loadedTexture) => {
        if (disposed) return loadedTexture.dispose();
        loadedTexture.colorSpace = THREE.NoColorSpace;
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        waterTextures.push(loadedTexture);
        waterUniforms[index].value = loadedTexture;
        markLoaded();
      }, undefined, fail);
    });
    if (interactive) animationFrame = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      geometry?.dispose(); material?.dispose(); texture?.dispose();
      waterTextures.forEach((waterTexture) => waterTexture.dispose());
      renderer?.dispose(); renderer?.domElement.remove();
      host.parentElement?.style.removeProperty("--reveal-x");
      host.parentElement?.style.removeProperty("--reveal-y");
      host.parentElement?.style.removeProperty("--reveal-core");
      host.parentElement?.style.removeProperty("--reveal-edge");
    };
  }, [reducedMotion]);

  return <div ref={hostRef} className="hero-effects" aria-hidden="true" />;
});

export default HeroEffectsCanvas;
