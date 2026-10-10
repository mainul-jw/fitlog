"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import type { PlanWorkout, Workout } from "../types";

interface FitContextValue {
  plan: PlanWorkout[];
  saved: PlanWorkout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  toggleDone: (id: string | number) => void;
}

const FitContext = createContext<FitContextValue | undefined>(undefined);

export function FitProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<PlanWorkout[]>([]);

  useEffect(() => {
    try {
      const savedPlan = window.localStorage.getItem("fitlog_plan");
      const savedList = window.localStorage.getItem("fitlog_saved");

      if (savedPlan) {
        setPlan(JSON.parse(savedPlan) as PlanWorkout[]);
      }

      if (savedList) {
        setSaved(JSON.parse(savedList) as PlanWorkout[]);
      }
    } catch (error) {
      console.error("Failed to restore FitLog data from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    window.localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      toast.error("Limit reached! Maximum 5 lifts allowed for today.");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }

    setPlan((currentPlan) => [...currentPlan, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already in saved list!");
      return;
    }

    setSaved((currentSaved) => [...currentSaved, { ...workout, done: false }]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((currentPlan) => currentPlan.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id: string | number) => {
    setSaved((currentSaved) => currentSaved.filter((item) => item.id !== id));
    toast.success("Removed from saved list");
  };

  const toggleDone = (id: string | number) => {
    setPlan((currentPlan) =>
      currentPlan.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
    toast.success("Updated workout status");
  };

  return (
    <FitContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
      }}
    >
      {children}
    </FitContext.Provider>
  );
}

export const useFit = () => {
  const context = useContext(FitContext);

  if (!context) {
    throw new Error("useFit must be used within a FitProvider");
  }

  return context;
};