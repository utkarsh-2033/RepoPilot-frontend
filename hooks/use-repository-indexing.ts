"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getRepositoryIndexStatus, startRepositoryIndexing } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { GithubRepository, RepositoryIndexStatusResponse } from "@/types";

export function useRepositoryIndexing(repo: GithubRepository) {
  const queryClient = useQueryClient();
  const [pollingActive, setPollingActive] = useState(repo.indexStatus === "INDEXING");
  const statusQuery = useQuery<RepositoryIndexStatusResponse>({
    queryKey: queryKeys.repositories.status(repo.githubRepoId),
    queryFn: () => getRepositoryIndexStatus(repo.githubRepoId),
    enabled: pollingActive,
    refetchInterval: (query) => query.state.data?.indexStatus === "INDEXING" ? 2000 : false,
  });

  const indexMutation = useMutation({
    mutationFn: () => startRepositoryIndexing(repo.githubRepoId),
    onSuccess: () => {
      setPollingActive(true);
      queryClient.setQueryData(queryKeys.repositories.status(repo.githubRepoId), {
        indexStatus: "INDEXING",
        message: "Indexing started",
        filesProcessed: 0,
        totalFiles: 0,
        chunkCount: 0,
      } satisfies RepositoryIndexStatusResponse);
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.repositories.status(repo.githubRepoId) });
    },
  });

  const status = statusQuery.data ?? {
    indexStatus: repo.indexStatus,
    message: repo.indexError,
    filesProcessed: repo.filesProcessed,
    totalFiles: repo.filesTotal,
    chunkCount: repo.chunkCount,
  } satisfies RepositoryIndexStatusResponse;

  return {
    status,
    isIndexing: status.indexStatus === "INDEXING" || indexMutation.isPending,
    isStarting: indexMutation.isPending,
    isError: indexMutation.isError || status.indexStatus === "FAILED",
    error: indexMutation.error,
    start: indexMutation.mutate,
  };
}