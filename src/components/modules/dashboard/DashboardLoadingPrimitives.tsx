import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStaticHeaderProps {
  title: string;
  description: string;
  actionLabel?: string;
}

export function DashboardStaticHeader({
  title,
  description,
  actionLabel,
}: DashboardStaticHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-block bg-[#00f0ff] text-black font-black text-xs uppercase tracking-widest px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_#000] mb-2">
          ★ MANAGEMENT
        </div>
        <h1 className="text-3xl sm:text-4xl font-clash font-black uppercase tracking-tight text-black dark:text-white">{title}</h1>
        <p className="mt-1 text-xs font-bold text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      {actionLabel && (
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center rounded-lg border-2 border-black bg-[#b5ff6d] text-black px-3 text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000] cursor-pointer"
        >
          {actionLabel} ★
        </button>
      )}
    </div>
  );
}

interface DashboardLoadingHeaderProps {
  actionWidth?: string;
  compact?: boolean;
}

export function DashboardLoadingHeader({
  actionWidth,
  compact = false,
}: DashboardLoadingHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <Skeleton className="h-9 w-56 border-2 border-black" />
        <Skeleton className="h-5 w-80 max-w-full border-2 border-black" />
      </div>
      {actionWidth && <Skeleton className={`h-10 ${actionWidth} rounded-lg border-2 border-black`} />}
      {compact && <Skeleton className="h-8 w-24 rounded-lg border-2 border-black" />}
    </div>
  );
}

export function DashboardMetricCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 p-5 space-y-4 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#b5ff6d]">
          <Skeleton className="h-4 w-24 border border-black" />
          <Skeleton className="h-8 w-16 border border-black" />
          <Skeleton className="h-3 w-32 border border-black" />
        </div>
      ))}
    </div>
  );
}

export function DashboardFilterBar({
  hasStatusFilter = true,
  addLabel = "Add item",
  searchPlaceholder = "Search...",
}: {
  hasStatusFilter?: boolean;
  addLabel?: string;
  searchPlaceholder?: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        aria-label={searchPlaceholder}
        placeholder={searchPlaceholder}
        className="h-10 w-full rounded-lg border-2 border-black bg-zinc-50 dark:bg-zinc-950 px-3 text-xs font-bold outline-none sm:w-72"
      />
      <div className="flex items-center gap-2">
        {hasStatusFilter && (
          <button
            type="button"
            className="h-10 w-36 rounded-lg border-2 border-black bg-zinc-50 dark:bg-zinc-950 px-3 text-left text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#000]"
          >
            ALL STATUS
          </button>
        )}
        <button
          type="button"
          className="h-10 rounded-lg border-2 border-black bg-white dark:bg-zinc-800 px-3 text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000]"
        >
          RESET
        </button>
        <button
          type="button"
          className="h-10 rounded-lg border-2 border-black bg-[#b5ff6d] text-black px-3 text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000]"
        >
          {addLabel} ★
        </button>
      </div>
    </div>
  );
}

export function DashboardTableSkeleton({
  columns = 6,
  rows = 6,
}: {
  columns?: number;
  rows?: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-3 border-black dark:border-zinc-300 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#b5ff6d]">
      <div
        className="grid gap-4 border-b-2 border-black bg-[#FFFDF5] dark:bg-zinc-950 px-4 py-3"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="h-3 w-3/4 border border-black" />
        ))}
      </div>
      <div className="divide-y-2 divide-black/10 dark:divide-zinc-800">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 px-4 py-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, columnIndex) => (
              <Skeleton
                key={columnIndex}
                className={`h-5 border border-black ${
                  columnIndex === 0 ? "w-full" : "w-3/4"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardFormFields({
  fields = 6,
  textArea = false,
}: {
  fields?: number;
  textArea?: boolean;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.from({ length: fields }).map((_, index) => (
        <div
          key={index}
          className={textArea && index === fields - 1 ? "sm:col-span-2" : ""}
        >
          <p className="mb-2 text-xs font-black uppercase text-black dark:text-white">
            {textArea && index === fields - 1 ? "DESCRIPTION" : "FIELD"}
          </p>
          {textArea && index === fields - 1 ? (
            <textarea className="h-32 w-full resize-none rounded-lg border-2 border-black bg-zinc-50 dark:bg-zinc-950 p-3 text-xs font-bold outline-none" />
          ) : (
            <input className="h-10 w-full rounded-lg border-2 border-black bg-zinc-50 dark:bg-zinc-950 px-3 text-xs font-bold outline-none" />
          )}
        </div>
      ))}
    </div>
  );
}
