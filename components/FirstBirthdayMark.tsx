type FirstBirthdayMarkProps = {
  title: string;
  size?: number;
  gold?: string;
  rose?: string;
  cream?: string;
};

export function FirstBirthdayMark({
  title,
  size = 108,
  gold = "#c4a06a",
  rose = "#9c3d45",
  cream = "#fff8f1",
}: FirstBirthdayMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      role="img"
      aria-label={title}
    >
      <circle cx="70" cy="70" r="66" stroke={gold} strokeWidth="0.7" opacity="0.35" />
      <circle cx="70" cy="70" r="59" stroke={gold} strokeWidth="1.4" />
      <circle cx="70" cy="70" r="53" stroke={rose} strokeWidth="0.45" opacity="0.25" />

      <path fill={gold} d="M108 42 110.4 46.6 108 51.2 105.6 46.6Z" />
      <path fill={gold} d="M32 50 34.1 54.1 32 58.2 29.9 54.1Z" />
      <path fill={rose} d="M112 78 113.8 81.4 112 84.8 110.2 81.4Z" />

      <path
        fill={rose}
        d="M70 28c-4.8 6.4-5.2 12.2 0 17.2 5.2-5 4.8-10.8 0-17.2Z"
      />
      <path
        fill={gold}
        d="M70 34.5c-2.2 3-2.4 5.6 0 8 2.4-2.4 2.2-5 0-8Z"
      />

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
