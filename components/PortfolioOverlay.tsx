"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { PlantView } from "@/components/PortfolioExperience";
import ScrollProgressiveReveal from "@/components/ScrollProgressiveReveal";

interface PortfolioOverlayProps {
  view: PlantView;
  children: ReactNode;
}

export default function PortfolioOverlay({ view, children }: PortfolioOverlayProps) {
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, []);

  useEffect(() => {
    content.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  return (
    <motion.section
      className={`portfolio-overlay portfolio-overlay--${view}`}
      aria-label={`${view} exhibition page`}
      initial={{ opacity: 0, filter: "blur(12px)", clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, filter: "blur(8px)", clipPath: "inset(100% 0 0 0)" }}
      transition={{ duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="portfolio-overlay__content" ref={content}>
        <ScrollProgressiveReveal scroller={content} view={view} />
        {children}
      </div>
    </motion.section>
  );
}
