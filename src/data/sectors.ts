export type SectorInsight = {
    id: string;
    title: string;
    category: string;
    description: string;
    skills: string[];
    interviewFocus: string[];
    projectAngle: string;
    preparationTasks: string[];
};

export const sectors: SectorInsight[] = [
    {
        id: "technology-ai",
        title: "Technology & AI",
        category: "Software",
        description:
            "Roles in this sector often focus on web applications, automation, AI-supported tools and scalable digital products.",
        skills: ["JavaScript", "TypeScript", "React", "Next.js", "APIs"],
        interviewFocus: [
            "Explain a technical project clearly",
            "Describe how you solved a coding problem",
            "Show how you learn new technologies",
        ],
        projectAngle:
            "CareerPilot AI demonstrates product thinking, frontend development, TypeScript and user-focused problem solving.",
        preparationTasks: [
            "Prepare a short explanation of your project architecture",
            "Practise explaining how the analyser works",
            "Review React state and component structure",
        ],
    },
    {
        id: "finance-digital",
        title: "Finance & Digital Services",
        category: "Business Technology",
        description:
            "Digital finance roles value data handling, secure systems, structured thinking and clear communication.",
        skills: ["SQL", "Data", "Problem Solving", "Communication", "Agile"],
        interviewFocus: [
            "Explain how you handle structured data",
            "Show attention to accuracy",
            "Discuss teamwork and communication",
        ],
        projectAngle:
            "CareerPilot AI shows how user data can be organised, analysed and presented in a clear dashboard.",
        preparationTasks: [
            "Prepare one SQL or data example",
            "Explain how localStorage stores application data",
            "Practise a teamwork STAR answer",
        ],
    },
    {
        id: "telecom-connectivity",
        title: "Telecommunications & Connectivity",
        category: "Technology Operations",
        description:
            "This sector focuses on connected services, customer platforms, reliability and digital transformation.",
        skills: ["APIs", "Cloud", "Communication", "Problem Solving", "Teamwork"],
        interviewFocus: [
            "Show interest in digital transformation",
            "Explain how systems connect",
            "Give an example of working under pressure",
        ],
        projectAngle:
            "CareerPilot AI can be described as a connected digital platform with multiple user workflows.",
        preparationTasks: [
            "Learn basic API and cloud vocabulary",
            "Prepare an example about improving a user journey",
            "Practise explaining technical ideas simply",
        ],
    },
    {
        id: "cyber-public-sector",
        title: "Cybersecurity & Public Sector",
        category: "Security",
        description:
            "Security-focused roles value responsibility, attention to detail, ethical thinking and reliable software practices.",
        skills: ["Security Awareness", "Git", "Problem Solving", "Documentation"],
        interviewFocus: [
            "Explain how you write careful code",
            "Show awareness of data protection",
            "Discuss responsibility and ethics",
        ],
        projectAngle:
            "CareerPilot AI can be linked to responsible data handling and structured digital records.",
        preparationTasks: [
            "Prepare a basic data privacy explanation",
            "Review Git and version control",
            "Write a short note about responsible technology",
        ],
    },
];

export const sectorInsights = sectors;