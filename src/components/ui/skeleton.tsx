export function AdminPageSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-16 rounded-xl bg-gray-200 dark:bg-gray-700"
        />
      ))}
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
      <div className="h-6 w-32 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="col-span-2 h-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid animate-pulse gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-[4/3] rounded-2xl bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}
