import type { SkillDefinition } from "../data/skills";

/** Match complete skill terms rather than substrings inside unrelated words. */
export function detectSkills(description: string, definitions: SkillDefinition[]): string[] {
    return definitions
        .filter((skill) =>
            skill.keywords.some((keyword) => {
                const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                const pattern = new RegExp(`(^|[^a-z0-9.])${escaped}(?=$|[^a-z0-9])`, "i");
                return pattern.test(description);
            })
        )
        .map((skill) => skill.name);
}
