"use client";

import type { PropheticDate } from "@/types/map";
import { useMapStore } from "@/store/mapStore";
import { yearToX, Y } from "../geometry";

interface Props {
  date: PropheticDate;
}

export function DateMarker({ date }: Props) {
  const setActiveElement = useMapStore((s) => s.setActiveElement);
  const x = yearToX(date.year);
  const isMajor = date.significance === "major";
  const tickHeight = isMajor
    ? Y.datesBot - Y.datesTop - 4
    : (Y.datesBot - Y.datesTop) / 2;

  // Create a pseudo MapElement for the store
  const asElement = {
    id: date.id,
    label: date.event,
    period: date.label,
    scripture: date.scripture,
    description: date.description,
    color: isMajor ? "#C9A84C" : "#8B7040",
    hoverColor: "#E8C97A",
    layer: "dates" as const,
  };

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${date.label}: ${date.event}`}
      onClick={() => setActiveElement(asElement)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setActiveElement(asElement);
      }}
      style={{ cursor: "pointer" }}
    >
      {/* Vertical tick line */}
      <line
        x1={x}
        y1={Y.datesTop + (isMajor ? 2 : 8)}
        x2={x}
        y2={Y.datesTop + tickHeight}
        stroke={isMajor ? "#C9A84C" : "#8B7040"}
        strokeWidth={isMajor ? 1.5 : 1}
        strokeDasharray={isMajor ? undefined : "3,3"}
      />
      {/* Dot at top */}
      <circle
        cx={x}
        cy={Y.datesTop + (isMajor ? 2 : 8)}
        r={isMajor ? 3 : 2}
        fill={isMajor ? "#C9A84C" : "#8B7040"}
      />
      {/* Year label */}
      <text
        x={x}
        y={Y.datesBot - 1}
        fill={isMajor ? "#C9A84C" : "#6B5A30"}
        fontSize={isMajor ? 8 : 7}
        fontFamily="'Space Mono', monospace"
        textAnchor="middle"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {date.year}
      </text>
    </g>
  );
}
