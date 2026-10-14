/**
 * ============================================================
 * QuickSync — app.js
 * Arquitectura: MVC (Model–View–Controller) en Vanilla JS ES6+
 * Enfoque: Corporativo, Minimalista, Cero Emojis & Alta Gama
 * Scroll Spy Dinámico con IntersectionObserver & Sync Bidireccional
 * ============================================================
 */

'use strict';

/** Número oficial de atención corporativa vía WhatsApp de QuickSync */
const WHATSAPP_NUMBER = '573192784589';

/** Tarifa fija de transporte metropolitano en COP */
const SHIPPING_COST = 4000;

/* ============================================================
   1. MODELO DE DATOS (StoreModel)
   Catálogo corporativo y gestión del estado de la orden
   ============================================================ */

class StoreModel {
  constructor() {
    /**
     * Catálogo gastronómico de alta gama en Pesos Colombianos (COP)
     * Estructura: { id, name, price, tag, category, description, image }
     * Cero emojis, redacción profesional y coherencia de precios.
     */
    this.products = [
      /* ─────────────────────────────────────────────
         1. HAMBURGUESAS
      ───────────────────────────────────────────── */
      {
        id: 1,
        name: 'Classic Bacon Burger',
        price: 22900,
        tag: 'Especialidad',
        category: 'Hamburguesas',
        description: 'Corte de res Angus 180g a la parrilla, tocineta ahumada crujiente, queso cheddar madurado, lechuga romana y aderezo artesanal de la casa en pan brioche sellado con mantequilla.',
        image: 'assets/images/burger-classic.jpg',
      },
      {
        id: 2,
        name: 'Double Smash Burger',
        price: 26900,
        tag: 'Selección del Chef',
        category: 'Hamburguesas',
        description: 'Doble medallón fino prensado en plancha de hierro fundido, cuádruple queso cheddar fundido, cebolla confitada al vino tinto y pepinillos encurtidos en pan brioche.',
        image: 'assets/images/burger-double.jpg',
      },
      {
        id: 3,
        name: 'Mushroom & Truffle Burger',
        price: 28900,
        tag: 'Gourmet',
        category: 'Hamburguesas',
        description: 'Champiñones portobello salteados al vino blanco con finas hierbas, queso gouda fundido, emulsión de trufa negra y rúgula fresca sobre pan artesanal.',
        image: 'assets/images/burger-mushroom.jpg',
      },
      {
        id: 4,
        name: 'Crispy BBQ Bacon Chicken',
        price: 23900,
        tag: 'Crujiente',
        category: 'Hamburguesas',
        description: 'Suprema de pechuga de pollo rebozada con especias cajún, tocineta crocante de madera de manzano, queso monterey jack y glaseado barbacoa artesanal.',
        image: 'assets/images/burger-chicken.jpg',
      },

      /* ─────────────────────────────────────────────
         2. PIZZAS
      ───────────────────────────────────────────── */
      {
        id: 5,
        name: 'Pizza Margherita Di Fiori',
        price: 28900,
        tag: 'Tradición Napolitana',
        category: 'Pizzas',
        description: 'Masa de fermentación lenta de 48 horas, passata de tomates San Marzano D.O.P., mozzarella fior di latte fundida, hojas de albahaca fresca y aceite de oliva virgen extra.',
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 6,
        name: 'Pizza Pepperoni Rústico & Hot Honey',
        price: 32900,
        tag: 'Contemporánea',
        category: 'Pizzas',
        description: 'Embutido curado artesanal de pepperoni, mozzarella hilada de búfala, orégano silvestre tostado y reducción de miel pura infusionada con chiles rojos secos.',
        image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 7,
        name: 'Pizza Cuatro Quesos & Miel Trufada',
        price: 34900,
        tag: 'Gourmet',
        category: 'Pizzas',
        description: 'Equilibrio de queso gorgonzola dulce, parmigiano reggiano madurado 24 meses, fior di latte y provolone ahumado, terminado con un toque sutil de esencia de trufa blanca.',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 8,
        name: 'Pizza Prosciutto & Rúgula Salvaje',
        price: 36900,
        tag: 'De Autor',
        category: 'Pizzas',
        description: 'Láminas finas de jamón curado prosciutto di Parma, rúgula silvestre fresca, escamas de queso grana padano y reducción balsámica tradicional de Módena.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
      },

      /* ─────────────────────────────────────────────
         3. CORTES DE CARNES
      ───────────────────────────────────────────── */
      {
        id: 9,
        name: 'Bife de Chorizo Angus 350g',
        price: 48900,
        tag: 'Corte Selecto',
        category: 'Cortes de Carnes',
        description: 'Lomo ancho de res Angus con veteado uniforme y borde de grasa dorado a la brasa de quebracho blanco. Acompañado de chimichurri tradicional de finas hierbas.',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 10,
        name: 'Ojo de Bife con Mantequilla de Romero',
        price: 52900,
        tag: 'Maduración 21 Días',
        category: 'Cortes de Carnes',
        description: 'Ribeye de máxima terneza y concentración de jugos, bañado durante el reposo en mantequilla avellanada clarificada con romero fresco y escamas de sal marina.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 11,
        name: 'Costillas BBQ San Luis Horneadas 500g',
        price: 44900,
        tag: 'Cocción Lenta',
        category: 'Cortes de Carnes',
        description: 'Corte tierno de costillar de cerdo confitado al vacío durante 12 horas a baja temperatura, terminado al horno con glaseado ahumado de ciruelas negras y bourbon.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 12,
        name: 'Picanha al Carbón con Chimichurri 400g',
        price: 54900,
        tag: 'Corte Noble',
        category: 'Cortes de Carnes',
        description: 'Tapa de cuadril madurada asada lentamente a la espada al calor del carbón vegetal, con costra dorada de sal marina de grano grueso y ajos confitados.',
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
      },

      /* ─────────────────────────────────────────────
         4. BEBIDAS
      ───────────────────────────────────────────── */
      {
        id: 13,
        name: 'Limonada de Coco Cremosa',
        price: 8900,
        tag: 'Bebida Artesanal',
        category: 'Bebidas',
        description: 'Extracción en frío de zumo de limón persa emulsionado con crema de coco natural sin aditivos, servido a punto de nieve con un toque sutil de panela orgánica.',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 14,
        name: 'Soda Artesanal de Frutos Rojos & Albahaca',
        price: 7900,
        tag: 'Natural',
        category: 'Bebidas',
        description: 'Compota artesanal de moras silvestres, fresas y frambuesas con agua carbonatada mineral, perfumada con hojas frescas de albahaca morada.',
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 15,
        name: 'Zumo Natural de Maracuyá Silvestre',
        price: 6900,
        tag: '100% Fruta',
        category: 'Bebidas',
        description: 'Pulpa pura seleccionada de maracuyá de exportación, filtrada con delicadeza para resaltar su acidez natural equilibrada. Servido con hielo cristalino.',
        image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 16,
        name: 'Té Helado Artesanal al Limón Mandarino',
        price: 6500,
        tag: 'Infusión Fría',
        category: 'Bebidas',
        description: 'Infusión en frío de hojas selectas de té negro Ceilán con cáscaras confitadas de naranja dulce, zumo de limón mandarino fresco y menta crespa.',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
      },

      /* ─────────────────────────────────────────────
         5. CÓCTELES
      ───────────────────────────────────────────── */
      {
        id: 17,
        name: 'Gin Tonic Botánico de Frutos Silvestres',
        price: 24900,
        tag: 'Coctelería de Autor',
        category: 'Cócteles',
        description: 'Ginebra destilada premium aromatizada con bayas de enebro, infusión artesanal de frutos del bosque, agua tónica botánica y un twist de pomelo rosado.',
        image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 18,
        name: 'Moscow Mule en Taza de Cobre',
        price: 23900,
        tag: 'Clásico de Barra',
        category: 'Cócteles',
        description: 'Vodka destilado en alambique de cobre, cerveza de jengibre artesanal con notas picantes, zumo recién exprimido de lima y ramillete aromático de menta fresca.',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 19,
        name: 'Aperol Spritz Veneciano',
        price: 25900,
        tag: 'Aperitivo Italiano',
        category: 'Cócteles',
        description: 'Aperol italiano de etiqueta original, vino espumoso Prosecco D.O.C. extra dry, un toque de soda premium carbonatada y rodaja de naranja fresca.',
        image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 20,
        name: 'Mojito Artesanal de Ron Añejo',
        price: 21900,
        tag: 'Clásico',
        category: 'Cócteles',
        description: 'Ron añejado en barrica de roble blanco, hierbabuena fresca palmeada para liberar aceites esenciales, azúcar de caña morena y zumo natural de lima verde.',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
      },

      /* ─────────────────────────────────────────────
         6. PREPARACIONES ARTESANALES (Renombrada)
      ───────────────────────────────────────────── */
      {
        id: 21,
        name: 'Papas Rústicas Trufadas al Parmesano',
        price: 18900,
        tag: 'Guarnición de Autor',
        category: 'Preparaciones Artesanales',
        description: 'Papas nativas cortadas en gruesos gajos dorados con piel, aromatizadas con aceite virgen de trufa blanca de Piamonte, lluvia de queso Parmigiano Reggiano y perejil fresco.',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 22,
        name: 'Gratinado Dauphinoise con Gruyère',
        price: 21900,
        tag: 'Cocina Francesa',
        category: 'Preparaciones Artesanales',
        description: 'Finas láminas de papa pastusa confitadas lentamente al horno en crema infusionada con nuez moscada y ajo suave, gratinadas con abundante queso suizo Gruyère A.O.P.',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 23,
        name: 'Papas Bravas Rústicas con Alioli Casero',
        price: 16900,
        tag: 'Tapa Clásica',
        category: 'Preparaciones Artesanales',
        description: 'Cubos de papa tierna por dentro y crocantes por fuera, servidos con salsa brava ahumada elaborada con pimentón de la Vera dulce y alioli ligero de ajo confitado.',
        image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 24,
        name: 'Milhojas de Papa Crocante con Panceta',
        price: 19900,
        tag: 'Alta Técnica',
        category: 'Preparaciones Artesanales',
        description: 'Terrina artesanal prensada de 30 capas milimétricas de papa doradas a fuego suave con mantequilla noisette, crocante de panceta ahumada y dip de crema agria con cebollino.',
        image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80',
      },

      /* ─────────────────────────────────────────────
         7. ASIÁTICO (Sushi, Salmón, Bowls)
      ───────────────────────────────────────────── */
      {
        id: 25,
        name: 'Salmón Roll Especial con Masago (10 bocados)',
        price: 32900,
        tag: 'Pesca Fresca',
        category: 'Asiático',
        description: 'Rollo uramaki relleno de salmón fresco noruego, queso philadelphia y aguacate Hass seleccionado, envuelto en finas láminas de salmón flameado al soplete con perlas de masago.',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 26,
        name: 'Tartar de Salmón & Atún con Sésamo Tostado',
        price: 36900,
        tag: 'Crudo Premium',
        category: 'Asiático',
        description: 'Dados frescos de lomo de salmón y atún rojo marinados en vinagreta ponzu de yuzu, aceite de sésamo tostado, cebollino fresco picado y base cremosa de aguacate.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 27,
        name: 'Poké Bowl de Salmón Marinado & Edamame',
        price: 34900,
        tag: 'Plato Balanceado',
        category: 'Asiático',
        description: 'Base de arroz shari aderezado, cubos generosos de salmón marinado con jengibre fresco, habas de edamame al vapor, ensalada wakame, mango maduro y aderezo spicy japonés.',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 28,
        name: 'Ebi Crunch Roll con Langostinos Tempura (10 bocados)',
        price: 29900,
        tag: 'Crocante',
        category: 'Asiático',
        description: 'Langostinos crocantes apanados en panko japonés tradicional, espárragos verdes blanqueados y queso crema, cubiertos con hebras crocantes de masa tempura y salsa dulce de anguila.',
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
      },
    ];

    /** @type {Map<number, {product: Object, quantity: number}>} */
    this.cart = new Map();

    /** Modalidad de pago seleccionada: 'cash' o 'transfer' */
    this.paymentMethod = 'cash';

    /** Costo oficial de transporte */
    this.shippingCost = SHIPPING_COST;
  }

