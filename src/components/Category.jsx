"use client";

import Link from "next/link";
import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaEye,
  FaTooth,
  FaBaby,
  FaLungs,
  FaUserMd,
  FaAllergies,
  FaSyringe,
} from "react-icons/fa";
import { MdOutlineLocalHospital } from "react-icons/md";

const categories = [
  {
    specialty: "Cardiologist",
    icon: <FaHeartbeat size={28} />,
    description: "Heart & cardiovascular care",
    color: "#e63946",
    bg: "#fff0f0",
    tab: "#ffd6d6",
  },
  {
    specialty: "Neurologist",
    icon: <FaBrain size={28} />,
    description: "Brain & nervous system",
    color: "#7209b7",
    bg: "#f5f0ff",
    tab: "#e0cfff",
  },
  {
    specialty: "Orthopedic",
    icon: <FaBone size={28} />,
    description: "Bones, joints & muscles",
    color: "#f4a261",
    bg: "#fff8f0",
    tab: "#ffe5cc",
  },
  {
    specialty: "Ophthalmologist",
    icon: <FaEye size={28} />,
    description: "Eye & vision health",
    color: "#0077b6",
    bg: "#f0f8ff",
    tab: "#cce5ff",
  },
  {
    specialty: "Dentist",
    icon: <FaTooth size={28} />,
    description: "Teeth & oral health",
    color: "#2ec4b6",
    bg: "#f0fffe",
    tab: "#c0f0ec",
  },
  {
    specialty: "Pediatrician",
    icon: <FaBaby size={28} />,
    description: "Child & infant health",
    color: "#ff6b9d",
    bg: "#fff0f6",
    tab: "#ffd6e9",
  },
  {
    specialty: "Pulmonologist",
    icon: <FaLungs size={28} />,
    description: "Lungs & respiratory",
    color: "#457b9d",
    bg: "#f0f5fa",
    tab: "#c8dff0",
  },
  {
    specialty: "Dermatologist",
    icon: <FaAllergies size={28} />,
    description: "Skin, hair & nails",
    color: "#e76f51",
    bg: "#fff5f2",
    tab: "#ffd9ce",
  },
  {
    specialty: "General Physician",
    icon: <FaUserMd size={28} />,
    description: "Primary & general care",
    color: "#2a9d8f",
    bg: "#f0faf9",
    tab: "#b8ede8",
  },
];

const FolderCard = ({ specialty, icon, description, color, bg, tab }) => {
  return (
    <Link href={`/doctors/category/${specialty.toLowerCase().replace(" ", "-")}`}>
      <div className="group cursor-pointer" style={{ paddingTop: "14px" }}>
        {/* folder tab */}
        <div
          className="w-1/3 h-3.5 rounded-t-lg ml-4 transition-all duration-300 group-hover:w-2/5"
          style={{ backgroundColor: tab }}
        />

        {/* folder body */}
        <div
          className="relative rounded-b-2xl rounded-tr-2xl px-5 py-6 transition-all duration-300 group-hover:-translate-y-1"
          style={{
            backgroundColor: bg,
            border: `1.5px solid ${tab}`,
            boxShadow: `0 4px 0 0 ${tab}, 0 6px 20px 0 ${tab}88`,
          }}
        >
          {/* icon circle */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${color}18`, color }}
          >
            {icon}
          </div>

          <h3
            className="font-bold text-base mb-1 transition-colors duration-200"
            style={{ color, fontFamily: "'Georgia', serif" }}
          >
            {specialty}
          </h3>

          <p className="text-xs text-gray-500 leading-relaxed">{description}</p>

          {/* arrow */}
          <div
            className="absolute bottom-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0"
            style={{ backgroundColor: color, color: "#fff" }}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Category() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* heading */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <MdOutlineLocalHospital className="text-[#386FA4]" size={20} />
          <span className="text-sm font-semibold text-[#386FA4] uppercase tracking-widest">
            Browse by Specialty
          </span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-black text-[#133C55]"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Find the Right Doctor
        </h2>
        <p className="text-gray-500 mt-2 max-w-lg text-sm">
          Choose a specialty to see all available doctors and book your appointment instantly.
        </p>
      </div>

      {/* grid: 2 cols on sm/md, 3 cols on lg+ */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map((cat) => (
          <FolderCard key={cat.specialty} {...cat} />
        ))}
      </div>
    </section>
  );
}
