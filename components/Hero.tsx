"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !root.current || !title.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const animation = gsap.to(title.current, {
      scale: 0.9,
      yPercent: -18,
      opacity: 0.18,
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [reduceMotion]);

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero__center">
        <motion.p
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          {profile.chineseName} / {profile.role}
        </motion.p>
        <motion.h1
          ref={title}
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <span>KINSLEY</span>
          <span>XIE</span>
        </motion.h1>
        <motion.div
          className="hero__disciplines"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          {profile.disciplines.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="hero__footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span>BASED IN {profile.location}</span>
        <a href="#work">SCROLL ↓</a>
        <span>{profile.availability}</span>
      </motion.div>
    </section>
  );
}
