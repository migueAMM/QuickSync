/**
 * ============================================================
 * QuickSync — app.js
 * Arquitectura: MVC (Model–View–Controller) en Vanilla JS ES6+
 * Seguridad: Sin innerHTML con datos dinámicos, textContent,
 *            createElement, encodeURIComponent para URLs.
 * ============================================================
 */

'use strict';

/* ============================================================
   ██████  ██████   ██████  ██████  ██    ██  ██████ ████████ ███████
   ██   ██ ██   ██ ██    ██ ██   ██ ██    ██ ██         ██    ██
   ██████  ██████  ██    ██ ██   ██ ██    ██ ██         ██    ███████
   ██      ██   ██ ██    ██ ██   ██ ██    ██ ██         ██         ██
   ██      ██   ██  ██████  ██████   ██████   ██████    ██    ███████

   DATOS DEL CATÁLOGO (mock data — en producción vendría de una API)
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Bacon Burger',
    description: 'Jugosa carne de res 180g, bacon crujiente, cheddar fundido, lechuga, tomate y nuestra salsa secreta.',
    price: 18900,
    image: 'assets/images/burger-classic.jpg',
    badge: 'popular',
    badgeText: '🔥 Popular',
  },
  {
    id: 2,
    name: 'Double Smash Burger',
    description: 'Dos patties finos prensados, doble cheddar americano, pepinillos, cebolla caramelizada y salsa especial.',
    price: 24900,
    image: 'assets/images/burger-double.jpg',
    badge: 'new',
    badgeText: '✨ Nuevo',
  },
  {
    id: 3,
    name: 'Veggie Avocado Burger',
    description: 'Medallón de hongos portobello y frijol negro, aguacate fresco, pimientos asados y rúgula en pan integral.',
    price: 16900,
    image: 'assets/images/burger-veggie.jpg',
    badge: 'vegan',
    badgeText: '🌿 Vegano',
  },
  {
    id: 4,
    name: 'BBQ Pulled Pork Burger',
    description: 'Costilla de cerdo desmechada, coleslaw casero, aros de cebolla crujientes y salsa BBQ ahumada.',
    price: 21900,
    image: 'assets/images/burger-bbq.jpg',
    badge: null,
    badgeText: null,
  },
  {
    id: 5,
    name: 'Crispy Chicken Burger',
    description: 'Pechuga de pollo apanada crujiente, coleslaw casero, pepinillos y salsa mostaza-miel en pan brioche.',
    price: 17900,
    image: 'assets/images/burger-chicken.jpg',
    badge: 'popular',
    badgeText: '🔥 Popular',
  },
  {
    id: 6,
    name: 'Mushroom Swiss Burger',
    description: 'Champiñones salteados al vino, queso gruyère derretido, cebolla morada caramelizada y rúgula fresca.',
    price: 19900,
    image: 'assets/images/burger-mushroom.jpg',
    badge: null,
    badgeText: null,
  },
  {
    id: 7,
    name: 'Spicy Diablo Burger',
    description: 'Jalapeños frescos, salsa sriracha, queso pepper jack, aros de cebolla y patty 200g a la parrilla. ¡Para valientes!',
    price: 20900,
    image: 'assets/images/burger-spicy.jpg',
    badge: 'new',
    badgeText: '🌶️ Picante',
  },
  {
    id: 8,
    name: 'Breakfast Burger',
    description: 'Huevo frito, bacon crujiente, queso americano y medallón de papa hash brown. El desayuno perfecto en un pan.',
    price: 19900,
    image: 'assets/images/burger-breakfast.jpg',
    badge: null,
    badgeText: null,
  },
  {
    id: 9,
    name: 'Hawaiian Teriyaki Burger',
    description: 'Piña asada a la parrilla, patty glaseado con teriyaki, jamón ahumado, queso suizo y salsa especial tropical.',
    price: 21900,
    image: 'assets/images/burger-hawaiian.jpg',
    badge: null,
    badgeText: null,
  },
  {
    id: 10,
    name: 'Black Truffle Burger',
    description: 'Pan negro al carbón, carne wagyu, crema de trufa negra, queso brie fundido, cebolla caramelizada y microgreens.',
    price: 35900,
    image: 'assets/images/burger-truffle.jpg',
    badge: 'popular',
    badgeText: '⭐ Premium',
  },
];

/**
 * Número de WhatsApp del negocio (Colombia — con código de país, sin + ni espacios).
 */
