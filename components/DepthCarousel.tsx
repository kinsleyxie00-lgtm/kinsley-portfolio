"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

export type DepthCarouselItem = {
  image: string;
  alt: string;
  objectPosition?: string;
};

type DepthCarouselProps = {
  items: DepthCarouselItem[];
  onChange?: (index: number) => void;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function DepthCarousel({ items, onChange }: DepthCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const positionRef = useRef(0);
  const focusRef = useRef(0);
  const scaleRef = useRef(1);
  const dragRef = useRef<{ startX: number; startPosition: number; pointerId: number; moved: boolean } | null>(null);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotionRef = useRef(false);
  const [active, setActive] = useState(0);

  const count = items.length;
  const indexes = useMemo(() => items.map((_, index) => index), [items]);

  const layout = useCallback((position: number) => {
    if (!count) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let distance = index - position;
      if (count > 1) {
        distance = ((distance % count) + count) % count;
        if (distance > count / 2) distance -= count;
      }

      const depth = Math.max(0, distance);
      const visible = distance >= -0.85 && distance <= 3.35;
      const opacity = visible ? (distance < 0 ? Math.max(0, 1 + distance) : 1) : 0;

      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        x: distance * 42 * scaleRef.current,
        z: distance * -118,
        rotationY: clamp(distance, 0, 1) * 10,
        scale: scaleRef.current,
        autoAlpha: opacity,
        filter: `blur(${Math.min(2.4, depth * 0.7)}px)`,
        zIndex: Math.round(1000 - distance * 20),
        pointerEvents: visible && opacity > 0.05 ? "auto" : "none",
      });
    });
  }, [count]);

  const setFocus = useCallback((requestedIndex: number, animate = true) => {
    if (!count) return;
    const nextIndex = ((requestedIndex % count) + count) % count;
    let delta = nextIndex - positionRef.current;
    if (count > 1) {
      delta = ((delta % count) + count) % count;
      if (delta > count / 2) delta -= count;
    }

    tweenRef.current?.kill();
    const proxy = { position: positionRef.current };
    tweenRef.current = gsap.to(proxy, {
      position: positionRef.current + delta,
      duration: animate && !reducedMotionRef.current ? 0.68 : 0,
      ease: "power3.out",
      overwrite: "auto",
      onUpdate: () => {
        positionRef.current = proxy.position;
        layout(proxy.position);
      },
      onComplete: () => {
        positionRef.current = ((positionRef.current % count) + count) % count;
        layout(positionRef.current);
      },
    });

    focusRef.current = nextIndex;
    setActive(nextIndex);
    onChange?.(nextIndex);
  }, [count, layout, onChange]);

  const navigate = useCallback((step: number) => setFocus(focusRef.current + step), [setFocus]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => layout(positionRef.current), root);
    const observer = new ResizeObserver(([entry]) => {
      scaleRef.current = clamp(entry.contentRect.width / 420, 0.62, 1);
      layout(positionRef.current);
    });
    observer.observe(root);

    return () => {
      observer.disconnect();
      tweenRef.current?.kill();
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      context.revert();
    };
  }, [layout]);

  useEffect(() => {
    if (count < 2 || reducedMotionRef.current) return;
    const root = rootRef.current;
    if (!root) return;

    const start = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => navigate(1), 3600);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);
    start();

    return () => {
      stop();
      root.removeEventListener("mouseenter", stop);
      root.removeEventListener("mouseleave", start);
      root.removeEventListener("focusin", stop);
      root.removeEventListener("focusout", start);
    };
  }, [count, navigate]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      startX: event.clientX,
      startPosition: positionRef.current,
      pointerId: event.pointerId,
      moved: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4 && !drag.moved) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(drag.pointerId);
    }
    if (!drag.moved) return;
    positionRef.current = drag.startPosition - delta / Math.max(110 * scaleRef.current, 72);
    layout(positionRef.current);
  };

  const onPointerEnd = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (drag?.moved) setFocus(Math.round(positionRef.current));
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (count < 2) return;
    event.preventDefault();
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    positionRef.current += clamp(delta / 380, -0.45, 0.45);
    layout(positionRef.current);
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => setFocus(Math.round(positionRef.current)), 120);
  };

  if (!count) return null;

  return (
    <div
      ref={rootRef}
      className="about-depth-carousel"
      role="group"
      aria-roledescription="carousel"
      aria-label="Kinsley Xie portrait gallery"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); }
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onWheel={onWheel}
    >
      <div className="about-depth-carousel__stage">
        {items.map((item, index) => (
          <div
            className="about-depth-carousel__card"
            key={item.image}
            ref={(element) => { cardRefs.current[index] = element; }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={active !== index}
            onClick={() => setFocus(index)}
          >
            <img
              src={item.image}
              alt={active === index ? item.alt : ""}
              draggable={false}
              style={{ objectPosition: item.objectPosition ?? "center" }}
            />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="about-depth-carousel__controls" aria-label="Portrait controls">
          <button type="button" onClick={() => navigate(-1)} aria-label="Previous portrait">←</button>
          <span aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
          <button type="button" onClick={() => navigate(1)} aria-label="Next portrait">→</button>
        </div>
      )}

      <div className="about-depth-carousel__dots" aria-label="Choose portrait">
        {indexes.map((index) => (
          <button
            key={index}
            type="button"
            className={active === index ? "is-active" : ""}
            aria-label={`Go to portrait ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => setFocus(index)}
          />
        ))}
      </div>
    </div>
  );
}
