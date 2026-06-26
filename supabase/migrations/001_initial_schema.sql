-- OlympicsConnect — Initial Schema
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enums
create type athlete_status as enum ('olympic', 'hopeful', 'retired');
create type athlete_gender as enum ('male', 'female');
create type medal_type as enum ('gold', 'silver', 'bronze', 'none');
create type budget_range as enum ('low', 'mid', 'high', 'enterprise');
create type inquiry_status as enum ('new', 'reviewing', 'accepted', 'rejected');

-- Athletes table
create table athletes (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references auth.users(id) on delete set null,
  full_name    text not null,
  sport        text not null,
  age          integer check (age between 14 and 60),
  city         text,
  status       athlete_status not null default 'hopeful',
  gender       athlete_gender not null,
  bio          text default '',
  values       text[] default '{}',
  avatar_url   text default '',
  is_verified  boolean not null default false,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Achievements table
create table achievements (
  id          uuid primary key default uuid_generate_v4(),
  athlete_id  uuid not null references athletes(id) on delete cascade,
  year        integer not null,
  competition text not null,
  medal       medal_type not null default 'none',
  description text default '',
  is_olympic  boolean not null default false
);

-- Coaches table (embedded in athletes for simplicity, or separate)
create table coaches (
  id         uuid primary key default uuid_generate_v4(),
  athlete_id uuid not null references athletes(id) on delete cascade,
  name       text not null,
  role       text not null
);

-- Sponsorship inquiries
create table sponsorship_inquiries (
  id            uuid primary key default uuid_generate_v4(),
  athlete_id    uuid not null references athletes(id) on delete cascade,
  company_name  text not null,
  contact_name  text,
  contact_email text not null,
  phone         text,
  message       text,
  budget_range  budget_range not null default 'low',
  status        inquiry_status not null default 'new',
  created_at    timestamptz not null default now()
);

-- Active sponsors
create table sponsors (
  id           uuid primary key default uuid_generate_v4(),
  athlete_id   uuid not null references athletes(id) on delete cascade,
  company_name text not null,
  logo_url     text default '',
  start_date   date not null,
  end_date     date,
  is_active    boolean not null default true
);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger athletes_updated_at
  before update on athletes
  for each row execute function update_updated_at();

-- Indexes
create index idx_athletes_sport on athletes(sport);
create index idx_athletes_status on athletes(status);
create index idx_athletes_published on athletes(is_published);
create index idx_achievements_athlete on achievements(athlete_id);
create index idx_inquiries_athlete on sponsorship_inquiries(athlete_id);
create index idx_inquiries_status on sponsorship_inquiries(status);

-- Row Level Security
alter table athletes enable row level security;
alter table achievements enable row level security;
alter table sponsorship_inquiries enable row level security;
alter table sponsors enable row level security;
alter table coaches enable row level security;

-- Public read for published athletes
create policy "public_read_published_athletes"
  on athletes for select
  using (is_published = true);

-- Admins can do everything (service role bypasses RLS)
create policy "service_role_all_athletes"
  on athletes for all
  using (auth.role() = 'service_role');

-- Athletes can update their own profile
create policy "athlete_update_own"
  on athletes for update
  using (auth.uid() = user_id);

-- Public can read achievements of published athletes
create policy "public_read_achievements"
  on achievements for select
  using (
    exists (
      select 1 from athletes a
      where a.id = achievements.athlete_id and a.is_published = true
    )
  );

-- Public can insert inquiries
create policy "public_insert_inquiry"
  on sponsorship_inquiries for insert
  with check (true);

-- Admin only reads inquiries (service role)
create policy "service_role_all_inquiries"
  on sponsorship_inquiries for all
  using (auth.role() = 'service_role');

-- Public reads active sponsors
create policy "public_read_sponsors"
  on sponsors for select
  using (is_active = true);
