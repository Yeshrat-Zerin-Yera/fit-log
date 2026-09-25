import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Logo */}
          <div>
            <Link
              href="/"
              className="text-2xl font-black tracking-tight"
            >
              FIT<span className="text-lime-400">LOG</span>
            </Link>

            <p className="mt-2 text-sm text-gray-500">
              Train with intent. Log every set.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm font-bold text-gray-400">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              WORKOUTS
            </Link>

            <Link
              href="/my-plan"
              className="transition hover:text-white"
            >
              MY PLAN
            </Link>
          </div>

        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-600">
          © {new Date().getFullYear()} FitLog. All rights reserved.
        </div>

      </div>
    </footer>
  );
}