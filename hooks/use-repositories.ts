"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getUserRepositories, syncUserRepositories } from "@/lib/api";
import type { GithubRepository } from "@/types";

export function useRepositories() {
  const query = useQuery<GithubRepository[]>({
    queryKey: queryKeys.repositories.list(),
    queryFn: getUserRepositories,
    staleTime: 1000 * 60 * 2,
  });

  return {
    repositories: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useSyncRepositories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncUserRepositories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.all });
    },
  });
}
