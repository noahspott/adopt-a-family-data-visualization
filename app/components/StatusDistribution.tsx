"use client";

import type { StatusCount, StatusKey } from "@/app/data/impact";

const STATUS_COLOR_MAP: Record<StatusKey, string> = {
  unmatched: "var(--status-unmatched)",
  matched: "var(--status-matched)",
  "packet-sent": "var(--status-packet-sent)",
  closeout: "var(--status-closeout)",
  fulfilled: "var(--status-fulfilled)",
  exception: "var(--status-exception)",
};

type StatusDistributionProps = {
  data: StatusCount[];
};

export function StatusDistribution({ data }: StatusDistributionProps) {
  const maxCount = Math.max(1, ...data.map((d) => d.count));

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        Status Distribution
      </h2>
      <p className="font-serif mb-6 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
        From waiting for a sponsor to fulfilled
      </p>
      <div className="card-elevated rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-8 sm:px-8">
        <div className="-mx-1 flex items-end gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:gap-4 sm:overflow-visible sm:pb-0" style={{ minHeight: 160 }}>
          {data.map((item) => {
            const heightPct = (item.count / maxCount) * 100;
            const color = STATUS_COLOR_MAP[item.status];
            return (
              <div
                key={item.status}
                className="flex min-w-[44px] flex-1 flex-shrink-0 flex-col items-center gap-2 sm:min-w-0"
              >
                <div className="flex w-full min-w-[36px] flex-col items-center justify-end gap-1 sm:min-w-0" style={{ height: 140 }}>
                  <span className="font-mono text-xs font-semibold tabular-nums text-[var(--text)] sm:text-sm">
                    {item.count}
                  </span>
                  <div
                    className="w-full min-w-[28px] max-w-[48px] rounded-t transition-all duration-500 sm:min-w-0"
                    style={{
                      height: `${Math.max(heightPct, 8)}%`,
                      minHeight: 24,
                      backgroundColor: color,
                    }}
                    title={`${item.label}: ${item.count}`}
                  />
                </div>
                <span className="text-center text-xs font-medium text-[var(--text-muted)] sm:text-sm">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-base text-[var(--text-subtle)]">
          Families still needing a sponsor:{" "}
          <strong className="text-[var(--text)]">
            {data.find((d) => d.status === "unmatched")?.count ?? 0}
          </strong>
        </p>
      </div>
    </section>
  );
}
