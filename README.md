# ⚡ QuickSync — Catálogo Digital con Carrito para WhatsApp

> **MVP para restaurantes y comercios locales.** Catálogo de productos estático, carrito de compras, y envío de pedidos vía WhatsApp — sin servidores, sin bases de datos, sin frameworks pesados.

---

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripcion-del-proyecto)
2. [Stack Tecnológico](#stack-tecnologico)
3. [Arquitectura MVC](#arquitectura-mvc)
4. [Características](#caracteristicas)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Configuración](#configuracion)
7. [Despliegue en Netlify](#despliegue-en-netlify)
8. [Despliegue en Vercel](#despliegue-en-vercel)
9. [Seguridad](#seguridad)
10. [Personalización](#personalizacion)
11. [Roadmap](#roadmap)

---

## Descripción del Proyecto

**QuickSync** es una Single Page Application (SPA) estática diseñada como MVP para que restaurantes y comercios locales tengan una presencia digital funcional en minutos.

El flujo es simple:
1. El cliente visita el catálogo
2. Añade productos al carrito
3. Completa un formulario mínimo (nombre + dirección + notas)
4. Hace clic en **"Enviar por WhatsApp"**
5. Se abre WhatsApp con un mensaje estructurado y listo para enviar al negocio

**No requiere:** servidor backend, base de datos, cuenta de pago ni API keys.

**Carga en < 1 segundo** gracias a: zero dependencias externas, imágenes con `loading="lazy"`, y CSS/JS totalmente vanilla.

---

## Stack Tecnológico

| Capa | Tecnología | Razón |
|------|-----------|-------|
| Estructura | **HTML5 semántico** | Accesibilidad, SEO, sin overhead |
| Estilos | **CSS3 puro** (Grid + Flexbox) | Mobile-first, zero-KB de JS |
| Lógica | **Vanilla JavaScript ES6+** | Sin dependencias, máximo rendimiento |
| Patrón | **MVC** | Código limpio, escalable, fácil de mantener |
| Mensajería | **WhatsApp `wa.me` API** | Universal, sin registro ni API keys |

---

## Arquitectura MVC

La aplicación implementa el patrón **Modelo-Vista-Controlador** usando módulos IIFE (Immediately Invoked Function Expressions) para encapsulación y evitar polución del scope global.

```
┌─────────────────────────────────────────────────────────────┐
│                      app.js — MVC                           │
│                                                             │
│  ┌─────────────┐    llama    ┌──────────────────────────┐  │
│  │             │ ──────────► │      AppController       │  │
│  │    USER     │             │  - init()                │  │
│  │  (Browser)  │ ◄────────── │  - _onAddToCart()        │  │
│  │             │   eventos   │  - _onCheckoutSubmit()   │  │
│  └─────────────┘             │  - _buildWhatsAppURL()   │  │
│                              └──────────┬───────────────┘  │
│                                         │                   │
│                          lee/escribe    │    ordena render  │
│                                         │                   │
│  ┌──────────────────┐            ┌──────┴────────────────┐ │
│  │   CartModel      │            │      AppView          │ │
│  │                  │            │                       │ │
│  │ - items: Map<>   │            │ - renderCatalog()     │ │
│  │ - addItem()      │            │ - renderCart()        │ │
│  │ - decrementItem()│            │ - updateCartCount()   │ │
│  │ - getSubtotal()  │            │ - openCart()          │ │
│  │ - getItems()     │            │ - closeCart()         │ │
│  │                  │            │ - showToast()         │ │
│  │  Precios siempre │            │                       │ │
│  │  del Model       │            │  Usa createElement    │ │
│  │  (no del DOM)    │            │  y textContent        │ │
│  └──────────────────┘            │  (nunca innerHTML)    │ │
│                                  └───────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Model (`CartModel`)

- Mantiene el estado del carrito en un `Map<id, {product, quantity}>`
- Calcula totales (precio siempre leído del array `PRODUCTS`, nunca del DOM)
- Valida que las cantidades sean enteros positivos

### View (`AppView`)

- Renderiza el catálogo y el carrito usando `createElement` + `textContent`
- Gestiona apertura/cierre del drawer off-canvas
- Muestra errores de validación y toasts de notificación
- Expone callbacks para el Controller

### Controller (`AppController`)

- Inicializa la app y conecta Model con View
- Reacciona a eventos (añadir, decrementar, checkout)
- Construye el URL de WhatsApp con `encodeURIComponent()`

---

## Características

- Catálogo en **grid responsive** (1 → 2 → 3 → 4 columnas)
- Carrito **off-canvas** con animaciones CSS
- Controles **+/−** para cantidad por producto
- **Subtotal y total** en tiempo real (precio siempre del Model)
- **Formulario de checkout** con validación (nombre, dirección, notas)
- **Toast notifications** para feedback visual
- **Enlace de WhatsApp** con mensaje estructurado y formateado
- Diseño **dark mode** premium con glassmorphism
- **Mobile-first** totalmente responsivo
- **Accesible**: ARIA roles, aria-live, focus management, Escape key
- **SEO básico**: meta description, OG tags, H1 único, HTML semántico
- **Sin dependencias externas**: 0 npm packages en runtime

---

## Estructura del Proyecto

```
QuickSync/
├── index.html          # Estructura base (HTML5 semántico)
├── styles.css          # Diseño completo (CSS Variables + Grid/Flexbox)
├── app.js              # Lógica MVC en Vanilla JS
├── assets/
│   └── images/
│       ├── burger-classic.jpg
│       ├── burger-double.jpg
│       ├── burger-veggie.jpg
│       └── burger-bbq.jpg
└── README.md
```

---

## Configuración

### Cambiar el número de WhatsApp

En `app.js`, cerca de la línea 30:

```javascript
// Código de país + número (sin +, sin espacios, sin guiones)
const WHATSAPP_NUMBER = '521234567890'; // <- Cambia esto
```

Ejemplos: México `521XXXXXXXXXX` · Colombia `571XXXXXXXXXX` · España `34XXXXXXXXX`

### Actualizar el catálogo de productos

En `app.js`, edita el array `PRODUCTS`:

```javascript
const PRODUCTS = [
  {
    id: 1,                              // ID único (número entero positivo)
    name: 'Nombre del Producto',
    description: 'Descripción corta.',
    price: 12.99,                       // Precio en decimales
    image: 'assets/images/mi-foto.jpg',
    badge: 'popular',                   // 'popular' | 'new' | 'vegan' | null
    badgeText: 'Popular',
  },
];
```

---

## Despliegue en Netlify

### Opción A — Drag & Drop (más rápido)

1. Ve a [app.netlify.com](https://app.netlify.com)
2. Haz clic en **"Add new site" → "Deploy manually"**
3. Arrastra la carpeta `QuickSync/` al área de drop
4. ¡Listo! Netlify te da una URL pública en segundos.

### Opción B — Conectar con GitHub (recomendado)

1. Sube el proyecto a un repositorio de GitHub
2. Ve a [app.netlify.com](https://app.netlify.com) → **"Import an existing project"**
3. Selecciona GitHub y tu repositorio
4. Configura:
   - **Branch:** `main`
   - **Build command:** *(dejar vacío)*
   - **Publish directory:** `.` (raíz)
5. Clic en **"Deploy site"**

> Cada `git push` desplegará automáticamente la nueva versión.

### Dominio personalizado

Site settings → **Domain management → Add custom domain**
Netlify configura HTTPS automáticamente (Let's Encrypt).

---

## Despliegue en Vercel

### Opción A — CLI

```bash
# Instalar Vercel CLI (solo la primera vez)
npm install -g vercel

# Dentro del directorio del proyecto
cd QuickSync
vercel

# Seguir el asistente interactivo
```

### Opción B — Dashboard

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Importa desde GitHub
3. En Build & Output Settings:
   - **Framework Preset:** Other
   - **Build Command:** *(vacío)*
   - **Output Directory:** `.`
4. Clic en **"Deploy"**

> Vercel detecta automáticamente que es un sitio estático y lo sirve con CDN global.

---

## Seguridad

### Prevención de XSS

Todo el renderizado dinámico usa `textContent` y `createElement`, nunca `innerHTML` con datos del usuario:

```javascript
// CORRECTO — safe
const nameEl = document.createElement('p');
nameEl.textContent = product.name; // Escapa automáticamente HTML

// INCORRECTO — NO se usa en este proyecto
el.innerHTML = `<p>${product.name}</p>`;
```

### Precios siempre del Model

Los precios NUNCA se leen del DOM. El `CartModel` siempre consulta el array `PRODUCTS`:

```javascript
// CartModel.getSubtotal()
items.forEach(({ product, quantity }) => {
  total += product.price * quantity; // price del array PRODUCTS, no del HTML
});
```

### URL Encoding

```javascript
const encodedMessage = encodeURIComponent(message);
return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
```

Garantiza saltos de línea correctos (`%0A`) y previene inyecciones en la URI.

### Validación de entradas

- Cantidades: `Number.isInteger && > 0`
- IDs del DOM: `parseInt` + verificación de entero positivo
- Formulario: nombre mín. 2 chars, dirección mín. 5 chars

---

## Personalización

### Cambiar colores (Design Tokens)

En `styles.css`, modifica las Custom Properties en `:root`:

```css
:root {
  --color-accent:    #ff6b35; /* Color principal */
  --color-bg:        #0f0e0d; /* Fondo oscuro */
  --color-whatsapp:  #25d366; /* Verde WhatsApp */
}
```

### Cambiar nombre del negocio

Busca y reemplaza `QuickSync` en `index.html` y `app.js`.

---

## Roadmap

- [ ] Soporte multi-categoría con filtros
- [ ] Persistencia del carrito en `localStorage`
- [ ] Modo claro / oscuro con `prefers-color-scheme`
- [ ] PWA: Service Worker + Web App Manifest
- [ ] Integración con WhatsApp Business API
- [ ] Panel de administración sin código

---

## Licencia

MIT © 2024 QuickSync MVP — Libre para uso comercial y personal.

---

> Hecho con amor para comercios locales · Potenciado por WhatsApp Business
