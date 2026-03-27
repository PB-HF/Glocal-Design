/**
 * Home Page Component
 * Desktop: New split hero (HeroDesktopSection) + AutoplayVideoSection
 * Mobile: HeroMobileSection + MobileFormSection (new clean layout)
 */

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroDesktopSection from '../components/HeroDesktopSection';
import AutoplayVideoSection from '../components/AutoplayVideoSection';

// Mobile-specific new layout
import HeroMobileSection from '../components/HeroMobileSection';
import MobileFormSection from '../components/MobileFormSection';
import ContactPopup from '../components/ContactPopup';

// Old mobile animation (commented out — kept for reference)
// import HeroHeading from '../components/HeroHeading';
// import HeroQuotes from '../components/HeroQuotes';
// import ScrollAnimationVideo from '../components/ScrollAnimationVideo';

import AboutUs from '../components/AboutUs';
import BeforeAfter from '../components/BeforeAfter';
import DesignStyles from '../components/DesignStyles';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ServicesSection from '../components/ServicesSection';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 2000);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Scroll To Top Button */}
      {showScrollButton && (
        <div className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50 animate-bounce">
          <button
            onClick={scrollToTop}
            className="w-10 h-10 md:w-12 md:h-12 border border-[#c4c4c4] rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm bg-white"
            aria-label="Scroll to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar />

      {/* Mobile Contact Popup */}
      {isMobile && <ContactPopup />}

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT (≥768px)
      ══════════════════════════════════════════════ */}
      <HeroDesktopSection />
      <AutoplayVideoSection />

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT (<768px)
          New: HeroMobileSection + MobileFormSection
          Old scroll animation commented out below:
            <ScrollAnimationVideo />
            <HeroHeading />
            <HeroQuotes />
            <div className="h-[350vh]" />
      ══════════════════════════════════════════════ */}
      {isMobile && (
        <>
          <HeroMobileSection />
          <MobileFormSection />
        </>
      )}

      {/* ══════════════════════════════════════════════
          SHARED SECTIONS (desktop + mobile)
      ══════════════════════════════════════════════ */}
      <div id="about-us" className="relative z-20 bg-[#FAF8F5]">
        <AboutUs />
      </div>

      <BeforeAfter />
      <DesignStyles />
      <SectionHeader />
      <ServicesSection />
      {/*
      <ContactForm />
      */}
      <ProjectsCarousel />
      <Footer />
    </div>
  );
};

export default Home;
