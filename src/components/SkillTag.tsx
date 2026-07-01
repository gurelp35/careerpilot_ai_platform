type SkillTagProps = {
    label: string;
    variant?: "blue" | "green" | "pink" | "purple" | "amber";
};

const variantClasses = {
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    pink: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
};

export default function SkillTag({
    label,
    variant = "blue",
}: SkillTagProps) {
    return (
        <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${variantClasses[variant]}`}
        >
            {label}
        </span>
    );
}