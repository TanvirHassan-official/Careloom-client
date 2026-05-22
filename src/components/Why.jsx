import { FaShieldHalved, FaCalendarCheck, FaUserDoctor } from "react-icons/fa6";
 
const reasons = [
  {
    icon: <FaUserDoctor size={28} />,
    title: "Verified Specialists Only",
    description:
      "Every doctor on Careloom goes through a rigorous verification process. You get access to licensed, experienced specialists — no guesswork, no risk.",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    border: "#EDE9FE",
  },
  {
    icon: <FaCalendarCheck size={28} />,
    title: "Book in Under 2 Minutes",
    description:
      "No phone calls, no waiting rooms. Browse availability, pick a time slot, and confirm your appointment instantly — anytime, anywhere.",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    border: "#EDE9FE",
  },
  {
    icon: <FaShieldHalved size={28} />,
    title: "Your Privacy, Protected",
    description:
      "Your health data is yours. We use industry-grade encryption to keep your personal information and medical history completely secure.",
    accent: "#7C3AED",
    bg: "#F5F3FF",
    border: "#EDE9FE",
  },
];
 
export default function WhyCareloom() {
  return (
    <section className="py-20 px-4 bg-[#4C1D95]">
      <div className="max-w-7xl mx-auto">
 
        {/* Heading */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 rounded-full bg-[#7C3AED]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#d2c0ff]">
                Why Careloom
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-white leading-tight"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Healthcare that works <br className="hidden md:block" />
              <span className="text-[#d2c0ff]">for you</span>
            </h2>
                      <p className="text-sm text-base-100 opacity-40 max-w-sm leading-relaxed">
            We built Careloom to make quality healthcare accessible, fast, and trustworthy — for everyone.
          </p>
          </div>

        </div>
 
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map(({ icon, title, description, accent, bg, border }, i) => (
            <div
              key={title}
              className="group relative bg-white rounded-3xl border p-8 flex flex-col gap-5 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500"
              style={{ borderColor: border }}
            >
              {/* Number watermark */}
              <span
                className="absolute top-6 right-7 text-6xl font-black opacity-[0.06] select-none"
                style={{ color: accent }}
              >
                0{i + 1}
              </span>
 
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: bg, color: accent }}
              >
                {icon}
              </div>
 
              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-[17px] font-extrabold text-[#1C1917] leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-[#78716C] leading-relaxed">
                  {description}
                </p>
              </div>
 
              {/* Bottom accent line */}
              <div
                className="h-1 w-10 rounded-full mt-auto transition-all duration-500 group-hover:w-20"
                style={{ backgroundColor: accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}