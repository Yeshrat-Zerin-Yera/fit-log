"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const { plan, saved } = useFitLog();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  const myPlanActive = pathname.startsWith("/my-plan");

  return (
    <nav className="border-b border-white/10 bg-black text-white">
      <div className="mx-auto w-[90%] max-w-7xl">

        {/* Main Navbar */}
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/icons/logo.png"
              alt="FitLog logo"
              width={40}
              height={40}
              className="object-contain"
            />

            <span className="text-2xl font-black tracking-tight">
              FIT<span className="text-lime-400">LOG</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">

            <Link
              href="/"
              className={`rounded-lg px-4 py-2 font-semibold transition ${
                workoutActive
                  ? "text-lime-400"
                  : "text-white"
              } hover:bg-lime-400/15`}
            >
              WORKOUT
            </Link>

            <Link
              href="/my-plan"
              className={`rounded-lg px-4 py-2 font-semibold transition ${
                myPlanActive
                  ? "text-lime-400"
                  : "text-white"
              } hover:bg-lime-400/15`}
            >
              MY PLAN
            </Link>

          </div>

          {/* Counters + Mobile Menu Button */}
          <div className="flex items-center gap-2">

            <Link
              href="/my-plan"
              className="rounded-full bg-lime-400 px-3 py-2 text-xs font-bold text-black transition hover:bg-lime-300 sm:px-4 sm:text-sm"
            >
              PLAN {plan.length}
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold text-white transition hover:border-lime-400 hover:bg-lime-400/15 hover:text-lime-400 sm:px-4 sm:text-sm"
            >
              SAVED {saved.length}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-1 rounded-lg p-2 text-white transition hover:bg-lime-400/15 hover:text-lime-400 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="border-t border-white/10 py-3 md:hidden">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-4 py-3 font-semibold transition ${
                workoutActive
                  ? "text-lime-400"
                  : "text-white"
              } hover:bg-lime-400/15`}
            >
              WORKOUT
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`mt-1 block rounded-lg px-4 py-3 font-semibold transition ${
                myPlanActive
                  ? "text-lime-400"
                  : "text-white"
              } hover:bg-lime-400/15`}
            >
              MY PLAN
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}