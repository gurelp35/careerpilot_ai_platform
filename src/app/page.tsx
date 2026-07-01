import Link from "next/link";
import Navbar from "@/components/Navbar";

const features = [
  {
    title: "Application Tracker",
    description:
      "Track internship and graduate applications, deadlines, priorities and next steps in one place.",
  },
  {
    title: "Job Description Analyser",
    description:
      "Analyse role descriptions, detect key skills, identify gaps and calculate a readiness score.",
  },
  {
    title: "Interview Preparation",
    description:
      "Build structured STAR interview answers using Situation, Task, Action and Result.",
  },
  {
    title: "Skill Roadmap",
    description:
      "Turn missing skills into a clear preparation plan with focused learning actions.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <Navbar />

        <section className="grid min-h-[80vh] items-center gap-12 py-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              Internship & Graduate Readiness Platform
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Track smarter. Prepare better. Apply with confidence.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              CareerPilot AI helps students manage applications, analyse job
              descriptions, calculate readiness scores, prepare interview
              answers and build a personalised skill roadmap.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="rounded-xl bg-blue-500 px-6 py-3 text-center font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
              >
                Open Dashboard
              </Link>

              <Link
                href="/analyser"
                className="rounded-xl border border-slate-700 px-6 py-3 text-center font-semibold text-slate-300 transition hover:border-blue-400 hover:text-white"
              >
                Analyse a Job Description
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-blue-950/40">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Readiness Overview</p>
                <h2 className="text-2xl font-bold">Application Progress</h2>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
                82% Ready
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Technical Skills</span>
                  <span className="text-emerald-300">Strong</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div className="h-3 w-[85%] rounded-full bg-blue-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Interview Preparation</span>
                  <span className="text-amber-300">In Progress</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div className="h-3 w-[65%] rounded-full bg-amber-400" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Application Tracking</span>
                  <span className="text-emerald-300">Active</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div className="h-3 w-[75%] rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 pb-16 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="feature-card rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur"
              style={{ animationDelay: `${index * 0.25}s` }}
            >
              <h3 className="mb-3 text-lg font-bold">{feature.title}</h3>
              <p className="text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}