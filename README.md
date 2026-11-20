# Portfólio — Mayra Portes

Portfólio minimalista em modo escuro, bilíngue (português e inglês). Feito em HTML, CSS e JavaScript puros, sem build e sem dependências locais.

## Como abrir

Abra o `index.html` no navegador (duplo clique já funciona).
Para testar como um site publicado, rode um servidor local:

```bash
npx serve .        # ou: python3 -m http.server
```

## Estrutura

```
index.html            Esqueleto do app (cabeçalho, telas, modal dos cases), SEO
css/styles.css        Visual: tokens (cores, raios, fontes), componentes, telas, responsivo
js/content.js         ★ TODO o conteúdo: textos, links, imagens, cases
js/components.js      Componentes reutilizáveis (cards, capas, slots, blocos dos cases)
js/app.js             Renderização das telas + navegação, animações e interações
assets/img/           Imagens (profile/, fitness/, projects/fitness-app/, projects/contaja/)
```

**Para atualizar o conteúdo, edite só o `js/content.js`.** A estrutura, o visual e as interações não precisam mudar.

## Idiomas (PT / EN)

O seletor **PT / EN** fica no canto superior direito (e também na barra dos cases). Ao trocar, o site inteiro muda de idioma, inclusive o case aberto.

No `content.js`, todo texto visível é escrito com as duas versões lado a lado:

```js
title: tr('Visão geral', 'Overview'),
```

- Termos técnicos (Product Designer, UX Research, Discovery, MVP, Double Diamond, nomes de skills…) ficam em inglês nos dois idiomas. Nesses casos, use uma string simples, sem `tr()`.
- Ao adicionar um texto novo, preencha as duas versões. Textos da interface (botões, rótulos, mensagens) ficam em `strings`, no fim do arquivo.
- Idioma inicial: o escolhido antes pelo visitante (fica salvo no navegador); senão, o idioma do navegador (português → PT, inglês → EN); senão, `settings.defaultLang`.
- Link direto para um idioma: `?lang=en` ou `?lang=pt` no fim do endereço (ex.: `https://mayraportes2.github.io/portfolio/?lang=en`).

## Atualizações comuns

| O que | Onde, em `content.js` |
|---|---|
| Foto de perfil | `profile.photo: 'assets/img/profile/mayra.jpg'` |
| LinkedIn | `contact.linkedin` (vazio mostra “em breve”) |
| Início na ContaJá | `journey.items[0].start: 'AAAA-MM'` |
| Descrição e responsabilidades de uma experiência | `journey.items[n].description`, `.responsibilities[]`, `.highlights[]` |
| Descrição curta no card do projeto | `projects[n].summary` |
| Nota no topo do case (ex.: status do projeto) | `projects[n].note` |
| Capa definitiva do projeto | `projects[n].cover.image` (proporção 16:10) |
| Ficha técnica do case | `projects[n].case.meta[n].value` |
| Ocultar os IDs dos placeholders | `settings.showSlotIds: false` |

Campos vazios aparecem como placeholders identificados. Nada quebra se algo ainda não existir.

## Cases: segunda etapa

Cada case é uma lista de seções (`sections`), cada uma com título e blocos de conteúdo.
Dentro delas há **slots**, espaços reservados que mostram no site um identificador como `fitness-app/visual/1` (case / seção / posição).

Para incluir conteúdo, troque o `slot(...)` pelo bloco real:

```js
// antes
{ id: 'visual', title: tr('Conteúdo visual', 'Visuals'), blocks: [
  slot('phones', tr('Telas do aplicativo', 'App screens')),
] },

// depois
{ id: 'visual', title: tr('Conteúdo visual', 'Visuals'), blocks: [
  { type: 'phones', title: tr('Telas principais', 'Main screens'), items: [
    { src: 'assets/img/projects/fitness-app/home.png', alt: 'Tela inicial', caption: 'Home' },
    { src: 'assets/img/projects/fitness-app/treino.png', alt: 'Tela de treino' },
  ] },
] },
```

Uma seção pode ter quantos blocos forem necessários, em qualquer ordem. Também dá para criar novas seções com `{ id, title, lead?, blocks: [] }`. O índice lateral e a navegação se atualizam sozinhos.

### Tipos de bloco

| Tipo | Uso | Campos |
|---|---|---|
| `text` | Parágrafos | `title?`, `body` (texto ou lista de parágrafos; aceita `**negrito**`) |
| `list` | Objetivos, metodologias, responsabilidades | `title?`, `intro?` (frase antes da lista), `items[]` |
| `image` | Imagem única, diagrama, fluxograma | `src`, `alt`, `caption?` |
| `gallery` | Várias imagens, componentes, documentação | `columns?` (2 ou 3), `items[{src, alt, caption?}]` |
| `phones` | Mockups mobile em moldura de celular | `items[{src, alt, caption?}]` |
| `video` | Vídeo MP4 ou YouTube/Vimeo | `src` ou `embed`, `poster?` |
| `embed` | Protótipo Figma, board FigJam/Miro | `url`, `ratio?` (ex.: `'4/3'`), `link?` + `linkLabel?` (botão "abrir em nova aba") |
| `steps` | Etapas de pesquisa e processo | `items[{title, body?, deliverable?}]` (`deliverable` aparece como "Entrega") |
| `insights` | Cards com ícone (insights, pilares, funcionalidades) | `items[{title, icon?, body?}]` (`body` pode ser texto ou lista de itens; `icon` = nome do ícone Lucide) |
| `quote` | Fala de usuário ou depoimento | `text`, `author?` |
| `stats` | Resultados (somente dados reais) | `items[{value, label}]` |
| `diamond` | Double Diamond com etapas por fase | `phases[{name, mode?, steps[texto ou {title, body?}]}]` |

Slots `flow` e `components` são só visuais. Para preenchê-los, use `image` ou `gallery`.

## Detalhes técnicos

- Layout minimalista em modo escuro. Cores, fonte e espaçamentos ficam nos tokens do topo de `css/styles.css`.
- Navegação: menu fixo no topo, com a seção ativa marcada por um ponto laranja, e o seletor de idioma à direita. No celular, o menu fica numa segunda linha do topo.
- A frase de abertura da Home vem de `profile.statement`: o trecho em `**negrito**` fica branco e o resto cinza.
- Cases abrem por hash (`#case/fitness-app`, `#case/contaja`). O link pode ser compartilhado, e o "voltar" do navegador fecha o case.
- Acessibilidade: navegação por teclado, foco visível, `Esc` fecha o case, ARIA nos componentes e respeito a `prefers-reduced-motion`.
- Externos: ícones [Lucide](https://lucide.dev/icons) (`lucide@0.460.0` via unpkg) e a fonte Geist (Google Fonts).
- Publicado no GitHub Pages: https://mayraportes2.github.io/portfolio/ (repositório `mayraportes2/portfolio`, branch `main`). Cada `git push` na `main` atualiza o site em alguns minutos.
- Pendente: `og:image` em `index.html` (imagem 1200×630 para a prévia do link em redes sociais).
