// Shared delete UX: a subtle row action menu plus a confirmation dialog that
// runs the real deletion, disables while pending, toasts the outcome and
// refreshes every dashboard query.
import { useState, type ReactNode } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useInvalidate } from "@/lib/admin-data";

const stop = (e: { stopPropagation: () => void; preventDefault?: () => void }) => { e.stopPropagation(); e.preventDefault?.(); };

export function ConfirmDelete({ open, onOpenChange, kind, name, detail, onConfirm, onDeleted }: {
  open: boolean; onOpenChange: (o: boolean) => void; kind: string; name: ReactNode; detail?: ReactNode;
  onConfirm: () => Promise<void>; onDeleted?: () => void;
}) {
  const invalidate = useInvalidate();
  const [busy, setBusy] = useState(false);
  async function run() {
    setBusy(true);
    try {
      await onConfirm();
      toast.success(`${kind} deleted`);
      onOpenChange(false);
      onDeleted?.();
      await invalidate();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : `Could not delete ${kind.toLowerCase()}`);
    } finally {
      setBusy(false);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={(o) => !busy && onOpenChange(o)}>
      <AlertDialogContent onClick={stop}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-navy">Delete {kind.toLowerCase()}?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-2 text-sm text-slate">
              <p><span className="font-semibold text-navy [overflow-wrap:anywhere]">{name}</span> will be permanently deleted. This cannot be undone.</p>
              {detail && <p>{detail}</p>}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={run} disabled={busy}><Trash2 /> {busy ? "Deleting…" : "Delete"}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** Row "⋯" menu with a Delete item; clicks never reach the row underneath. */
export function RowDelete(props: Omit<Parameters<typeof ConfirmDelete>[0], "open" | "onOpenChange"> & { className?: string }) {
  const [open, setOpen] = useState(false);
  const { className, ...rest } = props;
  return (
    <span onClick={stop} onKeyDown={(e) => e.stopPropagation()} className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate hover:text-navy" aria-label={`Actions for ${props.kind.toLowerCase()}`}><MoreHorizontal /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={() => setOpen(true)}><Trash2 /> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDelete {...rest} open={open} onOpenChange={setOpen} />
    </span>
  );
}

/** Outline "Delete" button for detail pages and sheets. */
export function DeleteButton(props: Omit<Parameters<typeof ConfirmDelete>[0], "open" | "onOpenChange"> & { label?: string }) {
  const [open, setOpen] = useState(false);
  const { label, ...rest } = props;
  return (
    <>
      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => setOpen(true)}><Trash2 /> {label ?? "Delete"}</Button>
      <ConfirmDelete {...rest} open={open} onOpenChange={setOpen} />
    </>
  );
}
