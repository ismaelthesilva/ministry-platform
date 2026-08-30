"use client";

import { seals } from "@/data/map/seals";
import { BandBlock } from "../ui/BandBlock";
import { yearToX, Y, SEAL_YEARS } from "../geometry";
import { X_FINAL_EVENTS_START } from "../geometry";

export function SealsLayer() {
  const bandH = Y.sealsBot - Y.sealsTop;

  return (
    <g role="group" aria-label="Seven Seals layer">
      {seals.map((seal) => {
        const range = SEAL_YEARS.find((r) => r.id === seal.id);
        if (!range) return null;

        let x: number;
        let w: number;

        if (range.symbolic) {
          // Position symbolic seals (6b, 6c, 7) in the final events zone
          const symbolicIndex = ["seal-6b", "seal-6c", "seal-7"].indexOf(
            seal.id
          );
          x = X_FINAL_EVENTS_START + symbolicIndex * 40;
          w = 36;
        } else {
          x = yearToX(range.start);
          w = yearToX(range.end) - x;
        }

        return (
          <BandBlock
            key={seal.id}
            element={seal}
            x={x}
            y={Y.sealsTop}
            width={w}
            height={bandH}
          />
        );
      })}
    </g>
  );
}
