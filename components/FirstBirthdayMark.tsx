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
          cy="38"
          rx="15"
          ry="19"
          fill={`url(#${glowId})`}
        />
        <path
          className={animate ? "flame-outer" : undefined}
          fill="#e86a3a"
          d="M70 27c-5.4 6.8-5.8 13.2 0 18.6 5.8-5.4 5.4-11.8 0-18.6Z"
        />
        <path
          className={animate ? "flame-inner" : undefined}
          fill="#ffd27a"
          d="M70 33.2c-2.6 3.4-2.8 6.4 0 9.2 2.8-2.8 2.6-5.8 0-9.2Z"
        />
      </g>

      <rect x="68.2" y="44.5" width="3.6" height="23" rx="1.2" fill={gold} />
      <rect x="68.2" y="51" width="3.6" height="2.2" fill={rose} opacity="0.55" />
      <rect x="68.2" y="58.5" width="3.6" height="2.2" fill={rose} opacity="0.55" />

      <rect
        x="51"
        y="67"
        width="38"
        height="19"
        rx="4"
        fill={cream}
        stroke={rose}
        strokeWidth="1.5"
      />
      <rect
        x="39"
        y="85"
        width="62"
        height="22"
        rx="5"
        fill={cream}
        stroke={rose}
        strokeWidth="1.5"
      />
      <path
        stroke={gold}
        strokeWidth="1"
        strokeLinecap="round"
        d="M55 85.8c2.2 3.4 6.2 3.4 8.4 0 2.2 3.4 6.2 3.4 8.4 0 2.2 3.4 6.2 3.4 8.4 0"
      />

      <rect x="68.6" y="91" width="2.8" height="11" rx="0.8" fill={rose} />
      <rect x="64.4" y="101.2" width="11.2" height="1.7" rx="0.8" fill={rose} />

      <path
        stroke={gold}
        strokeWidth="1.3"
        strokeLinecap="round"
        d="M34 109.5h72"
      />
      <path
        stroke={gold}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.55"
        d="M42 113.5h56"
      />
    </svg>
  );
}
