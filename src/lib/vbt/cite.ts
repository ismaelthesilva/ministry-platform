import { VBT_LANGS, type VbtLang } from "./lang";

const SITE_URL = "https://ismaelsilva.org";

export const cite = (chapter: number, verse: number, lang: VbtLang = "pt") =>
  `(${VBT_LANGS[lang].abbr} ${chapter}:${verse}, VBT)`;

export const quoteWithCite = (
  text: string,
  chapter: number,
  verse: number,
  lang: VbtLang = "pt"
) => `"${text}" ${cite(chapter, verse, lang)}`;

export const verseUrl = (
  chapter: number,
  verse: number,
  lang: VbtLang = "pt"
) => `${SITE_URL}${VBT_LANGS[lang].basePath}/${chapter}#v${verse}`;
