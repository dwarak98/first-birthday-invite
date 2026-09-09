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
  const icing = "#f3d5c4";

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
        <clipPath id="cake-table-clip">
          <rect x="0" y="0" width="140" height="115.5" />
        </clipPath>
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

      <g clipPath="url(#cake-table-clip)">
        <path
          fill={cream}
          stroke={rose}
          strokeWidth="1.45"
          d="M32 90h76v28H32Z"
        />
        <path
          fill={icing}
          stroke={rose}
          strokeWidth="1.45"
          d="M32 84h76v12c-3.2 5.4-9.4 5.4-12.6 0-3.2 5.4-9.4 5.4-12.7 0-3.2 5.4-9.4 5.4-12.6 0-3.3 5.4-9.5 5.4-12.7 0-3.2 5.4-9.4 5.4-12.6 0-3.3 5.4-9.5 5.4-12.8 0V84Z"
        />
        <circle cx="42" cy="90" r="1.35" fill={cream} />
        <circle cx="55" cy="88.5" r="1.2" fill={cream} />
        <circle cx="70" cy="91" r="1.35" fill={cream} />
        <circle cx="84" cy="88.8" r="1.2" fill={cream} />
        <circle cx="97" cy="90.5" r="1.3" fill={cream} />

        <path
          fill={cream}
          stroke={rose}
          strokeWidth="1.45"
          d="M49 70h42v18H49Z"
        />
        <path
          fill={icing}
          stroke={rose}
          strokeWidth="1.45"
          d="M49 62h42v12c-2.6 4.8-7.8 4.8-10.5 0-2.6 4.8-7.8 4.8-10.5 0-2.6 4.8-7.8 4.8-10.5 0-2.6 4.8-7.8 4.8-10.5 0V62Z"
        />
        <circle cx="58" cy="68.5" r="1.2" fill={cream} />
        <circle cx="70" cy="67" r="1.35" fill={cream} />
        <circle cx="82" cy="69" r="1.2" fill={cream} />
      </g>

      <rect x="26" y="114.5" width="88" height="5" rx="2.5" fill={gold} />

      <path
        fill={gold}
        stroke="#5a3210"
        strokeWidth="1.55"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M68 39.2H74.2Q75.6 39.2 75.6 40.8V56.4C75.6 57.6 76.8 58.3 78.2 58.3H78.5Q79.7 58.3 79.7 59.6V61.5Q79.7 62.8 78.4 62.8H61.6Q60.3 62.8 60.3 61.5V59.6Q60.3 58.3 61.5 58.3H61.8C63.2 58.3 64.4 57.6 64.4 56.4V47.2L59.6 51.8A2.8 2.8 0 0 1 56 48.8L68 39.2Z"
      />

      <g className={animate ? "flame" : undefined}>
        <ellipse
          className={animate ? "flame-halo" : undefined}
          cx="71.1"
          cy="28.5"
          rx="7"
          ry="9"
          fill={`url(#${glowId})`}
        />
        <path
          className={animate ? "flame-outer" : undefined}
          fill="#e86a3a"
          d="M71.1 21.5c-2.8 3.8-3 7.2 0 10 3-2.8 2.8-6.2 0-10Z"
        />
        <path
          className={animate ? "flame-inner" : undefined}
          fill="#ffd27a"
          d="M71.1 24.9c-1.3 1.8-1.4 3.4 0 4.8 1.4-1.4 1.3-3 0-4.8Z"
        />
      </g>
    </svg>
  );
}
