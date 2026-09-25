import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <>
      <Navbar />

      <Hero />

      <section
        id="library"
        className="bg-black px-4 py-20 text-white"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <h2 className="text-4xl font-black uppercase md:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-2 text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}