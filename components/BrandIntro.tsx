"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { introConfig } from "@/data/intro";

const ease = [0.22, 1, 0.36, 1] as const;

export default function BrandIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [queryMotion, setQueryMotion] = useState<
    "default" | "full" | "reduced"
  >("default");
  const [clientReady, setClientReady] = useState(false);
  const forceReducedMotion = queryMotion === "reduced";
  const forceFullMotion =
    (process.env.NODE_ENV === "development" &&
      introConfig.forceFullMotionInDevelopment) ||
    queryMotion === "full";
  const reducedMotion = Boolean(
    forceReducedMotion || (prefersReducedMotion && !forceFullMotion),
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQueryMotion(
      params.get(introConfig.forceReducedMotionQuery) === "1"
        ? "reduced"
        : params.get(introConfig.forceFullMotionQuery) === "1"
          ? "full"
          : "default",
    );
    setClientReady(true);
  }, []);

  useEffect(() => {
    if (!clientReady) return;

    const params = new URLSearchParams(window.location.search);
    const forceReplay = params.get(introConfig.forceReplayQuery) === "1";
    const forceInDevelopment =
      process.env.NODE_ENV === "development" &&
      introConfig.forceReplayInDevelopment;
    const hasPlayed = sessionStorage.getItem(introConfig.storageKey) === "played";

    if (hasPlayed && !forceReplay && !forceInDevelopment) {
      setVisible(false);
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    const previousScrollRestoration = window.history.scrollRestoration;
    const resetToHomepage = () => {
      if (window.location.hash) {
        window.history.replaceState(
          window.history.state,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    window.history.scrollRestoration = "manual";
    resetToHomepage();
    document.documentElement.style.overflow = "hidden";
    document.body.dataset.intro = "running";
    let completionFrame: number | null = null;

    const timer = window.setTimeout(
      () => {
        resetToHomepage();
        sessionStorage.setItem(introConfig.storageKey, "played");
        setVisible(false);
        completionFrame = window.requestAnimationFrame(resetToHomepage);
      },
      reducedMotion
        ? introConfig.reducedMotionDuration
        : introConfig.fadeOutAt,
    );

    return () => {
      window.clearTimeout(timer);
      if (completionFrame !== null) {
        window.cancelAnimationFrame(completionFrame);
      }
      document.documentElement.style.overflow = previousOverflow;
      window.history.scrollRestoration = previousScrollRestoration;
      delete document.body.dataset.intro;
    };
  }, [clientReady, reducedMotion]);

  useEffect(() => {
    if (visible) return;
    document.documentElement.style.overflow = "";
    delete document.body.dataset.intro;
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="brand-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{
            duration: reducedMotion
              ? introConfig.reducedExitDuration
              : introConfig.exitDuration,
            ease,
          }}
          aria-label="KINSLEY XIE"
        >
          {reducedMotion ? (
            <div className="brand-intro__reduced">KINSLEY XIE</div>
          ) : (
            <>
              <motion.div
                className="brand-intro__ksx"
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: [0, 0, 1, 1, 1, 0],
                  scale: [1, 1, 1, 1, 0.05, 0.05],
                }}
                transition={{
                  duration: introConfig.ksxDuration,
                  times: [0, 0.21, 0.215, 0.5, 0.95, 1],
                  ease: [0.4, 0, 0.2, 1],
                }}
                aria-hidden="true"
              >
                KSX
              </motion.div>

              <motion.div
                className="brand-intro__lead"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: [0, 1, 1, 0], y: [6, 0, 0, 0] }}
                transition={{
                  delay: introConfig.leadDelay,
                  duration: 0.86,
                  times: [0, 0.16, 0.62, 1],
                  ease,
                }}
                aria-hidden="true"
              >
                <span>KINSLEY</span>
                <span>SEEKING</span>
                <span>X</span>
              </motion.div>

              <motion.div
                className="brand-intro__matrix"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: introConfig.matrixDelay,
                  duration: introConfig.matrixDuration,
                  ease,
                }}
                aria-hidden="true"
              >
                {Array.from({ length: introConfig.matrixRows }).map((_, index) => (
                  <motion.div
                    className="brand-intro__matrix-row"
                    key={index}
                    initial={{ opacity: 0, y: index < 7 ? 6 : -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay:
                        introConfig.matrixDelay +
                        Math.abs(index - 7) * 0.035,
                      duration: 0.34,
                      ease,
                    }}
                  >
                    <span>KINSLEY</span>
                    <span>SEEKING</span>
                    <span>X</span>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
