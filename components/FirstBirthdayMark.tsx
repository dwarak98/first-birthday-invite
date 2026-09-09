type FirstBirthdayMarkProps = {
  title: string;
  size?: number;
  gold?: string;
  rose?: string;
};

export function FirstBirthdayMark({
  title,
  size = 132,
  gold = "#c4a06a",
  rose = "#9c3d45",
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
      <circle cx="70" cy="70" r="66" stroke={gold} strokeWidth="0.75" opacity="0.35" />
      <circle cx="70" cy="70" r="60" stroke={gold} strokeWidth="1.35" />
      <circle cx="70" cy="70" r="54" stroke={gold} strokeWidth="0.55" />
      <circle cx="70" cy="70" r="46" stroke={rose} strokeWidth="0.4" opacity="0.28" />

      <path fill={gold} d="M70 6.5 73.1 12.6 70 18.7 66.9 12.6Z" />
      <path fill={gold} d="M70 121.3 73.1 127.4 70 133.5 66.9 127.4Z" />
      <path fill={gold} d="M6.5 70 12.6 66.9 18.7 70 12.6 73.1Z" />
      <path fill={gold} d="M121.3 70 127.4 66.9 133.5 70 127.4 73.1Z" />

      <path
        stroke={gold}
        strokeWidth="0.8"
        strokeLinecap="round"
        d="M32 58c6-10 14-16 22-18"
      />
      <path
        stroke={gold}
        strokeWidth="0.8"
        strokeLinecap="round"
        d="M108 58c-6-10-14-16-22-18"
      />
      <path
        stroke={gold}
        strokeWidth="0.8"
        strokeLinecap="round"
        d="M32 82c6 10 14 16 22 18"
      />
      <path
        stroke={gold}
        strokeWidth="0.8"
        strokeLinecap="round"
        d="M108 82c-6 10-14 16-22 18"
      />

      <circle cx="70" cy="43.5" r="3.6" fill={rose} />
      <rect x="67.5" y="47" width="5" height="51" rx="1.4" fill={rose} />
      <rect x="53" y="97.5" width="34" height="2.6" rx="1.3" fill={rose} />
      <rect x="58" y="104" width="24" height="1.1" rx="0.55" fill={gold} />
    </svg>
  );
}
