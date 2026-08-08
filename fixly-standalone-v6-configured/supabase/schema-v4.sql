
alter table public.maintenance add column if not exists notes text;
alter table public.maintenance add column if not exists reminder_enabled boolean not null default true;
alter table public.repairs add column if not exists updated_at timestamptz not null default now();
