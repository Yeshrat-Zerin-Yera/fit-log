import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-black px-4 py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

        {/* Left side */}
        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.25em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 md:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
          >
            BROWSE WORKOUTS
            <ArrowDownRight size={20} />
          </Link>
        </div>

        {/* Right side */}
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1a?auto=format&fit=crop&w=1200&q=80"
            alt="Person working out in a gym"
            className="h-[420px] w-full object-cover grayscale"
          />
        </div>

      </div>
    </section>
  );
}