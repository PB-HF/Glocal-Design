/**
 * HeroSection Component
 * Beautiful hero section that scrolls above the canvas animation
 * Created with Tailwind CSS
 */

import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative z-10 w-full h-screen bg-linear-to-b from-black/60 via-black/40 to-transparent flex items-center justify-center">
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-black/10 to-black/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Top accent */}
        <div className="mb-8 flex justify-center">
          <div className="inline-block px-4 py-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-md">
            <span className="text-white/70 text-sm uppercase tracking-widest font-light">
              Scroll to explore
            </span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight tracking-tight">
          Premium
          <br />
          <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-extralight">
            Animation Experience
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/70 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Experience cinematic scroll-driven animations that respond to every pixel of your scroll.
          Smooth, responsive, and absolutely stunning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started
          </button>
          <button className="px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
            Learn More
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <p className="text-white/50 text-sm mb-3">Scroll down</p>
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
