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
        <clipPath id="cake-ring-clip">
          <circle cx="70" cy="70" r="58.3" />
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

      <g clipPath="url(#cake-ring-clip)">
        <path
          fill={cream}
          stroke={rose}
          strokeWidth="1.45"
          d="M32 130V98Q32 90 42 90h56q10 0 10 8v32Z"
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
          d="M49 78V74Q49 70 56 70h28q7 0 7 4v8q0 6-7 6H56q-7 0-7-6Z"
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

        <path fill={gold} d="M10 117h120v30H10Z" />
      </g>

      <path
        fill={gold}
        stroke="#5a3210"
        strokeWidth="1.45"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M69.1 36.8H72.5Q73 36.8 73 37.5V54.4C73 55.5 74 56.1 75.4 56.1H75.6Q76.6 56.1 76.6 57.2V59Q76.6 60.2 75.4 60.2H64.6Q63.4 60.2 63.4 59V57.2Q63.4 56.1 64.6 56.1H64.8C66.2 56.1 67.2 55.5 67.2 54.4V43.6L65.4 45.2A1.4 1.4 0 0 1 64.2 43.6L69.1 36.8Z"
      />

      <g className={animate ? "flame" : undefined}>
        <ellipse
          className={animate ? "flame-halo" : undefined}
          cx="70"
          cy="27.4"
          rx="6.4"
          ry="8.2"
          fill={`url(#${glowId})`}
        />
        <path
          className={animate ? "flame-outer" : undefined}
          fill="#e86a3a"
          d="M70 21c-2.5 3.4-2.7 6.5 0 9 2.7-2.5 2.5-5.6 0-9Z"
        />
        <path
          className={animate ? "flame-inner" : undefined}
          fill="#ffd27a"
          d="M70 24.2c-1.15 1.6-1.25 3 0 4.3 1.25-1.3 1.15-2.7 0-4.3Z"
        />
      </g>
    </svg>
  );
}
