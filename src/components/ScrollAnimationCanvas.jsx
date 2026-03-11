/**
 * ScrollAnimationCanvas Component
 * Renders animation frames on canvas controlled by scroll
 * Fixed background positioning with smooth frame rendering
 */

import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import FramePreloader from '../utils/framePreloader';

const ScrollAnimationCanvas = ({ totalFrames = 400 }) => {
  const canvasRef = useRef(null);
  const framePreloaderRef = useRef(null);
  const [frameCount, setFrameCount] = useState(0);

  // Initialize preloader FIRST (before any hooks)
  if (!framePreloaderRef.current) {
    framePreloaderRef.current = new FramePreloader(totalFrames);
  }

  // Now safe to call hook with initialized preloader
  const { currentFrame } = useScrollAnimation(
    canvasRef,
    framePreloaderRef.current,
    totalFrames
  );

  // Initialize frame preloader and preload frames
  useEffect(() => {
    console.log('🎬 Component mounted, starting frame loading...');
    
    const preloader = framePreloaderRef.current;

    // Track progress
    const checkInterval = setInterval(() => {
      const count = preloader.loadedCount;
      setFrameCount(count);
      if (count > 0 && count % 50 === 0) {
        console.log(`📊 Loaded ${count}/${totalFrames} frames`);
      }
    }, 200);

    // Start preloading
    preloader.preloadFrames().then(() => {
      console.log(`✅ All frames loaded: ${preloader.loadedCount}/${totalFrames}`);
      clearInterval(checkInterval);
    });

    return () => clearInterval(checkInterval);
  }, [totalFrames]);

  // Setup canvas on mount - ONLY ONCE
  useEffect(() => {
    if (!canvasRef.current) return;

    console.log('📐 Setting up canvas once...');
    const canvas = canvasRef.current;
    
    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
    
    // Draw initial message
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#888888';
    ctx.font = '14px monospace';
    ctx.fillText('Frames loading... scroll to play', 20, 40);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log(`Canvas resized to ${canvas.width}x${canvas.height}`);
      // Scroll hook will redraw after resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency - only run ONCE on mount

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Canvas only - no overlays */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{
          display: 'block',
        }}
      />
    </div>
  );
};

export default ScrollAnimationCanvas;
