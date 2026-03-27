import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

const ContactPopup = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', description: '', hp_field: '',
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Check if form was already submitted
    const isSubmitted = localStorage.getItem('contactFormSubmitted');
    
    if (!isSubmitted) {
      // Show on reload/mount with a small delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Animation when opening
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 });
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = ''; 
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
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
      .then(() => { 
        // Set localStorage ONLY on successful API hit
        localStorage.setItem('contactFormSubmitted', 'true');
        setIsOpen(false);
        if (onClose) onClose();
        window.location.href = 'https://glocaldesign.in/thank-you/'; 
      })
      .catch((err) => { 
        console.error('EmailJS Error:', err);
        setErrors({ submit: 'Failed. Try again.' }); 
        setIsSending(false); 
      });
  };

  if (!isOpen) return null;

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
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
      }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '2.5rem 1.8rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '0.8rem',
            right: '0.8rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#2b2b2b',
          }}
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2 style={{
          fontFamily: "'Lacroom', serif",
          fontWeight: 400,
          fontSize: '1.8rem',
          color: '#2b2b2b',
          lineHeight: 1.15,
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          Design The Home You've<br />Always Imagined
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Honeypot */}
          <input type="text" name="hp_field" value={formData.hp_field}
            onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

          {fields.map(f => (
            <div key={f.name} style={{ position: 'relative', marginBottom: '0.4rem' }}>
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
            backgroundColor: '#B2000A',
            border: 'none',
            borderRadius: '4px',
            fontFamily: "'Urbanist', sans-serif",
            fontSize: '1rem',
            color: '#fff',
            cursor: isSending ? 'not-allowed' : 'pointer',
            padding: '0.8rem 0',
            textAlign: 'center',
            letterSpacing: '0.05em',
            opacity: isSending ? 0.6 : 1,
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            {isSending ? 'Sending…' : 'Submit'}
          </button>
          
          <p 
            onClick={handleClose}
            style={{ 
              color: '#666', 
              fontSize: '0.8rem', 
              textAlign: 'center', 
              marginTop: '1.2rem', 
              cursor: 'pointer',
              textDecoration: 'underline',
              fontFamily: "'Urbanist', sans-serif"
            }}
          >
            Skip for now
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;
