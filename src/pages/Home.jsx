/**
 * Home Page Component
 * Clean scroll animation canvas with 200vh scroll area
 */

import React from 'react';
import ScrollAnimationCanvas from '../components/ScrollAnimationCanvas';

const Home = () => {
  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Animated canvas background (fixed) */}
      <ScrollAnimationCanvas totalFrames={400} />

      {/* 200vh scroll trigger area */}
      <div className="h-[200vh]" />
    </div>
  );
};

export default Home;
