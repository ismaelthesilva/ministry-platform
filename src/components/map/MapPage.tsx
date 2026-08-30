"use client";

import { MapNav } from "./MapNav";
import { MapSidebar } from "./MapSidebar";
import { MapCanvas } from "./MapCanvas";
import { MapLayerToggles } from "./MapLayerToggles";
import { MapDetailPanel } from "./MapDetailPanel";
import { MapSearch } from "./MapSearch";
import { MapProgressBar } from "./MapProgressBar";

export function MapPage() {
  return (
    <div
      className="dark h-screen overflow-hidden flex flex-col"
      style={{ background: "#0a0e1a", color: "#E2DBD0" }}
    >
      {/* Top navigation bar */}
      <MapNav />

      {/* Layer toggle strip */}
      <MapLayerToggles />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left sidebar */}
        <MapSidebar />

        {/* Canvas + progress bar */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <MapCanvas />
          <MapProgressBar />
        </div>
      </div>

      {/* Detail panel — Sheet, outside the flex layout */}
      <MapDetailPanel />

      {/* Search command palette — portal overlay */}
      <MapSearch />
    </div>
  );
}
