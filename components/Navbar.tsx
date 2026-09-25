"use client";

import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const { plan, saved } = useFitLog();

  return (
    <nav className="border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">

        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tight">
          FIT<span className="text-lime-400">LOG</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-semibold text-lime-400"
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className="font-semibold text-gray-400 transition hover:text-white"
          >
            MY PLAN
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-black"
          >
            PLAN {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold"
          >
            SAVED {saved.length}
          </Link>
        </div>

      </div>
    </nav>
  );
}