  getProducts() {
    return this.products;
  }

  getCategories() {
    return [...new Set(this.products.map((p) => p.category))];
  }

  findProduct(productId) {
    return this.products.find((p) => p.id === productId);
  }

  addItem(productId) {
    const product = this.findProduct(productId);
    if (!product) return false;

    if (this.cart.has(productId)) {
      const current = this.cart.get(productId);
      this.cart.set(productId, { product, quantity: current.quantity + 1 });
    } else {
      this.cart.set(productId, { product, quantity: 1 });
    }
    return true;
  }

  decrementItem(productId) {
    if (!this.cart.has(productId)) return;
    const current = this.cart.get(productId);
    if (current.quantity <= 1) {
      this.cart.delete(productId);
    } else {
      this.cart.set(productId, { ...current, quantity: current.quantity - 1 });
    }
  }

  removeItem(productId) {
    this.cart.delete(productId);
  }

  getTotalCount() {
    let count = 0;
    this.cart.forEach(({ quantity }) => {
      count += quantity;
    });
    return count;
  }

  getSubtotal() {
    let subtotal = 0;
    this.cart.forEach(({ product, quantity }) => {
      const validQty = Number.isInteger(quantity) && quantity > 0 ? quantity : 0;
      subtotal += product.price * validQty;
    });
    return subtotal;
  }

