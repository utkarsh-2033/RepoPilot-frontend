"use client";

import { useUser } from "@/hooks/use-user";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, FolderGit2, ShieldCheck, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Dashboard Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-8 rounded-md bg-muted border border-border flex items-center justify-center text-primary">
              <GitBranch className="size-4" />
            </div>
            <span className="font-heading font-semibold text-lg text-foreground tracking-tight">
              RepoPilot
            </span>
          </Link>
          <Badge variant="outline" className="font-mono text-[10px] text-primary">
            Dashboard
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2.5">
              {user.avatarUrl && (
                <Image
                  src={user.avatarUrl}
                  alt={user.name || user.username}
                  width={28}
                  height={28}
                  className="rounded-full border border-border"
                />
              )}
              <div className="hidden sm:block text-left">
                <div className="text-xs font-medium text-foreground leading-tight">
                  {user.name || user.username}
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">
                  @{user.username}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Welcome back, {user?.name || user?.username}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Select a repository to explore codebase graphs, ask questions, and inspect AST citations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1.5 font-mono text-xs text-emerald-400 border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1"
            >
              <ShieldCheck className="size-3.5" />
              <span>OAuth Session Active</span>
            </Badge>
          </div>
        </div>

        {/* User profile card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                GitHub Identity
              </CardTitle>
              <CardDescription>
                Authenticated through Spring Security OAuth2
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Username:</span>
                <span className="text-foreground">@{user?.username}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground">{user?.email || "Private"}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">User ID:</span>
                <span className="text-foreground text-[10px] truncate max-w-[180px]">
                  {user?.id}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Indexed Workspaces
              </CardTitle>
              <CardDescription>
                Codebases ready for semantic AST-grounded search
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-md bg-muted border border-border flex items-center justify-center text-primary">
                    <FolderGit2 className="size-4.5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold font-mono text-foreground">
                      {user?.username}/devpilot
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>branch: main</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-mono">100% Synced</span>
                    </div>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="gap-1.5">
                  <span>Open Workspace</span>
                  <ExternalLink className="size-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
