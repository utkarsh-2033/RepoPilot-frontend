"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    Bot,
    Check,
    Code2,
    FileCode2,
    GitBranch,
    LoaderCircle,
    Menu,
    MessageSquare,
    MoreHorizontal,
    Plus,
    Send,
    Trash2,
    X,
} from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useRepositories } from "@/hooks/use-repositories";
import { useChatMessages, useChatSessions, useDeleteChatSession, useInitChatSession } from "@/hooks/use-chat";
import { streamChatMessage } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { ChatMessage, ChatSession, Citation } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STREAMING_MARKER = "\u0000";

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function MessageContent({ message }: { message: string }) {
    const isStreaming = message.startsWith(STREAMING_MARKER);
    if (isStreaming) {
        return (
            <div className="max-w-full whitespace-pre-wrap wrap-anywhere text-sm leading-7">
                {message.slice(STREAMING_MARKER.length)}
            </div>
        );
    }

    return (
        <div className="max-w-full min-w-0 overflow-hidden prose prose-sm leading-7 text-current [&_a]:wrap-anywhere [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_code]:wrap-anywhere [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_h1]:mb-3 [&_h1]:font-heading [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:font-heading [&_h3]:text-sm [&_h3]:font-semibold [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_pre]:my-4 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-border [&_pre]:bg-background [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-xs [&_pre]:leading-5 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
        </div>
    );
}

function CitationList({ citations }: { citations: Citation[] }) {
    if (!citations.length) return null;
    return (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
            {citations.map((citation) => (
                <span key={citation.id} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 py-1 font-mono text-[10px] text-muted-foreground">
                    <FileCode2 className="size-3 text-primary" />
                    {citation.filePath}:{citation.startLine}-{citation.endLine}
                </span>
            ))}
        </div>
    );
}

