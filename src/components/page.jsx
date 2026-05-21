"use client";
 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DoctorCard from "@/components/doctorCard";
 
export default function CategoryPage() {
  const { specialty } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const formatted = specialty.replace(/-/g, " ");
 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/category/${specialty}`)
      .then((r) => r.json())
      .then((d) => { setDoctors(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [specialty]);
 
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED]">
              Specialty
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#1C1917] capitalize">
            {formatted}
          </h1>
          <p className="mt-2 text-sm text-[#78716C]">
            All available {formatted.toLowerCase()}s on our platform.
          </p>
        </div>
 
        {loading && (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-[#7C3AED]" />
          </div>
        )}
 
        {!loading && doctors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-bold text-[#1C1917] mb-2">No doctors found</p>
            <p className="text-sm text-[#78716C]">No {formatted.toLowerCase()}s available right now.</p>
          </div>
        )}
 
        {!loading && doctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
 