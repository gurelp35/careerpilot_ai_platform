import type { Application } from "@/types/application";

export const defaultApplications: Application[] = [
    {
        id: "app-1",
        sector: "Technology",
        role: "Software Engineering Internship",
        status: "In Progress",
        priority: "High",
        deadline: "2026-07-15",
        nextStep: "Prepare CV and cover letter",
        notes: "Focus on React, TypeScript and project explanation.",
    },
    {
        id: "app-2",
        sector: "Finance & Digital Services",
        role: "Technology Graduate Programme",
        status: "Assessment",
        priority: "Medium",
        deadline: "2026-07-22",
        nextStep: "Practise online assessment questions",
        notes: "Prepare teamwork and problem-solving examples.",
    },
    {
        id: "app-3",
        sector: "Telecommunications",
        role: "Digital Technology Internship",
        status: "Interview",
        priority: "High",
        deadline: "2026-07-30",
        nextStep: "Prepare STAR interview answers",
        notes: "Use CareerPilot AI project as technical example.",
    },
];