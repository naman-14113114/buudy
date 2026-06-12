create schema if not exists app_private;

create or replace function app_private.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_handle text not null,
  customer_name text not null,
  customer_email text not null,
  rating integer not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  images text[] not null default '{}'::text[],
  status text not null default 'published' check (status in ('published', 'hidden', 'spam')),
  source text not null default 'site_review_form',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.product_reviews enable row level security;

create index if not exists product_reviews_product_status_created_idx
  on public.product_reviews (product_handle, status, created_at desc);

create index if not exists product_reviews_product_rating_created_idx
  on public.product_reviews (product_handle, rating, created_at desc)
  where status = 'published';

drop trigger if exists product_reviews_set_updated_at on public.product_reviews;
create trigger product_reviews_set_updated_at
before update on public.product_reviews
for each row execute function app_private.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-review-images',
  'product-review-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
