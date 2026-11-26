type ProgressBarProps = {
    value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
    const progress = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

    return (
        <div>
            <div
                className="w-28 rounded-full bg-slate-800"
                role="progressbar"
                aria-label="Application progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
            >
                <div
                    className="h-2 rounded-full bg-emerald-400"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="mt-1 text-xs text-slate-500">{progress}%</p>
        </div>
    );
}