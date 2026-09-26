"use client";

import Link from "next/link";
import { Clock, Flame, Star, X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlanContent() {
    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
    type SortOption = "duration" | "calories" | "rating";

    const [sortBy, setSortBy] = useState<SortOption>("duration");

    const {
        plan,
        saved,
        loaded,
        removeFromPlan,
        removeSaved,
        markAsDone,
        isCompleted,
        showToast,
    } = useFitLog();

    if (!loaded) {
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

    const workouts = activeTab === "plan" ? plan : saved;

    const sortedWorkouts = [...workouts].sort((a, b) => {
        if (sortBy === "duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "calories") {
            return a.caloriesBurned - b.caloriesBurned;
        }

        return a.rating - b.rating;
    });

    const totalMinutes = plan.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    return (
        <main className="min-h-screen bg-black px-4 py-16 text-white">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10">
                    <p className="text-sm font-bold tracking-[0.25em] text-lime-400">
                        YOUR WORKOUTS
                    </p>

                    <h1 className="mt-3 text-5xl font-black uppercase md:text-7xl">
                        MY PLAN
                    </h1>

                    <p className="mt-4 max-w-2xl text-gray-400">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </div>

                {/* Metrics */}
                <div className="mb-10 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
                        <p className="text-sm text-gray-500">EXERCISES</p>
                        <p className="mt-2 text-4xl font-black">
                            {plan.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
                        <p className="text-sm text-gray-500">MINUTES</p>
                        <p className="mt-2 text-4xl font-black">
                            {totalMinutes}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
                        <p className="text-sm text-gray-500">CALORIES</p>
                        <p className="mt-2 text-4xl font-black">
                            {totalCalories}
                        </p>
                    </div>

                </div>

                {/* Tabs */}
                <div className="mb-8 flex gap-3 border-b border-white/10 pb-4">

                    <button
                        onClick={() => setActiveTab("plan")}
                        className={`rounded-full px-5 py-2 font-bold ${activeTab === "plan"
                            ? "bg-lime-400 text-black"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        TODAY'S PLAN ({plan.length})
                    </button>

                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`rounded-full px-5 py-2 font-bold ${activeTab === "saved"
                            ? "bg-lime-400 text-black"
                            : "text-gray-400 hover:text-white"
                            }`}
                    >
                        SAVED ({saved.length})
                    </button>

                </div>
                <div className="mb-6 flex items-center justify-end gap-3">
                    <label
                        htmlFor="sort"
                        className="text-sm font-bold text-gray-500"
                    >
                        SORT BY
                    </label>

                    <div className="relative">
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(event) =>
                                setSortBy(event.target.value as SortOption)
                            }
                            className="appearance-none rounded-full border border-white/20 bg-zinc-950 px-4 py-2 pr-10 text-sm font-bold text-white outline-none focus:border-lime-400"
                        >
                            <option value="duration">DURATION</option>
                            <option value="calories">CALORIES</option>
                            <option value="rating">RATING</option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                    </div>
                </div>
                {/* Workout list */}
                {workouts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/20 px-6 py-20 text-center">

                        <h2 className="text-3xl font-black">
                            NOTHING HERE YET
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-gray-400">
                            Browse the library and add a lift to get today moving.
                        </p>

                        <Link
                            href="/"
                            className="mt-6 inline-block rounded-full bg-lime-400 px-6 py-3 font-bold text-black"
                        >
                            GO TO WORKOUTS
                        </Link>

                    </div>
                ) : (
                    <div className="space-y-4">

                        {sortedWorkouts.map((workout) => (
                            <div
                                key={workout.id}
                                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-zinc-950 p-4 sm:flex-row sm:items-center"
                            >

                                {/* Image */}
                                <img
                                    src={workout.image}
                                    alt={workout.name}
                                    className="h-32 w-full rounded-xl object-cover sm:w-48"
                                />

                                {/* Info */}
                                <div className="flex-1">

                                    <h2 className="text-2xl font-black uppercase">
                                        {workout.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-400">
                                        {workout.equipment}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-400">
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

                                {/* Actions */}
                                <div className="flex flex-wrap items-center gap-2">

                                    <Link
                                        href={`/workout/${workout.id}`}
                                        className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold transition hover:bg-white/10"
                                    >
                                        VIEW DETAILS
                                    </Link>

                                    {activeTab === "plan" && (
                                        <button
                                            onClick={() => {
                                                markAsDone(workout.id);
                                                showToast(`${workout.name} marked as done`);
                                            }}
                                            disabled={isCompleted(workout.id)}
                                            className="flex flex-row items-center rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {isCompleted(workout.id) ? (
                                                <>
                                                    <Check size={16} />
                                                    DONE
                                                </>
                                            ) : (
                                                <>
                                                    <Check size={16} />
                                                    MARK AS DONE
                                                </>
                                            )}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => {
                                            if (activeTab === "plan") {
                                                removeFromPlan(workout.id);
                                                showToast(`${workout.name} removed from plan`);
                                            } else {
                                                removeSaved(workout.id);
                                                showToast(`${workout.name} removed from saved`);
                                            }
                                        }}
                                        className="rounded-full border border-red-500/30 p-2 text-red-400 transition hover:bg-red-500/10"
                                        aria-label={`Remove ${workout.name}`}
                                    >
                                        <X size={20} />
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
}