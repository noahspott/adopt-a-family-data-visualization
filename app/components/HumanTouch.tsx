/**
 * One short, human moment — anonymized quote or story to make impact tangible.
 * Reference: card with subtle border, serif for emphasis.
 */

export function HumanTouch() {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        In their words
      </h2>
      <p className="font-serif mb-6 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
        Making the holidays brighter
      </p>
      <div className="card-elevated rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-8 sm:px-8">
        <blockquote className="font-serif text-lg italic text-[var(--text)] sm:text-xl">
          &ldquo;One family asked for a cookware set so they could cook meals
          together. Another needed warm coats for the kids. Every wish we fulfill
          is a step toward a brighter Christmas.&rdquo;
        </blockquote>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          — Adopt a Family coordinator
        </p>
      </div>
    </section>
  );
}
