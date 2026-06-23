interface EmptyStateProps {
  message: string;
  className?: string;
}

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div
      className={`mx-auto max-w-lg rounded-[var(--radius-card)] border border-dashed border-border bg-soft/50 px-6 py-12 text-center shadow-[var(--shadow-sm)] ${className ?? ""}`}
    >
      <p className="text-sm leading-relaxed text-text-muted">{message}</p>
    </div>
  );
}
