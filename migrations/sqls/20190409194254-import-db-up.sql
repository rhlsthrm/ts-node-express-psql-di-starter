create table item (
  id serial primary key,
  data jsonb not null default '{}',
  "counter" bigint not null default 0,
  created_on timestamp with time zone default now()
);