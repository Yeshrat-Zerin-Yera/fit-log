"use client";

import Link from "next/link";
import { Clock, Flame, X } from "lucide-react";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlanContent() {
    const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

    const {
        plan,
        saved,
        removeFromPlan,
        removeSaved,
        markAsDone,
        isCompleted,
        showToast,
    } = useFitLog();

    const workouts = activeTab === "plan" ? plan : saved;

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
                        Build your workout plan and keep your saved exercises
                        ready for later.
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

                {/* Workout list */}
                {workouts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/20 px-6 py-20 text-center">

                        <h2 className="text-3xl font-black">
                            NOTHING HERE YET
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-gray-400">
                            Add workouts to your plan or save exercises
                            for later.
                        </p>

                        <Link
                            href="/#library"
                            className="mt-6 inline-block rounded-full bg-lime-400 px-6 py-3 font-bold text-black"
                        >
                            GO TO WORKOUTS
                        </Link>

                    </div>
                ) : (
                    <div className="space-y-4">

                        {workouts.map((workout) => (
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

                                    <div className="mt-4 flex gap-5 text-sm text-gray-400">

                                        <span className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {workout.duration} min
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Flame size={16} />
                                            {workout.caloriesBurned} kcal
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
                                            className="rounded-full bg-lime-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {isCompleted(workout.id)
                                                ? "DONE"
                                                : "MARK AS DONE"}
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