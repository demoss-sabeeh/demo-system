import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutGrid, Users, Columns3, Contact, Car, FileText, CalendarClock, CalendarDays, MessagesSquare, BellRing, Workflow, Wrench, BarChart3, Settings, Menu, LogOut, ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { OperantMark } from "@/components/admin/OperantMark";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "OperantScale — Apex Auto Detailing" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const NAV = [
  { group: "Capture", items: [{ to: "/admin", label: "Overview", icon: LayoutGrid, exact: true }, { to: "/admin/leads", label: "Leads", icon: Users }, { to: "/admin/pipeline", label: "Pipeline", icon: Columns3 }] },
  { group: "Manage", items: [{ to: "/admin/customers", label: "Customers", icon: Contact }, { to: "/admin/vehicles", label: "Vehicles", icon: Car }, { to: "/admin/messages", label: "Messages", icon: MessagesSquare }] },
  { group: "Convert", items: [{ to: "/admin/quotes", label: "Quotes", icon: FileText }, { to: "/admin/appointments", label: "Appointments", icon: CalendarClock }, { to: "/admin/calendar", label: "Calendar", icon: CalendarDays }] },
  { group: "Retain", items: [{ to: "/admin/follow-ups", label: "Follow-ups", icon: BellRing }, { to: "/admin/automations", label: "Automations", icon: Workflow }] },
  { group: "Business", items: [{ to: "/admin/services", label: "Services", icon: Wrench }, { to: "/admin/analytics", label: "Analytics", icon: BarChart3 }, { to: "/admin/settings", label: "Settings", icon: Settings }] },
] as const;

function SideNav({ onNavigate, collapsed = false }: { onNavigate?: () => void; collapsed?: boolean }) {
  return (
    <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4" aria-label="Admin">
      {NAV.map((g) => (
        <div key={g.group}>
          {!collapsed && <p className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-muted/60">{g.group}</p>}
          <ul className="space-y-0.5">
            {g.items.map((it) => (
              <li key={it.to}>
                <Link
                  to={it.to}
                  onClick={onNavigate}
                  activeOptions={{ exact: "exact" in it && it.exact }}
                  title={collapsed ? it.label : undefined}
                  className={cn("flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", collapsed && "justify-center")}
                  activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground [&_svg]:text-sidebar-primary" }}
                >
                  <it.icon className="h-4 w-4 shrink-0" /> {!collapsed && it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobile, setMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/auth" });
  }

  const footer = (c = false) => (
    <div className="space-y-1 border-t border-sidebar-border p-3">
      <Link to="/" target="_blank" className={cn("flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-semibold text-sidebar-foreground hover:bg-sidebar-accent", c && "justify-center")}><ExternalLink className="h-4 w-4" /> {!c && "Customer website"}</Link>
      <button onClick={signOut} className={cn("flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-semibold text-sidebar-foreground hover:bg-sidebar-accent", c && "justify-center")}><LogOut className="h-4 w-4" /> {!c && "Sign out"}</button>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className={cn("sticky top-0 hidden h-dvh shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 lg:flex", collapsed ? "w-16" : "w-60")}>
        <button onClick={() => setCollapsed((c) => !c)} className={cn("flex h-14 items-center border-b border-sidebar-border px-4 text-navy-foreground", collapsed && "justify-center px-0")} aria-label="Toggle sidebar">
          <OperantMark compact={collapsed} />
        </button>
        {!collapsed && (
          <div className="mx-3 mt-3 rounded-md border border-sidebar-border px-3 py-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky">Workspace</p>
            <p className="text-sm font-bold text-navy-foreground">Apex Auto Detailing</p>
          </div>
        )}
        <SideNav collapsed={collapsed} />
        {footer(collapsed)}
      </aside>

      <Sheet open={mobile} onOpenChange={setMobile}>
        <SheetContent side="left" className="flex w-72 flex-col border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
          <SheetTitle className="flex h-14 items-center border-b border-sidebar-border px-4 text-navy-foreground"><OperantMark /></SheetTitle>
          <SideNav onNavigate={() => setMobile(false)} />
          {footer()}
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-surface/95 px-4 backdrop-blur md:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" className="h-11 w-11 lg:hidden" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu /></Button>
            <span className="inline-flex items-center gap-2 rounded border border-warning/30 bg-warning-soft px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-warning">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" /> Demo mode
            </span>
            <span className="hidden truncate text-sm font-bold text-navy sm:inline">Apex Auto Detailing</span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-4 md:p-6 lg:p-8">
          <div key={pathname} className="animate-page-in"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
