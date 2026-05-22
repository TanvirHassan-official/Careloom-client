"use client";
import GoogleLogin from "@/components/GoogleLogin";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SignUpPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const validatePassword = (password) => {
        if (password.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(password)) return "Password must contain at least 1 uppercase letter";
        if (!/[a-z]/.test(password)) return "Password must contain at least 1 lowercase letter";
        return null;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const image = formData.get("image");
        const email = formData.get("email");
        const password = formData.get("password");

        const validationError = validatePassword(password);
        if (validationError) {
            setErrorMsg(validationError);
            return;
        }

        setLoading(true);
        setErrorMsg("");

        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            image,
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message || "Something went wrong. Try again.");
            toast.error(error.message || "Signup failed");
            return;
        }

        toast.success(`Welcome, ${name}! Account created successfully.`);
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-sm">C</span>
                        </div>
                        <span className="text-xl font-black text-[#1C1917]">
                            Care<span className="text-[#7C3AED]">loom</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] px-8 py-10">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="inline-flex items-center gap-2 bg-[#EDE9FE] text-[#7C3AED] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            ✦ Create Account
                        </div>
                        <h1 className="text-2xl font-bold text-[#1C1917] mb-1">
                            Join Careloom today
                        </h1>
                        <p className="text-sm text-[#78716C]">
                            Already have an account?{" "}
                            <Link href="/signin" className="text-[#7C3AED] hover:text-[#5B21B6] font-semibold transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="flex flex-col gap-5">

                        {/* Name */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-[#1C1917]">
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#1C1917] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-[#1C1917]">
                                Profile Image URL
                            </label>
                            <input
                                name="image"
                                type="url"
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#1C1917] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-[#1C1917]">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#1C1917] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-[#1C1917]">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Min. 6 characters"
                                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#1C1917] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#EDE9FE] transition-all"
                                required
                            />
                            <p className="text-xs text-[#78716C]">
                                At least 6 characters with 1 uppercase & 1 lowercase letter
                            </p>
                        </div>

                        {/* Error */}
                        {errorMsg && (
                            <div className="flex items-start gap-2 bg-red-50 border border-[#DC2626]/20 text-[#DC2626] text-sm rounded-xl px-4 py-3">
                                <span className="mt-0.5">⚠</span>
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        {/* Submit */}
                        <div className="flex gap-3 mt-1">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-2.5 px-4 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm" />
                                ) : (
                                    "Create Account →"
                                )}
                            </button>
                            <button
                                type="reset"
                                disabled={loading}
                                className="py-2.5 px-4 border border-[#E5E7EB] text-[#78716C] hover:border-[#7C3AED] hover:text-[#7C3AED] font-semibold rounded-xl transition-all duration-300"
                            >
                                Reset
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-[#E5E7EB]" />
                        <span className="text-xs text-[#78716C] font-medium">or continue with</span>
                        <div className="flex-1 h-px bg-[#E5E7EB]" />
                    </div>

                    <GoogleLogin />
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[#78716C] mt-6">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="text-[#7C3AED] hover:underline">Terms</Link>
                    {" & "}
                    <Link href="/privacy" className="text-[#7C3AED] hover:underline">Privacy Policy</Link>
                </p>
            </div>
        </div>
    );
}