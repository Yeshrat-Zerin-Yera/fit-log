export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">

        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-lime-400" />

        <p className="text-sm font-bold tracking-[0.25em] text-gray-400">
          LOADING WORKOUTS...
        </p>

      </div>
    </main>
  );
}