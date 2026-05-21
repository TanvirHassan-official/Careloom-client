/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import DoctorCard from "@/components/doctorCard";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState("");

  // fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
        const data = await res.json();
        setDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // fetch specialties for filter dropdown
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/specialties`);
        const data = await res.json();
        setSpecialties(data);
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }
    };

    fetchSpecialties();
  }, []);

  // filter + search logic
  useEffect(() => {
    let result = [...doctors];

    // search by name
    if (searchQuery.trim()) {
      result = result.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // filter by specialty
    if (selectedSpecialty) {
      result = result.filter((doc) =>
        doc.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    // sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "fee_asc") {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortBy === "fee_desc") {
      result.sort((a, b) => b.fee - a.fee);
    }

    setFilteredDoctors(result);
  }, [searchQuery, selectedSpecialty, sortBy, doctors]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedSpecialty("");
    setSortBy("");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4">
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7C3AED]">
              Book an appointment
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#1C1917] leading-tight">
            All Available Doctors
          </h1>
          <p className="mt-3 text-sm text-[#78716C] max-w-2xl">
            Browse through our verified doctors, search by name, filter by specialty, and book your appointment in minutes.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]" size={14} />
              <input
                type="text"
                placeholder="Search by doctor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]" size={12} />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full lg:w-52 pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all appearance-none bg-white cursor-pointer"
              >
                <option value="">All Specialties</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full lg:w-44 px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all appearance-none bg-white cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="rating">Top Rated</option>
              <option value="fee_asc">Fee: Low to High</option>
              <option value="fee_desc">Fee: High to Low</option>
            </select>

            {/* Reset */}
            {(searchQuery || selectedSpecialty || sortBy) && (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#78716C] hover:border-[#7C3AED] hover:text-[#7C3AED] transition-all"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-[#78716C]">
            Showing <span className="font-bold text-[#1C1917]">{filteredDoctors.length}</span> {filteredDoctors.length === 1 ? "doctor" : "doctors"}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-[#7C3AED]" />
          </div>
        )}

        {/* No Results */}
        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-[#EDE9FE] flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-[#7C3AED]" size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#1C1917] mb-2">No doctors found</h3>
            <p className="text-sm text-[#78716C] mb-6">
              Try adjusting your search or filters to find what you are looking for.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-semibold rounded-xl transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Doctor Cards Grid */}
        {!loading && filteredDoctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
