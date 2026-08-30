// geometry.ts — non-linear time scale for the prophetic map
// This is the single most important technical decision in the project.
// A linear scale is unusable: 99 years (Ephesus) vs 979 years (Thyatira)
// vs 5 final-events years would collapse the short ages and bloat the Dark Age.
//
// Breakpoints match the spec exactly:
// Segment 1:  1–100 AD   → x: 80–200
// Segment 2:  100–313    → x: 200–340
// Segment 3:  313–538    → x: 340–480
// Segment 4:  538–1517   → x: 480–900
// Segment 5:  1517–1798  → x: 900–1100
// Segment 6:  1798–1844  → x: 1100–1260
// Segment 7:  1844–2050  → x: 1260–1500  (Laodicea / close of probation)
// Segment 8:  Final evts → x: 1500–2400
// Segment 9:  Millennium → x: 2400–2700
// Segment 10: New Earth  → x: 2700–3100

type Breakpoint = { year: number; x: number };

const BREAKPOINTS: Breakpoint[] = [
  { year: 1, x: 80 },
  { year: 100, x: 200 },
  { year: 313, x: 340 },
  { year: 538, x: 480 },
  { year: 1517, x: 900 },
  { year: 1798, x: 1100 },
  { year: 1844, x: 1260 },
  { year: 2050, x: 1500 }, // symbolic "close of probation" region end
  { year: 2200, x: 2400 }, // end of final events zone
  { year: 2201, x: 2400 }, // Millennium start
  { year: 3201, x: 2700 }, // Millennium end
  { year: 3202, x: 2700 }, // New Earth start
  { year: 4202, x: 3100 }, // New Earth end
];

/** Convert a calendar year to an SVG X coordinate */
export function yearToX(year: number): number {
  // Find the two breakpoints that bracket this year
  for (let i = 0; i < BREAKPOINTS.length - 1; i++) {
    const lo = BREAKPOINTS[i];
    const hi = BREAKPOINTS[i + 1];
    if (year >= lo.year && year <= hi.year) {
      if (lo.year === hi.year) return lo.x;
      const t = (year - lo.year) / (hi.year - lo.year);
      return lo.x + t * (hi.x - lo.x);
    }
  }
  // Before the timeline starts
  if (year < BREAKPOINTS[0].year) return BREAKPOINTS[0].x;
  // After the last breakpoint
  return BREAKPOINTS[BREAKPOINTS.length - 1].x;
}

// Special symbolic X positions for items that don't map to years
export const X_FINAL_EVENTS_START = 1500;
export const X_FINAL_EVENTS_END = 2400;
export const X_MILLENNIUM_START = 2400;
export const X_MILLENNIUM_END = 2700;
export const X_NEW_EARTH_START = 2700;
export const X_NEW_EARTH_END = 3100;

// Canvas dimensions
export const CANVAS_WIDTH = 3200;
export const CANVAS_HEIGHT = 700;

// Y bands (px from top)
export const Y = {
  padTop: 0,
  sanctuaryTop: 20,
  sanctuaryBot: 50,
  datesTop: 50,
  datesBot: 90,
  feastsTop: 90,
  feastsBot: 130,
  trumpetsTop: 130,
  trumpetsBot: 170,
  sealsTop: 170,
  sealsBot: 210,
  churchTop: 210,
  churchBot: 290,
  spineY: 300,
  spineTop: 290,
  spineBot: 310,
  angelsTop: 310,
  angelsBot: 360,
  omegaTop: 360,
  omegaBot: 420,
  finalTop: 420,
  finalBot: 700,
} as const;

// Compute the width in pixels for a year range given the non-linear scale
export function yearRangeWidth(startYear: number, endYear: number): number {
  return yearToX(endYear) - yearToX(startYear);
}

// Church age year ranges (for positioning)
export const CHURCH_AGES: { id: string; start: number; end: number }[] = [
  { id: "ephesus", start: 1, end: 100 },
  { id: "smyrna", start: 100, end: 313 },
  { id: "pergamos", start: 313, end: 538 },
  { id: "thyatira", start: 538, end: 1517 },
  { id: "sardis", start: 1517, end: 1798 },
  { id: "philadelphia", start: 1798, end: 1844 },
  { id: "laodicea", start: 1844, end: 2050 },
];

// Seal year ranges (some overlap with church ages)
export const SEAL_YEARS: {
  id: string;
  start: number;
  end: number;
  symbolic?: boolean;
}[] = [
  { id: "seal-1", start: 1, end: 100 },
  { id: "seal-2", start: 100, end: 313 },
  { id: "seal-3", start: 313, end: 538 },
  { id: "seal-4", start: 538, end: 1517 },
  { id: "seal-5", start: 1517, end: 1798 },
  { id: "seal-6a", start: 1755, end: 1844 },
  { id: "seal-6b", start: 2050, end: 2100, symbolic: true },
  { id: "seal-6c", start: 2100, end: 2150, symbolic: true },
  { id: "seal-7", start: 2150, end: 2200, symbolic: true },
];

// Trumpet year ranges
export const TRUMPET_YEARS: {
  id: string;
  start: number;
  end: number;
  symbolic?: boolean;
}[] = [
  { id: "trumpet-1", start: 1, end: 100 },
  { id: "trumpet-2", start: 100, end: 476 },
  { id: "trumpet-3", start: 476, end: 538 },
  { id: "trumpet-4", start: 538, end: 1517 },
  { id: "trumpet-5", start: 1299, end: 1449 },
  { id: "trumpet-6", start: 1449, end: 1840 },
  { id: "trumpet-7", start: 2050, end: 2200, symbolic: true },
];

// Feast year ranges
export const FEAST_YEARS: {
  id: string;
  start: number;
  end: number;
  future?: boolean;
}[] = [
  { id: "passover", start: 31, end: 34 },
  { id: "unleavened-bread", start: 31, end: 34 },
  { id: "firstfruits", start: 31, end: 34 },
  { id: "pentecost", start: 31, end: 34 },
  { id: "trumpets-feast", start: 1798, end: 2050 },
  { id: "atonement", start: 1844, end: 2050 },
  { id: "tabernacles", start: 3202, end: 4202, future: true },
];

// Sanctuary phase year ranges
export const SANCTUARY_YEARS: { id: string; start: number; end: number }[] = [
  { id: "sanctuary-1", start: 1, end: 31 },
  { id: "sanctuary-2", start: 31, end: 1844 },
  { id: "sanctuary-3", start: 1844, end: 2050 },
];
