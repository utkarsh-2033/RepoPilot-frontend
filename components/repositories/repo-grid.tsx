import { RepoCard } from "./repo-card";
import { RepoCardSkeleton } from "./repo-card-skeleton";
import { FolderGit2 } from "lucide-react";
import type { GithubRepository } from "@/types";

interface RepoGridProps {
  repositories: GithubRepository[];
  isLoading: boolean;
  isError: boolean;
  filter: string;
  visibility: "all" | "public" | "private";
}

export function RepoGrid({ repositories, isLoading, isError, filter, visibility }: RepoGridProps) {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-muted-foreground">
        <FolderGit2 className="size-10 text-destructive/50" />
        <p className="text-sm font-medium text-destructive">Failed to load repositories</p>
        <p className="text-xs text-muted-foreground">Check your connection and try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <RepoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const filtered = repositories.filter((repo) => {
    const matchesSearch =
      filter.trim() === "" ||
      repo.fullName.toLowerCase().includes(filter.toLowerCase()) ||
      repo.description?.toLowerCase().includes(filter.toLowerCase());

    const matchesVisibility =
      visibility === "all" ||
      (visibility === "public" && !repo.isPrivate) ||
      (visibility === "private" && repo.isPrivate);

    return matchesSearch && matchesVisibility;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <FolderGit2 className="size-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">No repositories found</p>
        {filter && (
          <p className="text-xs text-muted-foreground font-mono">No match for &quot;{filter}&quot;</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((repo) => (
        <RepoCard key={repo.githubRepoId} repo={repo} />
      ))}
    </div>
  );
}
