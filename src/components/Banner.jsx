import Image from "next/image";
import Link from "next/link";

const stats = [
    { value: "500+", label: "Doctors" },
    { value: "20k+", label: "Patients" },
    { value: "4.9★", label: "Rating" },
];

export default function Banner() {
    return (
        <section className="relative bg-[#4C1D95] overflow-hidden min-h-[90vh] flex items-center">

            {/* Background grid pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Glow blobs */}
            <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] bg-[#7C3AED] rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-[-60px] right-[-60px] w-[350px] h-[350px] bg-[#5B21B6] rounded-full blur-[100px] opacity-30" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* ── LEFT ── */}
                    <div className="flex flex-col gap-8">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-violet-200 text-sm font-semibold px-4 py-2 rounded-full w-fit">
                            🛡️ Trusted Healthcare Platform
                        </div>

                        {/* Headline */}
                        <div className="flex flex-col gap-4">
                            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight">
                                Find &amp; Book{" "}
                                <span className="relative inline-block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-200">
                                        Top Doctors
                                    </span>
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                                        <path d="M0 6 Q100 0 200 6" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <br />
                                Near You
                            </h1>
                            <p className="text-violet-200 text-lg leading-relaxed max-w-md">
                                Book appointments with verified specialists in minutes. Your health, our priority — available 24/7.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Link href="/appointments">
                                <button className="flex items-center gap-2 px-6 py-3.5 bg-white text-[#4C1D95] font-bold rounded-2xl hover:bg-violet-100 transition-all duration-300 shadow-lg shadow-black/20 hover:scale-105">
                                    📅 Book Appointment
                                </button>
                            </Link>
                            <Link href="/appointments">
                                <button className="flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                                    Browse Doctors →
                                </button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 pt-2 flex-wrap">
                            {stats.map(({ value, label }) => (
                                <div key={label} className="flex flex-col">
                                    <span className="text-2xl font-black text-white">{value}</span>
                                    <span className="text-xs text-violet-300 font-medium">{label}</span>
                                </div>
                            ))}

                            {/* Stacked avatars */}
                            <div className="flex flex-col">
                                <div className="flex -space-x-2">
                                    {[48, 49, 50, 51].map((id) => (
                                        <div key={id} className="w-8 h-8 rounded-full border-2 border-[#4C1D95] overflow-hidden relative">
                                            <Image
                                                src={`https://i.pravatar.cc/40?img=${id}`}
                                                alt="patient"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs text-violet-300 font-medium mt-1">Happy patients</span>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT ── */}
                    <div className="relative hidden lg:flex items-center justify-center">

                        {/* Center large card */}
                        <div className="relative w-72 h-80 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl shadow-black/40">
                            <Image
                                src="https://i.pravatar.cc/400?img=47"
                                alt="Featured Doctor"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95]/80 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <p className="text-white font-bold text-lg">Dr. Ayesha Rahman</p>
                                <p className="text-violet-200 text-sm">Cardiologist • 10 yrs exp</p>
                                <p className="text-yellow-400 text-xs mt-1">★★★★★ 4.9</p>
                            </div>
                        </div>

                        {/* Floating card — top left */}
                        <div className="absolute -left-10 top-4 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 shadow-xl w-52">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://i.pravatar.cc/80?img=53"
                                    alt="Dr. Imran"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white text-xs font-bold">Dr. Imran</p>
                                <p className="text-violet-300 text-xs">Neurologist</p>
                                <p className="text-yellow-400 text-xs">★ 4.8</p>
                            </div>
                        </div>

                        {/* Floating card — bottom right */}
                        <div className="absolute -right-8 bottom-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 shadow-xl w-52">
                            <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src="https://i.pravatar.cc/80?img=44"
                                    alt="Dr. Nadia"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-white text-xs font-bold">Dr. Nadia</p>
                                <p className="text-violet-300 text-xs">Pediatrician</p>
                                <p className="text-yellow-400 text-xs">★ 4.7</p>
                            </div>
                        </div>

                        {/* Floating stat pill — top right */}
                        <div className="absolute -right-4 top-0 bg-[#059669] text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg">
                            ✅ 1,200+ Booked Today
                        </div>

                        {/* Floating stat pill — bottom left */}
                        <div className="absolute -left-6 bottom-2 bg-white text-[#4C1D95] text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg">
                            👨‍⚕️ 500+ Verified Doctors
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}