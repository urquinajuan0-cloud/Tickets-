# Sitio web — Institución Educativa Municipal Montessori (Pitalito)

Sitio institucional de una sola página (SPA) con:
- Inicio, Docentes y Coordinación (solicitud de turnos con calendario de disponibilidad).
- Panel de Administración oculto (clic en el escudo).
- Panel de Coordinación y paneles individuales por docente (turnos, citas).
- Historial de auditoría avanzado (subpestaña oculta con contraseña propia, permanente).
- Base de datos en la nube en tiempo real: **Supabase (PostgreSQL)**.
- Notificaciones por correo opcionales (EmailJS).
- Animaciones de aparición al hacer scroll, confeti al confirmar una cita, y
  efectos de sonido en cada botón, modal y cambio de pestaña.

## Estructura del proyecto

```
.
├── index.html                 # Página principal (estructura HTML)
├── css/
│   └── style.css              # Todos los estilos y animaciones del sitio
├── js/
│   ├── supabase-init.js       # Conexión a la base de datos (Supabase)
│   └── app.js                  # Toda la lógica de la aplicación
├── assets/
│   └── logo.png                # Escudo del colegio
├── docs/
│   └── supabase.sql            # Esquema de base de datos listo para ejecutar
└── README.md
```

## ⚠️ Antes de publicar este repositorio

Este proyecto trae **contraseñas de ejemplo** escritas directamente en `js/app.js`
(administrador, coordinación, docentes, historial avanzado). Si vas a subir este
repositorio a GitHub como **público**, cualquier persona podrá leerlas.

Recomendado:
1. Cambia todas las contraseñas antes de publicar (búscalas en `js/app.js`,
   dentro del objeto `state`, o cámbialas luego desde el propio panel de
   Administración una vez publicado el sitio).
2. Si prefieres no exponer ni siquiera las contraseñas de ejemplo, sube el
   repositorio como **privado** en GitHub, o bórralas del historial de commits
   antes de hacerlo público.
3. La URL y la clave `anon` de Supabase (`js/supabase-init.js`) son seguras de
   publicar *siempre que* dejes activadas las políticas de seguridad (RLS) que
   trae `docs/supabase.sql` — no son secretas como una contraseña de servidor
   tradicional.

## Paso a paso: subir esto a GitHub

```bash
git init
git add .
git commit -m "Sitio institucional inicial (Supabase)"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

Luego, para publicarlo gratis con un enlace real, puedes usar **GitHub Pages**:
1. En tu repositorio de GitHub, ve a **Settings → Pages**.
2. En "Source", elige la rama `main` y la carpeta `/ (root)`.
3. Guarda. En un par de minutos tu sitio quedará disponible en:
   `https://TU_USUARIO.github.io/TU_REPOSITORIO/`

## Configurar la base de datos (Supabase — gratis)

1. Ve a [supabase.com](https://supabase.com) y crea un proyecto gratuito
   (elige una contraseña de base de datos y una región cercana, por ejemplo
   São Paulo).
2. Una vez creado, ve a **SQL Editor** (menú izquierdo) → **New query**.
3. Copia y pega todo el contenido de [`docs/supabase.sql`](docs/supabase.sql)
   y presiona **Run**. Esto crea las tablas, los índices y activa la
   sincronización en tiempo real.
4. Ve a **Project Settings → API** y copia:
   - **Project URL**
   - **anon public** key
5. Abre `js/supabase-init.js` y reemplaza `SUPABASE_URL` y `SUPABASE_ANON_KEY`
   con esos valores.
6. Abre el sitio: en el panel de Administración deberías ver
   "🟢 Conectado a la base de datos en la nube".

Sin este paso, el sitio funciona igual con datos de ejemplo, pero nada se
guarda entre sesiones ni se sincroniza entre dispositivos.

## Notificaciones por correo (opcional)

El sitio integra [EmailJS](https://www.emailjs.com) (gratuito) para avisar por
correo cuando se solicita, confirma o cancela un turno. Actívalo desde el
panel de Administración → "📧 Notificaciones por correo", pegando tu
`Service ID`, `Template ID` y `Public Key` de tu cuenta de EmailJS.

## Accesos del sitio

| Acceso | Cómo se entra |
|---|---|
| Administración | Clic en el escudo (esquina superior izquierda) |
| Coordinación | Botón "🔒 Entrar como Coordinación" en la pestaña Coordinación |
| Docentes | Botón "🔒 Acceso Docentes" en la pestaña Docentes (cada docente tiene su propia contraseña) |
| Historial avanzado | Dentro de Administración, botón "🕵️ Historial avanzado" al final del panel |
| Consultar/cancelar un turno | Botón "🔍 Consultar mi turno" / "Consultar mi cita" (Coordinación y Docentes) |

Todas las contraseñas se pueden cambiar desde el propio panel de
Administración una vez dentro (no es necesario editar el código).

## Notas técnicas (arquitectura con Supabase)

- **Turnos**: cada turno es su propia fila en la tabla `turnos`. Ninguna
  acción sobrescribe a otra — confirmar, cancelar o reprogramar un turno solo
  modifica esa fila puntual (`UPDATE ... WHERE id = ...`), nunca el conjunto
  completo. El número de turno lo asigna una columna autoincremental de
  PostgreSQL, así que nunca se repite aunque dos personas pidan turno en el
  mismo instante.
- **Reservas de horario**: la tabla `slots` tiene una restricción `UNIQUE`
  sobre (destino, docente, fecha, hora). Si dos personas intentan reservar la
  misma hora, la base de datos garantiza que solo una lo logre — sin esa
  garantía, un sistema basado solo en el navegador podría dejar pasar ambas.
- **Auditoría**: cada acción (confirmar, cancelar, cambiar horarios,
  contraseñas, etc.) se guarda como una fila independiente en `audit_log`,
  sin límite de cantidad y sin borrado automático — queda para siempre.
- **Sincronización en tiempo real**: se usa Supabase Realtime
  (`postgres_changes`) para que los cambios en turnos y en el historial se
  vean al instante en todos los dispositivos conectados, sin recargar la
  página.
- **Diseño responsivo**: se adapta en vertical para celular y en horizontal
  para computador o televisor.
- **Interactividad**: aparición animada de tarjetas al hacer scroll, confeti
  al confirmar una solicitud, y efectos de sonido (Web Audio API, sin
  archivos externos) en botones, modales y cambios de pestaña — todo se
  puede silenciar con el botón 🔊 del encabezado.

## ¿Por qué Supabase y no Firebase?

Ambos son válidos para este proyecto. Se eligió Supabase porque:
- Usa PostgreSQL real (SQL estándar), útil si el colegio quiere en el futuro
  hacer reportes o análisis con herramientas más tradicionales.
- El plan gratuito no exige tarjeta de crédito para empezar.
- Las restricciones de base de datos (`UNIQUE`, `CHECK`, autoincrementales)
  permiten resolver de forma nativa problemas como duplicidad de horarios o
  de números de turno, sin lógica adicional en el navegador.
