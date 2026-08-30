"use client";
// Generic band block used by Seals, Trumpets, Feasts, Sanctuary layers

import type { MapElement } from "@/types/map";
import { useMapStore } from "@/store/mapStore";

interface Props {
  element: MapElement;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity?: number;
  showLabel?: boolean;
}

export function BandBlock({
  element,
  x,
  y,
  width,
  height,
  opacity = 1,
  showLabel = true,
}: Props) {
  const setActiveElement = useMapStore((s) => s.setActiveElement);

  const handleClick = () => setActiveElement(element);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") handleClick();
  };

  const w = Math.max(width, 2);

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${element.label}, ${element.period}`}
      onClick={handleClick}
      onKeyDown={handleKey}
      style={{ cursor: "pointer", opacity }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={height}
        fill={element.color}
        rx={1}
        className="transition-[filter] duration-150 hover:brightness-125"
      />
      {showLabel && w > 40 && (
        <text
          x={x + 5}
          y={y + height / 2 + 4}
          fill="rgba(255,255,255,0.85)"
          fontSize={9}
          fontFamily="'Space Mono', monospace"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {w > 80
            ? (element.shortLabel ?? element.label).slice(0, 14)
            : (element.shortLabel ?? element.label).slice(0, 4)}
        </text>
      )}
      <line
        x1={x + w}
        y1={y}
        x2={x + w}
        y2={y + height}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
      />
    </g>
  );
}
