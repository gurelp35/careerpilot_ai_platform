"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useMemo, useState } from "react";
type SectorInsight = {
    id: string;
    title: string;
    category: string;
    overview: string;
    keySkills: string[];
    interviewFocus: string[];
    projectAngle: string;
    preparationTasks: string[];
};

const sectorInsights: SectorInsight[] = [
    {
        id: "technology-ai",
        title: "Technology & AI",
        category: "Software products and intelligent digital tools",
        overview:
            "This pathway focuses on building digital products, solving technical problems and creating useful tools with modern web technologies.",
        keySkills: ["JavaScript", "TypeScript", "React", "Next.js", "APIs"],
        interviewFocus: ["Technical projects", "Problem solving", "Learning mindset"],
        projectAngle:
            "CareerPilot AI demonstrates initiative, frontend development, structured problem solving and product thinking.",
        preparationTasks: [
            "Prepare one technical project explanation using STAR.",
            "Explain how React components, state and localStorage are used.",
            "Practise describing how the user problem shaped the design.",
        ],
    },
    {
        id: "finance-digital",
        title: "Finance & Digital Services",
        category: "Secure platforms, data handling and customer-focused systems",
        overview:
            "This pathway focuses on accuracy, trust, secure data handling and creating digital services that support customers.",
        keySkills: ["SQL", "Data privacy", "Accessibility", "Accuracy", "Communication"],
        interviewFocus: ["Trust", "Attention to detail", "Customer impact"],
        projectAngle:
            "CareerPilot AI shows organised data handling, application tracking, notes and deadline management.",
        preparationTasks: [
            "Prepare an example about accuracy and responsible data handling.",
            "Explain why accessibility and clear design matter.",
            "Practise describing how the dashboard reduces user stress.",
        ],
    },
    {
        id: "telecommunications",
        title: "Telecommunications & Connectivity",
        category: "Digital services, networks and customer experience",
        overview:
            "This pathway focuses on digital transformation, service reliability, communication and customer-facing technology.",
        keySkills: ["Digital platforms", "Data", "APIs", "Teamwork", "Communication"],
        interviewFocus: ["Customer impact", "Adaptability", "Collaboration"],
        projectAngle:
            "CareerPilot AI demonstrates dashboard workflows, progress tracking and clear user journeys.",
        preparationTasks: [
            "Prepare a teamwork example.",
            "Explain how digital tools can improve user experience.",
            "Practise discussing how you adapted your project after testing.",
        ],
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity & Public Sector",
        category: "Security awareness, privacy and responsible technology",
        overview:
            "This pathway focuses on protecting information, ethical thinking, careful documentation and analytical problem solving.",
        keySkills: ["Security awareness", "Data privacy", "Analytical thinking", "Documentation"],
        interviewFocus: ["Integrity", "Carefulness", "Problem solving"],
        projectAngle:
            "CareerPilot AI can be discussed as a tool that organises personal application data carefully and transparently.",
        preparationTasks: [
            "Prepare an example about handling information responsibly.",
            "Explain how you would improve data privacy in a future version.",
            "Practise discussing risks and limitations honestly.",
        ],
    },
    {
        id: "engineering-digital",
        title: "Engineering & Digital Transformation",
        category: "Systems thinking, planning and practical digital solutions",
        overview:
            "This pathway focuses on structured thinking, planning, delivery, deadlines and improving real-world processes with digital tools.",
        keySkills: ["Problem solving", "Project planning", "Data", "Agile", "Communication"],
        interviewFocus: ["Organisation", "Teamwork", "Practical impact"],
        projectAngle:
            "CareerPilot AI demonstrates planning, tracking, priorities, deadlines and structured project delivery.",
        preparationTasks: [
            "Prepare an example about planning and organisation.",
            "Explain how the tracker helps users manage deadlines.",
            "Practise describing the project as an MVP.",
        ],
    },
    {
        id: "data-cloud",
        title: "Data & Cloud",
        category: "Data workflows, cloud awareness and scalable systems",
        overview:
            "This pathway focuses on data, APIs, cloud fundamentals and understanding how systems exchange information.",
        keySkills: ["SQL", "APIs", "Cloud fundamentals", "Data analysis", "Problem solving"],
        interviewFocus: ["Curiosity", "Technical learning", "Data thinking"],
        projectAngle:
            "CareerPilot AI includes job description analysis, readiness scoring and structured user data.",
        preparationTasks: [
            "Practise explaining how data is stored in localStorage.",
            "Complete one cloud fundamentals learning note.",
            "Prepare an example of how APIs could improve the project.",
        ],
    },
    {
        id: "ux-product",
        title: "UX & Product Design",
        category: "User-centred design, accessibility and digital experience",
        overview:
            "This pathway focuses on understanding user needs, designing clear interfaces and improving usability through feedback.",
        keySkills: ["UX", "Accessibility", "User research", "Frontend", "Product thinking"],
        interviewFocus: ["User needs", "Design decisions", "Iteration"],
        projectAngle:
            "CareerPilot AI shows user-centred design because it solves a real student problem: managing applications and preparation.",
        preparationTasks: [
            "Prepare an explanation of your design choices.",
            "Explain how accessibility influenced the interface.",
            "Practise describing how you would improve the product after user feedback.",
        ],
    },
];

const categories = [
    "All",
    "Software products and intelligent digital tools",
    "Secure platforms, data handling and customer-focused systems",
    "Digital services, networks and customer experience",
    "Security awareness, privacy and responsible technology",
    "Systems thinking, planning and practical digital solutions",
    "Data workflows, cloud awareness and scalable systems",
    "User-centred design, accessibility and digital experience",
];

