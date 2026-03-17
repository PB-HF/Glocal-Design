/**
 * useScrollAnimation Hook
 * Synchronizes canvas frames with GSAP ScrollTrigger
 * Eliminates manual scroll listeners for perfect page sync
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (canvasRef, framePreloader, totalFrames = 400) => {
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !framePreloader) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw frame function
    const drawFrame = (frameIndex) => {
      const frame = framePreloader.getFrame(Math.floor(frameIndex));
      if (!frame) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imgRatio = frame.width / frame.height;
      const canvasRatio = canvas.width / canvas.height;
      let dw, dh, dx, dy;

      if (imgRatio > canvasRatio) {
        dh = canvas.height;
        dw = dh * imgRatio;
        dx = (canvas.width - dw) / 2;
        dy = 0;
      } else {
        dw = canvas.width;
        dh = dw / imgRatio;
        dx = 0;
        dy = (canvas.height - dh) / 2;
      }

      ctx.drawImage(frame, dx, dy, dw, dh);
    };

    // Proxy object for GSAP to animate
    const airbnb = { frame: 0 };

    // Create ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      // End matches the spacer div's height in Home.jsx
      end: () => `${2.7 * window.innerHeight} top`, 
      scrub: 0.2, // Slightly more smoothing
      onUpdate: (self) => {
        const frameIndex = self.progress * (totalFrames - 1);
        drawFrame(frameIndex);
      },
      onRefresh: (self) => {
         // Fix canvas sizing on refresh
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
         // Draw the CORRECT frame for the current scroll position
         const frameIndex = self.progress * (totalFrames - 1);
         drawFrame(frameIndex);
      }
    });

    // Initial draw
    const init = async () => {
      // Ensure first frame is ready
      await framePreloader.loadFrame(0);
      drawFrame(0);
      // Refresh to sync with current scroll if already scrolled
      ScrollTrigger.refresh();
    };
    init();

    return () => {
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
    };
  }, [canvasRef, framePreloader, totalFrames]);

  return { scrollTrigger: scrollTriggerRef.current };
};
