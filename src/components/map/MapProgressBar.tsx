"use client";

import { useMapStore } from "@/store/mapStore";

const MILESTONES = [
  { label: "1 AD", pct: 0.025 },
  { label: "538", pct: 0.148 },
  { label: "1517", pct: 0.282 },
  { label: "1844", pct: 0.397 },
  { label: "Return", pct: 0.59 },
  { label: "Eternity", pct: 0.85 },
];

export function MapProgressBar() {
  const scrollX = useMapStore((s) => s.scrollX);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 32,
        background: "#080a12",
        borderTop: "1px solid #1E2232",
        display: "flex",
        alignItems: "center",
        paddingLeft: 80,
        paddingRight: 16,
        zIndex: 5,
      }}
    >
      {/* Track */}
      <div
        style={{
          flex: 1,
          height: 2,
          background: "#1E2232",
          borderRadius: 2,
          position: "relative",
        }}
      >
        {/* Progress fill */}
        <div
          style={{
            height: "100%",
            width: `${scrollX * 100}%`,
            background: "#C9A84C",
            borderRadius: 2,
            transition: "width 0.1s linear",
          }}
        />

        {/* Milestone labels */}
        {MILESTONES.map((m) => (
          <div
            key={m.label}
            style={{
              position: "absolute",
              left: `${m.pct * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                width: 1,
                height: 8,
                background: "#2C3350",
                margin: "0 auto",
                marginBottom: 4,
              }}
            />
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 8,
                color: "#3A4060",
                whiteSpace: "nowrap",
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                letterSpacing: "0.06em",
              }}
            >
              {m.label}
            </p>
          </div>
        ))}

        {/* "We Are Here" gold marker at Laodicea */}
        <div
          style={{
            position: "absolute",
            left: "39.7%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#C9A84C",
              boxShadow: "0 0 6px rgba(201,168,76,0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
