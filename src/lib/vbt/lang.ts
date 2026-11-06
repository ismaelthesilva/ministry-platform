export type VbtLang = "pt" | "en";

export interface VbtLangConfig {
  lang: VbtLang;
  /** BCP-47 tag for lang attributes and JSON-LD */
  htmlLang: "pt-BR" | "en";
  /** Book name as shown to readers */
  bookName: string;
  /** Short abbreviation used in citations (Ap / Rev) */
  abbr: string;
  /** Route base for the reader, e.g. /venibible/apocalipse */
  basePath: string;
  /** Path of the JSON inside the veni-bible repository */
  repoJsonPath: string;
  /** Local fallback, relative to the project root */
  localJsonPath: string;
}

export const VBT_LANGS: Record<VbtLang, VbtLangConfig> = {
  pt: {
    lang: "pt",
    htmlLang: "pt-BR",
    bookName: "Apocalipse",
    abbr: "Ap",
    basePath: "/venibible/apocalipse",
    repoJsonPath: "pt-BR/revelation/json/revelation.json",
    localJsonPath: "src/content/vbt/revelation.json",
  },
  en: {
    lang: "en",
    htmlLang: "en",
    bookName: "Revelation",
    abbr: "Rev",
    basePath: "/venibible/revelation",
    repoJsonPath: "en/revelation/json/revelation.json",
    localJsonPath: "src/content/vbt/revelation.en.json",
  },
};

export const vbtLang = (lang: VbtLang = "pt") => VBT_LANGS[lang];
