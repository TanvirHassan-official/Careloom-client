"use client";

import { useEffect, useState } from "react";
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
} from "react-icons/fa";

import { MdOutlineLocalHospital } from "react-icons/md";

const specialtyConfig = {
  Cardiologist: {
    icon: <FaHeartbeat size={28} />,
    description: "Heart & cardiovascular care",
    color: "#e63946",
    bg: "#fff0f0",
    tab: "#ffd6d6",
  },

  Neurologist: {
    icon: <FaBrain size={28} />,
    description: "Brain & nervous system",
    color: "#7209b7",
    bg: "#f5f0ff",
    tab: "#e0cfff",
  },

  Orthopedic: {
    icon: <FaBone size={28} />,
    description: "Bones, joints & muscles",
    color: "#f4a261",
    bg: "#fff8f0",
    tab: "#ffe5cc",
  },

  Ophthalmologist: {
    icon: <FaEye size={28} />,
    description: "Eye & vision health",
    color: "#0077b6",
    bg: "#f0f8ff",
    tab: "#cce5ff",
  },

  Dentist: {
    icon: <FaTooth size={28} />,
    description: "Teeth & oral health",
    color: "#2ec4b6",
    bg: "#f0fffe",
    tab: "#c0f0ec",
  },

  Pediatrician: {
    icon: <FaBaby size={28} />,
    description: "Child & infant health",
    color: "#ff6b9d",
    bg: "#fff0f6",
    tab: "#ffd6e9",
  },

  Pulmonologist: {
    icon: <FaLungs size={28} />,
    description: "Lungs & respiratory",
    color: "#457b9d",
    bg: "#f0f5fa",
    tab: "#c8dff0",
  },

  Dermatologist: {
    icon: <FaAllergies size={28} />,
    description: "Skin, hair & nails",
    color: "#e76f51",
    bg: "#fff5f2",
    tab: "#ffd9ce",
  },

  "General Physician": {
    icon: <FaUserMd size={28} />,
    description: "Primary & general care",
    color: "#2a9d8f",
    bg: "#f0faf9",
    tab: "#b8ede8",
  },
};

function FolderCard({
  specialty,
  icon,
  description,
  color,
  bg,
  tab,
}) {
  return (
    <Link
      href={`/doctors/category/${specialty
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <div className="group cursor-pointer pt-3.5">
        <div
          className="w-1/3 h-3.5 rounded-t-lg ml-4 group-hover:w-2/5 transition-all"
          style={{ backgroundColor: tab }}
        />

        <div
          className="relative rounded-b-2xl rounded-tr-2xl px-5 py-6 group-hover:-translate-y-1 transition-all"
          style={{
            backgroundColor: bg,
            border: `1.5px solid ${tab}`,
            boxShadow: `0 4px 0 ${tab},0 6px 20px ${tab}88`,
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{
              backgroundColor: `${color}18`,
              color,
            }}
          >
            {icon}
          </div>

          <h3
            className="font-bold text-base mb-1"
            style={{
              color,
              fontFamily: "'Georgia', serif",
            }}
          >
            {specialty}
          </h3>

          <p className="text-xs text-gray-500">
            {description}
          </p>

          <div
            className="absolute bottom-5 right-5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
            style={{
              backgroundColor: color,
              color: "#fff",
            }}
          >
            →
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/doctors/specialties`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <MdOutlineLocalHospital
            className="text-[#386FA4]"
            size={20}
          />

          <span className="text-sm font-semibold text-[#386FA4] uppercase tracking-widest">
            Browse by Specialty
          </span>
        </div>

        <h2
          className="text-3xl md:text-4xl font-black text-[#133C55]"
          style={{
            fontFamily: "'Georgia', serif",
          }}
        >
          Find the Right Doctor
        </h2>

        <p className="text-gray-500 mt-2 max-w-lg text-sm">
          Choose a specialty to see all available doctors and book your appointment instantly.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((specialty) => {
            const config =
              specialtyConfig[specialty] || {
                icon: <FaUserMd size={28} />,
                description: "Medical specialist",
                color: "#386FA4",
                bg: "#F7FAFC",
                tab: "#D8E9F5",
              };

            return (
              <FolderCard
                key={specialty}
                specialty={specialty}
                {...config}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}