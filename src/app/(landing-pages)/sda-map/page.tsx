"use client";
// src/app/(landing-pages)/sda-map/page.tsx
// Dependencies: react-simple-maps v5, world-atlas@2, us-atlas@3

import { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";
import type { SDARegion, TheologicalProfile } from "./stats";
import {
  SDA_REGIONS,
  REGION_BY_ID,
  getColorByGrowth,
  WORLD_TOTALS,
  abbrev,
  fmt,
} from "./stats";

// ─── Topology URLs ────────────────────────────────────────────────────────────

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const US_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// ─── ISO numeric → Region ID ──────────────────────────────────────────────────

const NUMERIC_TO_REGION: Record<number, string> = {
  554: "NZ",
  36: "AU",
  598: "PG",
  242: "PF",
  882: "PF",
  776: "PF",
  548: "PF",
  90: "PF",
  296: "PF",
  798: "PF",
  570: "PF",
  800: "UG",
  834: "TZ",
  646: "RW",
  404: "KE",
  108: "BI",
  231: "ET",
  180: "CD",
  728: "SS",
  566: "NG",
  288: "GH",
  120: "CM",
  894: "ZM",
  716: "ZW",
  450: "MG",
  454: "MW",
  508: "MZ",
  24: "AO",
  124: "CA",
  840: "__USA__",
  76: "BR",
  32: "AR",
  604: "PE",
  68: "BO",
  152: "CL",
  170: "CO",
  862: "VE",
  484: "MX",
  388: "JM",
  332: "HT",
  320: "GT",
  214: "DO",
  276: "DE",
  642: "RO",
  620: "PT",
  724: "ES",
  826: "GB",
  250: "FR",
  616: "PL",
  643: "RU",
  804: "UA",
  356: "IN",
  608: "PH",
  360: "ID",
  458: "MY",
  410: "KR",
  392: "JP",
  156: "CN",
};

// ─── USA state FIPS → Union ID ────────────────────────────────────────────────

const USA_STATE_TO_UNION: Record<string, string> = {
  "06": "US-PAC",
  "32": "US-PAC",
  "04": "US-PAC",
  "49": "US-PAC",
  "15": "US-PAC",
  "41": "US-NPU",
  "53": "US-NPU",
  "02": "US-NPU",
  "16": "US-NPU",
  "30": "US-NPU",
  "36": "US-ATL",
  "09": "US-ATL",
  "25": "US-ATL",
  "44": "US-ATL",
  "50": "US-ATL",
  "33": "US-ATL",
  "23": "US-ATL",
  "11": "US-COL",
  "24": "US-COL",
  "51": "US-COL",
  "54": "US-COL",
  "39": "US-COL",
  "42": "US-COL",
  "34": "US-COL",
  "26": "US-LAK",
  "18": "US-LAK",
  "17": "US-LAK",
  "55": "US-LAK",
  "27": "US-MID",
  "19": "US-MID",
  "31": "US-MID",
  "20": "US-MID",
  "38": "US-MID",
  "46": "US-MID",
  "29": "US-MID",
  "08": "US-MID",
  "12": "US-SOU",
  "13": "US-SOU",
  "37": "US-SOU",
  "45": "US-SOU",
  "47": "US-SOU",
  "21": "US-SOU",
  "01": "US-SOU",
  "28": "US-SOU",
  "48": "US-SWU",
  "40": "US-SWU",
  "05": "US-SWU",
  "22": "US-SWU",
  "35": "US-SWU",
};

// ─── Color helpers ────────────────────────────────────────────────────────────

function getRegionColor(region: SDARegion | undefined): string {
  if (!region) return "#e5e7eb";
  return getColorByGrowth(region.growth.current);
}

// ─── Profile metadata ─────────────────────────────────────────────────────────

const PROFILE_LABEL: Record<TheologicalProfile, string> = {
  faithful: "Faithful",
  progressive: "Progressive *",
  legalist: "Legalist *",
  mixed: "Mixed *",
  unknown: "Unknown",
};
const PROFILE_BG: Record<TheologicalProfile, string> = {
  faithful: "#dcfce7",
  progressive: "#fee2e2",
  legalist: "#fed7aa",
  mixed: "#dbeafe",
  unknown: "#f3f4f6",
};
const PROFILE_TEXT: Record<TheologicalProfile, string> = {
  faithful: "#166534",
  progressive: "#991b1b",
  legalist: "#92400e",
  mixed: "#1e40af",
  unknown: "#374151",
};

// ─── Legend data ──────────────────────────────────────────────────────────────

const GROWTH_LEGEND = [
  { color: "#1a7f4b", label: "> 5% growth" },
  { color: "#52b788", label: "2–5% growth" },
  { color: "#b7e4c7", label: "0–2% growth" },
  { color: "#ffd166", label: "Flat" },
  { color: "#e63946", label: "Decline" },
  { color: "#e5e7eb", label: "No data" },
];

const FLAG_LABELS: Record<string, string> = {
  "data-anomaly-2025": "⚠ Data anomaly 2025",
  "conflict-affected": "⚔ Conflict affected",
  "net-decline": "📉 Net decline",
  "retention-crisis": "🚨 Retention crisis",
  "emigration-affected": "✈ Emigration affected",
  "administrative-adjustment": "📋 Admin adjustment",
  "nz-mainland-only": "ℹ NZ mainland only",
};

// ─── Shared 3-column stats table ──────────────────────────────────────────────

function StatsTable({ region }: { region: SDARegion }) {
  const g = region.growth.current;
  const growthColor = g > 0 ? "#1a7f4b" : g < 0 ? "#e63946" : "#6b7280";
  const growthSign = g > 0 ? "+" : "";

  return (
    <div>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="text-gray-400 uppercase text-[9px] tracking-wide">
            <th className="text-left pb-1 font-medium">Members 2025</th>
            <th className="text-right pb-1 font-medium">Growth</th>
            <th className="text-right pb-1 font-medium">Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-gray-800 font-semibold">
            <td className="py-0.5">{fmt(region.stats["2025"].members)}</td>
            <td className="text-right" style={{ color: growthColor }}>
              {growthSign}
              {g.toFixed(2)}%
            </td>
            <td className="text-right">
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: PROFILE_BG[region.theologicalProfile],
                  color: PROFILE_TEXT[region.theologicalProfile],
                }}
              >
                {PROFILE_LABEL[region.theologicalProfile]}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {region.dataFlags && region.dataFlags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {region.dataFlags.map((f) => (
            <span
              key={f}
              className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full"
            >
              {FLAG_LABELS[f] ?? f}
            </span>
          ))}
        </div>
      )}

      {region.notes && (
        <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
          {region.notes}
        </p>
      )}
    </div>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({
  region,
  x,
  y,
}: {
  region: SDARegion;
  x: number;
  y: number;
}) {
  const left = Math.min(
    x + 14,
    typeof window !== "undefined" ? window.innerWidth - 320 : x + 14
  );

  return (
    <div
      style={{
        position: "fixed",
        left,
        top: y - 8,
        zIndex: 60,
        pointerEvents: "none",
        maxWidth: 310,
      }}
      className="bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="px-4 pt-3 pb-2 bg-gray-50 border-b border-gray-100">
        <p className="font-semibold text-gray-900 text-[13px] leading-tight">
          {region.name}
        </p>
      </div>
      <div className="px-4 py-2.5">
        <StatsTable region={region} />
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  region,
  onClose,
}: {
  region: SDARegion;
  onClose: () => void;
}) {
  return (
    <div className="fixed right-0 top-0 h-full w-[360px] bg-white border-l border-gray-200 shadow-2xl z-40 overflow-y-auto flex flex-col">
      <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between gap-3 z-10">
        <h2 className="font-bold text-gray-900 text-base leading-tight">
          {region.name}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 text-2xl leading-none shrink-0"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="p-5 flex-1">
        <StatsTable region={region} />
      </div>

      <div className="px-5 py-3 border-t border-gray-100 text-[10px] text-gray-400">
        <p>Source: ASR2026A</p>
        <p className="mt-0.5">
          SDA Office of Archives, Statistics &amp; Research —{" "}
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

// ─── Legend ───────────────────────────────────────────────────────────────────

function Legend() {
  return (
    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
        1-yr growth (2025)
      </p>
      <div className="space-y-1.5">
        {GROWTH_LEGEND.map((item) => (
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

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const pct10 =
    Math.round(
      ((WORLD_TOTALS["2025"] - WORLD_TOTALS["2015"]) / WORLD_TOTALS["2015"]) *
        1000
    ) / 10;
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-3">
      <div className="max-w-screen-xl mx-auto flex flex-wrap gap-8">
        <StatPill label="World SDA 2025" value={abbrev(WORLD_TOTALS["2025"])} />
        <StatPill label="10-year growth" value={`+${pct10}%`} color="#1a7f4b" />
        <StatPill label="Regions tracked" value={String(SDA_REGIONS.length)} />
        <StatPill label="Data source" value="ASR2026A" />
      </div>
    </div>
  );
}

function StatPill({
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
        className="text-base font-bold text-gray-800"
        style={color ? { color } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SDAMapPage() {
  const [tooltip, setTooltip] = useState<{
    region: SDARegion;
    x: number;
    y: number;
  } | null>(null);
  const [sidebar, setSidebar] = useState<SDARegion | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Resolve region from world-atlas numeric ID
  const worldRegion = useCallback(
    (geoId: string | number | undefined): SDARegion | undefined => {
      const num = Number(geoId);
      if (!Number.isFinite(num)) return undefined;
      const rId = NUMERIC_TO_REGION[num];
      if (!rId || rId === "__USA__") return undefined;
      return REGION_BY_ID.get(rId);
    },
    []
  );

  // Resolve region from US FIPS state ID
  const stateRegion = useCallback(
    (geoId: string | number | undefined): SDARegion | undefined => {
      const fips = String(Number(geoId)).padStart(2, "0");
      const rId = USA_STATE_TO_UNION[fips];
      return rId ? REGION_BY_ID.get(rId) : undefined;
    },
    []
  );

  const showTooltip = useCallback(
    (region: SDARegion | undefined, key: string, e: React.MouseEvent) => {
      setHovered(key);
      if (region) setTooltip({ region, x: e.clientX, y: e.clientY });
    },
    []
  );

  const hideTooltip = useCallback((key: string) => {
    setHovered((h) => (h === key ? null : h));
    setTooltip(null);
  }, []);

  const openSidebar = useCallback((region: SDARegion | undefined) => {
    if (!region) return;
    setTooltip(null);
    setSidebar(region);
  }, []);

  const geoStyle = useCallback(
    (region: SDARegion | undefined, key: string): React.CSSProperties => ({
      fill: getRegionColor(region),
      stroke: hovered === key ? "#475569" : "#ffffff",
      strokeWidth: hovered === key ? 0.8 : 0.5,
      outline: "none",
      cursor: region ? "pointer" : "default",
    }),
    [hovered]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">
            SDA World Growth Map
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            1-year membership growth · 2025 · ASR2026A
          </p>
        </div>
      </header>

      <StatsBar />

      {/* Map + sidebar */}
      <main className="flex-1 flex relative">
        <div
          className={`relative flex-1 transition-all duration-200 ${
            sidebar ? "mr-[360px]" : ""
          }`}
        >
          {/* Map */}
          <div
            style={{ width: "100%", height: "100vh" }}
            className="bg-white overflow-hidden relative"
          >
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{ scale: 147, center: [0, 15] }}
              style={{ width: "100%", height: "100%" }}
            >
              <g>
                {/* Ocean */}
                <Sphere
                  id="rsm-sphere"
                  fill="#dbeafe"
                  stroke="#93c5fd"
                  strokeWidth={0.3}
                />

                {/* World countries */}
                <Geographies geography={WORLD_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      if (Number(geo.id) === 840) return null; // USA handled by state layer
                      const region = worldRegion(geo.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={geoStyle(region, geo.rsmKey)}
                          onMouseEnter={(e) =>
                            showTooltip(region, geo.rsmKey, e)
                          }
                          onMouseLeave={() => hideTooltip(geo.rsmKey)}
                          onMouseMove={(e) => {
                            if (region)
                              setTooltip({
                                region,
                                x: e.clientX,
                                y: e.clientY,
                              });
                          }}
                          onClick={() => openSidebar(region)}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* USA — state-level by Union */}
                <Geographies geography={US_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const region = stateRegion(geo.id);
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={geoStyle(region, geo.rsmKey)}
                          onMouseEnter={(e) =>
                            showTooltip(region, geo.rsmKey, e)
                          }
                          onMouseLeave={() => hideTooltip(geo.rsmKey)}
                          onMouseMove={(e) => {
                            if (region)
                              setTooltip({
                                region,
                                x: e.clientX,
                                y: e.clientY,
                              });
                          }}
                          onClick={() => openSidebar(region)}
                        />
                      );
                    })
                  }
                </Geographies>
              </g>
            </ComposableMap>

            {/* Legend overlay */}
            <Legend />
          </div>
        </div>

        {/* Sidebar overlay */}
        {sidebar && (
          <>
            <div
              className="fixed inset-0 bg-black/10 z-30"
              onClick={() => setSidebar(null)}
            />
            <Sidebar region={sidebar} onClose={() => setSidebar(null)} />
          </>
        )}
      </main>

      {/* Data table */}
      <section className="px-4 py-6">
        <div className="max-w-screen-xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">All Regions</h2>
            <p className="text-[10px] text-gray-400">
              {SDA_REGIONS.length} regions · click a row to inspect
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase tracking-wide text-[10px]">
                  <th className="text-left px-4 py-2.5 font-medium">Region</th>
                  <th className="text-right px-4 py-2.5 font-medium">
                    Members 2025
                  </th>
                  <th className="text-right px-4 py-2.5 font-medium">
                    Growth %
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium hidden lg:table-cell">
                    Profile *
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...SDA_REGIONS]
                  .sort(
                    (a, b) => b.stats["2025"].members - a.stats["2025"].members
                  )
                  .map((r) => {
                    const g = r.growth.current;
                    const growthColor = g > 0 ? getColorByGrowth(g) : "#e63946";
                    const hasFlag =
                      r.dataFlags &&
                      r.dataFlags.some((f) =>
                        [
                          "data-anomaly-2025",
                          "net-decline",
                          "retention-crisis",
                          "conflict-affected",
                        ].includes(f)
                      );
                    return (
                      <tr
                        key={r.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSidebar(r)}
                      >
                        <td className="px-4 py-2.5 font-medium text-gray-800">
                          {r.name}
                          {hasFlag && (
                            <span className="ml-1 text-amber-500 text-[10px]">
                              ⚑
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-700 font-medium">
                          {abbrev(r.stats["2025"].members)}
                        </td>
                        <td
                          className="px-4 py-2.5 text-right font-semibold"
                          style={{ color: growthColor }}
                        >
                          {g >= 0 ? "+" : ""}
                          {g.toFixed(2)}%
                        </td>
                        <td className="px-4 py-2.5 hidden lg:table-cell">
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{
                              backgroundColor: PROFILE_BG[r.theologicalProfile],
                              color: PROFILE_TEXT[r.theologicalProfile],
                            }}
                          >
                            {PROFILE_LABEL[r.theologicalProfile]}
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

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-100 bg-white">
        <div className="max-w-screen-xl mx-auto space-y-1 text-[11px] text-gray-400">
          <p>
            <strong className="text-gray-500">Source:</strong> ASR2016 · ASR2021
            · ASR2026A — SDA Office of Archives, Statistics and Research,
            General Conference of Seventh-day Adventists.{" "}
            <a
              href="https://adventiststatistics.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 hover:text-blue-700"
            >
              adventiststatistics.org
            </a>
          </p>
          <p>
            <strong className="text-gray-500">*</strong> Theological profiles
            are editorial interpretations of statistical trends and leadership
            records — not official SDA classifications.
          </p>
          <p>
            <strong className="text-gray-500">NZ note:</strong> Figures cover
            North NZ Conf + South NZ Conf only. Cook Islands, French Polynesia,
            and New Caledonia are excluded — distinct churches with a different
            profile.
          </p>
        </div>
      </footer>

      {/* Tooltip */}
      {tooltip && (
        <Tooltip region={tooltip.region} x={tooltip.x} y={tooltip.y} />
      )}
    </div>
  );
}
