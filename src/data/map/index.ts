import type { MapElement, FinalEvent } from "@/types/map";

export { churches } from "./churches";
export { seals } from "./seals";
export { trumpets } from "./trumpets";
export { feasts } from "./feasts";
export { sanctuary } from "./sanctuary";
export { propheticDates } from "./dates";
export { angels } from "./angels";
export { omegaComponents } from "./omega";
export { finalEvents } from "./finalEvents";

// Build a flat, searchable array of all map elements (excluding dates and omega)
import { churches } from "./churches";
import { seals } from "./seals";
import { trumpets } from "./trumpets";
import { feasts } from "./feasts";
import { sanctuary } from "./sanctuary";
import { angels } from "./angels";
import { finalEvents } from "./finalEvents";

export const allElements: (MapElement | FinalEvent)[] = [
  ...churches,
  ...seals,
  ...trumpets,
  ...feasts,
  ...sanctuary,
  ...angels,
  ...finalEvents,
];
