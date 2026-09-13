import { Skeleton } from "@/components/ui/skeleton";

export function RepoCardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-4 flex flex-col gap-3 ring-1 ring-foreground/10">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <Skeleton className="size-6 rounded-lg shrink-0" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-36 rounded" />
            <Skeleton className="h-2.5 w-20 rounded" />
          </div>
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-2.5 w-full rounded" />
        <Skeleton className="h-2.5 w-3/4 rounded" />
      </div>
      <Skeleton className="h-12 w-full rounded-lg" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-6 w-24 rounded-md" />
        <Skeleton className="size-7 rounded-md" />
      </div>
    </div>
  );
}
