import logoNavy from "@/assets/operantscale-logo-navy.png.asset.json";
import logoWhite from "@/assets/operantscale-logo-white.png.asset.json";
import markNavy from "@/assets/operantscale-mark-navy.png.asset.json";
import markWhite from "@/assets/operantscale-mark-white.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * OperantScale brand mark.
 * `dark` = the mark sits on a light surface, so use the navy artwork.
 * `compact` = icon only, for the collapsed sidebar.
 */
export function OperantMark({
  dark = false,
  compact = false,
  className = "",
}: {
  dark?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const src = compact ? (dark ? markNavy : markWhite) : (dark ? logoNavy : logoWhite);

  return (
    <img
      src={src.url}
      alt="OperantScale"
      draggable={false}
      className={cn("w-auto max-w-full shrink-0 select-none object-contain", compact ? "h-6" : "h-5", className)}
    />
  );
}
