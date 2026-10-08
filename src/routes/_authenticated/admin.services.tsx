import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageTitle, RowsSkeleton, inputSm } from "@/components/admin/ui";
import { useServices, useInvalidate, type Service } from "@/lib/admin-data";
import { supabase } from "@/integrations/supabase/client";
import { RowDelete } from "@/components/admin/delete";
import { deleteService } from "@/lib/actions";
import { money } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/services")({ component: Services });

type Draft = { id?: string; name: string; short_description: string; price_from: number; duration_hours: number };

function Services() {
  const s = useServices();
  const invalidate = useInvalidate();
  const [d, setD] = useState<Draft | null>(null);

  async function save() {
    if (!d || !d.name.trim()) return;
    const row = { name: d.name.trim(), short_description: d.short_description, price_from: d.price_from, duration_hours: d.duration_hours };
    const { error } = d.id
      ? await supabase.from("services").update(row).eq("id", d.id)
      : await supabase.from("services").insert({ ...row, slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + (Date.now() % 1000), sort: (s.data?.length ?? 0) + 1 });
    if (error) return toast.error(error.message);
    toast.success(d.id ? "Service updated" : "Service created");
    setD(null);
    invalidate();
  }
  async function toggle(x: Service) {
    const { error } = await supabase.from("services").update({ active: !x.active }).eq("id", x.id);
    if (error) return toast.error(error.message);
    toast.success(`${x.name} ${x.active ? "deactivated" : "activated"}`);
    invalidate();
  }

  return (
    <div className="space-y-5">
      <PageTitle title="Services" subtitle="Your service menu, pricing and durations." actions={<Button size="sm" onClick={() => setD({ name: "", short_description: "", price_from: 0, duration_hours: 2 })}><Plus /> New service</Button>} />
      <div className="overflow-hidden rounded-md border bg-surface">
        {s.isLoading ? <div className="p-4"><RowsSkeleton /></div> : (
          <ul className="divide-y">
            {s.data?.map((x) => (
              <li key={x.id} className={`grid min-w-0 grid-cols-2 items-center gap-2 px-4 py-3 md:grid-cols-[repeat(11,minmax(0,1fr))_auto_auto] ${x.active ? "" : "opacity-55"}`}>
                <div className="col-span-2 min-w-0 md:col-span-5"><p className="font-bold text-navy">{x.name}</p><p className="break-words text-xs text-slate md:truncate">{x.short_description}</p></div>
                <p className="tabular text-sm font-semibold text-navy md:col-span-2">{money(x.price_from)}</p>
                <p className="tabular text-sm text-slate md:col-span-2">{x.duration_hours} hours</p>
                <div className="flex items-center gap-2 md:col-span-2"><Switch checked={x.active} onCheckedChange={() => toggle(x)} aria-label={`Toggle ${x.name}`} /><span className="text-xs text-slate">{x.active ? "Active" : "Inactive"}</span></div>
                <Button variant="ghost" size="sm" className="justify-self-start" onClick={() => setD({ id: x.id, name: x.name, short_description: x.short_description, price_from: x.price_from, duration_hours: Number(x.duration_hours) })}><Pencil /> Edit</Button>
                <RowDelete className="justify-self-end" kind="Service" name={x.name} detail="Services used by leads, quotes or appointments can’t be deleted — deactivate them instead." onConfirm={() => deleteService(x.id)} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <Dialog open={!!d} onOpenChange={(o) => !o && setD(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="text-navy">{d?.id ? "Edit service" : "New service"}</DialogTitle></DialogHeader>
          {d && (
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate">Name<input className={`${inputSm} mt-1`} value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} /></label>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate">Description<input className={`${inputSm} mt-1`} value={d.short_description} onChange={(e) => setD({ ...d, short_description: e.target.value })} /></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate">Price from ($)<input type="number" min={0} className={`${inputSm} mt-1`} value={d.price_from} onChange={(e) => setD({ ...d, price_from: Math.max(0, Number(e.target.value)) })} /></label>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate">Duration (hrs)<input type="number" min={0.5} step={0.5} className={`${inputSm} mt-1`} value={d.duration_hours} onChange={(e) => setD({ ...d, duration_hours: Math.max(0.5, Number(e.target.value)) })} /></label>
              </div>
            </div>
          )}
          <DialogFooter><Button onClick={save} disabled={!d?.name.trim()}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
