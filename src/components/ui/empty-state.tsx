interface EmptyStateProps {
  message: string;
  className?: string;
}

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div
      className={`mx-auto max-w-lg rounded-2xl border border-dashed border-border bg-soft/50 px-6 py-12 text-center ${className ?? ""}`}
    >
      <p className="text-sm leading-relaxed text-text-muted">{message}</p>
    </div>
  );
}
