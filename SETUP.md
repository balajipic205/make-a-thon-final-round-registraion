# Make-a-Thon 7.0 — Setup Checklist

You picked the **external Supabase project** (`kmxwjurrhaoecnukydqi`). Lovable has no
API access to it, so YOU must do the following before the portal works.

## 1. Run the SQL (one-time)

Open **Supabase Dashboard → SQL Editor**.

1. Paste the entire contents of `supabase/schema.sql` and run.
2. Create the 3 storage buckets (next step) **before** running storage_policies.sql.

## 2. Create storage buckets

**Storage → New bucket** for each:

| Name                  | Public? | File size limit | Allowed MIME types                              |
|-----------------------|---------|-----------------|-------------------------------------------------|
| `member-photos`       | ❌ No   | 5 MB            | `image/jpeg, image/png`                         |
| `payment-screenshots` | ❌ No   | 10 MB           | `image/jpeg, image/png, application/pdf`        |
| `payment-qr`          | ✅ YES  | (none)          | (any)                                           |

Then upload your real QR code as `qr.png` to the `payment-qr` bucket.

## 3. Run storage policies

Paste `supabase/storage_policies.sql` into SQL Editor and run.

## 4. Enable Email auth

**Authentication → Providers → Email** → enable.
For testing, **disable "Confirm email"** so logins are instant. Re-enable for production.

## 5. Promote yourself to admin

After registering an account on the portal, find your UID (Authentication → Users)
and run in SQL Editor:

```sql
update public.user_profiles
set role = 'admin'
where id = '<your-auth-uid>';
```

## 6. Update `.env`

Already done — but if your QR upload happens later, also set:

```
VITE_WHATSAPP_GROUP_URL=https://chat.whatsapp.com/<your-real-invite>
```

## Troubleshooting

- **"function submit_registration does not exist"** → step 1 wasn't run.
- **RLS errors on insert** → step 1 RLS policies missing or step 5 not done.
- **QR shows broken image** → bucket isn't public or `qr.png` wasn't uploaded.
- **"You have already submitted"** → expected; clear via:
  `delete from public.teams where user_id = '<uid>';`
- **Photo upload 403** → step 3 storage policies not applied, or bucket name wrong.
