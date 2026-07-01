type EmptyStateProps = {
    message: string;
};

export default function EmptyState({ message }: EmptyStateProps) {
    return (
        <p className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-center text-sm text-slate-500">
            {message}
        </p>
    );
}