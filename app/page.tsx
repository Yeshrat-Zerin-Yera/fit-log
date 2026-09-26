import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero />

      <WorkoutLibrary workouts={workouts} />
    </>
  );
}