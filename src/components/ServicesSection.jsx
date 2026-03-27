/**
 * ServicesSection Component
 * Desktop: GSAP pinned stacked card animation
 * Mobile:  Simple scrollable stacked cards — NO GSAP pin (pin:true breaks on Android)
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "01",
    title: "Design\n Consultation",
    desc: "Thoughtful direction to help you shape spaces that feel personal and intentional.",
    image: "/images/service1.webp",
  },
  {
    id: "02",
    title: "Luxury\n Projects",
    desc: "Delivering high-value projects with careful planning, precision, and superior finishes.",
    image: "/images/service2.webp",
  },
  {
    id: "03",
    title: "Consultation\n + Execution",
    desc: "End-to-end execution, from concept development to the final handover.",
    image: "/images/service3.webp",
  },
];

/* ─── Mobile card — GSAP scroll-triggered fade+slide (NO pin) ─── */
const MobileServiceCard = ({ service }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 70, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} style={{
      width: '100%',
      height: '85dvh',
      borderRadius: '28px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
      willChange: 'transform, opacity',
    }}>
      {/* Blurred BG */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={service.image}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(1px) brightness(0.75)', transform: 'scale(1.08)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)' }} />
      </div>

      {/* Inner clear image */}
      <div style={{
        position: 'relative', zIndex: 1,
        margin: '1.5rem auto 0',
        width: '88%', height: '52%',
        borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
      }}>
        <img
          src={service.image}
          alt={service.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Text block */}
      <div style={{
        position: 'relative', zIndex: 2,
        flex: 1, padding: '1.5rem 1.8rem 2rem',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', color: '#fff',
      }}>
        <span style={{
          fontFamily: "'Lacroom', serif",
          fontSize: '1.4rem',
          color: 'rgba(255,255,255,0.22)',
          marginBottom: '0.4rem',
        }}>{service.id}</span>
        <h3 style={{
          fontFamily: "'Lacroom', serif",
          fontSize: 'clamp(2rem, 7vw, 2.6rem)',
          lineHeight: 1.05,
          marginBottom: '0.8rem',
          whiteSpace: 'pre-line',
        }}>{service.title}</h3>
        <p style={{
          fontFamily: "'Urbanist', sans-serif",
          fontSize: '0.92rem',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.6,
          maxWidth: '85%',
          fontWeight: 300,
        }}>{service.desc}</p>
      </div>
    </div>
  );
};

/* ─── Desktop section — GSAP pinned ─── */
const DesktopServicesSection = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Use gsap.context() for scoped cleanup — does NOT kill other page's triggers
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card-desktop');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 1.8,
          invalidateOnRefresh: true, // recalculate on viewport change
        }
      });

      let currentTime = 0;

      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, { y: '110%', opacity: 0 });
        }

        if (i > 0) {
          tl.to(card, { y: '0%', opacity: 1, duration: 2, ease: 'power3.inOut' }, currentTime);
          const prevCard = cards[i - 1];
          tl.to(prevCard, { scale: 0.9, opacity: 0, filter: 'blur(15px)', duration: 2, ease: 'power3.inOut' }, currentTime);
          currentTime += 2;
        }

        const innerImg = card.querySelector('.inner-clear-image');
        if (innerImg) {
          const startScale = i === 0 ? 1.12 : 1.25;
          const startY = i === 0 ? '2%' : '5%';
          tl.fromTo(innerImg, { scale: startScale, y: startY }, { scale: 1, y: '-5%', ease: 'none', duration: 2 }, currentTime);
        }

        currentTime += 2;
      });

      tl.to({}, { duration: 0.5 });
    }, triggerRef); // scope to triggerRef — only kills THIS component's triggers

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} style={{
      position: 'relative',
      zIndex: 10,
      backgroundColor: '#FAF8F5',
    }}>
      <div ref={containerRef} style={{
        width: '100%', height: '100dvh',
        position: 'relative', zIndex: 10,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 2rem',
      }}>
        <div style={{
          position: 'relative', width: '100%',
          maxWidth: '1600px', height: '80dvh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className="service-card-desktop group"
              style={{
                position: 'absolute', top: '50%', left: '50%',
                width: '100%', height: '100%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ffffff',
                borderRadius: '40px', overflow: 'hidden',
                display: 'flex', flexDirection: 'row',
                alignItems: 'center', justifyContent: 'center',
                zIndex: idx,
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* Blur BG */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <img src={service.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(1px) brightness(0.80)', transform: 'scale(1.4)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)' }} />
              </div>

              {/* Inner Clear Image */}
              <div style={{
                position: 'relative', marginLeft: '3.5rem',
                width: '42%', height: '95%',
                borderRadius: '30px', overflow: 'hidden',
                zIndex: 1, boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              }}>
                <img className="inner-clear-image" src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Content */}
              <div style={{
                position: 'relative', zIndex: 2, flex: 1,
                padding: '0 4rem 0 3rem',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'flex-end',
                textAlign: 'right', color: '#fff',
              }}>
                <span style={{ fontFamily: "'Lacroom', serif", fontSize: '2rem', color: 'rgba(255,255,255,0.25)', marginBottom: '1rem', letterSpacing: '0.05em' }}>{service.id}</span>
                <h3 style={{ fontFamily: "'Lacroom', serif", fontSize: 'clamp(2.5rem, 3.3vw, 2.7rem)', lineHeight: 1.0, marginBottom: '1.25rem', whiteSpace: 'pre-line', maxWidth: '650px' }}>{service.title}</h3>
                <p style={{ fontFamily: "'Urbanist', sans-serif", fontSize: '1.05rem', color: '#ffffff', lineHeight: 1.6, maxWidth: '300px', fontWeight: 300 }}>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Main export — switches between mobile/desktop ─── */
const ServicesSection = () => {
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <section style={{ backgroundColor: '#FAF8F5', padding: '2rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {SERVICES.map(service => (
          <MobileServiceCard key={service.id} service={service} />
        ))}
      </section>
    );
  }

  return <DesktopServicesSection />;
};

export default ServicesSection;