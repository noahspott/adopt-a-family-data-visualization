"use client";

import { useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import type { ImpactPoint } from "@/app/data/impact";

const MapClient = dynamic(
  () => import("./ImpactMapClient").then((m) => m.ImpactMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-xl">
        <span className="text-slate-500 font-medium">Loading map…</span>
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
    <section className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">
        Community Impact
      </h2>
      <div className="relative w-full aspect-16/10 min-h-[320px] rounded-xl overflow-hidden shadow-lg border border-slate-200">
        <MapClient
          impactPoints={impactPoints}
          initialViewState={DEFAULT_VIEW}
          minAid={minAid}
          maxAid={maxAid}
          hoveredPoint={hoveredPoint}
          onHover={onHover}
        />
      </div>
      <p className="mt-3 text-sm text-slate-500">
        Hover over communities to explore the impact.
      </p>
    </section>
  );
}
