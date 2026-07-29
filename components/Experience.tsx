"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience } from "@/data/experience";
import MediaPlaceholder from "./MediaPlaceholder";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="section experience">
      <SectionHeading number="01" title="EXPERIENCE" />
      <div className="experience__list">
        {experience.map((item, index) => (
          <article
            className="experience__item"
            key={item.company}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="experience__index">0{index + 1}</div>
            <div>
              <p className="micro-label">{item.role}</p>
              <h3>{item.company}</h3>
              <p className="experience__summary">{item.summary}</p>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <time>{item.period}</time>
            <div className="experience__mobile-media">
              <MediaPlaceholder label="EXPERIENCE IMAGE" path={item.image} />
            </div>
            <AnimatePresence>
              {active === index && (
                <motion.div
                  className="experience__preview"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                >
                  <MediaPlaceholder label="PROJECT IMAGE" path={item.image} />
                </motion.div>
              )}
            </AnimatePresence>
            <ul className="experience__highlights">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
