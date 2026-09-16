/**
 * Centralized TanStack Query Keys Factory
 * Extend this object as new entities and features are introduced.
 */
export const queryKeys = {
  user: {
    all: ["user"] as const,
    me: () => [...queryKeys.user.all, "me"] as const,
  },
  repositories: {
    all: ["repositories"] as const,
    list: () => [...queryKeys.repositories.all, "list"] as const,
    status: (githubRepoId: number) => [...queryKeys.repositories.all, "status", githubRepoId] as const,
  },
  chat: {
    all: ["chat"] as const,
    sessions: () => [...queryKeys.chat.all, "sessions"] as const,
    messages: (sessionId: string) => [...queryKeys.chat.all, "messages", sessionId] as const,
  },
} as const;
