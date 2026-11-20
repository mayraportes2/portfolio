/* ============================================================================
   COMPONENTS.JS — Componentes reutilizáveis (funções que retornam HTML)
   ----------------------------------------------------------------------------
   Não contém conteúdo: tudo vem de js/content.js.
   Expõe window.UI, usado por js/app.js.

   Sumário
   1. Utilitários (escape, markdown simples, datas)
   2. Primitivos (ícone, cabeçalho de seção, foto/placeholder)
   3. Slots (placeholders identificados para conteúdo futuro)
   4. Blocos de conteúdo dos cases
   5. Capas dos projetos
   6. Card de projeto
   7. Página interna do case
   ============================================================================ */
(function () {
  'use strict';

  const cfg = () => (window.PORTFOLIO && window.PORTFOLIO.settings) || {};

  /* --------------------------------------------------------------------------
     0. IDIOMA
     -------------------------------------------------------------------------- */
  const isPair = (v) => v && typeof v === 'object' && !Array.isArray(v)
    && Object.keys(v).length === 2 && 'pt' in v && 'en' in v;

  /** Troca cada tr('pt', 'en') do conteúdo pelo texto do idioma escolhido. */
  const localize = (v, lang) => {
    if (isPair(v)) return localize(v[lang], lang);
    if (Array.isArray(v)) return v.map((x) => localize(x, lang));
    if (v && typeof v === 'object') {
      const out = {};
      Object.keys(v).forEach((k) => { out[k] = localize(v[k], lang); });
      return out;
    }
    return v;
  };

  /** Textos da interface no idioma atual (definidos por setStrings, em app.js). */
  let STR = {};
  const setStrings = (strings) => { STR = strings || {}; };
  const str = (key) => (STR[key] != null ? STR[key] : key);

  /* --------------------------------------------------------------------------
     1. UTILITÁRIOS
     -------------------------------------------------------------------------- */
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ESC[c]);

  /** Escapa e converte **negrito** em <strong>. */
  const md = (v) => esc(v).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  const pad = (n) => String(n).padStart(2, '0');

  const slugify = (s) =>
    String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const normalize = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const fmtMonth = (ym) => {
    if (!ym) return '';
    const [y, m] = ym.split('-').map(Number);
    const months = Array.isArray(STR.months) ? STR.months : [];
    return `${months[m - 1] || pad(m)} ${y}`;
  };

  /** "Jun 2024 – Ago 2025" | "Jun 2024 – Atual" | "Atual" (ou em inglês) */
  const periodLabel = (j) => {
    if (j.current) return j.start ? `${fmtMonth(j.start)} – ${str('present')}` : str('present');
    return `${fmtMonth(j.start)} – ${fmtMonth(j.end)}`;
  };

  /** Duração inclusiva calculada a partir das datas reais ("1 ano e 3 meses").
      Experiência atual: conta até o mês corrente. */
  const duration = (j) => {
    if (!j.start || (!j.end && !j.current)) return '';
    const today = new Date();
    const [y1, m1] = j.start.split('-').map(Number);
    const [y2, m2] = j.end ? j.end.split('-').map(Number) : [today.getFullYear(), today.getMonth() + 1];
    const total = (y2 - y1) * 12 + (m2 - m1) + 1;
    const y = Math.floor(total / 12);
    const m = total % 12;
    const parts = [];
    if (y) parts.push(`${y} ${y > 1 ? str('years') : str('year')}`);
    if (m) parts.push(`${m} ${m > 1 ? str('monthsWord') : str('month')}`);
    return parts.join(` ${str('and')} `);
  };

  /* --------------------------------------------------------------------------
     2. PRIMITIVOS
     -------------------------------------------------------------------------- */
  /** Ícone Lucide (convertido em SVG por lucide.createIcons). */
  const icon = (name, cls = '') => `<i data-lucide="${esc(name)}" class="icon ${cls}" aria-hidden="true"></i>`;

  /** Cabeçalho padrão das seções: número discreto, título e subtítulo em cinza. */
  const screenHead = ({ id, num, title, subtitle }) => `
    <header class="sec-head reveal">
      <h2 id="${esc(id)}" class="sec-title">${num ? `<span class="sec-num">${esc(num)}</span>` : ''}${md(title)}</h2>
      ${subtitle ? `<p class="sec-sub">${md(subtitle)}</p>` : ''}
    </header>`;

  /** Foto real ou placeholder elegante identificado. */
  const photo = ({ src, alt = '', label = 'Foto', slotId = '', monogram = '', className = '' } = {}) => {
    if (src) {
      return `<img class="photo ${esc(className)}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
    }
    return `
      <div class="photo-slot ${esc(className)}" role="img" aria-label="${esc(str('placeholder'))}: ${esc(label)}" ${slotId ? `data-slot="${esc(slotId)}"` : ''}>
        ${monogram ? `<span class="photo-slot__mono" aria-hidden="true">${esc(monogram)}</span>` : `<span class="photo-slot__icon" aria-hidden="true">${icon('camera')}</span>`}
        <span class="photo-slot__label">${icon('image-plus')}${esc(label)}</span>
        ${cfg().showSlotIds && slotId ? `<code class="photo-slot__id">${esc(slotId)}</code>` : ''}
      </div>`;
  };

  /* --------------------------------------------------------------------------
     3. SLOTS — placeholders com prévia do tipo de material esperado
     -------------------------------------------------------------------------- */
  const SLOT_ICONS = {
    text: 'align-left', list: 'list-checks', image: 'image', gallery: 'images',
    phones: 'smartphone', video: 'play', embed: 'frame', steps: 'workflow',
    flow: 'git-fork', insights: 'lightbulb', components: 'component', quote: 'quote', stats: 'hash',
  };
  const slotMeta = (type) => {
    const t = SLOT_ICONS[type] ? type : 'text';
    return { icon: SLOT_ICONS[t], name: (STR.slotTypes || {})[t] || t };
  };

  const lines = (ws) => `<div class="sk-lines">${ws.map((w) => `<i style="--w:${w}%"></i>`).join('')}</div>`;

  const PREVIEW = {
    text: () => lines([94, 100, 86, 58]),
    list: () => `<div class="sk-list">${[72, 60, 66].map((w) => `<span><b></b><i style="--w:${w}%"></i></span>`).join('')}</div>`,
    image: () => `<div class="sk-media sk-media--wide">${icon('image')}</div>`,
    gallery: () => `<div class="sk-gallery">${[1, 2, 3].map(() => `<div class="sk-media">${icon('image')}</div>`).join('')}</div>`,
    phones: () => `<div class="sk-phones">${[1, 2, 3].map(() => '<div class="sk-phone"><span></span></div>').join('')}</div>`,
    video: () => `<div class="sk-media sk-media--wide"><span class="sk-play">${icon('play')}</span></div>`,
    embed: () => `<div class="sk-media sk-media--wide">${icon('frame')}</div>`,
    steps: () => `<div class="sk-steps">${[1, 2, 3, 4].map((n) => `<span><b>${n}</b><i></i></span>`).join('')}</div>`,
    flow: () => '<div class="sk-flow"><span class="n"></span><i></i><span class="n n--d"></span><i></i><span class="n"></span><i></i><span class="n n--c"></span></div>',
    insights: () => `<div class="sk-cards">${[1, 2, 3].map(() => `<div>${icon('lightbulb')}${lines([82, 56])}</div>`).join('')}</div>`,
    components: () => `<div class="sk-comps">${'<span></span>'.repeat(6)}</div>`,
    quote: () => `<div class="sk-quote">${icon('quote')}${lines([90, 66])}</div>`,
    stats: () => `<div class="sk-stats">${'<div><b></b><i></i></div>'.repeat(3)}</div>`,
  };

  /**
   * Placeholder identificado.
   * @param {{expects:string,label?:string,hint?:string}} b
   * @param {string} slotId  Caminho único (ex.: 'fitness-app/visual/1').
   */
  const slot = (b, slotId, opts = {}) => {
    const m = slotMeta(b.expects);
    const preview = (PREVIEW[b.expects] || PREVIEW.text)();
    return `
      <div class="slot slot--${esc(b.expects)} ${opts.compact ? 'slot--compact' : ''}" data-slot="${esc(slotId)}" data-expects="${esc(b.expects)}">
        <div class="slot__head">
          <span class="slot__icon">${icon(m.icon)}</span>
          <span class="slot__txt"><strong>${esc(b.label || m.name)}</strong><span>${esc(str('awaiting'))} · ${esc(m.name)}</span></span>
          ${cfg().showSlotIds ? `<code class="slot__id">${esc(slotId)}</code>` : ''}
        </div>
        <div class="slot__preview" aria-hidden="true">${preview}</div>
        ${b.hint ? `<p class="slot__hint">${icon('info')}${esc(b.hint)}</p>` : ''}
      </div>`;
  };

  /* --------------------------------------------------------------------------
     4. BLOCOS DE CONTEÚDO DOS CASES
     -------------------------------------------------------------------------- */
  const paras = (body) => (Array.isArray(body) ? body : [body]).map((p) => `<p>${md(p)}</p>`).join('');
  const heading = (b) => (b.title ? `<h3 class="block__title">${esc(b.title)}</h3>` : '')
    + (b.intro ? `<p class="block__intro">${md(b.intro)}</p>` : '');
  /** Corpo de card/etapa: texto simples ou lista de itens (array). */
  const cardBody = (body) => {
    if (!body) return '';
    if (Array.isArray(body)) return `<ul class="mini-list">${body.map((i) => `<li>${md(i)}</li>`).join('')}</ul>`;
    return `<p>${md(body)}</p>`;
  };
  const caption = (c) => (c ? `<figcaption>${md(c)}</figcaption>` : '');
  /** Imagem com zoom: clicar abre a visualização ampliada (lightbox em app.js). */
  const fig = (it, cls = '') => `
    <figure class="media ${cls}">
      <button class="media__zoom" type="button" data-zoom="${esc(it.src)}" data-zoom-alt="${esc(it.alt || '')}" data-zoom-caption="${esc(it.caption || '')}" aria-label="${esc(str('enlargeImage'))}${it.alt ? `: ${esc(it.alt)}` : ''}">
        <img src="${esc(it.src)}" alt="${esc(it.alt || '')}" loading="lazy" decoding="async">
        <span class="media__hint" aria-hidden="true">${icon('maximize-2')}${esc(str('enlarge'))}</span>
      </button>
      ${caption(it.caption)}
    </figure>`;

  const BLOCKS = {
    text: (b) => `<div class="block block--text">${heading(b)}${paras(b.body)}</div>`,
    list: (b) => `
      <div class="block block--list">${heading(b)}
        <ul class="check-list">${b.items.map((i) => `<li>${icon('check')}<span>${md(i)}</span></li>`).join('')}</ul>
      </div>`,
    image: (b) => `<div class="block block--image">${heading(b)}${fig(b, b.wide ? 'media--wide' : '')}</div>`,
    gallery: (b) => `
      <div class="block block--gallery">${heading(b)}
        <div class="gallery" style="--cols:${Number(b.columns) || 2}">${b.items.map((i) => fig(i)).join('')}</div>
      </div>`,
    phones: (b) => `
      <div class="block block--phones">${heading(b)}
        <div class="phones" style="--cols:${b.items.length <= 4 ? b.items.length : (b.items.length % 3 === 0 ? 3 : 4)}">${b.items.map((i) => `
          <figure class="phone-frame">
            <div class="phone-frame__screen"><img src="${esc(i.src)}" alt="${esc(i.alt || '')}" loading="lazy" decoding="async"></div>
            ${caption(i.caption)}
          </figure>`).join('')}
        </div>
      </div>`,
    video: (b) => `
      <div class="block block--video">${heading(b)}
        <div class="frame" style="--ratio:${esc(b.ratio || '16/9')}">
          ${b.embed
            ? `<iframe src="${esc(b.embed)}" title="${esc(b.title || str('video'))}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
            : `<video src="${esc(b.src)}" ${b.poster ? `poster="${esc(b.poster)}"` : ''} controls playsinline preload="metadata"></video>`}
        </div>${caption(b.caption)}
      </div>`,
    embed: (b) => `
      <div class="block block--embed">${heading(b)}
        <div class="frame" style="--ratio:${esc(b.ratio || '16/9')}">
          <iframe src="${esc(b.url)}" title="${esc(b.title || str('embedded'))}" loading="lazy" allowfullscreen></iframe>
        </div>${caption(b.caption)}
        ${b.link ? `<a class="btn btn--ghost block__link" href="${esc(b.link)}" target="_blank" rel="noopener noreferrer">${icon('external-link')}${esc(b.linkLabel || str('openNewTab'))}</a>` : ''}
      </div>`,
    steps: (b) => `
      <div class="block block--steps">${heading(b)}
        <ol class="steps">${b.items.map((s, i) => `
          <li><span class="steps__num">${pad(i + 1)}</span><div><strong>${esc(s.title)}</strong>${cardBody(s.body)}${s.deliverable ? `<p class="steps__out"><span>${esc(str('deliverable'))}</span>${md(s.deliverable)}</p>` : ''}</div></li>`).join('')}
        </ol>
      </div>`,
    insights: (b) => `
      <div class="block block--insights">${heading(b)}
        <div class="insights" data-count="${b.items.length}">${b.items.map((s) => `
          <article class="insight">${icon(s.icon || 'lightbulb')}<strong>${esc(s.title)}</strong>${cardBody(s.body)}</article>`).join('')}
        </div>
      </div>`,
    quote: (b) => `<blockquote class="block block--quote"><p>${md(b.text)}</p>${b.author ? `<cite>${esc(b.author)}</cite>` : ''}</blockquote>`,
    stats: (b) => `
      <div class="block block--stats">${heading(b)}
        <div class="stats">${b.items.map((s) => `<div><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`).join('')}</div>
      </div>`,
    /** Double Diamond: fases (Descobrir/Definir/Desenvolver/Entregar) com etapas numeradas em sequência. */
    diamond: (b) => {
      let n = 0;
      const phases = b.phases.slice(0, 4);
      return `
      <div class="block block--diamond">${heading(b)}
        <div class="dd">
          <div class="dd__top">
            <svg class="dd__shape" viewBox="0 0 800 160" preserveAspectRatio="none" aria-hidden="true">
              <path class="dd__d" d="M2 80 L200 4 L398 80 L200 156 Z" vector-effect="non-scaling-stroke"/>
              <path class="dd__d" d="M402 80 L600 4 L798 80 L600 156 Z" vector-effect="non-scaling-stroke"/>
              <line class="dd__mid" x1="200" y1="4" x2="200" y2="156" vector-effect="non-scaling-stroke"/>
              <line class="dd__mid" x1="600" y1="4" x2="600" y2="156" vector-effect="non-scaling-stroke"/>
            </svg>
            <div class="dd__labels" aria-hidden="true">
              ${phases.map((p) => `<span><small>${esc(p.mode || '')}</small><strong>${esc(p.name)}</strong></span>`).join('')}
            </div>
          </div>
          <ol class="dd__phases">
            ${phases.map((p) => `
              <li class="dd__phase">
                <p class="dd__phase-name"><strong>${esc(p.name)}</strong>${p.mode ? `<span>${esc(p.mode)}</span>` : ''}</p>
                <ol class="dd__steps">
                  ${(p.steps || []).map((s) => {
                    n += 1;
                    const st = typeof s === 'string' ? { title: s } : s;
                    return `<li><span class="dd__num">${pad(n)}</span><span><strong>${esc(st.title)}</strong>${st.body ? `<p>${md(st.body)}</p>` : ''}</span></li>`;
                  }).join('')}
                </ol>
              </li>`).join('')}
          </ol>
        </div>
      </div>`;
    },
  };

  const hasItems = (b) => Array.isArray(b.items) && b.items.length > 0;
  const isEmpty = (b) => {
    switch (b.type) {
      case 'text': return !b.body || (Array.isArray(b.body) && !b.body.length);
      case 'image': return !b.src;
      case 'video': return !(b.src || b.embed);
      case 'embed': return !b.url;
      case 'quote': return !b.text;
      case 'list': case 'gallery': case 'phones': case 'steps': case 'insights': case 'stats': return !hasItems(b);
      case 'diamond': return !(Array.isArray(b.phases) && b.phases.length);
      default: return true;
    }
  };

  /** Renderiza um bloco; se estiver vazio/incompleto, vira placeholder. */
  const renderBlock = (b, slotId) => {
    if (!b) return '';
    if (b.type === 'slot' || !BLOCKS[b.type] || isEmpty(b)) {
      return slot({ expects: b.expects || b.type, label: b.label, hint: b.hint }, slotId);
    }
    return BLOCKS[b.type](b);
  };

  /* --------------------------------------------------------------------------
     5. CAPAS DOS PROJETOS
     Sem imagem: composição gráfica da identidade de cada projeto.
     Com cover.image: a imagem real substitui a composição.
     -------------------------------------------------------------------------- */
  /** screens: até 3 caminhos de telas reais (esquerda, centro, direita). */
  const fitnessArt = (screens = []) => `
    <div class="cover__grid" aria-hidden="true"></div>
    <div class="cover__glow" aria-hidden="true"></div>
    <div class="cover__phones" aria-hidden="true">
      ${[1, 2, 3].map((n) => `
        <div class="phone phone--${n}"><div class="phone__screen">${screens[n - 1]
          ? `<img src="${esc(screens[n - 1])}" alt="" loading="lazy" decoding="async">`
          : `${icon('smartphone')}<span>Mockup ${pad(n)}</span>`}</div></div>`).join('')}
    </div>`;

  const note = (x, y, w, fill, rot) => `
    <g class="note" transform="rotate(${rot} ${x + w / 2} ${y + w / 2})">
      <rect x="${x}" y="${y}" width="${w}" height="${w}" rx="8" fill="${fill}"/>
      <rect x="${x + 14}" y="${y + 18}" width="${w * 0.58}" height="6" rx="3" fill="#1A1C22" fill-opacity=".16"/>
      <rect x="${x + 14}" y="${y + 32}" width="${w * 0.4}" height="6" rx="3" fill="#1A1C22" fill-opacity=".16"/>
    </g>`;

  const researchArt = () => `
    <svg class="cover__svg" viewBox="0 0 480 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path d="M60 268 C 130 268 120 168 196 168 S 286 92 352 112 S 430 200 430 226" fill="none" stroke="#1A1C22" stroke-opacity=".5" stroke-width="2" stroke-dasharray="3 7" stroke-linecap="round"/>
      ${note(64, 52, 96, '#F5E27C', -7)}
      ${note(226, 200, 100, '#B9C2FF', 5)}
      ${note(350, 22, 84, '#F3B9C6', 4)}
      <g class="stack" transform="translate(54 300)">
        <rect width="110" height="12" rx="6" fill="#1A1C22" fill-opacity=".85"/>
        <rect y="20" width="84" height="12" rx="6" fill="#1A1C22" fill-opacity=".35"/>
        <rect y="40" width="96" height="12" rx="6" fill="#1A1C22" fill-opacity=".18"/>
      </g>
      <circle cx="60" cy="268" r="13" fill="#1A1C22"/><circle cx="60" cy="268" r="5" fill="#FF8034"/>
      <rect x="184" y="156" width="24" height="24" rx="6" fill="#EEECE5" stroke="#1A1C22" stroke-width="2.5"/>
      <rect x="341" y="101" width="22" height="22" transform="rotate(45 352 112)" fill="#5B67F0"/>
      <circle cx="430" cy="226" r="11" fill="#EEECE5" stroke="#1A1C22" stroke-width="2.5"/>
      <g class="lens" transform="translate(392 300)">
        <circle r="26" fill="#EEECE5" fill-opacity=".6" stroke="#1A1C22" stroke-width="5"/>
        <line x1="19" y1="19" x2="40" y2="40" stroke="#1A1C22" stroke-width="7" stroke-linecap="round"/>
      </g>
    </svg>`;

  const cover = (p, { slotId = '' } = {}) => {
    const cv = p.cover || {};
    if (cv.image) {
      return `<div class="cover cover--image"><img src="${esc(cv.image)}" alt="${esc(cv.alt || '')}" loading="lazy" decoding="async"></div>`;
    }
    const variant = cv.variant === 'research' ? 'research' : 'fitness';
    const screens = variant === 'fitness' && Array.isArray(cv.screens) ? cv.screens.filter(Boolean) : [];
    // Com telas reais a capa está completa: sem marcação de placeholder.
    const pending = !screens.length;
    return `
      <div class="cover cover--${variant}${pending ? '' : ' cover--screens'}" ${pending && slotId ? `data-slot="${esc(slotId)}"` : ''}>
        ${variant === 'research' ? researchArt() : fitnessArt(screens)}
        ${pending ? `<span class="cover__tag">${icon('image-plus')}<span>${esc(str('coverSlot'))}</span>${cfg().showSlotIds && slotId ? `<code>${esc(slotId)}</code>` : ''}</span>` : ''}
      </div>`;
  };

  /* --------------------------------------------------------------------------
     6. CARD DE PROJETO
     -------------------------------------------------------------------------- */
  /** Card minimalista: imagem grande + legenda (título à esquerda, cliente e categorias à direita). */
  const projectCard = (p, i) => {
    const tags = [p.client, p.categories.join(', ')].filter(Boolean).join(' — ');
    return `
    <article class="work reveal" style="--d:${i};--accent:${esc(p.accent)}" aria-labelledby="proj-${esc(p.id)}">
      <a class="work__media" href="#case/${esc(p.id)}" data-open-case="${esc(p.id)}" tabindex="-1" aria-hidden="true">${cover(p, { slotId: `${p.id}/cover` })}</a>
      <div class="work__cap">
        <h3 id="proj-${esc(p.id)}" class="work__title"><a href="#case/${esc(p.id)}" data-open-case="${esc(p.id)}">${esc(p.title)}<span class="sr-only">: ${esc(str('viewCase'))}</span></a></h3>
        <p class="work__tags">${esc(tags)}</p>
      </div>
      ${p.summary ? `<p class="work__desc">${md(p.summary)}</p>` : ''}
    </article>`;
  };

  /* --------------------------------------------------------------------------
     7. PÁGINA INTERNA DO CASE (estrutura padronizada)
     -------------------------------------------------------------------------- */
  const casePage = (p, all) => {
    const c = p.case || {};
    const sections = c.sections || [];
    const idx = all.indexOf(p);
    const next = all.length > 1 ? all[(idx + 1) % all.length] : null;
    const sid = (s) => `case-${p.id}-${s.id}`;
    const label = [`Case ${p.index}`, p.client].filter(Boolean).join(' · ');

    return `
      <article class="case" style="--accent:${esc(p.accent)}">
        <header class="case-hero">
          <div class="case-hero__info reveal">
            <p class="case-hero__index">${esc(label)}</p>
            <h1 id="case-title" class="case-hero__title">${esc(p.title)}</h1>
            ${p.summary
              ? `<p class="case-hero__summary">${md(p.summary)}</p>`
              : slot({ expects: 'text', label: str('caseSummary') }, `${p.id}/summary`, { compact: true })}
          </div>
          <div class="case-hero__cover reveal" style="--d:1">${cover(p, { slotId: `${p.id}/cover` })}</div>
        </header>

        <div class="case-body">
          <aside class="case-aside">
            ${(c.meta || []).length ? `
              <dl class="case-meta">${c.meta.map((m) => `
                <div><dt>${esc(m.label)}</dt><dd>${m.value ? esc(m.value) : `<span class="tbd">${esc(str('tbd'))}</span>`}</dd></div>`).join('')}
                <div><dt>${esc(str('categories'))}</dt><dd>${p.categories.map((cat) => `<span>${esc(cat)}</span>`).join('')}</dd></div>
              </dl>` : ''}
            ${p.note ? `<p class="case-note">${md(p.note)}</p>` : ''}
            <nav class="case-toc" aria-label="${esc(str('caseSections'))}">
              <p class="case-toc__title">${esc(str('inThisCase'))}</p>
              <ol>${sections.map((s, i) => `<li><a href="#${sid(s)}"><span>${pad(i + 1)}</span>${esc(s.title)}</a></li>`).join('')}</ol>
            </nav>
          </aside>
          <div class="case-sections">
            ${sections.map((s, i) => `
              <section class="case-section reveal" id="${sid(s)}" aria-labelledby="${sid(s)}-h">
                <header class="case-section__head">
                  <span class="case-section__num">${pad(i + 1)}</span>
                  <h2 id="${sid(s)}-h">${esc(s.title)}</h2>
                </header>
                ${s.lead ? `<p class="case-section__lead">${md(s.lead)}</p>` : ''}
                <div class="case-section__blocks">
                  ${(s.blocks || []).map((b, bi) => renderBlock(b, `${p.id}/${s.id}/${bi + 1}`)).join('')}
                </div>
              </section>`).join('')}
          </div>
        </div>

        ${next ? `
          <footer class="case-next">
            <button class="case-next__btn" type="button" data-next-case="${esc(next.id)}">
              <span class="case-next__label">${esc(str('nextCase'))}</span>
              <strong>${esc(next.title)}</strong>
              <span class="case-next__arrow">${icon('arrow-right')}</span>
            </button>
          </footer>` : ''}
      </article>`;
  };

  window.UI = {
    localize, setStrings, str,
    esc, md, pad, slugify, normalize, periodLabel, duration,
    icon, screenHead, photo, slot, renderBlock, cover, projectCard, casePage,
  };
})();
