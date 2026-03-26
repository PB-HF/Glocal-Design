/**
 * ScrollAnimationCanvas Component
 * Renders animation frames on canvas controlled by scroll
 * LERP-based smooth rendering with sticky canvas
 */

import React, { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import FramePreloader from '../utils/framePreloader';

const ScrollAnimationCanvas = ({ totalFrames = 377, onLoadingProgress }) => {
  const canvasRef = useRef(null);
  const framePreloaderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [effectiveFrames, setEffectiveFrames] = useState(totalFrames);
  const [framePath, setFramePath] = useState('/frames');
  const [progress, setProgress] = useState(0);

  // Detect mobile on mount and on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        setEffectiveFrames(224);
        setFramePath('/frames2');
      } else {
        setEffectiveFrames(377);
        setFramePath('/frames');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize preloader with responsive frames
  if (!framePreloaderRef.current || framePreloaderRef.current.framePath !== framePath) {
    framePreloaderRef.current = new FramePreloader(effectiveFrames, framePath);
    
    // Register progress callback
    framePreloaderRef.current.onProgress((progress) => {
      setProgress(progress);
      if (onLoadingProgress) {
        onLoadingProgress(progress);
      }
    });
  }

  // Hook for LERP animation
  useScrollAnimation(canvasRef, framePreloaderRef.current, effectiveFrames);

  // Preload all frames
  useEffect(() => {
    framePreloaderRef.current.preloadFrames();
  }, [effectiveFrames, framePath]);

  // Setup canvas size
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  return (
    <div className="relative w-full h-0">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{ display: 'block', transform: 'translateZ(0)', willChange: 'transform' }}
      />
    </div>
  );
};

export default ScrollAnimationCanvas;
