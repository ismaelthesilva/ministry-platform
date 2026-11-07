export type Lang = "en" | "br";

export interface ProgressItem {
  name: string;
  badge: string;
  desc: string;
}

export interface CardItem {
  title: string;
  body: string;
}

export interface VeniCopy {
  langLabel: string;
  logoAlt: string;
  logoMiniAlt: string;
  langSelectLabel: string;

  heroTitle: string;
  epigrafe: string;
  epigrafeRef: string;
  subtitle: string;
  btnGithub: string;
  btnSample: string;
  btnRead: string;

  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  aboutP3: string;
  aboutP4: string;

  metodoTitle: string;
  cards: CardItem[];

  transparenciaTitle: string;
  transparenciaP1: string;
  transparenciaP2: string;

  amostraTitle: string;
  // PT only (rendered when lang === "br")
  sampleSubheading1: string;
  sampleSubheading2: string;
  samplePtNote: string;
  // EN only (rendered when lang === "en")
  sampleEnCardText: string;
  sampleEnCardBtn: string;
  amostraNote: string;

  andamentoTitle: string;
  progress: ProgressItem[];

  licencaTitle: string;
  licencaP1: string;
  licencaP2a: string;
  licencaP2b: string;
  licencaLink: string;

  ctaBtn: string;

  footerProjeto: string;
  footerLinks: string;
  footerAbout: string;
  footerMetodo: string;
  footerAmostra: string;
  footerAndamento: string;
  footerCopyright: string;
}

