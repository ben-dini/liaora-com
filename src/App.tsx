import { useState, useEffect } from "react";
import { useLocale } from "./hooks/useLocale";
import { SupportedLocale, supportedLocales } from "./i18n";
import ScrambleLink from "@/components/ScrambleLink";
import LiaoraLogo from "@/components/LiaoraLogo";
import { sounds } from "@/lib/sounds";

const ECOSYSTEM = [
  { label: 'ARBEN HAJDINI', href: 'https://arbenhajdini.com' },
  { label: 'LIAORA', href: 'https://liaora.com' },
  { label: 'L1A1.SOFTWARE', href: 'https://l1a1.software' },
  { label: 'AI SERVICES', href: 'https://services.l1a1.software' },
  { label: 'L1A1 CORE', href: 'https://ai.l1a1.software' },
  { label: 'L1A1 PLAYER', href: 'https://player.l1a1.software' },
  { label: 'L1AORA.SOFTWARE', href: 'https://l1aora.software' },
];

const App = () => {
  const { t, locale, changeLocale } = useLocale();
  const principles = (t('principles.items') as unknown as any[]) || [];

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('liaora-theme');
    return saved !== 'light';
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('liaora-sounds') !== 'false';
  });

  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    localStorage.setItem('liaora-sounds', soundEnabled ? 'true' : 'false');
    sounds.setMute(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.liaora-lang-container')) setLangOpen(false);
    };
    if (langOpen) document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [langOpen]);

  useEffect(() => {
    localStorage.setItem('liaora-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.remove('light-theme');
      document.body.style.background = '#05050f';
      document.body.style.color = '#8a8a9a';
    } else {
      document.body.classList.add('light-theme');
      document.body.style.background = '#f8f9fc';
      document.body.style.color = '#4a4a58';
    }
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = (entry.target as HTMLElement).dataset.delay || '0';
          setTimeout(() => entry.target.classList.add('r-visible'), parseInt(delay));
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [locale]);

  const c = {
    text: isDark ? '#8a8a9a' : '#4a4a58',
    muted: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(5,5,15,0.35)',
    heading: isDark ? '#ffffff' : '#05050f',
    subheading: isDark ? '#e0e0f0' : '#1a1a2e',
    border: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(5,5,15,0.08)',
    headerBg: isDark ? 'rgba(5,5,15,0.82)' : 'rgba(248,249,252,0.88)',
    footerBg: isDark ? 'rgba(0,0,0,0.35)' : 'rgba(248,249,252,0.9)',
  };

  return (
    <div style={{ background: isDark ? '#05050f' : '#f8f9fc', color: c.text, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        [data-reveal].r-visible { opacity: 1; transform: translateY(0); }

        @keyframes pearlShift {
          0%   { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1.05); }
          33%  { background-position: 100% 0%; filter: hue-rotate(15deg) brightness(1.08); }
          66%  { background-position: 200% 50%; filter: hue-rotate(-8deg) brightness(1.03); }
          100% { background-position: 0% 50%; filter: hue-rotate(0deg) brightness(1.05); }
        }

        .aurora-text {
          background: linear-gradient(125deg,
            #c8d8f5 0%, #ddc8f8 12%, #a8ede0 25%, #f0d8c8 40%,
            #c8dcf8 55%, #e8c8d8 70%, #b8ead5 85%, #c8d8f5 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: pearlShift 9s ease-in-out infinite;
        }

        @keyframes orbFloat1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(80px,110px) scale(1.12); } }
        @keyframes orbFloat2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-70px,-90px) scale(1.15); } }
        @keyframes orbFloat3 { 0% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-42%,-58%) scale(1.08); } 100% { transform: translate(-58%,-44%) scale(0.93); } }

        .liaora-orb { pointer-events: none; }

        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          .liaora-orb { animation: none !important; }
        }
      `}</style>

      {/* Grain overlay */}
      <svg aria-hidden="true" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', opacity: isDark ? 0.045 : 0.02, pointerEvents: 'none', zIndex: 998 }}>
        <filter id="liaora-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#liaora-grain)" />
      </svg>

      {/* Atmospheric orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div className="liaora-orb" style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%', top: -250, left: -200,
          background: isDark
            ? 'radial-gradient(circle, rgba(80,100,200,0.38) 0%, rgba(120,80,200,0.18) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(160,180,255,0.45) 0%, rgba(200,160,255,0.25) 50%, transparent 70%)',
          filter: 'blur(90px)', opacity: isDark ? 0.32 : 0.5,
          animation: 'orbFloat1 16s ease-in-out infinite alternate',
        }} />
        <div className="liaora-orb" style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%', bottom: -200, right: -100,
          background: isDark
            ? 'radial-gradient(circle, rgba(60,160,140,0.32) 0%, rgba(40,130,180,0.16) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(130,220,200,0.38) 0%, rgba(90,180,230,0.22) 50%, transparent 70%)',
          filter: 'blur(90px)', opacity: isDark ? 0.28 : 0.42,
          animation: 'orbFloat2 20s ease-in-out infinite alternate',
        }} />
        <div className="liaora-orb" style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%', top: '50%', left: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(180,100,150,0.22) 0%, rgba(120,80,200,0.12) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,180,210,0.35) 0%, rgba(200,160,255,0.2) 50%, transparent 70%)',
          filter: 'blur(90px)', opacity: isDark ? 0.25 : 0.38,
          animation: 'orbFloat3 24s ease-in-out infinite alternate',
        }} />
      </div>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '0 clamp(24px, 5vw, 48px)', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: c.headerBg, backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? `1px solid ${c.border}` : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <LiaoraLogo size={44} />
          <div style={{ width: 1, height: 24, background: isDark ? 'rgba(200,216,245,0.15)' : 'rgba(5,5,15,0.1)', flexShrink: 0 }} />
          <ScrambleLink
            label="LIAORA"
            href="https://liaora.com"
            target="_self"
            textClassName="aurora-text"
            autoScramble
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}
          />
        </div>

        {/* Controls: Sound + Theme + Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Sound button */}
          <button
            onClick={() => { setSoundEnabled(p => !p); sounds.playClick(); }}
            aria-label="Toggle Sound"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(5,5,15,0.04)',
              border: `1px solid ${c.border}`, color: c.heading,
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.borderColor = 'rgba(77,163,255,0.4)'; sounds.playTick(); }}
            onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = c.border; }}
          >
            {soundEnabled ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            )}
          </button>

          {/* Theme button */}
          <button
            onClick={() => { setIsDark(p => !p); sounds.playChime(); }}
            aria-label="Toggle Theme"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(5,5,15,0.04)',
              border: `1px solid ${c.border}`, color: c.heading,
              cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.08) rotate(15deg)'; e.currentTarget.style.borderColor = 'rgba(77,163,255,0.4)'; sounds.playTick(); }}
            onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = c.border; }}
          >
            {isDark ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Language dropdown pill */}
          <div className="liaora-lang-container" style={{ position: 'relative', zIndex: 50 }}>
            <button
              onClick={() => { setLangOpen(p => !p); sounds.playClick(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                height: 36, padding: '0 14px',
                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(5,5,15,0.04)',
                border: `1px solid ${langOpen ? 'rgba(77,163,255,0.4)' : c.border}`,
                borderRadius: 9999, cursor: 'pointer', color: c.heading,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                backdropFilter: 'blur(20px)', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; sounds.playTick(); }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4DA3FF', boxShadow: '0 0 8px #4DA3FF', display: 'inline-block' }} />
              <span style={{ display: 'inline-block', transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)', transform: isFlipped ? 'rotateX(360deg)' : 'none' }}>{locale.toUpperCase()}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s', transform: langOpen ? 'rotate(180deg)' : 'none', opacity: 0.55 }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {/* Dropdown panel */}
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 160,
              background: isDark ? 'rgba(8,8,20,0.92)' : 'rgba(248,249,252,0.95)',
              border: `1px solid ${c.border}`, borderRadius: 14, padding: 8,
              backdropFilter: 'blur(30px)',
              boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.6)' : '0 10px 30px rgba(15,27,58,0.08)',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              opacity: langOpen ? 1 : 0, pointerEvents: langOpen ? 'auto' : 'none',
              transform: langOpen ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(-8px)',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6,
            }}>
              {(supportedLocales as SupportedLocale[]).map(l => {
                const isSelected = l === locale;
                return (
                  <button
                    key={l}
                    onClick={() => {
                      if (l !== locale) { setIsFlipped(true); changeLocale(l); sounds.playClick(); setTimeout(() => setIsFlipped(false), 600); }
                      setLangOpen(false);
                    }}
                    style={{
                      padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                      border: isSelected ? '1px solid rgba(77,163,255,0.3)' : '1px solid transparent',
                      background: isSelected ? 'rgba(77,163,255,0.08)' : 'transparent',
                      color: isSelected ? '#4DA3FF' : c.muted,
                      fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#4DA3FF'; e.currentTarget.style.background = 'rgba(77,163,255,0.05)'; sounds.playTick(); }}
                    onMouseLeave={e => { e.currentTarget.style.color = isSelected ? '#4DA3FF' : c.muted; e.currentTarget.style.background = isSelected ? 'rgba(77,163,255,0.08)' : 'transparent'; }}
                  >{l.toUpperCase()}</button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 128px', position: 'relative', zIndex: 2 }}>

        {/* Hero */}
        <section style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', paddingTop: 100, paddingBottom: 80 }} data-reveal>
          <h1 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(1.875rem, 5vw, 3.25rem)', fontWeight: 300, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 28, margin: '0 0 28px' }}>
            <span className="aurora-text">{t('hero.title')}</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', fontWeight: 300, lineHeight: 1.85, maxWidth: 520, margin: '0 auto 48px', color: c.text }}>
            {t('hero.subline')}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px 32px' }}>
            <a
              href="#principles"
              onClick={() => sounds.playClick()}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.heading, textDecoration: 'none', paddingBottom: 2, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(5,5,15,0.25)'}`, transition: 'opacity 0.2s' }}
            >{t('hero.cta')}</a>
            <a
              href="https://l1aora.software"
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.playClick()}
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: c.muted, textDecoration: 'none', transition: 'opacity 0.2s' }}
            >{t('hero.cta_secondary')} ↗</a>
          </div>
        </section>

        {/* Identity */}
        <section style={{ marginBottom: 96, borderTop: `1px solid ${c.border}`, paddingTop: 40 }} data-reveal data-delay="100">
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: c.muted, marginBottom: 24, opacity: 0.6 }}>
            {t('identity.label')}
          </p>
          <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.1875rem)', fontWeight: 300, lineHeight: 1.75, color: c.subheading, marginBottom: 20 }}>
            {t('identity.text')}
          </p>
          <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.9rem', fontStyle: 'italic', fontWeight: 300, color: c.muted, opacity: 0.8 }}>
            {t('identity.statement')}
          </p>
        </section>

        {/* Principles */}
        <section id="principles" style={{ marginBottom: 96, borderTop: `1px solid ${c.border}`, paddingTop: 40 }} data-reveal data-delay="150">
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: c.muted, marginBottom: 48, opacity: 0.6 }}>
            {t('principles.label')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {Array.isArray(principles) && principles.map((item: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 8 }} data-reveal data-delay={String(180 + idx * 55)}>
                <h3 style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: isDark ? '#c0c0dc' : '#2a2a40', margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.75, color: c.text, maxWidth: 560, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Origin */}
        <section style={{ marginBottom: 96, borderTop: `1px solid ${c.border}`, paddingTop: 40 }} data-reveal data-delay="200">
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: c.muted, marginBottom: 48, opacity: 0.6 }}>
            {t('origin.label')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {([t('origin.vision'), t('origin.system'), t('origin.core')] as string[]).map((text, i) => (
              <p
                key={i}
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.1875rem)', fontWeight: 300, lineHeight: 1.7, margin: 0, color: isDark ? `rgba(255,255,255,${0.88 - i * 0.12})` : `rgba(5,5,15,${0.82 - i * 0.12})` }}
                data-reveal
                data-delay={String(220 + i * 70)}
              >{text}</p>
            ))}
          </div>
          <p style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: '0.875rem', fontStyle: 'italic', fontWeight: 300, color: c.muted, marginTop: 56, opacity: 0.65 }}>
            {t('origin.quote')}
          </p>
        </section>

        {/* Status */}
        <section style={{ borderTop: `1px solid ${c.border}`, paddingTop: 40 }} data-reveal data-delay="250">
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: c.muted, marginBottom: 20, opacity: 0.6 }}>
            {t('status.label')}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.8, color: c.text, maxWidth: 520 }}>
            {t('status.text')}
            <span style={{ display: 'block', opacity: 0.6, marginTop: 8 }}>{t('status.subtext')}</span>
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${c.border}`, background: c.footerBg, backdropFilter: 'blur(16px)', padding: '48px 24px 40px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>

          {/* Ecosystem */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
            {ECOSYSTEM.map((link, i) => (
              <span key={link.href} style={{ display: 'flex', alignItems: 'center' }}>
                <ScrambleLink
                  label={link.label}
                  href={link.href}
                  target="_blank"
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.muted, padding: '4px 8px' }}
                />
                {i < ECOSYSTEM.length - 1 && (
                  <span style={{ color: c.muted, fontSize: 9, opacity: 0.35 }}>·</span>
                )}
              </span>
            ))}
          </div>

          {/* Legal */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            {([
              { label: 'TERMS', to: '/terms' },
              { label: 'REFUND', to: '/refund' },
              { label: (t('footer.imprint') as string).toUpperCase(), to: '/impressum' },
              { label: (t('footer.privacy') as string).toUpperCase(), to: '/datenschutz' },
            ] as { label: string; to: string }[]).map(({ label, to }) => (
              <ScrambleLink
                key={to}
                label={label}
                to={to}
                style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.15em', color: c.muted, opacity: 0.55 }}
              />
            ))}
            <ScrambleLink
              label={t('footer.contact') as string}
              href={`mailto:${t('footer.contact')}`}
              target="_self"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.12em', color: c.muted, opacity: 0.55 }}
            />
          </div>

          {/* Copyright */}
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.muted, opacity: 0.35, margin: 0 }}>
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
