"use client";

import { useState } from "react";
import { yearToX } from "./geometry";
import { churches } from "@/data/map/churches";

const FINAL_EVENT_GROUPS = [
  { label: "Before Close of Probation", phase: "before-probation", count: 10 },
  { label: "Close of Probation", phase: "close-of-probation", count: 1 },
  { label: "The Plagues", phase: "plagues", count: 3 },
  { label: "The Return", phase: "return", count: 14 },
  { label: "The Millennium", phase: "millennium", count: 2 },
  { label: "The New Earth", phase: "eternity", count: 8 },
];

const LAYERS_SECTION = [
  { id: "seals", label: "Seven Seals" },
  { id: "trumpets", label: "Seven Trumpets" },
  { id: "feasts", label: "Seven Feasts" },
  { id: "sanctuary", label: "Heavenly Sanctuary" },
  { id: "omega", label: "Omega Apostasy" },
];

interface SidebarItemProps {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  indent?: boolean;
}

function SidebarItem({ children, onClick, color, indent }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        width: "100%",
        padding: indent ? "5px 16px 5px 24px" : "5px 16px",
        background: "none",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "#0F1422";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "none";
      }}
    >
      {color && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
      )}
      <span
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 14,
          color: "#9A9080",
          lineHeight: 1.3,
        }}
      >
        {children}
      </span>
    </button>
  );
}

function SidebarSection({ title }: { title: string }) {
  return (
    <p
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#3A4060",
        padding: "12px 16px 4px",
      }}
    >
      {title}
    </p>
  );
}

export function MapSidebar() {
  const [open, setOpen] = useState(true);

  const scrollCanvas = (targetX: number) => {
    const canvas = document.querySelector<HTMLDivElement>(".overflow-x-auto");
    if (canvas) {
      canvas.scrollTo({ left: Math.max(0, targetX - 200), behavior: "smooth" });
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
        style={{
          width: 28,
          flexShrink: 0,
          background: "#0c0f1a",
          borderRight: "1px solid #1E2232",
          border: "none",
          color: "#3A4060",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
        }}
      >
        ›
      </button>
    );
  }

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        background: "#0c0f1a",
        borderRight: "1px solid #1E2232",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
      className="hidden lg:flex"
    >
      {/* Collapse button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px 12px 0",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
          style={{
            background: "none",
            border: "none",
            color: "#3A4060",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          ‹
        </button>
      </div>

      {/* Part One — Parallel Timeline */}
      <SidebarSection title="Part One — Parallel Timeline" />
      {churches.map((church) => (
        <SidebarItem
          key={church.id}
          color={church.color}
          onClick={() => {
            scrollCanvas(
              yearToX(
                church.id === "ephesus"
                  ? 1
                  : church.id === "smyrna"
                  ? 100
                  : church.id === "pergamos"
                  ? 313
                  : church.id === "thyatira"
                  ? 538
                  : church.id === "sardis"
                  ? 1517
                  : church.id === "philadelphia"
                  ? 1798
                  : 1844
              )
            );
          }}
        >
          {church.label}
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "#4A5060",
              marginLeft: "auto",
            }}
          >
            {church.period.split("–")[0]}
          </span>
        </SidebarItem>
      ))}

      {/* Part Two — Layers */}
      <SidebarSection title="Part Two — Layers" />
      {LAYERS_SECTION.map((layer) => (
        <SidebarItem key={layer.id} onClick={() => scrollCanvas(80)} indent>
          {layer.label}
        </SidebarItem>
      ))}

      {/* Part Three — Final Events */}
      <SidebarSection title="Part Three — Final Events" />
      {FINAL_EVENT_GROUPS.map((group) => (
        <SidebarItem
          key={group.phase}
          onClick={() => scrollCanvas(1500)}
          indent
        >
          {group.label}
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "#4A5060",
              marginLeft: "auto",
            }}
          >
            {group.count}
          </span>
        </SidebarItem>
      ))}
    </aside>
  );
}
