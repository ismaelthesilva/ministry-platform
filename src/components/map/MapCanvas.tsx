"use client";

import { useRef, useEffect } from "react";
import { useMapStore } from "@/store/mapStore";
import { CANVAS_WIDTH, CANVAS_HEIGHT, Y, yearToX } from "./geometry";

// Layers
import { ChurchesLayer } from "./layers/ChurchesLayer";
import { SealsLayer } from "./layers/SealsLayer";
import { TrumpetsLayer } from "./layers/TrumpetsLayer";
import { FeastsLayer } from "./layers/FeastsLayer";
import { SanctuaryLayer } from "./layers/SanctuaryLayer";
import { DatesLayer } from "./layers/DatesLayer";
import { AngelsLayer } from "./layers/AngelsLayer";
import { OmegaLayer } from "./layers/OmegaLayer";
import { FinalEventsLayer } from "./layers/FinalEventsLayer";
import { ParallelLines } from "./ui/ParallelLines";

const LAYER_LABELS: { id: string; label: string; y: number }[] = [
  { id: "sanctuary", label: "SANCTUARY", y: Y.sanctuaryTop + 18 },
  { id: "dates", label: "KEY DATES", y: Y.datesTop + 20 },
  { id: "feasts", label: "FEASTS", y: Y.feastsTop + 22 },
  { id: "trumpets", label: "TRUMPETS", y: Y.trumpetsTop + 22 },
  { id: "seals", label: "SEALS", y: Y.sealsTop + 22 },
  { id: "churches", label: "CHURCHES", y: Y.churchTop + 22 },
  { id: "angels", label: "3 ANGELS", y: Y.angelsTop + 25 },
  { id: "omega", label: "OMEGA", y: Y.omegaTop + 25 },
  { id: "finalEvents", label: "FINAL EVENTS", y: Y.finalTop + 22 },
];

export function MapCanvas() {
  const { visibleLayers, showParallels, whereWeAreHighlighted, setScrollX } =
    useMapStore();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track horizontal scroll for progress bar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handle = () =>
      setScrollX(el.scrollLeft / (el.scrollWidth - el.clientWidth));
    el.addEventListener("scroll", handle, { passive: true });
    return () => el.removeEventListener("scroll", handle);
  }, [setScrollX]);

  // Scroll to Laodicea when whereWeAreHighlighted fires
  useEffect(() => {
    if (!whereWeAreHighlighted) return;
    const el = containerRef.current;
    if (!el) return;
    const targetX = yearToX(1844) - 200;
    el.scrollTo({ left: Math.max(0, targetX), behavior: "smooth" });
  }, [whereWeAreHighlighted]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-x-auto overflow-y-hidden relative"
      style={{ background: "#0a0e1a" }}
    >
      {/* Fixed layer labels — left column */}
      <div
        className="sticky left-0 z-10 pointer-events-none"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 78,
          height: CANVAS_HEIGHT,
          background: "linear-gradient(to right, #0a0e1a 70%, transparent)",
        }}
      >
        {LAYER_LABELS.map((ll) =>
          visibleLayers[ll.id as keyof typeof visibleLayers] ? (
            <div
              key={ll.id}
              style={{
                position: "absolute",
                top: ll.y - 10,
                left: 4,
                fontSize: 8,
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.1em",
                color: "rgba(138,130,120,0.7)",
                whiteSpace: "nowrap",
              }}
            >
              {ll.label}
            </div>
          ) : null
        )}
      </div>

      <svg
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ display: "block", minWidth: CANVAS_WIDTH }}
        role="img"
        aria-label="Prophetic timeline from 1 AD to eternity"
      >
        {/* Dark background */}
        <rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="#0a0e1a" />

        {/* Subtle band separators */}
        {[
          Y.sanctuaryBot,
          Y.datesBot,
          Y.feastsBot,
          Y.trumpetsBot,
          Y.sealsBot,
          Y.churchBot,
          Y.angelsBot,
          Y.omegaBot,
        ].map((yy, i) => (
          <line
            key={i}
            x1={0}
            y1={yy}
            x2={CANVAS_WIDTH}
            y2={yy}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />
        ))}

        {/* Main timeline spine */}
        <line
          x1={80}
          y1={Y.spineY}
          x2={CANVAS_WIDTH - 100}
          y2={Y.spineY}
          stroke="#2a3050"
          strokeWidth={1.5}
        />

        {/* Spine axis labels */}
        {[31, 100, 313, 538, 1517, 1798, 1844].map((yr) => (
          <g key={yr}>
            <line
              x1={yearToX(yr)}
              y1={Y.spineY - 4}
              x2={yearToX(yr)}
              y2={Y.spineY + 4}
              stroke="#2a3050"
              strokeWidth={1}
            />
            <text
              x={yearToX(yr)}
              y={Y.spineY + 14}
              fill="#3A4060"
              fontSize={8}
              textAnchor="middle"
              fontFamily="'Space Mono', monospace"
            >
              {yr} AD
            </text>
          </g>
        ))}

        {/* "ETERNITY" label */}
        <text
          x={2950}
          y={Y.spineY + 14}
          fill="#3A4060"
          fontSize={9}
          textAnchor="middle"
          fontFamily="'Cinzel', serif"
          letterSpacing={3}
        >
          ETERNITY
        </text>

        {/* Layer contents */}
        {visibleLayers.sanctuary && <SanctuaryLayer />}
        {visibleLayers.dates && <DatesLayer />}
        {visibleLayers.feasts && <FeastsLayer />}
        {visibleLayers.trumpets && <TrumpetsLayer />}
        {visibleLayers.seals && <SealsLayer />}
        {visibleLayers.churches && (
          <ChurchesLayer whereWeAreHighlighted={whereWeAreHighlighted} />
        )}
        {visibleLayers.angels && <AngelsLayer />}
        {visibleLayers.omega && <OmegaLayer />}
        {visibleLayers.finalEvents && <FinalEventsLayer />}

        {/* Parallel connecting lines */}
        {showParallels && <ParallelLines />}
      </svg>
    </div>
  );
}
