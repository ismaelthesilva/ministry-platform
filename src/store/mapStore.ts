import { create } from "zustand";
import type { MapStore, LayerID } from "@/types/map";

const ALL_LAYERS: LayerID[] = [
  "churches",
  "seals",
  "trumpets",
  "feasts",
  "sanctuary",
  "dates",
  "angels",
  "omega",
  "finalEvents",
];

export const useMapStore = create<MapStore>((set) => ({
  activeElement: null,
  setActiveElement: (el) => set({ activeElement: el }),

  visibleLayers: Object.fromEntries(
    ALL_LAYERS.map((id) => [id, true])
  ) as Record<LayerID, boolean>,
  toggleLayer: (id) =>
    set((state) => ({
      visibleLayers: {
        ...state.visibleLayers,
        [id]: !state.visibleLayers[id],
      },
    })),
  showAllLayers: () =>
    set({
      visibleLayers: Object.fromEntries(
        ALL_LAYERS.map((id) => [id, true])
      ) as Record<LayerID, boolean>,
    }),

  showParallels: false,
  toggleParallels: () =>
    set((state) => ({ showParallels: !state.showParallels })),

  searchQuery: "",
  setSearchQuery: (q) => set({ searchQuery: q }),
  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),

  whereWeAreHighlighted: false,
  triggerWhereWeAre: () => {
    set({ whereWeAreHighlighted: true });
    setTimeout(() => set({ whereWeAreHighlighted: false }), 3000);
  },

  zoomLevel: 1,
  setZoomLevel: (level) => set({ zoomLevel: level }),

  scrollX: 0,
  setScrollX: (x) => set({ scrollX: x }),
}));
