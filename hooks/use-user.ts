"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { getCurrentUser } from "@/lib/api";
import type { User } from "@/types";

export function useUser() {
  const query = useQuery<User>({
    queryKey: queryKeys.user.me(),
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isAuthenticated: !!query.data && !query.isError,
  };
}
