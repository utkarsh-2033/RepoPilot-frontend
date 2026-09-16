"use client";

import { useRouter } from "next/navigation";
import { GitBranch, Lock, Globe, ExternalLink, LoaderCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageIcon } from "@/components/icons/language-icons";
import type { GithubRepository } from "@/types";
import { useRepositoryIndexing } from "@/hooks/use-repository-indexing";
import { useInitChatSession } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";

export function RepoCard({ repo }: { repo: GithubRepository }) {
  const router = useRouter();
  const { status, isIndexing, isStarting, isError, error, start } = useRepositoryIndexing(repo);
  const initSession = useInitChatSession();
  const progress = status.totalFiles > 0 ? Math.min(100, Math.round((status.filesProcessed / status.totalFiles) * 100)) : 0;

  function openChat() {
    initSession.mutate(repo.id, { onSuccess: (session) => router.push(`/chat?sessionId=${session.id}`) });
  }

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
        <span className={cn(
          "shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium",
          status.indexStatus === "READY" ? "bg-primary/10 text-primary" : status.indexStatus === "FAILED" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
        )}>
          {status.indexStatus?.toLowerCase()}
        </span>
      </div>

      <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
        {repo.description || "No description provided for this repository."}
      </p>

      {(isIndexing || status.indexStatus === "FAILED") && (
        <div className="space-y-2 rounded-md bg-muted/50 p-2.5">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className={cn(status.indexStatus === "FAILED" ? "text-destructive" : "text-muted-foreground")}>
              {status.indexStatus === "FAILED" ? status.message || "Indexing failed" : isStarting ? "Starting index..." : "Indexing repository..."}
            </span>
            <span className="text-foreground">{status.filesProcessed}/{status.totalFiles || "--"} files</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-background">
            <div className={cn("h-full rounded-full transition-[width] duration-500", status.indexStatus === "FAILED" ? "bg-destructive" : "bg-primary")} style={{ width: `${progress}%` }} />
          </div>
          {status.indexStatus === "INDEXING" && <p className="font-mono text-[10px] text-muted-foreground">{progress}% complete · {status.chunkCount} chunks</p>}
        </div>
      )}

      {isError && error instanceof Error && <p className="text-[10px] text-destructive">{error.message}</p>}

      <div className="flex items-center justify-between border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">
        <span>
          Updated {new Date(repo.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <span>{repo.isPrivate ? "Private" : "Public"}</span>
      </div>

      <div className="flex items-center justify-between pt-1">
        {status.indexStatus === "READY" ? <Button size="sm" onClick={openChat} disabled={initSession.isPending} className="gap-1.5">{initSession.isPending ? <LoaderCircle className="animate-spin" /> : null}Open chat</Button> : <Button size="sm"  onClick={() => start()} disabled={isIndexing || isStarting} className="gap-1.5">{isIndexing || isStarting ? <LoaderCircle className="animate-spin" /> : <RefreshCw />} {status.indexStatus === "FAILED" ? "Retry indexing" : "Start indexing"}</Button>}
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
