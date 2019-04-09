create table item (
  id serial primary key,
  data jsonb default '{}',
  "counter" bigint,
  created_on timestamp with time zone default now()
);