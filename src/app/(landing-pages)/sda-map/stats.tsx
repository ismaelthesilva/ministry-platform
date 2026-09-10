// src/app/(landing-pages)/sda-map/stats.tsx
// All data, types, and utility functions for the SDA World Growth Map.
// Source: ASR2026A — SDA Office of Archives, Statistics and Research

// ─── Types ───────────────────────────────────────────────────────────────────

export type TheologicalProfile =
  | "faithful"
  | "progressive"
  | "legalist"
  | "mixed"
  | "unknown";

export type GranularityLevel = "country" | "union-region" | "grouped";

export interface SDARegion {
  id: string; // ISO-3166 or custom union id e.g. "US-PAC"
  name: string;
  granularity: GranularityLevel;
  stats: {
    "2025": { members: number };
  };
  growth: {
    current: number; // % 2024→2025 (1-year, from ASR2026A)
  };
  theologicalProfile: TheologicalProfile; // * editorial — see disclaimer
  notes?: string;
  dataFlags?: string[]; // e.g. "data-anomaly-2025", "net-decline"
}

// ─── Private Helpers ──────────────────────────────────────────────────────────

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function build(
  id: string,
  name: string,
  granularity: GranularityLevel,
  start: number,
  end: number,
  profile: TheologicalProfile,
  notes?: string | null,
  flags?: string[]
): SDARegion {
  return {
    id,
    name,
    granularity,
    stats: { "2025": { members: end } },
    growth: { current: round2(((end - start) / start) * 100) },
    theologicalProfile: profile,
    notes: notes ?? undefined,
    dataFlags: flags,
  };
}

// ─── SDA_REGIONS — 58 Regions · ASR2026A ─────────────────────────────────────

