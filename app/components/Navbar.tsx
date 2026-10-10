"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFit } from "../context/FitContext";
import { Dumbbell } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFit();

  return (
    <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wider">
        <Dumbbell className="text-[#ccff00]" /> FITLOG
      </Link>

      <div className="flex items-center gap-6 font-medium">
        <Link
          href="/"
          className={pathname === "/" ? "text-[#ccff00]" : "text-zinc-400 hover:text-white"}
        >
          Workout
        </Link>
        <Link
          href="/my-plan"
          className={pathname === "/my-plan" ? "text-[#ccff00]" : "text-zinc-400 hover:text-white"}
        >
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/my-plan"
          className="bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
        >
          Plan <span className="bg-black text-white px-1.5 py-0.5 rounded-full text-[10px]">{plan.length}</span>
        </Link>
        <Link
          href="/my-plan"
          className="border border-zinc-700 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
        >
          Saved <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded-full text-[10px]">{saved.length}</span>
        </Link>
      </div>
    </nav>
  );
}