import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import v1600 from "@/assets/detailing-hero-1600.mp4.asset.json";
import v960 from "@/assets/detailing-hero-960.mp4.asset.json";
import poster from "@/assets/detailing-hero-poster.jpg.asset.json";

/** Muted, looping cinematic hero clip with poster fallback and reduced-motion support. */
export function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep the still poster
    setSrc(window.innerWidth < 768 ? v960.url : v1600.url);
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play(); else v.pause();
  };

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      <img src={poster.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-[60%_50%]" />
      {src && !failed && (
        <video
          ref={ref}
          src={src}
          poster={poster.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Detailer hand-finishing a car's interior dashboard with a foam applicator"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover object-[60%_50%]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
      {src && !failed && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-navy-foreground/30 bg-navy/50 text-navy-foreground backdrop-blur transition-colors hover:bg-navy/80"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
