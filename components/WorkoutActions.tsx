"use client";

import { Bookmark, Check, Plus } from "lucide-react";
import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

interface WorkoutActionsProps {
  workout: Workout;
}

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useFitLog();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

      {/* Add to Plan */}
      <button
        onClick={() => addToPlan(workout)}
        disabled={inPlan}
        className="flex items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3 font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {inPlan ? <Check size={20} /> : <Plus size={20} />}

        {inPlan
          ? "ADDED TO TODAY'S PLAN"
          : "ADD TO TODAY'S PLAN"}
      </button>

      {/* Save */}
      <button
        onClick={() => saveWorkout(workout)}
        disabled={saved}
        className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 font-bold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saved ? <Check size={20} /> : <Bookmark size={20} />}

        {saved ? "SAVED" : "SAVE FOR LATER"}
      </button>

    </div>
  );
}