/* eslint-disable react-hooks/set-state-in-effect */
"use client";
 
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import {
  FaStar, FaStethoscope, FaLocationDot, FaClock,
  FaHospital, FaMoneyBillWave, FaUser, FaPhone,
  FaCalendarDays, FaXmark,
} from "react-icons/fa6";
 
export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
 
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });
 
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`)
      .then((r) => r.json())
      .then((d) => { setDoctor(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);
 
  // Pre-fill name from session
  useEffect(() => {
    if (user?.name) setForm((f) => ({ ...f, patientName: user.name }));
  }, [user]);
 
  const handleBookClick = () => {
    if (!user) { router.push("/signin"); return; }
    setModalOpen(true);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.appointmentDate || !form.appointmentTime) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setBooking(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          doctorId: doctor._id,
          doctorName: doctor.name,
          doctorSpecialty: doctor.specialty,
          doctorImage: doctor.image,
          ...form,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Appointment booked successfully!");
      setModalOpen(false);
      setForm({ patientName: user?.name || "", gender: "Male", phone: "", appointmentDate: "", appointmentTime: "" });
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setBooking(false);
    }
  };
 
  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-spinner loading-lg text-[#7C3AED]" />
    </div>
  );
 
  if (!doctor) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-xl font-bold text-[#1C1917]">Doctor not found.</p>
      <button onClick={() => router.back()} className="px-5 py-2 bg-[#7C3AED] text-white rounded-xl font-semibold">Go Back</button>
    </div>
  );
 
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4">
      <div className="max-w-5xl mx-auto">
 
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-[#78716C] hover:text-[#7C3AED] transition-colors font-semibold"
        >
          ← Back
        </button>
 
        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-sm mb-6">
          <div className="h-36 bg-linear-to-br from-[#4C1D95] to-[#7C3AED]" />
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-14 mb-6">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg shrink-0">
                <Image src={doctor.image} alt={doctor.name} width={112} height={112} className="object-cover w-full h-full" />
              </div>
              <div className="sm:pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-black text-[#1C1917]">{doctor.name}</h1>
                  <span className="flex items-center gap-1 bg-[#EDE9FE] px-2.5 py-0.5 rounded-full text-xs font-bold text-[#5B21B6]">
                    <FaStar size={10} className="text-yellow-500" /> {doctor.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaStethoscope className="text-[#7C3AED]" size={13} />
                  <span className="text-[#7C3AED] font-semibold text-sm">{doctor.specialty}</span>
                </div>
              </div>
            </div>
 
            {/* Info grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: <FaHospital />, label: "Hospital", value: doctor.hospital },
                { icon: <FaLocationDot />, label: "Location", value: doctor.location },
                { icon: <FaClock />, label: "Experience", value: doctor.experience },
                { icon: <FaMoneyBillWave />, label: "Fee", value: `৳${doctor.fee}` },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-[#FAFAFA] rounded-2xl border border-[#E5E7EB] p-4 flex flex-col gap-1">
                  <div className="text-[#7C3AED] text-sm">{icon}</div>
                  <p className="text-xs text-[#78716C]">{label}</p>
                  <p className="text-sm font-bold text-[#1C1917] leading-tight">{value}</p>
                </div>
              ))}
            </div>
 
            {/* Availability */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-2">Availability</p>
              <div className="flex flex-wrap gap-2">
                {doctor.availability?.map((slot, i) => (
                  <span key={i} className="text-sm bg-[#EDE9FE] text-[#5B21B6] font-medium px-3 py-1.5 rounded-full">
                    {slot}
                  </span>
                ))}
              </div>
            </div>
 
            {/* Description */}
            {doctor.description && (
              <div className="mb-6 bg-[#F5F3FF] rounded-2xl p-5 border border-[#EDE9FE]">
                <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-wider mb-2">About</p>
                <p className="text-sm text-[#1C1917] leading-relaxed">{doctor.description}</p>
              </div>
            )}
 
            {/* Book Button */}
            <button
              onClick={handleBookClick}
              className="w-full sm:w-auto px-8 py-3 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-[#7C3AED]/30 text-sm"
            >
              📅 Book Appointment
            </button>
          </div>
        </div>
      </div>
 
      {/* ── Booking Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#E5E7EB] w-full max-w-md p-8 relative">
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl text-[#78716C] hover:bg-[#EDE9FE] hover:text-[#7C3AED] transition-all"
            >
              <FaXmark size={16} />
            </button>
 
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                ✦ Book Appointment
              </div>
              <h2 className="text-xl font-bold text-[#1C1917]">{doctor.name}</h2>
              <p className="text-sm text-[#78716C]">{doctor.specialty} · ৳{doctor.fee} per visit</p>
            </div>
 
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Patient Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
                  <FaUser size={11} className="text-[#7C3AED]" /> Patient Name
                </label>
                <input
                  type="text"
                  value={form.patientName}
                  onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                  placeholder="Full name"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                />
              </div>
 
              {/* Gender */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1C1917]">Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all bg-white"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
 
              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
                  <FaPhone size={11} className="text-[#7C3AED]" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                />
              </div>
 
              {/* Date & Time — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#1C1917] flex items-center gap-1.5">
                    <FaCalendarDays size={11} className="text-[#7C3AED]" /> Date
                  </label>
                  <input
                    type="date"
                    value={form.appointmentDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#1C1917]">Time</label>
                  <select
                    value={form.appointmentTime}
                    onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all bg-white"
                  >
                    <option value="">Select</option>
                    {doctor.availability?.map((slot, i) => (
                      <option key={i} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
 
              {/* Email (read-only) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#1C1917]">Email (read-only)</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#78716C] bg-[#FAFAFA] cursor-not-allowed"
                />
              </div>
 
              {/* Submit */}
              <button
                type="submit"
                disabled={booking}
                className="w-full py-3 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 mt-1"
              >
                {booking ? <span className="loading loading-spinner loading-sm" /> : "Confirm Booking →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}