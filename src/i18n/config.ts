import i18next from 'i18next'

import type { Lang } from './types'

export const LANGS: Lang[] = ['en', 'pt']
/** what the server renders, and the fallback when nothing else matches */
export const DEFAULT_LANG: Lang = 'en'
export const LANG_STORAGE_KEY = 'lang'

/**
 * Picks the first supported language out of a list of BCP 47 tags, most
 * preferred first — `['pt-BR', 'en-US']` resolves to `pt`. Only the primary
 * subtag is compared, so `pt-PT` and `pt-BR` both land on `pt`.
 */
export function resolveLang(candidates: readonly string[]): Lang {
  for (const candidate of candidates) {
    const base = candidate.toLowerCase().split('-')[0]
    if ((LANGS as string[]).includes(base)) return base as Lang
  }
  return DEFAULT_LANG
}

const en = {
  nav: {
    work: 'work',
    path: 'path',
    projects: 'projects',
    credentials: 'credentials',
    now: 'now',
    reading: 'reading',
    off: 'off',
    uses: 'uses',
    contact: 'contact',
    home: 'home',
    back: 'back',
    menu: 'menu',
  },
  header: {
    role: 'front-end · full-stack',
  },
  hero: {
    bio: 'I have been working with React and TypeScript for six years, across fintech, consultancies and SaaS. Right now I am the frontend technical lead at Twila. I started out full-stack, with Rails, .NET and React Native, and I want to get back to working with back-end too.',
    bioShort:
      'Front-end developer and tech lead at Twila. Six years of React and TypeScript, after starting full-stack with Rails, .NET and React Native.',
    photoAlt: 'Gabriela Liz',
    hoverMe: 'hover me',
  },
  actions: {
    getInTouch: 'get in touch',
    resume: 'resume',
    resumePt: 'resume pt-br',
    resumeEn: 'resume en',
    allProjects: 'all projects',
    readTheCase: 'read the case',
    copy: 'copy',
    send: 'send',
    copied: 'copied!',
    letsTalk: "let's talk",
  },
  caseStudy: {
    label: 'case study',
    role: 'role',
    timeline: 'timeline',
    stack: 'stack',
    links: 'links',
    deploy: 'deploy',
    deployMissing: '[deploy — add link]',
    figure: 'fig. 01 — links and metrics dashboard',
    problem: 'the problem',
    constraints: 'constraints',
    decisions: 'technical decisions',
    redirectFlow: 'redirect flow',
    outcome: 'outcome',
    retrospective: "what I'd do differently",
    next: 'Want the next one?',
  },
  projects: {
    subtitle: 'Front-end, full-stack and mobile. You can filter by technology, back-end included.',
  },
  sections: {
    projects: 'Projects',
    path: 'Path',
    now: 'Now',
    education: 'Education',
    contact: "Let's talk",
  },
  stats: {
    years: 'years shipping',
    companies: 'companies',
    languages: 'languages',
    masterchef: 'masterchef eps',
  },
  filter: {
    label: 'filter by stack',
    all: 'All',
    clickToExpand: 'click to expand',
    roleCount_one: '{{count}} of {{total}} role',
    roleCount_other: '{{count}} of {{total}} roles',
    projectCount_one: '{{count}} of {{total}}',
    projectCount_other: '{{count}} of {{total}}',
  },
  contact: {
    email: 'email',
    linkedin: 'linkedin',
    github: 'github',
  },
  credentials: {
    title: 'Credentials',
    subtitle: 'Courses, certificates and degrees, most recent first.',
    filterLabel: 'filter by area',
    // the noun agrees with the total, so `count` is the total and `shown` the match count
    count_one: '{{shown}} of {{count}} certificate',
    count_other: '{{shown}} of {{count}} certificates',
    verify: 'verify',
    all: 'all certificates ({{count}}) ↗',
    status: {
      done: 'done',
      progress: 'in progress',
      award: 'award',
    },
  },
  personal: {
    now: {
      title: 'Now',
      subtitle: 'What I am up to at the moment.',
      work: 'work',
      learning: 'learning',
      finished: 'finished',
      reading: 'reading',
      life: 'life',
      wanting: 'wanting',
      updated: 'updated {{date}}',
      uses: 'my setup →',
    },
    reading: {
      title: 'Reading',
      subtitle: "My shelf. What I'm reading now and what has already been through it.",
      current: 'currently reading',
      progress: '{{percent}}% · page {{page}}',
      since: 'since {{date}}',
      shelf: 'shelf',
      colBook: 'book',
      colStatus: 'status',
      colRating: 'rating',
      rating: '{{value}} out of 5',
      status: {
        reading: 'reading',
        finished: 'finished',
        abandoned: 'abandoned',
      },
    },
    off: {
      title: 'Off',
      subtitle: 'What I do when I am not writing code.',
    },
    uses: {
      title: 'Uses',
      subtitle: 'The tools I use day to day.',
    },
  },
  footer: {
    copyright: 'gabiliz.dev · 2026',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'E-mail',
  },
}

