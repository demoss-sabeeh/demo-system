export function OperantMark({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden>
        <rect x="2" y="2" width="28" height="28" rx="5" fill="var(--color-primary)" />
        <circle cx="16" cy="16" r="6.5" fill="none" stroke="var(--color-primary-foreground)" strokeWidth="2.4" />
        <path d="M16 9.5V4M22.5 16H28" stroke="var(--color-primary-foreground)" strokeWidth="2.4" />
      </svg>
      {!compact && (
        <span className={`text-[13px] font-extrabold tracking-[0.2em] ${dark ? "text-navy" : ""}`}>OPERANTSCALE</span>
      )}
    </span>
  );
}
