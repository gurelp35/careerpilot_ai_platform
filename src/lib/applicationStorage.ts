import type { Application } from "../types/application";

export const APPLICATIONS_STORAGE_KEY = "careerPilotNextApplications";

/**
 * A saved empty array is intentional: the user may have deleted every application.
 * Missing or malformed data should fall back to the demo entries instead.
 */
export function readStoredApplications(
    savedValue: string | null,
    fallback: Application[]
): Application[] {
    if (savedValue === null) {
        return fallback;
    }

    try {
        const parsed: unknown = JSON.parse(savedValue);
        return Array.isArray(parsed) ? (parsed as Application[]) : fallback;
    } catch {
        return fallback;
    }
}

export function persistApplications(
    storage: Pick<Storage, "setItem">,
    applications: Application[]
): void {
    storage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
}
