type StatCardProps = {
    value: number;
    label: string;
    colourClass?: string;
};

export default function StatCard({
    value,
    label,
    colourClass = "text-blue-300",
}: StatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className={`text-3xl font-bold ${colourClass}`}>{value}</p>
            <p className="mt-1 text-sm text-slate-400">{label}</p>
        </div>
    );
}