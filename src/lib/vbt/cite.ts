export const cite = (chapter: number, verse: number) =>
  `(Ap ${chapter}:${verse}, VBT)`;

export const quoteWithCite = (text: string, chapter: number, verse: number) =>
  `"${text}" ${cite(chapter, verse)}`;

export const verseUrl = (chapter: number, verse: number) =>
  `https://ismaelsilva.org/venibible/apocalipse/${chapter}#v${verse}`;
