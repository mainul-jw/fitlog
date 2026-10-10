"use client";
import { useState } from "react";
import Link from "next/link";
import { useFit } from "../context/FitContext";
import { Check, X, Eye, Dumbbell, Clock, Flame, Star } from "lucide-react";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, toggleDone } = useFit();
  const [activeTab, setActiveTab] = useState("plan");

  const currentList = activeTab === "plan" ? plan : saved;

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((acc, curr) => acc + (parseInt(curr.duration) || 0), 0);
  const totalCalories = plan.reduce((acc, curr) => acc + (parseInt(curr.calories) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase">MY PLAN</h1>
        <p className="text-zinc-400 mt-1">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-1">
          <span className="text-xs text-zinc-400 uppercase font-bold">Exercises</span>
          <div className="text-3xl font-extrabold text-[#ccff00]">{totalExercises} / 5</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-1">
          <span className="text-xs text-zinc-400 uppercase font-bold">Minutes</span>
          <div className="text-3xl font-extrabold text-white">{totalMinutes} min</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl space-y-1">
          <span className="text-xs text-zinc-400 uppercase font-bold">Calories</span>
          <div className="text-3xl font-extrabold text-white">{totalCalories} kcal</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 gap-6">
        <button
          onClick={() => setActiveTab("plan")}
          className={`pb-3 font-bold text-sm ${
            activeTab === "plan" ? "text-[#ccff00] border-b-2 border-[#ccff00]" : "text-zinc-400"
          }`}
        >
          Today's Plan ({plan.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-3 font-bold text-sm ${
            activeTab === "saved" ? "text-[#ccff00] border-b-2 border-[#ccff00]" : "text-zinc-400"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {/* Workout Cards List */}
      {currentList.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center space-y-4">
          <Dumbbell className="mx-auto text-zinc-600" size={48} />
          <h3 className="text-xl font-bold uppercase">NOTHING HERE YET</h3>
          <p className="text-zinc-400 text-sm">Browse the library and add a lift to get today moving.</p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-[#b3e600] transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => (
            <div
              key={item.id}
              className={`bg-zinc-900 border ${
                item.done ? "border-emerald-500/50 opacity-75" : "border-zinc-800"
              } p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4`}
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className={`font-bold ${item.done ? "line-through text-zinc-400" : "text-white"}`}>
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-400">{item.equipment}</p>
                  <div className="flex gap-4 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center gap-1"><Clock size={12} /> {item.duration}</span>
                    <span className="flex items-center gap-1"><Flame size={12} /> {item.calories}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <Link
                  href={`/workout/${item.id}`}
                  className="bg-zinc-800 text-zinc-300 p-2 rounded-lg hover:text-white"
                  title="View Details"
                >
                  <Eye size={18} />
                </Link>

                {activeTab === "plan" && (
                  <button
                    onClick={() => toggleDone(item.id)}
                    className={`p-2 rounded-lg border ${
                      item.done
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-300 border-zinc-700"
                    }`}
                    title="Mark as Done"
                  >
                    <Check size={18} />
                  </button>
                )}

                <button
                  onClick={() => (activeTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                  className="bg-zinc-800 text-red-400 p-2 rounded-lg hover:bg-red-500/20"
                  title="Remove"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}