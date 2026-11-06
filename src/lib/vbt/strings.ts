import type { VbtLang } from "./lang";

const pt = {
  skipToText: "Ir para o texto",
  chapterTitle: (n: number) => `Apocalipse ${n}`,
  chapterIndexTitle: "Apocalipse — Índice",
  chapterNavLabel: "Navegação entre capítulos",
  prevChapter: "← Anterior",
  nextChapter: "Próximo →",
  indexLink: "Índice",
  copyVerse: "Copiar versículo",
  copyLink: "Copiar link",
  copied: "Copiado!",
  verseActionsLabel: (v: number) => `Ações do versículo ${v}`,
  verseLabel: (v: number) => `Versículo ${v}`,
  noteLabel: (v: number) => `Nota do versículo ${v}`,
  showNotes: "Mostrar notas",
  hideNotes: "Ocultar notas",
  includeNotes: "Incluir notas",
  fontSizeLabel: "Tamanho da fonte",
  searchPlaceholder: "Buscar ou Ap 1:1…",
  searchLabel: "Buscar no Apocalipse",
  goTo: (ref: string) => `Ir para ${ref}`,
  searchResults: (n: number) => `${n} resultado${n !== 1 ? "s" : ""}`,
  noResults: "Nenhum resultado.",
  notesTitle: "Notas",
  backToVerse: "↩ voltar ao versículo",
  readRevelation: "Ler o Apocalipse",
  viewOnGitHub: "Ver no GitHub",
  otherLanguage: "Read in English",
  attribution: (version: string) =>
    `Veni Bible Translation (VBT) v${version} · © 2026 Ismael Silva · CC BY-ND 4.0`,
  sblgntAttribution:
    "Novo Testamento traduzido do SBL Greek New Testament (SBLGNT), © 2010 Society of Biblical Literature e Logos Bible Software, CC BY 4.0.",
  licenseUrl: "https://creativecommons.org/licenses/by-nd/4.0/",
};

export type VbtStrings = typeof pt;

const en: VbtStrings = {
  skipToText: "Skip to text",
  chapterTitle: (n: number) => `Revelation ${n}`,
  chapterIndexTitle: "Revelation — Contents",
  chapterNavLabel: "Chapter navigation",
  prevChapter: "← Previous",
  nextChapter: "Next →",
  indexLink: "Contents",
  copyVerse: "Copy verse",
  copyLink: "Copy link",
  copied: "Copied!",
  verseActionsLabel: (v: number) => `Actions for verse ${v}`,
  verseLabel: (v: number) => `Verse ${v}`,
  noteLabel: (v: number) => `Note on verse ${v}`,
  showNotes: "Show notes",
  hideNotes: "Hide notes",
  includeNotes: "Include notes",
  fontSizeLabel: "Font size",
  searchPlaceholder: "Search or Rev 1:1…",
  searchLabel: "Search Revelation",
  goTo: (ref: string) => `Go to ${ref}`,
  searchResults: (n: number) => `${n} result${n !== 1 ? "s" : ""}`,
  noResults: "No results.",
  notesTitle: "Notes",
  backToVerse: "↩ back to verse",
  readRevelation: "Read Revelation",
  viewOnGitHub: "View on GitHub",
  otherLanguage: "Ler em português",
  attribution: (version: string) =>
    `Veni Bible Translation (VBT) v${version} · © 2026 Ismael Silva · CC BY-ND 4.0`,
  sblgntAttribution:
    "New Testament translated from the SBL Greek New Testament (SBLGNT), © 2010 Society of Biblical Literature and Logos Bible Software, CC BY 4.0.",
  licenseUrl: "https://creativecommons.org/licenses/by-nd/4.0/",
};

export const getVbtStrings = (lang: VbtLang = "pt"): VbtStrings =>
  lang === "en" ? en : pt;

/** Portuguese strings (default edition), kept for existing imports. */
export const vbtStrings = pt;
