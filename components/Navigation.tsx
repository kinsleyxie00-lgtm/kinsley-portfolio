"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PlantView, PortfolioView } from "@/components/PortfolioExperience";

const links: Array<{ label: string; view: PlantView }> = [
  { label: "ABOUT", view: "about" },
  { label: "EXPERIENCE", view: "experience" },
  { label: "PROJECTS", view: "projects" },
  { label: "PHOTOGRAPHY", view: "photography" },
];

interface NavigationProps {
  activeView: PortfolioView;
  hidden?: boolean;
  onOpen: (view: PlantView) => void;
  onHome: () => void;
}

export default function Navigation({ activeView, hidden = false, onOpen, onHome }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inContent = activeView !== "hero";
  const showSignature = activeView === "about";

  useEffect(() => {
    if (!inContent) {
      setScrolled(false);
      return;
    }

    setScrolled(false);
    const updateScrollState = (event: Event) => {
      const scroller = event.target;
      if (!(scroller instanceof HTMLElement) || !scroller.matches(".portfolio-overlay__content")) return;
      setScrolled(scroller.scrollTop > 12);
    };
    document.addEventListener("scroll", updateScrollState, true);

    return () => document.removeEventListener("scroll", updateScrollState, true);
  }, [activeView, inContent]);

  const select = (view: PlantView) => {
    setOpen(false);
    onOpen(view);
  };

  return (
    <motion.header
      className={`navigation navigation--interactive ${inContent ? "navigation--overlay" : ""} ${scrolled ? "navigation--content-scrolled" : ""} ${hidden ? "navigation--hidden" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.45 }}
    >
      <button className={`navigation__brand ${showSignature ? "navigation__brand--signature" : ""}`} onClick={onHome} aria-label="进入 Hero" data-cursor="OPEN" data-cursor-mode="nav" data-attract="text">
        {showSignature ? <img src="./images/kinsley-signature.png" alt="Kinsley" /> : "K.X"}
      </button>
      <nav className="navigation__desktop" aria-label="主导航">
        {links.map((link) => (
          <button
            key={link.view}
            onClick={() => select(link.view)}
            className={activeView === link.view ? "is-active" : ""}
            aria-current={activeView === link.view ? "page" : undefined}
            data-cursor="SELECT"
            data-cursor-mode="nav"
            data-attract="text"
          >
            {link.label}
          </button>
        ))}
      </nav>
      <button
        className="navigation__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? "CLOSE" : "MENU"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="navigation__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <button onClick={() => { setOpen(false); onHome(); }}>K.X / HERO</button>
            {links.map((link) => (
              <button key={link.view} onClick={() => select(link.view)} className={activeView === link.view ? "is-active" : ""}>
                {link.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
