import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import full from "@/assets/logo-full.png.asset.json";
import fullWhite from "@/assets/logo-full-white.png.asset.json";
import mark from "@/assets/logo-mark.png.asset.json";
import markWhite from "@/assets/logo-mark-white.png.asset.json";

/**
 * Brand logo. `dark` = sits on a light surface (navy logo).
 * `compact` = monogram only, for the collapsed sidebar.
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
  const src = compact ? (dark ? mark : markWhite) : dark ? full : fullWhite;
  return (
    <img
      src={src.url}
      alt={BRAND.productName}
      className={cn("w-auto shrink-0 object-contain", compact ? "h-7" : "h-10", className)}
    />
  );
}
