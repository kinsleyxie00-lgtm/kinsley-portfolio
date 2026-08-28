"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PlantView } from "@/components/PortfolioExperience";
import { experience } from "@/data/experience";
import { photography } from "@/data/photography";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

interface ContactProps {
  onOpen: (view: PlantView) => void;
  activeView: PlantView;
}

const contactLinks: Array<{ label: string; view: PlantView; image: string }> = [
  { label: "About", view: "about", image: profile.portrait },
  { label: "Experience", view: "experience", image: experience[0].image },
  { label: "Projects", view: "projects", image: projects[0].cover },
  { label: "Photography", view: "photography", image: photography[0].src },
];

export default function Contact({ onOpen, activeView }: ContactProps) {
  const [preview, setPreview] = useState<(typeof contactLinks)[number] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const openSection = (item: (typeof contactLinks)[number]) => {
    if (timer.current) clearTimeout(timer.current);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const navigate = () => {
      document.querySelector<HTMLElement>(".portfolio-overlay__content")?.scrollTo({ top: 0, behavior: "instant" });
      setPreview(null);
      onOpen(item.view);
    };

    if (reduceMotion) {
      navigate();
      return;
    }

    setPreview(item);
    timer.current = setTimeout(navigate, 560);
  };

  return (
    <section id="contact" className="precision-contact" data-reveal-section>
      <AnimatePresence>
        {preview && (
          <motion.div
            className="precision-contact__preview"
            key={preview.view}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, .72] }}
            exit={{ opacity: 0 }}
            transition={{ duration: .56, times: [0, .42, 1], ease: "easeOut" }}
          >
            <img src={preview.image} alt="" />
            <span />
          </motion.div>
        )}
      </AnimatePresence>

      <h2 data-reveal="title" aria-label="Portfolio sections">
        <span className="precision-contact__title-line">
          {contactLinks.slice(0, 2).map((item) => (
            <span className="precision-contact__title-item" key={item.view}>
              <button className={activeView === item.view ? "is-active" : undefined} type="button" onClick={() => openSection(item)} data-cursor="OPEN" aria-current={activeView === item.view ? "page" : undefined}>{item.label}</button>
              <i aria-hidden="true"> / </i>
            </span>
          ))}
        </span>
        <span className="precision-contact__title-line">
          {contactLinks.slice(2).map((item, index) => (
            <span className="precision-contact__title-item" key={item.view}>
              <button className={activeView === item.view ? "is-active" : undefined} type="button" onClick={() => openSection(item)} data-cursor="OPEN" aria-current={activeView === item.view ? "page" : undefined}>{item.label}</button>
              {index === 0 && <i aria-hidden="true"> / </i>}
            </span>
          ))}
        </span>
      </h2>

      <div className="precision-contact__details" data-reveal="body">
        <div className="precision-contact__rows">
          <p><span>Available for</span><b>Brand / Content</b></p>
          <p><span>Collaboration</span><b>2026 ↗</b></p>
        </div>
        <a href={`mailto:${profile.email}`}>{profile.email} ↗</a>
        <a href={`tel:${profile.phone}`}>{profile.phone}</a>
        <a href={profile.resume} download>Resume / Download ↓</a>
      </div>
      <strong data-reveal="body">Kinsley Xie</strong>
      <small data-reveal="body">© 2026</small>
    </section>
  );
}
