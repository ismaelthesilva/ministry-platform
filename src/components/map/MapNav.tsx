"use client";

import { useMapStore } from "@/store/mapStore";
import { Search } from "lucide-react";

export function MapNav() {
  const { triggerWhereWeAre, setSearchOpen } = useMapStore();

  return (
    <nav
      style={{
        height: 56,
        background: "#0a0e1a",
        borderBottom: "1px solid #1E2232",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: 16,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Book title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            fontWeight: 600,
            color: "#C9A84C",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "0.06em",
          }}
        >
          The Return of the King of Kings
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            color: "#3A4060",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Prophetic Map · Ismael Silva
        </p>
      </div>

      {/* Where Are We Now */}
      <button
        onClick={triggerWhereWeAre}
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "6px 14px",
          borderRadius: 3,
          border: "1px solid #C9A84C60",
          background: "rgba(201,168,76,0.08)",
          color: "#C9A84C",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(201,168,76,0.16)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(201,168,76,0.08)";
        }}
      >
        ◉ We Are Here
      </button>

      {/* Search */}
      <button
        onClick={() => setSearchOpen(true)}
        aria-label="Search (Ctrl+K)"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "6px 12px",
          borderRadius: 3,
          border: "1px solid #2A2F3E",
          background: "transparent",
          color: "#4A5060",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#8A9080";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#3A4050";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#4A5060";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#2A2F3E";
        }}
      >
        <Search size={12} />
        <span className="hidden sm:inline">Search</span>
        <kbd
          style={{
            fontSize: 8,
            color: "#3A4060",
            border: "1px solid #2A2F3E",
            borderRadius: 2,
            padding: "1px 4px",
          }}
          className="hidden sm:inline"
        >
          ⌘K
        </kbd>
      </button>
    </nav>
  );
}
