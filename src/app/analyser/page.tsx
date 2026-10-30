"use client";

import Navbar from "@/components/Navbar";
import { skillDefinitions, userSkills } from "@/data/skills";
import { detectSkills } from "@/lib/skillDetection";
import { useMemo, useState } from "react";


function getSkillAdvice(skill: string) {
    const advice: Record<string, string> = {
        API: "Build a small project using fetch API and explain how data moves between systems.",
        Cloud:
            "Complete a cloud fundamentals learning note and add one cloud-related example to your portfolio.",
        "Next.js":
            "Explain how this project uses Next.js routing, reusable pages and TypeScript.",
        React:
            "Practise explaining components, state management and reusable UI design.",
        TypeScript:
            "Prepare a short explanation of how TypeScript improves code quality.",
        SQL: "Prepare one example explaining how structured data could be stored in a database.",
    };

    return advice[skill] ?? `Prepare one interview example showing how you are improving ${skill}.`;
}

function SkillTag({
    skill,
    variant,
}: {
    skill: string;
    variant: "detected" | "matched" | "missing";
}) {
    const styles = {
        detected: "bg-blue-500/10 text-blue-300 border-blue-500/20",
        matched: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
        missing: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    };

    return (
        <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles[variant]}`}
        >
            {skill}
        </span>
    );
}

export default function AnalyserPage() {
    const [jobDescription, setJobDescription] = useState("");
    const [hasAnalysed, setHasAnalysed] = useState(false);
    const [detectedSkills, setDetectedSkills] = useState<string[]>([]);

    const matchingSkills = useMemo(() => {
        return detectedSkills.filter((skill) => userSkills.includes(skill));
    }, [detectedSkills]);

    const missingSkills = useMemo(() => {
        return detectedSkills.filter((skill) => !userSkills.includes(skill));
    }, [detectedSkills]);

    const readinessScore = useMemo(() => {
        if (detectedSkills.length === 0) {
            return 0;
        }

        return Math.round((matchingSkills.length / detectedSkills.length) * 100);
    }, [detectedSkills.length, matchingSkills.length]);

    const readinessLabel =
        readinessScore >= 80
            ? "Strong Match"
            : readinessScore >= 60
                ? "Developing Match"
                : "Needs Preparation";

    function handleAnalyse() {
        const skills = detectSkills(jobDescription, skillDefinitions);
        setDetectedSkills(skills);
        setHasAnalysed(true);
    }

    function loadExampleDescription() {
        setJobDescription(
            "We are looking for a motivated software engineering intern with experience in JavaScript, TypeScript, React, HTML, CSS, SQL, GitHub, Agile teamwork, API development, Cloud platforms and strong communication skills."
        );
        setHasAnalysed(false);
        setDetectedSkills([]);
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <section className="mx-auto max-w-7xl px-6 py-8">
                <Navbar />

                <section className="mb-10">
                    <p className="mb-3 text-sm font-semibold text-blue-300">
                        Job Description Analyser
                    </p>

                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                        Understand role requirements faster.
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-400">
                        Paste a job description to detect key technical and professional
                        skills, compare them with your current profile and generate a
                        focused preparation plan.
                    </p>
                </section>

                <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">Paste Job Description</h2>

                            <button
                                type="button"
                                onClick={loadExampleDescription}
                                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
                            >
                                Load Example
                            </button>
                        </div>

                        <textarea
                            value={jobDescription}
                            onChange={(event) => setJobDescription(event.target.value)}
                            placeholder="Paste the job description here..."
                            className="min-h-72 w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                        />

                        <button
                            type="button"
                            onClick={handleAnalyse}
                            className="mt-5 rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
                        >
                            Analyse Description
                        </button>
                    </div>

                    <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="mb-6 text-2xl font-bold">Analysis Results</h2>

                        <div className="mb-6">
                            <h3 className="mb-3 font-semibold text-slate-200">
                                Detected Skills
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {hasAnalysed && detectedSkills.length > 0 ? (
                                    detectedSkills.map((skill) => (
                                        <SkillTag key={skill} skill={skill} variant="detected" />
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        No skills detected yet.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="mb-3 font-semibold text-slate-200">
                                Your Matching Skills
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {hasAnalysed && matchingSkills.length > 0 ? (
                                    matchingSkills.map((skill) => (
                                        <SkillTag key={skill} skill={skill} variant="matched" />
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        Matching skills will appear here.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="mb-3 font-semibold text-slate-200">
                                Skills to Improve
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {hasAnalysed && missingSkills.length > 0 ? (
                                    missingSkills.map((skill) => (
                                        <SkillTag key={skill} skill={skill} variant="missing" />
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500">
                                        Skill gaps will appear here.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                            <p className="mb-2 text-sm text-slate-400">
                                Role Readiness Score
                            </p>

                            <p className="text-4xl font-bold text-blue-300">
                                {readinessScore}%
                            </p>

                            <p className="mt-1 font-semibold text-slate-200">
                                {readinessLabel}
                            </p>

                            <div className="mt-4 h-3 rounded-full bg-slate-800">
                                <div
                                    className="h-3 rounded-full bg-blue-500"
                                    style={{ width: `${readinessScore}%` }}
                                />
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                            <h3 className="mb-3 font-semibold text-slate-200">
                                Recommended Action Plan
                            </h3>

                            {hasAnalysed && missingSkills.length > 0 ? (
                                <ul className="space-y-3 text-sm leading-6 text-slate-400">
                                    {missingSkills.map((skill) => (
                                        <li key={skill}>• {getSkillAdvice(skill)}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm leading-6 text-slate-500">
                                    Add a job description to generate a personalised action plan.
                                </p>
                            )}
                        </div>
                    </aside>
                </section>
            </section>
        </main>
    );
}