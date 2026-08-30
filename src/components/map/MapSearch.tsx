"use client";

import { useEffect, useRef, useState } from "react";
import { useMapStore } from "@/store/mapStore";
import { allElements } from "@/data/map";
import type { MapElement, FinalEvent } from "@/types/map";

function isMapElement(el: MapElement | FinalEvent): el is MapElement {
  return "layer" in el;
}

const LAYER_LABELS: Record<string, string> = {
  churches: "Churches",
  seals: "Seals",
  trumpets: "Trumpets",
  feasts: "Feasts",
  sanctuary: "Sanctuary",
  dates: "Dates",
  angels: "Angels",
  omega: "Omega",
};

export function MapSearch() {
  const { searchOpen, setSearchOpen, setActiveElement } = useMapStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K to open / Escape to close (with query reset in callbacks, not effect body)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setQuery("");
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setQuery("");
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setSearchOpen]);

  // Focus input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const q = query.toLowerCase().trim();
  const results =
    q.length < 1
      ? allElements.slice(0, 12)
      : allElements
          .filter(
            (el) =>
              el.label.toLowerCase().includes(q) ||
              el.description.toLowerCase().includes(q) ||
              el.period.toLowerCase().includes(q)
          )
          .slice(0, 16);

  // Group by layer
  const grouped = new Map<string, (MapElement | FinalEvent)[]>();
  for (const el of results) {
    const key = isMapElement(el)
      ? LAYER_LABELS[el.layer] ?? el.layer
      : "Final Events";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(el);
  }

  const handleSelect = (el: MapElement | FinalEvent) => {
    setActiveElement(el);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
        background: "rgba(0,0,0,0.7)",
      }}
      onClick={() => {
        setSearchOpen(false);
        setQuery("");
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          margin: "0 16px",
          background: "#0F1118",
          border: "1px solid #2C3350",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.8)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: "1px solid #1E2232",
            gap: 10,
          }}
        >
          <span style={{ color: "#4A5060", fontSize: 16 }}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search churches, seals, events…"
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: 17,
              color: "#E2DBD0",
            }}
            aria-label="Search the prophetic map"
          />
          <kbd
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "#4A5060",
              border: "1px solid #2A2F3E",
              borderRadius: 3,
              padding: "2px 6px",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 400, overflowY: "auto", padding: "8px 0" }}>
          {results.length === 0 ? (
            <p
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontStyle: "italic",
                color: "#4A5060",
                textAlign: "center",
                padding: "20px 16px",
                fontSize: 15,
              }}
            >
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            Array.from(grouped.entries()).map(([groupLabel, items]) => (
              <div key={groupLabel}>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#3A4060",
                    padding: "6px 16px 4px",
                  }}
                >
                  {groupLabel}
                </p>
                {items.map((el) => (
                  <button
                    key={el.id}
                    onClick={() => handleSelect(el)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 16px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#151923";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "none";
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'EB Garamond', Georgia, serif",
                        fontSize: 15,
                        color: "#E2DBD0",
                        marginBottom: 2,
                      }}
                    >
                      {el.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 9,
                        color: "#4A5060",
                      }}
                    >
                      {el.period}
                    </div>
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
