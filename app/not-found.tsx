import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 text-center space-y-4">
      <h1 className="text-6xl font-extrabold text-[#ccff00]">404</h1>
      <h2 className="text-2xl font-bold uppercase">Page Not Found</h2>
      <p className="text-zinc-400">The page you are looking for does not exist or has been moved.</p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-lg text-sm"
      >
        Return to Home
      </Link>
    </div>
  );
}