const WHATSAPP_NUMBER = '573192784589';

/* ============================================================
   ███    ███  ██████  ██████  ███████ ██
   ████  ████ ██    ██ ██   ██ ██      ██
   ██ ████ ██ ██    ██ ██   ██ █████   ██
   ██  ██  ██ ██    ██ ██   ██ ██      ██
   ██      ██  ██████  ██████  ███████ ███████

   MODEL — gestiona el estado del carrito y los productos.
   - Nunca toca el DOM.
   - Precios siempre leídos del array PRODUCTS (no del HTML).
   ============================================================ */

const CartModel = (() => {
  /** @type {Map<number, {product: Object, quantity: number}>} */
  let items = new Map();

  /**
   * Busca un producto por ID en la fuente de datos autoritativa.
   * @param {number} productId
   * @returns {Object|undefined}
   */
  function _findProduct(productId) {
    return PRODUCTS.find((p) => p.id === productId);
  }

  /**
   * Añade un ítem al carrito. Si ya existe, incrementa la cantidad.
   * @param {number} productId
   * @returns {boolean} true si se añadió con éxito.
   */
  function addItem(productId) {
    const product = _findProduct(productId);
    if (!product) {
      console.warn(`[CartModel] Producto con id "${productId}" no encontrado.`);
      return false;
    }
    if (items.has(productId)) {
      const current = items.get(productId);
      items.set(productId, { product, quantity: current.quantity + 1 });
    } else {
      items.set(productId, { product, quantity: 1 });
    }
    return true;
  }

  /**
   * Decrementa la cantidad. Si llega a 0, elimina el ítem.
   * @param {number} productId
   */
  function decrementItem(productId) {
    if (!items.has(productId)) return;
    const current = items.get(productId);
    if (current.quantity <= 1) {
      items.delete(productId);
    } else {
      items.set(productId, { ...current, quantity: current.quantity - 1 });
    }
  }

  /**
   * Elimina un ítem completamente del carrito.
   * @param {number} productId
   */
  function removeItem(productId) {
    items.delete(productId);
  }

  /**
   * Calcula el total de ítems (suma de cantidades).
   * @returns {number}
   */
  function getTotalCount() {
    let count = 0;
    items.forEach(({ quantity }) => { count += quantity; });
    return count;
  }

  /**
   * Calcula el subtotal (precio siempre desde el model, nunca del DOM).
   * @returns {number}
   */
  function getSubtotal() {
    let total = 0;
    items.forEach(({ product, quantity }) => {
      // Validación defensiva: la cantidad DEBE ser entero positivo
      const validQty = Number.isInteger(quantity) && quantity > 0 ? quantity : 0;
      total += product.price * validQty;
    });
    return total;
  }

  /**
   * Retorna los ítems del carrito como array para el View.
   * @returns {Array<{product: Object, quantity: number}>}
   */
  function getItems() {
    return Array.from(items.values());
  }

  /** ¿El carrito está vacío? */
  function isEmpty() {
    return items.size === 0;
  }

  /** Limpia el carrito */
  function clear() {
    items.clear();
  }

  return { addItem, decrementItem, removeItem, getTotalCount, getSubtotal, getItems, isEmpty, clear };
})();

/* ============================================================
   ██    ██ ██ ███████ ██     ██
   ██    ██ ██ ██      ██     ██
   ██    ██ ██ █████   ██  █  ██
    ██  ██  ██ ██      ██ ███ ██
     ████   ██ ███████  ███ ███

   VIEW — renderiza el DOM y expone callbacks para el Controller.
   - Usa textContent / createElement (NUNCA innerHTML para datos).
   ============================================================ */

