"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { introConfig } from "@/data/intro";

type IntroPhase =
  | "initial"
  | "ksx"
  | "expanded"
  | "matrix"
  | "seeking"
  | "brand"
  | "complete";

const ease = [0.16, 1, 0.3, 1] as const;

export default function BrandIntro() {
  const reduceMotion = useReducedMotion();
  const forceFullMotion =
    (process.env.NODE_ENV === "development" &&
      introConfig.forceFullMotionInDevelopment) ||
    (typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get(
        introConfig.forceFullMotionQuery,
      ) === "1");
  const forceReducedMotion =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get(
      introConfig.forceReducedMotionQuery,
    ) === "1";
  const shouldReduceMotion = Boolean(
    forceReducedMotion || (reduceMotion && !forceFullMotion),
  );
  const [phase, setPhase] = useState<IntroPhase>("initial");
  const [visible, setVisible] = useState(true);
  const [seekingIndex, setSeekingIndex] = useState(0);

  useEffect(() => {
    const forceFromQuery =
      new URLSearchParams(window.location.search).get(introConfig.forceReplayQuery) ===
      "1";
    const forceInDevelopment =
      process.env.NODE_ENV === "development" &&
      introConfig.forceReplayInDevelopment;
    const hasPlayed = sessionStorage.getItem(introConfig.storageKey) === "played";

    if (hasPlayed && !forceFromQuery && !forceInDevelopment) {
      setVisible(false);
      setPhase("complete");
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.dataset.intro = "running";

    const timers: number[] = [];
    const schedule = (callback: () => void, delay: number) => {
      timers.push(window.setTimeout(callback, delay));
    };

    if (shouldReduceMotion) {
      setPhase("brand");
      schedule(() => {
        sessionStorage.setItem(introConfig.storageKey, "played");
        setPhase("complete");
        setVisible(false);
      }, introConfig.reducedMotionDuration);
    } else {
      schedule(() => setPhase("ksx"), introConfig.phases.ksx);
      schedule(() => setPhase("expanded"), introConfig.phases.expanded);
      schedule(() => setPhase("matrix"), introConfig.phases.matrix);
      schedule(() => setPhase("seeking"), introConfig.phases.seeking);
      const compact = window.matchMedia("(max-width: 520px)").matches;
      if (compact) {
        schedule(
          () => setSeekingIndex(introConfig.seekingWords.length - 1),
          introConfig.phases.seeking,
        );
      } else {
        introConfig.seekingWords.forEach((_, index) => {
          schedule(
            () => setSeekingIndex(index),
            introConfig.phases.seeking + index * 120,
          );
        });
      }
      schedule(() => setPhase("brand"), introConfig.phases.brand);
      schedule(() => {
        sessionStorage.setItem(introConfig.storageKey, "played");
        setPhase("complete");
        setVisible(false);
      }, introConfig.phases.complete);
    }

    return () => {
      timers.forEach(window.clearTimeout);
      document.documentElement.style.overflow = previousOverflow;
      delete document.body.dataset.intro;
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (phase !== "complete") return;
    document.documentElement.style.overflow = "";
    delete document.body.dataset.intro;
  }, [phase]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`brand-intro brand-intro--${phase}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.05 : 0.38, ease }}
          aria-label="KINSLEY XIE"
        >
          <div className="brand-intro__stage">
            <motion.div
              className="brand-intro__ksx"
              initial={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
              animate={{
                opacity: phase === "initial" ? 0 : phase === "ksx" ? 1 : 0,
                scale: phase === "ksx" ? 0.92 : 0.88,
                filter: phase === "ksx" ? "blur(0px)" : "blur(0px)",
              }}
              transition={{ duration: 0.55, ease }}
              aria-hidden={phase !== "ksx"}
            >
              KSX
            </motion.div>

            <motion.div
              className="brand-intro__expanded"
              initial={false}
              animate={{
                opacity:
                  phase === "expanded" ||
                  phase === "matrix" ||
                  phase === "seeking"
                    ? 1
                    : 0,
              }}
              transition={{ duration: 0.18 }}
              aria-hidden={
                phase !== "expanded" &&
                phase !== "matrix" &&
                phase !== "seeking"
              }
            >
              <IntroLine primary phase={phase} seekingIndex={seekingIndex} />
            </motion.div>

            <motion.div
              className="brand-intro__matrix"
              initial={false}
              animate={{
                opacity:
                  phase === "matrix" || phase === "seeking" ? 1 : 0,
              }}
              aria-hidden="true"
            >
              {Array.from({ length: introConfig.matrixRows }).map((_, index) => (
                <motion.div
                  className={`brand-intro__matrix-row ${
                    index === Math.floor(introConfig.matrixRows / 2)
                      ? "is-center"
                      : ""
                  }`}
                  key={index}
                  initial={{ opacity: 0, clipPath: "inset(0 50% 0 50%)" }}
                  animate={{
                    opacity:
                      phase === "matrix"
                        ? index === Math.floor(introConfig.matrixRows / 2)
                          ? 0
                          : 0.42
                        : phase === "seeking"
                          ? 0
                          : 0,
                    clipPath:
                      phase === "matrix"
                        ? "inset(0 0% 0 0%)"
                        : "inset(0 50% 0 50%)",
                    y:
                      phase === "matrix"
                        ? 0
                        : (index - Math.floor(introConfig.matrixRows / 2)) *
                          -8,
                  }}
                  transition={{
                    duration: 0.42,
                    delay:
                      phase === "matrix"
                        ? Math.abs(
                            index - Math.floor(introConfig.matrixRows / 2),
                          ) * 0.045
                        : 0,
                    ease,
                  }}
                >
                  <span>KINSLEY</span>
                  <span>SEEKING</span>
                  <span>X</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="brand-intro__brand"
              initial={false}
              animate={{
                opacity: phase === "brand" ? 1 : 0,
                x: phase === "brand" ? 0 : "42vw",
                y: phase === "brand" ? 0 : "44vh",
                scale: phase === "brand" ? 1 : 12,
              }}
              transition={{ duration: shouldReduceMotion ? 0.05 : 0.62, ease }}
              aria-hidden={phase !== "brand"}
            >
              KINSLEY XIE
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IntroLine({
  primary,
  phase,
  seekingIndex,
}: {
  primary?: boolean;
  phase: IntroPhase;
  seekingIndex: number;
}) {
  const showExpansion =
    phase === "expanded" || phase === "matrix" || phase === "seeking";
  const seekingWord =
    phase === "seeking" ? introConfig.seekingWords[seekingIndex] : "X";

  return (
    <div className={`brand-intro__line ${primary ? "is-primary" : ""}`}>
      <span className="brand-intro__grow">
        <b>K</b>
        <motion.i
          initial={false}
          animate={{
            maxWidth: showExpansion ? "7em" : 0,
            opacity: showExpansion ? 1 : 0,
            x: showExpansion ? 0 : -18,
          }}
          transition={{ duration: 0.48, ease }}
        >
          INSLEY
        </motion.i>
      </span>
      <span className="brand-intro__grow">
        <b>S</b>
        <motion.i
          initial={false}
          animate={{
            maxWidth: showExpansion ? "7em" : 0,
            opacity: showExpansion ? 1 : 0,
            x: showExpansion ? 0 : -18,
          }}
          transition={{ duration: 0.48, delay: 0.05, ease }}
        >
          EEKING
        </motion.i>
      </span>
      <span className="brand-intro__word-window">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.b
            key={seekingWord}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.12, ease }}
          >
            {seekingWord}
          </motion.b>
        </AnimatePresence>
      </span>
    </div>
  );
}
