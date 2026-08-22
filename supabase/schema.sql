create table if not exists public.wishes (
  id text primary key,
  name text not null check (char_length(name) between 1 and 120),
  sender text check (sender is null or char_length(sender) <= 120),
  letter text not null check (char_length(letter) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.wishes enable row level security;

drop policy if exists "Anyone can read wishes by id" on public.wishes;
create policy "Anyone can read wishes by id"
  on public.wishes for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can create wishes" on public.wishes;
create policy "Anyone can create wishes"
  on public.wishes for insert
  to anon, authenticated
  with check (true);