export const SDA_REGIONS: SDARegion[] = [
  // ── SOUTH PACIFIC DIVISION (SPD) ──────────────────────────────────────────
  build(
    "NZ",
    "New Zealand",
    "country",
    14982,
    14969,
    "progressive",
    "North NZ Conf + South NZ Conf only. 366 baptisms vs 707 lost. Net decline: −13 members (−0.09%). North NZ −1.93%, partially offset by South NZ +8.04% driven by transfers not baptisms.",
    ["nz-mainland-only", "net-decline"]
  ),
  build("AU", "Australia", "country", 66215, 67281, "progressive"),
  build(
    "PG",
    "Papua New Guinea",
    "country",
    623276,
    611440,
    "faithful",
    "Large 'missing' figure likely administrative, not real loss.",
    ["data-anomaly-2025"]
  ),
  build("PF", "Pacific Islands", "grouped", 143402, 148534, "faithful"),

  // ── EAST-CENTRAL AFRICA DIVISION (ECD) ───────────────────────────────────
  build(
    "UG",
    "Uganda",
    "country",
    595424,
    634094,
    "faithful",
    "40,086 baptisms. Near-zero dropout."
  ),
  build(
    "TZ",
    "Tanzania",
    "country",
    1146727,
    1237082,
    "faithful",
    "95,235 baptisms. Northern + Southern Unions combined."
  ),
  build(
    "RW",
    "Rwanda",
    "country",
    1186613,
    1218518,
    "faithful",
    "Lowest dropout rate globally."
  ),
  build(
    "KE",
    "Kenya",
    "country",
    1327638,
    1378946,
    "faithful",
    "East + West Kenya Unions combined."
  ),
  build("BI", "Burundi", "country", 240936, 249285, "faithful"),
  build(
    "ET",
    "Ethiopia",
    "country",
    278659,
    296583,
    "faithful",
    "Eastern + Western Ethiopia Unions combined."
  ),
  build(
    "CD",
    "DR Congo",
    "country",
    844099,
    891821,
    "faithful",
    "East + NE + West Congo Unions combined."
  ),
  build(
    "SS",
    "South Sudan",
    "country",
    76899,
    88379,
    "faithful",
    "Highest baptismal rate in dataset."
  ),

  // ── WEST-CENTRAL AFRICA DIVISION (WAD) ───────────────────────────────────
  build(
    "NG",
    "Nigeria",
    "country",
    335019,
    354820,
    "faithful",
    "Eastern + Northern + Western Nigeria Unions combined."
  ),
  build(
    "GH",
    "Ghana",
    "country",
    429047,
    449950,
    "faithful",
    "Mid-Ghana + North-Central + Southern Ghana Unions combined."
  ),
  build(
    "CM",
    "Cameroon",
    "country",
    146531,
    159420,
    "faithful",
    "North-East + West-Central Cameroon Unions combined."
  ),

  // ── SOUTHERN AFRICA-INDIAN OCEAN DIVISION (SID) ──────────────────────────
  build(
    "ZM",
    "Zambia",
    "country",
    1476560,
    1568492,
    "faithful",
    "Northern + Southern Zambia Unions combined."
  ),
  build(
    "ZW",
    "Zimbabwe",
    "country",
    504854,
    529173,
    "faithful",
    "Central + East + West Zimbabwe Unions combined."
  ),
  build("MG", "Madagascar", "country", 234006, 244035, "faithful"),
  build("MW", "Malawi", "country", 747492, 764706, "faithful"),
  build("MZ", "Mozambique", "country", 381545, 388387, "faithful"),
  build(
    "AO",
    "Angola",
    "country",
    745670,
    797851,
    "faithful",
    "North-Eastern + South-Western Angola Unions combined."
  ),

  // ── NORTH AMERICAN DIVISION (NAD) — by Union ─────────────────────────────
  build(
    "US-PAC",
    "USA — Pacific",
    "union-region",
    221276,
    224178,
    "progressive",
    "California, Nevada, Arizona, Utah, Hawaii."
  ),
  build(
    "US-SOU",
    "USA — South",
    "union-region",
    296455,
    305845,
    "mixed",
    "Florida, Georgia, Carolinas, Tennessee, Kentucky, Alabama."
  ),
  build(
    "US-COL",
    "USA — Columbia",
    "union-region",
    156889,
    162652,
    "mixed",
    "DC, Maryland, Virginia, Ohio, Pennsylvania, New Jersey."
  ),
  build(
    "US-ATL",
    "USA — Atlantic",
    "union-region",
    138662,
    142243,
    "progressive",
    "New York, New England, Bermuda. Growth immigrant-driven."
  ),
  build(
    "US-LAK",
    "USA — Lake",
    "union-region",
    90809,
    91926,
    "mixed",
    "Illinois, Indiana, Michigan, Wisconsin."
  ),
  build(
    "US-MID",
    "USA — Mid-America",
    "union-region",
    66727,
    67512,
    "mixed",
    "Minnesota, Iowa, Nebraska, Kansas, Dakotas, Missouri, Colorado."
  ),
  build(
    "US-NPU",
    "USA — North Pacific",
    "union-region",
    103808,
    104543,
    "progressive",
    "Oregon, Washington, Alaska, Idaho, Montana."
  ),
  build(
    "US-SWU",
    "USA — Southwest",
    "union-region",
    128713,
    131281,
    "mixed",
    "Texas, Oklahoma, Arkansas, Louisiana, New Mexico."
  ),
  build("CA", "Canada", "country", 78733, 80627, "progressive"),

  // ── SOUTH AMERICAN DIVISION (SAD) ────────────────────────────────────────
  build(
    "BR",
    "Brazil",
    "country",
    1809247,
    1819685,
    "mixed",
    "8 Unions combined. 79,195 baptisms but 96,544 lost in 2025 alone — net evangelism negative.",
    ["retention-crisis"]
  ),
  build("AR", "Argentina", "country", 123537, 123520, "mixed", null, [
    "net-decline",
  ]),
  build(
    "PE",
    "Peru",
    "country",
    441913,
    447739,
    "faithful",
    "North + South Peru Unions combined."
  ),
  build(
    "BO",
    "Bolivia",
    "country",
    137152,
    130341,
    "faithful",
    "Large 'missing' likely administrative.",
    ["data-anomaly-2025"]
  ),
  build("CL", "Chile", "country", 98142, 94616, "mixed", null, ["net-decline"]),
  build(
    "CO",
    "Colombia",
    "country",
    272687,
    273983,
    "mixed",
    "North + South Colombia Unions combined."
  ),
  build(
    "VE",
    "Venezuela",
    "country",
    337239,
    321233,
    "mixed",
    "East + West Venezuela. Large losses partly emigration.",
    ["net-decline", "emigration-affected"]
  ),

  // ── INTER-AMERICAN DIVISION (IAD) ────────────────────────────────────────
  build(
    "MX",
    "Mexico",
    "country",
    855453,
    876651,
    "faithful",
    "5 Unions combined."
  ),
  build(
    "JM",
    "Jamaica",
    "country",
    348837,
    354677,
    "faithful",
    "Highest SDA membership per capita globally."
  ),
  build(
    "HT",
    "Haiti",
    "country",
    507833,
    513627,
    "faithful",
    "Growth despite severe national instability."
  ),
  build("GT", "Guatemala", "country", 195929, 200113, "faithful"),
  build(
    "DO",
    "Dominican Republic",
    "country",
    332604,
    307756,
    "unknown",
    "34,067 listed as adjustments — almost certainly administrative, not real loss.",
    ["administrative-adjustment", "data-anomaly-2025"]
  ),

  // ── INTER-EUROPEAN DIVISION (EUD) ─────────────────────────────────────────
  build(
    "DE",
    "Germany",
    "country",
    34494,
    34752,
    "progressive",
    "North + South German Unions. Lowest baptismal rate globally."
  ),
  build(
    "RO",
    "Romania",
    "country",
    60970,
    60461,
    "faithful",
    "Conservative but declining from emigration.",
    ["net-decline", "emigration-affected"]
  ),
  build("PT", "Portugal", "country", 12305, 13147, "mixed"),
  build("ES", "Spain", "country", 19411, 19627, "mixed"),

  // ── TRANS-EUROPEAN DIVISION (TED) ─────────────────────────────────────────
  build(
    "GB",
    "United Kingdom",
    "country",
    44670,
    47195,
    "mixed",
    "Growth primarily immigrant-driven (West African, Caribbean)."
  ),
  build("FR", "France", "country", 20889, 21104, "progressive"),
  build(
    "PL",
    "Poland",
    "country",
    6032,
    6008,
    "faithful",
    "Conservative. Decline from emigration.",
    ["net-decline", "emigration-affected"]
  ),

  // ── EURO-ASIA DIVISION (ESD) ──────────────────────────────────────────────
  build(
    "RU",
    "Russia",
    "country",
    53458,
    50293,
    "faithful",
    "Decline from demographics and geopolitical pressure.",
    ["net-decline"]
  ),
  build(
    "UA",
    "Ukraine",
    "country",
    38407,
    37092,
    "faithful",
    "Decline from armed conflict and displacement.",
    ["conflict-affected", "net-decline"]
  ),

  // ── SOUTHERN ASIA DIVISION (SUD) ─────────────────────────────────────────
  build(
    "IN",
    "India",
    "country",
    1179867,
    1194320,
    "legalist",
    "7 Union Sections combined."
  ),

  // ── SOUTHERN ASIA-PACIFIC DIVISION (SSD) ─────────────────────────────────
  build(
    "PH",
    "Philippines",
    "country",
    1269942,
    1348409,
    "faithful",
    "5 Unions combined. 108,088 baptisms in 2025."
  ),
  build(
    "ID",
    "Indonesia",
    "country",
    201123,
    195932,
    "faithful",
    "East + West Indonesia Unions combined.",
    ["net-decline"]
  ),
  build(
    "MY",
    "Malaysia",
    "country",
    60216,
    61383,
    "unknown",
    "Large 'missing' figure likely administrative.",
    ["data-anomaly-2025"]
  ),

  // ── NORTHERN ASIA-PACIFIC DIVISION (NSD) ─────────────────────────────────
  build(
    "KR",
    "South Korea",
    "country",
    267517,
    269958,
    "legalist",
    "Heavily institutionalised. Very low growth."
  ),
  build(
    "JP",
    "Japan",
    "country",
    15046,
    14961,
    "progressive",
    "Net decline. Lowest baptismal rate in dataset.",
    ["net-decline"]
  ),
  build(
    "CN",
    "China",
    "country",
    488601,
    493691,
    "unknown",
    "Limited reporting due to political context."
  ),
];

// ─── Utility Exports ──────────────────────────────────────────────────────────

export const REGION_BY_ID = new Map(SDA_REGIONS.map((r) => [r.id, r]));

export function getColorByGrowth(pct: number): string {
  if (pct > 5) return "#1a7f4b"; // strong green
  if (pct > 2) return "#52b788"; // moderate green
  if (pct > 0) return "#b7e4c7"; // slow growth
  if (pct === 0) return "#ffd166"; // flat
  return "#e63946"; // decline
}

export const WORLD_TOTALS = {
  "2015": 20_847_347,
  "2020": 21_914_779,
  "2025": 24_372_139,
} as const;

// Abbreviated number formatter (1.2M, 340K, etc.)
export function abbrev(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return String(n);
}

// Full comma-formatted number
export function fmt(n: number): string {
  return n.toLocaleString("en-US");
}
