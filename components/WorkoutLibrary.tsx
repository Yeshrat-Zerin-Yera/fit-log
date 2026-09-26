"use client";

import { useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";

interface WorkoutLibraryProps {
  workouts: Workout[];
}

type SortOption = "default" | "duration" | "calories" | "rating";

export default function WorkoutLibrary({
  workouts,
}: WorkoutLibraryProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return a.rating - b.rating;
    }

    return 0;
  });

  return (
    <section id="library" className="bg-black px-4 py-20 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-black uppercase md:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-2 text-gray-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-sm font-bold text-gray-500"
            >
              SORT BY
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="rounded-full border border-white/20 bg-zinc-950 px-4 py-2 text-sm font-bold text-white outline-none focus:border-lime-400"
            >
              <option value="default">DEFAULT</option>
              <option value="duration">DURATION</option>
              <option value="calories">CALORIES</option>
              <option value="rating">RATING</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>

      </div>
    </section>
  );
}