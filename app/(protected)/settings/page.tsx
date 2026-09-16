"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ExternalLink, GitBranch, Monitor, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { logoutUser } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const themes = [
    { value: "dark", label: "Dark Obsidian", icon: Moon },
    { value: "light", label: "Light Clean", icon: Sun },
    { value: "system", label: "System Sync", icon: Monitor },
] as const;

export default function SettingsPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { user } = useUser();
    const { theme, setTheme } = useTheme();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState<string | null>(null);

    async function handleLogout() {
        setIsLoggingOut(true);
        setLogoutError(null);
        try {
            await logoutUser();
            queryClient.removeQueries({ queryKey: queryKeys.user.all });
            queryClient.removeQueries({ queryKey: queryKeys.repositories.all });
            queryClient.removeQueries({ queryKey: queryKeys.chat.all });
            router.replace("/login");
        } catch (error) {
            setLogoutError(error instanceof Error ? error.message : "Could not sign out.");
            setIsLoggingOut(false);
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-8">
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                        <GitBranch className="size-4" />
                    </span>
                    <span className="font-heading font-semibold">RepoPilot</span>
                </Link>
                <Link
                    href="/dashboard"
                    className="inline-flex h-6 items-center justify-center rounded-md border border-border px-2 text-xs font-medium hover:bg-input/50">
                    Back to repositories
                </Link>
            </header>
            <main className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-8">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Settings / Workspace Config
                    </p>
                    <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight">Account & workspace</h1>
                    <p className="mt-2 text-sm text-muted-foreground">Manage your GitHub connection and how RepoPilot appears on this workstation.</p>
                </div>
                <section className="space-y-3">
                    <div>

                        <h2 className="font-heading text-lg font-semibold">Profile</h2>
                        <p className="text-sm text-muted-foreground">Your developer identity connected through GitHub OAuth.</p>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-5">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xl font-semibold text-primary">
                                {user?.avatarUrl ?
                                    <Image src={user.avatarUrl} alt={user.name || user.username} width={64} height={64} /> : user?.name?.charAt(0) || "U"}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-heading text-lg font-semibold">{user?.name || user?.username}</h3>
                                <p className="font-mono text-xs text-muted-foreground">@{user?.username}</p>
                                <Badge variant="outline" className="mt-2 gap-1.5 text-primary">
                                    <Check className="size-3" /> OAuth active</Badge>
                            </div>
                            <a className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-border px-2.5 text-xs font-medium hover:bg-input/50"
                                href="https://github.com/settings/profile"
                                target="_blank" rel="noopener noreferrer">
                                Change on GitHub
                                <ExternalLink className="size-3" />
                            </a>
                        </div>
                        <div className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Primary email</p>
                                <p className="mt-1 text-sm">{user?.email || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Repository source</p>
                                <p className="mt-1 text-sm">github.com/{user?.username}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="space-y-3">
                    <div>
                        <h2 className="font-heading text-lg font-semibold">Appearance</h2>
                        <p className="text-sm text-muted-foreground">Customize how RepoPilot looks and feels across your workspace.</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        {themes.map(({ value, label, icon: Icon }) =>
                            <button key={value}
                                onClick={() => setTheme(value)}
                                className={cn("flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-accent",
                                    theme === value && "border-primary ring-1 ring-primary/30")}>
                                <Icon className="size-4 text-primary" />
                                <span className="flex-1 text-sm font-medium">{label}
                                </span>
                                {theme === value &&
                                    <Check className="size-4 text-primary" />}
                            </button>
                        )}
                    </div>
                </section>
                <section className="space-y-3">
                    <div>
                        <h2 className="font-heading text-lg font-semibold">Account actions</h2>
                        <p className="text-sm text-muted-foreground">Authentication is managed by your GitHub OAuth session.</p>
                    </div>
                    <div className="rounded-lg border border-border bg-card p-5"><p className="text-sm">Profile updates and permissions sync automatically from GitHub when your session refreshes.</p>
                        <p className="mt-2 font-mono text-[10px] text-muted-foreground">Your repository index remains associated with your RepoPilot account.</p>
                        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                            <button type="button"
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="inline-flex h-8 items-center justify-center rounded-md border border-destructive/40 px-2.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50">
                                {isLoggingOut ? "Signing out..." : "Sign out"}
                            </button>
                            {logoutError &&
                                <p className="text-xs text-destructive">{logoutError}</p>}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
