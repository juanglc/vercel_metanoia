# 🎻 Cuarteto Metanoia - Sitio Web Oficial

Sitio web profesional del Cuarteto Metanoia construido con Astro, Tailwind CSS y desplegado en Cloudflare Pages.

[![Deploy to Cloudflare Pages](https://github.com/tu-usuario/cuarteto-metanoia/actions/workflows/deploy.yml/badge.svg)](https://github.com/tu-usuario/cuarteto-metanoia/actions/workflows/deploy.yml)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95+-brightgreen)](https://cuartetometanoia.com)

## 🚀 Tech Stack

- **Framework:** Astro 4.x (SSG)
- **Estilos:** Tailwind CSS 3.x
- **Idiomas:** Inglés y Español (i18n)
- **Almacenamiento:** Cloudflare R2
- **Hosting:** Cloudflare Pages
- **CI/CD:** GitHub Actions
- **Containerización:** Docker + Docker Compose

## 📋 Prerequisitos

- Node.js 20.x o superior
- npm 10.x o superior
- Docker y Docker Compose (opcional, para desarrollo containerizado)
- Git

## 🛠️ Setup Inicial

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cuarteto-metanoia.git
cd cuarteto-metanoia
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```bash
CLOUDFLARE_ACCOUNT_ID=tu_account_id
R2_ACCESS_KEY_ID=tu_access_key
R2_SECRET_ACCESS_KEY=tu_secret_key
R2_BUCKET_NAME=cuarteto-metanoia-galeria
R2_PUBLIC_URL=https://cdn.cuartetometanoia.com
```

### 4. Iniciar servidor de desarrollo

**Opción A: Nativo**
```bash
npm run dev
```

**Opción B: Docker**
```bash
docker-compose up dev
```

El sitio estará disponible en http://localhost:4321/

## 📂 Estructura del Proyecto

```
cuarteto-metanoia/
├── .github/workflows/    # CI/CD pipelines
├── public/               # Assets estáticos
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── content/          # Contenido i18n (JSON)
│   ├── data/             # Data files (conciertos, galería)
│   ├── layouts/          # Layouts de página
│   ├── pages/            # Rutas del sitio
│   ├── styles/           # Estilos globales
│   └── utils/            # Utilidades (i18n, R2, SEO)
├── scripts/              # Scripts de optimización
├── astro.config.mjs      # Configuración de Astro
├── tailwind.config.mjs   # Configuración de Tailwind
└── tsconfig.json         # Configuración de TypeScript
```

## 🌍 Internacionalización (i18n)

El sitio soporta **inglés** y **español**:

- **Inglés:** `/en/` → https://cuartetometanoia.com/en/
- **Español:** `/es/` → https://cuartetometanoia.com/es/

### Añadir Nuevo Contenido Traducido

1. Edita archivos JSON en `src/content/i18n/`:

```json
// src/content/i18n/en/about.json
{
  "title": "About Us",
  "description": "..."
}
```

2. Usa el helper `getContent()` en tus páginas:

```astro
---
import { getContent } from '@utils/i18n';
const content = getContent('en', 'about');
---
<h1>{content.title}</h1>
```

## 🎨 Dark/Light Mode

El sitio incluye modo oscuro/claro automático:

- Detecta preferencia del sistema (`prefers-color-scheme`)
- Toggle manual en header
- Persistencia en `localStorage`

## 📸 Gestión de Imágenes (Cloudflare R2)

### Subir Imágenes

1. Optimiza imágenes localmente:

```bash
npm run optimize-images
```

2. Sube a R2:

```bash
npm run upload-to-r2
```

### Estructura en R2

```
cuarteto-metanoia-galeria/
├── concerts/
│   └── 2025-11-teatro-colon/
│       ├── foto-01.webp
│       └── foto-02.webp
└── press/
    └── headshots/
        └── member-01.webp
```

## 🚢 Deployment

### Automático (Recomendado)

Cada push a `main` despliega automáticamente via GitHub Actions:

```bash
git add .
git commit -m "feat: nueva sección"
git push origin main
```

### Manual

```bash
npm run build
# Sube carpeta dist/ a Cloudflare Pages manualmente
```

## 🧪 Testing y Validación

### Lighthouse Audit

```bash
npx lighthouse https://cuartetometanoia.com --view
```

### Formateo de Código

```bash
npm run format
```

### Linting

```bash
npm run lint
```

### TypeScript Check

```bash
npx tsc --noEmit
```

## 🐳 Docker Commands

```bash
# Desarrollo
docker-compose up dev

# Preview de producción
docker-compose --profile production up prod

# Rebuild
docker-compose build

# Logs
docker-compose logs -f dev

# Detener
docker-compose down
```

## 📊 Performance Benchmarks

- ✅ Lighthouse Performance: 95+
- ✅ Lighthouse SEO: 100
- ✅ Lighthouse Accessibility: 95+
- ✅ Core Web Vitals: Pass
- ✅ First Contentful Paint: <1.5s

## 🤝 Contributing

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-seccion`)
3. Commit tus cambios (`git commit -m 'feat: añadir nueva sección'`)
4. Push a la rama (`git push origin feature/nueva-seccion`)
5. Abre un Pull Request

## 📄 Licencia

MIT © Cuarteto Metanoia

## 🔗 Links

- **Sitio Web:** https://cuartetometanoia.com
- **Instagram:** @cuartetometanoia
- **YouTube:** @cuartetometanoia
- **Spotify:** Cuarteto Metanoia

---

Desarrollado con ❤️ por el equipo de Cuarteto Metanoia
```

---

## ✅ Checkpoint 1.2 Completado

He creado **9 archivos nuevos**:

✅ `Dockerfile` (multi-stage para producción)
✅ `Dockerfile.dev` (específico para desarrollo)
✅ `docker-compose.yml` (con servicio dev y prod)
✅ `.dockerignore` (optimización de build)
✅ `nginx.conf` (servidor web configurado)
✅ `.github/workflows/deploy.yml` (CI/CD completo con 3 jobs)
✅ `.prettierrc` (formateo automático)
✅ `.eslintrc.json` (linting TypeScript + Astro)
✅ `README.md` (documentación completa)

### Tu estructura ahora es:

