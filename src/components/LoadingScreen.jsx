 /**
 * Professional Loading Screen
 * Shows while frames are loading
 * Includes animated logo and smooth progress indicator
 */

import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ isLoading, progress = 0 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation (only increases, never decreases)
  useEffect(() => {
    setDisplayProgress(prev => {
      const newProgress = Math.min(progress, 100);
      // Only update if the new progress is greater than or equal to current
      return Math.max(prev, newProgress);
    });
  }, [progress]);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(135deg, #FAF8F5 0%, #FFFFFF 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        willChange: 'opacity',
      }}
    >
      {/* Logo Container */}
      <div
        style={{
          marginBottom: '3rem',
          animation: 'float 4s ease-in-out infinite',
          filter: 'drop-shadow(0 20px 40px rgba(178, 0, 10, 0.15))',
        }}
      >
        <img
          src="/images/logo.png"
          alt="Glocal Design"
          style={{
            height: 'clamp(60px, 10vw, 100px)',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Animated Ring */}
      {/* <div
        style={{
          marginBottom: '2.5rem',
          position: 'relative',
          width: '80px',
          height: '80px',
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'spin 2s linear infinite',
          }}
        >
          <circle
            cx="40"
            cy="40"
            r="35"
            fill="none"
            stroke="#B2000A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="55 219.9"
            opacity="0.6"
          />
        </svg>
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          style={{
            position: 'absolute',
            inset: 0,
            animation: 'spinReverse 3s linear infinite',
          }}
        >
          <circle
            cx="40"
            cy="40"
            r="25"
            fill="none"
            stroke="#E84C3D"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="40 157.1"
            opacity="0.4"
          />
        </svg>
      </div> */}

      {/* Progress Bar Container */}
      <div
        style={{
          width: '200px',
          height: '4px',
          backgroundColor: '#E8E3DD',
          borderRadius: '100px',
          overflow: 'hidden',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        {/* Animated Progress Bar */}
        <div
          style={{
            height: '100%',
            width: `${displayProgress}%`,
            background: 'linear-gradient(90deg, #B2000A 0%, #E84C3D 100%)',
            borderRadius: '100px',
            transition: 'width 0.4s cubic-bezier(0.34, 1.1, 0.64, 1)',
            willChange: 'width',
          }}
        />
      </div>

      {/* Floating Dots Animation */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginTop: '2.5rem',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#B2000A',
              animation: `bounce 1.4s infinite ease-in-out`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          40% {
            transform: translateY(-12px);
            opacity: 0.7;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
