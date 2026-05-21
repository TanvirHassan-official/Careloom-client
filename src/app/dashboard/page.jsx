/* eslint-disable @next/next/no-img-element */
"use client";
 
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import {
  FaEnvelope,
  FaUser,
  FaShieldHalved,
  FaBookOpen,
  FaPen,
  FaGoogle,
} from "react-icons/fa6";
 
export default function DashboardPage() {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  const loading = userData.isPending;
 
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#386FA4]" />
      </div>
    );
  }
 
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
 
  const provider = userData.data?.session?.provider;
 
  return (
    <div className="relative min-h-screen bg-[#4C1D95] px-5 md:px-20 lg:px-40 py-14">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
 
      {/* Page Header */}
      <div className="relative mb-10 space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-px w-8 rounded-full bg-[#a78bfa]" />
          <span className="text-xs font-bold tracking-widest text-[#a78bfa] uppercase">
            My Account
          </span>
        </div>
        <h1 className="text-4xl font-bold text-white">Profile</h1>
      </div>
 
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
 
        {/* ── Left Column ── */}
        <div className="lg:col-span-1 flex flex-col gap-6">
 
          {/* Identity Card */}
          <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center gap-4">
 
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full ring-2 ring-[#386FA4] ring-offset-2 ring-offset-white overflow-hidden">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user?.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-[#386FA4] text-white flex items-center justify-center w-full h-full text-3xl font-bold">
                    {initials}
                  </div>
                )}
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
            </div>
 
            {/* Name & Email */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold text-[#133C55]">
                {user?.name || "Guest User"}
              </h2>
              <p className="text-sm text-gray-500">{user?.email || "—"}</p>
            </div>
 
            {/* Provider badge */}
            {provider === "google" && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-xs text-gray-500">
                <FaGoogle size={11} />
                Google account
              </div>
            )}
 
            {/* Edit button */}
            <Link href="/update-user" className="w-full">
              <button className="btn w-full bg-[#4C1D95] hover:bg-[#a78bfa] text-white rounded-xl border-none gap-2 transition-all duration-300 hover:scale-105">
                <FaPen size={13} />
                Edit Profile
              </button>
            </Link>
          </div>
 
          {/* Account Info Card — beneath identity */}
          <div className="bg-white rounded-3xl shadow-md p-8 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 rounded-full bg-[#a78bfa]" />
              <h3 className="text-xs font-bold tracking-widest text-[#a78bfa] uppercase">
                Account Info
              </h3>
            </div>
 
            <div className="flex flex-col gap-4">
 
              {/* Full Name */}
              <div className="bg-[#a78bfa] rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4C1D95] flex items-center justify-center shrink-0">
                  <FaUser className="text-white" size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">Full Name</p>
                  <p className="font-semibold text-black truncate">
                    {user?.name || "—"}
                  </p>
                </div>
              </div>
 
              {/* Email */}
              <div className="bg-[#a78bfa] rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4C1D95] flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-white" size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                  <p className="font-semibold text-black break-all text-sm">
                    {user?.email || "—"}
                  </p>
                </div>
              </div>
 
              {/* Account ID */}
              <div className="bg-[#a78bfa] rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4C1D95] flex items-center justify-center shrink-0">
                  <FaShieldHalved className="text-white" size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">Account ID</p>
                  <p className="font-mono text-sm text-black break-all leading-relaxed">
                    {user?.id || "—"}
                  </p>
                </div>
              </div>
 
            </div>
          </div>
        </div>
 
        {/* ── Right Column ── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
 
          {/*Dashboard Activity */}
          <div className="bg-white rounded-3xl shadow-md p-8 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 rounded-full bg-[#a78bfa]" />
              <h3 className="text-xs font-bold tracking-widest text-[#a78bfa] uppercase">
                Dashboard
              </h3>
            </div>
 
            <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#4C1D95] flex items-center justify-center">
                <FaBookOpen className="text-white" size={28} />
              </div>
              <p className="text-[#133C55] font-semibold">No appointment taken yet</p>
              <p className="text-sm text-gray-400 max-w-xs">
                Take appointments of our doctors easily.
              </p>
              <Link href="/appointments">
                <button className="btn bg-[#4C1D95] hover:bg-[#a78bfa] text-white rounded-xl border-none transition-all duration-300 hover:scale-105">
                  Browse Doctors →
                </button>
              </Link>
            </div>
          </div>
 
        </div>
      </div>
    </div>
  );
}