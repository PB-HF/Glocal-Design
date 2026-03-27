/**
 * MobileFormSection — MOBILE ONLY (<768px)
 * 100vh–200vh: Red background (#B2000A) with white form box
 * Same EmailJS as ContactForm.jsx
 */

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const MobileFormSection = () => {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', description: '', hp_field: '',
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

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
    ['name', 'phone', 'email', 'city', 'description'].forEach(k => {
      const err = validate(k, formData[k]);
      if (err) newErrors[k] = err;
    });
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setIsSending(true);
    emailjs.send('service_5ukbpwr', 'template_6vphkp9', formData, 'iaQXY9VcI_ev3jcNL')
      .then(() => { window.location.href = 'https://glocaldesign.in/thank-you/'; })
      .catch(() => { setErrors({ submit: 'Failed. Try again.' }); setIsSending(false); });
  };

  const inputStyle = (hasErr) => ({
    width: '100%',
    border: 'none',
    borderBottom: `1px solid ${hasErr ? '#ff4d4d' : '#d0c8c2'}`,
    padding: '0.9rem 0',
    fontFamily: "'Urbanist', sans-serif",
    fontSize: '0.9rem',
    color: '#2b2b2b',
    backgroundColor: 'transparent',
    outline: 'none',
  });

  const fields = [
    { name: 'name', placeholder: 'Name*', type: 'text' },
    { name: 'phone', placeholder: 'Phone No.*', type: 'tel' },
    { name: 'city', placeholder: 'City*', type: 'text' },
    { name: 'email', placeholder: 'Email*', type: 'email' },
    { name: 'description', placeholder: 'Description*', type: 'text' },
  ];

  return (
    <section
      id="mobile-form-section"
      style={{
        width: '100%',
        minHeight: '100svh',
        backgroundColor: '#B2000A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.2rem',
      }}
    >
      {/* White form card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '2.5rem 2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}>
        <h2 style={{
          fontFamily: "'Lacroom', serif",
          fontWeight: 400,
          fontSize: 'clamp(1.6rem, 6vw, 2rem)',
          color: '#2b2b2b',
          lineHeight: 1.15,
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          Design The Home You've<br />Always Imagined
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Honeypot */}
          <input type="text" name="hp_field" value={formData.hp_field}
            onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

          {fields.map(f => (
            <div key={f.name} style={{ position: 'relative', marginBottom: '0.5rem' }}>
              <input
                name={f.name} type={f.type} placeholder={f.placeholder}
                value={formData[f.name]} onChange={handleChange}
                style={inputStyle(errors[f.name])}
              />
              {errors[f.name] && (
                <span style={{ fontSize: '0.6rem', color: '#ff4d4d', position: 'absolute', bottom: '-12px', left: 0 }}>
                  {errors[f.name]}
                </span>
              )}
            </div>
          ))}

          {errors.submit && (
            <p style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '0.5rem' }}>{errors.submit}</p>
          )}

          <button type="submit" disabled={isSending} style={{
            width: '100%',
            marginTop: '2rem',
            backgroundColor: 'transparent',
            border: 'none',
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '1rem',
            color: '#2b2b2b',
            cursor: isSending ? 'not-allowed' : 'pointer',
            padding: '0.5rem 0',
            textAlign: 'center',
            letterSpacing: '0.05em',
            opacity: isSending ? 0.6 : 1,
          }}>
            {isSending ? 'Sending…' : 'Submit'}
            <div style={{
              height: '1px', width: '40px', backgroundColor: '#2b2b2b',
              margin: '4px auto 0',
            }} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default MobileFormSection;
