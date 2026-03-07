import AnimatedNumber from "./components/AnimatedNumber";
import { CtaButton } from "./components/CtaButton";
import { HumanTouch } from "./components/HumanTouch";
import { ImpactMap } from "./components/ImpactMap";
import { Link } from "./components/Link";
import { StatusDistribution } from "./components/StatusDistribution";
import { TotalAidCard } from "./components/TotalAidCard";
import {
  aggregateImpact,
  mockImpactData,
  mockStatusDistribution,
} from "./data/impact";

export default function Home() {
  const { totalChildren, totalFamilies, deliverySites, totalAid } =
    aggregateImpact(mockImpactData);

  return (
    <main className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
        {/* Hero — left-aligned (reference 1) */}
        <section className="border-b border-[var(--border)] pb-12 pt-6 sm:pb-16 sm:pt-8">
          <div className="flex flex-col items-start gap-6 text-left">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Adopt a Family
            </p>
            <h1 className="font-serif text-5xl font-bold tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl">
              Our Impact
            </h1>
            <p className="max-w-xl text-lg text-[var(--text-muted)] sm:text-xl">
              Together we make the holidays brighter.
            </p>
          </div>
        </section>

        {/* Stats row — card style from reference (soft shadow, rounded, white lift) */}
        <section className="grid gap-6 border-b border-[var(--border)] py-12 sm:gap-8 sm:py-16 sm:grid-cols-3">
          <div className="card-elevated flex flex-col items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-8 sm:px-8 sm:py-10">
            <AnimatedNumber number={totalChildren} />
            <p className="text-center text-base font-normal text-[var(--text-muted)] sm:text-lg">
              children will wake up to gifts this Christmas
            </p>
          </div>
          <div className="card-elevated flex flex-col items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-8 sm:px-8 sm:py-10">
            <AnimatedNumber number={totalFamilies} />
            <p className="text-center text-base font-normal text-[var(--text-muted)] sm:text-lg">
              families with a sponsor
            </p>
          </div>
          <div className="card-elevated flex flex-col items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-8 sm:px-8 sm:py-10">
            <AnimatedNumber number={deliverySites} />
            <p className="text-center text-base font-normal text-[var(--text-muted)] sm:text-lg">
              communities we serve
            </p>
          </div>
        </section>

        {/* Status funnel — Coordinator Dashboard style */}
        <section className="border-b border-[var(--border)] py-12 sm:py-16">
          <StatusDistribution data={mockStatusDistribution} />
        </section>

        {/* Map */}
        <section className="border-b border-[var(--border)] py-12 sm:py-16">
          <ImpactMap impactPoints={mockImpactData} />
        </section>

        {/* Total aid — reference 4/5 progress + big number */}
        <section className="border-b border-[var(--border)] py-12 sm:py-16">
          <TotalAidCard totalAid={totalAid} goal={60000} />
        </section>

        {/* Human touch — one short story */}
        <section className="border-b border-[var(--border)] py-12 sm:py-16">
          <HumanTouch />
        </section>

        {/* CTA — primary button (reference 2 Suggest Matches style) */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-serif mb-6 text-2xl font-semibold text-[var(--text)] sm:text-3xl">
              You can help make a difference
            </p>
            <p className="mx-auto mb-8 max-w-xl text-base text-[var(--text-muted)]">
              Register as a sponsor and we&apos;ll match you with a family. Together we make the holidays brighter.
            </p>
            <CtaButton href="https://buildwithchrist.ai">
              Become a sponsor
            </CtaButton>
          </div>
        </section>

        {/* Footer — muted hierarchy like reference */}
        <footer className="mt-16 border-t border-[var(--border)] py-10 text-center">
          <p className="mt-2 text-base text-[var(--text-muted)]">
            Built by <Link href="https://noahspott.com">Noah Spott</Link> &{" "}
            <Link href="">Luís Costa</Link>
          </p>
          <p className="text-base text-[var(--text-muted)]">
            Made for the{" "}
            <Link href="https://buildwithchrist.ai">BuildWithChrist.ai</Link>{" "}
            March 2026 Hackathon
          </p>
          <p className="mt-1 text-sm text-[var(--text-subtle)]">
            Special thanks to Catholic Coders Guild
          </p>
        </footer>
      </div>
    </main>
  );
}