function SessionItem({ session, active, onSelect, onDelete }: { session: ChatSession; active: boolean; onSelect: () => void; onDelete: () => void }) {
    return (
        <div className={cn("group flex items-center gap-2 rounded-md px-2 py-2 transition-colors", active ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60")}>
            <button className="min-w-0 flex-1 text-left" onClick={onSelect}>
                <p className="truncate text-xs font-medium">{session.title}</p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">{session.repositoryName || "Repository chat"} · {formatDate(session.updatedAt)}</p>
            </button>
            <Button size="icon-xs" variant="ghost" className="opacity-0 group-hover:opacity-100" onClick={onDelete} aria-label={`Delete ${session.title}`}>
                <Trash2 />
            </Button>
        </div>
    );
}

export function ChatWorkspace() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useUser();
    const { repositories } = useRepositories();
    const sessionsQuery = useChatSessions();
    const initSession = useInitChatSession();
    const deleteSession = useDeleteChatSession();
    const queryClient = useQueryClient();
    const [composer, setComposer] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [streamError, setStreamError] = useState<string | null>(null);
    const [mobileSessionsOpen, setMobileSessionsOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const initializedRepo = useRef<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const sessions = useMemo(() => sessionsQuery.data ?? [], [sessionsQuery.data]);
    const latestSession = useMemo(
        () => [...sessions].sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime())[0],
        [sessions],
    );
    const requestedSessionId = searchParams.get("sessionId");
    const requestedRepoId = searchParams.get("repoId");
    const activeSessionId = requestedSessionId;
    const activeSession = sessions.find((session) => session.id === activeSessionId) ?? null;
    const messagesQuery = useChatMessages(activeSessionId);
    const messages = useMemo(() => messagesQuery.data ?? [], [messagesQuery.data]);
    const activeRepository = useMemo(() => repositories.find((repo) => repo.id === activeSession?.repositoryId), [activeSession?.repositoryId, repositories]);

    useEffect(() => {
        if (sessionsQuery.isLoading) return;

        if (requestedSessionId && sessions.some((session) => session.id === requestedSessionId)) return;

        if (requestedRepoId) {
            const existingSession = sessions.find((session) => session.repositoryId === requestedRepoId);
            if (existingSession) {
                router.replace(`/chat?sessionId=${existingSession.id}`);
                return;
            }
            if (initializedRepo.current === requestedRepoId || initSession.isPending) return;
            initializedRepo.current = requestedRepoId;
            initSession.mutate(requestedRepoId, {
                onSuccess: (session) => router.replace(`/chat?sessionId=${session.id}`),
            });
            return;
        }

        if (!requestedSessionId && latestSession) {
            router.replace(`/chat?sessionId=${latestSession.id}`);
        }
    }, [initSession, latestSession, requestedRepoId, requestedSessionId, router, sessions, sessionsQuery.isLoading]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: streaming ? "auto" : "smooth" });
    }, [messages, streaming]);

    function createSession() {
        const repository = repositories.find((repo) => repo.indexStatus === "READY") ?? repositories[0];
        if (!repository) return;
        initSession.mutate(repository.id, { onSuccess: (session) => { router.push(`/chat?sessionId=${session.id}`); setMobileSessionsOpen(false); } });
    }

    function handleDelete(sessionId: string) {
        deleteSession.mutate(sessionId, { onSuccess: () => { if (activeSessionId === sessionId) router.replace("/chat"); } });
    }

    async function sendMessage() {
        const question = composer.trim();
        if (!question || !activeSessionId || streaming) return;
        setComposer("");
        setStreamError(null);
        setStreaming(true);
        const userMessage: ChatMessage = { id: crypto.randomUUID(), message: question, role: "USER", createdAt: new Date().toISOString(), citations: [] };
        const assistantMessage: ChatMessage = { id: `stream-${Date.now()}`, message: STREAMING_MARKER, role: "ASSISTANT", createdAt: new Date().toISOString(), citations: [] };
        queryClient.setQueryData<ChatMessage[]>(queryKeys.chat.messages(activeSessionId), (current = []) => [...current, userMessage, assistantMessage]);
        try {
            await streamChatMessage(activeSessionId, question, {
                onToken: (token) => queryClient.setQueryData<ChatMessage[]>(queryKeys.chat.messages(activeSessionId), (current = []) => current.map((message) => message.id === assistantMessage.id ? { ...message, message: message.message + token } : message)),
                onCitations: (citations) => queryClient.setQueryData<ChatMessage[]>(queryKeys.chat.messages(activeSessionId), (current = []) => current.map((message) => message.id === assistantMessage.id ? { ...message, citations } : message)),
                onDone: () => queryClient.setQueryData<ChatMessage[]>(queryKeys.chat.messages(activeSessionId), (current = []) => current.map((message) => message.id === assistantMessage.id ? { ...message, message: message.message.slice(STREAMING_MARKER.length) } : message)),
            });
            await queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages(activeSessionId) });
            await queryClient.invalidateQueries({ queryKey: queryKeys.chat.sessions() });
        } catch (error) {
            setStreamError(error instanceof Error ? error.message : "The assistant could not complete this response.");
        } finally {
            setStreaming(false);
        }
    }

    return (
        <div className="flex h-dvh min-h-160 min-w-0 overflow-hidden bg-background text-foreground">
            <aside className={cn("fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar transition-all lg:relative lg:translate-x-0", sidebarCollapsed ? "w-16 -translate-x-full lg:w-16" : "w-72 -translate-x-full lg:w-72", mobileSessionsOpen && "translate-x-0")}>
                <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
                    <Link href="/" className="flex min-w-0 items-center gap-2.5" title="RepoPilot">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                            <GitBranch className="size-4" />
                        </span>
                        {!sidebarCollapsed &&
                            <span className="font-heading font-semibold">RepoPilot</span>
                        }
                    </Link>
                    <div className="flex items-center gap-1">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            className="hidden lg:inline-flex"
                            onClick={() => setSidebarCollapsed((value) => !value)}
                            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
                            <MoreHorizontal />
                        </Button>
                        <Button size="icon-sm" variant="ghost" className="lg:hidden" onClick={() => setMobileSessionsOpen(false)} aria-label="Close sessions">
                            <X />
                        </Button>
                    </div>
                </div>
                {/* <div className="border-b border-sidebar-border p-3">
                    <Button
                        onClick={createSession}
                        disabled={initSession.isPending || !repositories.length}
                        className={cn("w-full justify-start gap-2", sidebarCollapsed && "justify-center px-0")} title="New chat">
                        <Plus />
                        {!sidebarCollapsed && "New chat"}
                    </Button>
                </div> */}
                <nav className="border-b border-sidebar-border p-3" aria-label="Workspace navigation">
                    <Link
                        href="/chat"
                        className={cn("flex items-center bg-primary gap-2 rounded-md px-2 py-2 text-xs font-medium hover:bg-sidebar-accent", !requestedSessionId && "bg-sidebar-accent", sidebarCollapsed && "justify-center px-0")}
                        title="Chat sessions">
                        <MessageSquare className="size-4 shrink-0" />
                        {!sidebarCollapsed && "Sessions"}
                    </Link>
                    <Link
                        href="/dashboard"
                        className={cn("mt-1 flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium hover:bg-sidebar-accent", sidebarCollapsed && "justify-center px-0")}
                        title="Repositories">
                        <GitBranch className="size-4 shrink-0" />
                        {!sidebarCollapsed && "Repositories"}
                    </Link>
                </nav>
                <div className="flex-1 overflow-y-auto p-3">
                    {!sidebarCollapsed &&
                        <div className="mb-2 flex items-center justify-between px-2">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                Sessions ({sessions.length})
                            </span>
                            <MessageSquare className="size-3.5 text-muted-foreground" />
                        </div>
                    }
                    {!sidebarCollapsed &&
                        (sessionsQuery.isLoading ?
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) =>
                                    <Skeleton key={item} className="h-12" />
                                )}
                            </div> :
                            sessions.length ?
                                <div className="space-y-1">
                                    {sessions.map((session) =>
                                        <SessionItem
                                            key={session.id}
                                            session={session}
                                            active={session.id === activeSessionId}
                                            onSelect={() => { router.push(`/chat?sessionId=${session.id}`); setMobileSessionsOpen(false); }}
                                            onDelete={() => handleDelete(session.id)}
                                        />
                                    )}
                                </div> :
                                <div className="rounded-md border border-dashed border-sidebar-border p-4 text-center">
                                    <p className="text-xs font-medium">No chats yet</p>
                                    <p className="mt-1 text-[10px] text-muted-foreground">Start a conversation from a repository.</p>
                                </div>)}</div>
                <div className="border-t border-sidebar-border p-3">
                    <Link
                        href="/settings"
                        className={cn("flex items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent", sidebarCollapsed && "justify-center")}
                        title="Settings"
                    >
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                            {user?.name?.charAt(0) || "U"}
                        </div>
                        {!sidebarCollapsed &&
                            <div className="min-w-0">
                                <p className="truncate text-xs font-medium">
                                    {user?.name || user?.username}</p>
                                <p className="truncate font-mono text-[10px] text-muted-foreground">Settings</p>
                            </div>
                        }
                        <MoreHorizontal className="ml-auto size-4 text-muted-foreground" />
                    </Link>
                </div>
            </aside>
            {mobileSessionsOpen &&
                <button className="fixed inset-0 z-30 bg-background/80 lg:hidden"
                    onClick={() => setMobileSessionsOpen(false)} aria-label="Close session navigation" />
            }
            <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border px-4 sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                        <Button size="icon" variant="ghost" className="lg:hidden"
                            onClick={() => setMobileSessionsOpen(true)}
                            aria-label="Open sessions">
                            <Menu />
                        </Button><div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <Code2 className="size-4 shrink-0 text-primary" />
                                <h1 className="truncate font-heading text-sm font-semibold">
                                    {activeSession?.title || "Codebase chat"}
                                </h1>
                            </div>
                            <p className="truncate font-mono text-[10px] text-muted-foreground">
                                {activeRepository?.fullName || "Select a repository session"}
                            </p>
                        </div>
                    </div>
                    <Badge variant="outline" className="hidden shrink-0 gap-1.5 font-mono text-[10px] text-primary sm:flex">
                        <Check className="size-3" />
                        Grounded responses
                    </Badge>
                </header>
                <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-4 py-8 sm:px-8">
                        {!activeSession ?
                            <div className="flex flex-1 flex-col items-center justify-center text-center">
                                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Bot className="size-6" />
                                </div>
                                <h2 className="font-heading text-xl font-semibold">Ask your codebase</h2>
                                <p
                                    className="mt-2 max-w-md text-sm text-muted-foreground"
                                >C
                                    hoose a repository to start a grounded conversation about its files, symbols, and architecture.
                                </p>
                                <Button
                                    onClick={createSession}
                                    disabled={!repositories.length || initSession.isPending}
                                    className="mt-5 gap-2">
                                    <Plus />
                                    Start a chat
                                </Button>
                            </div>
                            : messagesQuery.isLoading ?
                                <div className="space-y-6">
                                    {[1, 2, 3].map((item) =>
                                        <Skeleton key={item} className="h-20 w-3/4" />
                                    )}
                                </div>
                                : messages.length ?
                                    <div className="min-w-0 space-y-8">
                                        {messages.map((message) =>
                                            <article
                                                key={message.id}
                                                className={cn("flex min-w-0 gap-3", message.role === "USER" && "justify-end")}
                                            >
                                                <div className={cn("flex size-7 shrink-0 items-center justify-center rounded-md", message.role === "ASSISTANT" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground", message.role === "USER" && "order-2")} >
                                                    {message.role === "ASSISTANT" ?
                                                        <Bot className="size-4" /> : <span className="text-[10px] font-semibold">{user?.name?.charAt(0) || "U"}</span>
                                                    }
                                                </div>
                                                <div className={cn("min-w-0 max-w-[85%]", message.role === "USER" ? "rounded-lg bg-primary px-4 py-3 text-primary-foreground" : "flex-1 rounded-lg border border-border bg-card px-4 py-3")}>
                                                    <MessageContent message={message.message || (streaming ? "Thinking..." : "No response returned.")} />
                                                    {message.role === "ASSISTANT"
                                                        &&
                                                        <CitationList citations={message.citations} />
                                                    }
                                                </div>
                                            </article>
                                        )}
                                        <div ref={bottomRef} />
                                    </div>
                                    :
                                    <div className="flex flex-1 flex-col items-center justify-center text-center">
                                        <MessageSquare className="mb-3 size-6 text-muted-foreground" />
                                        <p className="text-sm font-medium">New conversation</p>
                                        <p className="mt-1 text-xs text-muted-foreground">Ask about a file, function, dependency, or architectural decision.</p>
                                    </div>
                        }
                    </div>
                </div>
                <div className="border-t border-border bg-background px-4 py-4 sm:px-8">
                    <div className="mx-auto max-w-4xl">
                        {
                            streamError &&
                            <div className="mb-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                                {streamError}
                            </div>
                        }
                        <div className="flex items-end gap-2 rounded-lg border border-input bg-card p-2 shadow-sm">
                            <Input
                                value={composer}
                                onChange={(event) => setComposer(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" && !event.shiftKey) {
                                        event.preventDefault();
                                        void sendMessage();
                                    }
                                }}
                                placeholder={activeSession ? "Ask a question about this repository..." : "Start a chat to ask about your code..."}
                                disabled={!activeSession || streaming}
                                aria-label="Message the codebase"
                                className="h-9 border-0 bg-transparent shadow-none focus-visible:ring-0" />
                            <Button size="icon"
                                onClick={() => void sendMessage()}
                                disabled={!composer.trim() || !activeSession || streaming}
                                aria-label="Send message"
                            >
                                {streaming ?
                                    <LoaderCircle className="animate-spin" /> :
                                    <Send />
                                }
                            </Button>
                        </div>
                        <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground">
                            RepoPilot can make mistakes. Verify important code changes.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
