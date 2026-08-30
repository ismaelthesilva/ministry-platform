import type { Trumpet } from "@/types/map";

export const trumpets: Trumpet[] = [
  {
    id: "trumpet-1",
    label: "First Trumpet",
    shortLabel: "T1",
    period: "70 AD",
    churchId: "ephesus",
    color: "#6B4FA0",
    hoverColor: "#7D63B8",
    layer: "trumpets",
    scripture: ["Rev 8:7", "Matt 24:2"],
    description:
      "The destruction of Jerusalem in 70 AD — fire, hail, and blood cast upon the earth. A third of the trees were burned up and all green grass. The judgment upon apostate Israel for rejecting the Messiah and persecuting His church.",
  },
  {
    id: "trumpet-2",
    label: "Second Trumpet",
    shortLabel: "T2",
    period: "476 AD",
    churchId: "smyrna",
    color: "#8B3A3A",
    hoverColor: "#A04545",
    layer: "trumpets",
    scripture: ["Rev 8:8–9"],
    description:
      "The fall of the Western Roman Empire in 476 AD — the sixth king — symbolized as a burning mountain cast into the sea. A third of the sea became blood. The Vandal invasion under Genseric devastated the Mediterranean world.",
  },
  {
    id: "trumpet-3",
    label: "Third Trumpet — Wormwood",
    shortLabel: "T3",
    period: "538 AD",
    churchId: "pergamos",
    color: "#7A5C1E",
    hoverColor: "#8F6E25",
    layer: "trumpets",
    scripture: ["Rev 8:10–11"],
    description:
      "Wormwood — a great star falls from heaven, burning like a torch, poisoning the rivers and springs of water. The establishment of the papacy as the seventh king in 538 AD marks the poisoning of pure Christian doctrine.",
  },
  {
    id: "trumpet-4",
    label: "Fourth Trumpet",
    shortLabel: "T4",
    period: "538–1517 AD",
    churchId: "thyatira",
    color: "#1E3A5F",
    hoverColor: "#254A78",
    layer: "trumpets",
    scripture: ["Rev 8:12"],
    description:
      "A third of the sun was struck, a third of the moon, and a third of the stars — so that a third of them was darkened. The spiritual lights of Scripture, reason, and conscience were obscured through the 1260-year Dark Age of papal supremacy.",
    egwQuote:
      "The church had now apostatized from her early purity; yet she had come to be regarded as the one infallible teacher of truth.",
    egwSource: "The Great Controversy, p. 50",
  },
  {
    id: "trumpet-5",
    label: "Fifth Trumpet — First Woe",
    shortLabel: "T5 / Woe 1",
    period: "1299–1449 AD",
    churchId: "sardis",
    woe: 1,
    color: "#1A5C3A",
    hoverColor: "#206E46",
    layer: "trumpets",
    scripture: ["Rev 9:1–12"],
    description:
      "Locusts from the bottomless pit — the Ottoman Empire's 150-year harassment of the Eastern Roman Empire, from July 27, 1299 to July 27, 1449. The locusts torment those who do not have the seal of God, for five months (150 prophetic days = 150 years).",
  },
  {
    id: "trumpet-6",
    label: "Sixth Trumpet — Second Woe",
    shortLabel: "T6 / Woe 2",
    period: "1449–1840 AD",
    churchId: "philadelphia",
    woe: 2,
    color: "#1A4A5C",
    hoverColor: "#205A70",
    layer: "trumpets",
    scripture: ["Rev 9:13–21"],
    description:
      "The four angels bound at the Euphrates are released — the Ottoman Empire's 391 years and 15 days of conquest, ending August 11, 1840, when Mehemet Ali submitted to the Western powers. Josiah Litch predicted this date in advance.",
    egwQuote:
      "At the very time specified, Turkey, through her ambassadors, accepted the protection of the allied powers of Europe.",
    egwSource: "The Great Controversy, p. 335",
  },
  {
    id: "trumpet-7",
    label: "Seventh Trumpet",
    shortLabel: "T7",
    period: "At the Return",
    churchId: "laodicea",
    color: "#C9A84C",
    hoverColor: "#E8C97A",
    layer: "trumpets",
    scripture: ["Rev 11:15–19"],
    description:
      '"The kingdoms of this world have become the kingdoms of our Lord and of His Christ, and He shall reign forever and ever." The seventh trumpet sounds at the return of Christ and inaugurates the eternal kingdom.',
  },
];
