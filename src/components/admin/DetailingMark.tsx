import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * DetailingOS product mark: a rounded square with a four-point shine star.
 * `dark` = the mark sits on a light surface, so text renders in navy.
 * `compact` = icon only, for the collapsed sidebar.
 */
export function DetailingMark({
  dark = false,
  compact = false,
  className = "",
}: {
  dark?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden>
        <rect x="2" y="2" width="28" height="28" rx="7" fill="var(--color-primary)" />
        <path
          d="M16 7.5c.6 4.6 3.9 7.9 8.5 8.5-4.6.6-7.9 3.9-8.5 8.5-.6-4.6-3.9-7.9-8.5-8.5 4.6-.6 7.9-3.9 8.5-8.5Z"
          fill="var(--color-primary-foreground)"
        />
      </svg>
      {!compact && (
        <span className={cn("text-[15px] font-extrabold tracking-tight", dark ? "text-navy" : "text-navy-foreground")}>
          {BRAND.productName}
        </span>
      )}
    </span>
  );
}
