import type { SanctuaryPhaseData } from "@/types/map";

export const sanctuary: SanctuaryPhaseData[] = [
  {
    id: "sanctuary-1",
    label: "Phase 1 — On Earth",
    shortLabel: "Earth",
    period: "1–31 AD",
    phase: 1,
    place: "On earth",
    ministry: "The Lamb of God — ministry, cross, resurrection",
    color: "#6B4FA0",
    hoverColor: "#7D63B8",
    layer: "sanctuary",
    scripture: ["John 1:29", "Heb 9:26"],
    description:
      "Christ's earthly ministry culminating in the cross. He is the Lamb who takes away the sin of the world — the antitype of every sacrifice, the fulfillment of every earthly sanctuary service. At His death the veil tears from top to bottom.",
  },
  {
    id: "sanctuary-2",
    label: "Phase 2 — The Holy Place",
    shortLabel: "Holy Place",
    period: "31 AD–1844 AD",
    phase: 2,
    place: "The Holy Place",
    ministry: "Intercession — the mediatorial ministry",
    color: "#1A4A5C",
    hoverColor: "#205A70",
    layer: "sanctuary",
    scripture: ["Heb 7:25", "Heb 8:1–2", "1 Tim 2:5"],
    description:
      "For 1813 years Christ serves as High Priest in the Holy Place of the heavenly sanctuary, making intercession for the sins of His people. The candlestick, the table of showbread, and the golden altar of incense correspond to His work of illumination, sustenance, and prayer.",
    egwQuote:
      "As the priest in the typical service entered the holy place at the time of the morning and evening sacrifice, so Jesus, our great High Priest, officiates in the presence of God.",
    egwSource: "The Great Controversy, p. 420",
  },
  {
    id: "sanctuary-3",
    label: "Phase 3 — The Most Holy Place",
    shortLabel: "Most Holy",
    period: "1844 AD–Close of Probation",
    phase: 3,
    place: "The Most Holy Place",
    ministry:
      "The investigative judgment — Daniel 8:14, the 2300 years fulfilled",
    color: "#4A2070",
    hoverColor: "#5A2888",
    layer: "sanctuary",
    scripture: ["Dan 8:14", "Heb 9:23–24", "Rev 14:7"],
    description:
      "On October 22, 1844, at the end of the 2300 prophetic days, Christ moved from the Holy Place to the Most Holy Place of the heavenly sanctuary. The ark of the covenant — containing the law of God — stands in this inner chamber. The investigative judgment, prefigured by Yom Kippur, determines whose names are written in the book of life.",
    egwQuote:
      "The ministration of Christ in the most holy place began at the termination of the prophetic period of 2300 days. At that time, as foretold by Daniel the prophet, our High Priest entered the most holy place to perform the closing work of the atonement.",
    egwSource: "The Great Controversy, p. 480",
  },
];
