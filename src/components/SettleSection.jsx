/**
 * SettleSection Component
 * Information section that continues above canvas during scroll
 * Multiple content blocks for extended scroll depth
 */

import React from 'react';

const SettleSection = () => {
  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'GPU-accelerated canvas rendering with zero frame drops. Pure performance.',
    },
    {
      icon: '🎨',
      title: 'Pixel Perfect',
      description: 'Every frame is rendered with precision. Smooth transitions between every pixel.',
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Works flawlessly on all screen sizes. Desktop to mobile, perfectly optimized.',
    },
    {
      icon: '🎯',
      title: 'Scroll Sync',
      description: 'Animation is directly controlled by scroll. Instant response to user input.',
    },
  ];

  return (
    <section className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-white/10">
      {/* Section 1: Features Grid */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Section header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
              Why Choose This?
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Built with cutting-edge technologies for the most demanding creative projects.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-xl bg-linear-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/30 transition-all duration-500 hover:bg-white/10 backdrop-blur-sm"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Technical Details */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-linear-to-b from-transparent to-blue-950/20">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
              Technical Excellence
            </h2>
            <p className="text-xl text-white/60">
              Built with the best tools in the ecosystem
            </p>
          </div>

          {/* Tech stack */}
          <div className="space-y-6">
            {[
              {
                tech: 'React 19',
                desc: 'Latest React with modern hooks and optimal performance',
              },
              {
                tech: 'Tailwind CSS',
                desc: 'Utility-first CSS for beautiful, responsive design',
              },
              {
                tech: 'GSAP + ScrollTrigger',
                desc: 'Industry-standard animation library with scroll synchronization',
              },
              {
                tech: 'Canvas 2D',
                desc: 'GPU-accelerated rendering for smooth frame playback',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <h3 className="text-2xl font-medium text-white mb-2">{item.tech}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: CTA */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-linear-to-b from-transparent to-purple-950/20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-6">
            Ready to Create?
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Start building your own premium scroll animations today. The canvas is your playground.
          </p>
          <button className="px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl text-lg">
            Start Building
          </button>
        </div>
      </div>
    </section>
  );
};

export default SettleSection;
