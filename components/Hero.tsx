"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const matrix = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rows = Array.from({ length: 11 });

  useEffect(() => {
    if (reduceMotion || !root.current || !stage.current || !matrix.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(stage.current, { scale: 0.83, yPercent: -22, opacity: 0.08, ease: "none" }, 0)
        .to(matrix.current, { yPercent: -12, letterSpacing: "0.02em", ease: "none" }, 0);
    }, root);
    return () => context.revert();
  }, [reduceMotion]);

  const matrixVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? -90 : 90,
      scaleX: 1.08,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scaleX: 1,
      transition: {
        duration: 0.62,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="top" className="hero hero--kinetic" ref={root}>
      <motion.div
        ref={matrix}
        className="hero-matrix"
        variants={matrixVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        {rows.map((_, index) => (
          <motion.div
            className={`hero-matrix__row hero-matrix__row--${index + 1}`}
            variants={rowVariants}
            custom={index}
            key={index}
          >
            <span>KINSLEY</span>
            <span>XIE</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="hero-focus" ref={stage}>
        <motion.div
          className="hero-focus__rule"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.65, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.p
          className="hero-focus__eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.74 }}
        >
          {profile.chineseName} — {profile.role}
        </motion.p>
        <motion.h1
          initial={{ clipPath: "inset(100% 0 0 0)", y: 40 }}
          animate={{ clipPath: "inset(0% 0 0 0)", y: 0 }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
        >
          <span>KINSLEY</span>
          <span>XIE</span>
        </motion.h1>
        <motion.div
          className="hero-focus__meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.05 }}
        >
          {profile.disciplines.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="hero__footer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.15 }}
      >
        <span>BASED IN {profile.location}</span>
        <a href="#work">SCROLL ↓</a>
        <span>{profile.availability}</span>
      </motion.div>
    </section>
  );
}
