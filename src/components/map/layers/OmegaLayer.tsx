"use client";

import { omegaComponents } from "@/data/map/omega";
import { useMapStore } from "@/store/mapStore";
import { yearToX, Y } from "../geometry";

export function OmegaLayer() {
  const setActiveElement = useMapStore((s) => s.setActiveElement);
  const bandH = Y.omegaBot - Y.omegaTop;
  const startX = yearToX(1844);
  const totalW = yearToX(2050) - startX;
  const segW = totalW / omegaComponents.length;

  // Create a single representative element for the whole Omega block
  const omegaElement = {
    id: "omega-apostasy",
    label: "The Omega Apostasy",
    period: "1844–Close",
    scripture: ["Selected Messages, Book 1, pp. 197–204"],
    description:
      "The final corruption from within the remnant movement — predicted before it arrived, arriving as predicted. Six components, following the Alpha Crisis of 1902–1907.",
    color: "#C06080",
    hoverColor: "#D07090",
    layer: "omega" as const,
  };

  return (
    <g role="group" aria-label="Omega Apostasy layer">
      {/* Background stripe */}
      <rect
        x={startX}
        y={Y.omegaTop}
        width={totalW}
        height={bandH}
        fill="rgba(192,96,128,0.06)"
        rx={2}
      />

      {/* Six component stripes */}
      {omegaComponents.map((component, i) => (
        <g
          key={component.id}
          role="button"
          tabIndex={0}
          aria-label={`Omega component ${component.number}: ${component.title}`}
          onClick={() => setActiveElement(omegaElement)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              setActiveElement(omegaElement);
          }}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={startX + i * segW + 1}
            y={Y.omegaTop + 4}
            width={Math.max(segW - 2, 2)}
            height={bandH - 8}
            fill="#C06080"
            opacity={0.3 + i * 0.08}
            rx={1}
            className="transition-[filter] duration-150 hover:brightness-125"
          />
        </g>
      ))}

      {/* Label */}
      <text
        x={startX + 8}
        y={Y.omegaTop + bandH / 2 + 4}
        fill="rgba(192,96,128,0.6)"
        fontSize={9}
        fontFamily="'Space Mono', monospace"
        style={{ userSelect: "none", pointerEvents: "none" }}
      >
        OMEGA APOSTASY
      </text>
    </g>
  );
}
