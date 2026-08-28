"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import HeroEffectsCanvas, { type HeroEffectsHandle } from "@/components/HeroEffectsCanvas";
import type { PlantView } from "@/components/PortfolioExperience";

const plants: Array<{ id: PlantView; number: string; label: string; position: string }> = [
  { id: "about", number: "01", label: "ABOUT", position: "upper" },
  { id: "experience", number: "02", label: "EXPERIENCE", position: "center" },
  { id: "projects", number: "03", label: "PROJECTS", position: "right" },
  { id: "photography", number: "04", label: "PHOTOGRAPHY", position: "lower" },
];

export default function Hero({ onEnter }: { onEnter: (view: PlantView) => void }) {
  const scene = useRef<HTMLDivElement>(null);
  const effects = useRef<HeroEffectsHandle>(null);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitioning = useRef(false);
  const [hovered, setHovered] = useState<PlantView | null>(null);
  const [cuePlant, setCuePlant] = useState<PlantView | null>(null);
  const [selected, setSelected] = useState<PlantView | null>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const activePlant = selected ?? hovered ?? cuePlant;

  useEffect(() => {
    if (reduceMotion) return;
    const timers: Array<ReturnType<typeof setTimeout>> = [];
    plants.forEach((plant, index) => {
      const start = 460 + index * 330;
      timers.push(setTimeout(() => setCuePlant(plant.id), start));
      timers.push(setTimeout(() => setCuePlant((current) => current === plant.id ? null : current), start + 300));
    });

    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  useEffect(() => () => {
    if (enterTimer.current) clearTimeout(enterTimer.current);
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width;
    const normalizedY = (event.clientY - bounds.top) / bounds.height;
    effects.current?.pointerMove(normalizedX, normalizedY);

    if (reduceMotion || event.pointerType === "touch" || !scene.current) return;
    const x = (normalizedX - 0.5) * 2;
    const y = (normalizedY - 0.5) * 2;
    scene.current.style.setProperty("--parallax-x", `${x * -0.42}%`);
    scene.current.style.setProperty("--parallax-y", `${y * -0.34}%`);
  };

  const resetParallax = () => {
    scene.current?.style.setProperty("--parallax-x", "0%");
    scene.current?.style.setProperty("--parallax-y", "0%");
    effects.current?.pointerLeave();
    if (!selected) setHovered(null);
  };

  const enter = (view: PlantView) => {
    if (transitioning.current) return;
    transitioning.current = true;
    if (reduceMotion) {
      onEnter(view);
      return;
    }

    setCuePlant(null);
    setHovered(view);
    setSelected(view);
    enterTimer.current = setTimeout(() => onEnter(view), 620);
  };

  return (
    <section id="top" className="hero hero--entrance" onPointerMove={handlePointerMove} onPointerLeave={resetParallax} aria-label="Kinsley Xie interactive portfolio entrance">
      <div className="hero-scene" ref={scene}>
        <img className="hero-scene__image hero-scene__image--photo" src="/images/hero-photo-final-v2.png" alt="" />
        <HeroEffectsCanvas ref={effects} reducedMotion={reduceMotion} />
        <div className="hero-sketch-overlay" aria-hidden="true">
          <img className="hero-scene__image hero-scene__image--line-overlay" src="/images/hero-line-overlay-final-v2.png" alt="" />
        </div>
      </div>

      <motion.div className="hero-identity" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}>
        <h1>KINSLEY XIE</h1>
        <p>BRAND · CONTENT · STORYTELLING</p>
        <nav className="hero-index" aria-label="Featured projects">
          {plants.map((plant) => (
            <button
              key={plant.id}
              className={`hero-index__item ${activePlant === plant.id ? "is-active" : ""}`}
              type="button"
              onPointerEnter={() => !selected && setHovered(plant.id)}
              onPointerLeave={() => !selected && setHovered(null)}
              onFocus={() => !selected && setHovered(plant.id)}
              onBlur={() => !selected && setHovered(null)}
              onClick={() => enter(plant.id)}
              disabled={Boolean(selected)}
            >
              <span>{plant.number}</span>
              <b>{plant.label}</b>
              <i aria-hidden="true" />
            </button>
          ))}
        </nav>
      </motion.div>

      <div className="plant-entrances">
        {plants.map((plant) => (
          <button
            key={plant.id}
            className={`plant-entrance plant-entrance--${plant.position} ${activePlant === plant.id ? "is-awake" : ""}`}
            onPointerEnter={() => !selected && setHovered(plant.id)}
            onPointerLeave={() => !selected && setHovered(null)}
            onFocus={() => !selected && setHovered(plant.id)}
            onBlur={() => !selected && setHovered(null)}
            onClick={() => enter(plant.id)}
            disabled={Boolean(selected)}
            aria-label={`Enter ${plant.label}`}
          >
            <span className="plant-entrance__marker" aria-hidden="true"><i />{plant.number}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
