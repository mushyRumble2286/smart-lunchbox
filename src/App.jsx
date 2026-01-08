import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import PillNav from "./PillNav";
import logo from './assets/logo.png';
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

const SCROLL_BREAKPOINT = 1024; // Below this width, scroll navigation is disabled

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const scrollTimeout = useRef(null);

  // Check screen size and manage body classes
  useEffect(() => {
    const checkScreenSize = () => {
      const largeScreen = window.innerWidth >= SCROLL_BREAKPOINT;
      setIsLargeScreen(largeScreen);
      
      // Add/remove body class for scrolling
      if (!largeScreen) {
        document.body.classList.add('small-screen-body');
        document.documentElement.classList.add('small-screen-body');
      } else {
        document.body.classList.remove('small-screen-body');
        document.documentElement.classList.remove('small-screen-body');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
    if (isAnimating || !isLargeScreen) return;

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
  }, [activeIndex, isAnimating, isLargeScreen]);

  useEffect(() => {
    // Only add scroll event listeners on large screens
    if (!isLargeScreen) return;

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
  }, [handleScroll, isLargeScreen]);

  // Get current active href for navigation highlighting
  const activeHref = '/' + (SECTIONS[activeIndex]?.id || 'hero');

  return (
    <>
      {/* Single sticky navbar at the top */}
      <div className="app-navbar">
        <PillNav
          logo={logo}
          logoAlt="Company Logo"
          items={[
            { label: 'Home', href: '/hero' },
            { label: 'Problem', href: '/problem' },
            { label: 'Innovation', href: '/innovation' },
            { label: 'Team', href: '/team' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Contact', href: '/contact' }
          ]}
          activeHref={activeHref}
          className="custom-nav"
          ease="elastic3.easeOut"
          baseColor="#1a1f3a"
          pillColor="#f4c430"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#ffffff"
          onNavClick={handleNavClick}
        />
      </div>
      
      <div className={`zoom-container bg-black ${!isLargeScreen ? 'small-screen-mode' : ''}`}>
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
              style={!isLargeScreen ? {
                position: 'relative',
                height: '100vh',
                width: '100%',
                transform: 'none',
                opacity: 1,
                zIndex: 1,
                pointerEvents: 'auto'
              } : {}}
              initial={false}
              animate={!isLargeScreen ? {
                scale: 1,
                opacity: 1,
                zIndex: 1,
                pointerEvents: 'auto'
              } : {
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
              transition={{
                duration: isLargeScreen ? 1.2 : 0.3,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {section.component(handleNavClick)}
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
