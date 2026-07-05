# LabCore current state

Stack:
- Next.js 16 / React 19
- App Router
- Supabase
- Mac local project: /Users/courteauguillaume/Projects/labcore

Goal:
- Source of truth must be Supabase.
- Do NOT use OrderContext for real orders anymore.
- Orders flow must be:
  Checkout -> POST /api/orders -> Supabase public.orders -> Admin dashboard/orders.

Important bug found:
- src/app/admin/orders/page.tsx reverted to old client version using useOrders().
- src/app/checkout/page.tsx also reverted to old useOrders().createOrder().
- This is why /admin/orders shows “No orders yet”.
- Need to restore Supabase versions.

Known good:
- Supabase table public.orders exists.
- Orders were previously created successfully through /api/orders.
- API route should exist at src/app/api/orders/route.ts.
- Admin dashboard should read orders from Supabase, not context.
- Admin orders should read orders from Supabase, not context.

Next priority:
1. Restore /api/orders/route.ts.
2. Restore checkout to call fetch("/api/orders").
3. Restore /admin/orders/page.tsx as server component reading Supabase.
4. Remove OrderContext usage from checkout/admin orders.
5. npm run lint.
6. rm -rf .next && npm run dev if weird cache happens.

Do not restart project.
Do not touch products/auth unless necessary.
