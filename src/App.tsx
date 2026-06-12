import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useLocale } from "./hooks/useLocale";
import { SupportedLocale, supportedLocales } from "./i18n";
import ScrambleLink from "@/components/ScrambleLink";
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

  const [scrolled, setScrolled] = useState(false);

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
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: c.headerBg, backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? c.border : 'transparent'}`,
        transition: 'border-color 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.14)' : 'rgba(5,5,15,0.14)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(5,5,15,0.03)',
          }}>
            <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(5,5,15,0.45)' }}>L</span>
          </div>
          <div style={{ width: 1, height: 18, background: isDark ? 'rgba(255,255,255,0.09)' : 'rgba(5,5,15,0.1)' }} />
          <ScrambleLink
            label="LIAORA"
            href="https://liaora.com"
            target="_self"
            textClassName="aurora-text"
            autoScramble
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}
          />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', gap: 12 }} className="hidden sm:flex">
            {supportedLocales.map(lang => (
              <button
                key={lang}
                onClick={() => { changeLocale(lang as SupportedLocale); sounds.playTick(); }}
                style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.15em',
                  textTransform: 'uppercase', background: 'none', border: 'none', padding: 0,
                  cursor: 'pointer', color: locale === lang ? c.heading : c.muted,
                  opacity: locale === lang ? 1 : 0.5, transition: 'opacity 0.2s',
                }}
              >{lang}</button>
            ))}
          </div>
          <button
            onClick={() => { setIsDark(p => !p); sounds.playClick(); }}
            style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: c.muted, display: 'flex', alignItems: 'center' }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
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
            {[
              { label: 'Terms', to: '/terms' },
              { label: 'Refund', to: '/refund' },
              { label: t('footer.imprint') as string, to: '/impressum' },
              { label: t('footer.privacy') as string, to: '/datenschutz' },
            ].map(({ label, to }) => (
              <Link key={to} to={to} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: c.muted, textDecoration: 'none', opacity: 0.55 }}>
                {label}
              </Link>
            ))}
            <a href={`mailto:${t('footer.contact')}`} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.12em', color: c.muted, textDecoration: 'none', opacity: 0.55 }}>
              {t('footer.contact')}
            </a>
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
