# Make-a-Thon 7.0 — Setup Checklist

You're using the **external Supabase project** (`cnwchucuzheqpzoyuybi`). Lovable has no
API access to it, so YOU must do the following before the portal works.

## 1. Run the SQL (one-time)

Open **Supabase Dashboard → SQL Editor**.

1. Paste the entire contents of `supabase/schema.sql` and run.
2. Paste the entire contents of `supabase/admin_lockout.sql` and run (adds the
   3-strike / 2-hour admin lockout RPCs).
3. If you already ran an older SQL script, first delete old storage policies or use a clean project, then re-run the current files.

## 2. Storage buckets

The current `supabase/schema.sql` already creates these buckets for you:

- `member-photos`
- `payment-screenshots`
- `payment-qr`

After running the schema, go to **Storage** and confirm the buckets are visible.
Then upload your real QR code as `qr.png` to the `payment-qr` bucket.

## 3. Run storage policies

Paste `supabase/storage_policies.sql` into SQL Editor and run.

## 4. Enable Email auth

**Authentication → Providers → Email** → enable.
For testing, **disable "Confirm email"** so logins are instant. Re-enable for production.

## 5. Promote yourself to admin

After registering an account on the portal, find your UID in **Authentication → Users**
and run this exact SQL with the plain UUID only, without `< >`:

```sql
insert into public.user_roles (user_id, role)
values ('your-auth-uid-here', 'admin')
on conflict (user_id, role) do nothing;
```

Example:

```sql
insert into public.user_roles (user_id, role)
values ('e4e5249d-d7f2-40ad-abfa-035ee9e8022a', 'admin')
on conflict (user_id, role) do nothing;
```

## 6. Update `.env`

Already done — but if your QR upload happens later, also set:

```
VITE_WHATSAPP_GROUP_URL=https://chat.whatsapp.com/<your-real-invite>
```

## Troubleshooting

- **"function submit_registration does not exist"** → step 1 wasn't run.
- **Bucket not found** → your database is still using the older schema, so run the current `supabase/schema.sql` which creates the buckets.
- **QR shows broken image** → bucket isn't public or `qr.png` wasn't uploaded.
- **"You have already submitted"** → expected; clear via:
  `delete from public.teams where user_id = '<uid>';`
- **Photo upload 403** → step 3 storage policies not applied, or bucket name wrong.
