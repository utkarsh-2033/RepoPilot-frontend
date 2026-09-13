import { GitBranch, Lock, Globe, CheckCircle2, LoaderCircle, CircleAlert, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguageIcon } from "@/components/icons/language-icons";
import type { GithubRepository } from "@/types";

type RepoStatus = "ready" | "indexing" | "pending" | "failed";

function deriveStatus(_repo: GithubRepository): RepoStatus {
  // Backend doesn't expose indexing status yet — default to pending (not yet indexed)
  // This will be extended once the indexing status API is available
  return "pending";
}

function StatusBadge({ status }: { status: RepoStatus }) {
  if (status === "ready") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-medium shrink-0">
        <CheckCircle2 className="size-3" />
        Ready
      </span>
    );
  }
  if (status === "indexing") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-medium shrink-0">
        <LoaderCircle className="size-3 animate-spin" />
        Indexing
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-mono text-[10px] font-medium shrink-0">
        <CircleAlert className="size-3" />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px] font-medium shrink-0">
      <span className="size-1.5 rounded-full bg-muted-foreground animate-pulse" />
      Pending
    </span>
  );
}

function RepoMetaRow({ repo }: { repo: GithubRepository }) {
  return (
    <div className="p-2.5 rounded-lg bg-background grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
      <div className="flex flex-col gap-0.5">
        <span className="text-foreground font-semibold">—</span>
        <span className="text-muted-foreground uppercase tracking-wider">chunks</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-foreground font-semibold">—</span>
        <span className="text-muted-foreground uppercase tracking-wider">files</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-primary font-semibold">
          {new Date(repo.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
        <span className="text-muted-foreground uppercase tracking-wider">updated</span>
      </div>
    </div>
  );
}

export function RepoCard({ repo }: { repo: GithubRepository }) {
  const status = deriveStatus(repo);

  return (
    <div
      className={cn(
        "relative bg-card rounded-lg p-4 flex flex-col gap-3 ring-1 ring-foreground/10 transition-all duration-200 hover:ring-foreground/20 hover:bg-accent/30",
        status === "failed" && "ring-destructive/30"
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <LanguageIcon language={repo.language} size="sm" className="mt-0.5 shrink-0" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[13px] font-semibold text-foreground truncate">
                {repo.fullName}
              </span>
              {repo.isPrivate ? (
                <Lock className="size-3 text-muted-foreground shrink-0" aria-label="Private" />
              ) : (
                <Globe className="size-3 text-muted-foreground shrink-0" aria-label="Public" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {repo.language && (
                <span className="font-mono text-[10px] text-muted-foreground">
                  {repo.language}
                </span>
              )}
              {repo.language && (
                <span className="size-0.5 rounded-full bg-border" />
              )}
              <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-muted-foreground">
                <GitBranch className="size-3" />
                {repo.defaultBranch}
              </span>
            </div>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Description */}
      {repo.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}

      {/* Stats */}
      <RepoMetaRow repo={repo} />

      {/* Footer actions */}
      <div className="flex items-center justify-between pt-1">
        <Button
          size="sm"
          variant={status === "ready" ? "default" : "outline"}
          disabled={status === "indexing" || status === "pending"}
          className="gap-1.5"
        >
          {status === "ready" ? "Open Chat" : status === "indexing" ? "Indexing..." : "Not Indexed"}
        </Button>
        <div className="flex items-center gap-1">
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="size-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
