/**
 * Home Page Component
 * LERP-based scroll animation with 200vh scroll area
 */

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroHeading from '../components/HeroHeading';
import HeroQuotes from '../components/HeroQuotes';
// import ImageRevealStack from '../components/ImageRevealStack';
import ScrollAnimationCanvas from '../components/ScrollAnimationCanvas';
import AboutUs from '../components/AboutUs';
import BeforeAfter from '../components/BeforeAfter';
import DesignStyles from '../components/DesignStyles';
// import FeaturedProjects from '../components/FeaturedProjects';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ServicesSection from '../components/ServicesSection';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show arrow only after scrolling past ~2000px (frame sections)
      if (window.scrollY > 2000) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Scroll To Top Button - Show only after frame sections */}
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

      {/* Canvas background (fixed, behind everything) */}
      <ScrollAnimationCanvas totalFrames={377} />

      {/* Hero Heading (positioned over canvas) */}
      <HeroHeading />
      <HeroQuotes />

      {/* Image Reveal Stack Section */}

      {/* 350vh scroll trigger area — provides enough space for the 400 frames to animate at a good pace */}
      <div className="h-[350vh]" />

      {/* AboutUs Section — appears after scroll animation completes */}
      <div id="about-us" className="relative z-20 bg-[#FAF8F5]">
        <AboutUs />
      </div>

      {/* <ImageRevealStack /> */}
      {/* Before / After scroll comparison */}
      <BeforeAfter />

      {/* Design Styles hover accordion */}
      <DesignStyles />
      <SectionHeader />
      <ServicesSection />
      {/* Antigravity Featured Projects Grid */}
      {/* <FeaturedProjects /> */}
      {/* Projects drag carousel */}
      <ProjectsCarousel />

      {/* Floating Envelope Contact Form */}
      <ContactForm />

      {/* Main Footer */}
      <Footer />
    </div>
  );
};

export default Home;
