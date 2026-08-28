"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface TextTypeProps {
  text: string[];
  typingSpeed?: { min: number; max: number };
  pauseDuration?: number;
  initialDelay?: number;
  cursorCharacter?: string;
  className?: string;
}

const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));

export default function TextType({
  text,
  typingSpeed = { min: 20, max: 30 },
  pauseDuration = 220,
  initialDelay = 250,
  cursorCharacter = "|",
  className = "",
}: TextTypeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedLines, setDisplayedLines] = useState(() => text.map(() => ""));
  const [activeLine, setActiveLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let cancelled = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplayedLines(text);
      setActiveLine(text.length - 1);
      setIsComplete(true);
      return;
    }

    const typeSequence = async () => {
      await wait(initialDelay);

      for (let lineIndex = 0; lineIndex < text.length && !cancelled; lineIndex += 1) {
        setActiveLine(lineIndex);
        const sentence = text[lineIndex];

        for (let charIndex = 1; charIndex <= sentence.length && !cancelled; charIndex += 1) {
          setDisplayedLines((current) => {
            const next = [...current];
            next[lineIndex] = sentence.slice(0, charIndex);
            return next;
          });
          const speed = typingSpeed.min + Math.random() * (typingSpeed.max - typingSpeed.min);
          await wait(speed);
        }

        if (lineIndex < text.length - 1 && !cancelled) await wait(pauseDuration);
      }

      if (!cancelled) setIsComplete(true);
    };

    void typeSequence();
    return () => { cancelled = true; };
  }, [initialDelay, isVisible, pauseDuration, text, typingSpeed.max, typingSpeed.min]);

  useEffect(() => {
    const root = rootRef.current;
    const cursor = cursorRef.current;
    if (!root || !cursor || !isVisible || isComplete) return;

    const context = gsap.context(() => {
      gsap.fromTo(cursor, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power2.inOut", repeat: -1, yoyo: true });
    }, root);

    return () => context.revert();
  }, [isComplete, isVisible]);

  return (
    <div className={`text-type-sequence ${className}`} ref={rootRef}>
      <div className="text-type-sequence__accessible">
        {text.map((line) => <p key={line}>{line}</p>)}
      </div>
      <div aria-hidden="true">
        {text.map((line, index) => (
          <p className="text-type-sequence__line" key={line}>
            <span className="text-type-sequence__reserve">{line}</span>
            <span className="text-type-sequence__typed">
              {displayedLines[index]}
              {!isComplete && activeLine === index && (
                <span className="text-type-sequence__cursor" ref={cursorRef}>{cursorCharacter}</span>
              )}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
