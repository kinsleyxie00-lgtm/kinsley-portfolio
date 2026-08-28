"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { photography, type PhotographyItem } from "@/data/photography";
import MediaPlaceholder from "./MediaPlaceholder";

function PhotoMeta({ photo }: { photo: PhotographyItem }) {
  return (
    <span className="photo-meta">
      <b>{photo.id}</b>
      <strong>{photo.title}</strong>
      <span>{photo.location}, {photo.season}</span>
      <span>{photo.year}</span>
    </span>
  );
}

export default function Photography() {
  const [active, setActive] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const invoker = useRef<HTMLButtonElement | null>(null);

  const openPostcard = (index: number, button: HTMLButtonElement) => {
    invoker.current = button;
    setActive(index);
  };

  useEffect(() => {
    if (active === null) return;
    const scroller = document.querySelector<HTMLElement>(".portfolio-overlay__content");
    const previousOverflow = scroller?.style.overflow;
    if (scroller) scroller.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => value === null ? 0 : (value + 1) % photography.length);
      if (event.key === "ArrowLeft") setActive((value) => value === null ? 0 : (value - 1 + photography.length) % photography.length);
      if (event.key !== "Tab") return;

      const dialog = document.querySelector<HTMLElement>(".postcard-modal");
      const controls = dialog?.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      if (scroller) scroller.style.overflow = previousOverflow ?? "";
      window.removeEventListener("keydown", onKeyDown);
      invoker.current?.focus();
    };
  }, [active]);

  const selected = active === null ? null : photography[active];
  const total = String(photography.length).padStart(2, "0");

  return (
    <section id="notes" className="photography photography-editorial" aria-label="Photography — Postcards From My Garden">
      <div className="photo-page" aria-hidden={active !== null || undefined}>
        <section className="photo-landing" data-reveal-section>
          <div className="photo-landing__intro" data-reveal="title">
            <span className="photo-section-number">04 / 01</span>
            <h1 data-attract="text">Photography</h1>
            <p className="photo-eyebrow">POSTCARDS<br /><em>From My Garden</em></p>
            <i className="photo-rule" aria-hidden="true" />
            <p className="photo-description">A study of nature,<br />light and memories.</p>
          </div>

          <button
            className="photo-feature"
            onClick={(event) => openPostcard(0, event.currentTarget)}
            aria-label={`View postcard ${photography[0].id}, ${photography[0].title}`}
            data-cursor="VIEW"
          >
            <span className="photo-attract-media" data-attract="image">
              <span data-reveal="media"><MediaPlaceholder label={`PHOTO ${photography[0].id} / ${photography[0].title.toUpperCase()}`} path={photography[0].src} ratio="4 / 3" showImage /></span>
            </span>
          </button>

          <aside className="photo-landing__story" data-reveal="body">
            <PhotoMeta photo={photography[0]} />
            <button onClick={(event) => openPostcard(0, event.currentTarget)} data-cursor="OPEN">VIEW STORY <span>→</span></button>
            <small>01 / {total}</small>
          </aside>
        </section>

        <section className="photo-preview" aria-label="Photography selection">
          {photography.slice(1).map((photo, offset) => {
            const index = offset + 1;
            return (
              <button
                className={`photo-preview__item photo-preview__item--${photo.id}`}
                key={photo.id}
                onClick={(event) => openPostcard(index, event.currentTarget)}
                aria-label={`View postcard ${photo.id}, ${photo.title}`}
                data-cursor="VIEW"
                data-reveal-section
              >
                <span className="photo-attract-media" data-attract="image">
                  <span data-reveal="media"><MediaPlaceholder label={`PHOTO ${photo.id}`} path={photo.src} ratio={photo.ratio} showImage /></span>
                </span>
                <span data-reveal="body"><PhotoMeta photo={photo} /></span>
              </button>
            );
          })}
        </section>
      </div>

      <AnimatePresence>
        {selected && active !== null && (
          <motion.div
            className="postcard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="postcard-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .45 }}
          >
            <motion.div className="postcard-modal__veil" aria-hidden="true" onClick={() => setActive(null)} initial={{ backdropFilter: "blur(0px)" }} animate={{ backdropFilter: "blur(12px)" }} exit={{ backdropFilter: "blur(0px)" }} />
            <button className="postcard-back" onClick={() => setActive(null)}>← BACK TO GARDEN</button>
            <button ref={closeButton} className="postcard-close" onClick={() => setActive(null)} aria-label="Close postcard">×</button>
            <button className="postcard-nav postcard-nav--prev" onClick={() => setActive((active - 1 + photography.length) % photography.length)} aria-label="Previous postcard">←</button>

            <motion.article className="postcard" initial={{ y: 36, scale: .94, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 22, scale: .97, opacity: 0 }} transition={{ duration: .62, ease: [0.22, 1, 0.36, 1] }}>
              <div className="postcard__image">
                <MediaPlaceholder label={`PHOTO ${selected.id} / ${selected.title.toUpperCase()}`} path={selected.src} ratio="4 / 5" showImage />
              </div>
              <div className="postcard__message">
                <header><b>POSTCARD</b><em>From My Garden</em></header>
                <dl>
                  <div><dt>TITLE</dt><dd id="postcard-title">{selected.title}</dd></div>
                  <div><dt>LOCATION</dt><dd>{selected.location}</dd></div>
                  <div><dt>SEASON</dt><dd>{selected.season}</dd></div>
                  <div><dt>YEAR</dt><dd>{selected.year}</dd></div>
                </dl>
                <p className="postcard__memory">{selected.memory}</p>
                <div className="postcard__stamp" aria-hidden="true">
                  <img src="/images/photography/botanical-collage-stamp.png" alt="" />
                  <i /><i /><i />
                </div>
                <div className="postcard__postmark" aria-hidden="true">MEMORIES<br /><b>{selected.year}</b><br />GARDEN</div>
                <div className="postcard__botanical-mark" aria-hidden="true"><i /><i /><i /></div>
                <div className="postcard__signature"><img src="/images/kinsley-signature.png" alt="Kinsley" /></div>
              </div>
            </motion.article>

            <button className="postcard-nav postcard-nav--next" onClick={() => setActive((active + 1) % photography.length)} aria-label="Next postcard">→</button>
            <span className="postcard-count">{selected.id} / {total}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
