"use client";

import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { useEffect, useState } from "react";

type TotalAidCardProps = {
  totalAid: number;
  /** Optional goal for progress bar (e.g. 50000). */
  goal?: number;
};

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

export function TotalAidCard({ totalAid, goal }: TotalAidCardProps) {
  const progressPct = goal && goal > 0 ? Math.min(100, (totalAid / goal) * 100) : null;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  useMotionValueEvent(rounded, "change", setDisplay);
  useEffect(() => {
    const controls = animate(count, totalAid, { duration: 1 });
    return () => controls.stop();
  }, [count, totalAid]);

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        Generosity in action
      </h2>
      <p className="font-serif mb-6 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
        Total estimated aid delivered
      </p>
      <div className="card-elevated rounded-xl border-2 border-[var(--border-accent)] bg-[var(--bg-card)] px-5 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center font-mono text-4xl font-bold tabular-nums text-[var(--accent)] glow-text sm:text-5xl lg:text-6xl">
            <motion.span>{formatCurrency(display)}</motion.span>
          </p>
          <p className="text-center text-base text-[var(--text-muted)] sm:text-lg">
            in gifts and support this season
          </p>
          {goal != null && goal > 0 && (
            <div className="mt-2 w-full max-w-md">
              <p className="mb-1 text-center text-sm text-[var(--text-subtle)]">
                {formatCurrency(totalAid)} / {formatCurrency(goal)} goal
              </p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                  style={{ width: `${progressPct ?? 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
