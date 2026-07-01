"use client";

import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import { defaultApplications } from "@/data/applications";
import type {
    Application,
    ApplicationStatus,
    Priority,
} from "@/types/application";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";



const statusProgress: Record<ApplicationStatus, number> = {
    Saved: 20,
    "In Progress": 45,
    Assessment: 65,
    Interview: 85,
    Offer: 100,
};

function getDeadlineStatus(deadline: string) {
    const today = new Date();
    const deadlineDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const differenceInDays = Math.ceil(
        (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays < 0) {
        return {
            label: "Overdue",
            className: "bg-red-500/10 text-red-300 border-red-500/20",
        };
    }

    if (differenceInDays <= 7) {
        return {
            label: "Due Soon",
            className: "bg-amber-500/10 text-amber-300 border-amber-500/20",
        };
    }

    return {
        label: "On Track",
        className: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    };
}

function getPriorityClass(priority: Priority) {
    if (priority === "High") {
        return "bg-red-500/10 text-red-300 border-red-500/20";
    }

    if (priority === "Medium") {
        return "bg-amber-500/10 text-amber-300 border-amber-500/20";
    }

    return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function DashboardPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState<Omit<Application, "id">>({
        sector: "Technology",
        role: "",
        status: "Saved",
        priority: "Medium",
        deadline: "",
        nextStep: "",
        notes: "",
    });

    useEffect(() => {
        const savedApplications = localStorage.getItem(
            "careerPilotNextApplications"
        );

        if (savedApplications) {
            setApplications(JSON.parse(savedApplications));
        } else {
            setApplications(defaultApplications);
        }
    }, []);

    useEffect(() => {
        if (applications.length > 0) {
            localStorage.setItem(
                "careerPilotNextApplications",
                JSON.stringify(applications)
            );
        }
    }, [applications]);

    const filteredApplications = useMemo(() => {
        return applications.filter((application) => {
            const searchableText =
                `${application.sector} ${application.role} ${application.status} ${application.priority} ${application.nextStep}`.toLowerCase();

            return searchableText.includes(searchTerm.toLowerCase());
        });
    }, [applications, searchTerm]);

    const stats = useMemo(() => {
        return {
            total: applications.length,
            inProgress: applications.filter((app) => app.status === "In Progress")
                .length,
            assessments: applications.filter((app) => app.status === "Assessment")
                .length,
            interviews: applications.filter((app) => app.status === "Interview")
                .length,
        };
    }, [applications]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newApplication: Application = {
            id: crypto.randomUUID(),
            ...formData,
        };

        setApplications((currentApplications) => [
            ...currentApplications,
            newApplication,
        ]);

        setFormData({
            sector: "Technology",
            role: "",
            status: "Saved",
            priority: "Medium",
            deadline: "",
            nextStep: "",
            notes: "",
        });
    }

    function deleteApplication(id: string) {
        const confirmed = confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmed) {
            return;
        }

        setApplications((currentApplications) =>
            currentApplications.filter((application) => application.id !== id)
        );
    }

    function resetDemoData() {
        localStorage.removeItem("careerPilotNextApplications");
        setApplications(defaultApplications);
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <section className="mx-auto max-w-7xl px-6 py-8">
                <Navbar />

                <section className="mb-10">
                    <p className="mb-3 text-sm font-semibold text-blue-300">
                        Application Tracker
                    </p>

                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                        Manage applications, deadlines and preparation progress.
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-400">
                        Track roles, search applications, manage priorities, monitor
                        deadlines and save preparation notes in one place.
                    </p>
                </section>

                <section className="mb-8 grid gap-4 md:grid-cols-4">
                    <StatCard
                        value={stats.total}
                        label="Total Applications"
                        colourClass="text-blue-300"
                    />

                    <StatCard
                        value={stats.inProgress}
                        label="In Progress"
                        colourClass="text-emerald-300"
                    />

                    <StatCard
                        value={stats.assessments}
                        label="Assessments"
                        colourClass="text-amber-300"
                    />

                    <StatCard
                        value={stats.interviews}
                        label="Interview Stage"
                        colourClass="text-purple-300"
                    />
                </section>

                <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <h2 className="text-2xl font-bold">Applications</h2>

                            <input
                                type="search"
                                placeholder="Search by role, sector, status or next step..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 md:max-w-sm"
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left text-sm">
                                <thead className="text-slate-400">
                                    <tr className="border-b border-slate-800">
                                        <th className="py-3">Sector</th>
                                        <th className="py-3">Role</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3">Priority</th>
                                        <th className="py-3">Deadline</th>
                                        <th className="py-3">Deadline Status</th>
                                        <th className="py-3">Progress</th>
                                        <th className="py-3">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredApplications.map((application) => {
                                        const deadlineStatus = getDeadlineStatus(
                                            application.deadline
                                        );

                                        return (
                                            <tr
                                                key={application.id}
                                                className="border-b border-slate-800 text-slate-300"
                                            >
                                                <td className="py-4">{application.sector}</td>

                                                <td className="max-w-[180px] py-4 font-medium text-white">
                                                    {application.role}
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {application.notes}
                                                    </p>
                                                </td>

                                                <td className="py-4">
                                                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                                                        {application.status}
                                                    </span>
                                                </td>

                                                <td className="py-4">
                                                    <span
                                                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityClass(
                                                            application.priority
                                                        )}`}
                                                    >
                                                        {application.priority}
                                                    </span>
                                                </td>

                                                <td className="py-4">
                                                    {formatDate(application.deadline)}
                                                </td>

                                                <td className="py-4">
                                                    <span
                                                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${deadlineStatus.className}`}
                                                    >
                                                        {deadlineStatus.label}
                                                    </span>
                                                </td>

                                                <td className="py-4">
                                                    <ProgressBar
                                                        value={statusProgress[application.status]}
                                                    />
                                                </td>

                                                <td className="py-4">
                                                    <button
                                                        onClick={() => deleteApplication(application.id)}
                                                        className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {filteredApplications.length === 0 && (
                            <p className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5 text-center text-slate-400">
                                No applications match your search.
                            </p>
                        )}
                    </div>

                    <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="mb-4 text-2xl font-bold">Add Application</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Sector
                                </label>
                                <select
                                    value={formData.sector}
                                    onChange={(event) =>
                                        setFormData({ ...formData, sector: event.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400"
                                >
                                    <option>Technology</option>
                                    <option>Finance / Digital</option>
                                    <option>Telecommunications</option>
                                    <option>Cybersecurity</option>
                                    <option>Engineering</option>
                                    <option>Data & Cloud</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Role
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.role}
                                    onChange={(event) =>
                                        setFormData({ ...formData, role: event.target.value })
                                    }
                                    placeholder="e.g. Software Engineering Internship"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            status: event.target.value as ApplicationStatus,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400"
                                >
                                    <option>Saved</option>
                                    <option>In Progress</option>
                                    <option>Assessment</option>
                                    <option>Interview</option>
                                    <option>Offer</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Priority
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(event) =>
                                        setFormData({
                                            ...formData,
                                            priority: event.target.value as Priority,
                                        })
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400"
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Deadline
                                </label>
                                <input
                                    required
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(event) =>
                                        setFormData({ ...formData, deadline: event.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Next Step
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.nextStep}
                                    onChange={(event) =>
                                        setFormData({ ...formData, nextStep: event.target.value })
                                    }
                                    placeholder="e.g. Prepare STAR answers"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Notes
                                </label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(event) =>
                                        setFormData({ ...formData, notes: event.target.value })
                                    }
                                    placeholder="Add preparation notes..."
                                    className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
                            >
                                Save Application
                            </button>

                            <button
                                type="button"
                                onClick={resetDemoData}
                                className="w-full rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
                            >
                                Reset Demo Data
                            </button>
                        </form>
                    </aside>
                </section>
            </section>
        </main>
    );
}