export type InterviewQuestion = {
    category: string;
    question: string;
};

export type ExampleAnswer = {
    question: string;
    situation: string;
    task: string;
    action: string;
    result: string;
};

export const interviewQuestions: InterviewQuestion[] = [
    {
        category: "Technical Project",
        question: "Describe a technical project you are proud of.",
    },
    {
        category: "Problem Solving",
        question: "Tell me about a time you solved a difficult problem.",
    },
    {
        category: "Teamwork",
        question: "Tell me about a time you worked successfully in a team.",
    },
    {
        category: "Learning",
        question: "Tell me about a time you had to learn something new quickly.",
    },
    {
        category: "Motivation",
        question: "Why are you interested in this internship or graduate role?",
    },
    {
        category: "Resilience",
        question: "Tell me about a time you received feedback and improved your work.",
    },
];

export const exampleAnswer: ExampleAnswer = {
    question: "Describe a technical project you are proud of.",
    situation:
        "I wanted to build a project that would help students manage internship and graduate applications more effectively.",
    task:
        "I needed to design and develop a web application that could track applications, analyse job descriptions and support interview preparation.",
    action:
        "I created CareerPilot AI using Next.js, TypeScript and Tailwind CSS. I built an interactive dashboard, a job description analyser, progress tracking and a STAR interview preparation tool.",
    result:
        "The project helped me demonstrate frontend development, TypeScript, problem solving, user-centred design and the ability to build a useful product from an idea.",
};