const AppView = (() => {
  /* ─── Elementos del DOM (cacheados en init) ─── */
  const el = {};

  /** Inicializa referencias a los nodos del DOM */
  function init() {
    el.productGrid    = document.getElementById('product-grid');
    el.cartOverlay    = document.getElementById('cart-overlay');
    el.cartDrawer     = document.getElementById('cart-drawer');
    el.btnCartOpen    = document.getElementById('btn-cart-open');
    el.btnCartClose   = document.getElementById('btn-cart-close');
    el.cartCount      = document.getElementById('cart-count');
    el.cartItems      = document.getElementById('cart-items');
    el.cartEmpty      = document.getElementById('cart-empty');
    el.cartSummary    = document.getElementById('cart-summary');
    el.cartSubtotal   = document.getElementById('cart-subtotal');
    el.cartTotal      = document.getElementById('cart-total');
    el.checkoutForm   = document.getElementById('checkout-form');
    el.inputName      = document.getElementById('input-name');
    el.inputAddress   = document.getElementById('input-address');
    el.inputNotes     = document.getElementById('input-notes');
    el.errorName      = document.getElementById('error-name');
    el.errorAddress   = document.getElementById('error-address');
  }

  /* ─────────────────────────────────────────────
     RENDERIZADO DEL CATÁLOGO
  ───────────────────────────────────────────── */

  /**
   * Renderiza todas las tarjetas de producto en el grid.
   * Usa createElement — NUNCA innerHTML para datos del array.
   * @param {Object[]} products
   * @param {Function} onAddToCart - callback(productId)
   */
  function renderCatalog(products, onAddToCart) {
    el.productGrid.textContent = ''; // Limpiar

    products.forEach((product) => {
      const article = _createProductCard(product, onAddToCart);
      el.productGrid.appendChild(article);
    });
  }

  /**
   * Crea el nodo DOM de una tarjeta de producto.
   * @private
   */
  function _createProductCard(product, onAddToCart) {
    // Contenedor principal
    const article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('role', 'listitem');
    article.dataset.productId = product.id;

    // Badge (si existe)
    if (product.badge) {
      const badge = document.createElement('span');
      badge.className = `product-badge product-badge--${product.badge}`;
      badge.textContent = product.badgeText; // textContent — safe
      article.appendChild(badge);
    }

    // Imagen wrapper
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'product-img-wrapper';

    const img = document.createElement('img');
    img.className = 'product-img';
    img.src = product.image;
    img.alt = product.name; // alt text from model — safe
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 400;
    img.height = 300;
    // Fallback si la imagen no carga
    img.onerror = () => {
      img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23242220'/%3E%3Ctext x='50%25' y='50%25' fill='%23a89b8c' text-anchor='middle' dominant-baseline='middle' font-size='48'%3E🍔%3C/text%3E%3C/svg%3E";
    };

    imgWrapper.appendChild(img);
    article.appendChild(imgWrapper);

    // Info section
    const info = document.createElement('div');
    info.className = 'product-info';

    const name = document.createElement('h3');
    name.className = 'product-name';
    name.textContent = product.name; // safe

    const desc = document.createElement('p');
    desc.className = 'product-description';
    desc.textContent = product.description; // safe

    const footer = document.createElement('div');
    footer.className = 'product-footer';

    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = _formatPrice(product.price); // safe

    const addBtn = document.createElement('button');
    addBtn.className = 'btn-add-to-cart';
    addBtn.type = 'button';
    addBtn.setAttribute('aria-label', `Añadir ${product.name} al carrito`);
    addBtn.dataset.productId = product.id;

    // Icono + texto del botón
    const plusSpan = document.createElement('span');
    plusSpan.textContent = '+';
    plusSpan.setAttribute('aria-hidden', 'true');
    const btnText = document.createElement('span');
    btnText.textContent = 'Añadir';

    addBtn.appendChild(plusSpan);
    addBtn.appendChild(btnText);

    // Evento — datos tomados desde dataset (id), precio del model
    addBtn.addEventListener('click', () => {
      const idFromDom = parseInt(addBtn.dataset.productId, 10);
      // Validación: asegurar que el ID es un número positivo válido
      if (!Number.isInteger(idFromDom) || idFromDom <= 0) {
        console.error('[AppView] Product ID inválido en el DOM:', addBtn.dataset.productId);
        return;
      }
      onAddToCart(idFromDom);
      // Feedback visual temporal
      addBtn.classList.add('added');
      btnText.textContent = '¡Añadido!';
      setTimeout(() => {
        addBtn.classList.remove('added');
        btnText.textContent = 'Añadir';
      }, 1000);
    });

    footer.appendChild(price);
    footer.appendChild(addBtn);
    info.appendChild(name);
    info.appendChild(desc);
    info.appendChild(footer);
    article.appendChild(info);

    return article;
  }

  /* ─────────────────────────────────────────────
     RENDERIZADO DEL CARRITO
  ───────────────────────────────────────────── */

  /**
   * Actualiza todo el panel del carrito.
   * @param {Array}  items      - array de {product, quantity}
   * @param {number} subtotal
   * @param {Function} onIncrement - callback(productId)
   * @param {Function} onDecrement - callback(productId)
   */
  function renderCart(items, subtotal, onIncrement, onDecrement) {
    el.cartItems.textContent = ''; // Limpiar

    const isEmpty = items.length === 0;

    // Estado vacío / lleno
    el.cartEmpty.setAttribute('aria-hidden', !isEmpty);
    el.cartEmpty.style.display  = isEmpty ? 'flex' : 'none';
    el.cartItems.style.display  = isEmpty ? 'none' : 'flex';
    el.cartSummary.setAttribute('aria-hidden', isEmpty);
    el.cartSummary.style.display  = isEmpty ? 'none' : 'flex';
    el.checkoutForm.setAttribute('aria-hidden', isEmpty);
    el.checkoutForm.style.display = isEmpty ? 'none' : 'flex';

    if (isEmpty) return;

    items.forEach(({ product, quantity }) => {
      const itemEl = _createCartItem(product, quantity, onIncrement, onDecrement);
      el.cartItems.appendChild(itemEl);
    });

    // Totals — precio siempre del model
    el.cartSubtotal.textContent = _formatPrice(subtotal);
    el.cartTotal.textContent    = _formatPrice(subtotal); // aquí se puede añadir envío
  }

  /**
   * Crea el nodo DOM de un ítem del carrito.
   * @private
   */
  function _createCartItem(product, quantity, onIncrement, onDecrement) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.setAttribute('role', 'listitem');
    item.dataset.productId = product.id;

    // Imagen miniatura
    const img = document.createElement('img');
    img.className = 'cart-item-img';
    img.src = product.image;
    img.alt = product.name; // safe
    img.loading = 'lazy';
    img.width = 56;
    img.height = 56;
    img.onerror = () => { img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23242220'/%3E%3Ctext x='50%25' y='50%25' fill='%23a89b8c' text-anchor='middle' dominant-baseline='middle' font-size='28'%3E🍔%3C/text%3E%3C/svg%3E"; };

    // Info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'cart-item-info';

    const nameEl = document.createElement('p');
    nameEl.className = 'cart-item-name';
    nameEl.textContent = product.name; // safe

    const priceEl = document.createElement('p');
    priceEl.className = 'cart-item-price';
    // Precio unitario * cantidad (del model)
    priceEl.textContent = `${_formatPrice(product.price)} × ${quantity}`;

    infoDiv.appendChild(nameEl);
    infoDiv.appendChild(priceEl);

    // Controles de cantidad
    const qtyDiv = document.createElement('div');
    qtyDiv.className = 'qty-controls';

    const btnMinus = document.createElement('button');
    btnMinus.type = 'button';
    // Si la cantidad es 1, el botón menos elimina el producto (feedback con ícono diferente)
    btnMinus.className = quantity === 1 ? 'btn-qty btn-qty--delete' : 'btn-qty';
    btnMinus.textContent = quantity === 1 ? '✕' : '−';
    btnMinus.setAttribute(
      'aria-label',
      quantity === 1 ? `Eliminar ${product.name} del carrito` : `Reducir cantidad de ${product.name}`
    );
    btnMinus.addEventListener('click', () => {
      const id = parseInt(item.dataset.productId, 10);
      if (!Number.isInteger(id) || id <= 0) return;
      onDecrement(id);
    });

    const qtySpan = document.createElement('span');
    qtySpan.className = 'qty-value';
    qtySpan.textContent = quantity; // safe (number)

    const btnPlus = document.createElement('button');
    btnPlus.type = 'button';
    btnPlus.className = 'btn-qty';
    btnPlus.textContent = '+';
    btnPlus.setAttribute('aria-label', `Añadir más ${product.name}`);
    btnPlus.addEventListener('click', () => {
      const id = parseInt(item.dataset.productId, 10);
      if (!Number.isInteger(id) || id <= 0) return;
      onIncrement(id);
    });

    qtyDiv.appendChild(btnMinus);
    qtyDiv.appendChild(qtySpan);
    qtyDiv.appendChild(btnPlus);

    item.appendChild(img);
    item.appendChild(infoDiv);
    item.appendChild(qtyDiv);

    return item;
  }

  /* ─────────────────────────────────────────────
     ACTUALIZACIÓN DEL CONTADOR DEL HEADER
  ───────────────────────────────────────────── */

  /**
   * Actualiza el badge de cantidad visible en el botón del carrito.
   * @param {number} count
   */
  function updateCartCount(count) {
    // Validación: solo enteros no negativos
    const safeCount = Number.isInteger(count) && count >= 0 ? count : 0;
    el.cartCount.textContent = safeCount;

    // Animación bump
    el.cartCount.classList.remove('bump');
    // Forzar reflow para reiniciar la animación
    void el.cartCount.offsetWidth;
    el.cartCount.classList.add('bump');
  }

  /* ─────────────────────────────────────────────
     APERTURA / CIERRE DEL DRAWER
  ───────────────────────────────────────────── */

  function openCart() {
    el.cartDrawer.classList.add('open');
    el.cartOverlay.classList.add('active');
    el.cartDrawer.setAttribute('aria-hidden', 'false');
    el.cartOverlay.setAttribute('aria-hidden', 'false');
    el.btnCartOpen.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    // Mover foco al botón de cierre
    el.btnCartClose.focus();
  }

  function closeCart() {
    el.cartDrawer.classList.remove('open');
    el.cartOverlay.classList.remove('active');
    el.cartDrawer.setAttribute('aria-hidden', 'true');
    el.cartOverlay.setAttribute('aria-hidden', 'true');
    el.btnCartOpen.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    el.btnCartOpen.focus(); // Devolver foco al trigger
  }

  /* ─────────────────────────────────────────────
     VALIDACIÓN VISUAL DEL FORMULARIO
  ───────────────────────────────────────────── */

  /**
   * Muestra o limpia errores de un campo.
   * @param {'name'|'address'} field
   * @param {string} message - vacío para limpiar
   */
  function setFieldError(field, message) {
    const inputEl = field === 'name' ? el.inputName : el.inputAddress;
    const errorEl = field === 'name' ? el.errorName : el.errorAddress;

    if (message) {
      inputEl.classList.add('input-error');
      errorEl.textContent = message; // safe
    } else {
      inputEl.classList.remove('input-error');
      errorEl.textContent = '';
    }
  }

  /* ─────────────────────────────────────────────
     TOAST DE NOTIFICACIÓN
  ───────────────────────────────────────────── */

  let _toastTimer = null;

  /**
   * Muestra un mensaje tipo toast al usuario.
   * @param {string} message
   * @param {number} duration ms
   */
  function showToast(message, duration = 2500) {
    // Eliminar toast anterior si existe
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    if (_toastTimer) clearTimeout(_toastTimer);

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message; // safe — nunca renderizamos HTML del usuario

    document.body.appendChild(toast);

    // Forzar reflow antes de añadir clase
    void toast.offsetWidth;
    toast.classList.add('show');

    _toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  /* ─────────────────────────────────────────────
     LECTURA DE VALORES DEL FORMULARIO
  ───────────────────────────────────────────── */

  /**
   * Retorna los valores del formulario de checkout.
   * @returns {{name: string, address: string, notes: string}}
   */
  function getFormValues() {
    return {
      name:    el.inputName.value.trim(),
      address: el.inputAddress.value.trim(),
      notes:   el.inputNotes.value.trim(),
    };
  }

  /** Limpia el formulario */
  function resetForm() {
    el.checkoutForm.reset();
    setFieldError('name', '');
    setFieldError('address', '');
  }

  /* ─────────────────────────────────────────────
     BINDINGS DE EVENTOS (los conecta el Controller)
  ───────────────────────────────────────────── */

  function bindOpenCart(handler)    { el.btnCartOpen.addEventListener('click', handler); }
  function bindCloseCart(handler)   {
    el.btnCartClose.addEventListener('click', handler);
    el.cartOverlay.addEventListener('click', handler);
  }
  function bindCheckoutSubmit(handler) {
    el.checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  /* ─────────────────────────────────────────────
     UTILIDADES PRIVADAS
  ───────────────────────────────────────────── */

  /**
   * Formatea un número como precio en Pesos Colombianos (COP).
   * Ejemplo: 18900 → "$\u00a018.900"
   * @param {number} amount
   * @returns {string}
   */
  function _formatPrice(amount) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return {
    init,
    renderCatalog,
    renderCart,
    updateCartCount,
    openCart,
    closeCart,
    setFieldError,
    showToast,
    getFormValues,
    resetForm,
    bindOpenCart,
    bindCloseCart,
    bindCheckoutSubmit,
  };
})();

/* ============================================================
    ██████  ██████  ███    ██ ████████ ██████   ██████  ██      ██      ███████ ██████
   ██      ██    ██ ████   ██    ██    ██   ██ ██    ██ ██      ██      ██      ██   ██
   ██      ██    ██ ██ ██  ██    ██    ██████  ██    ██ ██      ██      █████   ██████
   ██      ██    ██ ██  ██ ██    ██    ██   ██ ██    ██ ██      ██      ██      ██   ██
    ██████  ██████  ██   ████    ██    ██   ██  ██████  ███████ ███████ ███████ ██   ██

   CONTROLLER — orquesta Model + View, maneja la lógica de negocio.
   ============================================================ */

const AppController = (() => {
  /* ─────────────────────────────────────────────
     INICIALIZACIÓN
  ───────────────────────────────────────────── */

  function init() {
    AppView.init();

    // Renderizar catálogo
    AppView.renderCatalog(PRODUCTS, _onAddToCart);

    // Vincular eventos globales
    AppView.bindOpenCart(_onOpenCart);
    AppView.bindCloseCart(_onCloseCart);
    AppView.bindCheckoutSubmit(_onCheckoutSubmit);

    // Cerrar drawer con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') _onCloseCart();
    });

    // Marcar header al hacer scroll
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
      }, { passive: true });
    }

    console.log('[QuickSync] App inicializada correctamente.');
  }

  /* ─────────────────────────────────────────────
     HANDLERS DE CARRITO
  ───────────────────────────────────────────── */

  /** Añadir al carrito */
  function _onAddToCart(productId) {
    const added = CartModel.addItem(productId);
    if (!added) return;

    _refreshCart();
    AppView.showToast('¡Producto añadido al carrito! 🛒');
  }

  /** Incrementar cantidad desde el drawer */
  function _onIncrement(productId) {
    CartModel.addItem(productId);
    _refreshCart();
  }

  /** Decrementar / eliminar desde el drawer */
  function _onDecrement(productId) {
    CartModel.decrementItem(productId);
    _refreshCart();
  }

  /** Sincroniza el estado del carrito en la View */
  function _refreshCart() {
    const items    = CartModel.getItems();
    const subtotal = CartModel.getSubtotal();
    const count    = CartModel.getTotalCount();

    AppView.renderCart(items, subtotal, _onIncrement, _onDecrement);
    AppView.updateCartCount(count);
  }

  /** Abrir drawer */
  function _onOpenCart() {
    _refreshCart(); // Asegurar que esté actualizado
    AppView.openCart();
  }

  /** Cerrar drawer */
  function _onCloseCart() {
    AppView.closeCart();
  }

  /* ─────────────────────────────────────────────
     CHECKOUT → WHATSAPP
  ───────────────────────────────────────────── */

  /**
   * Valida el formulario y construye el enlace de WhatsApp.
   * Toda la construcción del mensaje usa encodeURIComponent()
   * para evitar inyecciones en la URI y garantizar saltos de línea.
   */
  function _onCheckoutSubmit() {
    const { name, address, notes } = AppView.getFormValues();

    // ── Validación del formulario ──
    let isValid = true;

    // Nombre: requerido, mín 2 caracteres
    if (!name || name.length < 2) {
      AppView.setFieldError('name', 'Por favor ingresa tu nombre completo.');
      isValid = false;
    } else {
      AppView.setFieldError('name', '');
    }

    // Dirección: requerida, mín 5 caracteres
    if (!address || address.length < 5) {
      AppView.setFieldError('address', 'Por favor ingresa una dirección válida.');
      isValid = false;
    } else {
      AppView.setFieldError('address', '');
    }

    if (!isValid) return;

    // ── Carrito no vacío ──
    if (CartModel.isEmpty()) {
      AppView.showToast('Tu carrito está vacío. Agrega productos primero.');
      return;
    }

    // ── Construcción del mensaje ──
    const whatsappUrl = _buildWhatsAppURL(name, address, notes);

    // Redirigir (abre WhatsApp en nueva pestaña)
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // UX: notificación de éxito
    AppView.showToast('✅ ¡Pedido enviado! Te redirigimos a WhatsApp.');
  }

  /**
   * Construye la URL de WhatsApp con el mensaje del pedido.
   * Usa encodeURIComponent para todos los valores dinámicos.
   *
   * Ejemplo de mensaje resultante (sin encode):
   * ─────────────────────────────
   * 🛒 *NUEVO PEDIDO — QuickSync*
   * ─────────────────────────────
   * 👤 Cliente: María García
   * 📍 Dirección: Calle 123
   *
   * 📋 *DETALLE DEL PEDIDO:*
   * • 2x Classic Bacon Burger — $25.98
   * • 1x Double Smash Burger — $15.99
   *
   * 💰 *TOTAL: $41.97*
   * 📝 Notas: Sin cebolla
   * ─────────────────────────────
   *
   * @param {string} name
   * @param {string} address
   * @param {string} notes
   * @returns {string} URL completa
   */
  function _buildWhatsAppURL(name, address, notes) {
    const items    = CartModel.getItems();
    const subtotal = CartModel.getSubtotal();

    // Separador decorativo
    const sep = '─'.repeat(32);

    // Construir líneas del mensaje como strings literales
    // Los precios vienen del Model — no del DOM.
    let message = `${sep}\n`;
    message += `🛒 *NUEVO PEDIDO — QuickSync*\n`;
    message += `${sep}\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📍 *Dirección:* ${address}\n\n`;
    message += `📋 *DETALLE DEL PEDIDO:*\n`;

    // Helper: formato COP, ej: $ 18.900
    const toCOP = (amount) =>
      new Intl.NumberFormat('es-CO', {
        style: 'currency', currency: 'COP',
        minimumFractionDigits: 0, maximumFractionDigits: 0,
      }).format(amount);

    items.forEach(({ product, quantity }) => {
      // Cantidad validada como entero positivo (garantizado por el Model)
      const lineTotal = toCOP(product.price * quantity);
      message += `  • ${quantity}x ${product.name} — ${lineTotal}\n`;
    });

    message += `\n💰 *TOTAL: ${toCOP(subtotal)}*\n`;

    if (notes) {
      message += `📝 *Notas:* ${notes}\n`;
    }

    message += `${sep}`;

    // encodeURIComponent para toda la cadena — previene inyecciones en la URI
    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  }

  return { init };
})();

/* ============================================================
   BOOTSTRAP — Arranque de la app cuando el DOM está listo
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  AppController.init();
});
