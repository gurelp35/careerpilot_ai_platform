export type SkillDefinition = {
    name: string;
    keywords: string[];
};

export const skillDefinitions: SkillDefinition[] = [
    { name: "JavaScript", keywords: ["javascript", "js"] },
    { name: "TypeScript", keywords: ["typescript", "ts"] },
    { name: "React", keywords: ["react"] },
    { name: "Next.js", keywords: ["next.js", "nextjs"] },
    { name: "HTML", keywords: ["html"] },
    { name: "CSS", keywords: ["css", "tailwind"] },
    { name: "SQL", keywords: ["sql", "mysql", "database"] },
    { name: "Git", keywords: ["git"] },
    { name: "GitHub", keywords: ["github"] },
    { name: "API", keywords: ["api", "apis", "rest api", "restful", "fetch"] },
    { name: "Cloud", keywords: ["cloud", "aws", "azure", "gcp"] },
    { name: "Agile", keywords: ["agile", "scrum", "sprint"] },
    { name: "Communication", keywords: ["communication", "communicate"] },
    { name: "Teamwork", keywords: ["teamwork", "team", "collaboration"] },
    { name: "Problem Solving", keywords: ["problem solving", "solve problems"] },
];

export const userSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "HTML",
    "CSS",
    "SQL",
    "Git",
    "GitHub",
    "Agile",
    "Communication",
    "Teamwork",
    "Problem Solving",
];