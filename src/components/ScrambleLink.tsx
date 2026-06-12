import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { sounds } from '@/lib/sounds';

interface ScrambleLinkProps {
  label: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  target?: '_blank' | '_self';
  showArrow?: boolean;
  style?: React.CSSProperties;
  className?: string;
  /** Applied to the inner text span — use for background-clip:text effects like aurora-text */
  textClassName?: string;
  autoScramble?: boolean;
}

const CHARS = '01XYZ@#$%&*+-/[]{}<>~';

const sharedStyle = (hovered: boolean, style?: React.CSSProperties): React.CSSProperties => {
  const baseColor = style?.color || '#3a3a4a';
  return {
    position: 'relative',
    display: 'inline-block',
    textDecoration: 'none',
    textShadow: hovered ? '0 0 8px rgba(77, 163, 255, 0.3)' : 'none',
    transition: 'all 0.2s ease',
    ...style,
    color: hovered ? '#4DA3FF' : baseColor,
  };
};

function runScramble(
  label: string,
  setDisplayText: (t: string) => void,
  intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>
) {
  if (intervalRef.current) clearInterval(intervalRef.current);
  let progress = 0;
  intervalRef.current = setInterval(() => {
    setDisplayText(
      label
        .split('')
        .map((char, pos) => {
          if (pos < progress) return label[pos];
          if (char === ' ' || char === '.') return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('')
    );
    progress += 1 / 3;
    if (progress >= label.length) {
      clearInterval(intervalRef.current!);
      setDisplayText(label);
    }
  }, 35);
}

export default function ScrambleLink({
  label,
  href,
  to,
  onClick,
  target = '_blank',
  showArrow = false,
  style,
  className,
  textClassName,
  autoScramble = false,
}: ScrambleLinkProps) {
  const [displayText, setDisplayText] = useState(label);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!autoScramble) return;
    const schedule = () => {
      autoTimerRef.current = setTimeout(() => {
        if (!hovered) runScramble(label, setDisplayText, intervalRef);
        autoTimerRef.current = setTimeout(schedule, 4200);
      }, 2800);
    };
    schedule();
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoScramble, label, hovered]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!hovered) { setDisplayText(label); return; }
    runScramble(label, setDisplayText, intervalRef);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [hovered, label]);

  const inner = (
    <>
      <span style={{ position: 'relative', zIndex: 1 }} className={textClassName}>
        {displayText}{showArrow ? ' ↗' : ''}
      </span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-4px -8px',
          background: 'rgba(77,163,255,0.10)',
          filter: 'blur(8px)',
          borderRadius: '4px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );

  const handlers = {
    onMouseEnter: () => { setHovered(true); sounds.playTick(); },
    onMouseLeave: () => setHovered(false),
    onClick: () => { sounds.playClick(); onClick?.(); },
    className,
  };

  if (to) {
    return <Link to={to} style={sharedStyle(hovered, style)} {...handlers}>{inner}</Link>;
  }

  if (onClick && !href) {
    return (
      <button
        type="button"
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', ...sharedStyle(hovered, style) }}
        {...handlers}
      >{inner}</button>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer noopener' : undefined}
      style={sharedStyle(hovered, style)}
      {...handlers}
    >{inner}</a>
  );
}
