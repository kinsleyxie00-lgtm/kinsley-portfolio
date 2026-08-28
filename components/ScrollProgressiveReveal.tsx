"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollProgressiveRevealProps {
  scroller: RefObject<HTMLDivElement | null>;
  view: string;
}

const revealOrder = ["media", "title", "body"] as const;

export default function ScrollProgressiveReveal({ scroller, view }: ScrollProgressiveRevealProps) {
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
    let refreshFrame = 0;
    const refresh = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    media.forEach((image) => {
      if (!image.complete) image.addEventListener("load", refresh, { once: true });
    });

    const context = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-reveal-section]");

        sections.forEach((section) => {
          const targetsFor = (kind: typeof revealOrder[number]) =>
            Array.from(section.querySelectorAll<HTMLElement>(`[data-reveal="${kind}"]`))
              .filter((target) => target.closest("[data-reveal-section]") === section);

          const timeline = gsap.timeline({
            defaults: { duration: 0.62, ease: "power1.out" },
            scrollTrigger: {
              trigger: section,
              scroller: root,
              start: "top 88%",
              end: "top 35%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          revealOrder.forEach((kind, index) => {
            const targets = targetsFor(kind);
            if (!targets.length) return;
            timeline.fromTo(
              targets,
              { autoAlpha: 0, y: 48, willChange: "transform, opacity" },
              { autoAlpha: 1, y: 0, stagger: 0.06, willChange: "auto" },
              index * 0.14,
            );
          });
        });

        refresh();
      });

      return () => matchMedia.revert();
    }, root);

    return () => {
      cancelAnimationFrame(refreshFrame);
      media.forEach((image) => image.removeEventListener("load", refresh));
      context.revert();
    };
  }, [scroller, view]);

  return null;
}
