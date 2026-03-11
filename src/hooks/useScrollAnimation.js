/**
 * useScrollAnimation Hook
 * Synchronizes scroll position with animation frame index
 * Uses GSAP ScrollTrigger for high-performance tracking
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (canvasRef, framePreloader, totalFrames = 120) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationRef = useRef(null);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !framePreloader) {
      console.warn('❌ Missing canvas or preloader');
      return;
    }

    console.log('📋 useScrollAnimation useEffect running...');
    console.log('  Canvas:', canvasRef.current);
    console.log('  Preloader:', framePreloader);
    console.log('  Frames available:', framePreloader.frames.length);

    // Draw frame function
    const drawFrame = (frameIndex) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.warn('❌ Canvas not found');
        return;
      }

      const ctx = canvas.getContext('2d');
      const frame = framePreloader.getFrame(frameIndex);

      if (!frame) {
        console.warn(`⚠️ Frame ${frameIndex} not loaded yet`);
        // Draw a placeholder
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#888';
        ctx.font = '14px monospace';
        ctx.fillText(`Waiting for frame ${frameIndex}...`, 20, 40);
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate dimensions to maintain aspect ratio
      const imgAspectRatio = frame.width / frame.height;
      const canvasAspectRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgAspectRatio > canvasAspectRatio) {
        // Image is wider - fit to canvas height
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgAspectRatio;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        // Image is taller - fit to canvas width
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgAspectRatio;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }

      // Draw frame on canvas
      try {
        ctx.drawImage(frame, drawX, drawY, drawWidth, drawHeight);
        if (frameIndex % 50 === 0) {
          console.log(`✏️ Drew frame ${frameIndex} | Size: ${frame.width}x${frame.height}`);
        }
      } catch (e) {
        console.error(`❌ Failed to draw frame ${frameIndex}:`, e);
      }
    };

    console.log('🎯 Setting up ScrollTrigger...');

    // Create a timeline that spans the entire scrollable area
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        markers: false,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;

          // Calculate frame index based on scroll progress
          const frameIndex = Math.floor(self.progress * totalFrames);
          const clampedIndex = Math.max(0, Math.min(frameIndex, totalFrames - 1));

          setCurrentFrame(clampedIndex);

          // Draw frame on canvas using requestAnimationFrame for smoothness
          if (animationRef.current === null) {
            animationRef.current = requestAnimationFrame(() => {
              drawFrame(clampedIndex);
              animationRef.current = null;
            });
          }
        },
      },
    });

    // Draw initial frame immediately
    console.log('🎨 Drawing initial frame 0...');
    drawFrame(0);

    // Cleanup
    return () => {
      console.log('Cleaning up ScrollTrigger');
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [canvasRef, framePreloader, totalFrames]);

  return {
    currentFrame,
    scrollProgress: scrollProgressRef.current,
  };
};
