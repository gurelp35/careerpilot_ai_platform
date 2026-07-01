"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "JD Analyser", href: "/analyser" },
    { label: "Interview Prep", href: "/interview" },
    { label: "Sector Insights", href: "/sectors" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="mb-12 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
                CareerPilot AI
            </Link>

            <div className="hidden gap-6 text-sm text-slate-300 md:flex">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={isActive ? "text-blue-300" : "hover:text-white"}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}