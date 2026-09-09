type FirstBirthdayMarkProps = {
  title: string;
  size?: number;
  className?: string;
  gold?: string;
  rose?: string;
  cream?: string;
  animate?: boolean;
};

export function FirstBirthdayMark({
  title,
  size = 151,
  className,
  gold = "#c4a06a",
  rose = "#9c3d45",
  cream = "#fff8f1",
  animate = true,
}: FirstBirthdayMarkProps) {
  const glowId = "first-birthday-flame-glow";
  const icingId = "first-birthday-icing";
  const glazeId = "first-birthday-glaze";

  return (
    <svg
      width={className ? undefined : size}
      height={className ? undefined : size}
      className={className}
      viewBox="0 0 140 140"
      fill="none"
      role="img"
      aria-label={title}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="58%" r="50%">
          <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#f0a04a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f0a04a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={icingId} x1="70" y1="62" x2="70" y2="116">
          <stop offset="0%" stopColor="#fffdf8" />
          <stop offset="100%" stopColor="#f3d7c6" />
        </linearGradient>
        <linearGradient id={glazeId} x1="48" y1="64" x2="92" y2="64">
          <stop offset="0%" stopColor="#c4a06a" />
          <stop offset="50%" stopColor="#e8c98a" />
          <stop offset="100%" stopColor="#c4a06a" />
        </linearGradient>
      </defs>

      <circle cx="70" cy="70" r="66" stroke={gold} strokeWidth="0.7" opacity="0.35" />
      <circle
        className={animate ? "candle-ring-light" : undefined}
        cx="70"
        cy="70"
        r="61"
        stroke="#e8c98a"
        strokeWidth="5"
        opacity={animate ? 0.2 : 0}
      />
      <circle
        className={animate ? "candle-ring" : undefined}
        cx="70"
        cy="70"
        r="59"
        stroke={gold}
        strokeWidth="1.4"
      />
      <circle cx="70" cy="70" r="53" stroke={rose} strokeWidth="0.45" opacity="0.25" />

      <g className={animate ? "flame" : undefined}>
        <ellipse
          className={animate ? "flame-halo" : undefined}
          cx="70"
          cy="36"
          rx="15"
          ry="18"
          fill={`url(#${glowId})`}
        />
        <path
          className={animate ? "flame-outer" : undefined}
          fill="#e86a3a"
          d="M70 25c-5.4 6.8-5.8 13.2 0 18.6 5.8-5.4 5.4-11.8 0-18.6Z"
        />
        <path
          className={animate ? "flame-inner" : undefined}
          fill="#ffd27a"
          d="M70 31.2c-2.6 3.4-2.8 6.4 0 9.2 2.8-2.8 2.6-5.8 0-9.2Z"
        />
      </g>

      <rect x="68.1" y="42.5" width="3.8" height="21" rx="1.2" fill={gold} />
      <rect x="68.1" y="48.5" width="3.8" height="2" fill={rose} opacity="0.55" />
      <rect x="68.1" y="55.5" width="3.8" height="2" fill={rose} opacity="0.55" />

      <path
        fill={`url(#${icingId})`}
        stroke={rose}
        strokeWidth="1.45"
        d="M48 64.5c0-2.2 1.8-4 4-4h36c2.2 0 4 1.8 4 4v16.5c0 1.4-1.8 2.2-3.1 1.4-2.2-1.3-4.4 1.5-6.6.1-2.3-1.4-4.4 1.4-6.7.1-2.2-1.3-4.4 1.5-6.6.1-2.3-1.4-4.4 1.4-6.7.1-2.2-1.3-4.5 1.4-6.6.1-1.5-.9-3.7-.1-3.7 1.5V64.5Z"
      />
      <rect x="51" y="70.5" width="38" height="3.2" rx="1.5" fill={`url(#${glazeId})`} />
      <path
        fill={rose}
        opacity="0.35"
        d="M56 63.2c1.6-3.2 5.2-3.4 7 0 1.8-3.4 5.4-3.2 7 0 1.6-3.2 5.2-3.4 7 0"
      />

      <path
        fill={`url(#${icingId})`}
        stroke={rose}
        strokeWidth="1.45"
        d="M33 86.5c0-2.4 2-4.4 4.4-4.4h65.2c2.4 0 4.4 2 4.4 4.4v22.2c0 1.5-1.9 2.3-3.2 1.5-2.6-1.6-5.1 1.7-7.7.1-2.7-1.6-5.2 1.6-7.8.1-2.6-1.6-5.1 1.7-7.7.1-2.7-1.6-5.2 1.6-7.8.1-2.6-1.6-5.1 1.7-7.7.1-2.7-1.6-5.2 1.6-7.8.1-2.6-1.6-5.2 1.6-7.7.1-1.5-.9-3.7-.1-3.7 1.6V86.5Z"
      />
      <rect x="38" y="94.5" width="64" height="3.4" rx="1.6" fill={`url(#${glazeId})`} />

      <circle cx="46" cy="103.5" r="1.7" fill={gold} />
      <circle cx="58" cy="103.5" r="1.7" fill={gold} />
      <circle cx="70" cy="103.5" r="1.7" fill={gold} />
      <circle cx="82" cy="103.5" r="1.7" fill={gold} />
      <circle cx="94" cy="103.5" r="1.7" fill={gold} />

      <ellipse cx="70" cy="114.2" rx="42" ry="3.4" fill={gold} opacity="0.85" />
      <path
        stroke={gold}
        strokeWidth="1.4"
        strokeLinecap="round"
        d="M32 114.2c4 4.6 14 7.4 38 7.4s34-2.8 38-7.4"
      />
    </svg>
  );
}
