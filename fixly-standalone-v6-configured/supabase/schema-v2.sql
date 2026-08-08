alter table public.repairs add column if not exists is_favorite boolean not null default false;

create table if not exists public.maintenance (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 title text not null,
 due_date date,
 completed boolean not null default false,
 created_at timestamptz not null default now()
);
alter table public.maintenance enable row level security;
create policy "Users read own maintenance" on public.maintenance for select using (auth.uid()=user_id);
create policy "Users insert own maintenance" on public.maintenance for insert with check (auth.uid()=user_id);
create policy "Users update own maintenance" on public.maintenance for update using (auth.uid()=user_id);
create policy "Users delete own maintenance" on public.maintenance for delete using (auth.uid()=user_id);
