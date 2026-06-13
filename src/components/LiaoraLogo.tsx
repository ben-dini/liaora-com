import { useMemo } from 'react';

interface LiaoraLogoProps {
  size?: number;
  className?: string;
}

export default function LiaoraLogo({ size = 44, className }: LiaoraLogoProps) {
  const px = size;
  const inner = px * 0.82;
  const dot = px * 0.055;
  const cx = inner / 2;
  const fs = px * 0.175;
  const tl = inner * 0.68;
  const y1 = inner * 0.37;
  const y2 = inner * 0.63;
  const delay = useMemo(() => `${-(Date.now() % 10000)}ms`, []);
  const uid = useMemo(() => `ll${Math.round(px)}`, [px]);

  return (
    <div
      className={className}
      style={{ width: px, height: px, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, userSelect: 'none', pointerEvents: 'none' }}
      aria-label="LIAORA"
    >
      <div style={{
        position: 'absolute', width: px, height: px, borderRadius: '50%', padding: 1,
        background: 'linear-gradient(125deg, rgba(200,216,245,0.9), rgba(221,200,248,0.85), rgba(168,237,224,0.9), rgba(240,216,200,0.8), rgba(200,220,248,0.9))',
        backgroundSize: '300% 300%',
        animation: 'liaoraRingShimmer 6s linear infinite',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'destination-out',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
      }} />

      <div style={{
        width: inner, height: inner, borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 38%, #1e1e2a 0%, #111118 60%, #0a0a10 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', zIndex: 1,
        boxShadow: '0 0 28px rgba(150,170,255,0.1)',
      }}>
        <svg width={inner} height={inner} viewBox={`0 0 ${inner} ${inner}`} style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#c8d8f5" />
              <stop offset="30%"  stopColor="#ddc8f8" />
              <stop offset="60%"  stopColor="#a8ede0" />
              <stop offset="100%" stopColor="#c8d8f5" />
            </linearGradient>
          </defs>
          <text
            x={cx} y={y1}
            textAnchor="middle" dominantBaseline="central"
            fill={`url(#${uid})`}
            fontFamily="'Josefin Sans', 'Futura', sans-serif"
            fontWeight="700"
            fontSize={fs}
            textLength={tl}
            lengthAdjust="spacing"
          >L1A</text>
          <text
            x={cx} y={y2}
            textAnchor="middle" dominantBaseline="central"
            fill={`url(#${uid})`}
            fontFamily="'Josefin Sans', 'Futura', sans-serif"
            fontWeight="700"
            fontSize={fs}
            textLength={tl}
            lengthAdjust="spacing"
          >ORA</text>
        </svg>
      </div>

      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        animation: `liaoraOrbitSpin 10s linear infinite`,
        animationDelay: delay,
        zIndex: 3,
      }}>
        <div style={{
          position: 'absolute', width: dot, height: dot, borderRadius: '50%',
          background: 'linear-gradient(135deg, #a8d8f0, #d8c8f5)',
          boxShadow: '0 0 8px rgba(180,200,255,0.9)',
          top: -(dot / 2), left: '50%', transform: 'translateX(-50%)',
        }} />
      </div>
    </div>
  );
}
