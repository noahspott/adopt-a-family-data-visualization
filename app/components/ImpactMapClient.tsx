"use client";

import { useMemo, useState, useEffect } from "react";
import { Map, Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import type { ImpactPoint } from "@/app/data/impact";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const REVEAL_DELAY_MS = 400;
const GROW_DURATION_MS = 400;

function familiesToRadiusPx(families: number): number {
  return Math.sqrt(families) * 6;
}

function normalizeAid(aid: number, minAid: number, maxAid: number): number {
  const range = maxAid - minAid || 1;
  return (aid - minAid) / range;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

type ImpactMapClientProps = {
  impactPoints: ImpactPoint[];
  initialViewState: { longitude: number; latitude: number; zoom: number };
  minAid: number;
  maxAid: number;
  hoveredPoint: ImpactPoint | null;
  onHover: (point: ImpactPoint | null) => void;
};

export function ImpactMapClient({
  impactPoints,
  initialViewState,
  minAid,
  maxAid,
  hoveredPoint,
  onHover,
}: ImpactMapClientProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  // Sequential reveal: show one bubble every REVEAL_DELAY_MS
  useEffect(() => {
    if (impactPoints.length === 0) return;
    if (revealedCount >= impactPoints.length) return;
    const t = setTimeout(() => {
      setRevealedCount((c) => Math.min(c + 1, impactPoints.length));
    }, REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, [impactPoints.length, revealedCount]);

  const visiblePoints = useMemo(
    () => impactPoints.slice(0, revealedCount),
    [impactPoints, revealedCount]
  );

  return (
    <>
      <style>{`
        @keyframes impact-bubble-grow {
          from { transform: scale(0); opacity: 0.7; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes impact-pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .impact-bubble-outer {
          transform-origin: center;
          animation: impact-bubble-grow ${GROW_DURATION_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .impact-pulse-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(200, 102, 77, 0.5);
          transform-origin: center;
          animation: impact-pulse-ring 2s ease-out infinite;
          pointer-events: none;
        }
      `}</style>
      <Map
        initialViewState={initialViewState}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        reuseMaps
        onClick={() => onHover(null)}
      >
        {visiblePoints.map((point) => {
          const radiusPx = familiesToRadiusPx(point.families);
          const intensity = normalizeAid(point.estimatedAid, minAid, maxAid);
          const opacity = 0.55 + 0.45 * intensity;
          const size = radiusPx * 2;

          return (
            <Marker
              key={point.zip}
              longitude={point.longitude}
              latitude={point.latitude}
              anchor="center"
              style={{ pointerEvents: "none" }}
            >
              <div
                className="impact-bubble-outer"
                style={{
                  width: size,
                  height: size,
                  position: "relative",
                  pointerEvents: "auto",
                  cursor: "pointer",
                  minWidth: 44,
                  minHeight: 44,
                }}
                onMouseEnter={() => onHover(point)}
                onMouseLeave={() => onHover(null)}
                onClick={() =>
                  onHover(hoveredPoint?.zip === point.zip ? null : point)
                }
                role="button"
                aria-label={`Impact in ZIP ${point.zip}: ${point.families} families, ${point.children} children. Tap to ${hoveredPoint?.zip === point.zip ? "close" : "view"} details.`}
              >
                {/* Pulse ring (bonus) */}
                <div className="impact-pulse-ring" />
                {/* Main bubble */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    backgroundColor: `rgba(200, 102, 77, ${opacity})`,
                    border: "2px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 2px 12px rgba(200, 102, 77, 0.22)",
                  }}
                />
              </div>
            </Marker>
          );
        })}

        {hoveredPoint && (
          <Popup
            longitude={hoveredPoint.longitude}
            latitude={hoveredPoint.latitude}
            anchor="bottom"
            closeButton={false}
            onClose={() => onHover(null)}
            offset={12}
            style={{ padding: 0 }}
          >
            <div className="min-w-[220px] max-w-[calc(100vw-2rem)] rounded-lg p-4 sm:p-5">
              <p className="mb-3 font-mono text-sm uppercase tracking-wider text-[var(--text-muted)]">
                ZIP {hoveredPoint.zip}
              </p>
              <dl className="space-y-2 text-base text-[var(--text)]">
                <div className="flex justify-between gap-6">
                  <dt className="text-[var(--text-muted)]">Families Served</dt>
                  <dd className="font-mono font-semibold tabular-nums">
                    {hoveredPoint.families}
                  </dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-[var(--text-muted)]">Children Helped</dt>
                  <dd className="font-mono font-semibold tabular-nums">
                    {hoveredPoint.children}
                  </dd>
                </div>
                <div className="flex justify-between gap-6 border-t border-[var(--border)] pt-2">
                  <dt className="text-[var(--text-muted)]">Est. Aid Delivered</dt>
                  <dd className="font-mono font-semibold tabular-nums text-[var(--accent)]">
                    {formatCurrency(hoveredPoint.estimatedAid)}
                  </dd>
                </div>
              </dl>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}
