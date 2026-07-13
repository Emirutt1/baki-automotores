# BAKI AUTOMOTORES — Landing Page

Landing page premium, responsive y **Mobile First** para una concesionaria
ficticia de autos y motos usados en **La Plata, Buenos Aires, Argentina**.

> ⚠️ Sitio de demostración. La empresa, los vehículos, precios, patentes y datos
> de contacto son **ficticios**. Las imágenes son ilustrativas (Unsplash), libres
> de uso, y **no** pertenecen a ninguna concesionaria real.

---

## 🚀 Cómo verlo

No requiere instalación ni compilación. Simplemente:

- **Doble clic en `index.html`** para abrirlo en tu navegador, o
- Servirlo con cualquier servidor estático (Live Server de VS Code, etc.).

Necesita conexión a internet para cargar las librerías por CDN (Bootstrap, GSAP,
AOS, Font Awesome, Google Fonts) y las imágenes ilustrativas.

---

## 📁 Estructura

```
BAKI AUTOMOTORES/
├── index.html          # Estructura + secciones + meta tags / SEO / Open Graph
├── css/
│   └── styles.css      # Estilos propios (diseño premium, responsive, animaciones)
├── js/
│   ├── vehicles.js     # Base de datos de los 20 vehículos (15 autos + 5 motos)
│   └── main.js         # Catálogo dinámico, filtros, modal, navbar y animaciones
├── assets/
│   └── favicon.svg     # Favicon (monograma B)
└── README.md
```

---

## ✨ Características

- **Hero** a pantalla completa con fondo animado, estelas de luz y animación
  de entrada (GSAP) *fade in desde la izquierda* + indicador de scroll.
- **Navbar** fija que cambia de color al hacer scroll, con **menú hamburguesa**
  en mobile e íconos de Instagram, Facebook y WhatsApp (Font Awesome).
- **Catálogo** de 20 vehículos en tarjetas modernas con efecto *hover* y elevación.
- **Buscador con filtros instantáneos** (sin recargar): marca, tipo (auto/moto),
  combustible, caja, año, kilometraje y rango de precio + botón *Limpiar filtros*.
- **Ficha individual** en modal: galería de imágenes, ficha técnica completa,
  equipamiento, seguridad, confort y botón *Consultar por WhatsApp*.
- **Nosotros** con ventajas (Revisados, Garantía, Transferencia, Financiación,
  Atención personalizada) y estadísticas.
- **Contacto** con datos, horarios, **mapa de Google Maps** embebido (La Plata)
  y CTA grande de WhatsApp. Botón flotante de WhatsApp siempre visible.
- **Footer** con logo, redes y aviso legal.

## ⚙️ Tecnologías

HTML5 · CSS3 · JavaScript (ES) · Bootstrap 5 · AOS · GSAP · Font Awesome ·
Google Fonts (Poppins).

## 📱 Responsive

Diseño **Mobile First**. Breakpoints: base (mobile) · ≥768px (tablet) ·
≥992px (desktop). Sin scroll horizontal. Animaciones respetan
`prefers-reduced-motion`.

## 🎨 Personalización

- **Vehículos:** editá `js/vehicles.js` (agregá/quitá objetos del array `VEHICULOS`).
- **Colores / tipografía:** variables al inicio de `css/styles.css` (`:root`).
- **WhatsApp / contacto:** actualizá el número en `index.html` y la constante
  `NUM_WSP` de `js/main.js`.
- **Video del hero (opcional):** colocá tu archivo en `assets/hero.mp4` y
  descomentá el bloque `<video>` dentro de la sección `.hero` en `index.html`.

---

© 2026 BAKI AUTOMOTORES — Proyecto de demostración.
