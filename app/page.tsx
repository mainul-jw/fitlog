"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, Flame, Clock, Star, ChevronDown } from "lucide-react";
import type { SortOption, Workout } from "./types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!response.ok) {
          throw new Error(`Failed to fetch workouts: ${response.status}`);
        }

        const data = (await response.json()) as Workout[];
        setWorkouts(data);
      } catch (error) {
        console.error("Workout fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    void loadWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "duration") {
        return Number.parseInt(String(a.duration), 10) - Number.parseInt(String(b.duration), 10);
      }
      if (sortBy === "calories") {
        return Number.parseInt(String(b.calories), 10) - Number.parseInt(String(a.calories), 10);
      }
      if (sortBy === "rating") {
        return Number(b.rating ?? 0) - Number(a.rating ?? 0);
      }
      return 0;
    });
  }, [sortBy, workouts]);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="text-[#ccff00] text-sm font-semibold tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-zinc-400 text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#b3e600] transition"
          >
            BROWSE WORKOUTS <ArrowDown size={18} />
          </a>
        </div>
        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-zinc-800">
          <img
            src="https://raw.githubusercontent.com/ProgrammingHero1/B14-A6-Fit-Log/refs/heads/main/assets/banner.png"
            alt="Hero Banner"
            className="object-cover block mx-auto p-5"
          />
        </div>
      </section>

      {/* Library Section */}
      <section id="library" className="px-6 max-w-7xl mx-auto space-y-8 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-3xl font-bold uppercase">THE LIBRARY</h2>
            <p className="text-zinc-400">Twelve lifts covering every major muscle group.</p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-400">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-zinc-900 border border-zinc-700 text-white px-3 py-2 pr-8 rounded-md text-sm appearance-none cursor-pointer focus:outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 text-zinc-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center text-zinc-400 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
            Loading workouts...
          </div>
        ) : (
          /* Cards 3x4 Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedWorkouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      {workout.category?.map((cat, i) => (
                        <span key={i} className="bg-zinc-800 text-zinc-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-[#ccff00] transition">{workout.name}</h3>
                    <p className="text-xs text-zinc-400">Equipment: {workout.equipment}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-zinc-800/50 mt-4 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1"><Clock size={14} /> {workout.duration}</span>
                  <span className="flex items-center gap-1"><Flame size={14} /> {workout.calories}</span>
                  <span className="flex items-center gap-1 text-amber-400"><Star size={14} fill="currentColor" /> {workout.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}