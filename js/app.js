/* ============================================================================
   APP.JS — Renderização das telas + comportamento
   ----------------------------------------------------------------------------
   Sumário
   1. Setup, idioma e utilitários
   2. Renderização: cabeçalho e telas (Início, Work, Journey, Skills, Contact)
   3. Navegação: rolagem suave, seção ativa
   4. Animações de entrada (reveal)
   5. Journey: itens expansíveis
   6. Cases: roteamento por hash + página interna
   7. Ações: copiar, LinkedIn pendente, toast, imagem ampliada
   8. Init
   ============================================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. SETUP
     -------------------------------------------------------------------------- */
  const RAW = window.PORTFOLIO;
  const UI = window.UI;
  if (!RAW || !UI) {
    console.error('[portfolio] content.js ou components.js não foram carregados.');
    return;
  }

  const { esc, md, icon, str: t } = UI;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const behavior = () => (reduceMotion.matches ? 'auto' : 'smooth');

  /* ---------- Idioma ----------
     D = conteúdo já traduzido para o idioma atual (gerado a partir de content.js). */
  const LANGS = ['pt', 'en'];
  const LANG_KEY = 'mp-portfolio-lang';
  let lang = 'pt';
  let D = null;

  const storedLang = () => {
    try { return localStorage.getItem(LANG_KEY); } catch (_) { return null; }
  };
  const storeLang = (l) => {
    try { localStorage.setItem(LANG_KEY, l); } catch (_) { /* navegação privada */ }
  };
  /** ?lang=en na URL > escolha salva > idioma do navegador > padrão do content.js. */
  function initialLang() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(fromUrl)) return fromUrl;
    const saved = storedLang();
    if (LANGS.includes(saved)) return saved;
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    if (/^pt/i.test(nav)) return 'pt';
    if (/^en/i.test(nav)) return 'en';
    return RAW.settings.defaultLang || 'pt';
  }

  function applyLang(l) {
    lang = l;
    D = UI.localize(RAW, l);
    UI.setStrings(D.strings);
    root.lang = l === 'pt' ? 'pt-BR' : 'en';
    document.title = caseState.open && caseState.id ? caseTitle(caseState.id) : t('pageTitle');
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('pageDescription'));
    $$('meta[property="og:locale"]').forEach((m) => m.setAttribute('content', l === 'pt' ? 'pt_BR' : 'en_US'));
    // Textos fixos do index.html (data-i18n = texto, data-i18n-aria = aria-label)
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
  }

  /** Seletor PT / EN (usado no cabeçalho e na barra do case). */
  const langSwitch = () => `
    <div class="lang" role="group" aria-label="${esc(t('language'))}">
      ${LANGS.map((l) => `<button class="lang__btn" type="button" data-lang="${l}" lang="${l === 'pt' ? 'pt-BR' : 'en'}"
        aria-pressed="${l === lang}" aria-label="${l === 'pt' ? 'Português' : 'English'}">${l.toUpperCase()}</button>`).join('<span class="lang__sep" aria-hidden="true">/</span>')}
    </div>`;

  /** Converte <i data-lucide> em SVG (se a biblioteca carregou). */
  const refreshIcons = () => {
    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons({ icons: window.lucide.icons, attrs: { 'stroke-width': 1.75 } });
    }
  };

  const mailtoHref = () =>
    `mailto:${D.contact.email}?subject=${encodeURIComponent(D.contact.emailSubject || '')}`;
  const waHref = () =>
    `https://wa.me/${D.contact.whatsapp}?text=${encodeURIComponent(D.contact.whatsappMessage || '')}`;

  /* --------------------------------------------------------------------------
     2. RENDERIZAÇÃO
     -------------------------------------------------------------------------- */
  function renderChrome() {
    const P = D.profile;
    $('#site-header').innerHTML = `
      <div class="site-header__inner">
        <a class="brand" href="#home" aria-label="${esc(P.name)}, ${esc(t('backHome'))}">
          <span class="brand__full">${esc(P.name)}</span><span class="brand__short" aria-hidden="true">${esc(P.monogram)}</span>
        </a>
        <nav class="nav" id="site-nav" aria-label="${esc(t('sections'))}">
          ${D.nav.filter((n) => !n.hidden).map((n) => `<a class="nav__link" href="#${n.id}" data-nav="${n.id}">${esc(n.label)}</a>`).join('')}
        </nav>
        ${langSwitch()}
      </div>`;
    $('#case-lang').innerHTML = langSwitch();
  }

  /* ---------- INÍCIO ---------- */
  function renderHome() {
    const P = D.profile;
    const C = D.contact;
    // Empresas por onde passou, sem repetir, da mais recente para a mais antiga.
    const companies = [...new Set(D.journey.items.map((j) => j.company))];

    $('#home').innerHTML = `
      <div class="intro">
        <div class="intro__id reveal">
          ${P.photo ? `<img class="intro__photo" src="${esc(P.photo)}" alt="${esc(P.photoAlt)}">` : ''}
          <h1 class="intro__name">${esc(P.name)}</h1>
          <p class="intro__role">${esc(P.role)}</p>
          <p class="intro__status"><span class="dot" aria-hidden="true"></span>${esc(P.status.text)}</p>
        </div>
        <div class="intro__main">
          <p class="statement reveal" style="--d:1">${md(P.statement || P.tagline)}</p>
          <ul class="link-row reveal" style="--d:2" aria-label="${esc(t('contactLinks'))}">
            <li><a href="${esc(mailtoHref())}">${esc(C.email)}</a></li>
            <li><a href="${esc(waHref())}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li>${C.linkedin
              ? `<a href="${esc(C.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`
              : `<button class="link-btn" type="button" data-action="linkedin-pending">LinkedIn <span class="soon">${esc(t('soon'))}</span></button>`}</li>
          </ul>
          <ul class="companies reveal" style="--d:3" aria-label="${esc(t('companies'))}">
            ${companies.map((c) => `<li>${esc(c)}</li>`).join('')}
          </ul>
        </div>
      </div>`;
  }

  /* ---------- WORK ---------- */
  function renderProjects() {
    const S = D.screens.projects;
    $('#projects').innerHTML = `
      ${UI.screenHead({ id: 'projects-title', ...S })}
      <div class="work-grid">${D.projects.map((p, i) => UI.projectCard(p, i)).join('')}</div>`;
  }

  /* ---------- JOURNEY ---------- */
  /** Conteúdo expandido da experiência: mostra só o que existe;
      se não houver nada, exibe placeholders identificados. */
  function expPanel(j) {
    const id = `journey/${j.id}`;
    const has = (a) => Array.isArray(a) && a.length > 0;
    const list = (items, label) => `
      <div class="block block--list"><h4 class="block__title">${label}</h4>
        <ul class="check-list">${items.map((i) => `<li>${icon('check')}<span>${md(i)}</span></li>`).join('')}</ul>
      </div>`;

    if (!j.description && !has(j.responsibilities) && !has(j.highlights)) {
      return UI.slot({ expects: 'text', label: t('aboutRole') }, `${id}/description`, { compact: true })
        + UI.slot({ expects: 'list', label: t('responsibilities') }, `${id}/responsibilities`, { compact: true });
    }
    return [
      has(j.tags) ? `<p class="tl-tags">${j.tags.map((t) => esc(t.label)).join(' · ')}</p>` : '',
      j.description ? `<p class="tl-summary">${md(j.description)}</p>` : '',
      has(j.responsibilities) ? list(j.responsibilities, esc(t('whatIDid'))) : '',
      has(j.highlights) ? list(j.highlights, esc(t('highlightsTitle'))) : '',
    ].join('');
  }

  function renderJourney() {
    const S = D.screens.journey;
    const J = D.journey;
    const showDur = D.settings.showDurations !== false;

    $('#journey').innerHTML = `
      ${UI.screenHead({ id: 'journey-title', ...S })}
      <div class="sec-body">
        <ul class="highlights">
          ${J.highlights.map((h, i) => `
            <li class="highlight reveal" style="--d:${i}">
              <h3>${esc(h.title)}</h3>${h.text ? `<p>${md(h.text)}</p>` : ''}
            </li>`).join('')}
        </ul>
        <div class="list-toolbar reveal">
          <span>${J.items.length} ${esc(t('rolesCount'))}</span>
          <button class="link-btn" type="button" data-action="expand-all" aria-pressed="false"><span>${esc(t('expandAll'))}</span></button>
        </div>
        <ol class="timeline">
          ${J.items.map((j, i) => {
            const dur = showDur ? UI.duration(j) : '';
            return `
            <li class="tl-item reveal ${j.current ? 'is-current' : ''}" id="exp-${esc(j.id)}" style="--d:${i}">
              <h3 class="tl-heading">
                <button class="tl-trigger" type="button" id="exp-${esc(j.id)}-btn" aria-expanded="false" aria-controls="exp-${esc(j.id)}-panel">
                  <span class="tl-period">${esc(UI.periodLabel(j))}</span>
                  <span class="tl-main">
                    <span class="tl-company">${esc(j.company)}${j.current ? `<span class="dot" aria-hidden="true"></span><span class="sr-only"> (${esc(t('current'))})</span>` : ''}</span>
                    <span class="tl-role">${esc(j.role)}</span>
                  </span>
                  <span class="tl-dur">${esc(dur)}</span>
                  <span class="tl-toggle" aria-hidden="true"></span>
                </button>
              </h3>
              <div class="tl-panel" id="exp-${esc(j.id)}-panel" role="region" aria-labelledby="exp-${esc(j.id)}-btn" inert>
                <div class="tl-panel__inner"><div class="tl-panel__grid">${expPanel(j)}</div></div>
              </div>
            </li>`;
          }).join('')}
        </ol>
      </div>`;
  }

  /* ---------- SKILLS ---------- */
  function renderSkills() {
    const S = D.screens.skills;
    $('#skills').innerHTML = `
      ${UI.screenHead({ id: 'skills-title', ...S })}
      <div class="sec-body">
        <div class="skills-grid">
          ${D.skills.map((g, i) => `
            <section class="skill-group reveal" style="--d:${i}" aria-labelledby="skill-${esc(g.id)}">
              <h3 id="skill-${esc(g.id)}">${esc(g.title)}</h3>
              <ul>${g.items.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
            </section>`).join('')}
        </div>
      </div>`;
  }

  /* ---------- CONTACT ---------- */
  function renderContact() {
    const C = D.contact;
    const S = D.screens.contact;
    const P = D.profile;
    const copyBtn = (value, label, aria) =>
      `<button class="link-btn link-btn--muted" type="button" data-copy="${esc(value)}" data-copy-label="${esc(label)}" aria-label="${esc(aria)}">${esc(t('copy'))}</button>`;

    $('#contact').innerHTML = `
      <div class="contact">
        <h2 id="contact-title" class="contact__title reveal">${md(S.title)}</h2>
        <p class="contact__text reveal" style="--d:1">${md(S.text)}</p>
        <dl class="contact-list reveal" style="--d:2">
          <div>
            <dt>${esc(t('email'))}</dt>
            <dd><a href="${esc(mailtoHref())}">${esc(C.email)}</a>${copyBtn(C.email, t('emailCopied'), t('copyEmail'))}</dd>
          </div>
          <div>
            <dt>${esc(t('phone'))}</dt>
            <dd><a href="tel:${esc(C.phoneE164)}">${esc(C.phoneDisplay)}</a>${copyBtn(C.phoneDisplay, t('phoneCopied'), t('copyPhone'))}</dd>
          </div>
          <div>
            <dt>WhatsApp</dt>
            <dd><a href="${esc(waHref())}" target="_blank" rel="noopener noreferrer">${esc(t('sendMessage'))}</a></dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>${C.linkedin
              ? `<a href="${esc(C.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(C.linkedin.replace(/^https?:\/\/(www\.)?/, ''))}</a>`
              : `<button class="link-btn link-btn--muted" type="button" data-action="linkedin-pending">${esc(t('soon'))}</button>`}</dd>
          </div>
        </dl>
      </div>
      <footer class="site-footer">
        <span>© ${new Date().getFullYear()} ${esc(P.name)}</span>
        <a href="#home">${esc(t('backToTop'))} ↑</a>
      </footer>`;
  }

  /* --------------------------------------------------------------------------
     3. NAVEGAÇÃO
     -------------------------------------------------------------------------- */
  function goTo(id, { focus = true } = {}) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: behavior(), block: 'start' });
    history.replaceState(null, '', `#${id}`);
    if (focus && el.matches('[data-screen]')) el.focus({ preventScroll: true });
  }

  let activeId = null;
  function setActive(id) {
    if (!id || id === activeId) return;
    activeId = id;
    $$('#site-nav [data-nav]').forEach((a) => {
      const on = a.dataset.nav === id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }

  function initScrollSpy() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-screen]').forEach((s) => io.observe(s));

    const header = $('#site-header');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
        // No fim da página, a última seção pode não cruzar o centro da tela.
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive('contact');
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------------------------
     4. ANIMAÇÕES DE ENTRADA
     -------------------------------------------------------------------------- */
  function initReveal(scope = document, scrollRoot = null) {
    const els = $$('.reveal:not(.is-in)', scope);
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      els.forEach((e) => e.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { root: scrollRoot, threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => io.observe(e));
  }

  /* --------------------------------------------------------------------------
     5. JOURNEY — itens expansíveis
     -------------------------------------------------------------------------- */
  function toggleExp(item, force) {
    const btn = $('.tl-trigger', item);
    const panel = $('.tl-panel', item);
    const open = typeof force === 'boolean' ? force : btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    item.classList.toggle('is-open', open);
    panel.inert = !open;
    syncExpandAll();
  }

  function syncExpandAll() {
    const btn = $('[data-action="expand-all"]');
    if (!btn) return;
    const allOpen = $$('.tl-item').every((i) => i.classList.contains('is-open'));
    btn.setAttribute('aria-pressed', String(allOpen));
    $('span', btn).textContent = allOpen ? t('collapseAll') : t('expandAll');
  }

  /* --------------------------------------------------------------------------
     6. CASES — roteamento (#case/<id>) e página interna
     -------------------------------------------------------------------------- */
  const layer = $('#case-layer');
  const sheet = $('.case-sheet', layer);
  const scroller = $('#case-scroll');
  const progress = $('#case-progress');
  const caseState = { open: false, id: null, pushed: false, trigger: null, spy: null, hideTimer: null };

  const caseTitle = (id) => {
    const p = D.projects.find((x) => x.id === id);
    return p ? `${p.title} — ${D.profile.name}` : t('pageTitle');
  };

  /** Abre um case a partir da interface (cria entrada no histórico). */
  function openCase(id, trigger) {
    if (!D.projects.some((p) => p.id === id)) return;
    caseState.trigger = trigger || document.activeElement;
    if (location.hash === `#case/${id}`) { showCase(id); return; }
    caseState.pushed = true;
    location.hash = `case/${id}`; // dispara hashchange → route()
  }

  function closeCase() {
    if (!caseState.open) return;
    if (caseState.pushed) {
      caseState.pushed = false;
      history.back(); // hashchange → route() → hideCase()
    } else {
      history.replaceState(null, '', '#projects');
      hideCase();
    }
  }

  function route() {
    const m = location.hash.match(/^#case\/([\w-]+)$/);
    if (m) showCase(m[1]);
    else if (caseState.open) hideCase();
  }

  function showCase(id) {
    const p = D.projects.find((x) => x.id === id);
    if (!p) { history.replaceState(null, '', '#projects'); return; }
    clearTimeout(caseState.hideTimer);

    scroller.innerHTML = UI.casePage(p, D.projects);
    sheet.dataset.variant = (p.cover && p.cover.variant) || 'fitness';
    sheet.style.setProperty('--accent', p.accent);
    $('#case-bar-title').textContent = p.title;
    scroller.scrollTop = 0;
    updateProgress();

    if (!caseState.open) {
      layer.hidden = false;
      void layer.offsetWidth; // força o reflow para a transição de entrada
      layer.classList.add('is-open');
      $('#app').inert = true;
      root.classList.add('is-locked');
    }
    caseState.open = true;
    caseState.id = id;
    document.title = caseTitle(id);

    refreshIcons();
    initReveal(scroller, scroller);
    initCaseSpy();
    requestAnimationFrame(() => $('.case-close', layer).focus({ preventScroll: true }));
  }

  function hideCase() {
    if (!caseState.open) return;
    caseState.open = false;
    layer.classList.remove('is-open');
    $('#app').inert = false;
    root.classList.remove('is-locked');
    document.title = t('pageTitle');
    if (caseState.spy) caseState.spy.disconnect();

    caseState.hideTimer = setTimeout(() => {
      layer.hidden = true;
      scroller.innerHTML = '';
    }, reduceMotion.matches ? 0 : 450);

    // Devolve o foco a quem abriu o case (ou ao botão do card correspondente).
    const tr = caseState.trigger;
    const back = tr && document.body.contains(tr) && !tr.closest('#case-layer')
      ? tr
      : $(`.work__title [data-open-case="${caseState.id}"]`);
    if (back) back.focus({ preventScroll: true });
    caseState.trigger = null;
  }

  function initCaseSpy() {
    if (caseState.spy) caseState.spy.disconnect();
    const links = $$('.case-toc a', scroller);
    caseState.spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${en.target.id}`));
      });
    }, { root: scroller, rootMargin: '-25% 0px -65% 0px' });
    $$('.case-section', scroller).forEach((s) => caseState.spy.observe(s));
  }

  function updateProgress() {
    const max = scroller.scrollHeight - scroller.clientHeight;
    const p = max > 0 ? scroller.scrollTop / max : 0;
    progress.style.transform = `scaleX(${p})`;
    sheet.classList.toggle('is-scrolled', scroller.scrollTop > 8);
  }

  function initCases() {
    let ticking = false;
    scroller.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { updateProgress(); ticking = false; });
    }, { passive: true });

    window.addEventListener('hashchange', route);
    document.addEventListener('keydown', (e) => {
      // Com a imagem ampliada aberta, o Esc fecha só a imagem (comportamento nativo do <dialog>).
      if (e.key === 'Escape' && caseState.open && !$('#lightbox').open) closeCase();
    });
  }

  /* --------------------------------------------------------------------------
     7. AÇÕES
     -------------------------------------------------------------------------- */
  function toast(message, ic = 'check') {
    const region = $('#toasts');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `${icon(ic)}<span>${esc(message)}</span>`;
    region.appendChild(t);
    refreshIcons();
    setTimeout(() => {
      t.classList.add('is-out');
      setTimeout(() => t.remove(), 300);
    }, 2600);
  }

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    toast(label || t('copied'));
  }

  /* ---------- Imagem ampliada (lightbox) ---------- */
  function openLightbox(trigger) {
    const box = $('#lightbox');
    const img = $('#lightbox-img');
    img.src = trigger.dataset.zoom;
    img.alt = trigger.dataset.zoomAlt || '';
    $('#lightbox-caption').textContent = trigger.dataset.zoomCaption || trigger.dataset.zoomAlt || '';
    setLightboxZoom(false);
    box.showModal();
    $('[data-lightbox="close"]', box).focus();
    box.addEventListener('close', () => trigger.focus({ preventScroll: true }), { once: true });
  }

  function setLightboxZoom(on) {
    const box = $('#lightbox');
    box.classList.toggle('is-zoomed', on);
    $('[data-lightbox="zoom"]', box).setAttribute('aria-pressed', String(on));
  }
  const toggleLightboxZoom = () => setLightboxZoom(!$('#lightbox').classList.contains('is-zoomed'));

  function initLightbox() {
    const box = $('#lightbox');
    // Clique fora da imagem fecha; clique na imagem alterna o zoom.
    box.addEventListener('click', (e) => {
      if (e.target === box || e.target.id === 'lightbox-stage') box.close();
      else if (e.target.id === 'lightbox-img') toggleLightboxZoom();
    });
  }

  /** Delegação central de cliques. */
  function initActions() {
    document.addEventListener('click', (e) => {
      const target0 = e.target;

      // Links internos (#secao) → rolagem suave
      const a = target0.closest('a[href^="#"]');
      if (a && !a.dataset.openCase) {
        const id = a.getAttribute('href').slice(1);
        const target = id && !id.startsWith('case/') && document.getElementById(id);
        if (target) {
          e.preventDefault();
          if (a.closest('#case-layer')) target.scrollIntoView({ behavior: behavior(), block: 'start' });
          else goTo(id);
          return;
        }
      }

      const el = target0.closest('[data-lang],[data-open-case],[data-close-case],[data-next-case],[data-copy],[data-action],[data-zoom],[data-lightbox],.tl-trigger');
      if (!el) return;

      if (el.dataset.lang) return setLang(el.dataset.lang);

      if (el.dataset.zoom) return openLightbox(el);
      if (el.dataset.lightbox === 'close') return $('#lightbox').close();
      if (el.dataset.lightbox === 'zoom') return toggleLightboxZoom();

      if (el.matches('.tl-trigger')) return toggleExp(el.closest('.tl-item'));
      if (el.dataset.openCase) {
        e.preventDefault();
        const card = el.closest('.work');
        const link = card ? $('.work__title [data-open-case]', card) : el;
        return openCase(el.dataset.openCase, link);
      }
      if (el.hasAttribute('data-close-case')) return closeCase();
      if (el.dataset.nextCase) {
        history.replaceState(null, '', `#case/${el.dataset.nextCase}`);
        return showCase(el.dataset.nextCase);
      }
      if (el.dataset.copy) return copy(el.dataset.copy, el.dataset.copyLabel);

      switch (el.dataset.action) {
        case 'linkedin-pending': return toast(t('linkedinSoon'), 'clock');
        case 'expand-all': {
          const open = el.getAttribute('aria-pressed') !== 'true';
          $$('.tl-item').forEach((i) => toggleExp(i, open));
          return undefined;
        }
        default: return undefined;
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. INIT
     -------------------------------------------------------------------------- */
  function renderAll() {
    renderChrome();
    renderHome();
    renderProjects();
    renderJourney();
    renderSkills();
    renderContact();
    refreshIcons();
  }

  /** Troca o idioma do site inteiro, mantendo a posição de leitura. */
  function setLang(l) {
    if (!LANGS.includes(l) || l === lang) return;
    storeLang(l);
    const openExp = $$('.tl-item.is-open').map((i) => i.id);
    const caseScroll = scroller.scrollTop;
    const focusedLang = document.activeElement && document.activeElement.dataset
      ? document.activeElement.closest('#case-layer') ? 'case' : 'header' : null;

    applyLang(l);
    renderAll();
    // Conteúdo já visto não precisa animar de novo.
    $$('#app .reveal').forEach((e) => e.classList.add('is-in'));
    openExp.forEach((id) => { const it = document.getElementById(id); if (it) toggleExp(it, true); });
    const current = activeId;
    activeId = null;
    setActive(current || 'home');

    if (caseState.open && caseState.id) {
      const trigger = caseState.trigger;
      showCase(caseState.id);
      caseState.trigger = trigger;
      $$('.reveal', scroller).forEach((e) => e.classList.add('is-in'));
      scroller.scrollTop = caseScroll;
      updateProgress();
    }
    // Mantém o foco no seletor de idioma recém-renderizado.
    const scope = focusedLang === 'case' ? $('#case-lang') : $('#site-header');
    // (depois do foco automático do showCase, que também roda no próximo frame)
    requestAnimationFrame(() => {
      const btn = scope && $(`[data-lang="${l}"]`, scope);
      if (btn) btn.focus({ preventScroll: true });
    });
  }

  function init() {
    applyLang(initialLang());
    renderAll();

    initActions();
    initLightbox();
    initCases();
    initReveal();
    initScrollSpy();

    // Deep links: #journey, #case/fitness-app…
    const hash = location.hash.slice(1);
    if (hash.startsWith('case/')) route();
    else if (hash && document.getElementById(hash)) {
      requestAnimationFrame(() => document.getElementById(hash).scrollIntoView({ block: 'start' }));
    }
    setActive(hash && document.getElementById(hash) ? hash : 'home');
    root.classList.add('is-ready');
  }

  // Ícones também ficam disponíveis se o Lucide carregar depois do app.
  window.addEventListener('load', refreshIcons);

  init();
})();
