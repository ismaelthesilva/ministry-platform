import type { ChapterMeta, PartMeta } from "./types";

// Lightweight metadata for all 43 chapters — safe to import anywhere
// (index page, nav, sitemap) without pulling the full chapter text into
// the bundle. Full chapter bodies live in ./chapter-01.ts .. chapter-43.ts
// and are loaded on demand via ./loaders.ts.
export const chapterRegistry: ChapterMeta[] = [
  {
    number: 1,
    title: `O Fim do Medo`,
    subtitle: `Por que o Apocalipse é um livro de Esperança (Apocalipse 1:1-3)`,
    part: 1,
    wordCount: 591,
    hasNotes: false,
  },
  {
    number: 2,
    title: `O Rosto do Juiz`,
    subtitle: `Jesus Como Você Nunca Imaginou (Apocalipse 1:4-20)`,
    part: 1,
    wordCount: 683,
    hasNotes: false,
  },
  {
    number: 3,
    title: `Burnout Espiritual`,
    subtitle: `Quando o Amor Esfria e Vira Rotina (Apocalipse 2:1-7)`,
    part: 1,
    wordCount: 600,
    hasNotes: false,
  },
  {
    number: 4,
    title: `A Riqueza Invisível`,
    subtitle: `Por que Perder Tudo Pode Ser Ganhar Tudo (Apocalipse 2:8-11)`,
    part: 1,
    wordCount: 711,
    hasNotes: false,
  },
  {
    number: 5,
    title: `A Armadilha da Tolerância`,
    subtitle: `O Perigo de Aceitar Tudo (Pérgamo e Tiatira - Apocalipse 2:12-29)`,
    part: 1,
    wordCount: 796,
    hasNotes: false,
  },
  {
    number: 6,
    title: `O Morto-Vivo`,
    subtitle: `Você Tem Vida ou Só Tem Fama? (Sardes - Apocalipse 3:1-6)`,
    part: 1,
    wordCount: 697,
    hasNotes: false,
  },
  {
    number: 7,
    title: `A Porta Aberta`,
    subtitle: `O Poder da Fidelidade na Fraqueza (Filadélfia - Apocalipse 3:7-13)`,
    part: 1,
    wordCount: 712,
    hasNotes: false,
  },
  {
    number: 8,
    title: `Nem Quente, Nem Frio`,
    subtitle: `A Náusea de Deus pela Hipocrisia (Laodiceia - Apocalipse 3:14-22)`,
    part: 1,
    wordCount: 773,
    hasNotes: false,
  },
  {
    number: 9,
    title: `A Sala de Comando`,
    subtitle: `Quem Realmente Governa o Planeta? (Apocalipse 4:1-11)`,
    part: 2,
    wordCount: 867,
    hasNotes: false,
  },
  {
    number: 10,
    title: `O Paradoxo`,
    subtitle: `O Leão que Venceu Morrendo (Apocalipse 5:1-14)`,
    part: 2,
    wordCount: 781,
    hasNotes: false,
  },
  {
    number: 11,
    title: `Guerra e Paz`,
    subtitle: `A História Sangrenta da Verdade (Os 4 Cavaleiros - Apocalipse 6:1-8)`,
    part: 2,
    wordCount: 770,
    hasNotes: false,
  },
  {
    number: 12,
    title: `O Grito da Justiça`,
    subtitle: `"Até Quando, Senhor?" (O 5º Selo - Apocalipse 6:9-11)`,
    part: 2,
    wordCount: 802,
    hasNotes: false,
  },
  {
    number: 13,
    title: `O Dia que o Céu Caiu`,
    subtitle: `Sinais Cósmicos e o Fim (O 6º Selo - Apocalipse 6:12-17)`,
    part: 2,
    wordCount: 819,
    hasNotes: false,
  },
  {
    number: 14,
    title: `Blindados`,
    subtitle: `A Marca que Protege Você no Caos (O Selamento - Apocalipse 7:1-8)`,
    part: 2,
    wordCount: 831,
    hasNotes: false,
  },
  {
    number: 15,
    title: `O Silêncio de Deus`,
    subtitle: `A Calmaria Antes do Abraço Final (O 7º Selo - Apocalipse 8:1)`,
    part: 2,
    wordCount: 740,
    hasNotes: false,
  },
  {
    number: 16,
    title: `Colapso Ambiental`,
    subtitle: `O Juízo sobre Jerusalém e a Queda de Roma (Trombetas 1 e 2 - Apocalipse 8:2-9)`,
    part: 3,
    wordCount: 874,
    hasNotes: false,
  },
  {
    number: 17,
    title: `Águas Amargas`,
    subtitle: `A Poluição da Verdade e o Eclipse de Deus (Trombetas 3 e 4 - Apocalipse 8:10-13)`,
    part: 3,
    wordCount: 992,
    hasNotes: false,
  },
  {
    number: 18,
    title: `A Chave do Abismo`,
    subtitle: `Quando o Inferno Sobe à Terra (Trombeta 5 - Apocalipse 9:1-12)`,
    part: 3,
    wordCount: 808,
    hasNotes: false,
  },
  {
    number: 19,
    title: `A Guerra Invisível`,
    subtitle: `O Conflito que a Mídia Não Mostra (Trombeta 6 - Apocalipse 9:13-21)`,
    part: 3,
    wordCount: 866,
    hasNotes: false,
  },
  {
    number: 20,
    title: `A Digestão da Verdade`,
    subtitle: `Por que a Profecia é Doce e Amarga (Apocalipse 10:1-11)`,
    part: 3,
    wordCount: 958,
    hasNotes: false,
  },
  {
    number: 21,
    title: `As Duas Testemunhas`,
    subtitle: `O Livro que Ninguém Consegue Matar (Apocalipse 11:1-14)`,
    part: 3,
    wordCount: 931,
    hasNotes: false,
  },
  {
    number: 22,
    title: `A Última Trombeta`,
    subtitle: `O Reino Mudou de Dono (A Sétima Trombeta - Apocalipse 11:15-19)`,
    part: 3,
    wordCount: 775,
    hasNotes: false,
  },
  {
    number: 23,
    title: `O Natal e a Guerra`,
    subtitle: `O Bastidor da Guerra Cósmica (Apocalipse 12:1-17)`,
    part: 4,
    wordCount: 1126,
    hasNotes: false,
  },
  {
    number: 24,
    title: `A Besta do Mar`,
    subtitle: `Religião e Poder — Uma Mistura Mortal (Apocalipse 13:1-10)`,
    part: 4,
    wordCount: 901,
    hasNotes: false,
  },
  {
    number: 25,
    title: `O Inimigo Oculto`,
    subtitle: `Quando a Tirania se Veste de Liberdade (A Besta da Terra - Apocalipse 13:11-18)`,
    part: 4,
    wordCount: 938,
    hasNotes: false,
  },
  {
    number: 26,
    title: `A Resistência`,
    subtitle: `O Perfil de Quem Não Se Vende (Apocalipse 14:1-5)`,
    part: 4,
    wordCount: 1076,
    hasNotes: false,
  },
  {
    number: 27,
    title: `O Último Ultimato`,
    subtitle: `Três Mensagens para o Mundo Moderno (Apocalipse 14:6-13)`,
    part: 4,
    wordCount: 966,
    hasNotes: false,
  },
  {
    number: 28,
    title: `A Grande Colheita`,
    subtitle: `Trigo ou Uvas de Sangue — Quem é Você? (Apocalipse 14:14-20)`,
    part: 4,
    wordCount: 893,
    hasNotes: false,
  },
  {
    number: 29,
    title: `O Cântico dos Livres`,
    subtitle: `A Vitória Sobre o Sistema (Apocalipse 15:1-8)`,
    part: 4,
    wordCount: 829,
    hasNotes: false,
  },
  {
    number: 30,
    title: `Sem Misericórdia`,
    subtitle: `Quando a Porta da Graça se Fecha (Taças 1 a 3 - Apocalipse 16:1-7)`,
    part: 5,
    wordCount: 997,
    hasNotes: false,
  },
  {
    number: 31,
    title: `Calor e Trevas`,
    subtitle: `O Clima Extremo e o Trono Escuro (Taças 4 e 5 - Apocalipse 16:8-11)`,
    part: 5,
    wordCount: 798,
    hasNotes: false,
  },
  {
    number: 32,
    title: `Armagedom`,
    subtitle: `O Que Realmente Vai Acontecer (Taça 6 - Apocalipse 16:12-16)`,
    part: 5,
    wordCount: 1034,
    hasNotes: false,
  },
  {
    number: 33,
    title: `Está Feito`,
    subtitle: `O Fim da Linha para o Mal (Taça 7 - Apocalipse 16:17-21)`,
    part: 5,
    wordCount: 869,
    hasNotes: false,
  },
  {
    number: 34,
    title: `A Grande Prostituta`,
    subtitle: `A Sedução da Religião Falsa (Apocalipse 17:1-6)`,
    part: 6,
    wordCount: 869,
    hasNotes: false,
  },
  {
    number: 35,
    title: `Política e Religião`,
    subtitle: `O Oitavo Rei e a Superpotência Final (Apocalipse 17:7-18)`,
    part: 6,
    wordCount: 997,
    hasNotes: false,
  },
  {
    number: 36,
    title: `O Crash Global`,
    subtitle: `Quando o Dinheiro Não Valerá Nada (Apocalipse 18)`,
    part: 6,
    wordCount: 993,
    hasNotes: false,
  },
  {
    number: 37,
    title: `O Convite de Casamento`,
    subtitle: `A Festa no Céu Enquanto a Terra Arde (Apocalipse 19:1-10)`,
    part: 6,
    wordCount: 857,
    hasNotes: false,
  },
  {
    number: 38,
    title: `O Cavaleiro Branco`,
    subtitle: `O Retorno do Rei dos reis, a Viagem pelo Espaço e o Fim da História Humana (Apocalipse 19:11-21; 8:1)`,
    part: 6,
    wordCount: 1169,
    hasNotes: false,
  },
  {
    number: 39,
    title: `Férias da História`,
    subtitle: `A Viagem dos Sonhos e o Milênio no Céu (Apocalipse 20:1-6)`,
    part: 7,
    wordCount: 998,
    hasNotes: false,
  },
  {
    number: 40,
    title: `O Julgamento Final`,
    subtitle: `O Fim da Impunidade e a Morte da Morte (Apocalipse 20:7-15)`,
    part: 7,
    wordCount: 1053,
    hasNotes: false,
  },
  {
    number: 41,
    title: `O Céu na Terra`,
    subtitle: `Adeus à Dor, Lágrimas e Morte (Apocalipse 21:1-5)`,
    part: 7,
    wordCount: 993,
    hasNotes: false,
  },
  {
    number: 42,
    title: `Face a Face`,
    subtitle: `A Universidade da Eternidade e o Fim do Conflito (Apocalipse 22)`,
    part: 7,
    wordCount: 961,
    hasNotes: false,
  },
  {
    number: 43,
    title: `Epílogo`,
    part: 7,
    wordCount: 821,
    hasNotes: false,
  },
];

