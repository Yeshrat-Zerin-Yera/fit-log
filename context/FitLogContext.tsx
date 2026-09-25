"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Workout } from "@/types/workout";

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  completed: number[];


  showToast: (message: string) => void;

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Workout) => void;
  removeSaved: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;

  markAsDone: (id: number) => void;
  isCompleted: (id: number) => boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(
  undefined
);

export function FitLogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState("");
  const [completed, setCompleted] = useState<number[]>([]);

  // Load data from localStorage ONCE
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedCompleted = localStorage.getItem(
      "fitlog-completed"
    );

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }

    setLoaded(true);
  }, []);

  // Save plan after localStorage has been loaded
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, loaded]);

  // Save saved workouts after localStorage has been loaded
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, loaded]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed, loaded]);

  function addToPlan(workout: Workout) {
    setPlan((currentPlan) => {
      if (currentPlan.some((item) => item.id === workout.id)) {
        return currentPlan;
      }

      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  }

  function removeFromPlan(id: number) {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );
  }

  function saveWorkout(workout: Workout) {
    setSaved((currentSaved) => {
      if (currentSaved.some((item) => item.id === workout.id)) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  }

  function removeSaved(id: number) {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );
  }

  function isInPlan(id: number) {
    return plan.some((workout) => workout.id === id);
  }

  function isSaved(id: number) {
    return saved.some((workout) => workout.id === id);
  }

  function showToast(message: string) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function markAsDone(id: number) {
    setCompleted((current) => {
      if (current.includes(id)) {
        return current;
      }

      return [...current, id];
    });
  }

  function isCompleted(id: number) {
    return completed.includes(id);
  }

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        showToast,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        isInPlan,
        isSaved,
        completed,
        markAsDone,
        isCompleted,
      }}
    >
      {children}

      {toast && (
        <div className="toast toast-end toast-bottom z-50">
          <div className="alert border border-lime-400/30 bg-zinc-900 text-white">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}