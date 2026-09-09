export function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden>
      <span className="h-px w-16 bg-gold/50" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3c.4 2.8-1 5.2-3.4 6.4C11 10 13 12.2 13 15c0-2.8 2-5 4.4-5.6C15 8.2 13.6 5.8 14 3c-1.2 1.6-2.8 1.6-2 0Z"
          fill="#b8893e"
        />
        <circle cx="12" cy="16.5" r="1.4" fill="#7a2e3a" />
      </svg>
      <span className="h-px w-16 bg-gold/50" />
    </div>
  );
}
