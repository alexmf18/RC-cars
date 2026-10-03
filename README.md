# RC Cars

Landing de una marca ficticia de coches teledirigidos, hecha como proyecto de portfolio. Diseño "Pit Lane Nocturno": solo modo oscuro, hero estático y animaciones solo con CSS.

**Stack:** Next.js 16 (App Router, todo estático) · TypeScript estricto · Tailwind CSS v4 · react-hook-form + zod · Formspree · Vercel.

## Qué incluye

- Catálogo de 3 modelos con nivel recomendado y uso, ficha modal accesible (`<dialog>` nativo: Esc, foco atrapado y devuelto) y comparador.
- "Pedir información" abre el contacto con el modelo ya elegido.
- Formulario de contacto real: validación al salir del campo y al enviar, resumen de errores con enlaces, `aria-invalid`/`aria-describedby`, estados de envío, éxito y error, y honeypot antispam.
- FAQ, testimonios y footer completo, y página de privacidad.
- SEO: metadata, imagen OG generada por código (`app/opengraph-image.tsx`), `sitemap.xml`, `robots.txt` y JSON-LD (Store, Product, FAQPage).
- Imágenes recortadas y optimizadas (`npm run images`) y servidas con `next/image` en AVIF/WebP.

## Desarrollo

Requiere Node 24.

```bash
npm install
npm run dev
```

| Script                            | Qué hace                                              |
| --------------------------------- | ----------------------------------------------------- |
| `npm run dev` / `build` / `start` | Next.js                                               |
| `npm run lint`                    | ESLint (next core-web-vitals + TypeScript + jsx-a11y) |
| `npm run typecheck`               | Genera los tipos de rutas y ejecuta `tsc`             |
| `npm run format` / `format:check` | Prettier (con orden de clases de Tailwind)            |
| `npm test`                        | Vitest + Testing Library                              |
| `npm run test:e2e`                | Playwright (escritorio y móvil) + axe sobre la build  |
| `npm run images`                  | Regenera `assets/images` desde `assets/source`        |

La CI (`.github/workflows/ci.yml`) ejecuta formato, lint, tipos, tests unitarios y E2E en cada push y PR.

## Formspree

El formulario envía a `https://formspree.io/f/xrpbnjpq` (constante en `lib/formspree.ts`). No necesita variables de entorno: el endpoint es público por diseño.

En el panel del formulario conviene:

- Restringir los dominios permitidos a tu dominio de Vercel (y `localhost` si quieres probar en local).
- Desactivar el reCAPTCHA de Formspree: los envíos AJAX con reCAPTCHA activo se rechazan. El antispam queda a cargo del honeypot `_gotcha` y del filtro automático.

Los tests E2E interceptan la llamada, así que la CI nunca envía emails reales.

## Estructura

```
app/          páginas, layout, OG, sitemap, robots
components/   secciones y componentes de la landing
lib/          datos de modelos, esquema del formulario, envío a Formspree
assets/       imágenes originales (source) y optimizadas (images)
e2e/          tests de Playwright + axe
```
