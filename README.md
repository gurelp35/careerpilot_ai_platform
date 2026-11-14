# CareerPilot AI

## Live Demo

View the deployed project here:

https://careerpilot-ai-platform-six.vercel.app/

CareerPilot AI is a student-focused internship and graduate readiness platform built with **Next.js**, **TypeScript** and **Tailwind CSS**.

The project helps students organise applications, analyse job descriptions, identify skill gaps, prepare STAR interview answers and explore digital career pathways.

## Project Overview

CareerPilot AI was created as a portfolio project to demonstrate frontend development, TypeScript, reusable components, data-driven UI design and user-focused problem solving.

The platform includes five main areas:

- Home page with readiness overview
- Application tracking dashboard
- Job description analyser
- STAR interview preparation tool
- Sector insights and career pathway explorer

## Features

### Application Tracker

Users can track internship and graduate applications, including:

- Role title
- Sector
- Application status
- Priority
- Deadline
- Next step
- Notes
- Progress score
- Deadline status

Application data is saved locally using `localStorage`.

### Job Description Analyser

Users can paste a job description and the platform will:

- Detect relevant technical and professional skills
- Compare detected skills with the user's current skill profile
- Calculate a role readiness score
- Highlight matching skills
- Highlight skills to improve
- Generate a focused preparation action plan

This analyser uses keyword-based skill detection.

### Interview Preparation

The interview preparation tool helps users build structured STAR answers:

- Situation
- Task
- Action
- Result

Users can:

- Load an example answer
- Generate a structured STAR response
- View an answer quality score
- Copy the generated answer
- Save answers locally
- Load or delete saved answers

### Sector Insights

The Sector Insights page helps users explore digital career pathways across technology sectors.

Users can:

- Search sectors
- Filter by category
- Save favourite pathways
- View key skills
- Review interview focus areas
- Understand how their project can be used as an interview example

## Tech Stack

- Next.js
- TypeScript
- React
- Tailwind CSS
- localStorage
- Git and GitHub

## Project Structure

```text
src
├── app
│   ├── page.tsx
│   ├── dashboard
│   │   └── page.tsx
│   ├── analyser
│   │   └── page.tsx
│   ├── interview
│   │   └── page.tsx
│   └── sectors
│       └── page.tsx
│
├── components
│   ├── Navbar.tsx
│   ├── StatCard.tsx
│   ├── ProgressBar.tsx
│   ├── SkillTag.tsx
│   └── EmptyState.tsx
│
├── data
│   ├── applications.ts
│   ├── sectors.ts
│   ├── skills.ts
│   └── questions.ts
│
├── hooks
│   └── useLocalStorage.ts
│
└── types
    └── application.ts

```

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open http://localhost:3000 in your browser.

Before submitting a change, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

**Dependency installation note:** If `npm ci` reports that `package.json` and `package-lock.json` are out of sync, the lockfile needs to be regenerated and committed. Do not bypass this check in CI. See the open quality-check pull request for the current status.

## Data storage and limitations

- The application tracker and saved interview answers use browser `localStorage`, not an account-backed database.
- Data is specific to the browser and device. Clearing site data or using a different browser can remove access to saved entries; there is no cloud sync or guaranteed backup.
- Avoid entering passwords, confidential employer information or sensitive personal details into demo applications.
- The job-description analyser is **keyword-based**, not a validated AI hiring or recruitment decision system. Readiness scores are illustrative and should not be interpreted as hiring predictions.

## Project status

This is a portfolio/demo application under active development. Features, accessibility and production build checks should be verified before treating a change as release-ready.
