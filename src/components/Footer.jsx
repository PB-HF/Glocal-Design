import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        paddingTop: '4rem',
        paddingBottom: '0', 
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 30, 
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '0 0', width: '100%' }}>

        {/* ── Top Section: Columns & Socials ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end', // Aligns icons with the bottom line (email)
            marginBottom: '2.5rem',
          }}
        >
          {/* Columns Container */}
          {/* <div
            style={{
              display: 'flex',
              gap: '6rem',
              flexWrap: 'wrap',
            }}
          > */}
            {/* Column 1: Quick Links */}
            {/* <div>
              <h4 style={colHeadingStyle}>Quick Links</h4>
              <ul style={listStyle}>
                <li style={listItemStyle}>Home</li>
                <li style={listItemStyle}>About Us</li>
                <li style={listItemStyle}>Services</li>
                <li style={listItemStyle}>Contact Us</li>
              </ul>
            </div> */}

            {/* Column 2: Services */}
            {/* <div>
              <h4 style={colHeadingStyle}>Services</h4>
              <ul style={listStyle}>
                <li style={listItemStyle}>Turnkey Design & Build</li>
                <li style={listItemStyle}>Design Consultation</li>
                <li style={listItemStyle}>Consultation + Execution</li>
              </ul>
            </div> */}
          {/* </div> */}

            {/* Column 3: Contact */}
            <div>
              <h4 style={colHeadingStyle}>Contact</h4>
              <ul style={listStyle}>
                <li style={listItemStyle}>Glocal Design</li>
                <li style={listItemStyle}>B-73, Head Field Solutions,<br />Sector-57, Noida</li>
                <li style={listItemStyle}>+91 91661 97371</li>
                <li style={listItemStyle}>Info@Glocaldesign.Com</li>
              </ul>
            </div>

          {/* Social Icons Container - Now back to the far right, level with email */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <SocialIcon type="linkedin" />
            <SocialIcon type="instagram" />
            <SocialIcon type="youtube" />
          </div>
        </div>

        {/* ── Divider Line ── */}
        <div style={{ width: '100%', height: '1.2px', backgroundColor: '#e5e5e5', marginBottom: '1.5rem' }} />

        {/* ── Copyright ── */}
        <div style={{ textAlign: 'center'}}>
          <p
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: '0.8rem',
              color: '#a0a0a0',
              fontWeight: 400,
            }}
          >
            Copyright © 2025 - All Rights Reserved By Glocal Studio.
          </p>
        </div>
      </div>

      {/* ── Massive Bottom Text ── */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          marginTop: '1rem',
          paddingBottom: '0',
        }}
      >
        <h1
          style={{
            fontFamily: "'Lacroom', serif",
            fontWeight: 400,
            fontSize: '14.36vw', 
            lineHeight: 1.0, // Tighter line height
            margin: 0,
            marginBottom: '-3vw', // Pulls the text down further to remove the internal font gap
            whiteSpace: 'nowrap',
            letterSpacing: '-0.03em',
          }}
        >
          GLOCAL DESIGN
        </h1>
      </div>
    </footer>
  );
};

// ── Reusable Styles ──

const colHeadingStyle = {
  fontFamily: "'Urbanist', sans-serif",
  fontWeight: 600,
  fontSize: '0.95rem',
  color: '#2b2b2b',
  marginBottom: '1.2rem',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
};

const listItemStyle = {
  fontFamily: "'Urbanist', sans-serif",
  fontWeight: 400,
  fontSize: '0.85rem',
  color: '#080808ff',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
};

// ── Social Icon SVG Component ──

const SocialIcon = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 'linkedin':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      case 'instagram':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'youtube':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        backgroundColor: '#b2000a',
        color: '#fff',
        borderRadius: '5px', // slightly rounded square
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      className="hover:-translate-y-1"
    >
      {getIcon()}
    </div>
  );
};

export default Footer;
