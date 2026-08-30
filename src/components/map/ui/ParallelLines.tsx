"use client";

import { churches } from "@/data/map/churches";
import { seals } from "@/data/map/seals";
import { trumpets } from "@/data/map/trumpets";
import {
  yearToX,
  Y,
  CHURCH_AGES,
  SEAL_YEARS,
  TRUMPET_YEARS,
} from "../geometry";

export function ParallelLines() {
  const lines: React.ReactElement[] = [];

  churches.forEach((church) => {
    const ageRange = CHURCH_AGES.find((a) => a.id === church.id);
    if (!ageRange) return;
    const churchCenterX =
      yearToX(ageRange.start) +
      (yearToX(ageRange.end) - yearToX(ageRange.start)) / 2;
    const churchY = Y.churchBot;

    // Church → Seal
    const sealRange = SEAL_YEARS.find((s) => s.id === church.seal);
    if (sealRange && !sealRange.symbolic) {
      const sealCenterX =
        yearToX(sealRange.start) +
        (yearToX(sealRange.end) - yearToX(sealRange.start)) / 2;
      lines.push(
        <line
          key={`${church.id}-seal`}
          x1={churchCenterX}
          y1={churchY}
          x2={sealCenterX}
          y2={Y.sealsBot}
          stroke="#C9A84C"
          strokeWidth={0.5}
          strokeDasharray="4,4"
          strokeOpacity={0.4}
        />
      );
    }

    // Church → Trumpet
    const trumpetRange = TRUMPET_YEARS.find((t) => t.id === church.trumpet);
    if (trumpetRange && !trumpetRange.symbolic) {
      const trumpetCenterX =
        yearToX(trumpetRange.start) +
        (yearToX(trumpetRange.end) - yearToX(trumpetRange.start)) / 2;
      lines.push(
        <line
          key={`${church.id}-trumpet`}
          x1={churchCenterX}
          y1={Y.churchTop}
          x2={trumpetCenterX}
          y2={Y.trumpetsBot}
          stroke="#D4822A"
          strokeWidth={0.5}
          strokeDasharray="4,4"
          strokeOpacity={0.4}
        />
      );
    }
  });

  return <g aria-hidden="true">{lines}</g>;
}

// Suppress unused import warning — these are used for type checking
const _seals = seals;
const _trumpets = trumpets;
void _seals;
void _trumpets;
