/* =============================================================
   BAKI AUTOMOTORES — Lógica principal (main.js)
   Catálogo dinámico · Filtros instantáneos · Ficha (modal) ·
   Navbar · Menú móvil · Animaciones (GSAP + AOS)
   ============================================================= */
(() => {
  'use strict';

  /* Atajos de selección */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* Referencias a nodos del DOM */
  const grilla        = $('#catalogo-grilla');
  const resultadoTxt  = $('#filtros-resultado');
  const modal         = $('#modal-ficha');
  const modalCaja     = $('#modal-ficha .modal-baki__caja');

  const NUM_WSP = '5492215551234';

  /* Formatea un número como precio en pesos argentinos */
  const fmtPrecio = (n) => '$ ' + n.toLocaleString('es-AR');
  /* Formatea el kilometraje */
  const fmtKm = (n) => n.toLocaleString('es-AR') + ' km';

  /* ===========================================================
     1. RENDER DEL CATÁLOGO
     =========================================================== */

  /* Genera el HTML de una tarjeta de vehículo */
  function tarjetaHTML(v) {
    const fallback = `imgFallback('${(v.marca + ' ' + v.modelo).replace(/'/g, '')}')`;
    return `
      <article class="tarjeta" data-aos="fade-up">
        <div class="tarjeta__foto" data-ver="${v.id}" role="button" tabindex="0"
             aria-label="Ver ficha de ${v.marca} ${v.modelo} ${v.anio}">
          <img src="${v.img}" alt="${v.marca} ${v.modelo} ${v.anio}" loading="lazy" decoding="async"
               width="800" height="500" onerror="this.onerror=null;this.src=${fallback}">
          <span class="tarjeta__tipo ${v.tipo === 'moto' ? 'moto' : ''}">${v.tipo === 'moto' ? 'Moto' : 'Auto'}</span>
          <span class="tarjeta__anio">${v.anio}</span>
        </div>
        <div class="tarjeta__cuerpo">
          <span class="tarjeta__marca">${v.marca}</span>
          <h3 class="tarjeta__modelo">${v.modelo}</h3>
          <p class="tarjeta__version">${v.version}</p>

          <div class="tarjeta__specs">
            <span class="tarjeta__spec"><i class="fa-solid fa-gauge-high"></i>${fmtKm(v.km)}</span>
            <span class="tarjeta__spec"><i class="fa-solid fa-gas-pump"></i>${v.combustible}</span>
            <span class="tarjeta__spec"><i class="fa-solid fa-gears"></i>${v.caja.split(' ')[0]}</span>
            <span class="tarjeta__spec"><i class="fa-solid fa-palette"></i>${v.color}</span>
          </div>

          <div class="tarjeta__pie">
            <div class="tarjeta__precio">
              <span>Precio</span>
              <strong>${fmtPrecio(v.precio)}</strong>
            </div>
            <button class="btn-baki btn-oscuro" data-ver="${v.id}">
              Ver ficha <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </article>`;
  }

  /* Pinta un listado de vehículos en la grilla */
  function renderCatalogo(lista) {
    if (!lista.length) {
      grilla.innerHTML = `
        <div class="sin-resultados">
          <i class="fa-solid fa-car-on"></i>
          <h3>No encontramos vehículos</h3>
          <p>Probá ajustar o limpiar los filtros de búsqueda.</p>
        </div>`;
    } else {
      grilla.innerHTML = lista.map(tarjetaHTML).join('');
    }
    resultadoTxt.innerHTML = `<strong>${lista.length}</strong> ${lista.length === 1 ? 'vehículo' : 'vehículos'} disponibles`;

    /* Refresca AOS para animar las tarjetas recién insertadas */
    if (window.AOS) AOS.refreshHard();
  }

  /* ===========================================================
     2. FILTROS
     =========================================================== */
  const filtro = {
    q:      $('#f-buscar'),
    marca:  $('#f-marca'),
    tipo:   $('#f-tipo'),
    caja:   $('#f-caja'),
    comb:   $('#f-combustible'),
    pmin:   $('#f-precio-min'),
    pmax:   $('#f-precio-max'),
    anio:   $('#f-anio'),
    km:     $('#f-km'),
  };

  /* Rellena los <select> con los valores únicos del dataset */
  function poblarFiltros() {
    const unicos = (campo) => [...new Set(VEHICULOS.map(v => v[campo]))].sort();

    // Marca
    unicos('marca').forEach(m => filtro.marca.add(new Option(m, m)));
    // Caja (por tipo de transmisión general)
    const cajas = [...new Set(VEHICULOS.map(v => v.caja.includes('Manual') || v.caja.includes('Semi') ? 'Manual' : 'Automática'))];
    cajas.sort().forEach(c => filtro.caja.add(new Option(c, c)));
    // Combustible
    unicos('combustible').forEach(c => filtro.comb.add(new Option(c, c)));
    // Año (descendente)
    [...new Set(VEHICULOS.map(v => v.anio))].sort((a, b) => b - a)
      .forEach(a => filtro.anio.add(new Option(a, a)));
  }

  /* Aplica todos los filtros y vuelve a renderizar */
  function aplicarFiltros() {
    const q     = filtro.q.value.trim().toLowerCase();
    const marca = filtro.marca.value;
    const tipo  = filtro.tipo.value;
    const caja  = filtro.caja.value;
    const comb  = filtro.comb.value;
    const pmin  = parseFloat(filtro.pmin.value) || 0;
    const pmax  = parseFloat(filtro.pmax.value) || Infinity;
    const anio  = filtro.anio.value;
    const kmMax = parseFloat(filtro.km.value) || Infinity;

    const filtrados = VEHICULOS.filter(v => {
      const texto = `${v.marca} ${v.modelo} ${v.version} ${v.color}`.toLowerCase();
      const esManual = v.caja.includes('Manual') || v.caja.includes('Semi');
      const cajaCat = esManual ? 'Manual' : 'Automática';

      return (!q     || texto.includes(q)) &&
             (!marca || v.marca === marca) &&
             (!tipo  || v.tipo === tipo) &&
             (!caja  || cajaCat === caja) &&
             (!comb  || v.combustible === comb) &&
             (!anio  || v.anio === parseInt(anio)) &&
             (v.precio >= pmin && v.precio <= pmax) &&
             (v.km <= kmMax);
    });

    renderCatalogo(filtrados);
  }

  /* Limpia todos los filtros y muestra el catálogo completo */
  function limpiarFiltros() {
    Object.values(filtro).forEach(el => { el.value = ''; });
    renderCatalogo(VEHICULOS);
  }

  /* Escucha en tiempo real (sin recargar la página) */
  function activarFiltros() {
    Object.values(filtro).forEach(el => {
      const evento = (el.tagName === 'SELECT') ? 'change' : 'input';
      el.addEventListener(evento, aplicarFiltros);
    });
    $('#btn-limpiar').addEventListener('click', limpiarFiltros);
  }

  /* ===========================================================
     3. FICHA / MODAL
     =========================================================== */

  /* Construye una lista de "chips" a partir de un array */
  const chips = (arr) => arr.map(x => `<span class="chip"><i class="fa-solid fa-check"></i>${x}</span>`).join('');

  /* Devuelve el mensaje de WhatsApp para un vehículo */
  function linkWsp(v) {
    const msg = `Hola BAKI AUTOMOTORES 👋, me interesa el ${v.marca} ${v.modelo} ${v.anio} (${fmtPrecio(v.precio)}). ¿Sigue disponible?`;
    return `https://wa.me/${NUM_WSP}?text=${encodeURIComponent(msg)}`;
  }

  /* Genera y muestra la ficha completa de un vehículo */
  function abrirFicha(id) {
    const v = VEHICULOS.find(x => x.id === id);
    if (!v) return;

    const fallback = imgFallback(`${v.marca} ${v.modelo}`);
    const errAttr = `onerror="this.onerror=null;this.src='${fallback}'"`;

    const hayVarias = v.galeria.length > 1;

    // Slides deslizables (una imagen por vista)
    const slides = v.galeria.map((src, i) => `
      <img class="ficha__slide" src="${src}" alt="${v.marca} ${v.modelo} foto ${i + 1}"
           decoding="async" ${i === 0 ? '' : 'loading="lazy"'} ${errAttr}>`).join('');

    // Puntos indicadores (uno por foto)
    const dots = v.galeria.map((_, i) => `
      <button class="ficha__dot ${i === 0 ? 'activo' : ''}" data-ir="${i}" aria-label="Ir a la foto ${i + 1}"></button>`).join('');

    // Miniaturas clickeables
    const minis = v.galeria.map((src, i) => `
      <img src="${src}" alt="Miniatura ${i + 1}" class="${i === 0 ? 'activa' : ''}"
           data-ir="${i}" loading="lazy" decoding="async" ${errAttr}>`).join('');

    modalCaja.innerHTML = `
      <button class="modal-baki__cerrar" data-cerrar aria-label="Cerrar ficha">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Galería deslizable (swipe lateral) -->
      <div class="ficha__galeria">
        <div class="ficha__visor">
          <div class="ficha__carrusel" id="ficha-carrusel">${slides}</div>
          ${hayVarias ? `
          <button class="ficha__nav ficha__nav--prev" data-nav="-1" aria-label="Foto anterior"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="ficha__nav ficha__nav--next" data-nav="1" aria-label="Foto siguiente"><i class="fa-solid fa-chevron-right"></i></button>
          <div class="ficha__dots" id="ficha-dots">${dots}</div>` : ''}
        </div>
        ${hayVarias ? `<div class="ficha__miniaturas">${minis}</div>` : ''}
      </div>

      <div class="ficha__cuerpo">
        <!-- Encabezado -->
        <header class="ficha__encab">
          <div>
            <span class="ficha__marca">${v.marca} · ${v.tipo === 'moto' ? 'Moto' : 'Auto'}</span>
            <h2 class="ficha__modelo">${v.modelo}</h2>
            <p class="ficha__version">${v.version} · ${v.anio}</p>
          </div>
          <div class="ficha__precio">
            <span>Precio</span>
            <strong>${fmtPrecio(v.precio)}</strong>
          </div>
        </header>

        <!-- Datos técnicos principales -->
        <div class="ficha__datos">
          ${dato('Año', v.anio)}
          ${dato('Kilometraje', fmtKm(v.km))}
          ${dato('Motor', v.motor)}
          ${dato('Potencia', v.potencia)}
          ${dato('Caja', v.caja)}
          ${dato('Combustible', v.combustible)}
          ${dato('Tracción', v.traccion)}
          ${dato('Color', v.color)}
          ${dato('Dueños', v.duenos)}
          ${dato('Patente', v.patente)}
          ${dato('Estado', v.estado)}
          ${dato('Ubicación', v.ubicacion)}
        </div>

        <!-- Bloques descriptivos -->
        <div class="ficha__bloques">
          ${bloque('fa-list-check', 'Equipamiento', `<div class="chips">${chips(v.equipamiento)}</div>`)}
          ${bloque('fa-shield-halved', 'Seguridad', `<div class="chips">${chips(v.seguridad)}</div>`)}
          ${bloque('fa-star', 'Confort', `<div class="chips">${chips(v.confort)}</div>`)}
          ${bloque('fa-comment-dots', 'Observaciones', `<p>${v.observaciones}</p>`)}
        </div>

        <!-- Pie con CTA de WhatsApp -->
        <div class="ficha__pie">
          <div class="precio-pie">
            <span>${v.marca} ${v.modelo} ${v.anio}</span>
            <strong>${fmtPrecio(v.precio)}</strong>
          </div>
          <a class="btn-baki btn-wsp" href="${linkWsp(v)}" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> Consultar por WhatsApp
          </a>
        </div>
      </div>`;

    /* Carrusel deslizable: swipe nativo + flechas + miniaturas + puntos */
    activarCarrusel();

    /* Botón cerrar */
    $('[data-cerrar]', modalCaja).addEventListener('click', cerrarFicha);

    /* Mostrar modal */
    modal.classList.add('abierto');
    document.body.classList.add('sin-scroll');
    modalCaja.scrollTop = 0;
  }

  /* Activa el carrusel de fotos de la ficha.
     - Swipe lateral: nativo, vía overflow-x + scroll-snap (funciona con el dedo).
     - Flechas, miniaturas y puntos: navegan entre fotos.
     - Al deslizar, se actualiza el punto/miniatura activos. */
  function activarCarrusel() {
    const carrusel = $('#ficha-carrusel', modalCaja);
    if (!carrusel) return;
    const slides = $$('.ficha__slide', carrusel);
    const dots   = $$('.ficha__dot', modalCaja);
    const minis  = $$('.ficha__miniaturas img', modalCaja);
    let actual = 0;

    // Marca la foto activa en puntos y miniaturas
    const marcar = (i) => {
      dots.forEach((d, k) => d.classList.toggle('activo', k === i));
      minis.forEach((m, k) => m.classList.toggle('activa', k === i));
    };

    // Desplaza el carrusel hasta la foto indicada
    const irA = (i) => {
      actual = Math.max(0, Math.min(i, slides.length - 1));
      carrusel.scrollTo({ left: actual * carrusel.clientWidth, behavior: 'smooth' });
      marcar(actual);
    };

    // Flechas (prev/next)
    $$('.ficha__nav', modalCaja).forEach(btn =>
      btn.addEventListener('click', () => irA(actual + parseInt(btn.dataset.nav, 10))));

    // Puntos y miniaturas → van directo a esa foto
    [...dots, ...minis].forEach(el =>
      el.addEventListener('click', () => irA(parseInt(el.dataset.ir, 10))));

    // Click en una foto → abre el visor ampliado (lightbox) en esa foto
    slides.forEach((img, i) =>
      img.addEventListener('click', () => abrirLightbox(slides.map(s => s.getAttribute('src')), actual)));

    // Al deslizar con el dedo, detecta la foto visible y actualiza indicadores
    let t;
    carrusel.addEventListener('scroll', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const i = Math.round(carrusel.scrollLeft / carrusel.clientWidth);
        if (i !== actual) { actual = i; marcar(i); }
      }, 80);
    }, { passive: true });
  }

  /* ===========================================================
     3b. VISOR AMPLIADO (LIGHTBOX)
     Foto grande a pantalla completa, deslizable (swipe) + flechas.
     =========================================================== */
  const LB = { el: null, carrusel: null, contador: null, total: 0, actual: 0, t: null };

  /* Crea el lightbox una sola vez y lo reutiliza */
  function crearLightbox() {
    if (LB.el) return;
    const el = document.createElement('div');
    el.className = 'lightbox';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Foto ampliada');
    el.innerHTML = `
      <div class="lightbox__carrusel" id="lightbox-carrusel"></div>
      <button class="lightbox__nav lightbox__nav--prev" data-lb-nav="-1" aria-label="Foto anterior"><i class="fa-solid fa-chevron-left"></i></button>
      <button class="lightbox__nav lightbox__nav--next" data-lb-nav="1" aria-label="Foto siguiente"><i class="fa-solid fa-chevron-right"></i></button>
      <div class="lightbox__contador" id="lightbox-contador"></div>
      <button class="lightbox__cerrar" data-lb-cerrar aria-label="Cerrar"><i class="fa-solid fa-xmark"></i></button>`;
    document.body.appendChild(el);

    LB.el       = el;
    LB.carrusel = $('#lightbox-carrusel', el);
    LB.contador = $('#lightbox-contador', el);

    // Cerrar: botón, o click fuera de la imagen
    $('[data-lb-cerrar]', el).addEventListener('click', cerrarLightbox);
    LB.carrusel.addEventListener('click', (e) => {
      if (e.target === LB.carrusel || e.target.classList.contains('lightbox__slide')) cerrarLightbox();
    });

    // Flechas
    $$('.lightbox__nav', el).forEach(btn =>
      btn.addEventListener('click', () => lbIrA(LB.actual + parseInt(btn.dataset.lbNav, 10))));

    // Al deslizar, actualiza el contador
    LB.carrusel.addEventListener('scroll', () => {
      clearTimeout(LB.t);
      LB.t = setTimeout(() => {
        const i = Math.round(LB.carrusel.scrollLeft / LB.carrusel.clientWidth);
        if (i !== LB.actual) { LB.actual = i; lbMarcar(); }
      }, 80);
    }, { passive: true });
  }

  /* Abre el visor con un array de imágenes en el índice indicado */
  function abrirLightbox(imgs, indice = 0) {
    if (!imgs || !imgs.length) return;
    crearLightbox();
    LB.total  = imgs.length;
    LB.actual = Math.max(0, Math.min(indice, imgs.length - 1));

    LB.carrusel.innerHTML = imgs.map((src, i) => `
      <div class="lightbox__slide"><img src="${src}" alt="Foto ${i + 1}" decoding="async" ${i === 0 ? '' : 'loading="lazy"'}></div>`).join('');

    // Oculta flechas si hay una sola foto
    const varias = imgs.length > 1;
    $$('.lightbox__nav', LB.el).forEach(b => b.style.display = varias ? '' : 'none');

    LB.el.classList.add('abierto');
    document.body.classList.add('sin-scroll');
    lbMarcar();
    // Salta a la foto pedida (sin animación) una vez pintado
    requestAnimationFrame(() => {
      LB.carrusel.scrollLeft = LB.actual * LB.carrusel.clientWidth;
    });
  }

  /* Actualiza el contador "n / total" */
  function lbMarcar() {
    if (LB.contador) LB.contador.textContent = `${LB.actual + 1} / ${LB.total}`;
  }

  /* Desplaza el visor a una foto */
  function lbIrA(i) {
    LB.actual = Math.max(0, Math.min(i, LB.total - 1));
    LB.carrusel.scrollTo({ left: LB.actual * LB.carrusel.clientWidth, behavior: 'smooth' });
    lbMarcar();
  }

  /* Cierra el visor ampliado */
  function cerrarLightbox() {
    if (!LB.el) return;
    LB.el.classList.remove('abierto');
    // Si la ficha sigue abierta, mantené el scroll bloqueado
    if (!modal.classList.contains('abierto')) document.body.classList.remove('sin-scroll');
  }

  /* True si el visor ampliado está abierto */
  const lightboxAbierto = () => LB.el && LB.el.classList.contains('abierto');

  /* Bloque de dato simple (label + valor) */
  const dato = (label, valor) => `
    <div class="dato"><span>${label}</span><strong>${valor}</strong></div>`;

  /* Bloque descriptivo con ícono */
  const bloque = (icono, titulo, contenido) => `
    <div class="bloque">
      <h4><i class="fa-solid ${icono}"></i>${titulo}</h4>
      ${contenido}
    </div>`;

  /* Cierra el modal */
  function cerrarFicha() {
    modal.classList.remove('abierto');
    document.body.classList.remove('sin-scroll');
  }

  /* Delegación de eventos: botones "Ver ficha" + cierre por fondo/ESC */
  function activarFicha() {
    grilla.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-ver]');
      if (btn) abrirFicha(parseInt(btn.dataset.ver));
    });
    /* Accesibilidad: abrir ficha con Enter/Espacio sobre la foto */
    grilla.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = e.target.closest('.tarjeta__foto[data-ver]');
      if (el) { e.preventDefault(); abrirFicha(parseInt(el.dataset.ver)); }
    });
    modal.addEventListener('click', (e) => { if (e.target === modal) cerrarFicha(); });
    document.addEventListener('keydown', (e) => {
      if (lightboxAbierto()) {
        if (e.key === 'Escape') cerrarLightbox();
        else if (e.key === 'ArrowLeft')  lbIrA(LB.actual - 1);
        else if (e.key === 'ArrowRight') lbIrA(LB.actual + 1);
        return;
      }
      if (e.key === 'Escape') cerrarFicha();
    });
  }

  /* ===========================================================
     4. NAVBAR + MENÚ MÓVIL
     =========================================================== */
  function activarNavbar() {
    const navbar    = $('#navbar');
    const hamb      = $('#hamburguesa');
    const menu      = $('#menu-movil');
    const overlay   = $('#overlay-menu');

    /* Cambia el estilo de la navbar al hacer scroll */
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Abre / cierra el menú móvil */
    const toggleMenu = (abrir) => {
      hamb.classList.toggle('abierto', abrir);
      menu.classList.toggle('abierto', abrir);
      overlay.classList.toggle('activo', abrir);
      document.body.classList.toggle('sin-scroll', abrir);
    };
    hamb.addEventListener('click', () => toggleMenu(!menu.classList.contains('abierto')));
    overlay.addEventListener('click', () => toggleMenu(false));
    $$('#menu-movil a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  }

  /* ===========================================================
     5. HERO — estelas de luz + animación GSAP
     =========================================================== */
  function generarEstelas() {
    const cont = $('#hero-estelas');
    if (!cont) return;
    const total = window.innerWidth < 768 ? 5 : 8;
    for (let i = 0; i < total; i++) {
      const e = document.createElement('span');
      e.className = 'estela ' + (Math.random() > .5 ? 'roja' : 'blanca');
      e.style.top = `${10 + Math.random() * 80}%`;
      e.style.width = `${80 + Math.random() * 180}px`;
      e.style.animationDuration = `${3 + Math.random() * 4}s`;
      e.style.animationDelay = `${Math.random() * 6}s`;
      cont.appendChild(e);
    }
  }

  /* Pausa las animaciones del hero cuando queda fuera de pantalla,
     así no se repinta mientras se navega el resto de la página. */
  function activarPausaHero() {
    const hero = $('#inicio');
    if (!hero || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      hero.classList.toggle('pausa', !e.isIntersecting);
    }, { threshold: 0 });
    io.observe(hero);
  }

  function animarHero() {
    if (!window.gsap) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('#hero-badge',    { opacity: 0, y: 20, duration: .6, delay: .2 })
      .from('#hero-titulo',   { opacity: 0, x: -80, duration: 1 }, '-=.2')     // Fade In desde la izquierda
      .from('#hero-subtitulo',{ opacity: 0, x: -40, duration: .8 }, '-=.6')
      .from('#hero-acciones', { opacity: 0, y: 30, duration: .7 }, '-=.5')
      .from('#scroll-ind',    { opacity: 0, duration: .6 }, '-=.2');
  }

  /* ===========================================================
     6. INICIALIZACIÓN
     =========================================================== */
  function init() {
    /* AOS (Animate On Scroll) */
    if (window.AOS) AOS.init({ duration: 700, once: true, offset: 80, easing: 'ease-out-cubic' });

    poblarFiltros();
    renderCatalogo(VEHICULOS);
    activarFiltros();
    activarFicha();
    activarNavbar();
    generarEstelas();
    animarHero();
    activarPausaHero();

    /* Año dinámico en el footer */
    const y = $('#anio-actual');
    if (y) y.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
