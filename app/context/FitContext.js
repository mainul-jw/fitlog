"use client";
import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const FitContext = createContext();

export function FitProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog_plan");
    const savedList = localStorage.getItem("fitlog_saved");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
    if (savedList) setSaved(JSON.parse(savedList));
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      toast.error("Limit reached! Maximum 5 lifts allowed for today.");
      return;
    }
    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already in saved list!");
      return;
    }
    setSaved([...saved, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((item) => item.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
    toast.success("Removed from saved list");
  };

  const toggleDone = (id) => {
    setPlan(
      plan.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
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

export const useFit = () => useContext(FitContext);