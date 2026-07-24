export const revStrings = {
  en: {
    backToChapters: "Back to all chapters",
    backTo: "Back to",
    inThisChapter: "In this chapter",
    aPrayer: "A Prayer",
    sourcesNotes: "Sources & Notes",
    previous: "Previous",
    next: "Next",
    chapter: "Chapter",
    of: "of",
    minRead: "min read",
    part: "Part",
    jumpToChapter: "Jump to chapter",
    contents: "Contents",
    chaptersWord: "chapters",
    inWord: "in",
    partsWord: "parts",
    totalReadTime: "min total reading time",
    byWord: "by",
    fullSeries: "The Complete Series",
    available: "Available",
    inProduction: "In Production",
    startReading: "Start Reading",
    continueReading: "Continue · Chapter",
    startFromBeginning: "Start from the beginning",
    references: "References",
    readIntroLink: "Read the full introduction",
    introduction: "Introduction",
    aboutAuthor: "About the Author",
    nextChapterLabel: "Next · Chapter",
    sourcesReferencesHeading: "Sources & References",
    citedIn: "works cited throughout",
    scriptureNote:
      "Scripture quotations in this English edition are translated to reflect the Portuguese Almeida Revista e Atualizada (ARA), the version cited throughout the original text.",
  },
  br: {
    backToChapters: "Voltar para todos os capítulos",
    backTo: "Voltar para",
    inThisChapter: "Neste capítulo",
    aPrayer: "Uma Oração",
    sourcesNotes: "Fontes & Notas",
    previous: "Anterior",
    next: "Próximo",
    chapter: "Capítulo",
    of: "de",
    minRead: "min de leitura",
    part: "Parte",
    jumpToChapter: "Ir para capítulo",
    contents: "Sumário",
    chaptersWord: "capítulos",
    inWord: "em",
    partsWord: "partes",
    totalReadTime: "min de leitura total",
    byWord: "por",
    fullSeries: "A Série Completa",
    available: "Disponível",
    inProduction: "Em Produção",
    startReading: "Começar a Ler",
    continueReading: "Continuar · Capítulo",
    startFromBeginning: "Começar do início",
    references: "Referências",
    readIntroLink: "Ler a introdução completa",
    introduction: "Introdução",
    aboutAuthor: "Sobre o Autor",
    nextChapterLabel: "Próximo · Capítulo",
    sourcesReferencesHeading: "Fontes & Referências",
    citedIn: "obras citadas em",
    scriptureNote:
      "As citações bíblicas seguem, salvo indicação em contrário, a versão Almeida Revista e Atualizada (ARA).",
  },
} as const;

export type RevLang = keyof typeof revStrings;
export type RevStrings = Record<keyof (typeof revStrings)["en"], string>;

export function revLang(language: string): RevLang {
  return language === "br" ? "br" : "en";
}

export const stripPartPrefix = (title: string) =>
  title.replace(/^(Parte|Part)\s+\d+:\s*/, "");
