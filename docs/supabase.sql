-- =======================================================================
-- Esquema de base de datos — Sitio I.E.M. Montessori (Supabase / PostgreSQL)
-- -----------------------------------------------------------------------
-- Cómo usarlo:
--   1. Ve a tu proyecto en https://supabase.com → "SQL Editor".
--   2. Pega todo este archivo y presiona "Run".
--   3. Copia tu "Project URL" y "anon public key" (Settings → API) en
--      js/supabase-init.js.
-- =======================================================================

-- ---------------------------------------------------------------------
-- 1) Configuración general del sitio (un solo registro en formato JSON:
--    nombre del colegio, contraseñas, tema visual, biografías, pestañas
--    personalizadas, docentes, cursos, configuración de turnos, etc.)
-- ---------------------------------------------------------------------
create table if not exists site_state (
  id text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 2) Turnos y citas — cada turno es su PROPIA fila. Nunca se sobrescribe
--    un turno con datos de otro: cada acción (confirmar, cancelar,
--    reprogramar) actualiza solo su propia fila.
--    "numero" es autoincremental (bigserial): la propia base de datos
--    garantiza que nunca se repita, incluso si dos personas piden turno
--    al mismo tiempo.
-- ---------------------------------------------------------------------
create table if not exists turnos (
  id text primary key,
  numero bigserial,
  nombre text not null,
  tipo text not null,
  curso text,
  motivo text not null,
  fecha date not null,
  hora time not null,
  estado text not null default 'pendiente'
    check (estado in ('pendiente','confirmado','atendido','cancelado')),
  observaciones text default '',
  destino text not null default 'coordinacion'
    check (destino in ('coordinacion','docente')),
  docente_id text not null default '',
  creado timestamptz not null default now()
);
create index if not exists idx_turnos_fecha on turnos (fecha, hora);
create index if not exists idx_turnos_docente on turnos (docente_id);

-- ---------------------------------------------------------------------
-- 3) Reservas de horario — evita que dos personas reserven la misma
--    hora al mismo tiempo. La restricción UNIQUE la hace cumplir la base
--    de datos misma: si dos solicitudes llegan a la vez, solo una gana.
-- ---------------------------------------------------------------------
create table if not exists slots (
  id text primary key,
  destino text not null,
  docente_id text not null default '',
  fecha date not null,
  hora time not null,
  creado timestamptz not null default now(),
  unique (destino, docente_id, fecha, hora)
);

-- ---------------------------------------------------------------------
-- 4) Historial de auditoría — cada acción es su PROPIA fila. Nunca se
--    borra ni se sobrescribe nada, y no hay límite de cantidad: el
--    historial completo queda guardado para siempre.
-- ---------------------------------------------------------------------
create table if not exists audit_log (
  id bigserial primary key,
  ts timestamptz not null default now(),
  actor text not null,
  action text not null
);
create index if not exists idx_audit_ts on audit_log (ts desc);

-- ---------------------------------------------------------------------
-- 5) Seguridad (RLS) y sincronización en tiempo real
-- ---------------------------------------------------------------------
-- Para simplicidad inicial, se deshabilita Row Level Security (RLS) en
-- estas tablas — equivalente a las reglas abiertas ("allow read, write")
-- que se usan en el prototipo. El sitio no usa Supabase Auth: los
-- "roles" (Administrador / Coordinación / Docentes) se controlan con
-- contraseñas dentro de la propia aplicación, no a nivel de base de
-- datos. Si el colegio quiere una capa extra de seguridad más adelante,
-- se puede migrar a Supabase Authentication y restringir estas reglas
-- por usuario autenticado.
alter table site_state disable row level security;
alter table turnos disable row level security;
alter table slots disable row level security;
alter table audit_log disable row level security;

-- Activar la sincronización en tiempo real (Realtime) para que los
-- cambios se vean al instante en todos los dispositivos conectados.
alter publication supabase_realtime add table turnos;
alter publication supabase_realtime add table audit_log;
