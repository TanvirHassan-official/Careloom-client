import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
 
const footerLinks = [
  { href: "/appointments", label: "Appointments" },
  { href: "/appointments/category", label: "Categories" },
  { href: "/dashboard", label: "Dashboard" },
];
 
const socials = [
  { icon: <FaFacebookF size={15} />, href: "https://facebook.com", label: "Facebook" },
  { icon: <FaInstagram size={15} />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaXTwitter size={15} />, href: "https://x.com", label: "X" },
];
 
export default function Footer() {
  return (
    <footer className="bg-[#4C1D95] border-t border-violet-800 mt-auto">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:flex md:justify-between gap-10 items-start">
 
          {/* ── Left: Logo + Description ── */}
          <div className="flex flex-col gap-4 ">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center shadow-md group-hover:bg-violet-400 transition-colors duration-300">
                <span className="text-white font-black text-sm">C</span>
              </div>
              <span className="text-xl font-black text-white group-hover:text-violet-200 transition-colors duration-300">
                Care<span className="text-violet-300">loom</span>
              </span>
            </Link>
            <p className="text-sm text-violet-300 leading-relaxed max-w-xs">
              Book appointments with verified specialists in minutes. Your health, our priority — trusted by thousands of patients across the country.
            </p>
          </div>
 
          {/* ── Middle: Links ── */}
          <div className="flex flex-col gap-4 ">
            <h3 className="text-xs font-bold tracking-widest uppercase text-violet-400">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 list-none">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-violet-200 hover:text-white font-medium flex items-center gap-2 group transition-colors duration-200 w-fit"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-500 group-hover:bg-white transition-colors duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* ── Right: Social Icons ── */}
          <div className="flex flex-col gap-4 ">
            <h3 className="text-xs font-bold tracking-widest uppercase text-violet-400 ">
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 border border-violet-700 text-violet-200 hover:bg-white hover:text-[#4C1D95] hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-violet-900/40"
                >
                  {icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-violet-500">
              Stay connected for health tips & updates.
            </p>
          </div>
 
        </div>
      </div>
 
      {/* Bottom bar */}
      <div className="border-t border-violet-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-violet-500">
            © {new Date().getFullYear()} Careloom. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-violet-500 hover:text-violet-200 transition-colors duration-200">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-violet-500 hover:text-violet-200 transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}