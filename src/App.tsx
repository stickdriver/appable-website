import React, { useEffect, useState } from 'react';

/**
 * Appable Landing – Modern V3 Enhanced
 * - Enhanced hero with particles, better gradients, and parallax effects
 * - Improved service cards with hover animations, color-coding, and icons
 * - Staggered reveal animations and micro-interactions
 * - Maintains clean, classy, modern aesthetics
 */

// --------- Lightweight runtime "tests" (so failures surface in console) ---------
function runSmokeTests() {
  try {
    const slides = getSlides();
    console.assert(Array.isArray(slides), 'slides should be an array');
    console.assert(slides.length === 3, 'expected 3 slides');
    const titles = slides.map((s) => s.title);
    console.assert(new Set(titles).size === titles.length, 'slide titles should be unique');
    console.assert(typeof AppableLandingModernV3 === 'function', 'AppableLandingModernV3 should be a component');
    console.debug('[Appable] smoke tests passed');
  } catch (e) {
    console.error('[Appable] smoke tests failed', e);
  }
}

// Expose slides config via function so tests can call
function getSlides() {
  return [
    { title: 'Custom Mobile Solutions', description: "We design and build mobile apps that fit your business, from idea to launch. Drawing on experience in finance, consumer electronics, and avionics — and making smart use of AI where it speeds things up — we focus on creating apps that work for the long run." },
    { title: 'Update and Upgrade', description: "We take outdated systems and bring them up to modern standards for usability, security, and performance. With roots in industries where precision matters, and a little help from AI where it counts, we help you get more life out of what you already have." },
    { title: 'In-House Projects', description: "Alongside client work, we create our own solutions, like our upcoming SaaS product to help small and medium businesses meet accessibility compliance standards." }
  ];
}

// Service data with colors and icons
const serviceData = [
  { 
    title: 'Custom Mobile Solutions', 
    micro: '', 
    desc: 'Apps for Android, iOS, or both — built to fit your needs and scale with your business. We use the right tools for the job (and some AI help where it speeds things up) to keep development efficient and focused.',
    list: [],
    color: 'from-green-200 to-emerald-200',
    bulletColor: 'from-blue-500 to-cyan-500',
    hoverColor: 'hover:border-blue-500/50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  { 
    title: 'Backends That Grow With You', 
    micro: '', 
    desc: 'A strong backend keeps your app or website running smoothly. We make sure yours is stable, secure, and ready for growth.',
    list: [],
    color: 'from-green-200 to-emerald-200',
    bulletColor: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:border-green-500/50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  },
  { 
    title: 'Update & Upgrade', 
    micro: '', 
    desc: 'Still using software many versions behind? We can help you bring them up to modern standards - making them faster, safer, and easier to maintain.',
    list: [],
    color: 'from-green-200 to-emerald-200',
    bulletColor: 'from-orange-500 to-red-500',
    hoverColor: 'hover:border-orange-500/50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  },
  { 
    title: 'Smooth & Secure Payment Flows', 
    micro: '', 
    desc: 'Whether it\'s one-time purchases or recurring subscriptions, we make sure your customers have an easy, worry-free way to pay, with security baked in from the start.',
    list: [],
    color: 'from-green-200 to-emerald-200',
    bulletColor: 'from-purple-500 to-violet-500',
    hoverColor: 'hover:border-purple-500/50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 5h20v14H2V5zm0 4h20M7 15h4" />
      </svg>
    )
  }
];

