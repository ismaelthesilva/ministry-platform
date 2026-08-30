"use client";

import { sanctuary } from "@/data/map/sanctuary";
import { BandBlock } from "../ui/BandBlock";
import { yearToX, Y, SANCTUARY_YEARS } from "../geometry";

export function SanctuaryLayer() {
  const bandH = Y.sanctuaryBot - Y.sanctuaryTop;

  return (
    <g role="group" aria-label="Heavenly Sanctuary layer">
      {sanctuary.map((phase) => {
        const range = SANCTUARY_YEARS.find((r) => r.id === phase.id);
        if (!range) return null;
        const x = yearToX(range.start);
        const w = yearToX(range.end) - x;

        return (
          <BandBlock
            key={phase.id}
            element={phase}
            x={x}
            y={Y.sanctuaryTop}
            width={w}
            height={bandH}
          />
        );
      })}
    </g>
  );
}
