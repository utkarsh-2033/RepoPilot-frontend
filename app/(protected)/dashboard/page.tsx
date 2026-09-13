"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { useRepositories, useSyncRepositories } from "@/hooks/use-repositories";
import { RepoCard } from "@/components/repositories/repo-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BookOpen, Check, ChevronDown, CircleAlert, GitBranch, LayoutDashboard, ListFilter, Menu, RefreshCw, Search, Settings2, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type VisibilityFilter = "all" | "public" | "private";

export default function DashboardPage() {
  const { user } = useUser();
  const { repositories, isLoading, isError, error, refetch } = useRepositories();
  const syncRepositories = useSyncRepositories();
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<VisibilityFilter>("all");
  const [sortNewest, setSortNewest] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);

  const filteredRepositories = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    return [...repositories]
      .filter((repo) => visibility === "all" || (visibility === "private" ? repo.isPrivate : !repo.isPrivate))
      .filter((repo) => !query || `${repo.fullName} ${repo.description ?? ""} ${repo.language ?? ""}`.toLowerCase().includes(query))
      .sort((left, right) => {
        const difference = new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
        return sortNewest ? difference : -difference;
      });
  }, [deferredSearch, repositories, sortNewest, visibility]);

  const publicCount = repositories.filter((repo) => !repo.isPrivate).length;
  const privateCount = repositories.length - publicCount;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-64 -translate-x-full flex-col border-r border-border bg-sidebar transition-transform lg:translate-x-0", mobileNavOpen && "translate-x-0")}>
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <GitBranch className="size-4" />
            </span>
            <span className="font-heading text-base font-semibold">RepoPilot</span>
          </Link>
          <Button size="icon-sm" variant="ghost" className="lg:hidden" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">
            <X />
          </Button>
        </div>
        <div className="flex flex-1 flex-col px-3 py-5">
          <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Workspace</p>
          <nav className="space-y-1" aria-label="Workspace navigation">
            <Button variant="secondary" className="w-full justify-start gap-3">
              <LayoutDashboard /> Overview
            </Button>
            <Button variant="default" className="w-full justify-start gap-3">
              <BookOpen /> Repositories
              <Badge variant="outline" className="ml-auto border-primary-foreground/30 text-primary-foreground">{repositories.length}</Badge>
            </Button>
          </nav>
          <div className="mt-auto border-t border-sidebar-border pt-4">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings2 /> Settings
            </Button>
            {user && <div className="mt-3 flex items-center gap-2.5 rounded-md bg-sidebar-accent p-2.5">
              {user.avatarUrl &&
                <Image src={user.avatarUrl} alt={user.name || user.username} width={28} height={28} className="rounded-full" />}
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{user.name || user.username}</p>
                <p className="truncate font-mono text-[10px] text-muted-foreground">@{user.username}</p>
              </div>
            </div>}
          </div>
        </div>
      </aside>

      {mobileNavOpen &&
        <button
          className="fixed inset-0 z-30 bg-background/80 lg:hidden"
          onClick={() => setMobileNavOpen(false)} aria-label="Close navigation overlay" />}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation">
              <Menu />
            </Button>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Workspace / Repositories

              </p>
              <h1 className="font-heading text-sm font-semibold">Repositories</h1>
            </div>
          </div>
          <Button
            onClick={() => syncRepositories.mutate()}
            disabled={syncRepositories.isPending}
            className="gap-2"><RefreshCw
              className={cn(syncRepositories.isPending && "animate-spin")} />
            {syncRepositories.isPending ? "Syncing" : "Sync Repos"}
          </Button>
        </header>
        <main className="mx-auto max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
          <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <Badge variant="outline" className="mb-3 gap-1.5 font-mono text-[10px] text-primary">
                <Check className="size-3" /> GitHub connected</Badge>
              <h2 className="font-heading text-3xl font-semibold tracking-tight">Your codebases</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">Manage the repositories connected to your RepoPilot workspace.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs sm:gap-5">
              <div>
                <p className="text-2xl font-semibold">{repositories.length}</p>
                <p className="text-muted-foreground">total</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{publicCount}</p>
                <p className="text-muted-foreground">public</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{privateCount}</p>
                <p className="text-muted-foreground">private</p>
              </div>
            </div>
          </section>
          {syncRepositories.isError &&
            <div className="flex items-start justify-between gap-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <div className="flex gap-2"><CircleAlert className="mt-0.5 size-4 shrink-0" />
                <span>{syncRepositories.error instanceof Error ? syncRepositories.error.message : "Repository sync failed."}</span>
              </div><Button variant="outline" size="sm"
                onClick={() => syncRepositories.mutate()}>Retry
              </Button>
            </div>}
          <section className="space-y-4">
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search repositories..."
                  className="pl-9" aria-label="Search repositories" />
              </div><div className="flex items-center gap-2 overflow-x-auto">
                <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />{(["all", "public", "private"] as const).map((filter) =>
                  <Button
                    key={filter}
                    size="sm"
                    variant={visibility === filter ? "secondary" : "ghost"}
                    onClick={() => setVisibility(filter)}
                    className="capitalize">{filter}
                  </Button>)}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSortNewest((value) => !value)}
                  className="gap-1.5 whitespace-nowrap">
                  <ListFilter className="size-3.5" />
                  {sortNewest ? "Recently updated" : "Oldest updated"}
                  <ChevronDown className="size-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-muted-foreground">{isLoading ? "Loading repositories..." : `${filteredRepositories.length} repositories shown`}
              </p>
              {search &&
                <Button size="sm" variant="ghost" onClick={() => setSearch("")} className="gap-1.5">
                  <X className="size-3" /> Clear search
                </Button>}
            </div>
            {isLoading ?
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }, (_, index) =>
                  <Skeleton key={index} className="h-56 rounded-lg" />)}
              </div> : isError ?
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center">
                  <CircleAlert className="mx-auto mb-2 size-5 text-destructive" />
                  <p className="text-sm font-medium">Could not load repositories</p>
                  <p className="mt-1 text-xs text-muted-foreground">{error instanceof Error ? error.message : "The repository request failed."}</p>
                  <Button variant="outline" size="sm"
                    onClick={() => refetch()}
                    className="mt-4">Retry
                  </Button>
                </div> : filteredRepositories.length > 0 ?
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredRepositories.map((repo) =>
                      <RepoCard key={repo.githubRepoId} repo={repo} />)}
                  </div> :
                  <div className="rounded-lg border border-dashed border-border p-10 text-center">
                    <Search className="mx-auto mb-3 size-5 text-muted-foreground" />
                    <p className="text-sm font-medium">No repositories match your filters</p>
                    <p className="mt-1 text-xs text-muted-foreground">Try a different search or visibility filter.</p>
                  </div>}
          </section>
        </main>
      </div>
    </div>
  );
}
