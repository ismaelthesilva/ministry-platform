"use client";

import { useMapStore } from "@/store/mapStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { MapElement, FinalEvent } from "@/types/map";

function isMapElement(el: MapElement | FinalEvent): el is MapElement {
  return "layer" in el;
}

function isFinalEvent(el: MapElement | FinalEvent): el is FinalEvent {
  return "sequenceNumber" in el;
}

const LAYER_LABELS: Record<string, string> = {
  churches: "Seven Churches",
  seals: "Seven Seals",
  trumpets: "Seven Trumpets",
  feasts: "Seven Feasts",
  sanctuary: "Heavenly Sanctuary",
  dates: "Key Dates",
  angels: "Three Angels",
  omega: "Omega Apostasy",
  finalEvents: "Final Events",
};

const PHASE_LABELS: Record<string, string> = {
  "before-probation": "Before Probation Closes",
  "close-of-probation": "Close of Probation",
  plagues: "The Seven Last Plagues",
  return: "The Return of the King",
  millennium: "The Millennium",
  eternity: "The New Earth",
};

export function MapDetailPanel() {
  const { activeElement, setActiveElement } = useMapStore();
  const open = activeElement !== null;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && setActiveElement(null)}>
      <SheetContent
        side="right"
        className="w-full sm:w-[440px] overflow-y-auto"
        style={{ background: "#0c0f1a", borderLeft: "1px solid #1e2232" }}
      >
        {activeElement && (
          <>
            <SheetHeader className="pb-0">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {isMapElement(activeElement) && (
                  <Badge
                    style={{
                      background: `${activeElement.color}20`,
                      color: activeElement.color,
                      border: `1px solid ${activeElement.color}40`,
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {LAYER_LABELS[activeElement.layer] ?? activeElement.layer}
                  </Badge>
                )}
                {isFinalEvent(activeElement) && (
                  <>
                    <Badge
                      style={{
                        background: `${activeElement.color}20`,
                        color: activeElement.color,
                        border: `1px solid ${activeElement.color}40`,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Final Events
                    </Badge>
                    <Badge
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {PHASE_LABELS[activeElement.phase] ?? activeElement.phase}
                    </Badge>
                  </>
                )}
                {isMapElement(activeElement) && activeElement.chapter && (
                  <Badge
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.4)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                    }}
                  >
                    Chapter {activeElement.chapter}
                  </Badge>
                )}
              </div>

              <SheetTitle
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#E2DBD0",
                  lineHeight: 1.2,
                }}
              >
                {activeElement.label}
              </SheetTitle>

              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  color: "#6A6058",
                  letterSpacing: "0.06em",
                  marginTop: 6,
                }}
              >
                {isMapElement(activeElement)
                  ? activeElement.period
                  : isFinalEvent(activeElement)
                  ? `Event ${activeElement.sequenceNumber}`
                  : ""}
              </p>
            </SheetHeader>

            <Separator className="my-4" style={{ background: "#1E2232" }} />

            {/* Scripture references */}
            {((isMapElement(activeElement) &&
              activeElement.scripture.length > 0) ||
              (isFinalEvent(activeElement) &&
                activeElement.scripture.length > 0)) && (
              <div className="mb-4">
                <p
                  style={{
                    fontFamily: "'EB Garamond', Georgia, serif",
                    fontStyle: "italic",
                    color: "#C9A84C",
                    fontSize: 15,
                    lineHeight: 1.5,
                  }}
                >
                  {activeElement.scripture.join(" · ")}
                </p>
              </div>
            )}

            {/* Description */}
            <div className="mb-5">
              <p
                style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: 17,
                  color: "#D0C8BC",
                  lineHeight: 1.7,
                }}
              >
                {activeElement.description}
              </p>
            </div>

            {/* EGW Quote */}
            {activeElement.egwQuote && (
              <>
                <Separator className="my-4" style={{ background: "#1E2232" }} />
                <div
                  className="pl-4"
                  style={{ borderLeft: "2px solid #C9A84C" }}
                >
                  <p
                    style={{
                      fontFamily: "'EB Garamond', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: 16,
                      color: "#B0A898",
                      lineHeight: 1.7,
                      marginBottom: 8,
                    }}
                  >
                    &ldquo;{activeElement.egwQuote}&rdquo;
                  </p>
                  {activeElement.egwSource && (
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 10,
                        color: "#5A5448",
                        letterSpacing: "0.06em",
                      }}
                    >
                      — {activeElement.egwSource}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Church-specific extra fields */}
            {isMapElement(activeElement) && "churchTheme" in activeElement && (
              <>
                <Separator className="my-4" style={{ background: "#1E2232" }} />
                <div>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#5A5448",
                      marginBottom: 6,
                    }}
                  >
                    Defining Theme
                  </p>
                  <p
                    style={{
                      fontFamily: "'EB Garamond', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: 16,
                      color: "#C9A84C",
                    }}
                  >
                    {(activeElement as { churchTheme: string }).churchTheme}
                  </p>
                </div>
              </>
            )}

            {/* Book reference */}
            {isMapElement(activeElement) && activeElement.chapter && (
              <>
                <Separator className="my-4" style={{ background: "#1E2232" }} />
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    color: "#5A5448",
                    letterSpacing: "0.04em",
                  }}
                >
                  Read more in{" "}
                  <span style={{ color: "#8B7040" }}>
                    Chapter {activeElement.chapter}
                  </span>{" "}
                  of{" "}
                  <em style={{ color: "#8B7040" }}>
                    The Return of the King of Kings
                  </em>
                </p>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
