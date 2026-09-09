"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology } from "topojson-specification";

// ─── Types ───────────────────────────────────────────────────────────────────

type TheologicalProfile =
  | "faithful"
  | "progressive"
  | "legalist"
  | "mixed"
  | "unknown";
type GranularityLevel = "country" | "union-region" | "grouped";

interface SDAEntity {
  id: string;
  name: string;
  granularity: GranularityLevel;
  divisionId: string;
  divisionName: string;
  unionId: string;
  unionName: string;
  membersStart: number;
  membersEnd: number;
  baptisms: number;
  dropped: number;
  missing: number;
  deaths: number;
  growthPct: number;
  baptismalRate: number;
  theologicalProfile: TheologicalProfile;
  notes?: string;
  source: "ASR2026A";
  dataAnomaly?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SDA_ENTITIES: SDAEntity[] = [
  // South Pacific Division
  {
    id: "AU",
    name: "Australia",
    granularity: "country",
    divisionId: "SPD",
    divisionName: "South Pacific Division",
    unionId: "AUC",
    unionName: "Australian Union Conference",
    membersStart: 66215,
    membersEnd: 67281,
    baptisms: 1202,
    dropped: 84,
    missing: 41,
    deaths: 487,
    growthPct: 1.6,
    baptismalRate: 18.2,
    theologicalProfile: "progressive",
    notes:
      "Moderate growth but theologically aligned with progressive SPD leadership",
    source: "ASR2026A",
  },
  {
    id: "NZ",
    name: "New Zealand",
    granularity: "country",
    divisionId: "SPD",
    divisionName: "South Pacific Division",
    unionId: "NZPUC",
    unionName: "New Zealand Pacific Union Conference",
    membersStart: 22617,
    membersEnd: 22620,
    baptisms: 446,
    dropped: 73,
    missing: 594,
    deaths: 194,
    growthPct: 0.01,
    baptismalRate: 19.7,
    theologicalProfile: "progressive",
    notes:
      "Near-zero growth. 667 members dropped/missing vs 446 baptisms. Progressive/woke leadership documented.",
    source: "ASR2026A",
  },
  {
    id: "PG",
    name: "Papua New Guinea",
    granularity: "country",
    divisionId: "SPD",
    divisionName: "South Pacific Division",
    unionId: "PGUM",
    unionName: "Papua New Guinea Union Mission",
    membersStart: 623276,
    membersEnd: 611440,
    baptisms: 4794,
    dropped: 2925,
    missing: 6664,
    deaths: 1296,
    growthPct: -1.9,
    baptismalRate: 7.7,
    theologicalProfile: "unknown",
    notes:
      "Net decline despite baptisms — high missing/dropped numbers indicate data/retention issues",
    source: "ASR2026A",
    dataAnomaly: true,
  },
  {
    id: "TPUM",
    name: "Pacific Islands (Fiji, Samoa, Tonga, Vanuatu…)",
    granularity: "grouped",
    divisionId: "SPD",
    divisionName: "South Pacific Division",
    unionId: "TPUM",
    unionName: "Trans-Pacific Union Mission",
    membersStart: 143402,
    membersEnd: 148534,
    baptisms: 5247,
    dropped: 111,
    missing: 974,
    deaths: 283,
    growthPct: 3.6,
    baptismalRate: 36.6,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  // East-Central Africa Division
  {
    id: "UG",
    name: "Uganda",
    granularity: "country",
    divisionId: "ECD",
    divisionName: "East-Central Africa Division",
    unionId: "UUM",
    unionName: "Uganda Union Mission",
    membersStart: 595424,
    membersEnd: 634094,
    baptisms: 40086,
    dropped: 71,
    missing: 63,
    deaths: 288,
    growthPct: 6.5,
    baptismalRate: 67.3,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "TZ-N",
    name: "Tanzania (North)",
    granularity: "union-region",
    divisionId: "ECD",
    divisionName: "East-Central Africa Division",
    unionId: "NTUC",
    unionName: "Northern Tanzania Union Conference",
    membersStart: 880455,
    membersEnd: 948444,
    baptisms: 71870,
    dropped: 1366,
    missing: 1603,
    deaths: 1565,
    growthPct: 7.7,
    baptismalRate: 81.6,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "RW",
    name: "Rwanda",
    granularity: "country",
    divisionId: "ECD",
    divisionName: "East-Central Africa Division",
    unionId: "RUM",
    unionName: "Rwanda Union Mission",
    membersStart: 1186613,
    membersEnd: 1218518,
    baptisms: 32159,
    dropped: 179,
    missing: 67,
    deaths: 579,
    growthPct: 2.7,
    baptismalRate: 27.1,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "KE",
    name: "Kenya",
    granularity: "country",
    divisionId: "ECD",
    divisionName: "East-Central Africa Division",
    unionId: "EKUC",
    unionName: "East Kenya Union Conference",
    membersStart: 693089,
    membersEnd: 707337,
    baptisms: 43528,
    dropped: 4614,
    missing: 2443,
    deaths: 1957,
    growthPct: 2.1,
    baptismalRate: 62.8,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "BI",
    name: "Burundi",
    granularity: "country",
    divisionId: "ECD",
    divisionName: "East-Central Africa Division",
    unionId: "BUM",
    unionName: "Burundi Union Mission",
    membersStart: 240936,
    membersEnd: 249285,
    baptisms: 10191,
    dropped: 2520,
    missing: 238,
    deaths: 406,
    growthPct: 3.5,
    baptismalRate: 42.3,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  // North American Division — by Union
  {
    id: "US-PAC",
    name: "USA — Pacific Union",
    granularity: "union-region",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "PUC",
    unionName: "Pacific Union Conference",
    membersStart: 221276,
    membersEnd: 224178,
    baptisms: 4541,
    dropped: 253,
    missing: 720,
    deaths: 1486,
    growthPct: 1.3,
    baptismalRate: 20.5,
    theologicalProfile: "progressive",
    notes: "California-based. Strong progressive/woke influence in leadership.",
    source: "ASR2026A",
  },
  {
    id: "US-SOU",
    name: "USA — Southern Union",
    granularity: "union-region",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "SUC",
    unionName: "Southern Union Conference",
    membersStart: 296455,
    membersEnd: 305845,
    baptisms: 9552,
    dropped: 1317,
    missing: 574,
    deaths: 2016,
    growthPct: 3.2,
    baptismalRate: 32.2,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  {
    id: "US-COL",
    name: "USA — Columbia Union",
    granularity: "union-region",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "CUC",
    unionName: "Columbia Union Conference",
    membersStart: 156889,
    membersEnd: 162652,
    baptisms: 5699,
    dropped: 363,
    missing: 455,
    deaths: 970,
    growthPct: 3.7,
    baptismalRate: 36.3,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  {
    id: "US-LAK",
    name: "USA — Lake Union",
    granularity: "union-region",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "LUC",
    unionName: "Lake Union Conference",
    membersStart: 90809,
    membersEnd: 91926,
    baptisms: 1726,
    dropped: 109,
    missing: 209,
    deaths: 632,
    growthPct: 1.2,
    baptismalRate: 19.0,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  {
    id: "US-MID",
    name: "USA — Mid-America Union",
    granularity: "union-region",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "MAUC",
    unionName: "Mid-America Union Conference",
    membersStart: 66727,
    membersEnd: 67512,
    baptisms: 1389,
    dropped: 129,
    missing: 501,
    deaths: 515,
    growthPct: 1.2,
    baptismalRate: 20.8,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  {
    id: "US-NPU",
    name: "USA — North Pacific Union",
    granularity: "union-region",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "NPUC",
    unionName: "North Pacific Union Conference",
    membersStart: 103808,
    membersEnd: 104543,
    baptisms: 1901,
    dropped: 249,
    missing: 281,
    deaths: 987,
    growthPct: 0.7,
    baptismalRate: 18.3,
    theologicalProfile: "progressive",
    source: "ASR2026A",
  },
  {
    id: "US-ATL",
    name: "USA — Atlantic Union",
    granularity: "union-region",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "AUC-NAD",
    unionName: "Atlantic Union Conference",
    membersStart: 138662,
    membersEnd: 142243,
    baptisms: 4220,
    dropped: 271,
    missing: 291,
    deaths: 728,
    growthPct: 2.6,
    baptismalRate: 30.4,
    theologicalProfile: "progressive",
    notes:
      "Greater New York Conference is largest — heavily immigrant-driven growth",
    source: "ASR2026A",
  },
  {
    id: "US-SWU",
    name: "USA — Southwestern Union",
    granularity: "union-region",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "SWUC",
    unionName: "Southwestern Union Conference",
    membersStart: 128713,
    membersEnd: 131281,
    baptisms: 3740,
    dropped: 408,
    missing: 739,
    deaths: 688,
    growthPct: 2.0,
    baptismalRate: 29.1,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  {
    id: "CA",
    name: "Canada",
    granularity: "country",
    divisionId: "NAD",
    divisionName: "North American Division",
    unionId: "CSDA",
    unionName: "SDA Church in Canada",
    membersStart: 78733,
    membersEnd: 80627,
    baptisms: 1753,
    dropped: 78,
    missing: 243,
    deaths: 530,
    growthPct: 2.4,
    baptismalRate: 22.3,
    theologicalProfile: "progressive",
    source: "ASR2026A",
  },
  // South American Division
  {
    id: "BR",
    name: "Brazil",
    granularity: "country",
    divisionId: "SAD",
    divisionName: "South American Division",
    unionId: "BR-ALL",
    unionName: "Brazil (8 Unions — SAD)",
    membersStart: 1809247,
    membersEnd: 1819685,
    baptisms: 79195,
    dropped: 47117,
    missing: 49427,
    deaths: 9857,
    growthPct: 0.6,
    baptismalRate: 43.8,
    theologicalProfile: "mixed",
    notes:
      "High baptisms but extremely high dropout rate. Leadership in São Paulo influenced by progressive theology.",
    source: "ASR2026A",
  },
  {
    id: "AR",
    name: "Argentina",
    granularity: "country",
    divisionId: "SAD",
    divisionName: "South American Division",
    unionId: "AUC-SAD",
    unionName: "Argentina Union Conference",
    membersStart: 123537,
    membersEnd: 123520,
    baptisms: 3625,
    dropped: 1724,
    missing: 1377,
    deaths: 1027,
    growthPct: -0.01,
    baptismalRate: 29.3,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  {
    id: "PE",
    name: "Peru",
    granularity: "country",
    divisionId: "SAD",
    divisionName: "South American Division",
    unionId: "PE-ALL",
    unionName: "Peru (2 Unions — SAD)",
    membersStart: 441913,
    membersEnd: 447739,
    baptisms: 33075,
    dropped: 16898,
    missing: 14353,
    deaths: 3338,
    growthPct: 1.3,
    baptismalRate: 74.8,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "BO",
    name: "Bolivia",
    granularity: "country",
    divisionId: "SAD",
    divisionName: "South American Division",
    unionId: "BUM-SAD",
    unionName: "Bolivia Union Mission",
    membersStart: 137152,
    membersEnd: 130341,
    baptisms: 10809,
    dropped: 436,
    missing: 17150,
    deaths: 1291,
    growthPct: -5.0,
    baptismalRate: 78.8,
    theologicalProfile: "unknown",
    notes:
      'Large "missing" category — likely data/administrative issue rather than true decline',
    source: "ASR2026A",
    dataAnomaly: true,
  },
  {
    id: "CL",
    name: "Chile",
    granularity: "country",
    divisionId: "SAD",
    divisionName: "South American Division",
    unionId: "CUM",
    unionName: "Chile Union Mission",
    membersStart: 98142,
    membersEnd: 94616,
    baptisms: 3613,
    dropped: 2132,
    missing: 5162,
    deaths: 983,
    growthPct: -3.6,
    baptismalRate: 36.8,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  // European Divisions
  {
    id: "DE",
    name: "Germany",
    granularity: "country",
    divisionId: "EUD",
    divisionName: "Inter-European Division",
    unionId: "DE-ALL",
    unionName: "Germany (2 Unions — EUD)",
    membersStart: 34494,
    membersEnd: 34752,
    baptisms: 465,
    dropped: 123,
    missing: 103,
    deaths: 418,
    growthPct: 0.7,
    baptismalRate: 13.5,
    theologicalProfile: "progressive",
    notes:
      "Historically strong Desmond Ford / progressive influence in European church.",
    source: "ASR2026A",
  },
  {
    id: "GB",
    name: "United Kingdom",
    granularity: "country",
    divisionId: "TED",
    divisionName: "Trans-European Division",
    unionId: "BUC",
    unionName: "British Union Conference",
    membersStart: 44670,
    membersEnd: 47195,
    baptisms: 1497,
    dropped: 38,
    missing: 5,
    deaths: 309,
    growthPct: 5.7,
    baptismalRate: 33.5,
    theologicalProfile: "mixed",
    notes:
      "Strong growth driven by immigrant congregations — not reflective of indigenous church health",
    source: "ASR2026A",
  },
  {
    id: "RO",
    name: "Romania",
    granularity: "country",
    divisionId: "EUD",
    divisionName: "Inter-European Division",
    unionId: "RUC",
    unionName: "Romanian Union Conference",
    membersStart: 60970,
    membersEnd: 60461,
    baptisms: 792,
    dropped: 383,
    missing: 13,
    deaths: 1107,
    growthPct: -0.8,
    baptismalRate: 13.0,
    theologicalProfile: "faithful",
    notes:
      "Slight decline despite conservative theology — aging population effect",
    source: "ASR2026A",
  },
  {
    id: "PT",
    name: "Portugal",
    granularity: "country",
    divisionId: "EUD",
    divisionName: "Inter-European Division",
    unionId: "PUCC",
    unionName: "Portuguese Union of Churches Conference",
    membersStart: 12305,
    membersEnd: 13147,
    baptisms: 353,
    dropped: 47,
    missing: 42,
    deaths: 146,
    growthPct: 6.8,
    baptismalRate: 28.7,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  {
    id: "ES",
    name: "Spain",
    granularity: "country",
    divisionId: "EUD",
    divisionName: "Inter-European Division",
    unionId: "SUCC",
    unionName: "Spanish Union of Churches Conference",
    membersStart: 19411,
    membersEnd: 19627,
    baptisms: 374,
    dropped: 68,
    missing: 368,
    deaths: 101,
    growthPct: 1.1,
    baptismalRate: 19.3,
    theologicalProfile: "mixed",
    source: "ASR2026A",
  },
  // West-Central Africa Division
  {
    id: "NG",
    name: "Nigeria",
    granularity: "country",
    divisionId: "WAD",
    divisionName: "West-Central Africa Division",
    unionId: "NG-ALL",
    unionName: "Nigeria (3 Unions — WAD)",
    membersStart: 335019,
    membersEnd: 354820,
    baptisms: 22845,
    dropped: 376,
    missing: 677,
    deaths: 1158,
    growthPct: 5.9,
    baptismalRate: 68.2,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "GH",
    name: "Ghana",
    granularity: "country",
    divisionId: "WAD",
    divisionName: "West-Central Africa Division",
    unionId: "GH-ALL",
    unionName: "Ghana (3 Unions — WAD)",
    membersStart: 429047,
    membersEnd: 449950,
    baptisms: 24657,
    dropped: 389,
    missing: 897,
    deaths: 1409,
    growthPct: 4.9,
    baptismalRate: 57.5,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "CM",
    name: "Cameroon",
    granularity: "country",
    divisionId: "WAD",
    divisionName: "West-Central Africa Division",
    unionId: "CM-ALL",
    unionName: "Cameroon (2 Unions — WAD)",
    membersStart: 146531,
    membersEnd: 159420,
    baptisms: 13447,
    dropped: 177,
    missing: 343,
    deaths: 284,
    growthPct: 8.8,
    baptismalRate: 91.8,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  // Inter-American Division
  {
    id: "MX",
    name: "Mexico",
    granularity: "country",
    divisionId: "IAD",
    divisionName: "Inter-American Division",
    unionId: "MX-ALL",
    unionName: "Mexico (5 Unions — IAD)",
    membersStart: 855453,
    membersEnd: 876651,
    baptisms: 44840,
    dropped: 25416,
    missing: 6690,
    deaths: 4332,
    growthPct: 2.5,
    baptismalRate: 52.4,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "JM",
    name: "Jamaica",
    granularity: "country",
    divisionId: "IAD",
    divisionName: "Inter-American Division",
    unionId: "JUC",
    unionName: "Jamaica Union Conference",
    membersStart: 348837,
    membersEnd: 354677,
    baptisms: 6969,
    dropped: 213,
    missing: 25,
    deaths: 832,
    growthPct: 1.7,
    baptismalRate: 20.0,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
  {
    id: "DO",
    name: "Dominican Republic",
    granularity: "country",
    divisionId: "IAD",
    divisionName: "Inter-American Division",
    unionId: "DUC",
    unionName: "Dominican Union Conference",
    membersStart: 332604,
    membersEnd: 307756,
    baptisms: 9597,
    dropped: 948,
    missing: 501,
    deaths: 505,
    growthPct: -7.5,
    baptismalRate: 28.9,
    theologicalProfile: "unknown",
    notes:
      'Large data anomaly — 33,614 "adjustments" likely administrative re-classification, not real loss',
    source: "ASR2026A",
    dataAnomaly: true,
  },
  {
    id: "HT",
    name: "Haiti",
    granularity: "country",
    divisionId: "IAD",
    divisionName: "Inter-American Division",
    unionId: "HUM",
    unionName: "Haitian Union Mission",
    membersStart: 507833,
    membersEnd: 513627,
    baptisms: 4703,
    dropped: 694,
    missing: 225,
    deaths: 505,
    growthPct: 1.1,
    baptismalRate: 9.3,
    theologicalProfile: "faithful",
    source: "ASR2026A",
  },
];

// ─── ISO Numeric Mapping ──────────────────────────────────────────────────────
// Maps entity IDs → ISO 3166-1 numeric codes used in world-atlas

const ISO_MAP: Record<string, number> = {
  AU: 36,
  NZ: 554,
  PG: 598,
  UG: 800,
  "TZ-N": 834,
  RW: 646,
  KE: 404,
  BI: 108,
  BR: 76,
  AR: 32,
  PE: 604,
  BO: 68,
  CL: 152,
  DE: 276,
  GB: 826,
  RO: 642,
  PT: 620,
  ES: 724,
  NG: 566,
  GH: 288,
  CM: 120,
  MX: 484,
  JM: 388,
  DO: 214,
  HT: 332,
  CA: 124,
  // USA — all 8 unions map to the same country polygon
  "US-PAC": 840,
  "US-SOU": 840,
  "US-COL": 840,
  "US-LAK": 840,
  "US-MID": 840,
  "US-NPU": 840,
  "US-ATL": 840,
  "US-SWU": 840,
};

// Build reverse map: isoNumeric → entity[]
const entitiesByISO = new Map<number, SDAEntity[]>();
for (const entity of SDA_ENTITIES) {
  if (entity.granularity === "grouped") continue; // skip tiny island groups
  const iso = ISO_MAP[entity.id];
  if (iso) {
    const arr = entitiesByISO.get(iso) ?? [];
    arr.push(entity);
    entitiesByISO.set(iso, arr);
  }
}

// ─── Color & Label Utilities ──────────────────────────────────────────────────

function getColor(growthPct: number): string {
  if (growthPct > 6) return "#1a7f4b";
  if (growthPct > 3) return "#52b788";
  if (growthPct > 1) return "#b7e4c7";
  if (growthPct >= 0) return "#ffd166";
  return "#e63946";
}

function getGrowthLabel(growthPct: number): string {
  if (growthPct > 6) return "Strong growth";
  if (growthPct > 3) return "Moderate growth";
  if (growthPct > 1) return "Slow growth";
  if (growthPct >= 0) return "Stagnation";
  return "Decline";
}

function getTheologicalBadge(profile: TheologicalProfile): {
  label: string;
  bg: string;
  text: string;
} {
  switch (profile) {
    case "faithful":
      return { label: "Faithful", bg: "#dcfce7", text: "#166534" };
    case "progressive":
      return { label: "Progressive", bg: "#fff7ed", text: "#9a3412" };
    case "legalist":
      return { label: "Legalist", bg: "#f3e8ff", text: "#6b21a8" };
    case "mixed":
      return { label: "Mixed", bg: "#dbeafe", text: "#1e40af" };
    default:
      return { label: "Unknown", bg: "#f3f4f6", text: "#374151" };
  }
}

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

function countryColorByISO(isoNum: number): string {
  const entities = entitiesByISO.get(isoNum);
  if (!entities || entities.length === 0) return "#d1d5db";
  const avg = entities.reduce((s, e) => s + e.growthPct, 0) / entities.length;
  return getColor(avg);
}

// ─── Interfaces ────────────────────────────────────────────────────────────────

interface MapFeature {
  key: string; // raw string id from topology — always unique, used as React key
  id: number; // ISO numeric parsed from key — used for data lookup
  pathData: string;
  name: string;
}

interface TooltipState {
  x: number;
  y: number;
  isoNum: number;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function EntityTooltip({
  entities,
  x,
  y,
}: {
  entities: SDAEntity[];
  x: number;
  y: number;
}) {
  const isMulti = entities.length > 1;
  const primary = entities[0];

  // Average stats for multi-entity (USA)
  const totalStart = entities.reduce((s, e) => s + e.membersStart, 0);
  const totalEnd = entities.reduce((s, e) => s + e.membersEnd, 0);
  const totalBaptisms = entities.reduce((s, e) => s + e.baptisms, 0);
  const avgGrowth =
    entities.reduce((s, e) => s + e.growthPct, 0) / entities.length;
  const avgBaptRate =
    entities.reduce((s, e) => s + e.baptismalRate, 0) / entities.length;
  const totalDropped = entities.reduce((s, e) => s + e.dropped + e.missing, 0);
  const hasAnomaly = entities.some((e) => e.dataAnomaly);

  const label = getGrowthLabel(isMulti ? avgGrowth : primary.growthPct);
  const pct = isMulti ? avgGrowth : primary.growthPct;

  const style: React.CSSProperties = {
    position: "fixed",
    left: x + 14,
    top: y - 10,
    zIndex: 50,
    pointerEvents: "none",
    maxWidth: 300,
  };

  return (
    <div
      style={style}
      className="bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden text-sm"
    >
      <div className="px-4 pt-3 pb-2 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-gray-900">
            {isMulti ? `🇺🇸 USA (${entities.length} Unions)` : primary.name}
          </span>
          {hasAnomaly && <span title="Data anomaly — see notes">⚠️</span>}
        </div>
        <div className="text-xs text-gray-500 mt-0.5">
          {isMulti ? primary.divisionName : primary.unionName}
        </div>
        {!isMulti && (
          <div className="text-xs text-gray-400">{primary.divisionName}</div>
        )}
      </div>
      <div className="px-4 py-3 space-y-1.5">
        <Row label="Members 2025" value={fmt(totalEnd)} />
        <Row
          label="Growth"
          value={`${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`}
          sub={label}
          color={getColor(pct)}
        />
        <Row label="Baptisms" value={fmt(totalBaptisms)} />
        <Row
          label="Baptismal rate"
          value={`${avgBaptRate.toFixed(1)} / 1,000`}
        />
        <Row label="Dropped / Missing" value={fmt(totalDropped)} />
        {isMulti && (
          <p className="text-xs text-gray-400 pt-1 italic">
            Click for individual union breakdown
          </p>
        )}
      </div>
      <div className="px-4 pb-2 text-[10px] text-gray-400 border-t border-gray-100 pt-1.5">
        Source: ASR2026A (SDA General Conference)
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="flex justify-between items-baseline gap-4">
      <span className="text-gray-500 text-xs">{label}</span>
      <span
        className="font-medium text-gray-800 text-xs text-right"
        style={color ? { color } : undefined}
      >
        {value}
        {sub && (
          <span className="text-gray-400 font-normal ml-1 text-[10px]">
            ({sub})
          </span>
        )}
      </span>
    </div>
  );
}

function Sidebar({
  entities,
  onClose,
}: {
  entities: SDAEntity[];
  onClose: () => void;
}) {
  const isUSA = entities.length > 1;

  return (
    <div className="fixed right-0 top-0 h-full w-[360px] bg-white shadow-2xl border-l border-gray-200 z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900 text-base">
            {isUSA ? "🇺🇸 United States" : entities[0].name}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {entities[0].divisionName}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-xl leading-none p-1"
          aria-label="Close sidebar"
        >
          ×
        </button>
      </div>

      <div className="p-5 space-y-5">
        {entities.map((entity) => {
          const badge = getTheologicalBadge(entity.theologicalProfile);
          const pct = entity.growthPct;
          return (
            <div
              key={entity.id}
              className="rounded-xl border border-gray-100 overflow-hidden"
            >
              {/* Entity header */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {entity.name}
                  </p>
                  <p className="text-xs text-gray-500">{entity.unionName}</p>
                </div>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: badge.bg, color: badge.text }}
                >
                  {badge.label}
                </span>
              </div>

              {/* Stats grid */}
              <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-2">
                <Stat label="Members start" value={fmt(entity.membersStart)} />
                <Stat label="Members end" value={fmt(entity.membersEnd)} />
                <Stat
                  label="Growth"
                  value={`${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`}
                  color={getColor(pct)}
                />
                <Stat label="Category" value={getGrowthLabel(pct)} />
                <Stat label="Baptisms" value={fmt(entity.baptisms)} />
                <Stat
                  label="Baptismal rate"
                  value={`${entity.baptismalRate}/1k`}
                />
                <Stat label="Dropped" value={fmt(entity.dropped)} />
                <Stat label="Missing" value={fmt(entity.missing)} />
                <Stat label="Deaths" value={fmt(entity.deaths)} />
              </div>

              {/* Notes */}
              {(entity.notes || entity.dataAnomaly) && (
                <div className="px-4 pb-3">
                  {entity.dataAnomaly && (
                    <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-2 flex gap-1.5">
                      <span>⚠️</span>
                      <span>
                        Data anomaly: figures may reflect administrative
                        reclassification, not real membership change.
                      </span>
                    </p>
                  )}
                  {entity.notes && (
                    <p className="text-[11px] text-gray-500 italic">
                      {entity.notes}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Pacific Islands note */}
        {isUSA && (
          <p className="text-xs text-gray-400 text-center">
            USA is divided into 8 regional Unions with distinct membership
            profiles
          </p>
        )}
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-400">
          Source: Seventh-day Adventist Church — Annual Statistical Report 2025
          (Advance Release). Office of Archives, Statistics, and Research,
          General Conference, 2026.{" "}
          <a
            href="https://adventiststatistics.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            adventiststatistics.org
          </a>
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div>
      <p className="text-[10px] text-gray-400 uppercase tracking-wide">
        {label}
      </p>
      <p
        className="text-sm font-medium text-gray-800"
        style={color ? { color } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function Legend() {
  const items = [
    { color: "#1a7f4b", label: "> 6% — Strong growth" },
    { color: "#52b788", label: "3–6% — Moderate growth" },
    { color: "#b7e4c7", label: "1–3% — Slow growth" },
    { color: "#ffd166", label: "0–1% — Stagnation" },
    { color: "#e63946", label: "< 0% — Decline" },
    { color: "#d1d5db", label: "No data" },
  ];
  return (
    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide mb-2">
        Growth % (2025)
      </p>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-sm shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[11px] text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SDAMapPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [features, setFeatures] = useState<MapFeature[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [sidebar, setSidebar] = useState<SDAEntity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track dims for re-projection on resize
  const [dims, setDims] = useState({ w: 960, h: 500 });

  // Compute projected features from topology
  const computeFeatures = useCallback(
    (topology: Topology, w: number, h: number) => {
      const projection = d3
        .geoNaturalEarth1()
        .scale(w / 6.28)
        .translate([w / 2, h / 2]);
      const pathGen = d3.geoPath().projection(projection);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geo = topojson.feature(
        topology,
        (topology.objects as any).countries
      ) as d3.GeoPermissibleObjects & {
        features: Array<{
          id: string | number;
          properties: Record<string, unknown>;
        }>;
      };

      const mapped: MapFeature[] = [];
      const seenKeys = new Set<string>();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const [idx, f] of ((geo as any).features as any[]).entries()) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = pathGen(f as any);
        if (!d) continue;
        // Use raw string id; fall back to index so the key is always unique
        const rawId =
          f.id !== undefined && f.id !== null ? String(f.id) : `__idx_${idx}`;
        const key = seenKeys.has(rawId) ? `${rawId}_${idx}` : rawId;
        seenKeys.add(key);
        const numericId = Number(rawId);
        mapped.push({
          key,
          id: Number.isFinite(numericId) ? numericId : -1,
          pathData: d,
          name: String(f.properties?.name ?? ""),
        });
      }
      setFeatures(mapped);
    },
    []
  );

  // Fetch world-atlas topology once
  useEffect(() => {
    let cancelled = false;
    let cachedTopology: Topology | null = null;

    async function load() {
      try {
        const res = await fetch(
          "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        );
        if (!res.ok) throw new Error("Failed to fetch world atlas data");
        cachedTopology = (await res.json()) as Topology;
        if (cancelled) return;

        const w = containerRef.current?.clientWidth ?? 960;
        const h = Math.round(w * 0.52);
        setDims({ w, h });
        computeFeatures(cachedTopology, w, h);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    // Recompute on resize
    const handleResize = () => {
      if (!containerRef.current || !cachedTopology) return;
      const w = containerRef.current.clientWidth;
      const h = Math.round(w * 0.52);
      setDims({ w, h });
      computeFeatures(cachedTopology, w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
    };
  }, [computeFeatures]);

  const handleMouseMove = useCallback((e: React.MouseEvent, isoNum: number) => {
    setTooltip({ x: e.clientX, y: e.clientY, isoNum });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleClick = useCallback((isoNum: number) => {
    const entities = entitiesByISO.get(isoNum);
    if (entities && entities.length > 0) {
      setSidebar(entities);
    }
  }, []);

  const tooltipEntities = tooltip ? entitiesByISO.get(tooltip.isoNum) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              SDA World Growth Map
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Membership growth / decline by region · 2025 Annual Statistical
              Report (ASR2026A)
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">
              Source:{" "}
              <a
                href="https://adventiststatistics.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-500 hover:text-blue-700"
              >
                SDA Office of Archives, Statistics and Research
              </a>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Official ASR2026A · General Conference of SDA
            </p>
          </div>
        </div>
      </header>

      {/* Map area */}
      <main className="flex-1 relative p-4">
        <div
          ref={containerRef}
          className="relative w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          style={{ minHeight: 420 }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm">Loading world map…</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-red-500">
              <p className="text-sm">Error: {error}</p>
            </div>
          )}

          {!loading && !error && (
            <svg
              viewBox={`0 0 ${dims.w} ${dims.h}`}
              width="100%"
              style={{ display: "block" }}
              className="cursor-crosshair"
            >
              {/* Ocean background */}
              <rect width={dims.w} height={dims.h} fill="#e0f0ff" />

              {features.map((f) => {
                const hasData = entitiesByISO.has(f.id);
                const fill = countryColorByISO(f.id);
                return (
                  <path
                    key={f.key}
                    d={f.pathData}
                    fill={fill}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    className={
                      hasData
                        ? "transition-opacity hover:opacity-80 cursor-pointer"
                        : "cursor-default"
                    }
                    onMouseMove={
                      hasData ? (e) => handleMouseMove(e, f.id) : undefined
                    }
                    onMouseLeave={hasData ? handleMouseLeave : undefined}
                    onClick={hasData ? () => handleClick(f.id) : undefined}
                  />
                );
              })}
            </svg>
          )}

          {/* Legend */}
          {!loading && !error && <Legend />}

          {/* Stats badge */}
          {!loading && !error && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl shadow border border-gray-100 px-4 py-3 text-right">
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">
                Global SDA
              </p>
              <p className="text-lg font-bold text-gray-800">~21.9M</p>
              <p className="text-[11px] text-gray-500">members worldwide</p>
            </div>
          )}
        </div>

        {/* Pacific Islands note */}
        {!loading &&
          !error &&
          (() => {
            const tpum = SDA_ENTITIES.find((e) => e.id === "TPUM");
            if (!tpum) return null;
            return (
              <div className="mt-3 text-xs text-gray-400 text-center">
                ℹ️ <strong>Trans-Pacific Union Mission</strong> (Fiji, Samoa,
                Tonga, Vanuatu…): {fmt(tpum.membersEnd)} members · +
                {tpum.growthPct}% growth · {tpum.baptismalRate}/1,000 baptismal
                rate — too small to show on 110m map
              </div>
            );
          })()}
      </main>

      {/* Bottom data table */}
      {!loading && !error && (
        <section className="px-4 pb-6">
          <div className="max-w-screen-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">
                All Entities — 2025 Summary
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase tracking-wide">
                    <th className="text-left px-4 py-2.5 font-medium">
                      Region
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium">Union</th>
                    <th className="text-left px-4 py-2.5 font-medium">
                      Division
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      Members 2025
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      Growth %
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      Baptisms
                    </th>
                    <th className="text-right px-4 py-2.5 font-medium">
                      Bapt. Rate
                    </th>
                    <th className="text-left px-4 py-2.5 font-medium">
                      Profile
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[...SDA_ENTITIES]
                    .sort((a, b) => b.membersEnd - a.membersEnd)
                    .map((e) => {
                      const badge = getTheologicalBadge(e.theologicalProfile);
                      const pct = e.growthPct;
                      return (
                        <tr
                          key={e.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            const isoNum = ISO_MAP[e.id];
                            if (isoNum) {
                              const entities = entitiesByISO.get(isoNum);
                              if (entities) setSidebar(entities);
                            } else {
                              setSidebar([e]);
                            }
                          }}
                        >
                          <td className="px-4 py-2.5 font-medium text-gray-800">
                            {e.name}
                            {e.dataAnomaly && (
                              <span className="ml-1" title="Data anomaly">
                                ⚠️
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-gray-500">
                            {e.unionName}
                          </td>
                          <td className="px-4 py-2.5 text-gray-500">
                            {e.divisionId}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-700">
                            {fmt(e.membersEnd)}
                          </td>
                          <td
                            className="px-4 py-2.5 text-right font-semibold"
                            style={{ color: getColor(pct) }}
                          >
                            {pct >= 0 ? "+" : ""}
                            {pct.toFixed(2)}%
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-600">
                            {fmt(e.baptisms)}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-600">
                            {e.baptismalRate}
                          </td>
                          <td className="px-4 py-2.5">
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                              style={{
                                backgroundColor: badge.bg,
                                color: badge.text,
                              }}
                            >
                              {badge.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Tooltip */}
      {tooltip && tooltipEntities && (
        <EntityTooltip entities={tooltipEntities} x={tooltip.x} y={tooltip.y} />
      )}

      {/* Sidebar */}
      {sidebar && (
        <Sidebar entities={sidebar} onClose={() => setSidebar(null)} />
      )}

      {/* Sidebar overlay */}
      {sidebar && (
        <div
          className="fixed inset-0 bg-black/10 z-30"
          onClick={() => setSidebar(null)}
        />
      )}
    </div>
  );
}
