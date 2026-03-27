/**
 * HeroMobileSection — MOBILE ONLY (<768px)
 * 0vh–100vh: Create Your / Dream Space + sofa + tagline + CTA button
 */

import React from 'react';

const HeroMobileSection = () => {
  const scrollToForm = () => {
    const form = document.getElementById('mobile-form-section');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#FAF8F5',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      overflow: 'hidden',
      paddingTop: '80px', // below nav
    }}>

      {/* Heading */}
      <div style={{ textAlign: 'center', padding: '1.5rem 1.5rem 0', zIndex: 2, position: 'relative' }}>
        <h1 style={{
          fontFamily: "'Lacroom', serif",
          fontWeight: 400,
          fontSize: 'clamp(3rem, 13vw, 5rem)',
          lineHeight: 1.0,
          color: '#2b2b2b',
          textTransform: 'uppercase',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          CREATE YOUR<br />
          <span style={{ color: '#B2000A' }}>DREAM SPACE</span>
        </h1>
      </div>

      {/* Sofa image — center, large */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '0',
        position: 'relative',
        zIndex: 2,
        maxHeight: '42vh',
      }}>
        <img
          src="/images/sofa.png"
          alt="Luxury sofa"
          style={{
            width: '90%',
            maxWidth: '360px',
            height: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.12))',
          }}
        />
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Urbanist', sans-serif",
        fontSize: 'clamp(0.85rem, 3.5vw, 1.05rem)',
        lineHeight: 1.6,
        color: '#5a5a5a',
        textAlign: 'center',
        padding: '0 2rem',
        marginTop: '1rem',
        marginBottom: '1.2rem',
        fontWeight: 400,
        position: 'relative', zIndex: 2,
      }}>
        Crafted interiors that turn spaces into homes that feel yours unmistakably.
      </p>

      {/* CTA Button */}
      <button
        onClick={scrollToForm}
        style={{
          backgroundColor: '#B2000A',
          color: '#fff',
          fontFamily: "'Urbanist', sans-serif",
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '0.85rem 2.2rem',
          borderRadius: '100px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '2.5rem',
          position: 'relative', zIndex: 2,
          boxShadow: '0 8px 24px rgba(178,0,10,0.3)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(178,0,10,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(178,0,10,0.3)';
        }}
      >
        Start Your Journey
      </button>
    </section>
  );
};

export default HeroMobileSection;
