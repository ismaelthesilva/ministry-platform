"use client";

import { trumpets } from "@/data/map/trumpets";
import { BandBlock } from "../ui/BandBlock";
import { yearToX, Y, TRUMPET_YEARS, X_FINAL_EVENTS_START } from "../geometry";

export function TrumpetsLayer() {
  const bandH = Y.trumpetsBot - Y.trumpetsTop;

  return (
    <g role="group" aria-label="Seven Trumpets layer">
      {trumpets.map((trumpet) => {
        const range = TRUMPET_YEARS.find((r) => r.id === trumpet.id);
        if (!range) return null;

        let x: number;
        let w: number;

        if (range.symbolic) {
          x = X_FINAL_EVENTS_START + 120;
          w = 60;
        } else {
          x = yearToX(range.start);
          w = yearToX(range.end) - x;
        }

        return (
          <BandBlock
            key={trumpet.id}
            element={trumpet}
            x={x}
            y={Y.trumpetsTop}
            width={w}
            height={bandH}
          />
        );
      })}
    </g>
  );
}
