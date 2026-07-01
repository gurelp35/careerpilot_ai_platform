# CareerPilot AI

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