  getShippingCost() {
    return this.shippingCost;
  }

  getTotal() {
    if (this.isEmpty()) return 0;
    return this.getSubtotal() + this.getShippingCost();
  }

  getPaymentMethod() {
    return this.paymentMethod;
  }

  setPaymentMethod(method) {
    if (method === 'cash' || method === 'transfer') {
      this.paymentMethod = method;
    }
  }

  getItems() {
    return Array.from(this.cart.values());
  }

  isEmpty() {
    return this.cart.size === 0;
  }

  clear() {
    this.cart.clear();
  }
}

// Instancia única del Modelo
const storeModel = new StoreModel();

// Alias para compatibilidad hacia atrás
const CartModel = storeModel;
const PRODUCTS = storeModel.products;

/* ============================================================
   2. VISTA (StoreView)
   Renderizado dinámico de categorías, navegación sticky y orden
   ============================================================ */

const StoreView = (() => {
  const el = {};

  // Estado interno para el Scroll Spy
  let _observer = null;
  const _categoryRatios = new Map();
  let _isClickScrolling = false;
  let _clickScrollTimer = null;
  let _scrollRafId = null;

  function init() {
    el.productGrid       = document.getElementById('product-grid');
    el.categoryNavbar    = document.getElementById('category-navbar');
    el.categoryNavList   = document.getElementById('category-nav-list');
    el.siteHeader        = document.querySelector('.site-header');
    el.catalogSection    = document.getElementById('catalog');
    el.cartOverlay       = document.getElementById('cart-overlay');
    el.cartDrawer        = document.getElementById('cart-drawer');
    el.btnCartOpen       = document.getElementById('btn-cart-open');
    el.btnCartClose      = document.getElementById('btn-cart-close');
    el.cartCount         = document.getElementById('cart-count');
    el.cartItems         = document.getElementById('cart-items');
    el.cartEmpty         = document.getElementById('cart-empty');
    el.cartContent       = document.getElementById('cart-content');
    el.cartSummary       = document.getElementById('cart-summary');
    el.cartSubtotal      = document.getElementById('cart-subtotal');
    el.cartShipping      = document.getElementById('cart-shipping');
    el.cartTotal         = document.getElementById('cart-total');
    el.checkoutForm      = document.getElementById('checkout-form');
    el.inputName         = document.getElementById('input-name');
    el.inputAddress      = document.getElementById('input-address');
    el.inputNotes        = document.getElementById('input-notes');
    el.errorName         = document.getElementById('error-name');
    el.errorAddress      = document.getElementById('error-address');
    el.paymentTabs       = document.querySelectorAll('.payment-tab');
    el.transferInfoBox   = document.getElementById('transfer-info');
    el.btnEmptyBrowse    = document.getElementById('btn-empty-browse');
    el.copyButtons       = document.querySelectorAll('.btn-copy-compact');

    _initCopyButtons();

    if (el.btnEmptyBrowse) {
      el.btnEmptyBrowse.addEventListener('click', () => {
        closeCart();
      });
    }
  }

  /** Genera identificador seguro para anclaje a partir del nombre de categoría */
  function _slugify(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /* ─────────────────────────────────────────────
     BARRA STICKY DE NAVEGACIÓN DE CATEGORÍAS
  ───────────────────────────────────────────── */

  /**
   * Renderiza dinámicamente los botones de categorías en la barra de navegación superior.
   * Al hacer clic, ejecuta un scroll suave hasta la sección correspondiente.
   *
   * @param {string[]} categories - Lista de categorías únicas
   */
  function renderCategoryNavbar(categories) {
    if (!el.categoryNavList) return;
    el.categoryNavList.textContent = '';

    categories.forEach((categoryName, index) => {
      const slug = _slugify(categoryName);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = index === 0 ? 'category-nav-btn active' : 'category-nav-btn';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      btn.dataset.targetId = `cat-section-${slug}`;
      btn.textContent = categoryName;

      btn.addEventListener('click', () => {
        _scrollToCategory(slug);
        _setActiveNavButton(btn);
      });

      el.categoryNavList.appendChild(btn);
    });
  }

  function _scrollToCategory(slug) {
    const targetEl = document.getElementById(`cat-section-${slug}`);
    if (!targetEl) return;

    _isClickScrolling = true;
    if (_clickScrollTimer) clearTimeout(_clickScrollTimer);

    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Restablece el flag después de que concluye la transición de scroll suave
    _clickScrollTimer = setTimeout(() => {
      _isClickScrolling = false;
    }, 850);
  }

  function _setActiveNavButton(activeBtn) {
    if (!el.categoryNavList || !activeBtn) return;
    const allBtns = el.categoryNavList.querySelectorAll('.category-nav-btn');
    let changed = false;

    allBtns.forEach((btn) => {
      const isCurrent = btn === activeBtn;
      if (btn.classList.contains('active') !== isCurrent) {
        btn.classList.toggle('active', isCurrent);
        btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        changed = true;
      }
    });

    // Desplazamiento horizontal automático del navbar si el botón activo queda oculto en móvil
    if (changed) {
      activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  /* ─────────────────────────────────────────────
     SCROLL SPY AVANZADO CON INTERSECTION OBSERVER
  ───────────────────────────────────────────── */

  /**
   * Configura IntersectionObserver observando todas las secciones completas (.category-section).
   * Monitorea la proporción de visibilidad y activa la categoría predominante en tiempo real.
   */
  function _setupScrollObserver() {
    const sections = document.querySelectorAll('.category-section');
    if (sections.length === 0) return;

    if (_observer) {
      _observer.disconnect();
    }
    _categoryRatios.clear();

    const headerHeight = el.siteHeader ? el.siteHeader.offsetHeight : 72;
    const navHeight = el.categoryNavbar ? el.categoryNavbar.offsetHeight : 58;
    const topOffset = headerHeight + navHeight;

    // Configuración precisa del área activa de observación
    const observerOptions = {
      root: null,
      // Descuenta el espacio ocupado por header y barra de categorías superior
      rootMargin: `-${topOffset + 12}px 0px -40% 0px`,
      threshold: [0, 0.05, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.0],
    };

    _observer = new IntersectionObserver((entries) => {
      if (_isClickScrolling) return;

      entries.forEach((entry) => {
        _categoryRatios.set(
          entry.target.id,
          entry.isIntersecting ? entry.intersectionRatio : 0
        );
      });

      // Detectar cuál de las secciones tiene mayor porcentaje de visibilidad en el viewport
      let dominantId = null;
      let maxRatio = 0;

      _categoryRatios.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          dominantId = id;
        }
      });

      if (dominantId && maxRatio > 0) {
        const targetBtn = el.categoryNavList.querySelector(`[data-target-id="${dominantId}"]`);
        if (targetBtn) {
          _setActiveNavButton(targetBtn);
        }
      }
    }, observerOptions);

    sections.forEach((sec) => _observer.observe(sec));

    // Listener de scroll coordinado para cambios rápidos de posición y límites de página
    _setupScrollCoordinator(topOffset);
  }

  function _setupScrollCoordinator(topOffset) {
    window.removeEventListener('scroll', _onWindowScroll);
    window.addEventListener('scroll', _onWindowScroll, { passive: true });
  }

  function _onWindowScroll() {
    if (_isClickScrolling) return;

    if (_scrollRafId) cancelAnimationFrame(_scrollRafId);

    _scrollRafId = requestAnimationFrame(() => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const allBtns = el.categoryNavList ? el.categoryNavList.querySelectorAll('.category-nav-btn') : [];
      if (allBtns.length === 0) return;

      // 1. Llegada al extremo inferior de la página -> activar última categoría
      if (scrollY + windowHeight >= docHeight - 35) {
        _setActiveNavButton(allBtns[allBtns.length - 1]);
        return;
      }

      // 2. Extremo superior antes de la primera categoría -> activar primera categoría
      const catalogEl = el.catalogSection || document.getElementById('catalog');
      const headerOffset = (el.siteHeader?.offsetHeight || 72) + (el.categoryNavbar?.offsetHeight || 58);
      if (catalogEl && scrollY < catalogEl.offsetTop - headerOffset) {
        _setActiveNavButton(allBtns[0]);
        return;
      }

      // 3. Verificación de precisión geométrica de la sección activa
      const sections = document.querySelectorAll('.category-section');
      const triggerY = headerOffset + 40;
      let activeSec = null;

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom > triggerY) {
          activeSec = sec;
        }
      });

      if (activeSec) {
        const targetBtn = el.categoryNavList.querySelector(`[data-target-id="${activeSec.id}"]`);
        if (targetBtn) {
          _setActiveNavButton(targetBtn);
        }
      }
    });
  }

  /* ─────────────────────────────────────────────
     RENDERIZADO DEL CATÁLOGO AGRUPADO POR CATEGORÍAS
  ───────────────────────────────────────────── */

  /**
   * Agrupa los productos por su propiedad 'category' y los renderiza en #product-grid
   * creando una sección contenedora (.category-section) para cada categoría completa.
   *
   * @param {Object[]} products - Lista completa de productos
   * @param {Function} onAddToCart - Callback al presionar agregar
   */
  function renderProducts(products, onAddToCart) {
    if (!el.productGrid) return;
    el.productGrid.textContent = '';

    // Agrupar productos por categoría
    const grouped = {};
    products.forEach((product) => {
      const cat = product.category || 'Especialidades';
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      grouped[cat].push(product);
    });

    const categoryNames = Object.keys(grouped);

    categoryNames.forEach((catName) => {
      const catProducts = grouped[catName];
      const slug = _slugify(catName);

      // Sección contenedora completa de la categoría (Header + Cards)
      const section = document.createElement('section');
      section.className = 'category-section';
      section.id = `cat-section-${slug}`;
      section.setAttribute('aria-label', catName);

      // Encabezado de la categoría
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'category-header-wrap';

      const title = document.createElement('h2');
      title.className = 'category-title';
      title.textContent = catName;

      const counter = document.createElement('span');
      counter.className = 'category-count';
      counter.textContent = `${catProducts.length} Variedades`;

      categoryHeader.appendChild(title);
      categoryHeader.appendChild(counter);
      section.appendChild(categoryHeader);

      // Rejilla de tarjetas de productos de esta categoría
      const cardsGrid = document.createElement('div');
      cardsGrid.className = 'product-grid';

      catProducts.forEach((product) => {
        const article = _createProductCard(product, onAddToCart);
        cardsGrid.appendChild(article);
      });

      section.appendChild(cardsGrid);
      el.productGrid.appendChild(section);
    });

    // Inicializar el Scroll Spy con Intersection Observer
    _setupScrollObserver();
  }

  /**
   * Crea la tarjeta de producto con diseño corporativo y elegante
   */
  function _createProductCard(product, onAddToCart) {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.setAttribute('role', 'listitem');
    article.dataset.productId = product.id;

    // Contenedor de Imagen
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'product-img-wrapper';

    const fallbackSvg = _getCorporateFallbackSvg(product.name);

    const img = document.createElement('img');
    img.className = 'product-img';
    img.src = product.image || fallbackSvg;
    img.alt = product.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 400;
    img.height = 300;
    img.onerror = () => {
      img.onerror = null;
      img.src = fallbackSvg;
    };

    imgWrapper.appendChild(img);
    article.appendChild(imgWrapper);

    // Información del Producto
    const info = document.createElement('div');
    info.className = 'product-info';

    if (product.tag) {
      const tagEl = document.createElement('span');
      tagEl.className = 'product-tag';
      tagEl.textContent = product.tag;
      info.appendChild(tagEl);
    }

    const name = document.createElement('h3');
    name.className = 'product-name product-title';
    name.textContent = product.name;

    const desc = document.createElement('p');
    desc.className = 'product-description';
    desc.textContent = product.description || '';

    const footer = document.createElement('div');
    footer.className = 'product-footer';

    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = _formatPrice(product.price);

    const addBtn = document.createElement('button');
    addBtn.className = 'btn-add-to-cart';
    addBtn.type = 'button';
    addBtn.setAttribute('aria-label', `Agregar ${product.name} a la orden`);
    addBtn.dataset.productId = product.id;

    const btnText = document.createElement('span');
    btnText.textContent = 'Añadir a la orden';
    addBtn.appendChild(btnText);

    addBtn.addEventListener('click', () => {
      const idFromDom = parseInt(addBtn.dataset.productId, 10);
      if (!Number.isInteger(idFromDom) || idFromDom <= 0) return;

      onAddToCart(idFromDom);

      addBtn.classList.add('added');
      btnText.textContent = 'Añadido';
      setTimeout(() => {
        addBtn.classList.remove('added');
        btnText.textContent = 'Añadir a la orden';
      }, 1000);
    });

    footer.appendChild(price);
    footer.appendChild(addBtn);

    info.appendChild(name);
    if (product.description) {
      info.appendChild(desc);
    }
    info.appendChild(footer);

    article.appendChild(info);

    return article;
  }

  /** Fallback SVG corporativo y geométrico sin emojis */
  function _getCorporateFallbackSvg(name) {
    const encodedTitle = encodeURIComponent((name || 'QUICKSYNC').substring(0, 24).toUpperCase());
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23F4F4F5'/%3E%3Ctext x='50%25' y='46%25' font-family='sans-serif' font-weight='700' font-size='16' letter-spacing='0.16em' fill='%2352525B' text-anchor='middle'%3E${encodedTitle}%3C/text%3E%3Ctext x='50%25' y='58%25' font-family='sans-serif' font-weight='600' font-size='11' letter-spacing='0.22em' fill='%23A1A1AA' text-anchor='middle'%3EALTA COCINA%3C/text%3E%3C/svg%3E`;
  }

  function _getCartFallbackSvg() {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 72 72'%3E%3Crect width='72' height='72' rx='10' fill='%23F4F4F5'/%3E%3Ctext x='50%25' y='55%25' font-family='sans-serif' font-weight='700' font-size='15' fill='%23111827' text-anchor='middle'%3EQS%3C/text%3E%3C/svg%3E`;
  }

  /* ─────────────────────────────────────────────
     RENDERIZADO DEL PANEL LATERAL DE LA ORDEN
  ───────────────────────────────────────────── */

  function renderCart(items, subtotal, shippingCost, total, onIncrement, onDecrement) {
    if (!el.cartItems) return;
    el.cartItems.textContent = '';

    const isEmpty = items.length === 0;

    if (el.cartEmpty) {
      el.cartEmpty.setAttribute('aria-hidden', !isEmpty);
      el.cartEmpty.style.display = isEmpty ? 'flex' : 'none';
    }

    if (el.cartContent) {
      el.cartContent.style.display = isEmpty ? 'none' : 'flex';
    }

    if (isEmpty) return;

    items.forEach(({ product, quantity }) => {
      const itemEl = _createCartItem(product, quantity, onIncrement, onDecrement);
      el.cartItems.appendChild(itemEl);
    });

    if (el.cartSubtotal) el.cartSubtotal.textContent = _formatPrice(subtotal);
    if (el.cartShipping) el.cartShipping.textContent = _formatPrice(shippingCost);
    if (el.cartTotal) el.cartTotal.textContent = _formatPrice(total);
  }

  function _createCartItem(product, quantity, onIncrement, onDecrement) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.setAttribute('role', 'listitem');
    item.dataset.productId = product.id;

    // Miniatura
    const img = document.createElement('img');
    img.className = 'cart-item-img';
    const fallback = _getCartFallbackSvg();
    img.src = product.image || fallback;
    img.alt = product.name;
    img.loading = 'lazy';
    img.width = 68;
    img.height = 68;
    img.onerror = () => {
      img.onerror = null;
      img.src = fallback;
    };

    // Nombre
    const nameEl = document.createElement('p');
    nameEl.className = 'cart-item-name';
    nameEl.textContent = product.name;

    // Precio unitario x cantidad
    const priceEl = document.createElement('p');
    priceEl.className = 'cart-item-price';
    priceEl.textContent = `${_formatPrice(product.price)} x ${quantity}`;

    // Controles de cantidad
    const qtyDiv = document.createElement('div');
    qtyDiv.className = 'qty-controls';

    const btnMinus = document.createElement('button');
    btnMinus.type = 'button';
    btnMinus.className = quantity === 1 ? 'btn-qty btn-qty--delete' : 'btn-qty';
    btnMinus.textContent = quantity === 1 ? '✕' : '−';
    btnMinus.setAttribute(
      'aria-label',
      quantity === 1 ? `Eliminar ${product.name} de la orden` : `Reducir cantidad de ${product.name}`
    );
    btnMinus.addEventListener('click', () => {
      const id = parseInt(item.dataset.productId, 10);
      if (Number.isInteger(id)) onDecrement(id);
    });

    const qtySpan = document.createElement('span');
    qtySpan.className = 'qty-value';
    qtySpan.textContent = quantity;

    const btnPlus = document.createElement('button');
    btnPlus.type = 'button';
    btnPlus.className = 'btn-qty';
    btnPlus.textContent = '+';
    btnPlus.setAttribute('aria-label', `Añadir otra unidad de ${product.name}`);
    btnPlus.addEventListener('click', () => {
      const id = parseInt(item.dataset.productId, 10);
      if (Number.isInteger(id)) onIncrement(id);
    });

    qtyDiv.appendChild(btnMinus);
    qtyDiv.appendChild(qtySpan);
    qtyDiv.appendChild(btnPlus);

    item.appendChild(img);
    item.appendChild(nameEl);
    item.appendChild(priceEl);
    item.appendChild(qtyDiv);

    return item;
  }

  /* ─────────────────────────────────────────────
     GESTIÓN DE MODALIDADES DE PAGO Y COPIADO
  ───────────────────────────────────────────── */

  function updatePaymentMethodView(selectedMethod) {
    el.paymentTabs.forEach((tab) => {
      const input = tab.querySelector('input[type="radio"]');
      if (input && input.value === selectedMethod) {
        tab.classList.add('selected');
        input.checked = true;
      } else {
        tab.classList.remove('selected');
        if (input) input.checked = false;
      }
    });

    if (el.transferInfoBox) {
      el.transferInfoBox.style.display = selectedMethod === 'transfer' ? 'block' : 'none';
    }
  }

  function _initCopyButtons() {
    el.copyButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        if (!textToCopy) return;

        _copyToClipboard(textToCopy, btn);
      });
    });
  }

  function _copyToClipboard(text, btnElement) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        _handleCopySuccess(btnElement);
      }).catch(() => {
        _fallbackCopy(text, btnElement);
      });
    } else {
      _fallbackCopy(text, btnElement);
    }
  }

  function _fallbackCopy(text, btnElement) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      _handleCopySuccess(btnElement);
    } catch (e) {
      showToast('Dato copiado manualmente: ' + text);
    }
    document.body.removeChild(tempInput);
  }

  function _handleCopySuccess(btnElement) {
    const labelEl = btnElement.querySelector('.copy-label');
    const originalText = labelEl ? labelEl.textContent : 'Copiar';

    btnElement.classList.add('copied');
    if (labelEl) labelEl.textContent = 'Copiado';
    showToast('Información copiada al portapapeles');

    setTimeout(() => {
      btnElement.classList.remove('copied');
      if (labelEl) labelEl.textContent = originalText;
    }, 2000);
  }

  function updateCartCount(count) {
    const safeCount = Number.isInteger(count) && count >= 0 ? count : 0;
    if (el.cartCount) {
      el.cartCount.textContent = safeCount;
      el.cartCount.classList.remove('bump');
      void el.cartCount.offsetWidth;
      el.cartCount.classList.add('bump');
    }
  }

  function openCart() {
    el.cartDrawer.classList.add('open');
    el.cartOverlay.classList.add('active');
    el.cartDrawer.setAttribute('aria-hidden', 'false');
    el.cartOverlay.setAttribute('aria-hidden', 'false');
    el.btnCartOpen.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    el.btnCartClose.focus();
  }

  function closeCart() {
    el.cartDrawer.classList.remove('open');
    el.cartOverlay.classList.remove('active');
    el.cartDrawer.setAttribute('aria-hidden', 'true');
    el.cartOverlay.setAttribute('aria-hidden', 'true');
    el.btnCartOpen.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    el.btnCartOpen.focus();
  }

  function setFieldError(field, message) {
    const inputEl = field === 'name' ? el.inputName : el.inputAddress;
    const errorEl = field === 'name' ? el.errorName : el.errorAddress;
    if (!inputEl || !errorEl) return;

    if (message) {
      inputEl.classList.add('input-error');
      errorEl.textContent = message;
    } else {
      inputEl.classList.remove('input-error');
      errorEl.textContent = '';
    }
  }

  let _toastTimer = null;

  function showToast(message, duration = 2400) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    if (_toastTimer) clearTimeout(_toastTimer);

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;

    document.body.appendChild(toast);
    void toast.offsetWidth;
    toast.classList.add('show');

    _toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  function getFormValues() {
    const checkedRadio = document.querySelector('input[name="payment-method"]:checked');
    return {
      name: el.inputName ? el.inputName.value.trim() : '',
      address: el.inputAddress ? el.inputAddress.value.trim() : '',
      notes: el.inputNotes ? el.inputNotes.value.trim() : '',
      paymentMethod: checkedRadio ? checkedRadio.value : 'cash',
    };
  }

  function resetForm() {
    if (el.checkoutForm) el.checkoutForm.reset();
    setFieldError('name', '');
    setFieldError('address', '');
    updatePaymentMethodView('cash');
  }

  function bindOpenCart(handler) {
    if (el.btnCartOpen) el.btnCartOpen.addEventListener('click', handler);
  }

  function bindCloseCart(handler) {
    if (el.btnCartClose) el.btnCartClose.addEventListener('click', handler);
    if (el.cartOverlay) el.cartOverlay.addEventListener('click', handler);
  }

  function bindPaymentChange(handler) {
    el.paymentTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const input = tab.querySelector('input[type="radio"]');
        if (input) {
          handler(input.value);
        }
      });
    });
  }

  function bindCheckoutSubmit(handler) {
    if (el.checkoutForm) {
      el.checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handler();
      });
    }
  }

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
    renderProducts,
    renderCategoryNavbar,
    renderCatalog: renderProducts,
    renderCart,
    updatePaymentMethodView,
    updateCartCount,
    openCart,
    closeCart,
    setFieldError,
    showToast,
    getFormValues,
    resetForm,
    bindOpenCart,
    bindCloseCart,
    bindPaymentChange,
    bindCheckoutSubmit,
  };
})();

