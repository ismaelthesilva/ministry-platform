"use client";

import { finalEvents } from "@/data/map/finalEvents";
import { FinalEventCard } from "../ui/FinalEventCard";
import {
  Y,
  X_FINAL_EVENTS_START,
  X_FINAL_EVENTS_END,
  X_MILLENNIUM_START,
  X_MILLENNIUM_END,
  X_NEW_EARTH_START,
  X_NEW_EARTH_END,
} from "../geometry";

// Layout constants for the final events cascade
const CARD_W = 90;
const CARD_GAP = 4;
const COLS = 9; // columns in the cascade grid
const CARD_H = 50;
const ROW_GAP = 4;

// Phase zone boundaries
const PHASE_ZONES: Record<
  string,
  { xStart: number; xEnd: number; color: string; label: string }
> = {
  "before-probation": {
    xStart: X_FINAL_EVENTS_START,
    xEnd: X_FINAL_EVENTS_START + 370,
    color: "#4A7FA5",
    label: "BEFORE PROBATION CLOSES",
  },
  "close-of-probation": {
    xStart: X_FINAL_EVENTS_START + 374,
    xEnd: X_FINAL_EVENTS_START + 464,
    color: "#A32D2D",
    label: "CLOSE OF PROBATION",
  },
  plagues: {
    xStart: X_FINAL_EVENTS_START + 468,
    xEnd: X_FINAL_EVENTS_START + 610,
    color: "#7A2020",
    label: "THE PLAGUES",
  },
  return: {
    xStart: X_FINAL_EVENTS_START + 614,
    xEnd: X_FINAL_EVENTS_END,
    color: "#C9A84C",
    label: "THE RETURN",
  },
  millennium: {
    xStart: X_MILLENNIUM_START,
    xEnd: X_MILLENNIUM_END,
    color: "#1E3A5F",
    label: "THE MILLENNIUM",
  },
  eternity: {
    xStart: X_NEW_EARTH_START,
    xEnd: X_NEW_EARTH_END,
    color: "#1A7A3A",
    label: "THE NEW EARTH",
  },
};

// Group events by phase and compute their card positions
function layoutEvents() {
  const phaseGroups = new Map<string, typeof finalEvents>();
  for (const ev of finalEvents) {
    if (!phaseGroups.has(ev.phase)) phaseGroups.set(ev.phase, []);
    phaseGroups.get(ev.phase)!.push(ev);
  }

  const cards: {
    event: (typeof finalEvents)[0];
    x: number;
    y: number;
    w: number;
    h: number;
  }[] = [];

  for (const [phase, events] of phaseGroups) {
    const zone = PHASE_ZONES[phase];
    if (!zone) continue;

    const zoneW = zone.xEnd - zone.xStart;
    const colW = Math.max(
      (zoneW - (events.length > 1 ? CARD_GAP : 0)) /
        Math.min(events.length, COLS),
      CARD_W
    );
    const climaxScale = 1.4;

    let col = 0;
    let row = 0;

    for (const event of events) {
      const isClimax = event.isClimax === true;
      const cardH = isClimax ? CARD_H * climaxScale : CARD_H;
      const cardW = isClimax ? colW * 1.1 : colW;

      const x = zone.xStart + col * (colW + CARD_GAP);
      const y = Y.finalTop + 28 + row * (CARD_H + ROW_GAP);

      cards.push({
        event,
        x,
        y: Math.min(y, Y.finalBot - cardH - 4),
        w: Math.max(cardW, 30),
        h: cardH,
      });

      col++;
      if (col >= COLS) {
        col = 0;
        row++;
      }
    }
  }

  return cards;
}

const CARD_LAYOUT = layoutEvents();

export function FinalEventsLayer() {
  return (
    <g role="group" aria-label="Final Events sequence">
      {/* Phase zone backgrounds */}
      {Object.entries(PHASE_ZONES).map(([phase, zone]) => (
        <g key={phase}>
          <rect
            x={zone.xStart}
            y={Y.finalTop}
            width={zone.xEnd - zone.xStart}
            height={Y.finalBot - Y.finalTop}
            fill={zone.color}
            opacity={0.04}
            rx={2}
          />
          <text
            x={zone.xStart + 6}
            y={Y.finalTop + 14}
            fill={zone.color}
            fontSize={8}
            fontFamily="'Space Mono', monospace"
            letterSpacing={1.5}
            opacity={0.7}
          >
            {zone.label}
          </text>
          {/* Phase top border */}
          <rect
            x={zone.xStart}
            y={Y.finalTop}
            width={zone.xEnd - zone.xStart}
            height={2}
            fill={zone.color}
            opacity={0.4}
          />
        </g>
      ))}

      {/* Event cards */}
      {CARD_LAYOUT.map(({ event, x, y, w, h }) => (
        <FinalEventCard
          key={event.id}
          event={event}
          x={x}
          y={y}
          width={w}
          height={h}
        />
      ))}
    </g>
  );
}
