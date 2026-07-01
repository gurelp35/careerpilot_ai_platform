type ProgressBarProps = {
    value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
    return (
        <div>
            <div className="w-28 rounded-full bg-slate-800">
                <div
                    className="h-2 rounded-full bg-emerald-400"
                    style={{ width: `${value}%` }}
                />
            </div>

            <p className="mt-1 text-xs text-slate-500">{value}%</p>
        </div>
    );
}