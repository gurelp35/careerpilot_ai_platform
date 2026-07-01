"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

type SavedAnswer = {
    id: string;
    question: string;
    situation: string;
    task: string;
    action: string;
    result: string;
    createdAt: string;
};

const interviewQuestions = [
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

const exampleAnswer = {
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

function buildInterviewAnswer(
    situation: string,
    task: string,
    action: string,
    result: string
) {
    return `In this example, ${situation.trim()} My responsibility was that ${task
        .trim()
        .charAt(0)
        .toLowerCase()}${task.trim().slice(1)} To approach this, ${action
            .trim()
            .charAt(0)
            .toLowerCase()}${action.trim().slice(1)} As a result, ${result
                .trim()
                .charAt(0)
                .toLowerCase()}${result.trim().slice(1)}`;
}

function calculateAnswerScore(
    situation: string,
    task: string,
    action: string,
    result: string
) {
    const fields = [situation, task, action, result];
    let score = 0;

    fields.forEach((field) => {
        if (field.trim().length > 20) {
            score += 20;
        }

        if (field.trim().length > 80) {
            score += 5;
        }
    });

    return Math.min(score, 100);
}

function getScoreLabel(score: number) {
    if (score >= 80) {
        return "Strong Answer";
    }

    if (score >= 55) {
        return "Developing Answer";
    }

    return "Needs More Detail";
}

export default function InterviewPage() {
    const [question, setQuestion] = useState(interviewQuestions[0].question);
    const [situation, setSituation] = useState("");
    const [task, setTask] = useState("");
    const [action, setAction] = useState("");
    const [result, setResult] = useState("");
    const [generatedAnswer, setGeneratedAnswer] = useState("");
    const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedAnswers = localStorage.getItem("careerPilotInterviewAnswers");

        if (storedAnswers) {
            setSavedAnswers(JSON.parse(storedAnswers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "careerPilotInterviewAnswers",
            JSON.stringify(savedAnswers)
        );
    }, [savedAnswers]);

    const answerScore = useMemo(
        () => calculateAnswerScore(situation, task, action, result),
        [situation, task, action, result]
    );

    const scoreLabel = getScoreLabel(answerScore);

    function loadExample() {
        setQuestion(exampleAnswer.question);
        setSituation(exampleAnswer.situation);
        setTask(exampleAnswer.task);
        setAction(exampleAnswer.action);
        setResult(exampleAnswer.result);
        setMessage("");
    }

    function handleGenerate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!situation.trim() || !task.trim() || !action.trim() || !result.trim()) {
            setGeneratedAnswer("");
            setMessage("Please complete all STAR fields before generating an answer.");
            return;
        }

        const answer = buildInterviewAnswer(situation, task, action, result);
        setGeneratedAnswer(answer);
        setMessage("");
    }

    async function copyAnswer() {
        if (!generatedAnswer) {
            setMessage("Generate an answer before copying.");
            return;
        }

        await navigator.clipboard.writeText(generatedAnswer);
        setMessage("Answer copied to clipboard.");
    }

    function saveAnswer() {
        if (!generatedAnswer) {
            setMessage("Generate an answer before saving.");
            return;
        }

        const newSavedAnswer: SavedAnswer = {
            id: crypto.randomUUID(),
            question,
            situation,
            task,
            action,
            result,
            createdAt: new Date().toISOString(),
        };

        setSavedAnswers((currentAnswers) => [newSavedAnswer, ...currentAnswers]);
        setMessage("Answer saved.");
    }

    function deleteSavedAnswer(id: string) {
        const confirmed = confirm("Delete this saved interview answer?");

        if (!confirmed) {
            return;
        }

        setSavedAnswers((currentAnswers) =>
            currentAnswers.filter((answer) => answer.id !== id)
        );
    }

    function loadSavedAnswer(answer: SavedAnswer) {
        setQuestion(answer.question);
        setSituation(answer.situation);
        setTask(answer.task);
        setAction(answer.action);
        setResult(answer.result);

        const rebuiltAnswer = buildInterviewAnswer(
            answer.situation,
            answer.task,
            answer.action,
            answer.result
        );

        setGeneratedAnswer(rebuiltAnswer);
        setMessage("Saved answer loaded.");
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            <section className="mx-auto max-w-7xl px-6 py-8">
                <Navbar />

                <section className="mb-10">
                    <p className="mb-3 text-sm font-semibold text-blue-300">
                        Interview Preparation
                    </p>

                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                        Build stronger STAR interview answers.
                    </h1>

                    <p className="mt-4 max-w-2xl text-slate-400">
                        Structure your examples using Situation, Task, Action and Result so
                        you can prepare clear answers for internship and graduate interviews.
                    </p>
                </section>

                <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">STAR Answer Builder</h2>

                            <button
                                onClick={loadExample}
                                className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
                            >
                                Load Example
                            </button>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Interview Question
                                </label>
                                <select
                                    value={question}
                                    onChange={(event) => setQuestion(event.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400"
                                >
                                    {interviewQuestions.map((item) => (
                                        <option key={item.question} value={item.question}>
                                            {item.category}: {item.question}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Situation
                                </label>
                                <textarea
                                    value={situation}
                                    onChange={(event) => setSituation(event.target.value)}
                                    placeholder="What was the context?"
                                    className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Task
                                </label>
                                <textarea
                                    value={task}
                                    onChange={(event) => setTask(event.target.value)}
                                    placeholder="What were you responsible for?"
                                    className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Action
                                </label>
                                <textarea
                                    value={action}
                                    onChange={(event) => setAction(event.target.value)}
                                    placeholder="What steps did you take?"
                                    className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-slate-400">
                                    Result
                                </label>
                                <textarea
                                    value={result}
                                    onChange={(event) => setResult(event.target.value)}
                                    placeholder="What was the outcome?"
                                    className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
                            >
                                Generate STAR Answer
                            </button>
                        </form>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Generated Answer</h2>

                                <button
                                    onClick={copyAnswer}
                                    className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
                                >
                                    Copy
                                </button>
                            </div>

                            <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <p className="text-sm text-slate-400">Answer Quality Score</p>
                                <p className="mt-2 text-4xl font-bold text-blue-300">
                                    {answerScore}%
                                </p>
                                <p className="mt-1 font-semibold text-slate-200">
                                    {scoreLabel}
                                </p>

                                <div className="mt-4 h-3 rounded-full bg-slate-800">
                                    <div
                                        className="h-3 rounded-full bg-blue-500"
                                        style={{ width: `${answerScore}%` }}
                                    />
                                </div>
                            </div>

                            {message && (
                                <p className="mb-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
                                    {message}
                                </p>
                            )}

                            {generatedAnswer ? (
                                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                    <p className="mb-3 text-sm font-semibold text-blue-300">
                                        {question}
                                    </p>
                                    <p className="leading-7 text-slate-300">{generatedAnswer}</p>
                                </div>
                            ) : (
                                <p className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm leading-6 text-slate-500">
                                    Your structured interview answer will appear here after you
                                    complete the STAR fields.
                                </p>
                            )}

                            <button
                                onClick={saveAnswer}
                                className="mt-5 w-full rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
                            >
                                Save Answer
                            </button>
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                            <h2 className="mb-4 text-2xl font-bold">Saved Answers</h2>

                            {savedAnswers.length === 0 ? (
                                <p className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-500">
                                    Saved interview answers will appear here.
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {savedAnswers.map((answer) => (
                                        <article
                                            key={answer.id}
                                            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                                        >
                                            <p className="font-semibold text-slate-200">
                                                {answer.question}
                                            </p>
                                            <p className="mt-2 text-xs text-slate-500">
                                                Saved on{" "}
                                                {new Date(answer.createdAt).toLocaleDateString("en-GB")}
                                            </p>

                                            <div className="mt-3 flex gap-2">
                                                <button
                                                    onClick={() => loadSavedAnswer(answer)}
                                                    className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 transition hover:bg-blue-500/20"
                                                >
                                                    Load
                                                </button>

                                                <button
                                                    onClick={() => deleteSavedAnswer(answer.id)}
                                                    className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </aside>
                </section>
            </section>
        </main>
    );
}