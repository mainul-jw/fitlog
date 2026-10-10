"use client";
import { useEffect, useState, use } from "react";
import { useFit } from "../../context/FitContext";
import { Clock, Flame, Star, Plus, Bookmark } from "lucide-react";

export default function WorkoutDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = useFit();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center text-zinc-400 flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
        Loading exercise details...
      </div>
    );
  }

  if (!workout) return <div className="text-center py-20">Workout not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left Column: Visual */}
      <div className="h-[450px] rounded-2xl overflow-hidden border border-zinc-800">
        <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
      </div>

      {/* Right Column: Details */}
      <div className="space-y-6">
        <div>
          <div className="flex gap-2 mb-3">
            {workout.category?.map((cat, i) => (
              <span key={i} className="bg-zinc-800 text-[#ccff00] text-xs font-bold px-2.5 py-1 rounded">
                {cat}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase">{workout.name}</h1>
          <p className="text-zinc-400 mt-2">{workout.description}</p>
        </div>

        {/* Specs Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block uppercase">Equipment</span>
            <span className="font-semibold text-white">{workout.equipment}</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase">Difficulty</span>
            <span className="font-semibold text-white">{workout.difficulty || "Intermediate"}</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase">Sets / Reps</span>
            <span className="font-semibold text-white">{workout.sets || 4} / {workout.reps || "8-12"}</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase">Duration</span>
            <span className="font-semibold text-white">{workout.duration}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h3 className="font-bold uppercase text-lg">Instructions</h3>
          <ol className="space-y-2 text-sm text-zinc-300">
            {workout.instructions?.map((step, index) => (
              <li key={index} className="flex gap-3 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
                <span className="font-bold text-[#ccff00]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => addToPlan(workout)}
            className="flex-1 bg-[#ccff00] text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b3e600] transition"
          >
            <Plus size={18} /> Add to today's plan
          </button>
          <button
            onClick={() => addToSaved(workout)}
            className="flex-1 border border-zinc-700 bg-zinc-900 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-800 transition"
          >
            <Bookmark size={18} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}