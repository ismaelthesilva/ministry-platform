"use client";

import { angels } from "@/data/map/angels";
import { useMapStore } from "@/store/mapStore";
import { yearToX, Y } from "../geometry";

export function AngelsLayer() {
  const setActiveElement = useMapStore((s) => s.setActiveElement);
  const bandH = Y.angelsBot - Y.angelsTop;

  // Angels span the Laodicea region and beyond
  const startX = yearToX(1844);
  const totalW = yearToX(2050) - startX;
  const segW = totalW / 3;

  return (
    <g role="group" aria-label="Three Angels' Messages layer">
      {/* Banner background */}
      <rect
        x={startX}
        y={Y.angelsTop}
        width={totalW + segW} // extend for loud cry
        height={bandH}
        fill="rgba(201,168,76,0.04)"
        rx={2}
      />

      {angels.map((angel) => {
        const angelX =
          angel.angelNumber === 4
            ? startX + totalW + 4
            : startX + (angel.angelNumber - 1) * segW;
        const angelW = angel.angelNumber === 4 ? segW - 8 : segW - 4;

        return (
          <g
            key={angel.id}
            role="button"
            tabIndex={0}
            aria-label={`${angel.label}: ${angel.message}`}
            onClick={() => setActiveElement(angel)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActiveElement(angel);
            }}
            style={{ cursor: "pointer" }}
          >
            <rect
              x={angelX}
              y={Y.angelsTop + 2}
              width={Math.max(angelW, 4)}
              height={bandH - 4}
              fill={angel.color}
              rx={2}
              opacity={angel.angelNumber === 4 ? 0.6 : 0.8}
              className="transition-[filter] duration-150 hover:brightness-125"
            />
            {angelW > 30 && (
              <text
                x={angelX + 5}
                y={Y.angelsTop + bandH / 2 + 4}
                fill="rgba(255,255,255,0.75)"
                fontSize={9}
                fontFamily="'Space Mono', monospace"
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                {angel.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
