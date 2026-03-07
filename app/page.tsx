import AnimatedNumber from "./components/AnimatedNumber";
import { ImpactMap } from "./components/ImpactMap";
import { mockImpactData } from "./data/impact";

export default function Home() {

  const numberOfChildren = 100;
  const numberOfFamilies = 100;



  const numberOfChurches = 100;
  const city = "Atlanta"; 

  return (
    <main className="container mx-auto px-4 py-8">

      <section className="py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold text-center">Our Impact: Adopt a Family</h1>
          <p className="text-lg text-center">Cathedral of Christ the King</p>
        </div>
      </section>

      <section className="py-16 flex flex-col lg:flex-row justify-between">
        <p className="flex flex-col items-center justify-center min-w-3xs"><AnimatedNumber number={numberOfChildren} /> children will wake up to gifts this Christmas</p>
        <p className="flex flex-col items-center justify-center min-w-3xs"><AnimatedNumber number={numberOfChildren} /> families with a sponsor</p>
        <p className="flex flex-col items-center justify-center min-w-3xs"><AnimatedNumber number={numberOfChildren} /> gifts being wrapped</p>
      </section>

      <section className="py-16">
        <ImpactMap impactPoints={mockImpactData} />
      </section>

      <section>
        {/* church names */}
      </section>
    </main>
      
  );
}
