// types/map.ts

export type LayerID =
  | "churches"
  | "seals"
  | "trumpets"
  | "feasts"
  | "sanctuary"
  | "dates"
  | "angels"
  | "omega"
  | "finalEvents";

export type FeastStatus = "fulfilled" | "ongoing" | "future";

export type SanctuaryPhase = 1 | 2 | 3;

export interface MapElement {
  id: string;
  label: string;
  shortLabel?: string;
  period: string;
  chapter?: number;
  scripture: string[];
  description: string;
  egwQuote?: string;
  egwSource?: string;
  color: string;
  hoverColor: string;
  layer: LayerID;
}

export interface Church extends MapElement {
  seal: string;
  trumpet: string;
  feast?: string;
  churchTheme: string;
}

export interface Seal extends MapElement {
  horse?: string;
  churchId: string;
}

export interface Trumpet extends MapElement {
  woe?: 1 | 2 | 3;
  churchId: string;
}

export interface Feast extends MapElement {
  status: FeastStatus;
  leviticus: string;
  fulfillment: string;
}

export interface SanctuaryPhaseData extends MapElement {
  phase: SanctuaryPhase;
  place: string;
  ministry: string;
}

export interface PropheticDate {
  id: string;
  year: number;
  label: string;
  event: string;
  description: string;
  scripture: string[];
  significance: "major" | "minor";
}

export interface Angel extends MapElement {
  angelNumber: 1 | 2 | 3 | 4;
  message: string;
  revelation: string;
}

export interface OmegaComponent {
  id: string;
  number: number;
  title: string;
  description: string;
  egwSource: string;
}

export interface FinalEvent {
  id: string;
  label: string; // alias for title — satisfies shared search/display code
  period: string; // e.g. "Event 11" — satisfies shared display code
  sequenceNumber: number;
  title: string;
  phase:
    | "before-probation"
    | "close-of-probation"
    | "plagues"
    | "return"
    | "millennium"
    | "eternity";
  scripture: string[];
  description: string;
  egwQuote?: string;
  egwSource?: string;
  color: string;
  isClimax?: boolean;
}

export interface TimelineGeometry {
  totalWidth: number;
  spineY: number;
  startYear: number;
  endYear: number;
  yearToX: (year: number) => number;
}

export interface MapStore {
  activeElement: MapElement | FinalEvent | null;
  setActiveElement: (el: MapElement | FinalEvent | null) => void;

  visibleLayers: Record<LayerID, boolean>;
  toggleLayer: (id: LayerID) => void;
  showAllLayers: () => void;

  showParallels: boolean;
  toggleParallels: () => void;

  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  whereWeAreHighlighted: boolean;
  triggerWhereWeAre: () => void;

  zoomLevel: number;
  setZoomLevel: (level: number) => void;

  scrollX: number;
  setScrollX: (x: number) => void;
}
