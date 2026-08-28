"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import About from "@/components/About";
import ArchiveCursor from "@/components/ArchiveCursor";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Photography from "@/components/Photography";
import PortfolioOverlay from "@/components/PortfolioOverlay";
import Projects from "@/components/Projects";

export type PortfolioView = "hero" | "about" | "experience" | "projects" | "photography";
export type PlantView = Exclude<PortfolioView, "hero">;

export default function PortfolioExperience() {
  const [activeView, setActiveView] = useState<PortfolioView>("hero");
  const [projectStackActive, setProjectStackActive] = useState(false);

  const openView = useCallback((view: PlantView) => setActiveView(view), []);
  const openHero = useCallback(() => setActiveView("hero"), []);

  useEffect(() => {
    if (activeView !== "projects") setProjectStackActive(false);
  }, [activeView]);

  const content = activeView === "about" ? <About />
    : activeView === "experience" ? <Experience />
    : activeView === "projects" ? <Projects onStackActiveChange={setProjectStackActive} />
    : activeView === "photography" ? <Photography />
    : null;

  return (
    <div className="portfolio-experience" data-view={activeView}>
      <ArchiveCursor />
      <Navigation activeView={activeView} onOpen={openView} onHome={openHero} hidden={projectStackActive} />
      {activeView === "hero" && <Hero onEnter={openView} />}
      <AnimatePresence mode="wait">
        {activeView !== "hero" && content && (
          <PortfolioOverlay key={activeView} view={activeView}>
            {content}
            <Contact onOpen={openView} activeView={activeView} />
          </PortfolioOverlay>
        )}
      </AnimatePresence>
    </div>
  );
}
