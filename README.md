# Proyecto: Sitio web para Isel Rojas & Asociados

Este proyecto es un sitio web simple hecho con **React + TypeScript + Vite**, pensado para mostrar un sitio estático de un estudio jurídico.

## 🧱 Estructura principal del proyecto

- `src/` – Código de la aplicación.
  - `src/components/` – Componentes React separados (Header, Hero, Servicios, Nosotros, Contacto, Footer).
  - `src/index.css` – Estilos globales (paleta de colores, tipografía, layout y estilos responsivos).
  - `src/App.tsx` – Orquestador principal: importa y usa cada componente.
  - `src/main.tsx` – Punto de entrada que monta React en `#root`.
- `public/` – Archivos estáticos (imagenes, favicon).
- `dist/` – Carpeta generada al ejecutar `npm run build`.

## 🚀 Cómo ejecutar el proyecto

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Luego abre el navegador en la URL que te indica Vite en la terminal (por defecto es `http://localhost:5173`, aunque puede cambiar a `5174` si el puerto ya está en uso).

```text
http://localhost:5173  (o el puerto que te muestre Vite)
```

## 🔑 Variables de entorno

Este proyecto usa **Supabase** y requiere variables de entorno para funcionar.

1. Copiá `.env.example` a `.env`.
2. Completá los valores de Supabase (URL y anon key).

```env
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🎨 Diseño y paleta de colores

El estilo usa un theme oscuro con acentos en azul y dorado. Los colores están definidos como variables CSS en `src/index.css`:

- `--bg`, `--bg2` → fondos oscuros
- `--text` → texto principal
- `--primary`, `--accent` → colores de acento
- `--btn-bg`, `--btn-text` → botón blanco estilo “premium”

## 🧩 Cómo distinguir las secciones

El sitio está dividido en estas secciones (cada una en su propio componente):

- **Header** (`src/components/Header.tsx`) – Barra de navegación.
- **Hero** (`src/components/Hero.tsx`) – Portada con imagen de fondo y botón.
- **Services** (`src/components/Services.tsx`) – Servicios con cards.
- **About** (`src/components/About.tsx`) – Información del estudio.
- **Contact** (`src/components/Contact.tsx`) – Formulario de contacto.
- **Inbox** (`src/components/Inbox.tsx`) – Mensajes recibidos (visible solo al iniciar sesión).
- **Footer** (`src/components/Footer.tsx`) – Pie de página.

## 🧠 Notas para personalizar

- Para cambiar la imagen de fondo del hero, reemplaza `public/hero.jpg`.
- Para cambiar los textos, edita el componente correspondiente en `src/components/`.
- Para ajustar colores globales, modifica las variables CSS en `src/index.css`.

## 💡 Ideas de mejoras futuras

- Agregar navegación tipo “hamburger” en móvil
- Soporte real de envío de formulario (API o Email)
- Animaciones suaves al hacer scroll
- Contenido dinámico (servicios, testimonios, equipo) con datos JSON

---

## ✅ Lo que ya está implementado (cambios recientes)

- **Inicio de sesión con Supabase (magic link)**: desde el menú se puede iniciar sesión con un email y el estado se mantiene en el sitio.
- **Formulario de contacto real**: guarda los mensajes en la tabla `contacts` de Supabase (si está configurado).
- **Estructura de código limpia**: ahora hay un hook `useSupabaseAuth` que separa la lógica de autenticación del UI.
- **Configuración segura**: el proyecto no rompe si faltan variables de entorno; muestra un warning en consola.
- **Documentación (README)** actualizada para guiar la configuración y el despliegue.
- **Bandeja de entrada (Inbox)**: muestra los mensajes guardados en la base de datos cuando estás logueado.

---

## 🆕 Cambios recientes

### Mejoras en la sección "Noticias Jurídicas y Recursos"
- Se consolidaron los componentes `LegalNews.tsx` y `LegalNewsAndResources.tsx` en un único componente: `LegalNewsAndResources.tsx`.
- Se eliminó el archivo `LegalNews.tsx` para evitar redundancia.
- Se actualizó el archivo `main.tsx` para referenciar el nuevo componente consolidado.
- Se agregó un enlace funcional en la tarjeta "Nueva Ley de Protección de Datos" que redirige a una página externa.

### Otros cambios
- Se añadieron `console.log` en varios componentes para facilitar el debugging.
- Se revisaron y mantuvieron los comentarios en los archivos `.tsx` para facilitar futuras modificaciones.

---

## 🧭 Pasos (de lo más fácil a lo más complejo)

1. **Configurar Supabase (inmediato)**
   - Crear proyecto en Supabase.
   - Agregar variables `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` en `.env`.
   - Crear tabla `contacts` con el SQL provisto más abajo.

```sql
create table if not exists contacts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  user_id uuid null,
  created_at timestamp with time zone default now()
);
```

### 🧩 Si tenés error con `uuid_generate_v4()` (pgcrypto)

Supabase requiere la extensión `pgcrypto` habilitada para usar `uuid_generate_v4()`.
Ejecutá esto en el SQL editor de Supabase antes de crear la tabla:

```sql
create extension if not exists "pgcrypto";
```

2. **Probar el login + envío de contacto (ya listo)**
   - Iniciar sesión con el botón del header.
   - Enviar un mensaje desde el formulario de contacto y verificar que aparece en la tabla `contacts`.

3. **Mejorar la experiencia de usuario**
   - Agregar validaciones más completas al formulario (longitud mínima, email válido, etc.).
   - Mostrar mensajes de error más descriptivos según el caso (por ej. si Supabase no está configurado).

4. **Agregar contenido dinámico (servicios, testimonios, equipo)**
   - Traer datos desde Supabase y mostrarlos en componentes tipo “lista”.
   - Crear un panel de administración (o usar Supabase Studio).

5. **Desplegar en Vercel (o Netlify)**
   - Conectar el repo y definir variables de entorno.
   - Opcional: agregar campos de CI (format, lint, tests).

---

## 🚀 Despliegue en Vercel (paso a paso)

1. Subí tu código a un repositorio (GitHub, GitLab o Bitbucket).
2. Entrá a https://vercel.com y creá una cuenta (es gratis para proyectos pequeños).
3. Clic en **New Project** → vinculá tu repositorio.
4. En la sección **Environment Variables**, agregá:
   - `VITE_SUPABASE_URL` → tu URL de Supabase.
   - `VITE_SUPABASE_ANON_KEY` → tu anon key de Supabase.
5. Dale a **Deploy**.

> Vercel ejecuta automáticamente `npm install` y `npm run build`. Después te da la URL pública de tu sitio.

---

## 🎨 Mock de diseño para el Inbox (panel administrativo)

El inbox funciona como un mini panel administrativo: cuando estás logueado muestra los mensajes guardados en db en tarjetas tipo “dashboard”.

Archivo clave: `src/components/Inbox.tsx`.

- Tiene buscador (filtra por nombre / email / contenido).
- Usa la clase `panel` para un contenedor con fondo translucent y sombras.
- Muestra fecha de recepción y autor en cada tarjeta.

Si querés mejorar el diseño, podés:

- Añadir paginación para navegar entre mensajes.
- Agregar filtros por fecha y búsqueda de usuario/mensaje.
- Usar un modal para ver el mensaje completo sin salir de la lista.