export const partRegistry: PartMeta[] = [
  {
    number: 1,
    title: `Parte 1: O Manual de Sobrevivência (Visão e Cartas)`,
    tagline: `A Promessa: Entender a igreja e a si mesmo.`,
  },
  {
    number: 2,
    title: `Parte 2: O Controle da História (Os Selos)`,
  },
  {
    number: 3,
    title: `Parte 3: Os Alertas de Emergência (As Trombetas)`,
  },
  {
    number: 4,
    title: `Parte 4: O Grande Conflito (Os Personagens)`,
  },
  {
    number: 5,
    title: `Parte 5: O Acerto de Contas (As Taças)`,
  },
  {
    number: 6,
    title: `Parte 6: A Queda do Império (Babilônia)`,
  },
  {
    number: 7,
    title: `Parte 7: O Novo Começo (O Futuro)`,
  },
];

export const TOTAL_CHAPTERS = chapterRegistry.length;

export function getChapterMeta(number: number): ChapterMeta | undefined {
  return chapterRegistry.find((c) => c.number === number);
}

export function getPartMeta(number: number): PartMeta | undefined {
  return partRegistry.find((p) => p.number === number);
}

export function getChaptersForPart(partNumber: number): ChapterMeta[] {
  return chapterRegistry.filter((c) => c.part === partNumber);
}

const WORDS_PER_MINUTE = 220;

export function estimateReadingMinutes(wordCount: number): number {
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
