"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PLANTS, World } from "@/src/scene/World";
import type { PlantId, PlantProjection, PlantState } from "@/src/types/botanical";

const STORAGE_KEY = "kinsley-living-plants";

interface BotanicalWorldProps {
  onNavigate: (target: string) => void;
}

export default function BotanicalWorld({ onNavigate }: BotanicalWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hovered, setHovered] = useState<PlantId | null>(null);
  const [projections, setProjections] = useState<PlantProjection[]>([]);
  const [states, setStates] = useState<Record<PlantId, PlantState>>({
    about: "dormant",
    experience: "dormant",
    case: "dormant",
    notes: "dormant",
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    try {
      let initialMature: PlantId[] = [];
      try {
        const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as PlantId[];
        initialMature = stored.filter((id) => PLANTS.some((plant) => plant.id === id));
        if (initialMature.length) {
          setStates((current) => {
            const next = { ...current };
            initialMature.forEach((id) => { next[id] = "mature"; });
            return next;
          });
        }
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
      worldRef.current = new World({
        canvas: canvasRef.current,
        reducedMotion,
        initialMature,
        onHover: setHovered,
        onProjection: setProjections,
        onPlantState: (id, state) => {
          setStates((current) => {
            const next = { ...current, [id]: state };
            if (state === "mature") {
              const mature = PLANTS.filter((plant) => next[plant.id] === "mature").map((plant) => plant.id);
              sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mature));
            }
            return next;
          });
        },
        onNavigate,
        onReady: () => setReady(true),
        onFailure: () => setFailed(true),
      });
    } catch {
      setFailed(true);
    }
    return () => {
      worldRef.current?.dispose();
      worldRef.current = null;
    };
  }, [onNavigate, reducedMotion]);

  return (
    <div className={`webgl-world ${ready ? "is-ready" : ""} ${failed ? "has-failed" : ""}`}>
      {!failed && <canvas ref={canvasRef} className="webgl-world__canvas" aria-hidden="true" />}
      {!ready && !failed && <div className="webgl-world__loading">ENTERING THE LIVING ARCHIVE</div>}
      <div className="webgl-world__labels" aria-hidden="true">
        {PLANTS.map((plant) => {
          const projection = projections.find((item) => item.id === plant.id);
          const visible = hovered === plant.id && projection?.visible;
          return (
            <div
              key={plant.id}
              className={`webgl-spatial-label ${visible ? "is-visible" : ""} is-${states[plant.id]}`}
              style={projection ? { left: projection.x, top: projection.y } : undefined}
            >
              <span>{plant.number}</span>
              <b>{plant.label}</b>
              <i>{states[plant.id] === "dormant" ? "awaken" : states[plant.id] === "activated" ? "awakening" : "select again to enter"}</i>
            </div>
          );
        })}
      </div>
      <div className="webgl-world__accessible-controls">
        {PLANTS.map((plant) => (
          <button key={plant.id} onClick={() => worldRef.current?.activateById(plant.id)}>
            {plant.number} {plant.label} — {states[plant.id]}
          </button>
        ))}
      </div>
      {failed && (
        <p className="webgl-world__fallback-note">
          The living environment is resting. The archive remains accessible below.
        </p>
      )}
    </div>
  );
}
