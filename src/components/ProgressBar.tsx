type ProgressBarProps = {
    value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
    // Keep both the visual bar and its accessible value within the valid range.
    const percentage = Number.isFinite(value)
        ? Math.min(100, Math.max(0, value))
        : 0;

    return (
        <div>
            <div
                role="progressbar"
                aria-label="Progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentage}
                className="w-28 overflow-hidden rounded-full bg-slate-800"
            >
                <div
                    className="h-2 rounded-full bg-emerald-400"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="mt-1 text-xs text-slate-500">{percentage}%</p>
        </div>
    );
}
