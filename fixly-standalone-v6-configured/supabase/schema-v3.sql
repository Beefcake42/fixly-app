
alter table public.repairs add column if not exists tools jsonb not null default '[]'::jsonb;
alter table public.repairs add column if not exists parts jsonb not null default '[]'::jsonb;
alter table public.repairs add column if not exists difficulty text;
alter table public.repairs add column if not exists estimated_time text;

insert into storage.buckets (id,name,public)
values ('repair-images','repair-images',false)
on conflict (id) do nothing;

create policy "Users upload own repair images"
on storage.objects for insert to authenticated
with check (bucket_id='repair-images' and (storage.foldername(name))[1]=auth.uid()::text);

create policy "Users read own repair images"
on storage.objects for select to authenticated
using (bucket_id='repair-images' and (storage.foldername(name))[1]=auth.uid()::text);

create policy "Users delete own repair images"
on storage.objects for delete to authenticated
using (bucket_id='repair-images' and (storage.foldername(name))[1]=auth.uid()::text);
