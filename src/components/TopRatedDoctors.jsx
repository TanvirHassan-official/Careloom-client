"use client";
import DoctorCard from "@/components/doctorCard";
import { useEffect, useState } from "react";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import { FaStar } from "react-icons/fa6";
 
export default function TopRatedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/top-rated`)
      .then((res) => res.json())
      .then((data) => { setDoctors(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
  

 
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <FaStar className="text-[#7C3AED]" size={18} />
          <span className="text-sm font-semibold text-[#7C3AED] uppercase tracking-widest">
            Top Rated
          </span>
        </div>
        <h2
          className="text-3xl md:text-4xl font-black text-[#133C55]"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Meet Our Best Doctors
        </h2>
        <p className="text-gray-500 mt-2 max-w-lg text-sm">
          Hand-picked by patient reviews. Book with confidence — these are our highest-rated specialists.
        </p>
      </div>
 
      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-[#7C3AED]" />
        </div>
      )}
 
      {/* Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
 
      {/* Bottom CTA */}
      <div className="mt-10 text-center">
        <Link href="/appointments">
          <button className="px-8 py-3 bg-[#4C1D95] hover:bg-[#7C3AED] text-white font-semibold rounded-2xl transition-all duration-300 shadow hover:shadow-lg">
            Browse All Doctors →
          </button>
        </Link>
      </div>
    </section>
  );
}