const content: Record<Lang, VeniCopy> = {
  br: {
    langLabel: "PT",
    logoAlt: "Selo da Veni Bible Translation",
    logoMiniAlt: "Logo VBT",
    langSelectLabel: "Seleção de idioma",

    heroTitle: "Veni Bible Translation",
    epigrafe: "Veni, Domine Iesu",
    epigrafeRef: "Vem, Senhor Jesus (Apocalipse 22:20)",
    subtitle:
      "Uma tradução independente da Bíblia, feita a partir do grego e do hebraico, em português e inglês. Começando pelo Apocalipse.",
    btnGithub: "Ler no GitHub",
    btnSample: "Ver amostra",
    btnRead: "Ler o Apocalipse",

    aboutTitle: "O que é a VBT",
    aboutP1:
      "A Escritura deve estar livremente disponível a todos os que são chamados a escrever um livro, um devocional, um comentário ou qualquer coisa que abençoe outras pessoas. A VBT começou com um devocional sobre o Apocalipse. Citar os 404 versículos do livro a partir de uma tradução existente ultrapassava o que a licença permitia. Seguir adiante significava pagar uma taxa e aceitar limites até onde o material poderia chegar. O inglês tem traduções livres e de alta qualidade. O português não tinha nenhuma traduzida dos textos críticos atuais do grego e do hebraico que fosse fiel, fluente e verdadeiramente livre.",
    aboutP2:
      "Esse obstáculo se tornou um chamado. A Veni Bible Translation existe para que qualquer pessoa — o pastor que prepara um estudo, o líder de jovens que imprime um material, ou a família que lê à mesa — possa ter a Palavra em seu próprio idioma, o mais próximo possível do original, sem pedir permissão. O nome vem da última oração da Bíblia: Veni, Domine Iesu. Vem, Senhor Jesus.",
    aboutP3:
      "Cada versículo é traduzido do grego do SBL Greek New Testament, e cada decisão aparece nas notas para que qualquer pessoa possa conferir. O Apocalipse está agora completo em português e inglês, com 404 versículos e 387 notas em cada idioma. O restante da Escritura virá, livro a livro. E ela é — e sempre será — gratuita para qualquer pessoa, em qualquer lugar.",
    aboutP4:
      "Projeto liderado por Ismael Silva, que tem formação em teologia, estudou grego koiné e hebraico e conta com mais de 20 anos de ministério pastoral em dois continentes.",

    metodoTitle: "Como traduzimos",
    cards: [
      {
        title: "O original em primeiro lugar.",
        body: "A gramática e o vocabulário do hebraico e do grego definem o que a tradução pode e não pode dizer.",
      },
      {
        title: "Evidência dos manuscritos.",
        body: "O texto segue o SBL Greek New Testament e o Westminster Leningrad Codex. Qualquer afastamento é documentado em nota.",
      },
      {
        title: "Português o mais literal possível.",
        body: "Fiel à estrutura do original, sem abrir mão de uma leitura bonita, fluida e memorável, feita também para ser lida em voz alta.",
      },
      {
        title: "Cada decisão é registrada.",
        body: "Onde o texto permite mais de uma leitura, a nota de rodapé mostra a alternativa. As escolhas ficam abertas para qualquer um conferir.",
      },
    ],

    transparenciaTitle: "Uma tradução transparente",
    transparenciaP1:
      "A VBT é uma tradução independente do grego e do hebraico, sem vínculo com qualquer denominação, editora ou sociedade bíblica. Quando o original permite mais de uma leitura legítima, a escolha do tradutor é registrada e a alternativa aparece em nota de rodapé — para que qualquer pessoa possa conferir.",
    transparenciaP2:
      "O objetivo é fidelidade ao texto original, não a qualquer tradição interpretativa.",

    amostraTitle: "Amostra · Apocalipse 1:1–8",
    sampleSubheading1: "Revelação de Jesus Cristo",
    sampleSubheading2: "Graça e paz às sete igrejas",
    samplePtNote:
      "O Apocalipse completo está disponível em português e em inglês (versão 25).",
    sampleEnCardText: "",
    sampleEnCardBtn: "",
    amostraNote:
      'Notas: "Sim, amém" traduz ναί + ἀμήν (grego e hebraico). "Aquele Que É" mantém o nome divino como em Êxodo 3:14 (ἀπὸ ὁ ὤν).',

    andamentoTitle: "Em andamento",
    progress: [
      {
        name: "Apocalipse",
        badge: "Concluído · v25",
        desc: "Os 22 capítulos traduzidos em português e em inglês: 404 versículos e 387 notas em cada idioma.",
      },
      {
        name: "Gênesis",
        badge: "Em breve",
        desc: "Primeiro livro do Antigo Testamento.",
      },
      {
        name: "Demais livros",
        badge: "Planejado",
        desc: "Um livro de cada vez, acompanhados de comentário.",
      },
    ],

    licencaTitle: "Livre para compartilhar, com crédito, sem alterações",
    licencaP1:
      'A tradução é publicada sob a licença Creative Commons Atribuição-SemDerivações 4.0 (CC BY-ND 4.0). Você pode copiar e compartilhar o texto, em qualquer meio e até comercialmente, desde que dê o crédito "Ismael Silva, Veni Bible Translation (ismaelsilva.org)" e um link para a licença. Não é permitido distribuir versões modificadas do texto. O nome "Veni Bible Translation" e a sigla VBT não podem ser usados em outras obras.',
    licencaP2a:
      "Texto grego: SBL Greek New Testament, © 2010 Society of Biblical Literature e Logos Bible Software, ",
    licencaP2b:
      ". Texto hebraico: Westminster Leningrad Codex, domínio público.",
    licencaLink: "Licença CC BY-ND 4.0",

    ctaBtn: "Acompanhar no GitHub",

    footerProjeto: "Projeto",
    footerLinks: "Links",
    footerAbout: "Sobre",
    footerMetodo: "Como traduzimos",
    footerAmostra: "Amostra",
    footerAndamento: "Em andamento",
    footerCopyright:
      "© 2026 Ismael Silva · Tradução sob CC BY-ND 4.0 · ismaelsilva.org",
  },

  en: {
    langLabel: "EN",
    logoAlt: "VBT seal",
    logoMiniAlt: "VBT logo",
    langSelectLabel: "Language selection",

    heroTitle: "Veni Bible Translation",
    epigrafe: "Veni, Domine Iesu",
    epigrafeRef: "Come, Lord Jesus (Revelation 22:20)",
    subtitle:
      "An independent translation of the Bible from the Greek and Hebrew, in Portuguese and English. Starting with Revelation.",
    btnGithub: "Read on GitHub",
    btnSample: "See a sample",
    btnRead: "Read Revelation",

    aboutTitle: "What VBT is",
    aboutP1:
      "Scripture should be freely available to everyone called to write a book, a devotional, a commentary, or anything that will bless others. The VBT began with a devotional on Revelation. Quoting all 404 verses of the book from an existing translation went beyond what its license allowed. Going on meant paying a fee and accepting limits on how far the material could travel. English has free, high-quality translations. Portuguese had none translated from today’s critical Greek and Hebrew texts that was faithful, fluent and truly free.",
    aboutP2:
      "That wall became a calling. The Veni Bible Translation exists so that anyone, whether a pastor preparing a study, a youth leader printing a handout, or a family reading at the table, can hold the Word in their own language, as close to the original as possible, without asking permission. The name comes from the Bible’s last prayer: Veni, Domine Iesu. Come, Lord Jesus.",
    aboutP3:
      "Every verse is translated from the Greek of the SBL Greek New Testament, and each decision is shown in the notes for anyone to check. Revelation is now complete in Portuguese and English, with 404 verses and 387 notes in each. The rest of Scripture will follow, book by book. And it is, and always will be, free for anyone, anywhere.",
    aboutP4:
      "Project led by Ismael Silva, who holds degrees in theology, has studied Koine Greek and Hebrew, and has more than 20 years of pastoral ministry on two continents.",

    metodoTitle: "How we translate",
    cards: [
      {
        title: "The original comes first.",
        body: "The grammar and vocabulary of Hebrew and Greek set what the translation can and cannot say.",
      },
      {
        title: "Manuscript evidence.",
        body: "The text follows the SBL Greek New Testament and the Westminster Leningrad Codex. Any departure is documented in a note.",
      },
      {
        title: "As literal as possible.",
        body: "Faithful to the structure of the original, without giving up a reading that is beautiful, fluid and memorable, made to be read aloud.",
      },
      {
        title: "Every decision is recorded.",
        body: "Where the text allows more than one reading, the footnote shows the alternative. The choices are open for anyone to check.",
      },
    ],

    transparenciaTitle: "A transparent translation",
    transparenciaP1:
      "The VBT is an independent translation from the Greek and Hebrew, with no ties to any denomination, publisher or Bible society. Where the original allows more than one legitimate reading, the translator's choice is recorded and the alternative appears in a footnote — so anyone can verify it.",
    transparenciaP2:
      "The goal is faithfulness to the original text, not to any interpretive tradition.",

    amostraTitle: "Sample · Revelation 1:1–8",
    sampleSubheading1: "The revelation of Jesus Christ",
    sampleSubheading2: "Grace and peace to the seven churches",
    samplePtNote: "",
    sampleEnCardText: "",
    sampleEnCardBtn: "",
    amostraNote:
      'Notes: "Yes, amen" renders ναί + ἀμήν (Greek and Hebrew). "Him Who Is" keeps the divine name as in Exodus 3:14 (ἀπὸ ὁ ὤν).',

    andamentoTitle: "In progress",
    progress: [
      {
        name: "Revelation",
        badge: "Complete · v25",
        desc: "All 22 chapters translated in English and Portuguese: 404 verses and 387 notes in each language.",
      },
      {
        name: "Genesis",
        badge: "Coming soon",
        desc: "First book of the Old Testament.",
      },
      {
        name: "The remaining books",
        badge: "Planned",
        desc: "One book at a time, with commentary.",
      },
    ],

    licencaTitle: "Free to share, with credit, unchanged",
    licencaP1:
      'The translation is published under the Creative Commons Attribution-NoDerivatives 4.0 license (CC BY-ND 4.0). You may copy and share the text, in any medium and even commercially, provided you credit "Ismael Silva, Veni Bible Translation (ismaelsilva.org)" and link to the license. Distributing modified versions of the text is not permitted. The name "Veni Bible Translation" and the abbreviation VBT may not be used on other works.',
    licencaP2a:
      "Greek text: SBL Greek New Testament, © 2010 Society of Biblical Literature and Logos Bible Software, ",
    licencaP2b: ". Hebrew text: Westminster Leningrad Codex, public domain.",
    licencaLink: "CC BY-ND 4.0 license",

    ctaBtn: "Follow on GitHub",

    footerProjeto: "Project",
    footerLinks: "Links",
    footerAbout: "About",
    footerMetodo: "How we translate",
    footerAmostra: "Sample",
    footerAndamento: "In progress",
    footerCopyright:
      "© 2026 Ismael Silva · Translation under CC BY-ND 4.0 · ismaelsilva.org",
  },
};

export default content;
