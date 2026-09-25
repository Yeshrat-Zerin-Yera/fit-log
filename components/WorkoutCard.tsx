import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 transition hover:-translate-y-1 hover:border-lime-400/50"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-lime-400/30 px-3 py-1 text-xs font-bold uppercase text-lime-400"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-xl font-black uppercase">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-gray-400">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4 text-sm text-gray-400">

          <span className="flex items-center gap-1">
            <Clock size={16} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={16} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={16} />
            {workout.rating}
          </span>

        </div>
      </div>
    </Link>
  );
}