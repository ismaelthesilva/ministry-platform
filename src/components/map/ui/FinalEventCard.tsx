"use client";

import type { FinalEvent } from "@/types/map";
import { useMapStore } from "@/store/mapStore";

interface Props {
  event: FinalEvent;
  x: number;
  y: number;
  width: number;
  height: number;
}

const PHASE_COLORS: Record<FinalEvent["phase"], string> = {
  "before-probation": "#4A7FA5",
  "close-of-probation": "#A32D2D",
  plagues: "#7A2020",
  return: "#C9A84C",
  millennium: "#1E3A5F",
  eternity: "#1A7A3A",
};

export function FinalEventCard({ event, x, y, width, height }: Props) {
  const setActiveElement = useMapStore((s) => s.setActiveElement);
  const phaseColor = PHASE_COLORS[event.phase];
  const cardW = Math.max(width, 4);

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`Event ${event.sequenceNumber}: ${event.title}`}
      onClick={() => setActiveElement(event)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setActiveElement(event);
      }}
      style={{ cursor: "pointer" }}
    >
      {/* Card background */}
      <rect
        x={x}
        y={y}
        width={cardW}
        height={height}
        fill={event.isClimax ? event.color : "rgba(15,17,24,0.95)"}
        stroke={event.isClimax ? "#C9A84C" : event.color}
        strokeWidth={event.isClimax ? 1.5 : 0.5}
        rx={3}
        className="transition-[filter] duration-150 hover:brightness-125"
      />

      {/* Phase color stripe on left */}
      <rect x={x} y={y} width={3} height={height} fill={phaseColor} rx={2} />

      {/* Sequence number */}
      <text
        x={x + 9}
        y={y + 13}
        fill="rgba(255,255,255,0.35)"
        fontSize={8}
        fontFamily="'Space Mono', monospace"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        {event.sequenceNumber < 10
          ? `0${event.sequenceNumber}`
          : event.sequenceNumber}
      </text>

      {/* Event title */}
      {cardW > 30 && (
        <foreignObject
          x={x + 8}
          y={y + 17}
          width={cardW - 16}
          height={height - 20}
        >
          <div
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 10,
              lineHeight: 1.3,
              color: event.isClimax ? "#fff" : "rgba(226,219,208,0.9)",
              overflow: "hidden",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {event.title}
          </div>
        </foreignObject>
      )}

      {/* Glow for climax events */}
      {event.isClimax && (
        <rect
          x={x - 2}
          y={y - 2}
          width={cardW + 4}
          height={height + 4}
          fill="none"
          stroke="#C9A84C"
          strokeWidth={0.5}
          strokeOpacity={0.3}
          rx={4}
        />
      )}
    </g>
  );
}