// ---------- UI Primitives ----------
const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`rounded-2xl border border-black/10 shadow-sm bg-white transition-transform md:hover:scale-[1.02] md:hover:shadow-md ${className}`}>{children}</div>
);
const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// ---------- Enhanced Hero (Carousel) ----------
const Hero: React.FC = () => {
  const slides = getSlides();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const intervalTime = 7000; // ~7s recommended cadence

  // Mouse tracking for particle effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('hero-section')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({ 
          x: (e.clientX - rect.left) / rect.width, 
          y: (e.clientY - rect.top) / rect.height 
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate (pauses when paused=true)
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent((prev: number) => (prev + 1) % slides.length), intervalTime);
    return () => clearInterval(id);
  }, [paused, intervalTime, slides.length]);

  // Keyboard: left/right arrows & space to toggle pause
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrent((p: number) => (p + 1) % slides.length);
      if (e.key === 'ArrowLeft') setCurrent((p: number) => (p - 1 + slides.length) % slides.length);
      if (e.key === ' ') { e.preventDefault(); setPaused((p: boolean) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slides.length]);

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden text-white bg-gray-100 mx-auto max-w-7xl"
      aria-label="Appable hero carousel"
      role="region"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Enhanced background */}
      <div className="absolute inset-0 hero-bg animated-gradient-enhanced" 
           aria-hidden="true" 
           style={{ transform: `translateY(${scrollY * 0.3}px)` }} />

      {/* Particle field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 15, top: 25 }, { left: 75, top: 15 }, { left: 45, top: 35 },
          { left: 85, top: 55 }, { left: 25, top: 70 }, { left: 65, top: 45 },
          { left: 35, top: 60 }, { left: 90, top: 30 }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float-particle"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              background: `radial-gradient(circle, rgba(255,255,255,0.8), transparent)`,
              transform: `translate(${mousePosition.x * (i % 3) * 20}px, ${mousePosition.y * (i % 2) * 15}px)`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Elegant floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large accent ring - top left */}
        <div 
          className="absolute top-[15%] left-[8%] w-80 h-80 rounded-full border border-white/10 animate-float-gentle will-change-transform"
          style={{ transform: `translate(${mousePosition.x * 20}px, ${-mousePosition.y * 10}px)` }}
        />
        
        {/* Medium geometric shape - top right */}
        <div 
          className="absolute top-[25%] right-[12%] w-24 h-24 rotate-45 border-2 border-white/15 animate-float-delayed will-change-transform"
          style={{ transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 8}px) rotate(45deg)` }}
        />
        
        {/* Small accent circles */}
        <div 
          className="absolute top-[40%] left-[5%] w-3 h-3 rounded-full bg-white/20 animate-pulse-gentle will-change-transform"
          style={{ transform: `translate(${mousePosition.x * 25}px, ${-mousePosition.y * 12}px)` }}
        />
        <div 
          className="absolute bottom-[35%] right-[8%] w-2 h-2 rounded-full bg-white/25 animate-pulse-gentle-delayed will-change-transform"
          style={{ transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 15}px)` }}
        />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute top-[60%] right-[25%] w-16 h-16 opacity-10 animate-float-subtle will-change-transform"
          style={{ 
            transform: `translate(${mousePosition.x * 10}px, ${-mousePosition.y * 5}px)`,
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '8px 8px'
          }}
        />
      </div>

      {/* Enhanced gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)'
        }}
      />

      {/* Enhanced styles */}
      <style>{`
        .hero-bg.animated-gradient-enhanced {
          background: linear-gradient(135deg, 
            #0f172a 0%, #1e293b 15%, #0ea5e9 30%, #3b82f6 45%, 
            #6366f1 60%, #8b5cf6 75%, #d946ef 90%, #ec4899 100%);
          background-size: 400% 400%;
          animation: gradientShiftEnhanced 20s ease-in-out infinite;
        }
        @keyframes gradientShiftEnhanced { 
          0%, 100% { background-position: 0% 50%; } 
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; } 
          75% { background-position: 0% 100%; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
        @keyframes floatGentle { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-15px);} }
        @keyframes floatDelayed { 0%,100% { transform: translateY(0px) rotate(45deg);} 50% { transform: translateY(-12px) rotate(45deg);} }
        @keyframes floatSubtle { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-8px);} }
        @keyframes pulseGentle { 0%,100% { opacity: 0.2;} 50% { opacity: 0.4;} }
        @keyframes pulseGentleDelayed { 0%,100% { opacity: 0.25;} 50% { opacity: 0.5;} }
        .animate-float-gentle { animation: floatGentle 8s ease-in-out infinite; }
        .animate-float-delayed { animation: floatDelayed 10s ease-in-out infinite 2s; }
        .animate-float-subtle { animation: floatSubtle 12s ease-in-out infinite 1s; }
        .animate-pulse-gentle { animation: pulseGentle 6s ease-in-out infinite; }
        .animate-pulse-gentle-delayed { animation: pulseGentleDelayed 7s ease-in-out infinite 3s; }
        @media (prefers-reduced-motion: reduce) { 
          .hero-bg.animated-gradient-enhanced { animation: none; } 
          .animate-float-particle, .animate-float-gentle, .animate-float-delayed, .animate-float-subtle, .animate-pulse-gentle, .animate-pulse-gentle-delayed { animation: none; } 
        }
        .hero-title { text-shadow: none; padding-bottom: 0.125rem; }
        .hero-desc { text-shadow: 0 1px 2px rgba(0,0,0,.2); }
      `}</style>

      <div className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center z-10">
        {/* Enhanced crossfade stack for slide content */}
        <div className="relative min-h-[180px] sm:min-h-[200px]">
          {slides.map((s, idx) => (
            <div
              key={s.title}
              aria-hidden={current !== idx}
              className={`absolute inset-0 transition-all duration-700 ${
                current === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 bg-gradient-to-r from-white via-white to-blue-100 bg-clip-text text-transparent" 
                  aria-live={current === idx ? 'polite' : 'off'}>
                {s.title}
              </h1>
              <p className="hero-desc max-w-2xl mx-auto text-lg lg:text-xl leading-relaxed text-white/90 font-light text-left">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced controls */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => setPaused((p: boolean) => !p)}
            className="px-4 py-2 rounded-full border border-white/40 text-white/90 text-sm 
                       hover:bg-white/20 hover:border-white/60 transition-all duration-300
                       backdrop-blur-sm shadow-lg"
            aria-pressed={paused}
            aria-label={paused ? 'Play carousel' : 'Pause carousel'}
          >
            {paused ? '▶ Play' : '⏸ Pause'}
          </button>
          <div className="flex items-center justify-center gap-3" role="tablist" aria-label="Hero slides">
            {slides.map((slide, idx) => (
              <button
                key={slide.title}
                onClick={() => setCurrent(idx)}
                role="tab"
                aria-selected={current === idx}
                aria-label={`Show slide ${idx + 1}: ${slide.title}`}
                className={`h-3 w-8 rounded-full transition-all duration-300 ${
                  current === idx 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Enhanced Services ----------
const Services: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.service-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="relative py-12 bg-gradient-to-b from-gray-50 to-white text-neutral-900" aria-label="Services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl text-neutral-600 leading-relaxed text-left">
            From mobile apps to modernized systems, we bring experience from finance, consumer electronics, and avionics. We use practical, AI-assisted workflows to deliver solutions that simply work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {serviceData.map((service, index) => (
            <div
              key={service.title}
              data-index={index}
              className={`service-card group relative rounded-3xl border border-black/10 shadow-lg bg-white/80 backdrop-blur-sm
                transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/10
                ${service.hoverColor} hover:-translate-y-2 ${
                visibleCards.has(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {service.title === 'Smooth & Secure Payment Flows' && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full transform rotate-12 shadow-sm">
                    Soon
                  </div>
                </div>
              )}
              <div className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${service.color} text-gray-700 shadow-sm border border-white/50`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </h3>
                    {service.micro && (
                      <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                        {service.micro}
                      </p>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-base">
                  {service.desc}
                </p>
                
                {service.list.length > 0 && (
                  <ul className="space-y-3 mt-6">
                    {service.list.map((item, i) => (
                      <li 
                        key={item} 
                        className="flex items-center gap-3 text-sm text-gray-700 transition-all duration-300 hover:text-gray-900"
                        style={{ animationDelay: `${(index * 4 + i) * 100}ms` }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.bulletColor} shadow-sm flex-shrink-0`}></div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Contact ----------
const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    // Focus the name field when the contact section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nameField = document.getElementById('name');
            if (nameField) {
              nameField.focus();
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (formData: FormData) => {
    const errors: {[key: string]: string} = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name?.trim()) errors.name = 'Name is required';
    if (!email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!message?.trim()) errors.message = 'Message is required';

    return errors;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    // Honeypot check
    const hp = formData.get('company_website') as string;
    if (hp) return;

    // Validation
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="relative py-20 bg-white text-neutral-900 border-t-2 border-gray-200 mt-12" aria-labelledby="contact-heading">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="w-full h-full opacity-80"
          style={{
            backgroundImage: 'radial-gradient(circle, #9ca3af 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 id="contact-heading" className="text-3xl font-semibold mb-4 text-center">Let's Talk</h2>
          <p className="text-center text-neutral-600 mb-8">Drop us a message about anything—projects, questions, or just to connect.</p>
          
          {submitted ? (
            <div role="status" className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
              <p className="text-green-700">Thanks! We got your message and will reply within one business day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-800 mb-1">Name</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  aria-required="true" 
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Your full name"
                  onKeyDown={(e) => {
                    if (e.code === 'Space') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      const start = input.selectionStart || 0;
                      const end = input.selectionEnd || 0;
                      const value = input.value;
                      input.value = value.slice(0, start) + ' ' + value.slice(end);
                      input.setSelectionRange(start + 1, start + 1);
                    }
                  }}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-800 mb-1">Email</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  aria-required="true" 
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="your.email@example.com" 
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-800 mb-1">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required 
                  aria-required="true" 
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                    errors.message ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  placeholder="Share with us what you're working on or ask a question..."
                  onKeyDown={(e) => {
                    if (e.code === 'Space') {
                      e.preventDefault();
                      const textarea = e.target as HTMLTextAreaElement;
                      const start = textarea.selectionStart || 0;
                      const end = textarea.selectionEnd || 0;
                      const value = textarea.value;
                      textarea.value = value.slice(0, start) + ' ' + value.slice(end);
                      textarea.setSelectionRange(start + 1, start + 1);
                    }
                  }}
                />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              </div>
              
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}
              
              {/* honeypot */}
              <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              
              <div className="flex justify-start">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ---------- Page ----------
export default function AppableLandingModernV3() {
  // Run smoke tests once in the browser
  useEffect(() => { if (typeof window !== 'undefined') runSmokeTests(); }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Skip link for keyboard users */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[999] bg-black text-white px-3 py-2 rounded">Skip to content</a>

      {/* Global header */}
      <header className="sticky top-0 z-50 bg-white/80 border-b border-black/5 backdrop-blur-sm" role="banner" aria-label="Main navigation">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-2xl tracking-tight text-gray-900" aria-label="Appable home">Appable</a>
          <nav className="hidden sm:flex gap-6 text-sm" role="navigation">
            <a href="#contact" className="font-bold hover:text-indigo-600 transition">Let's Talk</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main id="main" role="main">
        <Hero />
        <div className="mx-auto max-w-7xl">
          <Services />
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <div className="mx-auto max-w-7xl">
        <footer className="py-8 text-center text-sm text-neutral-500 border-t border-black/5" role="contentinfo">
          © 2025 Made in California by Appable
        </footer>
      </div>
    </div>
  );
}
