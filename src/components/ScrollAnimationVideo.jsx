/**
 * ScrollAnimationVideo — OPTIMIZED
 * 
 * Lag fix: Use RAF loop to draw continuously from video,
 * instead of waiting for 'seeked' event (which is async and causes visible lag).
 * Video currentTime is set directly from scroll — RAF draws whatever frame is ready.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGEKIT_URL = import.meta.env.VITE_IMAGEKIT_URL || '';
const VIDEO_DESKTOP = IMAGEKIT_URL ? `${IMAGEKIT_URL}/hero.mp4` : '/hero.mp4';
const VIDEO_MOBILE  = IMAGEKIT_URL ? `${IMAGEKIT_URL}/hero-mobile.mp4` : '/hero-mobile.mp4';

const ScrollAnimationVideo = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const targetTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const isMobile = window.innerWidth < 768;
    video.src = isMobile ? VIDEO_MOBILE : VIDEO_DESKTOP;
    video.load();

    // Canvas sizing
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.imageSmoothingEnabled = false; // faster — no smoothing needed for video

    // Cover-fit calculation (cached on resize)
    let drawParams = {};
    const calcDrawParams = () => {
      if (!video.videoWidth) return;
      const vr = video.videoWidth / video.videoHeight;
      const cr = canvas.width / canvas.height;
      if (vr > cr) {
        drawParams.h = canvas.height;
        drawParams.w = drawParams.h * vr;
        drawParams.x = (canvas.width - drawParams.w) / 2;
        drawParams.y = 0;
      } else {
        drawParams.w = canvas.width;
        drawParams.h = drawParams.w / vr;
        drawParams.x = 0;
        drawParams.y = (canvas.height - drawParams.h) / 2;
      }
    };
    video.addEventListener('loadedmetadata', calcDrawParams);
    window.addEventListener('resize', calcDrawParams);

    // RAF loop — draws whatever frame video has ready RIGHT NOW
    // No waiting for 'seeked' — this is the key to smooth scrubbing
    const LERP = 0.15;
    let currentTime = 0;

    const loop = () => {
      if (video.readyState >= 2 && video.videoWidth) {
        // Smooth lerp towards target time
        currentTime += (targetTimeRef.current - currentTime) * LERP;
        
        // Only update if meaningful change (avoids unnecessary seeks)
        if (Math.abs(video.currentTime - currentTime) > 0.01) {
          video.currentTime = currentTime;
        }

        // Draw current video frame immediately — no waiting
        if (drawParams.w) {
          ctx.drawImage(video, drawParams.x, drawParams.y, drawParams.w, drawParams.h);
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    video.addEventListener('loadeddata', () => {
      calcDrawParams();
      rafRef.current = requestAnimationFrame(loop);
    });

    // GSAP ScrollTrigger — just update the target time
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      endTrigger: '#about-us',
      end: 'top bottom',
      scrub: true,
      onUpdate: (self) => {
        if (video.duration) {
          targetTimeRef.current = self.progress * video.duration;
        }
      },
    });

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('resize', calcDrawParams);
      cancelAnimationFrame(rafRef.current);
      trigger.kill();
    };
  }, []);

  return (
    <div className="relative w-full h-0">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen z-0"
        style={{ display: 'block', transform: 'translateZ(0)', willChange: 'transform' }}
      />
    </div>
  );
};

export default ScrollAnimationVideo;
