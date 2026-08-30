"use client";

import type { Church } from "@/types/map";
import { useMapStore } from "@/store/mapStore";
import { yearToX, Y } from "../geometry";
import { CHURCH_AGES } from "../geometry";

interface Props {
  church: Church;
  whereWeAreHighlighted?: boolean;
}

export function ChurchBlock({ church, whereWeAreHighlighted }: Props) {
  const setActiveElement = useMapStore((s) => s.setActiveElement);
  const ageRange = CHURCH_AGES.find((a) => a.id === church.id);
  if (!ageRange) return null;

  const x = yearToX(ageRange.start);
  const w = yearToX(ageRange.end) - x;
  const y = Y.churchTop;
  const h = Y.churchBot - Y.churchTop;

  const isLaodicea = church.id === "laodicea";

  const handleClick = () => setActiveElement(church);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") handleClick();
  };

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${church.label} church age, ${church.period}`}
      onClick={handleClick}
      onKeyDown={handleKey}
      style={{ cursor: "pointer" }}
    >
      {/* Main block */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={church.color}
        rx={2}
        className="transition-[filter] duration-150 hover:brightness-125"
      />

      {/* Inset border top */}
      <rect x={x} y={y} width={w} height={2} fill="rgba(255,255,255,0.12)" />

      {/* Church name label — only if wide enough */}
      {w > 40 && (
        <text
          x={x + 8}
          y={y + 18}
          fill="rgba(255,255,255,0.92)"
          fontSize={11}
          fontFamily="'Cinzel', serif"
          fontWeight="600"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {w > 80
            ? church.label
            : church.shortLabel ?? church.label.slice(0, 4)}
        </text>
      )}

      {/* Period label */}
      {w > 60 && (
        <text
          x={x + 8}
          y={y + h - 8}
          fill="rgba(255,255,255,0.55)"
          fontSize={9}
          fontFamily="'Space Mono', monospace"
          style={{ userSelect: "none", pointerEvents: "none" }}
        >
          {church.period}
        </text>
      )}

      {/* "We Are Here" pulse for Laodicea */}
      {isLaodicea && (
        <>
          <circle
            cx={x + 24}
            cy={y + h / 2}
            r={8}
            fill={whereWeAreHighlighted ? "#C9A84C" : "rgba(201,168,76,0.4)"}
            className={whereWeAreHighlighted ? "animate-ping" : ""}
          />
          <circle cx={x + 24} cy={y + h / 2} r={4} fill="#C9A84C" />
          {w > 100 && (
            <text
              x={x + 36}
              y={y + h / 2 + 4}
              fill="#C9A84C"
              fontSize={9}
              fontFamily="'Space Mono', monospace"
              style={{ userSelect: "none", pointerEvents: "none" }}
            >
              WE ARE HERE
            </text>
          )}
        </>
      )}

      {/* Separator line on right edge */}
      <line
        x1={x + w}
        y1={y}
        x2={x + w}
        y2={y + h}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
      />
    </g>
  );
}
