create table if not exists public.repairs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_name text,
  problem text,
  diagnosis text,
  steps jsonb default '[]'::jsonb,
  safety text,
  image_path text,
  created_at timestamptz not null default now()
);
alter table public.repairs enable row level security;
create policy "Users read own repairs" on public.repairs for select using (auth.uid() = user_id);
create policy "Users insert own repairs" on public.repairs for insert with check (auth.uid() = user_id);
create policy "Users update own repairs" on public.repairs for update using (auth.uid() = user_id);
create policy "Users delete own repairs" on public.repairs for delete using (auth.uid() = user_id);