// Alias para compatibilidad hacia atrás
const AppView = StoreView;

/* ============================================================
   3. CONTROLADOR (AppController)
   Orquesta la interacción de Model y View y enlace a WhatsApp
   ============================================================ */

const AppController = (() => {
  function init() {
    StoreView.init();

    // 1. Renderizar la barra sticky de navegación con categorías únicas del modelo
    const categories = storeModel.getCategories();
    StoreView.renderCategoryNavbar(categories);

    // 2. Renderizar el catálogo completo agrupado por categoría
    StoreView.renderProducts(storeModel.getProducts(), _onAddToCart);
    StoreView.updatePaymentMethodView(storeModel.getPaymentMethod());

    // 3. Vincular eventos de la interfaz
    StoreView.bindOpenCart(_onOpenCart);
    StoreView.bindCloseCart(_onCloseCart);
    StoreView.bindPaymentChange(_onPaymentChange);
    StoreView.bindCheckoutSubmit(_onCheckoutSubmit);

    // Cerrar drawer al presionar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') _onCloseCart();
    });

    // Añadir sombra sutil a la cabecera al hacer scroll
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 12);
      }, { passive: true });
    }
  }

  function _onAddToCart(productId) {
    const added = storeModel.addItem(productId);
    if (!added) return;

    _refreshCart();
    StoreView.showToast('Plato añadido a su orden');
  }

  function _onIncrement(productId) {
    storeModel.addItem(productId);
    _refreshCart();
  }

  function _onDecrement(productId) {
    storeModel.decrementItem(productId);
    _refreshCart();
  }

  function _onPaymentChange(method) {
    storeModel.setPaymentMethod(method);
    StoreView.updatePaymentMethodView(method);
  }

  function _refreshCart() {
    const items        = storeModel.getItems();
    const subtotal     = storeModel.getSubtotal();
    const shippingCost = storeModel.getShippingCost();
    const total        = storeModel.getTotal();
    const count        = storeModel.getTotalCount();

    StoreView.renderCart(items, subtotal, shippingCost, total, _onIncrement, _onDecrement);
    StoreView.updateCartCount(count);
  }

  function _onOpenCart() {
    _refreshCart();
    StoreView.openCart();
  }

  function _onCloseCart() {
    StoreView.closeCart();
  }

  function _onCheckoutSubmit() {
    const { name, address, notes, paymentMethod } = StoreView.getFormValues();

    let isValid = true;

    if (!name || name.length < 2) {
      StoreView.setFieldError('name', 'Por favor ingrese su nombre y apellido completo.');
      isValid = false;
    } else {
      StoreView.setFieldError('name', '');
    }

    if (!address || address.length < 5) {
      StoreView.setFieldError('address', 'Por favor ingrese la dirección exacta de entrega.');
      isValid = false;
    } else {
      StoreView.setFieldError('address', '');
    }

    if (!isValid) return;

    if (storeModel.isEmpty()) {
      StoreView.showToast('Su orden está vacía. Seleccione productos de la carta.');
      return;
    }

    const whatsappUrl = _buildWhatsAppURL(name, address, notes, paymentMethod);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    StoreView.showToast('Redirigiendo a WhatsApp oficial...');
  }

  /**
   * Genera el mensaje formal de confirmación para WhatsApp.
   * Totalmente libre de emojis, con estructura corporativa y codificación URI segura.
   */
  function _buildWhatsAppURL(name, address, notes, paymentMethod) {
    const items = storeModel.getItems();
    const subtotal = storeModel.getSubtotal();
    const shipping = storeModel.getShippingCost();
    const total = storeModel.getTotal();

    const toCOP = (val) =>
      new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(val);

    const separator = '────────────────────────────────';

    let message = `*SOLICITUD DE ORDEN — QUICKSYNC*\n`;
    message += `${separator}\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Dirección de Entrega:* ${address}\n`;
    if (notes) {
      message += `*Observaciones / Notas:* ${notes}\n`;
    }
    message += `\n*DETALLE DE LA ORDEN:*\n`;

    items.forEach(({ product, quantity }) => {
      const lineSubtotal = toCOP(product.price * quantity);
      message += `• ${quantity}x ${product.name} — ${lineSubtotal}\n`;
    });

    message += `\n*Subtotal:* ${toCOP(subtotal)}\n`;
    message += `*Servicio de Entrega:* ${toCOP(shipping)}\n`;
    message += `*TOTAL A LIQUIDAR:* ${toCOP(total)}\n\n`;

    if (paymentMethod === 'transfer') {
      message += `*Modalidad de Pago:* Transferencia electrónica (Nequi / Breb)\n`;
      message += `_Adjunto constancia de transferencia bancaria a continuación._\n`;
    } else {
      message += `*Modalidad de Pago:* Efectivo contra entrega\n`;
    }

    message += `${separator}\n`;
    message += `_Orden generada desde QuickSync Web_`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }

  return { init };
})();

/* ============================================================
   ARRANQUE DE LA APLICACIÓN
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  AppController.init();
});
