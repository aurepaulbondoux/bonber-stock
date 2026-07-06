# BonBër Stock v5 — Deploy en GitHub Pages

## Archivos del repositorio

```
/
├── index.html       ← la app completa
├── manifest.json    ← metadatos PWA
├── sw.js            ← service worker (offline)
├── icon-192.png     ← ícono para home screen
├── icon-512.png     ← ícono grande
└── README.md
```

## Pasos para publicar

### 1. Crear el repositorio en GitHub

- Entrá a [github.com](https://github.com) y creá un repo nuevo
- Nombre sugerido: `bonber-stock`
- Visibilidad: **Public** (GitHub Pages es gratis en repos públicos)

### 2. Subir los archivos

**Opción A — Interface web (sin instalar nada):**
1. Abrí el repo recién creado
2. Arrastrá todos los archivos a la pantalla (drag & drop)
3. Commit → "Initial deploy"

**Opción B — Git:**
```bash
git clone https://github.com/TU_USUARIO/bonber-stock.git
# Copiá los 5 archivos al directorio
git add .
git commit -m "BonBër Stock v5"
git push
```

### 3. Activar GitHub Pages

1. En el repo: **Settings** → **Pages**
2. Branch: `main` → Folder: `/ (root)`
3. Save
4. Esperar ~2 minutos

La app va a estar en:
`https://TU_USUARIO.github.io/bonber-stock/`

---

## Instalar como app en el celular

### Android (Chrome)
1. Abrí la URL en Chrome
2. Tocá el menú ⋮ → "Agregar a pantalla de inicio"
3. O esperá el banner automático "Instalar app"

### iOS (Safari)
1. Abrí la URL en Safari
2. Tocá el botón compartir □↑
3. "Agregar a pantalla de inicio"

### Escritorio (Chrome/Edge)
1. Abrí la URL
2. Aparece un ícono ⊕ en la barra de direcciones
3. Click → "Instalar"

---

## Actualizar la app

Para actualizar: subí el nuevo `index.html` al repo.
Los usuarios van a ver un toast "Nueva versión disponible — recargá" la próxima vez que abran la app con internet.

---

## Datos y storage

Los datos se guardan en **localStorage del navegador** — no viajan a ningún servidor externo.
- Cada dispositivo tiene su propio storage
- Para sincronizar entre dispositivos: usar el botón **Exportar JSON** (Admin → Datos) e importarlo en el otro dispositivo
- Para backup: exportar periódicamente desde Dashboard

---

## Dominio personalizado (opcional)

Si querés usar `stock.bonber.com.uy` o similar:
1. En tu proveedor de DNS, agregá un CNAME: `stock` → `TU_USUARIO.github.io`
2. En GitHub Pages → Settings → Custom domain: `stock.bonber.com.uy`
3. Activar "Enforce HTTPS"
