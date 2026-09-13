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
  },
} as const;
