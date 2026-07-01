export type ApplicationStatus =
    | "Saved"
    | "In Progress"
    | "Assessment"
    | "Interview"
    | "Offer";

export type Priority = "Low" | "Medium" | "High";

export type Application = {
    id: string;
    sector: string;
    role: string;
    status: ApplicationStatus;
    priority: Priority;
    deadline: string;
    nextStep: string;
    notes: string;
};