/**
 * HeroSubtitle Component
 * Elegant subtitle text above the main heading
 */

import React from 'react';

const HeroSubtitle = () => {
  return (
    <h2
      className="font-mosseta font-normal text-[64.61px] leading-[104%] tracking-[0%] uppercase text-[#323232]"
      style={{
        fontFamily: 'Mosseta, serif',
        fontSize: '64.61px',
        lineHeight: '104%',
        letterSpacing: '0%',
        fontWeight: 400,
      }}
    >
      CREATE YOUR DREAM
    </h2>
  );
};

export default HeroSubtitle;
