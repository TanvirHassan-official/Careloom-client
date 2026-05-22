import Link from "next/link";
 
export const metadata = {
  title: "404 - Page Not Found | Careloom",
  description: "The page you're looking for doesn't exist.",
};
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#4C1D95] flex items-center justify-center px-4 py-16">
 
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
 
      <div className="relative z-10 text-center max-w-md w-full">
 
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center animate-bounce">
            <span className="text-5xl">🩺</span>
          </div>
        </div>
 
        {/* 404 */}
        <h1 className="text-8xl font-black text-white mb-2 tracking-tight">
          404
        </h1>
 
        {/* Title */}
        <h2 className="text-2xl font-bold text-violet-200 mb-3">
          Page Not Found
        </h2>
 
        {/* Description */}
        <p className="text-violet-300 text-sm leading-relaxed mb-10">
          Looks like this page took a sick day. The route you&apos;re looking for doesn&apos;t exist — but our doctors are still available.
        </p>
 
        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#4C1D95] font-bold rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-lg hover:scale-105"
          >
            🏠 Back to Home
          </Link>
          <Link
            href="/appointments"
            className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            Browse Doctors →
          </Link>
        </div>
 
      </div>
    </div>
  );
}