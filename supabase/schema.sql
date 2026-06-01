-- ============================================================
-- Distrito 44 — Supabase Schema
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Tabla de categorías
create table if not exists categories (
  id          text primary key default gen_random_uuid()::text,
  name        text not null,
  emoji       text not null default '🍔',
  description text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- 2. Tabla de ítems del menú
create table if not exists items (
  id           text primary key default gen_random_uuid()::text,
  category_id  text references categories(id) on delete cascade,
  name         text not null,
  description  text,
  price        integer,            -- en pesos, null = precio a consultar
  badge        text,
  image_url    text,
  available    boolean not null default true,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

-- 3. Índices
create index if not exists items_category_id_idx on items(category_id);
create index if not exists items_available_idx    on items(available);

-- 4. Row Level Security
alter table categories enable row level security;
alter table items       enable row level security;

-- 5. Políticas: lectura pública
create policy "Lectura pública de categorías"
  on categories for select using (true);

create policy "Lectura pública de ítems"
  on items for select using (true);

-- 6. Políticas: escritura solo para admins autenticados
create policy "Admins gestionan categorías"
  on categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admins gestionan ítems"
  on items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 7. Storage bucket para imágenes del menú (ejecutar por separado si falla)
insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

create policy "Imágenes públicas"
  on storage.objects for select
  using (bucket_id = 'menu-images');

create policy "Admins suben imágenes"
  on storage.objects for insert
  with check (bucket_id = 'menu-images' and auth.role() = 'authenticated');

create policy "Admins borran imágenes"
  on storage.objects for delete
  using (bucket_id = 'menu-images' and auth.role() = 'authenticated');

-- ============================================================
-- DATOS INICIALES — Menú real de Distrito 44
-- (Ejecutar luego de crear las tablas)
-- ============================================================

insert into categories (id, name, emoji, description, sort_order) values
  ('entradas',      'Entradas',         '🧀', 'Bocados para compartir',            0),
  ('papas',         'Papas',            '🍟', 'Papas fritas con toppings especiales', 1),
  ('sandwiches',    'Sándwiches',       '🥖', 'Clásicos callejeros',               2),
  ('smash-burgers', 'Smash Burgers',    '🍔', 'Smash burgers y combos',            3),
  ('burgers',       'Burgers Premium',  '🥩', 'Hamburguesas premium 7 oz',         4),
  ('postres',       'Postres',          '🍓', 'Para cerrar con dulzura',           5)
on conflict (id) do nothing;

insert into items (id, category_id, name, description, price, badge, sort_order) values
  -- Entradas
  ('e1','entradas','Chicken Nuggets','Crujientes bocados de pollo con salsa BBQ.',400,null,0),
  ('e2','entradas','Gouditas','Triángulos crujientes de cheddar y jalapeño.',400,'🌶️ Picante',1),
  ('e3','entradas','Nachitos Picantes','Bites rellenos de queso gouda cremoso.',400,'🌶️ Picante',2),
  -- Papas
  ('p1','papas','Philly Cheese Fries','Papas crujientes con quesos provolone y americano y carne Angus estilo Philly.',680,null,0),
  ('p2','papas','Pulled Pork Fries','Papas fritas crujientes con queso cheddar, pulled pork y salsa BBQ.',750,'⭐ Popular',1),
  -- Sándwiches
  ('s1','sandwiches','Philly Cheesesteak','Clásico Philly con tiras de carne Angus y cheese whiz casero, estilo 100% callejero.',750,'⭐ Popular',0),
  -- Smash Burgers
  ('sb1','smash-burgers','UFO Burger','Carne 3.5 oz, doble queso americano y salsa de la casa. Agrega bacon por $75.',575,null,0),
  ('sb2','smash-burgers','Smash Bacon','Doble smash de 3.5 oz, queso americano y tiras de bacon crujiente.',485,null,1),
  ('sb3','smash-burgers','Chicken & Fries','Combo de Chicken Nuggets y papas fritas.',450,'🍗 Combo',2),
  ('sb4','smash-burgers','Smashburger Double','Doble carne de 3.5 oz, queso americano y salsa de la casa.',550,null,3),
  ('sb5','smash-burgers','Oklahoma','Doble carne 14 oz de res premium con queso americano y bacon crujiente.',815,'🔥 Especial',4),
  ('sb6','smash-burgers','Double Bacon Cheese','Doble carne de 3.5 oz aplastada con cebolla, queso americano y salsa de la casa en pan brioche.',650,null,5),
  -- Burgers Premium
  ('b1','burgers','Bacon Blast','Carne 7 oz, mermelada de tocineta, queso americano y salsa de la casa.',725,null,0),
  ('b2','burgers','Gaucho Burger','Carne 7 oz, mermelada de morrón, provoleta y chimichurri.',770,'🇦🇷 Clásica',1),
  ('b3','burgers','BBQ Burger','Carne 7 oz, pulled pork y aros de cebolla en salsa BBQ.',725,'⭐ Popular',2),
  ('b4','burgers','Hilly Cheese','Carne 7 oz, morrón y cebolla salteada con mezcla de queso provolone y americano.',770,null,3),
  ('b5','burgers','La Picante','Carne 7 oz, salsa picante, cebolla encurtida y queso americano.',650,'🌶️ Picante',4),
  -- Postres
  ('po1','postres','Postre','Base: fresa o banana · Salsa: nutella o dulce de leche · Topping: oreo o maní.',null,'🍫 Personalizable',0)
on conflict (id) do nothing;
