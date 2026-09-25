import Link from "next/link";
import { getWorkouts } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workouts = await getWorkouts();

  const workout = workouts.find(
    (item) => item.id === Number(id)
  );

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black">
            WORKOUT NOT FOUND
          </h1>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-lime-400 px-6 py-3 font-bold text-black"
          >
            GO TO WORKOUTS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/"
          className="mb-8 inline-block text-sm font-bold text-lime-400"
        >
          ← BACK TO LIBRARY
        </Link>

        <div className="grid gap-10 md:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[400px] w-full object-cover"
            />
          </div>

          {/* Information */}
          <div>
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-lime-400/30 px-3 py-1 text-xs font-bold uppercase text-lime-400"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-4xl font-black uppercase md:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Specs */}
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">

              <div className="flex justify-between py-4">
                <span className="text-gray-500">EQUIPMENT</span>
                <span>{workout.equipment}</span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500">DIFFICULTY</span>
                <span>{workout.difficulty}</span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500">SETS</span>
                <span>{workout.sets}</span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500">REPS</span>
                <span>{workout.reps}</span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500">DURATION</span>
                <span>{workout.duration} min</span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500">CALORIES</span>
                <span>{workout.caloriesBurned} kcal</span>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-gray-500">RATING</span>
                <span>{workout.rating}</span>
              </div>

            </div>

            {/* Actions */}
            <WorkoutActions workout={workout} />

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-2xl font-black">
                INSTRUCTIONS
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-gray-400"
                  >
                    <span className="font-bold text-lime-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}