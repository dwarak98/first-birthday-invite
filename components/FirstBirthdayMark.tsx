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
        <clipPath id="cake-base-clip">
          <rect x="0" y="0" width="140" height="116.6" />
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

      <g clipPath="url(#cake-base-clip)">
        <path
          fill={cream}
          stroke={rose}
          strokeWidth="1.45"
          d="M36 130V100Q36 86 50 86h40q14 0 14 14v30Z"
        />
        <path
          fill={cream}
          d="M52 90V74Q52 64 62 64h16q10 0 10 10v16Z"
        />
        <path
          fill="none"
          stroke={rose}
          strokeWidth="1.45"
          strokeLinecap="round"
          d="M52 82V74Q52 64 62 64h16q10 0 10 10v8"
        />
        <path
          fill={icing}
          stroke={rose}
          strokeWidth="1.45"
          d="M50 81h40Q104 81 104 92v4c-2.8 5.2-8.4 5.2-11.3 0-2.8 5.2-8.4 5.2-11.3 0-2.8 5.2-8.4 5.2-11.4 0-2.8 5.2-8.4 5.2-11.3 0-2.8 5.2-8.4 5.2-11.3 0-2.8 5.2-8.5 5.2-11.4 0V92Q36 81 50 81Z"
        />
        <circle cx="46" cy="90" r="1.35" fill={cream} />
        <circle cx="58" cy="88.5" r="1.2" fill={cream} />
        <circle cx="70" cy="91" r="1.35" fill={cream} />
        <circle cx="82" cy="88.8" r="1.2" fill={cream} />
        <circle cx="94" cy="90.5" r="1.3" fill={cream} />
        <path
          fill={icing}
          stroke={rose}
          strokeWidth="1.45"
          d="M62 62h16Q88 62 88 70v4c-2.2 4.6-6.8 4.6-9 0-2.2 4.6-6.8 4.6-9 0-2.2 4.6-6.8 4.6-9 0-2.2 4.6-6.8 4.6-9 0V70Q52 62 62 62Z"
        />
        <circle cx="60" cy="68.5" r="1.2" fill={cream} />
        <circle cx="70" cy="67" r="1.35" fill={cream} />
        <circle cx="80" cy="69" r="1.2" fill={cream} />
      </g>

      <rect x="56" y="116.2" width="28" height="5.2" rx="2.6" fill={gold} />

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