export default function SectorsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [favouriteIds, setFavouriteIds] = useState<string[]>([]);

    useEffect(() => {
        const savedFavourites = localStorage.getItem("careerPilotFavouriteSectors");

        if (savedFavourites) {
            setFavouriteIds(JSON.parse(savedFavourites));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "careerPilotFavouriteSectors",
            JSON.stringify(favouriteIds)
        );
    }, [favouriteIds]);

    const filteredSectors = useMemo(() => {
        return sectorInsights.filter((sector) => {
            const matchesCategory =
                selectedCategory === "All" || sector.category === selectedCategory;

            const searchableText = `${sector.title} ${sector.category} ${sector.overview
                } ${sector.keySkills.join(" ")}`.toLowerCase();

            const matchesSearch = searchableText.includes(searchTerm.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchTerm]);

    const favouriteSectors = sectorInsights.filter((sector) =>
        favouriteIds.includes(sector.id)
    );

    function toggleFavourite(sectorId: string) {
        setFavouriteIds((currentIds) => {
            if (currentIds.includes(sectorId)) {
                return currentIds.filter((id) => id !== sectorId);
            }

            return [...currentIds, sectorId];
        });
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <section className="mx-auto max-w-7xl px-6 py-8">
                <Navbar />

                <section className="mb-10">
                    <p className="mb-3 text-sm font-semibold text-blue-300">
                        Sector Insights
                    </p>

                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                        Explore digital career pathways across technology sectors.
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-400">
                        Compare career sectors, understand common skill expectations, save
                        favourite pathways and connect your CareerPilot AI project to
                        interview examples.
                    </p>
                </section>

                <section className="mb-10">
                    <p className="mb-3 text-sm font-semibold text-blue-300">
                        Sector Insights
                    </p>
                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                        Explore digital career pathways without targeting specific companies.
                    </h1>
                    <p className="mt-4 max-w-2xl text-slate-400">
                        Compare career sectors, understand common skill expectations, save
                        favourite pathways and connect your CareerPilot AI project to
                        interview examples.
                    </p>
                </section>

                <section className="mb-8 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <p className="text-3xl font-bold text-blue-300">
                            {sectorInsights.length}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">Career Pathways</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <p className="text-3xl font-bold text-emerald-300">
                            {favouriteIds.length}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">Saved Pathways</p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <p className="text-3xl font-bold text-purple-300">
                            {categories.length - 1}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">Focus Areas</p>
                    </div>
                </section>

                <section className="mb-8 grid gap-4 lg:grid-cols-[1fr_360px]">
                    <div>
                        <input
                            type="search"
                            placeholder="Search sectors, skills or preparation focus..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                        />

                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selectedCategory === category
                                            ? "border-blue-400 bg-blue-500 text-white"
                                            : "border-slate-700 bg-slate-900 text-slate-300 hover:border-blue-400 hover:text-white"
                                        }`}
                                >
                                    {category === "All" ? "All" : category.split(",")[0]}
                                </button>
                            ))}
                        </div>
                    </div>

                    <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                        <h2 className="mb-4 text-xl font-bold">Saved Pathways</h2>

                        {favouriteSectors.length === 0 ? (
                            <p className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-500">
                                Saved career pathways will appear here.
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {favouriteSectors.map((sector) => (
                                    <div
                                        key={sector.id}
                                        className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                                    >
                                        <p className="font-semibold text-white">{sector.title}</p>
                                        <p className="text-sm text-slate-500">{sector.category}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </aside>
                </section>

                <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredSectors.map((sector) => {
                        const isFavourite = favouriteIds.includes(sector.id);

                        return (
                            <article
                                key={sector.id}
                                className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
                            >
                                <div className="mb-5 flex items-start justify-between gap-4">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-blue-300">
                                            {sector.category}
                                        </p>
                                        <h2 className="text-2xl font-bold">{sector.title}</h2>
                                    </div>

                                    <button
                                        onClick={() => toggleFavourite(sector.id)}
                                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isFavourite
                                                ? "bg-pink-500 text-white"
                                                : "border border-slate-700 text-slate-300 hover:border-pink-400 hover:text-white"
                                            }`}
                                    >
                                        {isFavourite ? "♥ Saved" : "♡ Save"}
                                    </button>
                                </div>

                                <p className="mb-5 leading-7 text-slate-400">
                                    {sector.overview}
                                </p>

                                <div className="mb-5">
                                    <h3 className="mb-3 font-semibold text-slate-200">
                                        Key Skills
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {sector.keySkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h3 className="mb-3 font-semibold text-slate-200">
                                        Interview Focus
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {sector.interviewFocus.map((focus) => (
                                            <span
                                                key={focus}
                                                className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300"
                                            >
                                                {focus}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                                    <h3 className="mb-2 font-semibold text-slate-200">
                                        CareerPilot AI Angle
                                    </h3>
                                    <p className="text-sm leading-6 text-slate-400">
                                        {sector.projectAngle}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                                    <h3 className="mb-3 font-semibold text-slate-200">
                                        Preparation Tasks
                                    </h3>

                                    <ul className="space-y-2 text-sm leading-6 text-slate-400">
                                        {sector.preparationTasks.map((task) => (
                                            <li key={task}>• {task}</li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        );
                    })}
                </section>

                {filteredSectors.length === 0 && (
                    <p className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center text-slate-400">
                        No sector insights match your search.
                    </p>
                )}
            </section>
        </main>
    );
}