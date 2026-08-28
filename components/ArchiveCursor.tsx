"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const ATTRACT_SELECTOR = "[data-attract]";

export default function ArchiveCursor() {
  const labelRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const frame = useRef<number | null>(null);
  const activeElements = useRef(new Set<HTMLElement>());
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (reducedMotion || !finePointer.matches) return;

    const resetElement = (element: HTMLElement) => {
      element.style.removeProperty("--attract-x");
      element.style.removeProperty("--attract-y");
      element.style.removeProperty("--attract-rotate");
      element.removeAttribute("data-attract-active");
    };

    const render = () => {
      labelRef.current?.style.setProperty(
        "transform",
        `translate3d(${pointer.current.x + 16}px, ${pointer.current.y + 16}px, 0)`,
      );

      const nextActive = new Set<HTMLElement>();
      document.querySelectorAll<HTMLElement>(ATTRACT_SELECTOR).forEach((element) => {
        const hasPlayingVideo = Array.from(element.querySelectorAll("video")).some((video) => !video.paused);
        if (element.closest("[role='dialog'], .precision-contact") || hasPlayingVideo) {
          resetElement(element);
          return;
        }

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = pointer.current.x - centerX;
        const deltaY = pointer.current.y - centerY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 140 || distance === 0) {
          resetElement(element);
          return;
        }

        const strength = 1 - distance / 140;
        const movement = 2 + strength * 4;
        const x = (deltaX / distance) * movement;
        const y = (deltaY / distance) * movement;
        const rotate = Math.max(-1, Math.min(1, (deltaX / 140) * .8));

        element.style.setProperty("--attract-x", `${x.toFixed(2)}px`);
        element.style.setProperty("--attract-y", `${y.toFixed(2)}px`);
        element.style.setProperty("--attract-rotate", `${rotate.toFixed(2)}deg`);
        element.setAttribute("data-attract-active", "true");
        nextActive.add(element);
      });

      activeElements.current.forEach((element) => {
        if (!nextActive.has(element)) resetElement(element);
      });
      activeElements.current = nextActive;
      frame.current = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
    };
    const onOver = (event: PointerEvent) => {
      const interactive = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(interactive?.dataset.cursor ?? "");
      setVisible(Boolean(interactive?.dataset.cursor));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame.current = requestAnimationFrame(render);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      activeElements.current.forEach(resetElement);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div ref={labelRef} className={`cursor-label ${visible ? "is-visible" : ""}`} aria-hidden="true">
      {label}
    </div>
  );
}
