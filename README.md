# Pixel Perfect Pixels

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5fc5219c-86f0-4be8-b9b0-5d73f6861775).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Demo reset safety

The dashboard does not provide a reset action. The historical `reset_demo()` database function truncated business tables shared with demo records; migration `0002_contain_demo_reset` revokes its grants and drops the function. Before deploying, verify the target Supabase project's migration history and confirm the function is absent and not executable by `anon` or `authenticated`. This repository cannot establish whether that migration has been applied remotely. Do not reset shared production tables. If demo reset is needed later, implement it against a separate demo database or an explicitly isolated dataset with server-enforced scope and consistent related-record handling.

## Business data isolation rollout

Migration `0003_business_data_isolation` adds business membership and row-level ownership policies. Historical rows deliberately remain unassigned (`business_id IS NULL`) and become inaccessible to ordinary authenticated users; the migration does not backfill or delete records. Do not deploy it to an active workspace until the target database, migration history, data ownership, and recovery plan have been reviewed.

There is no in-app business or membership provisioning flow yet. Before using the admin workspace, a trusted database operator must create the pilot business and membership for the verified Supabase Auth user, then explicitly prepare the service and automation data for that business. Do not infer row ownership from names, email addresses, or demo labels. Users without membership cannot access business records.

Public quote and booking handlers require `OPERANTSCALE_PUBLIC_BUSINESS_ID`, a server-only UUID matching the published business. Do not use a `VITE_`/`NEXT_PUBLIC_` prefix. Public submissions create a new customer rather than looking up or changing an existing customer by email. Until the business, membership, scoped service rows, and server-side setting are provisioned, public quote/booking will fail closed.

For a disposable Supabase/PostgreSQL database only, apply the repository's Drizzle migrations through `0003_business_data_isolation`, then run `drizzle/tests/0003_business_data_isolation.sql` with `psql -v ON_ERROR_STOP=1`. The test creates two temporary tenant fixtures, exercises SELECT/INSERT/UPDATE/DELETE isolation across all business tables, verifies a cross-business relationship is rejected, and rolls its fixture changes back. Never run this test against a production or customer database.

The pilot schema currently limits each Auth user to one business because the existing UI has no active-business selector. Supporting staff across multiple businesses requires adding a trusted business-selection context and updating `current_business_id()` and the corresponding tests before relaxing that constraint.

## Production-readiness gates

This repository is not production-ready for a real business until all of the following have been completed and verified:

- Confirm the Supabase project's applied migration history. Apply migrations `0002` and `0003` only through the reviewed change process, after validating both on a disposable Supabase project. Confirm the reset RPC is absent and test membership-based RLS on the deployed schema.
- Provision the verified pilot Auth user, business membership, and explicitly reviewed business-scoped services and automation records. Historical unassigned records remain inaccessible until ownership is established.
- Set the server-only public business identifier and Supabase server credentials in the deployment platform; never expose the service-role key to browser code. The sample Apex identity, address, phone number, catalog, and hours are fictional and must be replaced with verified business information.
- Configure genuine message delivery, consent handling, an operational reminder worker, and abuse controls before advertising confirmations, SMS/email, or scheduled reminders. Until then, public appointment submissions are requests (`requested`), not confirmed bookings, and the system does not pretend to send a customer confirmation or reminder.
- Public intake is not yet protected by deployed rate limiting or bot verification, and booking persistence still spans multiple database requests; overlapping concurrent submissions and partial writes require a transaction/locking design before accepting production traffic.
- Validate the complete inquiry-to-service workflow and backup/restore process against the provisioned pilot before onboarding customers. Database privilege behavior remains unverified locally unless the disposable SQL test is run on a disposable Supabase project.

The interactive Run Demo control has been removed from production dashboard routes because it writes fictitious customer and business records. The demo implementation is not a production workflow.
