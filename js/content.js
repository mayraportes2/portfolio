/* ============================================================================
   CONTENT.JS — Fonte única de conteúdo do portfólio
   ----------------------------------------------------------------------------
   Este é o ÚNICO arquivo que precisa ser editado para atualizar textos, links,
   imagens e o conteúdo dos cases. A estrutura (index.html), o visual
   (css/styles.css) e o comportamento (js/components.js + js/app.js) leem
   tudo daqui.

   Regras gerais
   • Idiomas: todo texto visível usa tr('português', 'English').
     Termos técnicos (Product Designer, UX Research, Discovery, MVP…) ficam
     iguais nos dois idiomas; texto que não muda pode ser uma string simples.
   • Campos vazios ('' / null / []) aparecem no site como placeholders
     identificados — nada quebra se algo ainda não existir.
   • Imagens: salve em /assets/img/... e informe o caminho relativo,
     ex.: 'assets/img/profile/mayra.jpg'.
   • Textos aceitam **negrito** (no título de algumas seções, o trecho em
     negrito aparece na cor de destaque).
   • Guia completo de atualização: README.md
   ============================================================================ */
(function () {
  'use strict';

  /** Texto nos dois idiomas. O site mostra o idioma escolhido no seletor PT/EN. */
  const tr = (pt, en) => ({ pt, en });

  /**
   * slot() — espaço reservado para conteúdo futuro de um case.
   * Substitua cada slot pelo bloco real (ver README.md).
   *
   * @param {string} expects  Tipo de material esperado. Define o visual do
   *                          placeholder: 'text' | 'list' | 'image' | 'gallery' |
   *                          'phones' | 'video' | 'embed' | 'steps' | 'flow' |
   *                          'insights' | 'components' | 'quote' | 'stats'
   * @param {string|object} label  Nome da área (aparece no placeholder).
   * @param {string|object} [hint] Orientação técnica opcional (formato, proporção…).
   */
  const slot = (expects, label, hint) => ({ type: 'slot', expects, label, hint: hint || '' });

  window.PORTFOLIO = {
    /* ------------------------------------------------------------------------
       CONFIGURAÇÕES
       ------------------------------------------------------------------------ */
    settings: {
      // Mostra o identificador de cada placeholder (ex.: fitness-app/visual/1).
      // Útil durante a montagem; mude para false quando o site estiver completo.
      showSlotIds: true,
      // Mostra a duração calculada de cada experiência (a partir das datas).
      showDurations: true,
      // Idioma usado quando o navegador do visitante não é português nem inglês.
      // Se o navegador estiver em português, o site abre em 'pt'; caso contrário, em 'en'.
      // A escolha feita no seletor PT/EN fica salva para as próximas visitas.
      defaultLang: 'pt',
    },

    /* ------------------------------------------------------------------------
       NAVEGAÇÃO — itens do menu do topo, na ordem em que aparecem.
       O nome "Mayra Portes" no canto esquerdo leva de volta ao início.
       ------------------------------------------------------------------------ */
    nav: [
      { id: 'projects', label: tr('Projetos', 'Work') },
      { id: 'journey', label: tr('Trajetória', 'Journey') },
      { id: 'skills', label: 'Skills' },
      { id: 'contact', label: tr('Contato', 'Contact') },
    ],

    /* ------------------------------------------------------------------------
       INÍCIO / PERFIL
       ------------------------------------------------------------------------ */
    profile: {
      name: 'Mayra Portes',
      firstName: 'Mayra',
      monogram: 'MP',
      role: 'Product Designer | UX/UI Designer',
      tagline: tr(
        'Transformando problemas complexos em experiências digitais simples, intuitivas e envolventes.',
        'Turning complex problems into simple, intuitive and engaging digital experiences.'),
      // Frase de abertura da Home. O trecho em **negrito** aparece em branco; o resto, em cinza.
      statement: tr(
        '**Product Designer** transformando problemas complexos em experiências digitais simples, intuitivas e envolventes.',
        '**Product Designer** turning complex problems into simple, intuitive and engaging digital experiences.'),
      photo: null, // ex.: 'assets/img/profile/mayra.jpg' (proporção recomendada 4:5)
      photoAlt: tr('Foto de Mayra Portes', 'Photo of Mayra Portes'),
      status: { label: 'Open to work', text: tr('Aberta a novas oportunidades', 'Open to new opportunities') },
      badge: 'Product Designer',

      // Os campos abaixo (facts, gymrats, badges, interests) não aparecem no
      // layout minimalista atual. Ficam guardados caso queira usá-los de novo.
      facts: [
        { icon: 'cake', label: 'Idade', value: '29 anos' },
        { icon: 'map-pin', label: 'Localização', value: 'Belo Horizonte — MG, Brasil' },
        { icon: 'briefcase', label: 'Profissão', value: 'Product Designer' },
        { icon: 'dumbbell', label: 'Fitness', value: '4 anos de musculação' },
      ],
      gymrats: {
        label: 'Experiência com GymRats',
        text: 'Já utilizei o aplicativo em desafios promovidos pela empresa onde trabalhei.',
      },
      badges: [
        { icon: 'badge-check', label: 'Product Designer' },
        { icon: 'dumbbell', label: 'Lifter · 4 anos' },
        { icon: 'trophy', label: 'GymRats challenger' },
      ],
      interests: [
        { icon: 'dumbbell', label: 'Musculação' },
        { icon: 'gamepad-2', label: 'Gamificação' },
        { icon: 'users', label: 'Comunidade' },
        { icon: 'cpu', label: 'Tecnologia' },
        { icon: 'smartphone', label: 'Apps mobile' },
      ],
    },

    /* ------------------------------------------------------------------------
       JOURNEY
       Ordem: da mais recente para a mais antiga.
       Datas no formato 'AAAA-MM'. Em 'current: true', 'end' fica null.
       Campos de cada experiência:
         description       resumo em 1–2 frases (opcional)
         responsibilities  lista de atuações
         highlights        destaques / projetos (opcional)
         tags              temas da experiência (aparecem ao expandir)
       Campos vazios são omitidos; se a experiência não tiver nenhum conteúdo,
       aparecem placeholders.
       ------------------------------------------------------------------------ */
    journey: {
      highlights: [
        { icon: 'smartphone',
          title: tr('Produtos Web e Mobile', 'Web and Mobile products'),
          text: tr(
            'Atuação de ponta a ponta: Discovery, pesquisa com usuários, prototipação e validação de hipóteses.',
            'End-to-end work: Discovery, user research, prototyping and hypothesis validation.') },
        { icon: 'layers',
          title: tr('Diferentes segmentos', 'Different industries'),
          text: tr(
            'Produtos financeiros, soluções para empreendedores e aplicativo mobile para o segmento fitness.',
            'Financial products, solutions for entrepreneurs and a mobile app for the fitness market.') },
        { icon: 'sparkles',
          title: 'AI-first',
          text: tr(
            'IA no dia a dia para acelerar pesquisas, explorar alternativas e otimizar processos de design.',
            'AI in my day-to-day work to speed up research, explore alternatives and streamline design processes.') },
      ],
      items: [
        {
          id: 'contaja', company: 'ContaJá', short: 'ContaJá', monogram: 'CJ',
          role: tr('Product Designer Sênior', 'Senior Product Designer'), start: '2025-08', end: null, current: true,
          tags: [{ icon: 'store', label: tr('Empreendedores', 'Entrepreneurs') }],
          description: tr(
            'Evolução de produtos digitais para empreendedores, identificando oportunidades por meio de pesquisas, análise de jornadas e feedbacks.',
            'Evolving digital products for entrepreneurs, identifying opportunities through research, journey analysis and feedback.'),
          responsibilities: [
            tr('Condução de Discovery e pesquisas para identificar problemas, necessidades dos usuários e oportunidades de evolução do produto.',
              'Leading Discovery and research to identify problems, user needs and opportunities to evolve the product.'),
            tr('Mapeamento de jornadas e fluxos, conectando comportamento dos usuários, experiência e objetivos de negócio.',
              'Mapping journeys and flows, connecting user behavior, experience and business goals.'),
            tr('Formulação e validação de hipóteses por meio de pesquisas, feedbacks e análise de métricas de uso.',
              'Framing and validating hypotheses through research, feedback and usage metrics analysis.'),
            tr('Transformação de regras de negócio complexas em experiências digitais simples, intuitivas e funcionais.',
              'Turning complex business rules into simple, intuitive and functional digital experiences.'),
            tr('Criação de wireframes e protótipos de alta fidelidade no Figma para exploração e validação de soluções.',
              'Creating wireframes and high-fidelity prototypes in Figma to explore and validate solutions.'),
            tr('Atuação na evolução da experiência do produto diante das mudanças relacionadas à Reforma Tributária.',
              'Evolving the product experience in response to the changes brought by the Brazilian Tax Reform.'),
            tr('Utilização de Inteligência Artificial para acelerar pesquisas, explorar alternativas de solução, estruturar documentação e otimizar processos de prototipação.',
              'Using Artificial Intelligence to speed up research, explore solution alternatives, structure documentation and streamline prototyping.'),
            tr('Colaboração próxima com Produto, Engenharia e áreas de negócio em ambiente ágil.',
              'Working closely with Product, Engineering and business teams in an agile environment.'),
            tr('Acompanhamento da evolução das soluções e identificação de oportunidades de melhoria contínua.',
              'Following how solutions evolve and identifying opportunities for continuous improvement.'),
          ],
          highlights: [],
        },
        {
          id: 'sinqia-2024', company: 'Sinqia', short: 'Sinqia', monogram: 'SQ',
          role: 'Product Designer', start: '2024-06', end: '2025-08',
          tags: [{ icon: 'landmark', label: tr('Pix · Tesouraria · DDA · IFRS', 'Pix · Treasury · DDA · IFRS') }],
          description: tr(
            'Atuação em produtos financeiros como Pix, Tesouraria, DDA e IFRS, colaborando com squads multidisciplinares e oportunidades de melhoria e Growth.',
            'Worked on financial products such as Pix, Treasury, DDA and IFRS, collaborating with multidisciplinary squads on improvement and Growth opportunities.'),
          responsibilities: [
            tr('Atuação ponta a ponta no ciclo de produto, desde Discovery e entendimento do problema até implementação.',
              'End-to-end work across the product cycle, from Discovery and problem understanding to implementation.'),
            tr('Condução de pesquisas, entrevistas e testes de usabilidade para identificar oportunidades de melhoria na experiência.',
              'Conducting research, interviews and usability tests to identify opportunities to improve the experience.'),
            tr('Mapeamento de jornadas, fluxos e arquitetura da informação.',
              'Mapping journeys, flows and information architecture.'),
            tr('Desenvolvimento de wireframes e protótipos interativos no Figma.',
              'Building wireframes and interactive prototypes in Figma.'),
            tr('Evolução de Design Systems e guidelines, promovendo consistência e escalabilidade.',
              'Evolving Design Systems and guidelines, promoting consistency and scalability.'),
            tr('Tradução de requisitos técnicos e regras de negócio em soluções intuitivas e acessíveis.',
              'Translating technical requirements and business rules into intuitive, accessible solutions.'),
            tr('Facilitação de workshops e colaboração com Produto, Engenharia e stakeholders.',
              'Facilitating workshops and collaborating with Product, Engineering and stakeholders.'),
            tr('Atuação em produtos financeiros como Pix, Tesouraria, DDA e IFRS, considerando necessidades dos usuários e objetivos de negócio.',
              'Working on financial products such as Pix, Treasury, DDA and IFRS, balancing user needs and business goals.'),
            tr('Participação em squads multidisciplinares e cerimônias Scrum.',
              'Taking part in multidisciplinary squads and Scrum ceremonies.'),
          ],
          highlights: [],
        },
        {
          id: 'devzapp', company: 'DevZapp', short: 'DevZapp', monogram: 'DZ',
          role: 'Product Designer', start: '2023-07', end: '2024-06',
          tags: [{ icon: 'diamond', label: 'Double Diamond' }],
          description: '',
          responsibilities: [
            tr('Condução de UX Research, entrevistas e sessões de ideação para compreensão de problemas e necessidades dos usuários.',
              'Leading UX Research, interviews and ideation sessions to understand user problems and needs.'),
            tr('Estruturação de jornadas, fluxos, arquitetura da informação e wireframes.',
              'Structuring journeys, flows, information architecture and wireframes.'),
            tr('Criação e evolução de Design Systems.',
              'Creating and evolving Design Systems.'),
            tr('Prototipação no Figma e validação de hipóteses.',
              'Prototyping in Figma and validating hypotheses.'),
            tr('Aplicação de Design Thinking e Double Diamond nos processos de Discovery.',
              'Applying Design Thinking and Double Diamond to Discovery processes.'),
            tr('Colaboração com Produto e Desenvolvimento na construção e evolução das soluções digitais.',
              'Collaborating with Product and Development to build and evolve digital solutions.'),
          ],
          highlights: [],
        },
        {
          id: 'sinqia-2022', company: 'Sinqia', short: 'Sinqia', monogram: 'SQ',
          role: 'UX/UI Designer', start: '2022-11', end: '2023-07',
          tags: [{ icon: 'landmark', label: tr('Produtos financeiros', 'Financial products') }],
          description: '',
          responsibilities: [
            tr('Criação de interfaces Web e Mobile para produtos financeiros.',
              'Designing Web and Mobile interfaces for financial products.'),
            tr('Condução de entrevistas, testes de usabilidade e provas de conceito.',
              'Conducting interviews, usability tests and proofs of concept.'),
            tr('Documentação de UX e requisitos funcionais e técnicos.',
              'Documenting UX as well as functional and technical requirements.'),
            tr('Participação em squads ágeis e evolução de Design System.',
              'Working in agile squads and evolving the Design System.'),
          ],
          highlights: [],
        },
        {
          id: 'kxp', company: 'KXP Tech', short: 'KXP', monogram: 'KX',
          role: 'UX/UI Designer', start: '2022-06', end: '2022-11',
          tags: [{ icon: 'dumbbell', label: tr('App fitness', 'Fitness app') }],
          description: '',
          responsibilities: [
            tr('Participação no desenvolvimento de um aplicativo mobile de fitness para um influenciador digital, contribuindo para a construção de uma experiência voltada ao universo de saúde, bem-estar e atividade física.',
              'Contributed to the development of a mobile fitness app for a digital influencer, helping build an experience focused on health, well-being and physical activity.'),
            tr('Criação de interfaces e protótipos interativos, considerando usabilidade, experiência do usuário e objetivos do produto.',
              'Designing interfaces and interactive prototypes, considering usability, user experience and product goals.'),
            tr('Condução de workshops para exploração e validação de hipóteses.',
              'Running workshops to explore and validate hypotheses.'),
            tr('Criação de style guides e documentação de padrões visuais e de interface.',
              'Creating style guides and documenting visual and interface patterns.'),
          ],
          highlights: [],
        },
      ],
    },

    /* ------------------------------------------------------------------------
       SKILLS (sem níveis ou porcentagens; termos técnicos em inglês)
       ------------------------------------------------------------------------ */
    skills: [
      {
        id: 'product', icon: 'compass', title: 'Product Design', short: 'Product',
        items: ['Product Discovery', 'UX Research', 'Interaction Design', 'User Flows', 'Information Architecture', 'Usability Testing', 'High-fidelity Prototyping', 'UX Writing'],
      },
      {
        id: 'ui', icon: 'palette', title: 'UI & Design System', short: 'UI & DS',
        items: ['Visual Design', 'Design Systems', 'Component Libraries', 'Design Tokens', 'Documentation', 'Accessibility'],
      },
      {
        id: 'ai', icon: 'sparkles', title: 'AI & Technology', short: 'AI & Tech', featured: true,
        items: ['ChatGPT', 'Claude', 'Figma AI', 'AI-assisted Design', 'Prompt Engineering', 'AI-powered Design Exploration'],
      },
      {
        id: 'collab', icon: 'handshake', title: 'Collaboration', short: 'Collab',
        items: ['Design Sprints', 'Workshops', 'Agile Methodologies', 'Cross-functional Collaboration', 'Engineering Handoff'],
      },
    ],

    /* ------------------------------------------------------------------------
       TEXTOS DAS SEÇÕES
       ------------------------------------------------------------------------ */
    screens: {
      projects: {
        num: '01', title: tr('Projetos selecionados', 'Selected work'),
        subtitle: tr(
          'Conheça alguns projetos que representam minha jornada como Product Designer.',
          'A few projects that represent my journey as a Product Designer.'),
      },
      journey: {
        num: '02', title: tr('Trajetória', 'Journey'),
        subtitle: tr(
          'Minha trajetória profissional, da experiência mais recente à primeira.',
          'My professional path, from the most recent role to the first.'),
      },
      skills: {
        num: '03', title: 'Skills',
        subtitle: tr(
          'Competências que aplico no dia a dia de produto.',
          'Skills I apply in my day-to-day product work.'),
      },
      contact: {
        num: '04',
        title: tr('Vamos construir algo **incrível** juntos.', "Let's build something **great** together."),
        text: tr(
          'Estou aberta a novas oportunidades, desafios e conexões no universo de Product Design.',
          "I'm open to new opportunities, challenges and connections in the Product Design world."),
      },
    },

    /* ------------------------------------------------------------------------
       CONTATO
       ------------------------------------------------------------------------ */
    contact: {
      phoneDisplay: '+55 31 98784-1714',
      phoneE164: '+5531987841714',
      whatsapp: '5531987841714',
      whatsappMessage: tr(
        'Olá, Mayra! Vi seu portfólio e gostaria de conversar.',
        'Hi Mayra! I saw your portfolio and would like to talk.'),
      email: 'mayraportes2@gmail.com',
      emailSubject: tr('Contato via portfólio', 'Contact via portfolio'),
      linkedin: 'https://www.linkedin.com/in/mayraportes/',
    },

    /* ------------------------------------------------------------------------
       PROJETOS + CASES
       ------------------------------------------------------------------------
       Card:  title, client, categories, summary (descrição curta), cover.
       Case:  meta (ficha técnica) + sections (cada uma com blocos).

       Tipos de bloco aceitos:
         { type:'text',     title?, body: 'texto' | ['parágrafo', ...] }
         { type:'list',     title?, intro?, items: ['...'] }
         { type:'image',    title?, src, alt, caption?, wide? }
         { type:'gallery',  title?, columns?: 2|3, items: [{ src, alt, caption? }] }
         { type:'phones',   title?, items: [{ src, alt, caption? }] }      ← mockups mobile
         { type:'video',    title?, src? | embed?, poster?, caption? }
         { type:'embed',    title?, url, ratio?: '16/9', caption?, link?, linkLabel? }
         { type:'steps',    title?, items: [{ title, body?, deliverable? }] } ← etapas / metodologia
         { type:'insights', title?, items: [{ title, icon?, body? }] }      ← body: texto ou lista
         { type:'quote',    text, author? }
         { type:'stats',    title?, items: [{ value, label }] }            ← somente resultados reais
         { type:'diamond',  title?, phases: [{ name, mode?, steps: [...] }] }
       ------------------------------------------------------------------------ */
    projects: [
      {
        id: 'fitness-app',
        index: '01',
        title: 'Fitness App',
        client: 'KXP',
        categories: ['Product Design', 'UX/UI Design', 'Mobile App'],
        summary: tr(
          'Uma experiência digital para transformar treinos em hábitos.',
          'A digital experience that turns workouts into habits.'),
        note: tr(
          'Projeto desenvolvido durante atuação na **KXP** · Projeto não lançado comercialmente',
          'Project developed while working at **KXP** · Not commercially launched'),
        accent: '#FF8034',
        // screens: telas reais nos 3 celulares da capa (esquerda, centro, direita).
        // image: capa definitiva (16:10), substitui a composição.
        cover: { variant: 'fitness', image: null, alt: '', screens: [
          'assets/img/projects/fitness-app/treino.png',
          'assets/img/projects/fitness-app/home.png',
          'assets/img/projects/fitness-app/loja.png',
        ] },
        case: {
          meta: [
            { label: tr('Papel', 'Role'), value: 'Product Designer' },
            { label: tr('Plataforma', 'Platform'), value: tr('Aplicativo mobile', 'Mobile app') },
            { label: 'Status', value: tr('Desenvolvido, não lançado', 'Developed, not launched') },
          ],
          sections: [
            { id: 'overview', title: tr('Visão geral', 'Overview'), blocks: [
              { type: 'text', title: tr('Contexto', 'Context'), body: [
                tr('A KXP recebeu a demanda de desenvolver um aplicativo fitness para um **influenciador digital** que desejava expandir sua atuação no universo fitness por meio de uma plataforma própria de treinos.',
                  'KXP was asked to build a fitness app for a **digital influencer** looking to grow in the fitness space through a dedicated training platform.'),
                tr('A proposta era oferecer aos assinantes acesso a **conteúdos exclusivos**, com treinos conduzidos pelo próprio influenciador, criando uma experiência digital capaz de incentivar a prática de atividades físicas e fortalecer o relacionamento com os clientes.',
                  'The idea was to give subscribers access to **exclusive content**, with workouts led by the influencer, creating a digital experience that encourages physical activity and strengthens the relationship with customers.'),
                tr('O resultado foi um **aplicativo de treinos guiados** com **loja interna**, para que o cliente também pudesse vender produtos dentro da plataforma.',
                  'The result was a **guided workout app** with an **in-app store**, so the client could also sell products within the platform.'),
              ] },
              { type: 'list', title: tr('Objetivo do negócio', 'Business goal'),
                intro: tr('Desenvolver um aplicativo que contribuísse para:', 'Build an app that would help:'),
                items: [
                  tr('Aumentar o engajamento dos assinantes.', 'Increase subscriber engagement.'),
                  tr('Incentivar a recorrência de uso da plataforma.', 'Encourage recurring use of the platform.'),
                  tr('Fortalecer a fidelização dos clientes.', 'Strengthen customer loyalty.'),
                  tr('Agregar valor à marca pessoal do influenciador.', "Add value to the influencer's personal brand."),
                  tr('Criar uma experiência diferenciada de acompanhamento dos treinos.', 'Create a distinctive workout tracking experience.'),
                ] },
              { type: 'text', title: tr('Minha atuação', 'My role'), body: tr(
                '**Product Designer** responsável pela estruturação dos fluxos, arquitetura da informação, experiência do usuário, interface visual, prototipação, validação com o cliente e handoff para desenvolvimento.',
                '**Product Designer** responsible for flows, information architecture, user experience, visual interface, prototyping, client validation and handoff to development.') },
            ] },
            { id: 'challenge', title: tr('O desafio', 'The challenge'), blocks: [
              { type: 'quote', text: tr(
                'Como transformar o conteúdo de um influenciador em uma experiência digital que incentivasse os usuários a manterem uma rotina de treinos?',
                "How might we turn an influencer's content into a digital experience that encourages users to keep a workout routine?") },
              { type: 'text', body: tr(
                'O desafio não estava apenas em disponibilizar vídeos e fotos de exercícios, mas em **organizar esses conteúdos** de maneira intuitiva e atrativa, estimulando o usuário a continuar utilizando o aplicativo.',
                'The challenge was not just making exercise videos and photos available, but **organizing this content** in an intuitive and appealing way that encourages people to keep using the app.') },
              { type: 'insights', title: tr('A experiência precisava equilibrar três aspectos', 'The experience had to balance three aspects'), items: [
                { icon: 'clapperboard', title: tr('Conteúdo', 'Content'), body: tr(
                  'Treinos apresentados pelo próprio influenciador, com vídeos e imagens exclusivos.',
                  'Workouts presented by the influencer, with exclusive videos and images.') },
                { icon: 'route', title: tr('Organização', 'Organization'), body: tr(
                  'Trilhas de treinamento que facilitassem a descoberta e a continuidade dos exercícios.',
                  'Training tracks that make it easy to discover exercises and keep going.') },
                { icon: 'flame', title: tr('Engajamento', 'Engagement'), body: tr(
                  'Uma experiência simples e agradável, que incentivasse o retorno frequente ao aplicativo.',
                  'A simple, enjoyable experience that encourages people to come back often.') },
              ] },
            ] },
            { id: 'concept', title: tr('Conceito da solução', 'Solution concept'),
              lead: tr(
                'A solução foi concebida como uma **plataforma de treinos digitais**, na qual o influenciador seria o principal responsável pelo conteúdo disponibilizado aos assinantes.',
                'The solution was conceived as a **digital training platform**, with the influencer as the main source of the content offered to subscribers.'),
              blocks: [
                { type: 'insights', title: tr('A proposta inicial contemplava', 'The initial proposal included'), items: [
                  { icon: 'play', title: tr('Conteúdo exclusivo', 'Exclusive content'), body: [
                    tr('Vídeos e fotos produzidos pelo influenciador.', 'Videos and photos produced by the influencer.'),
                    tr('Demonstrações dos exercícios.', 'Exercise demonstrations.'),
                    tr('Conteúdo organizado para facilitar o acompanhamento.', 'Content organized to make it easy to follow.'),
                  ] },
                  { icon: 'list-ordered', title: tr('Trilhas de treinamento', 'Training tracks'), body: [
                    tr('Programas de treino organizados por trilhas.', 'Workout programs organized into tracks.'),
                    tr('Sequência estruturada de exercícios.', 'A structured sequence of exercises.'),
                    tr('Navegação facilitada entre os conteúdos.', 'Easy navigation between content.'),
                  ] },
                  { icon: 'shopping-bag', title: tr('Loja interna', 'In-app store'), body: [
                    tr('Venda de produtos do cliente dentro do aplicativo.', "Sale of the client's products inside the app."),
                    tr('Compra durante o vídeo do treino: o produto pode ser adquirido com um clique, sem interromper a experiência.',
                      'Shopping during the workout video: products can be bought with one tap, without interrupting the experience.'),
                  ] },
                  { icon: 'credit-card', title: tr('Assinatura e pagamento', 'Subscription and payment'), body: [
                    tr('Planos de assinatura mensal e anual para acesso ilimitado.', 'Monthly and annual subscription plans for unlimited access.'),
                    tr('Fluxo de pagamento concluído com **Apple Pay** e **Google Pay**.', 'Checkout completed with **Apple Pay** and **Google Pay**.'),
                  ] },
                  { icon: 'smartphone', title: tr('Experiência de uso', 'User experience'), body: [
                    tr('Interface alinhada à identidade visual do influenciador.', "Interface aligned with the influencer's visual identity."),
                    tr('Hierarquia clara das informações.', 'Clear information hierarchy.'),
                    tr('Navegação intuitiva e foco na facilidade de acesso aos treinos.', 'Intuitive navigation focused on easy access to workouts.'),
                  ] },
                ] },
              ] },
            { id: 'process', title: tr('Processo de design', 'Design process'), blocks: [
              { type: 'steps', items: [
                { title: tr('Briefing e entendimento da demanda', 'Briefing and understanding the request'),
                  body: tr('Levantamento das necessidades do cliente, entendimento do modelo de negócio, público esperado e objetivos do aplicativo.',
                    "Gathering the client's needs and understanding the business model, expected audience and app goals."),
                  deliverable: tr('Alinhamento de escopo e requisitos iniciais.', 'Scope alignment and initial requirements.') },
                { title: tr('Fluxos e arquitetura da informação', 'Flows and information architecture'),
                  body: tr('Organização da hierarquia das informações e estruturação dos fluxos de navegação, considerando como o usuário acessaria os treinos e conteúdos.',
                    'Organizing the information hierarchy and structuring navigation flows, considering how users would access workouts and content.'),
                  deliverable: tr('Fluxos de navegação e estrutura das telas.', 'Navigation flows and screen structure.') },
                { title: tr('Prototipação', 'Prototyping'),
                  body: tr('Transformação dos fluxos em uma proposta visual e funcional, explorando a organização dos conteúdos e os padrões de interação.',
                    'Turning the flows into a visual, functional proposal, exploring content organization and interaction patterns.'),
                  deliverable: tr('Protótipo inicial.', 'Initial prototype.') },
                { title: tr('Validação com o cliente', 'Client validation'),
                  body: tr('Apresentação da solução, avaliação das propostas e coleta de feedbacks para identificar ajustes necessários.',
                    'Presenting the solution, reviewing proposals and gathering feedback to identify the adjustments needed.'),
                  deliverable: tr('Refinamento dos fluxos e das interfaces.', 'Refined flows and interfaces.') },
                { title: tr('UI e protótipo de alta fidelidade', 'UI and high-fidelity prototype'),
                  body: tr('Desenvolvimento da interface visual respeitando a identidade da marca, com atenção à hierarquia visual, consistência e princípios de usabilidade.',
                    'Designing the visual interface in line with the brand identity, paying attention to visual hierarchy, consistency and usability principles.'),
                  deliverable: tr('Telas finais e protótipo navegável.', 'Final screens and clickable prototype.') },
                { title: tr('Handoff e desenvolvimento', 'Handoff and development'),
                  body: tr('Preparação e compartilhamento dos materiais com o time de desenvolvimento para implementação da solução.',
                    'Preparing and sharing materials with the development team to implement the solution.'),
                  deliverable: tr('Especificações e handoff para engenharia.', 'Specs and handoff to engineering.') },
              ] },
            ] },
            { id: 'decisions', title: tr('Decisões de UX/UI', 'UX/UI decisions'), blocks: [
              { type: 'insights', items: [
                { icon: 'layers', title: tr('Hierarquia visual', 'Visual hierarchy'), body: tr(
                  'Organização dos conteúdos para facilitar a identificação e o acesso aos treinos.',
                  'Content organized to make workouts easy to find and access.') },
                { icon: 'layout-grid', title: tr('Organização dos conteúdos', 'Content organization'), body: tr(
                  'Estruturação das trilhas para tornar a navegação mais intuitiva.',
                  'Training tracks structured to make navigation more intuitive.') },
                { icon: 'pointer', title: tr('Facilidade de interação', 'Ease of interaction'), body: tr(
                  'Priorização de interações simples para reduzir o esforço durante o acesso aos exercícios.',
                  'Simple interactions prioritized to reduce effort when accessing exercises.') },
                { icon: 'palette', title: tr('Identidade visual do cliente', "The client's visual identity"), body: tr(
                  'Logo, cores e fontes vieram do cliente. Meu trabalho foi aplicar essa identidade da melhor forma na interface, mantendo legibilidade e consistência.',
                  'The logo, colors and fonts came from the client. My job was to apply that identity to the interface in the best possible way, keeping it legible and consistent.') },
              ] },
            ] },
            { id: 'screens', title: tr('A solução em telas', 'The solution in screens'), blocks: [
              { type: 'phones', items: [
                { src: 'assets/img/projects/fitness-app/onboarding.png',
                  alt: tr('Tela de onboarding Treinos guiados com a mensagem de treinar com o influenciador sem sair de casa, indicador de etapas e botão Continuar.',
                    'Guided workouts onboarding screen with the message to train with the influencer without leaving home, a step indicator and a Continue button.'),
                  caption: tr('**Onboarding** Apresentação da proposta de treinos guiados.', '**Onboarding** Introduces the guided workout concept.') },
                { src: 'assets/img/projects/fitness-app/boas-vindas.png',
                  alt: tr('Tela de boas-vindas com a logo do cliente e opções para continuar com Google, Apple ou e-mail.',
                    'Welcome screen with the client logo and options to continue with Google, Apple or email.'),
                  caption: tr('**Boas-vindas** Cadastro com Google, Apple ou e-mail.', '**Welcome** Sign up with Google, Apple or email.') },
                { src: 'assets/img/projects/fitness-app/home.png',
                  alt: tr('Home com saudação, treino do dia, carrossel de módulos e banner de acesso à loja.',
                    'Home with a greeting, workout of the day, module carousel and a banner to the store.'),
                  caption: tr('**Home** Treino do dia, módulos de treino e atalho para a loja.', '**Home** Workout of the day, workout modules and a shortcut to the store.') },
                { src: 'assets/img/projects/fitness-app/treino.png',
                  alt: tr('Tela do programa Funcional com duração, calorias, descrição e lista de treinos com status de bloqueado, concluído e favorito.',
                    'Functional program screen with duration, calories, description and a workout list with locked, completed and favorite states.'),
                  caption: tr('**Treino guiado** Programa com duração, calorias e sequência de vídeos.', '**Guided workout** Program with duration, calories and a sequence of videos.') },
                { src: 'assets/img/projects/fitness-app/loja.png',
                  alt: tr('Tela da loja com atalhos para sacola, pedidos, favoritos e FAQ, busca, filtros e grade de produtos com botão Comprar.',
                    'Store screen with shortcuts to bag, orders, favorites and FAQ, search, filters and a product grid with Buy buttons.'),
                  caption: tr('**Loja interna** Busca, filtros e compra de produtos do cliente.', "**In-app store** Search, filters and purchase of the client's products.") },
                { src: 'assets/img/projects/fitness-app/assinatura.png',
                  alt: tr('Tela Seja Pro com planos de assinatura mensal e anual e botão Assine agora.',
                    '“Seja Pro” (Go Pro) screen with monthly and annual subscription plans and a Subscribe now button.'),
                  caption: tr('**Seja Pro** Planos mensal e anual, com pagamento via Apple Pay e Google Pay.', '**Go Pro** Monthly and annual plans, paid with Apple Pay and Google Pay.') },
              ] },
            ] },
            { id: 'handoff', title: tr('Handoff e implementação', 'Handoff and implementation'), blocks: [
              { type: 'text', body: [
                tr('Após a validação e finalização das interfaces, o projeto avançou para a etapa de handoff.',
                  'After the interfaces were validated and finalized, the project moved on to handoff.'),
                tr('Os materiais foram compartilhados com o time de desenvolvimento, que deu continuidade à implementação do aplicativo.',
                  'The materials were shared with the development team, who carried on with the implementation of the app.'),
                tr('Essa etapa permitiu conectar as decisões de design à execução técnica, garantindo que a solução projetada pudesse ser interpretada e desenvolvida pela equipe de engenharia.',
                  'This stage connected design decisions to technical execution, ensuring the designed solution could be understood and built by the engineering team.'),
              ] },
            ] },
            { id: 'results', title: tr('Resultados e limitações', 'Results and limitations'), blocks: [
              { type: 'list', title: tr('O que foi alcançado', 'What was achieved'), items: [
                tr('Estruturação da experiência digital do produto.', 'Structured the digital product experience.'),
                tr('Definição dos fluxos e da arquitetura da informação.', 'Defined the flows and information architecture.'),
                tr('Desenvolvimento das interfaces de alta fidelidade.', 'Designed the high-fidelity interfaces.'),
                tr('Validação da proposta com o cliente.', 'Validated the proposal with the client.'),
                tr('Handoff realizado para desenvolvimento.', 'Completed the handoff to development.'),
                tr('Aplicativo desenvolvido pela equipe técnica.', 'App built by the technical team.'),
              ] },
              { type: 'text', title: tr('O que não foi mensurado', 'What was not measured'), body: [
                tr('Embora o aplicativo tenha chegado à etapa de desenvolvimento, ele **não foi lançado comercialmente** devido a desacordos comerciais entre as partes envolvidas.',
                  'Although the app reached the development stage, it was **not commercially launched** due to commercial disagreements between the parties involved.'),
                tr('Por esse motivo, não houve uma etapa de lançamento, acompanhamento de usuários ou coleta de métricas de negócio e produto. Não existem, portanto, dados de retenção, engajamento ou conversão que permitam avaliar o desempenho da solução.',
                  'As a result, there was no launch, user monitoring or collection of business and product metrics. There is therefore no retention, engagement or conversion data to assess how the solution performed.'),
              ] },
            ] },
            { id: 'learnings', title: tr('Aprendizados', 'Learnings'),
              lead: tr(
                'Uma experiência que ampliou minha visão sobre produtos digitais no universo fitness.',
                'An experience that broadened my view of digital products in the fitness space.'),
              blocks: [
                { type: 'text', body: tr(
                  'O projeto proporcionou contato com os desafios de transformar conteúdo em uma experiência digital estruturada, especialmente em um contexto no qual o engajamento e a recorrência de uso são fundamentais para o modelo de negócio.',
                  'The project exposed me to the challenges of turning content into a structured digital experience, especially in a context where engagement and recurring use are central to the business model.') },
                { type: 'list', title: tr('Principais aprendizados', 'Key learnings'), items: [
                  tr('A importância de compreender o modelo de negócio antes de desenhar a solução.', 'The importance of understanding the business model before designing the solution.'),
                  tr('Como a organização dos conteúdos influencia a experiência de navegação.', 'How content organization shapes the navigation experience.'),
                  tr('O papel da identidade visual na construção de uma experiência de marca.', 'The role of visual identity in building a brand experience.'),
                  tr('A importância da validação com stakeholders antes da implementação.', 'The importance of validating with stakeholders before implementation.'),
                  tr('A necessidade de considerar métricas de engajamento e retenção desde a concepção do produto.', 'The need to consider engagement and retention metrics from the very start of the product.'),
                ] },
              ] },
          ],
        },
      },
      {
        id: 'contaja',
        index: '02',
        title: 'Research & Discovery',
        client: 'ContaJá',
        categories: ['UX Research', 'Product Discovery'],
        summary: tr(
          'Proposta de um **Dashboard Financeiro** para os mais de 12 mil micro e pequenos negócios atendidos pela ContaJá: indicadores claros e visuais para acompanhar a saúde financeira e tomar decisões, sem precisar “entender de contabilidade”.',
          'A proposal for a **Financial Dashboard** for the more than 12,000 micro and small businesses served by ContaJá: clear, visual indicators to track financial health and make decisions without having to “understand accounting”.'),
        accent: '#A8B1FF',
        cover: { variant: 'research', image: null, alt: '' },
        case: {
          meta: [
            { label: tr('Papel', 'Role'), value: 'Product Designer' },
            { label: tr('Escopo', 'Scope'), value: tr('Dashboard de indicadores financeiros', 'Financial indicators dashboard') },
            { label: tr('Ferramentas', 'Tools'), value: 'FigJam' },
          ],
          sections: [
            { id: 'intro', title: tr('Introdução', 'Introduction'), blocks: [
              { type: 'text', body: [
                tr('A ContaJá atende mais de **12 mil micro e pequenas empresas prestadoras de serviço** no Brasil.',
                  'ContaJá serves more than **12,000 micro and small service businesses** in Brazil.'),
                tr('Este projeto apresenta a proposta de um Dashboard Financeiro acessível, útil e claro, que ajuda esses clientes a visualizar a saúde financeira do negócio com dados simples, sem precisar “entender de contabilidade”.',
                  'This project presents a proposal for an accessible, useful and clear Financial Dashboard that helps these customers see the financial health of their business with simple data, without having to “understand accounting”.'),
              ] },
            ] },
            { id: 'context', title: tr('Contexto', 'Context'), blocks: [
              { type: 'text', body: [
                tr('A ContaJá busca novas soluções digitais que gerem **valor real ao cliente** e aumentem a receita com **produtos complementares (cross-sell)**.',
                  'ContaJá is looking for new digital solutions that create **real value for customers** and grow revenue through **complementary products (cross-sell)**.'),
                tr('O Dashboard Financeiro surgiu como uma ideia ainda em fase inicial: dar ao empreendedor uma visão simples da saúde financeira do próprio negócio e, ao mesmo tempo, ampliar o portfólio de produtos da empresa.',
                  "The Financial Dashboard started as an early-stage idea: give entrepreneurs a simple view of their business's financial health while expanding the company's product portfolio."),
              ] },
            ] },
            { id: 'objectives', title: tr('Objetivos', 'Goals'),
              lead: tr(
                'A missão: criar a proposta de um dashboard de indicadores financeiros focado em:',
                'The mission: propose a financial indicators dashboard focused on:'),
              blocks: [
                { type: 'list', items: [
                  tr('**Tomada de decisão prática**: indicadores que ajudam o cliente a agir, não apenas a consultar números.',
                    '**Practical decision-making**: indicators that help customers act, not just look up numbers.'),
                  tr('**Visualizações intuitivas**: gráficos e componentes fáceis de ler e interpretar.',
                    '**Intuitive visualizations**: charts and components that are easy to read and interpret.'),
                  tr('**Clareza para quem tem pouca familiaridade com finanças**: linguagem simples, sem jargão contábil.',
                    '**Clarity for people unfamiliar with finance**: plain language, no accounting jargon.'),
                ] },
              ] },
            { id: 'development', title: tr('Desenvolvimento', 'Development'),
              lead: tr(
                'Metodologia escolhida: **Double Diamond**, alternando momentos de divergência e convergência para entender o problema antes de definir a solução.',
                'Chosen methodology: **Double Diamond**, alternating between divergence and convergence to understand the problem before defining the solution.'),
              blocks: [
                // Etapas agrupadas pelas fases do Double Diamond.
                // Cada etapa aceita texto simples ou { title, body } para detalhar depois.
                { type: 'diamond', title: tr('Etapas do processo', 'Process steps'), phases: [
                  { name: tr('Descobrir', 'Discover'), mode: tr('Divergir', 'Diverge'), steps: [
                    'Desk research',
                    tr('Elaboração de roteiro de entrevista', 'Interview script'),
                    tr('Matriz CSD', 'CSD Matrix'),
                    tr('Análise de concorrentes', 'Competitive analysis'),
                    'Proto-persona',
                  ] },
                  { name: tr('Definir', 'Define'), mode: tr('Convergir', 'Converge'), steps: [
                    tr('Entendimento do problema', 'Problem understanding'),
                  ] },
                  { name: tr('Desenvolver', 'Develop'), mode: tr('Divergir', 'Diverge'), steps: [
                    tr('Ideação', 'Ideation'),
                    tr('Definição do MVP', 'MVP definition'),
                  ] },
                  { name: tr('Entregar', 'Deliver'), mode: tr('Convergir', 'Converge'), steps: [
                    tr('Definição de métricas', 'Metrics definition'),
                    tr('Prototipação', 'Prototyping'),
                  ] },
                ] },
                { type: 'embed',
                  title: tr('Raciocínio do projeto no FigJam', 'Project reasoning in FigJam'),
                  url: 'https://www.figma.com/embed?embed_host=share&url=' + encodeURIComponent('https://www.figma.com/board/fjMd6zgvu5YZp0hpjqUBZe/Contaj%C3%A1?node-id=46-548'),
                  link: 'https://www.figma.com/board/fjMd6zgvu5YZp0hpjqUBZe/Contaj%C3%A1?node-id=46-548&t=hFbMU5rdARgIYD77-0',
                  linkLabel: tr('Abrir no FigJam', 'Open in FigJam'),
                  ratio: '16/10' },
                { type: 'image',
                  title: tr('Matriz CSD', 'CSD Matrix'),
                  src: 'assets/img/projects/contaja/matriz-csd.jpg',
                  alt: tr('Matriz CSD com notas organizadas em três colunas: Certezas, Suposições e Dúvidas sobre o dashboard financeiro para microempreendedores.',
                    'CSD Matrix with notes organized in three columns: Certainties, Suppositions and Doubts about the financial dashboard for micro-entrepreneurs.'),
                  caption: tr('Certezas, suposições e dúvidas levantadas antes de definir o problema.',
                    'Certainties, suppositions and doubts raised before defining the problem.') },
                { type: 'image',
                  title: 'Proto-persona',
                  src: 'assets/img/projects/contaja/proto-persona.jpg',
                  alt: tr('Proto-persona Danilo, 39 anos, proprietário de loja de acessórios de celular em Belo Horizonte, com objetivos, dores e frustrações e comportamento digital.',
                    'Proto-persona Danilo, 39, owner of a phone accessories store in Belo Horizonte, with goals, pain points and frustrations, and digital behavior.'),
                  caption: tr('Danilo: “Quero entender se estou ganhando dinheiro, sem precisar entender de contabilidade.”',
                    'Danilo: “I want to know if I’m making money, without having to understand accounting.”') },
                { type: 'insights', title: tr('MVP: funcionalidades', 'MVP: features'), items: [
                  { icon: 'wallet', title: tr('Resumo financeiro do mês', 'Monthly financial summary'),
                    body: tr('Faturamento, despesas, lucro/prejuízo.', 'Revenue, expenses, profit/loss.') },
                  { icon: 'chart-column', title: tr('Comparativo dos últimos 3 meses', 'Last 3 months comparison'),
                    body: tr('Gráfico de barras simples para acompanhamento de período.', 'Simple bar chart to track the period.') },
                  { icon: 'bell-ring', title: tr('Alertas de tributos', 'Tax alerts'),
                    body: tr('Próximo vencimento e valor.', 'Next due date and amount.') },
                  { icon: 'info', title: tr('Explicações curtas nos indicadores', 'Short explanations on indicators'),
                    body: tr('Tooltips ou frases simples (“Lucro = Faturamento - Despesas”).', 'Tooltips or simple sentences (“Profit = Revenue − Expenses”).') },
                  { icon: 'smartphone', title: tr('Layout responsivo para celular', 'Mobile-responsive layout'),
                    body: tr('Acesso fácil via smartphone.', 'Easy access on a smartphone.') },
                ] },
                { type: 'list', title: tr('MVP: dados necessários', 'MVP: required data'), items: [
                  tr('Faturamento bruto mensal', 'Monthly gross revenue'),
                  tr('Total de despesas mensais', 'Total monthly expenses'),
                  tr('Valor e data de vencimento de tributos', 'Tax amounts and due dates'),
                  tr('Histórico dos últimos 3 meses', 'History of the last 3 months'),
                ] },
              ] },
            { id: 'visual', title: tr('Conteúdo visual', 'Visuals'), blocks: [
              { type: 'image',
                title: tr('Proposta do Dashboard Financeiro', 'Financial Dashboard proposal'),
                src: 'assets/img/projects/contaja/dashboard-wireframe.png',
                alt: tr('Wireframe do dashboard financeiro com faturamento, despesas, lucro, receita líquida média, gráficos de faturamento x lucro e de despesas por categoria, alerta de impostos e impostos pagos x em aberto, com anotações de comportamento.',
                  'Wireframe of the financial dashboard with revenue, expenses, profit, average net income, revenue vs. profit and expenses by category charts, a tax alert and paid vs. outstanding taxes, with behavior annotations.'),
                caption: tr('Wireframe anotado: comparativo com o mês anterior, filtro por período, alertas de impostos e tooltips explicativos em cada indicador.',
                  'Annotated wireframe: comparison with the previous month, period filter, tax alerts and explanatory tooltips on each indicator.') },
            ] },
            { id: 'ai', title: tr('Evolução com IA', 'Evolving with AI'),
              lead: tr(
                'Objetivo da funcionalidade: transformar o dashboard em um **assistente financeiro interativo**, que não apenas exibe dados, mas interpreta e aconselha, guiando o usuário na tomada de decisões conscientes.',
                'Feature goal: turn the dashboard into an **interactive financial assistant** that doesn’t just display data but interprets it and gives advice, guiding users toward informed decisions.'),
              blocks: [
                { type: 'insights', title: tr('Benefícios esperados', 'Expected benefits'), items: [
                  { icon: 'languages', title: tr('Maior compreensão dos dados', 'Better understanding of the data'),
                    body: tr('A IA traduz métricas em linguagem simples.', 'AI translates metrics into plain language.') },
                  { icon: 'user-check', title: tr('Apoio à decisão personalizada', 'Personalized decision support'),
                    body: tr('Com base no histórico e nos indicadores do próprio usuário.', "Based on the user's own history and indicators.") },
                  { icon: 'users', title: tr('Redução da dependência de consultores', 'Less reliance on consultants') },
                  { icon: 'shield-check', title: tr('Aumento da confiança do usuário sobre o uso do sistema', 'Greater user confidence in the system') },
                ] },
                { type: 'insights', title: tr('Possibilidades futuras', 'Future possibilities'), items: [
                  { icon: 'sparkles', title: tr('Sugestões automáticas de ação', 'Automatic action suggestions'),
                    body: tr('“Corte 10% das despesas com fornecedores para voltar ao lucro.”', '“Cut supplier expenses by 10% to get back to profit.”') },
                  { icon: 'triangle-alert', title: tr('Alertas de risco baseados em comportamento financeiro', 'Risk alerts based on financial behavior'),
                    body: tr('“Seu custo fixo está comprometendo mais de 70% do faturamento.”', '“Your fixed costs are taking up more than 70% of your revenue.”') },
                  { icon: 'calculator', title: tr('Simulações rápidas', 'Quick simulations'),
                    body: tr('“E se eu aumentar meu preço em 10%?”', '“What if I raise my price by 10%?”') },
                ] },
              ] },
          ],
        },
      },
    ],

    /* ------------------------------------------------------------------------
       TEXTOS DA INTERFACE (botões, rótulos, mensagens e acessibilidade)
       ------------------------------------------------------------------------ */
    strings: {
      pageTitle: 'Mayra Portes — Product Designer | UX/UI Designer',
      pageDescription: tr(
        'Portfólio de Mayra Portes, Product Designer e UX/UI Designer em Belo Horizonte. Transformando problemas complexos em experiências digitais simples, intuitivas e envolventes.',
        'Portfolio of Mayra Portes, Product Designer and UX/UI Designer based in Belo Horizonte, Brazil. Turning complex problems into simple, intuitive and engaging digital experiences.'),
      skipLink: tr('Pular para o conteúdo', 'Skip to content'),
      home: tr('Início', 'Home'),
      backHome: tr('voltar ao início', 'back to top'),
      sections: tr('Seções', 'Sections'),
      language: tr('Idioma', 'Language'),
      contactLinks: tr('Contato', 'Contact'),
      companies: tr('Empresas onde trabalhou', 'Companies I have worked at'),
      soon: tr('em breve', 'coming soon'),
      noscript: tr(
        'Este portfólio é interativo e precisa de JavaScript. Contato: mayraportes2@gmail.com · +55 31 98784-1714',
        'This portfolio is interactive and requires JavaScript. Contact: mayraportes2@gmail.com · +55 31 98784-1714'),

      // Journey
      rolesCount: tr('experiências · mais recente primeiro', 'roles · most recent first'),
      expandAll: tr('Expandir tudo', 'Expand all'),
      collapseAll: tr('Recolher tudo', 'Collapse all'),
      current: tr('atual', 'current'),
      present: tr('Atual', 'Present'),
      months: tr(
        ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']),
      year: tr('ano', 'year'),
      years: tr('anos', 'years'),
      month: tr('mês', 'month'),
      monthsWord: tr('meses', 'months'),
      and: tr('e', 'and'),
      aboutRole: tr('Sobre a experiência', 'About this role'),
      responsibilities: tr('Responsabilidades', 'Responsibilities'),
      whatIDid: tr('Atuação', 'What I did'),
      highlightsTitle: tr('Destaques e projetos', 'Highlights and projects'),

      // Contato
      email: tr('E-mail', 'Email'),
      phone: tr('Telefone', 'Phone'),
      sendMessage: tr('Enviar mensagem', 'Send a message'),
      copy: tr('Copiar', 'Copy'),
      copyEmail: tr('Copiar e-mail', 'Copy email'),
      copyPhone: tr('Copiar telefone', 'Copy phone number'),
      emailCopied: tr('E-mail copiado', 'Email copied'),
      phoneCopied: tr('Telefone copiado', 'Phone number copied'),
      copied: tr('Copiado', 'Copied'),
      linkedinSoon: tr('O link do LinkedIn será adicionado em breve.', 'The LinkedIn link will be added soon.'),
      backToTop: tr('Voltar ao topo', 'Back to top'),

      // Cases
      viewCase: tr('ver case', 'view case'),
      categories: tr('Categorias', 'Categories'),
      tbd: tr('A definir', 'To be defined'),
      caseSections: tr('Seções do case', 'Case sections'),
      inThisCase: tr('Neste case', 'In this case'),
      nextCase: tr('Próximo case', 'Next case'),
      caseSummary: tr('Resumo do case', 'Case summary'),
      closeCase: tr('Fechar case e voltar aos projetos', 'Close case and go back to projects'),
      close: tr('Fechar', 'Close'),
      deliverable: tr('Entrega', 'Deliverable'),
      enlarge: tr('Ampliar', 'Enlarge'),
      enlargeImage: tr('Ampliar imagem', 'Enlarge image'),
      enlargedImage: tr('Imagem ampliada', 'Enlarged image'),
      toggleZoom: tr('Alternar zoom', 'Toggle zoom'),
      closeImage: tr('Fechar imagem', 'Close image'),
      video: tr('Vídeo', 'Video'),
      embedded: tr('Conteúdo incorporado', 'Embedded content'),
      openNewTab: tr('Abrir em nova aba', 'Open in a new tab'),

      // Placeholders
      coverSlot: tr('Espaço para capa', 'Cover placeholder'),
      awaiting: tr('Aguardando conteúdo', 'Awaiting content'),
      placeholder: tr('Espaço reservado', 'Placeholder'),
      slotTypes: {
        text: tr('Texto', 'Text'),
        list: tr('Lista', 'List'),
        image: tr('Imagem', 'Image'),
        gallery: tr('Galeria', 'Gallery'),
        phones: 'Mockups mobile',
        video: tr('Vídeo', 'Video'),
        embed: tr('Protótipo / embed', 'Prototype / embed'),
        steps: tr('Etapas do processo', 'Process steps'),
        flow: tr('Fluxo / diagrama', 'Flow / diagram'),
        insights: 'Insights',
        components: tr('Componentes', 'Components'),
        quote: tr('Citação', 'Quote'),
        stats: tr('Resultados', 'Results'),
      },
    },
  };
})();
