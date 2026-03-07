import { ImpactMap } from "@/app/components/ImpactMap";
import { mockImpactData } from "@/app/data/impact";

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <ImpactMap impactPoints={mockImpactData} />
      </div>
    </main>
  );
}
