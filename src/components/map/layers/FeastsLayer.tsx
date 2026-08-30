"use client";

import { feasts } from "@/data/map/feasts";
import { BandBlock } from "../ui/BandBlock";
import { yearToX, Y, FEAST_YEARS, X_NEW_EARTH_START } from "../geometry";

const STATUS_OPACITY: Record<string, number> = {
  fulfilled: 1,
  ongoing: 0.85,
  future: 0.55,
};

export function FeastsLayer() {
  const bandH = Y.feastsBot - Y.feastsTop;

  return (
    <g role="group" aria-label="Seven Feasts layer">
      {feasts.map((feast) => {
        const range = FEAST_YEARS.find((r) => r.id === feast.id);
        if (!range) return null;

        let x: number;
        let w: number;

        if (range.future) {
          x = X_NEW_EARTH_START + 20;
          w = 80;
        } else {
          x = yearToX(range.start);
          w = Math.max(yearToX(range.end) - x, 6);
        }

        return (
          <BandBlock
            key={feast.id}
            element={feast}
            x={x}
            y={Y.feastsTop}
            width={w}
            height={bandH}
            opacity={STATUS_OPACITY[feast.status] ?? 1}
          />
        );
      })}
    </g>
  );
}
