import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="text-center">

        <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
          404
        </p>

        <h1 className="mt-4 text-5xl font-black uppercase md:text-7xl">
          WORKOUT NOT FOUND
        </h1>

        <p className="mx-auto mt-5 max-w-md text-gray-400">
          The page you're looking for doesn't exist or the
          workout could not be found.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300"
        >
          GO TO WORKOUTS
        </Link>

      </div>
    </main>
  );
}