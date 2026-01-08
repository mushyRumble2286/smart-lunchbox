import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Hero from "./components/hero";
import Problem from "./components/problem";
import Innovation from "./components/innovation";
import Team from "./components/team";
import Gallery from "./components/gallery";
import Contact from "./components/contact";
import './App.css'

const SECTIONS = [
  { id: 'hero', component: (onNavClick) => <Hero onNavClick={onNavClick} /> },
  { id: 'problem', component: (onNavClick) => <Problem onNavClick={onNavClick} /> },
  { id: 'innovation', component: (onNavClick) => <Innovation onNavClick={onNavClick} /> },
  { id: 'team', component: (onNavClick) => <Team onNavClick={onNavClick} /> },
  { id: 'gallery', component: (onNavClick) => <Gallery onNavClick={onNavClick} /> },
  { id: 'contact', component: (onNavClick) => <Contact onNavClick={onNavClick} /> },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollTimeout = useRef(null);

  const handleNavClick = (sectionId) => {
    if (isAnimating) return;
    
    const sectionIndex = SECTIONS.findIndex(section => section.id === sectionId);
    if (sectionIndex !== -1 && sectionIndex !== activeIndex) {
      setIsAnimating(true);
      setActiveIndex(sectionIndex);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const handleScroll = useCallback((deltaY) => {
    if (isAnimating) return;

    if (deltaY > 50 && activeIndex < SECTIONS.length - 1) {
      // Scroll Down
      setIsAnimating(true);
      setActiveIndex(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 1000); // Lock for animation duration
    } else if (deltaY < -50 && activeIndex > 0) {
      // Scroll Up
      setIsAnimating(true);
      setActiveIndex(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [activeIndex, isAnimating]);

  useEffect(() => {
    let touchStartY = 0;

    const onWheel = (e) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    };

    const onKeyDown = (e) => {
      if (e.key === "ArrowDown") handleScroll(100);
      if (e.key === "ArrowUp") handleScroll(-100);
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 50) {
        handleScroll(deltaY);
        touchStartY = touchEndY; // Reset for continuous swipe if needed
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [handleScroll]);

  return (
    <div className="zoom-container bg-black">
      {SECTIONS.map((section, index) => {
        const distance = index - activeIndex;
        const isActive = index === activeIndex;

        // Calculate scale and opacity based on distance from active
        // Active: scale 1, opacity 1
        // Previous: scale down (0.3, 0.1, etc)
        // Next: scale up (3, 5, 7, etc)
        let scale = 1;
        let opacity = 1;
        let zIndex = SECTIONS.length - Math.abs(distance);

        if (distance < 0) {
          // Sections that have passed
          scale = Math.max(0, 1 + distance * 0.7);
          opacity = 0;
        } else if (distance > 0) {
          // Sections yet to come
          scale = 1 + distance * 3;
          opacity = 0;
        }

        return (
          <motion.div
            key={section.id}
            className="zoom-section"
            initial={false}
            animate={{
              scale: scale,
              opacity: opacity,
              zIndex: zIndex,
              pointerEvents: isActive ? 'auto' : 'none'
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {section.component(handleNavClick)}
          </motion.div>
        );
      })}
    </div>
  );
}
