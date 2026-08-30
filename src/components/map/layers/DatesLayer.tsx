"use client";

import { propheticDates } from "@/data/map/dates";
import { DateMarker } from "../ui/DateMarker";

export function DatesLayer() {
  return (
    <g role="group" aria-label="Key Prophetic Dates layer">
      {propheticDates.map((date) => (
        <DateMarker key={date.id} date={date} />
      ))}
    </g>
  );
}
