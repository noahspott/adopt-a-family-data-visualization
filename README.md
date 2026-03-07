# Adopt-a-Family Data Visualization

## Supabase setup

This app is set up to connect to a Supabase backend that follows the [data contract](docs/data-contract.md) (tables: `families`, `sponsors`, `packet_checklists`).

1. Copy env vars and add your project credentials:
   ```bash
   cp .env.example .env.local
   ```
   Then set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL from [Supabase Dashboard → Settings → API](https://supabase.com/dashboard/project/_/settings/api)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key from the same page

2. Use the client where you need Supabase:
   - **Server Components / Server Actions:** `import { createClient } from "@/app/lib/supabase/server"` then `const supabase = await createClient()`
   - **Client Components:** `import { createClient } from "@/app/lib/supabase/client"` then `const supabase = createClient()`

3. Fetch data with the shared helpers (they map DB rows to the contract types):
   ```ts
   import { createClient } from "@/app/lib/supabase/server";
   import { getFamilies } from "@/app/lib/supabase/data";

   const supabase = await createClient();
   const families = await getFamilies(supabase);
   ```

Types and DB mapping live in `app/types/data-contract.ts`; table/column names match the data contract (snake_case in DB, camelCase in app types).
