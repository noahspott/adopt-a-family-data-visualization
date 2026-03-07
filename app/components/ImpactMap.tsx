"use client";

import { useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { ImpactPoint } from "@/app/data/impact";

const MapClient = dynamic(
  () => import("./ImpactMapClient").then((m) => m.ImpactMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[var(--bg-elevated)]">
        <span className="font-mono text-lg text-[var(--text-muted)]">
          Loading map…
        </span>
      </div>
    ),
  }
);

export type ImpactMapProps = {
  impactPoints: ImpactPoint[];
};

const DEFAULT_VIEW = {
  longitude: -84.39,
  latitude: 33.75,
  zoom: 9,
} as const;

export function ImpactMap({ impactPoints }: ImpactMapProps) {
  const [hoveredPoint, setHoveredPoint] = useState<ImpactPoint | null>(null);

  const { minAid, maxAid } = useMemo(() => {
    if (impactPoints.length === 0)
      return { minAid: 0, maxAid: 1 };
    const aids = impactPoints.map((p) => p.estimatedAid);
    return {
      minAid: Math.min(...aids),
      maxAid: Math.max(...aids),
    };
  }, [impactPoints]);

  const onHover = useCallback((point: ImpactPoint | null) => {
    setHoveredPoint(point);
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        Community Impact
      </h2>
      <p className="font-serif mb-6 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
        Where we&apos;re making a difference
      </p>
      <div className="card-elevated relative aspect-16/10 min-h-[280px] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] sm:min-h-[320px]">
        <MapClient
          impactPoints={impactPoints}
          initialViewState={DEFAULT_VIEW}
          minAid={minAid}
          maxAid={maxAid}
          hoveredPoint={hoveredPoint}
          onHover={onHover}
        />
      </div>
      <p className="mt-4 text-base text-[var(--text-subtle)]">
        <span className="sm:inline hidden">Hover over </span>
        <span className="sm:hidden">Tap </span>
        communities to explore the impact.
      </p>
    </section>
  );
}
