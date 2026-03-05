-- Zephyr Cloud API license persistence schema (Supabase/Postgres)
-- Apply in Supabase SQL editor before enabling SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.

create table if not exists public.zephyr_licenses (
  key text primary key,
  tier text not null check (tier in ('free', 'pro')),
  plan text null check (plan in ('individual', 'startup', 'enterprise', 'pro', 'team')),
  status text not null check (status in ('active', 'invalid', 'revoked', 'expired', 'disabled', 'inactive')),
  message text not null default '',
  source text not null check (source in ('lemonsqueezy', 'local')),
  entitlements jsonb not null default '[]'::jsonb,
  expires_at timestamptz null,
  activation_limit integer null,
  activation_usage integer null,
  customer_email text null,
  lemon_squeezy jsonb null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.zephyr_activations (
  id text primary key,
  license_key text not null references public.zephyr_licenses(key) on delete cascade,
  instance_name text not null,
  status text not null check (status in ('active', 'deactivated')) default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deactivated_at timestamptz null
);
create index if not exists zephyr_activations_license_status_idx
  on public.zephyr_activations (license_key, status);

create table if not exists public.zephyr_customers (
  email text primary key,
  name text null,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  last_order_id bigint null
);

create table if not exists public.zephyr_orders (
  id bigint primary key,
  customer_email text null,
  customer_name text null,
  status text null,
  product_id bigint null,
  product_name text null,
  variant_id bigint null,
  variant_name text null,
  plan text null check (plan in ('individual', 'startup', 'enterprise', 'pro', 'team')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.zephyr_webhook_events (
  id text primary key,
  event_name text not null,
  resource_id text null,
  received_at timestamptz not null default now()
);

create or replace function public.zephyr_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists zephyr_licenses_touch_updated_at on public.zephyr_licenses;
create trigger zephyr_licenses_touch_updated_at
before update on public.zephyr_licenses
for each row execute procedure public.zephyr_touch_updated_at();

drop trigger if exists zephyr_activations_touch_updated_at on public.zephyr_activations;
create trigger zephyr_activations_touch_updated_at
before update on public.zephyr_activations
for each row execute procedure public.zephyr_touch_updated_at();

drop trigger if exists zephyr_orders_touch_updated_at on public.zephyr_orders;
create trigger zephyr_orders_touch_updated_at
before update on public.zephyr_orders
for each row execute procedure public.zephyr_touch_updated_at();