const pt: typeof en = {
  nav: {
    work: 'trabalho',
    path: 'trajetória',
    projects: 'projetos',
    credentials: 'certificações',
    now: 'agora',
    reading: 'leituras',
    off: 'fora do código',
    uses: 'setup',
    contact: 'contato',
    home: 'início',
    back: 'voltar',
    menu: 'menu',
  },
  header: {
    role: 'front-end · full-stack',
  },
  hero: {
    bio: 'Faz seis anos que eu trabalho com React e TypeScript, passando por fintech, consultoria e SaaS. Hoje lidero tecnicamente o frontend na Twila. Comecei full-stack, com Rails, .NET e React Native, e quero voltar a trabalhar com back-end também.',
    bioShort:
      'Front-end e liderança técnica na Twila. Seis anos de React e TypeScript, depois de começar full-stack com Rails, .NET e React Native.',
    photoAlt: 'Gabriela Liz',
    hoverMe: 'passe o mouse',
  },
  actions: {
    getInTouch: 'fale comigo',
    resume: 'currículo',
    resumePt: 'currículo pt-br',
    resumeEn: 'currículo en',
    allProjects: 'todos os projetos',
    readTheCase: 'ler o case',
    copy: 'copiar',
    send: 'enviar',
    copied: 'copiado!',
    letsTalk: 'vamos conversar',
  },
  caseStudy: {
    label: 'case study',
    role: 'papel',
    timeline: 'duração',
    stack: 'stack',
    links: 'links',
    deploy: 'deploy',
    deployMissing: '[deploy — colocar link]',
    figure: 'fig. 01 — painel de links e métricas',
    problem: 'o problema',
    constraints: 'restrições',
    decisions: 'decisões técnicas',
    redirectFlow: 'fluxo do redirect',
    outcome: 'resultado',
    retrospective: 'o que eu faria diferente',
    next: 'Quer o próximo?',
  },
  projects: {
    subtitle:
      'Front-end, full-stack e mobile. Dá para filtrar por tecnologia, inclusive de back-end.',
  },
  sections: {
    projects: 'Projetos',
    path: 'Trajetória',
    now: 'Agora',
    education: 'Formação',
    contact: 'Vamos conversar',
  },
  stats: {
    years: 'anos em produção',
    companies: 'empresas',
    languages: 'idiomas',
    masterchef: 'episódios de masterchef',
  },
  filter: {
    label: 'filtrar por stack',
    all: 'Todos',
    clickToExpand: 'clique para expandir',
    roleCount_one: '{{count}} de {{total}} cargo',
    roleCount_other: '{{count}} de {{total}} cargos',
    projectCount_one: '{{count}} de {{total}}',
    projectCount_other: '{{count}} de {{total}}',
  },
  contact: {
    email: 'e-mail',
    linkedin: 'linkedin',
    github: 'github',
  },
  credentials: {
    title: 'Certificações',
    subtitle: 'Cursos, certificados e formação, do mais recente para o mais antigo.',
    filterLabel: 'filtrar por área',
    count_one: '{{shown}} de {{count}} certificado',
    count_other: '{{shown}} de {{count}} certificados',
    verify: 'verificar',
    all: 'todos os certificados ({{count}}) ↗',
    status: {
      done: 'concluído',
      progress: 'em andamento',
      award: 'prêmio',
    },
  },
  personal: {
    now: {
      title: 'Agora',
      subtitle: 'O que eu estou fazendo neste momento.',
      work: 'trabalho',
      learning: 'estudando',
      finished: 'concluí',
      reading: 'lendo',
      life: 'vida',
      wanting: 'querendo',
      updated: 'atualizado em {{date}}',
      uses: 'meu setup →',
    },
    reading: {
      title: 'Leituras',
      subtitle: 'Minha estante. O que estou lendo agora e o que já passou por aqui.',
      current: 'lendo agora',
      progress: '{{percent}}% · página {{page}}',
      since: 'desde {{date}}',
      shelf: 'estante',
      colBook: 'livro',
      colStatus: 'status',
      colRating: 'nota',
      rating: '{{value}} de 5',
      status: {
        reading: 'lendo',
        finished: 'concluído',
        abandoned: 'abandonado',
      },
    },
    off: {
      title: 'Fora do código',
      subtitle: 'O que eu faço quando não estou programando.',
    },
    uses: {
      title: 'Setup',
      subtitle: 'As ferramentas que eu uso no dia a dia.',
    },
  },
  footer: {
    copyright: 'gabiliz.dev · 2026',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'E-mail',
  },
}

if (!i18next.isInitialized) {
  i18next.init({
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: LANGS,
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    interpolation: { escapeValue: false },
  })
}

export default i18next
