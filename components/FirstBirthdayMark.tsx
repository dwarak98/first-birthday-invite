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
  const frostingId = "first-birthday-frosting";

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
          <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#f0a04a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f0a04a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={frostingId} x1="70" y1="64" x2="70" y2="86">
          <stop offset="0%" stopColor="#fbe4d4" />
          <stop offset="100%" stopColor="#f3cbb8" />
        </linearGradient>
      </defs>

      <circle cx="70" cy="70" r="66" stroke={gold} strokeWidth="0.7" opacity="0.35" />
      <circle
        className={animate ? "candle-ring-light" : undefined}
        cx="70"
        cy="70"
        r="61"
        stroke="#e8c98a"
        strokeWidth="4"
        opacity={animate ? 0.12 : 0}
      />
      <circle
        className={animate ? "candle-ring" : undefined}
        cx="70"
        cy="70"
        r="59"
        stroke={gold}
        strokeWidth="1.4"
      />

      <rect
        x="48"
        y="66.5"
        width="44"
        height="20"
        rx="5"
        fill={`url(#${frostingId})`}
        stroke={rose}
        strokeWidth="1.5"
      />
      <path
        fill={rose}
        opacity="0.28"
        d="M54 66.5c2.2 4 6.6 4 8.8 0 2.2 4 6.6 4 8.8 0 2.2 4 6.6 4 8.8 0"
      />
      <rect
        x="36"
        y="85"
        width="68"
        height="24"
        rx="6"
        fill={cream}
        stroke={rose}
        strokeWidth="1.5"
      />
      <path
        stroke={gold}
        strokeWidth="1.35"
        strokeLinecap="round"
        d="M48 85.6c2.6 3.8 7.2 3.8 9.8 0 2.6 3.8 7.2 3.8 9.8 0 2.6 3.8 7.2 3.8 9.8 0 2.6 3.8 7.2 3.8 9.8 0"
      />

      <path
        stroke={gold}
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M32 111.5h76"
      />
      <path
        stroke={gold}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.5"
        d="M42 115.2h56"
      />

      <text
        x="70"
        y="64"
        textAnchor="middle"
        fill={cream}
        stroke={gold}
        strokeWidth="1.4"
        paintOrder="stroke"
        style={{
          fontFamily:
            "var(--font-display), Georgia, 'Times New Roman', Times, serif",
          fontSize: "40px",
          fontWeight: 600,
        }}
      >
        1
      </text>

      <g className={animate ? "flame" : undefined}>
        <ellipse
          className={animate ? "flame-halo" : undefined}
          cx="70"
          cy="28"
          rx="7"
          ry="9"
          fill={`url(#${glowId})`}
        />
        <path
          className={animate ? "flame-outer" : undefined}
          fill="#e86a3a"
          d="M70 21c-2.8 3.8-3 7.2 0 10 3-2.8 2.8-6.2 0-10Z"
        />
        <path
          className={animate ? "flame-inner" : undefined}
          fill="#ffd27a"
          d="M70 24.4c-1.3 1.8-1.4 3.4 0 4.8 1.4-1.4 1.3-3 0-4.8Z"
        />
      </g>
    </svg>
  );
}
