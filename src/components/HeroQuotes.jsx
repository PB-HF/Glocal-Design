/**
 * HeroQuotes Component
 * Displays secondary brand quotes during the 100vh - 200vh scroll phase
 * Uses GSAP ScrollTrigger for smooth fade-in/out
 */

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroQuotes = () => {
  const containerRef = useRef(null);
  const shadowRef = useRef(null);

  // Helper to wrap every letter in a span
  const splitLetters = (text) => {
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className="letter" 
        style={{ 
          display: 'inline-block', 
          lineHeight: '1em', 
          transformOrigin: '0 0' 
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray('.letter');

      // Timeline for the quotes visibility - Persistent from 210vh onwards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "330vh top", // Delayed trigger so it starts later
          end: "430vh top",   // Adjusted end point correspondingly
          scrub: 1,
        }
      });

      // Reveal container first (starts from lower down now: y: 150 instead of 60)
      tl.fromTo(containerRef.current,
        { opacity: 0, y: 150 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      // Domino rotation animation starts AFTER container settles
      tl.fromTo(letters,
        { rotateY: -90, opacity: 0 },
        { 
          rotateY: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 1.5,
          ease: "power2.out"
        },
        "+=0.2" // Slight delay after container settles
      );

      // Stay visible
      tl.to(containerRef.current, { opacity: 1, duration: 2 });

      // Shadow gradient animation from 400vh to 430vh
      const shadowTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "400vh top",
          end: "430vh top",
          scrub: 1,
        }
      });

      // Animate shadow opacity from 0 to full during settling phase
      shadowTl.fromTo(shadowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 w-full z-[0] pointer-events-none px-[6%] pt-32 pb-8"
      style={{
        opacity: 0,
        willChange: 'opacity, transform',
        perspective: '1000px',
      }}
    >
      {/* Shadow Overlay - Reveals during settling phase (400vh-430vh) */}
      <div
        ref={shadowRef}
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{
          height: '100%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)',
          opacity: 0,
          zIndex: -1,
        }}
      />

      <div className="max-w-[1500px] mx-auto flex items-end justify-between">

        {/* Bottom Left Quote */}
        <div className="max-w-[450px]">
          <h3
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.8rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#FFFFFF',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              margin: 0,
            }}
          >
            {splitLetters("Homes That Reflect")}
            <br />
            {splitLetters("The Lives Within")}
          </h3>
        </div>

        {/* Bottom Right Quote */}
        <div className="max-w-[650px] text-right">
          <p
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.8rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#ffffff',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              margin: 0,
            }}
          >
            {splitLetters("Great Interiors Don't Begin With Layouts")}
            <br />
            {splitLetters("Or Materials. They Begin With People.")}
          </p>
        </div>

      </div>
    </div>
  );
};

export default HeroQuotes;
