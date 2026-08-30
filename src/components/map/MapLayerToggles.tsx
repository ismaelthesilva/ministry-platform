"use client";

import { useMapStore } from "@/store/mapStore";
import type { LayerID } from "@/types/map";

const LAYER_CONFIG: { id: LayerID; label: string; color: string }[] = [
  { id: "churches", label: "Churches", color: "#6B4FA0" },
  { id: "seals", label: "Seals", color: "#8B3A3A" },
  { id: "trumpets", label: "Trumpets", color: "#D4822A" },
  { id: "feasts", label: "Feasts", color: "#6A9E78" },
  { id: "sanctuary", label: "Sanctuary", color: "#4A7BA8" },
  { id: "dates", label: "Dates", color: "#C9A84C" },
  { id: "angels", label: "Angels", color: "#5B9EC9" },
  { id: "omega", label: "Omega", color: "#C06080" },
  { id: "finalEvents", label: "Final Events", color: "#C9A84C" },
];

interface Props {
  className?: string;
}

export function MapLayerToggles({ className }: Props) {
  const {
    visibleLayers,
    toggleLayer,
    showAllLayers,
    showParallels,
    toggleParallels,
  } = useMapStore();

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        padding: "8px 12px",
        borderBottom: "1px solid #1E2232",
        background: "#0c0f1a",
      }}
    >
      {LAYER_CONFIG.map((layer) => {
        const active = visibleLayers[layer.id];
        return (
          <button
            key={layer.id}
            onClick={() => toggleLayer(layer.id)}
            aria-pressed={active}
            aria-label={`Toggle ${layer.label} layer`}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: 3,
              border: `1px solid ${active ? layer.color : "#2A2F3E"}`,
              background: active ? `${layer.color}18` : "transparent",
              color: active ? layer.color : "#4A5060",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {layer.label}
          </button>
        );
      })}

      {/* Divider */}
      <div style={{ width: 1, background: "#1E2232", margin: "0 4px" }} />

      {/* Parallels toggle */}
      <button
        onClick={toggleParallels}
        aria-pressed={showParallels}
        aria-label="Toggle parallel connecting lines"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: 3,
          border: `1px solid ${showParallels ? "#8B7040" : "#2A2F3E"}`,
          background: showParallels ? "#8B704018" : "transparent",
          color: showParallels ? "#C9A84C" : "#4A5060",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        Parallels
      </button>

      {/* Show all */}
      <button
        onClick={showAllLayers}
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: 3,
          border: "1px solid #2A2F3E",
          background: "transparent",
          color: "#4A5060",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        Show All
      </button>
    </div>
  );
}
