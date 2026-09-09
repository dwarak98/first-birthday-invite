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
  const cakeFillId = "first-birthday-cake-fill";
  const icingFillId = "first-birthday-icing-fill";

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
        <linearGradient id={cakeFillId} x1="70" y1="56" x2="70" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fffaf4" />
          <stop offset="100%" stopColor="#f3e2d2" />
        </linearGradient>
        <linearGradient id={icingFillId} x1="70" y1="54" x2="70" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f7e3d7" />
          <stop offset="100%" stopColor="#e8c4b4" />
        </linearGradient>
        <clipPath id="cake-table-clip">
          <rect x="0" y="0" width="140" height="107.4" />
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
        <rect
          x="42"
          y="81"
          width="56"
          height="32"
          rx="11"
          fill={`url(#${cakeFillId})`}
          stroke={rose}
          strokeWidth="1.3"
        />
        <rect x="55" y="58" width="30" height="28" rx="10" fill={`url(#${cakeFillId})`} />
        <path
          fill="none"
          stroke={rose}
          strokeWidth="1.3"
          strokeLinecap="round"
          d="M55 79V68A10 10 0 0 1 65 58h10a10 10 0 0 1 10 10v11"
        />
        <rect
          x="42"
          y="76.5"
          width="56"
          height="16"
          rx="8"
          fill={`url(#${icingFillId})`}
          stroke={rose}
          strokeWidth="1.25"
        />
        <rect
          x="55"
          y="54.5"
          width="30"
          height="14"
          rx="7"
          fill={`url(#${icingFillId})`}
          stroke={rose}
          strokeWidth="1.25"
        />
        <path
          fill="none"
          stroke={gold}
          strokeWidth="0.85"
          strokeLinecap="round"
          d="M50 74.5c6.5 2 13 3 20 3s13.5-1 20-3"
        />
        <path
          fill="none"
          stroke={gold}
          strokeWidth="0.75"
          strokeLinecap="round"
          d="M62 63.2c2.6 1 5.2 1.5 8 1.5s5.4-.5 8-1.5"
        />
      </g>

      <rect x="40" y="107" width="60" height="3.8" rx="1.9" fill={gold} />
      <rect x="43" y="107.7" width="54" height="1.1" rx="0.55" fill={cream} opacity="0.35" />

      <path
        fill={gold}
        stroke="#5a3210"
        strokeWidth="1.45"
        strokeLinejoin="round"
        strokeLinecap="round"
        d="M69 37.2H72.2Q72.6 37.2 72.6 37.9V54.5C72.6 55.6 73.6 56.2 75 56.2H75.2Q76.2 56.2 76.2 57.3V59.1Q76.2 60.3 75 60.3H65Q63.8 60.3 63.8 59.1V57.3Q63.8 56.2 64.8 56.2H65C66.4 56.2 67.4 55.6 67.4 54.5V45.2L62.4 49.6A2 2 0 0 1 59.8 47.1L69 37.2Z"
      />

      <g className={animate ? "flame" : undefined}>
        <ellipse
          className={animate ? "flame-halo" : undefined}
          cx="70"
          cy="27.6"
          rx="6.4"
          ry="8.2"
          fill={`url(#${glowId})`}
        />
        <path
          className={animate ? "flame-outer" : undefined}
          fill="#e86a3a"
          d="M70 21.2c-2.5 3.4-2.7 6.5 0 9 2.7-2.5 2.5-5.6 0-9Z"
        />
        <path
          className={animate ? "flame-inner" : undefined}
          fill="#ffd27a"
          d="M70 24.4c-1.15 1.6-1.25 3 0 4.3 1.25-1.3 1.15-2.7 0-4.3Z"
        />
      </g>
    </svg>
  );
}
