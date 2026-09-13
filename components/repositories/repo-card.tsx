import { GitBranch, Lock, Globe, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageIcon } from "@/components/icons/language-icons";
import type { GithubRepository } from "@/types";

export function RepoCard({ repo }: { repo: GithubRepository }) {
  return (
    <article className={cn("relative flex min-h-56 flex-col gap-4 rounded-lg bg-card p-4 ring-1 ring-foreground/10 transition-colors hover:bg-accent/30 hover:ring-foreground/20")}>
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
        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
          Available
        </span>
      </div>

      <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
        {repo.description || "No description provided for this repository."}
      </p>

      <div className="flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">
        <span>
          Updated {new Date(repo.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <span>{repo.isPrivate ? "Private" : "Public"}</span>
      </div>

      <div className="flex items-center justify-between pt-1">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-6 items-center justify-center gap-1 rounded-md border border-border px-2 text-xs font-medium transition-colors hover:bg-input/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          View on GitHub
          <ExternalLink className="size-3" />
        </a>
        <span className="text-[10px] text-muted-foreground">Synced from GitHub</span>
      </div>
    </article>
  );
}
