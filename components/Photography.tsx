"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { photography } from "@/data/photography";
import MediaPlaceholder from "./MediaPlaceholder";
import SectionHeading from "./SectionHeading";

export default function Photography() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % photography.length);
      if (event.key === "ArrowLeft")
        setActive((active - 1 + photography.length) % photography.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <section id="photo" className="section photography">
      <SectionHeading number="04" title="VISUAL ARCHIVE" />
      <div className="photography__grid">
        {photography.map((photo, index) => (
          <button key={photo.id} onClick={() => setActive(index)} aria-label={`预览${photo.alt}`}>
            <MediaPlaceholder
              label={`PHOTO ${photo.id}`}
              path={photo.src}
              ratio={photo.ratio}
            />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="摄影作品全屏预览"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className="lightbox__close" onClick={() => setActive(null)}>
              CLOSE ×
            </button>
            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={() =>
                setActive((active - 1 + photography.length) % photography.length)
              }
              aria-label="上一张"
            >
              ←
            </button>
            <MediaPlaceholder
              label={`PHOTO ${photography[active].id}`}
              path={photography[active].src}
              ratio={photography[active].ratio}
              className="lightbox__media"
            />
            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={() => setActive((active + 1) % photography.length)}
              aria-label="下一张"
            >
              →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
