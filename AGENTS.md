<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep phone form fields at least 16px and constrain text-bearing grid tracks with minmax(0, 1fr); this prevents input zoom and clipped records.
- Default the calendar to day view on phones while retaining explicit week/month selection; daily appointments remain readable without horizontal scrolling.
- Size the floating assistant against the visual viewport; its composer must remain accessible when a phone keyboard is open.
- Deletes go through src/lib/actions.ts (delete_* SQL functions for leads, vehicles, customers, services) and the shared ConfirmDelete/RowDelete/DeleteButton components; keeps dependent-record handling consistent and atomic.
