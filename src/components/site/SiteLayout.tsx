import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS, SERVICES } from "@/lib/knowledge";
import { AssistantWidget } from "./AssistantWidget";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function ApexMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <path d="M16 3 29 28H3L16 3Z" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 22h12" stroke="var(--color-primary)" strokeWidth="2.2" />
      </svg>
      <span className="leading-none">
        <span className="block text-[15px] font-extrabold tracking-[0.18em]">APEX</span>
        <span className="block text-[9px] font-semibold tracking-[0.32em] text-muted-foreground">AUTO DETAILING</span>
      </span>
    </span>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="bg-navy text-navy-foreground">
        <div className="container-site flex h-8 items-center justify-between text-[11px] tracking-wide">
          <span className="flex items-center gap-1.5 text-navy-muted"><MapPin className="h-3 w-3" /> {BUSINESS.address}</span>
          <a href={`tel:${BUSINESS.phone}`} className="hidden items-center gap-1.5 sm:flex"><Phone className="h-3 w-3" /> {BUSINESS.phone}</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container-site flex h-16 items-center justify-between gap-6">
          <Link to="/" className="text-navy" aria-label="Apex Auto Detailing home"><ApexMark /></Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="text-[13px] font-semibold text-slate transition-colors hover:text-navy" activeProps={{ className: "text-navy" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="cta-outline" size="sm" className="h-9"><Link to="/book">Book appointment</Link></Button>
            <Button asChild variant="cta" size="sm" className="h-9"><Link to="/quote">Get a quote</Link></Button>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-11 w-11 shrink-0 lg:hidden" aria-label="Open menu"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto bg-background pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="mt-8 flex flex-col" aria-label="Mobile">
                {NAV.map((n) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b py-4 font-display text-3xl text-navy">{n.label}</Link>
                ))}
              </nav>
              <div className="mt-8 grid gap-2">
                <Button asChild variant="cta" size="lg"><Link to="/quote" onClick={() => setOpen(false)}>Get a quote</Link></Button>
                <Button asChild variant="cta-outline" size="lg"><Link to="/book" onClick={() => setOpen(false)}>Book appointment</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="bg-navy text-navy-foreground">
        <div className="container-site grid gap-10 py-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <ApexMark />
            <p className="mt-4 max-w-sm text-sm text-navy-muted">Premium detailing, paint correction, ceramic coating and paint protection film in {BUSINESS.city}.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild variant="cta" size="sm"><Link to="/quote">Get a quote</Link></Button>
              <Link to="/admin" className="inline-flex h-8 items-center rounded-md border border-navy-muted/30 px-3 text-xs font-semibold text-navy-muted hover:text-navy-foreground">Business login</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow text-navy-muted">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="text-navy-foreground/85 hover:text-navy-foreground">{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-navy-muted">Visit</p>
            <address className="mt-4 space-y-1 text-sm not-italic text-navy-foreground/85">
              <p>{BUSINESS.address}</p>
              <p>{BUSINESS.phone}</p>
              {BUSINESS.hours.map((h) => <p key={h.day} className="text-navy-muted">{h.day}: {h.time}</p>)}
            </address>
          </div>
        </div>
        <div className="border-t border-sidebar-border">
          <div className="container-site flex flex-col gap-2 py-5 text-[11px] text-navy-muted sm:flex-row sm:justify-between">
            <span>Apex Auto Detailing is a fictional business used for product demonstration.</span>
            <span>Powered by <span className="font-bold tracking-[0.14em] text-navy-foreground">OPERANTSCALE</span></span>
          </div>
        </div>
      </footer>
      <AssistantWidget />
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b">
      <div className="container-site py-16 md:py-24">
        <p className="eyebrow animate-rise text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-rise font-display text-5xl leading-[1.02] text-navy md:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl animate-rise text-lg text-slate [animation-delay:120ms]">{children}</div>}
      </div>
    </section>
  );
}
