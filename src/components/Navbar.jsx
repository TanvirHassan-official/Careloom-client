"use client";

import { usePathname } from 'next/navigation';
import { useState } from "react";
import Link from "next/link";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { authClient } from '@/lib/auth-client';
import Avatar from './Avatar';

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appointments", label: "All Appointments" },
    { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
    const userData = authClient.useSession();
    const user = userData.data?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isActive = (path) => pathname === path;

    return (
        <div className="sticky top-0 z-50 bg-[#4C1D95] backdrop-blur-md border-b border-violet-800 shadow-lg">
            <nav className="flex justify-between items-center py-3 max-w-7xl mx-auto w-full px-4 sm:px-6">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    {/* <FontAwesomeIcon
                        icon={faHeartPulse}
                        className="text-violet-300 text-2xl group-hover:scale-110 transition-transform duration-300"
                    /> */}
                    <span className="text-xl font-black text-white">
                        Care<span className="text-violet-300">loom</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-1 text-sm">
                    {navLinks.map(({ href, label }) => (
                        <li key={href}>
                            <Link href={href}>
                                <button
                                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive(href)
                                        ? "bg-white text-[#4C1D95] shadow"
                                        : "text-violet-200 hover:bg-violet-700 hover:text-white"
                                        }`}
                                >
                                    {label}
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <>
                            <Avatar />
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm border border-violet-300 text-violet-200 hover:bg-white hover:text-[#4C1D95] hover:border-transparent transition-all duration-300"
                            >
                                {/* <FontAwesomeIcon icon={faRightFromBracket} width={14} /> */}
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/signin">
                                <button className="px-4 py-2 rounded-xl font-semibold text-sm border border-violet-300 text-violet-200 hover:bg-white hover:text-[#4C1D95] hover:border-transparent transition-all duration-300">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="px-4 py-2 rounded-xl font-semibold text-sm bg-white text-[#4C1D95] hover:bg-violet-100 transition-all duration-300 shadow">
                                    Get Started →
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile: avatar (if logged in) + hamburger */}
                <div className="flex md:hidden items-center gap-3">
                    {user && <Avatar />}
                    <button
                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-violet-400 text-violet-200 hover:bg-violet-700 transition-colors duration-300"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown */}
            {open && (
                <div className="md:hidden flex flex-col gap-2 px-4 pb-5 pt-2 border-t border-violet-700 bg-[#4C1D95]">
                    {navLinks.map(({ href, label }) => (
                        <Link key={href} href={href} onClick={() => setOpen(false)}>
                            <button
                                className={`w-full text-left px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isActive(href)
                                    ? "bg-white text-[#4C1D95]"
                                    : "text-violet-200 hover:bg-violet-700 hover:text-white"
                                    }`}
                            >
                                {label}
                            </button>
                        </Link>
                    ))}

                    <div className="h-px w-full bg-violet-700 my-1" />

                    {user ? (
                        <button
                            onClick={() => { handleSignOut(); setOpen(false); }}
                            className="w-full px-4 py-2.5 rounded-xl font-semibold text-sm border border-violet-300 text-violet-200 hover:bg-white hover:text-[#4C1D95] transition-all duration-300 flex items-center gap-2"
                        >
                            {/* <FontAwesomeIcon icon={faRightFromBracket} width={14} /> */}
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <Link href="/signin" onClick={() => setOpen(false)}>
                                <button className="w-full px-4 py-2.5 rounded-xl font-semibold text-sm border border-violet-300 text-violet-200 hover:bg-white hover:text-[#4C1D95] transition-all duration-300">
                                    Sign In
                                </button>
                            </Link>
                            <Link href="/signup" onClick={() => setOpen(false)}>
                                <button className="w-full px-4 py-2.5 rounded-xl font-semibold text-sm bg-white text-[#4C1D95] hover:bg-violet-100 transition-all duration-300 font-bold">
                                    Get Started →
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}