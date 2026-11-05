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
        <nav aria-label="Main navigation" className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="text-2xl font-bold focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300">
                CareerPilot AI
            </Link>

            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300 md:gap-6">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            className={`rounded-sm underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 ${isActive ? "font-semibold text-blue-300 underline" : ""}`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
