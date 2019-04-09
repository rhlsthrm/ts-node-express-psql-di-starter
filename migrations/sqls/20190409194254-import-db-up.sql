create table item (
  id serial primary key,
  data jsonb,
  created_on timestamp with time zone default now()
);