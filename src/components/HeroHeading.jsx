/**
 * HeroHeading Component
 * Dynamic text overlay for the hero section
 * Positioned over the ScrollAnimationCanvas
 * Fades out after 100vh scroll
 */

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroHeading = () => {
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out the entire hero content as we scroll through the first 100vh
      gsap.to(componentRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "100vh top",
          scrub: true,
        },
        opacity: 0,
        y: -100,
        ease: "none"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={componentRef}
      className="fixed inset-0 w-full h-screen flex flex-col justify-start items-start z-10"
      style={{
        pointerEvents: 'none',
        paddingLeft: '3.3%', // Moved further left from 8%
        paddingTop: '22vh', // Added top margin to push content down
        background: 'transparent'
      }}
    >
      {/* Content wrapper - enables pointer events only for interactive items */}
      <div className="max-w-[1400px] w-full pointer-events-none">

        {/* Main Heading Group */}
        <div className="flex flex-col mb-8">
          <h1
            style={{
              fontFamily: "'Lacroom', serif",
              fontWeight: 400,
              fontSize: 'clamp(3rem, 8.8vw, 8.8rem)',
              lineHeight: 1.0,
              color: '#323232',
              textTransform: 'uppercase',
              margin: 0,
              letterSpacing: '-0.02em'
            }}
          >
            CREATE YOUR
          </h1>
          <h1
            style={{
              fontFamily: "'Lacroom', serif",
              fontWeight: 400,
              fontSize: 'clamp(3rem, 8.8vw, 8.8rem)',
              lineHeight: 1.0,
              color: '#B2000A', // Brand Dark Red
              textTransform: 'uppercase',
              margin: 0,
              letterSpacing: '-0.02em'
            }}
          >
            DREAM SPACE
          </h1>
        </div>

        {/* Subtext description */}
        <p
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '1.0rem',
            lineHeight: 1.6,
            color: '#000000', // Defaulted to black as requested
            maxWidth: '300px', // Reduced width as requested
            marginBottom: '2.5rem',
            fontWeight: 400,
          }}
        >
          <span style={{ color: '#B2000A', fontWeight: 600 }}>Crafted interiors</span> that turn spaces into homes that feel yours unmistakably.
        </p>

        {/* CTA Button */}
        <button
          style={{
            pointerEvents: 'auto',
            backgroundColor: '#B2000A',
            color: '#fff',
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            padding: '1.2rem 2.8rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            // boxShadow: '0 15px 35px rgba(178, 0, 10, 0.25)',
          }}
          className="hover:scale-105 hover:brightness-110 active:scale-95"
        >
          START YOUR JOURNEY
        </button>
      </div>

      {/* Scroll indicator - at the bottom center of the screen */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{
          bottom: '40px',
          color: '#323232',
          fontFamily: "'Urbanist', sans-serif",
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 500
        }}
      >
        <span>Scroll To Explore</span>
        <div className="animate-bounce">
          <ChevronDown size={20} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default HeroHeading;
