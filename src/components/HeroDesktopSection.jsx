/**
 * HeroDesktopSection — DESKTOP ONLY (hidden on mobile)
 * 0vh–100vh: Left = HeroHeading content, Right = Inline Contact Form
 * Same EmailJS integration as ContactForm.jsx
 */

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

const IMAGEKIT_URL = import.meta.env.VITE_IMAGEKIT_URL || '';

const HeroDesktopSection = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', description: '', hp_field: '',
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Count-up stats
  const STATS = [
    { target: 200, suffix: '+', label: 'Projects' },
    { target: 15,  suffix: '+', label: 'Years' },
    { target: 50,  suffix: '+', label: 'Designers' },
  ];
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    const duration = 2000; // ms
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3); // cubic ease-out

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      setCounts(STATS.map(s => Math.floor(eased * s.target)));
      if (progress < 1) requestAnimationFrame(tick);
      else setCounts(STATS.map(s => s.target)); // snap to final
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const validate = (name, value) => {
    if (!value.trim()) return 'Required';
    if (name === 'phone' && !/^[0-9]{10}$/.test(value)) return 'Valid 10-digit number';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Valid email';
    if (name === 'description' && value.length < 10) return 'Min 10 chars';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.hp_field) return;
    const newErrors = {};
    ['name','phone','email','city','description'].forEach(k => {
      const err = validate(k, formData[k]);
      if (err) newErrors[k] = err;
    });
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setIsSending(true);
    emailjs.send('service_5ukbpwr', 'template_6vphkp9', formData, 'iaQXY9VcI_ev3jcNL')
      .then(() => { window.location.href = 'https://glocaldesign.in/thank-you/'; })
      .catch(() => { setErrors({ submit: 'Failed. Please try again.' }); setIsSending(false); });
  };

  return (
    <section style={{
      display: 'none', // hidden on mobile by default
      position: 'relative',
      width: '100%',
      height: '100vh',
      backgroundColor: '#FAF8F5',
      overflow: 'hidden',
    }}
    className="hero-desktop-section"
    >
      {/* Left — Heading 45% */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: -30,
        width: '45%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 2vw 0 5vw',
        overflow: 'hidden',
      }}>


        {/* Main heading */}
        <h1 style={{
          fontFamily: "'Lacroom', serif",
          fontWeight: 400,
          fontSize: 'clamp(3.5rem, 6vw, 6rem)',
          lineHeight: 1.0,
          color: '#323232',
          textTransform: 'uppercase',
          margin: 0,
          letterSpacing: '-0.02em',
          position: 'relative', zIndex: 2,
        }}>
          CREATE YOUR<br />
          <span style={{ color: '#B2000A' }}>DREAM SPACE</span>
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: "'Urbanist', sans-serif",
          fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
          lineHeight: 1.6,
          color: '#5a5a5a',
          maxWidth: '480px',
          marginTop: '2rem',
          marginBottom: '2.5rem',
          fontWeight: 400,
          position: 'relative', zIndex: 2,
        }}>
          Crafted interiors that turn spaces into homes that feel yours unmistakably.
        </p>

        {/* Decorative line */}
        <div style={{ width: '60px', height: '1px', backgroundColor: '#B2000A', marginBottom: '2rem', position: 'relative', zIndex: 2 }} />

        {/* Stats row — count-up animation */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start', flexShrink: 0 }}>
            {STATS.map((stat, i) => (
              <div key={stat.label}>
                <p style={{
                  fontFamily: "'Lacroom', serif",
                  fontSize: '2rem',
                  color: '#2b2b2b',
                  margin: 0,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  minWidth: '3.5rem',
                }}>{counts[i]}{stat.suffix}</p>
                <p style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: '0.7rem',
                  color: '#9a9080',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  margin: '4px 0 0',
                }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sofa — BG decoration, bottom center of left panel */}
        <img
          src="/images/sofa.png"
          alt=""
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.45';
            e.currentTarget.style.filter = 'drop-shadow(0 0 28px rgba(178,120,60,0.65))';
            e.currentTarget.style.transform = 'scale(1.04)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '0.18';
            e.currentTarget.style.filter = 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))';
            e.currentTarget.style.transform = 'none';
          }}
          style={{
            position: 'absolute',
            bottom: '-6%',
            right: 0,
            left: 'auto',
            transform: 'none',
            width: '58%',
            height: 'auto',
            objectFit: 'contain',
            opacity: 0.18,
            zIndex: 1,
            userSelect: 'none',
            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))',
            transition: 'opacity 0.4s ease, filter 0.4s ease, transform 0.4s ease',
          }}
        />
      </div>

      {/* Vertical divider */}
      <div style={{
        position: 'absolute',
        left: '45%',
        top: '10%',
        height: '80%',
        width: '1px',
        backgroundColor: '#e8e2dc',
      }} />

      {/* Right — Form 42% */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '55%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5vw 0 4vw',
        overflowY: 'auto',
      }}>
        <p style={{
          fontFamily: "'Urbanist', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#9a9080',
          marginBottom: '1.5rem',
          fontWeight: 600,
        }}>Book A Consultation</p>

        <h2 style={{
          fontFamily: "'Lacroom', serif",
          fontWeight: 400,
          fontSize: 'clamp(1.6rem, 2.2vw, 2.5rem)',
          color: '#2b2b2b',
          lineHeight: 1.1,
          marginBottom: '2.5rem',
        }}>
          Design The Home<br />You've Always Imagined
        </h2>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Honeypot */}
          <input type="text" name="hp_field" value={formData.hp_field} onChange={handleChange}
            style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

          {/* 2-col grid — larger inputs, more breathing room */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.8rem 2.5rem', marginBottom: '1.8rem' }}>
            {[
              { name: 'name', placeholder: 'Name*', type: 'text' },
              { name: 'phone', placeholder: 'Phone No.*', type: 'tel' },
              { name: 'email', placeholder: 'Email*', type: 'email' },
              { name: 'city', placeholder: 'City*', type: 'text' },
            ].map(f => (
              <div key={f.name} style={{ position: 'relative' }}>
                <input
                  name={f.name} type={f.type} placeholder={f.placeholder}
                  value={formData[f.name]} onChange={handleChange}
                  style={{
                    width: '100%', border: 'none',
                    borderBottom: errors[f.name] ? '1.5px solid #ff4d4d' : '1.5px solid #d4c9be',
                    padding: '1rem 0', fontFamily: "'Urbanist', sans-serif",
                    fontSize: '1rem', color: '#2b2b2b', backgroundColor: 'transparent',
                    outline: 'none', transition: 'border-color 0.3s',
                  }}
                />
                {errors[f.name] && (
                  <span style={{ position: 'absolute', bottom: '-14px', left: 0, fontSize: '0.6rem', color: '#ff4d4d' }}>
                    {errors[f.name]}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Description full width */}
          <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
            <input
              name="description" type="text" placeholder="Tell us about your space*"
              value={formData.description} onChange={handleChange}
              style={{
                width: '100%', border: 'none',
                borderBottom: errors.description ? '1.5px solid #ff4d4d' : '1.5px solid #d4c9be',
                padding: '1rem 0', fontFamily: "'Urbanist', sans-serif",
                fontSize: '1rem', color: '#2b2b2b', backgroundColor: 'transparent',
                outline: 'none',
              }}
            />
            {errors.description && (
              <span style={{ position: 'absolute', bottom: '-14px', left: 0, fontSize: '0.6rem', color: '#ff4d4d' }}>
                {errors.description}
              </span>
            )}
          </div>

          {errors.submit && (
            <p style={{ color: '#ff4d4d', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{errors.submit}</p>
          )}

          {/* Submit */}
          <button type="submit" disabled={isSending} style={{
            backgroundColor: '#B2000A',
            color: '#fff',
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            padding: '1.1rem 0',
            width: '100%',
            borderRadius: '6px',
            border: 'none',
            cursor: isSending ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: isSending ? 0.7 : 1,
            textTransform: 'uppercase',
          }}>
            {isSending ? 'Sending…' : 'BOOK CONSULTATION'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroDesktopSection;
