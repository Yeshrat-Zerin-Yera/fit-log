import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-8 text-white">
      <div className="mx-auto flex w-[90%] max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.png"
            alt="FitLog logo"
            width={36}
            height={36}
            className="object-contain"
          />

          <span className="text-2xl font-black tracking-tight">
            FIT<span className="text-lime-400">LOG</span>
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500 md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}