import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-6 px-6 flex flex-col md:flex-row items-center justify-between text-zinc-400 text-sm gap-4">
      <div className="flex items-center gap-2 font-bold text-white">
        <Dumbbell className="text-[#ccff00]" /> FITLOG
      </div>
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}