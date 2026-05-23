/* Header / footer compartidos por inyección. Cada página define
   document.body.dataset.page = "ruta-actual" para activar el item del menú. */
(function(){
  const NAV = [
    {href:"index.html", label:"Inicio", page:"home"},
    {label:"Soluciones", page:"soluciones", href:"soluciones.html", children:[
      {href:"acondicionamiento-biogas.html",          label:"Acondicionamiento de biogás",   desc:"Remoción de H₂S, humedad y partículas"},
      {href:"acondicionamiento-motores-calderas.html",label:"Biogás para motores y calderas",desc:"Especificación para CHP y uso térmico"},
      {href:"upgrading-biogas.html",                  label:"Upgrading de biogás",           desc:"Separación profunda de CO₂"},
      {href:"planta-de-biometano.html",               label:"Planta de biometano",           desc:"Sistema completo en ciclo cerrado"},
      {href:"soluciones.html",                        label:"Ver todas las soluciones",      meta:true},
    ]},
    {label:"Tecnología", page:"tecnologia", children:[
      {href:"tecnologia-absorcion-quimica.html", label:"Absorción química",        desc:"Aminas en ciclo cerrado"},
      {href:"tecnologia-biodigestion.html",      label:"Biodigestión",             desc:"Producción primaria de biogás"},
      {href:"calidad-biometano.html",            label:"Calidad del biometano",    desc:"CH₄ ≥ 97 % y especificaciones"},
      {href:"monitoreo-calidad.html",            label:"Monitoreo y verificación", desc:"Analizadores en sitio"},
    ]},
    {label:"Aplicaciones", page:"aplicaciones", href:"aplicaciones.html", children:[
      {href:"biometano-industria.html",  label:"Biometano industrial", desc:"Calderas, hornos y procesos térmicos"},
      {href:"biometano-transporte.html", label:"Biometano vehicular",  desc:"GNC y GNL para flotas"},
      {href:"ducto-virtual.html",        label:"Ducto virtual",        desc:"Distribución sin red de gas"},
      {href:"aplicaciones.html",         label:"Ver todas las aplicaciones", meta:true},
    ]},
    {label:"Sectores", page:"sectores", href:"sectores.html", children:[
      {href:"sector-porcicultura.html", label:"Granjas porcinas"},
      {href:"sector-lecheria.html",     label:"Establos lecheros"},
      {href:"sector-ganaderia.html",    label:"Engorda bovina"},
      {href:"sector-residuos.html",     label:"PTAR · aguas residuales"},
      {href:"sector-agroindustria.html",label:"Agroindustria"},
      {href:"sector-alimentos.html",    label:"Industria alimentaria"},
      {href:"sector-bebidas.html",      label:"Industria de bebidas"},
      {href:"sectores.html",            label:"Ver todos los sectores", meta:true},
    ]},
    {label:"Conocimiento", page:"conocimiento", href:"conocimiento.html"},
    {label:"Empresa",      page:"empresa",      href:"empresa.html", children:[
      {href:"empresa.html",               label:"Quiénes somos",   desc:"Equipo y enfoque"},
      {href:"contacto.html",              label:"Contacto",        desc:"Canales directos"},
      {href:"preguntas-frecuentes.html",  label:"Preguntas frecuentes"},
      {href:"evaluar-proyecto.html",      label:"Evaluar proyecto", meta:true},
    ]},
  ];

  const chevron = `<svg class="nav-caret" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`;

  function renderTopItem(n, cur){
    const isActive = cur === n.page;
    if(!n.children){
      return `<li><a href="${n.href}" class="${isActive?'active':''}">${n.label}</a></li>`;
    }
    const tag = n.href ? 'a' : 'button';
    const hrefAttr = n.href ? `href="${n.href}"` : `type="button"`;
    const sub = n.children.map(c => `
      <li${c.meta?' class="is-meta"':''}>
        <a href="${c.href}">
          <span class="sub-title">${c.label}${c.meta?' <span class="sub-arrow">→</span>':''}</span>
          ${c.desc?`<span class="sub-desc">${c.desc}</span>`:''}
        </a>
      </li>`).join('');
    return `
      <li class="has-sub">
        <${tag} ${hrefAttr} class="${isActive?'active':''}">${n.label}${chevron}</${tag}>
        <div class="sub-panel" role="menu">
          <ul>${sub}</ul>
        </div>
      </li>`;
  }

  function renderDrawerItem(n, cur){
    const isActive = cur === n.page;
    if(!n.children){
      return `<li><a href="${n.href}" class="${isActive?'active':''}">${n.label}</a></li>`;
    }
    const sub = n.children.map(c => `<li><a href="${c.href}" class="${c.meta?'is-meta':''}">${c.label}</a></li>`).join('');
    return `
      <li class="has-sub-d">
        <button type="button" class="d-toggle ${isActive?'active':''}" aria-expanded="false">
          <span>${n.label}</span>${chevron}
        </button>
        <ul class="d-sub">${sub}</ul>
      </li>`;
  }

  function header(){
    const cur = document.body.dataset.page || "";
    const items = NAV.map(n => renderTopItem(n, cur)).join("");
    const drawerItems = NAV.map(n => renderDrawerItem(n, cur)).join("");
    return `
<header class="nav">
  <div class="wrap nav-in">
    <a class="brand" href="index.html"><img src="${(window.__resources&&window.__resources.logo)||'assets/logo-horizontal.png'}" alt="biometano"/></a>
    <nav><ul class="nav-list">${items}</ul></nav>
    <button class="nav-burger" type="button" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <a class="nav-li" href="https://www.linkedin.com/company/biometano-mx/" target="_blank" rel="noopener" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v14H.22V8zm7.36 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.33-2.36 4.63 0 5.49 3.05 5.49 7.02V22h-4.56v-6.18c0-1.47-.03-3.37-2.06-3.37-2.06 0-2.37 1.61-2.37 3.27V22H7.58V8z"/></svg>
    </a>
    <a class="nav-cta" href="evaluar-proyecto.html">Evaluar proyecto
      <svg class="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
    </a>
  </div>
  <div class="nav-drawer" data-open="false">
    <ul class="drawer-list">${drawerItems}</ul>
    <div class="nav-drawer-actions">
      <a class="nav-cta" href="evaluar-proyecto.html" style="width:100%; justify-content:center">Evaluar proyecto</a>
      <a class="nav-drawer-link" href="https://www.linkedin.com/company/biometano-mx/" target="_blank" rel="noopener">LinkedIn →</a>
      <a class="nav-drawer-link" href="mailto:gas@biometano.mx">gas@biometano.mx</a>
      <a class="nav-drawer-link" href="tel:+529993440904">+52 999 344 0904</a>
    </div>
  </div>
</header>`;
  }

  function injectMeta(){
    const head = document.head;
    const title = (document.title||'Biometano').replace(/\s*\|\s*Biometano$/,'').replace(/\s*·\s*Biometano$/,'');
    const desc = (document.querySelector('meta[name="description"]')||{}).content || 'Empresa mexicana especializada en plantas de biogás y biometano.';
    const base = 'https://biometano.mx/';
    const path = (location.pathname.split('/').pop() || 'index.html');
    const url = base + path;
    const ogImg = base + 'assets/og-image.png';

    const add = (sel, attrs) => {
      if (head.querySelector(sel)) return;
      const el = document.createElement(attrs.tag||'meta');
      delete attrs.tag;
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      head.appendChild(el);
    };

    // Favicon
    add('link[rel="icon"]',           {tag:'link', rel:'icon', type:'image/svg+xml', href:'assets/favicon.svg'});
    add('link[rel="apple-touch-icon"]',{tag:'link', rel:'apple-touch-icon', href:'assets/favicon.svg'});
    add('link[rel="canonical"]',      {tag:'link', rel:'canonical', href:url});

    // Open Graph
    add('meta[property="og:type"]',        {property:'og:type', content: document.body.dataset.page==='home' ? 'website' : 'article'});
    add('meta[property="og:site_name"]',   {property:'og:site_name', content:'Biometano'});
    add('meta[property="og:title"]',       {property:'og:title', content: title});
    add('meta[property="og:description"]', {property:'og:description', content: desc});
    add('meta[property="og:url"]',         {property:'og:url', content: url});
    add('meta[property="og:image"]',       {property:'og:image', content: ogImg});
    add('meta[property="og:image:width"]', {property:'og:image:width', content:'1200'});
    add('meta[property="og:image:height"]',{property:'og:image:height', content:'630'});
    add('meta[property="og:locale"]',      {property:'og:locale', content:'es_MX'});

    // Twitter
    add('meta[name="twitter:card"]',       {name:'twitter:card', content:'summary_large_image'});
    add('meta[name="twitter:title"]',      {name:'twitter:title', content: title});
    add('meta[name="twitter:description"]',{name:'twitter:description', content: desc});
    add('meta[name="twitter:image"]',      {name:'twitter:image', content: ogImg});

    // JSON-LD Organization (once, only on home)
    if (document.body.dataset.page === 'home' && !head.querySelector('script[type="application/ld+json"]')) {
      const ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.textContent = JSON.stringify({
        "@context":"https://schema.org",
        "@type":"Organization",
        "name":"Biometano",
        "url":base,
        "logo":base+"assets/logo-horizontal.png",
        "description":desc,
        "email":"gas@biometano.mx",
        "telephone":"+52-999-344-0904",
        "address":{"@type":"PostalAddress","addressCountry":"MX"},
        "sameAs":["https://www.linkedin.com/company/biometano-mx/"],
        "areaServed":"MX"
      });
      head.appendChild(ld);
    }
  }

  function footer(){
    return `
<footer>
  <div class="wrap">
    <div class="foot">
      <div>
        <div class="foot-brand"><img src="${(window.__resources&&window.__resources.logo)||'assets/logo-horizontal.png'}" alt="biometano"/></div>
        <p class="foot-desc">Empresa mexicana especializada en aprovechamiento de biogás, plantas de biometano, upgrading mediante absorción química, acondicionamiento de gas para motores y calderas, ducto virtual y valorización energética de residuos orgánicos.</p>
      </div>
      <div>
        <h5>Soluciones</h5>
        <ul>
          <li><a href="acondicionamiento-biogas.html">Acondicionamiento de biogás</a></li>
          <li><a href="acondicionamiento-motores-calderas.html">Biogás para motores y calderas</a></li>
          <li><a href="upgrading-biogas.html">Upgrading de biogás</a></li>
          <li><a href="planta-de-biometano.html">Planta de biometano</a></li>
        </ul>
      </div>
      <div>
        <h5>Tecnología</h5>
        <ul>
          <li><a href="tecnologia-absorcion-quimica.html">Absorción química</a></li>
          <li><a href="tecnologia-biodigestion.html">Biodigestión</a></li>
          <li><a href="calidad-biometano.html">Calidad del biometano</a></li>
          <li><a href="monitoreo-calidad.html">Monitoreo y verificación</a></li>
        </ul>
      </div>
      <div>
        <h5>Aplicaciones</h5>
        <ul>
          <li><a href="ducto-virtual.html">Ducto virtual</a></li>
          <li><a href="biometano-industria.html">Biometano industrial</a></li>
          <li><a href="biometano-transporte.html">Biometano vehicular</a></li>
          <li><a href="aplicaciones.html">Ver todas</a></li>
        </ul>
      </div>
      <div>
        <h5>Sectores</h5>
        <ul>
          <li><a href="sector-porcicultura.html">Granjas porcinas</a></li>
          <li><a href="sector-lecheria.html">Establos lecheros</a></li>
          <li><a href="sector-residuos.html">PTAR</a></li>
          <li><a href="sectores.html">Ver todos</a></li>
        </ul>
      </div>
      <div>
        <h5>Empresa</h5>
        <ul>
          <li><a href="empresa.html">Quiénes somos</a></li>
          <li><a href="contacto.html">Contacto</a></li>
          <li><a href="conocimiento.html">Conocimiento</a></li>
          <li><a href="preguntas-frecuentes.html">FAQ</a></li>
          <li><a href="evaluar-proyecto.html">Evaluar proyecto</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-contact">
      <div><span class="foot-label">Teléfono</span><a href="tel:+529993440904">+52 999 344 0904</a></div>
      <div><span class="foot-label">Correo</span><a href="mailto:gas@biometano.mx">gas@biometano.mx</a></div>
      <div><span class="foot-label">LinkedIn</span><a href="https://www.linkedin.com/company/biometano-mx/" target="_blank" rel="noopener">linkedin.com/company/biometano-mx</a></div>
      <div><span class="foot-label">Sede</span><span>México</span></div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 biometano · México · Empresa especializada en gas natural renovable</span>
      <span class="foot-legal">
        <a href="aviso-privacidad.html">Aviso de privacidad</a>
        <span aria-hidden="true">·</span>
        <a href="terminos.html">Términos</a>
        <span aria-hidden="true">·</span>
        <a href="contacto.html">Contacto</a>
      </span>
    </div>
  </div>
</footer>
<a class="wa" href="https://wa.me/529993440904" target="_blank" rel="noopener" aria-label="Hablar por WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 3.5A10.5 10.5 0 0 0 3.5 17L2 22l5.2-1.4A10.5 10.5 0 1 0 20 3.5Zm-8 18.1a8.6 8.6 0 0 1-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.6 8.6 0 1 1 7.2 3.9Zm4.8-6.4c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1.1-.3.2-.5.1a7 7 0 0 1-3.4-3c-.3-.4.3-.4.8-1.3.1-.2 0-.3 0-.5s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c2.7 1 2.7.7 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>
  Hablar con un especialista
</a>`;
  }

  // Inject placeholders
  document.addEventListener('DOMContentLoaded', () => {
    injectMeta();
    const h = document.querySelector('[data-slot="header"]');
    const f = document.querySelector('[data-slot="footer"]');
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();

    // burger menu
    const burger = document.querySelector('.nav-burger');
    const drawer = document.querySelector('.nav-drawer');
    if (burger && drawer) {
      burger.addEventListener('click', () => {
        const open = drawer.getAttribute('data-open') === 'true';
        drawer.setAttribute('data-open', open ? 'false' : 'true');
        burger.setAttribute('aria-expanded', open ? 'false' : 'true');
        burger.classList.toggle('is-open', !open);
        document.body.style.overflow = open ? '' : 'hidden';
      });
      drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        drawer.setAttribute('data-open', 'false');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }));
      // drawer sub-toggles
      drawer.querySelectorAll('.d-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
          const li = btn.parentElement;
          const open = li.classList.toggle('is-open');
          btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
      });
    }

    // Desktop dropdown — close any open panel on outside click / Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.has-sub.is-open').forEach(li => li.classList.remove('is-open'));
      }
    });

    // reveal observer
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target);} });
    },{threshold:0.12});
    document.querySelectorAll('section .sec-head, .hub-card, .flow-node, .fit-card, .cover-img, .tech-table, .related a, .var, .anal-card').forEach(el=>{ el.classList.add('reveal'); io.observe(el); });

    // Lazy-load all imgs that don't have an explicit loading attribute (skip first hero img)
    const imgs = document.querySelectorAll('img:not([loading])');
    imgs.forEach((img, i) => { if (i > 0) img.setAttribute('loading','lazy'); img.setAttribute('decoding','async'); });

    // Back-to-top button
    const btt = document.createElement('button');
    btt.className = 'btt';
    btt.type = 'button';
    btt.setAttribute('aria-label','Volver arriba');
    btt.innerHTML = '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 12V2M2 7l5-5 5 5"/></svg>';
    document.body.appendChild(btt);
    btt.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
    const toggleBtt = () => btt.classList.toggle('on', window.scrollY > 600);
    window.addEventListener('scroll', toggleBtt, {passive:true});
    toggleBtt();
  });
})();
