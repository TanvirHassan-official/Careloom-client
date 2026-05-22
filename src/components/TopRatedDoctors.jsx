"use client";
 
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaStar, FaStethoscope, FaLocationDot, FaClock } from "react-icons/fa6";
 
export default function TopRatedDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  const router = useRouter();
 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/top-rated`)
      .then((res) => res.json())
      .then((data) => { setDoctors(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
 
  const handleViewDetails = (id) => {

      router.push(`/appointments/${id}`);

  };
 
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
            <div
              key={doctor._id}
              className="group bg-white rounded-3xl border border-[#E5E7EB] hover:border-[#7C3AED] hover:shadow-xl hover:shadow-[#7C3AED]/10 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Top banner */}
              <div className="relative h-36 bg-gradient-to-br from-[#4C1D95] to-[#7C3AED] flex items-end px-5 pb-0">
                {/* Rating badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/30 px-2.5 py-1 rounded-full">
                  <FaStar className="text-yellow-300" size={11} />
                  <span className="text-white text-xs font-bold">{doctor.rating}</span>
                </div>
                {/* Avatar */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-3 border-white shadow-lg translate-y-10 shrink-0">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
 
              {/* Body */}
              <div className="flex flex-col flex-1 px-5 pt-14 pb-5 gap-3">
                <div>
                  <h3 className="font-bold text-[#1C1917] text-base leading-tight">{doctor.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <FaStethoscope className="text-[#7C3AED]" size={11} />
                    <span className="text-sm font-semibold text-[#7C3AED]">{doctor.specialty}</span>
                  </div>
                </div>
 
                <div className="flex flex-col gap-1.5 text-xs text-[#78716C]">
                  <div className="flex items-center gap-1.5">
                    <FaLocationDot size={11} className="text-[#78716C] shrink-0" />
                    <span className="truncate">{doctor.hospital} · {doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock size={11} className="text-[#78716C] shrink-0" />
                    <span>{doctor.experience} experience</span>
                  </div>
                </div>
 
                {/* Availability pills */}
                <div className="flex flex-wrap gap-1">
                  {doctor.availability?.map((slot, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#EDE9FE] text-[#5B21B6] font-medium px-2 py-0.5 rounded-full"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
 
                {/* Fee + CTA */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E5E7EB]">
                  <div>
                    <span className="text-xs text-[#78716C]">Per Visit</span>
                    <p className="font-bold text-[#1C1917] text-sm">৳{doctor.fee}</p>
                  </div>
                  <button
                    onClick={() => handleViewDetails(doctor._id)}
                    className="px-4 py-2 bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-[#7C3AED]/30"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
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