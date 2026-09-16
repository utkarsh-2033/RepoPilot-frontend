"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteChatSession, getChatMessages, getChatSessions, initChatSession } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { ChatMessage, ChatSession } from "@/types";

export function useChatSessions() {
  return useQuery<ChatSession[]>({
    queryKey: queryKeys.chat.sessions(),
    queryFn: getChatSessions,
  });
}

export function useChatMessages(sessionId: string | null) {
  return useQuery<ChatMessage[]>({
    queryKey: queryKeys.chat.messages(sessionId ?? ""),
    queryFn: () => getChatMessages(sessionId as string),
    enabled: Boolean(sessionId),
  });
}

export function useInitChatSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: initChatSession,
    onSuccess: async (session) => {
      queryClient.setQueryData<ChatSession[]>(queryKeys.chat.sessions(), (sessions = []) => [session, ...sessions]);
      await queryClient.refetchQueries({ queryKey: queryKeys.chat.sessions(), type: "active" });
    },
  });
}

export function useDeleteChatSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChatSession,
    onSuccess: async (_, sessionId) => {
      queryClient.removeQueries({ queryKey: queryKeys.chat.messages(sessionId) });
      queryClient.setQueryData<ChatSession[]>(queryKeys.chat.sessions(), (sessions = []) => sessions.filter((session) => session.id !== sessionId));
      await queryClient.refetchQueries({ queryKey: queryKeys.chat.sessions(), type: "active" });
    },
  });
}
