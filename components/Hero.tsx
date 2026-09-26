import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-black px-4 py-16 text-white md:py-24">
      <div className="mx-auto grid w-[90%] max-w-7xl items-center gap-10 md:grid-cols-2">

        {/* Left - Text */}
        <div>

          <p className="mb-4 text-sm font-bold tracking-[0.25em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 md:text-lg">
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

        {/* Right - Image */}
        <div className="relative h-[350px] overflow-hidden rounded-2xl md:h-[500px]">
          <Image
            src="/images/banner.png"
            alt="Workout banner"
            fill
            priority
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}