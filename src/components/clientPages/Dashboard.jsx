/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
    FaEnvelope, FaUser, FaShieldHalved, FaBookOpen,
    FaPen, FaGoogle, FaTrash, FaXmark, FaCalendarDays,
    FaClock, FaPhone,
} from "react-icons/fa6";

export default function DashboardPage() {
    const router = useRouter();
    const userData = authClient.useSession();
    const user = userData.data?.user;
    const loading = userData.isPending;

    const [activeTab, setActiveTab] = useState("bookings");
    const [appointments, setAppointments] = useState([]);
    const [apptLoading, setApptLoading] = useState(true);

    // Update appointment modal
    const [editAppt, setEditAppt] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [updating, setUpdating] = useState(false);

    // Update profile modal
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: "", image: "" });
    const [updatingProfile, setUpdatingProfile] = useState(false);



    // Fetch appointments
    useEffect(() => {
        
        if (!user?.email) return;
        setApptLoading(true);
        
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments?email=${user.email}`)
            .then((r) => r.json())
            .then((d) => { setAppointments(Array.isArray(d) ? d : []); setApptLoading(false); })
            .catch(() => setApptLoading(false));
    }, [user]);

    // Pre-fill profile form
    useEffect(() => {
        if (user) setProfileForm({ name: user.name || "", image: user.image || "" });
    }, [user]);

    // ── Delete appointment ──
    const handleDelete = async (id) => {
        const { data: tokenData } = await authClient.token()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                }
            });
            if (!res.ok) throw new Error();
            setAppointments((prev) => prev.filter((a) => a._id !== id));
            toast.error("Appointment has been deleted!");
        } catch {
            toast.error("Failed to delete appointment.");
        }
    };

    // ── Open update modal ──
    const openEdit = (appt) => {
        setEditAppt(appt);
        setEditForm({
            patientName: appt.patientName,
            gender: appt.gender,
            phone: appt.phone,
            appointmentDate: appt.appointmentDate,
            appointmentTime: appt.appointmentTime,
        });
    };

    // ── Submit update ──
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${editAppt._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
                authorization: `Bearer ${tokenData?.token}`
            });
            if (!res.ok) throw new Error();
            setAppointments((prev) =>
                prev.map((a) => a._id === editAppt._id ? { ...a, ...editForm } : a)
            );
            toast.success("Appointment updated successfully!");
            setEditAppt(null);
        } catch {
            toast.error("Failed to update appointment.");
        } finally {
            setUpdating(false);
        }
    };

    // ── Update profile ──
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setUpdatingProfile(true);
        try {
            await authClient.updateUser({ name: profileForm.name, image: profileForm.image });
            toast.success("Profile updated successfully!");
            setProfileModalOpen(false);
        } catch {
            toast.error("Failed to update profile.");
        } finally {
            setUpdatingProfile(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-[#7C3AED]" />
        </div>
    );

    const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const provider = userData.data?.session?.provider;

    return (
        <div className="relative min-h-screen bg-[#4C1D95] px-4 sm:px-8 md:px-20 lg:px-40 py-14">
            {/* BG grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

            {/* Header */}
            <div className="relative mb-10 space-y-1">
                <div className="flex items-center gap-2">
                    <div className="h-px w-8 rounded-full bg-[#a78bfa]" />
                    <span className="text-xs font-bold tracking-widest text-[#a78bfa] uppercase">My Account</span>
                </div>
                <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── LEFT: Identity ── */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full ring-2 ring-[#386FA4] ring-offset-2 overflow-hidden">
                                {user?.image ? (
                                    <img src={user.image} alt={user?.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="bg-[#7C3AED] text-white flex items-center justify-center w-full h-full text-3xl font-bold">{initials}</div>
                                )}
                            </div>
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                        </div>
                        <div className="text-center space-y-1">
                            <h2 className="text-2xl font-bold text-[#133C55]">{user?.name || "Guest"}</h2>
                            <p className="text-sm text-gray-500">{user?.email || "—"}</p>
                        </div>
                        {provider === "google" && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-500">
                                <FaGoogle size={11} /> Google account
                            </div>
                        )}
                        <button
                            onClick={() => setProfileModalOpen(true)}
                            className="btn w-full bg-[#4C1D95] hover:bg-[#a78bfa] text-white rounded-xl border-none gap-2 transition-all duration-300 hover:scale-105"
                        >
                            <FaPen size={13} /> Edit Profile
                        </button>
                    </div>

                    {/* Account Info */}
                    <div className="hidden lg:grid bg-white rounded-3xl shadow-md p-8 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-8 rounded-full bg-[#a78bfa]" />
                            <h3 className="text-xs font-bold tracking-widest text-[#a78bfa] uppercase">Account Info</h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                { icon: <FaUser />, label: "Full Name", value: user?.name },
                                { icon: <FaEnvelope />, label: "Email Address", value: user?.email },
                                { icon: <FaShieldHalved />, label: "Account ID", value: user?.id, mono: true },
                            ].map(({ icon, label, value, mono }) => (
                                <div key={label} className="bg-[#a78bfa] rounded-2xl p-5 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#4C1D95] flex items-center justify-center shrink-0 text-white text-sm">{icon}</div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                                        <p className={`font-semibold text-black break-all text-sm ${mono ? "font-mono" : ""}`}>{value || "—"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Tabs ── */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Tab buttons */}
                    <div className="flex gap-2">
                        {[
                            { key: "bookings", label: "My Bookings" },
                            { key: "profile", label: "My Profile" },
                        ].map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === key ? "bg-white text-[#4C1D95] shadow" : "text-violet-200 hover:bg-violet-700 hover:text-white border border-violet-400"}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* ── My Bookings ── */}
                    {activeTab === "bookings" && (
                        <div className="bg-white rounded-3xl shadow-md p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-px w-8 rounded-full bg-[#a78bfa]" />
                                <h3 className="text-xs font-bold tracking-widest text-[#a78bfa] uppercase">My Bookings</h3>
                            </div>

                            {apptLoading && <div className="flex justify-center py-12"><span className="loading loading-spinner loading-lg text-[#7C3AED]" /></div>}

                            {!apptLoading && appointments.length === 0 && (
                                <div className="flex flex-col items-center py-12 gap-4 text-center">
                                    <div className="w-16 h-16 rounded-full bg-[#4C1D95] flex items-center justify-center">
                                        <FaBookOpen className="text-white" size={28} />
                                    </div>
                                    <p className="text-[#133C55] font-semibold">No appointments yet</p>
                                    <p className="text-sm text-gray-400 max-w-xs">Book your first appointment with one of our doctors.</p>
                                    <Link href="/appointments">
                                        <button className="btn bg-[#4C1D95] hover:bg-[#a78bfa] text-white rounded-xl border-none transition-all">Browse Doctors →</button>
                                    </Link>
                                </div>
                            )}

                            {!apptLoading && appointments.length > 0 && (
                                <div className="flex flex-col gap-4">
                                    {appointments.map((appt) => (
                                        <div key={appt._id} className="bg-[#FAFAFA] rounded-2xl border border-[#E5E7EB] p-5 flex flex-col sm:flex-row gap-4 sm:items-center">
                                            <div className="flex-1 flex flex-col gap-1.5">
                                                <p className="font-bold text-[#1C1917] text-sm">{appt.doctorName}</p>
                                                <p className="text-xs text-[#7C3AED] font-semibold">{appt.doctorSpecialty}</p>
                                                <div className="flex flex-wrap gap-3 mt-1">
                                                    <span className="flex items-center gap-1 text-xs text-[#78716C]">
                                                        <FaCalendarDays size={10} /> {appt.appointmentDate}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-[#78716C]">
                                                        <FaClock size={10} /> {appt.appointmentTime}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-[#78716C]">
                                                        <FaUser size={10} /> {appt.patientName}
                                                    </span>
                                                    {appt.phone && (
                                                        <span className="flex items-center gap-1 text-xs text-[#78716C]">
                                                            <FaPhone size={10} /> {appt.phone}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <button
                                                    onClick={() => openEdit(appt)}
                                                    className="px-3 py-2 bg-[#EDE9FE] text-[#5B21B6] hover:bg-[#7C3AED] hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5"
                                                >
                                                    <FaPen size={10} /> Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(appt._id)}
                                                    className="px-3 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5"
                                                >
                                                    <FaTrash size={10} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── My Profile ── */}
                    {activeTab === "profile" && (
                        <div className="bg-white rounded-3xl shadow-md p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-px w-8 rounded-full bg-[#a78bfa]" />
                                <h3 className="text-xs font-bold tracking-widest text-[#a78bfa] uppercase">My Profile</h3>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center gap-5">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#EDE9FE] shrink-0">
                                        {user?.image ? (
                                            <img src={user.image} alt={user?.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="bg-[#7C3AED] text-white flex items-center justify-center w-full h-full text-2xl font-bold">{initials}</div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#1C1917] text-lg">{user?.name}</p>
                                        <p className="text-sm text-[#78716C]">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="h-px bg-[#E5E7EB]" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { label: "Full Name", value: user?.name },
                                        { label: "Email Address", value: user?.email },
                                        { label: "Account ID", value: user?.id, mono: true },
                                    ].map(({ label, value, mono }) => (
                                        <div key={label} className="flex flex-col gap-1">
                                            <span className="text-xs text-[#78716C] font-semibold uppercase tracking-wider">{label}</span>
                                            <span className={`text-sm text-[#1C1917] font-semibold break-all ${mono ? "font-mono" : ""}`}>{value || "—"}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setProfileModalOpen(true)}
                                    className="self-start px-6 py-2.5 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-semibold rounded-xl transition-all duration-300 text-sm flex items-center gap-2"
                                >
                                    <FaPen size={12} /> Update Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Update Appointment Modal ── */}
            {editAppt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl border border-[#E5E7EB] w-full max-w-md p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setEditAppt(null)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl text-[#78716C] hover:bg-[#EDE9FE] hover:text-[#7C3AED] transition-all">
                            <FaXmark size={16} />
                        </button>
                        <div className="mb-5">
                            <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                ✦ Update Appointment
                            </div>
                            <h2 className="text-xl font-bold text-[#1C1917]">{editAppt.doctorName}</h2>
                            <p className="text-sm text-[#78716C]">{editAppt.doctorSpecialty}</p>
                        </div>
                        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                            {/* Doctor name (read-only) */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-[#1C1917]">Doctor (read-only)</label>
                                <input readOnly value={editAppt.doctorName} className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#78716C] bg-[#FAFAFA] cursor-not-allowed" />
                            </div>
                            {/* Email (read-only) */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-[#1C1917]">Email (read-only)</label>
                                <input readOnly value={user?.email || ""} className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#78716C] bg-[#FAFAFA] cursor-not-allowed" />
                            </div>
                            {/* Editable fields */}
                            {[
                                { key: "patientName", label: "Patient Name", type: "text" },
                                { key: "phone", label: "Phone Number", type: "tel" },
                                { key: "appointmentDate", label: "Appointment Date", type: "date" },
                            ].map(({ key, label, type }) => (
                                <div key={key} className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-[#1C1917]">{label}</label>
                                    <input
                                        type={type}
                                        value={editForm[key] || ""}
                                        onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                                    />
                                </div>
                            ))}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-[#1C1917]">Gender</label>
                                <select value={editForm.gender || "Male"} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all bg-white">
                                    <option>Male</option><option>Female</option><option>Other</option>
                                </select>
                            </div>
                            <button type="submit" disabled={updating} className="w-full py-3 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 sticky bottom-0">
                                {updating ? <span className="loading loading-spinner loading-sm" /> : "Save Changes →"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Update Profile Modal ── */}
            {profileModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl border border-[#E5E7EB] w-full max-w-md p-8 relative">
                        <button onClick={() => setProfileModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-xl text-[#78716C] hover:bg-[#EDE9FE] hover:text-[#7C3AED] transition-all">
                            <FaXmark size={16} />
                        </button>
                        <div className="mb-6">
                            <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                ✦ Update Profile
                            </div>
                            <h2 className="text-xl font-bold text-[#1C1917]">Edit your info</h2>
                        </div>
                        <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-[#1C1917]">Full Name</label>
                                <input
                                    type="text"
                                    value={profileForm.name}
                                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-[#1C1917]">Photo URL</label>
                                <input
                                    type="url"
                                    value={profileForm.image}
                                    onChange={(e) => setProfileForm({ ...profileForm, image: e.target.value })}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm text-[#1C1917] placeholder-[#78716C] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                                />
                            </div>
                            <button type="submit" disabled={updatingProfile} className="w-full py-3 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60">
                                {updatingProfile ? <span className="loading loading-spinner loading-sm" /> : "Save Profile →"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}