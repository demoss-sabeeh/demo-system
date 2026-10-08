import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutGrid, Users, Columns3, Contact, Car, FileText, CalendarClock, CalendarDays, MessagesSquare, BellRing, Workflow, Wrench, BarChart3, Settings, Menu, LogOut, RotateCcw, ExternalLink, Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { OperantMark } from "@/components/admin/OperantMark";
import { RunDemoButton } from "@/components/admin/RunDemo";
import { resetDemo } from "@/lib/actions";
import { useInvalidate } from "@/lib/admin-data";
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
  const [mobile, setMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [resetting, setResetting] = useState(false);
  const invalidate = useInvalidate();
  const nav = useNavigate();

  async function doReset() {
    setResetting(true);
    try {
      await resetDemo();
      await invalidate();
      toast.success("Demo restored to its original state.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setResetting(false);
    }
  }

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
      <aside className={cn("sticky top-0 hidden h-screen shrink-0 flex-col bg-sidebar text-sidebar-foreground transition-[width] md:flex", collapsed ? "w-16" : "w-60")}>
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
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b bg-surface/95 px-4 backdrop-blur md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobile(true)} aria-label="Open navigation"><Menu /></Button>
            <span className="inline-flex items-center gap-2 rounded border border-warning/30 bg-warning-soft px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-warning">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning" /> Demo mode
            </span>
            <span className="hidden truncate text-sm font-bold text-navy sm:inline">Apex Auto Detailing</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={resetting}>{resetting ? <Loader2 className="animate-spin" /> : <RotateCcw />}<span className="hidden sm:inline">Reset demo</span></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset the demo workspace?</AlertDialogTitle>
                  <AlertDialogDescription>All leads, customers, quotes and appointments return to the original seeded state. Anything created during this session is removed.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={doReset}>Reset demo</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <RunDemoButton />
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
