import type { ChatMessage, ChatSession, Citation, User, GithubRepository, RepositoryIndexStatusResponse } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, "") ||
  "http://localhost:8080";

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function api<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!res.ok) {
    const responseText = await res.text().catch(() => "");
    let message = responseText;

    try {
      const body = JSON.parse(responseText) as { message?: unknown };
      if (typeof body.message === "string") {
        message = body.message;
      }
    } catch {
      // Non-JSON responses are handled as plain text below.
    }

    throw new ApiError(message || res.statusText || `Request failed with status ${res.status}`, res.status);
  }

  const contentType = res.headers.get("content-type");
  return contentType?.includes("application/json")
    ? (res.json() as Promise<T>)
    : ((await res.text()) as unknown as T);
}

// Endpoints verified against Swagger (UserController)
export async function getLoginUrl(): Promise<string> {
  const path = await api<string>("/login_url");
  return path.startsWith("http")
    ? path
    : `${BASE_URL}/${path.replace(/^\/+/, "")}`;
}

export function getCurrentUser(): Promise<User> {
  return api<User>("/api/user/me");
}

export function logoutUser(): Promise<void> {
  return api<void>("/logout", { method: "POST" });
}

export async function getUserRepositories(): Promise<GithubRepository[]> {
  try {
    return await api<GithubRepository[]>("/api/user/repos");
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export function syncUserRepositories(): Promise<void> {
  return api<void>("/api/user/repos/sync", { method: "POST" });
}

export function startRepositoryIndexing(githubRepoId: number): Promise<void> {
  return api<void>(`/api/user/repo/${githubRepoId}/index`, { method: "POST" });
}

export function getRepositoryIndexStatus(githubRepoId: number): Promise<RepositoryIndexStatusResponse> {
  return api<RepositoryIndexStatusResponse>(`/api/user/repo/${githubRepoId}/status`);
}

export function getChatSessions(): Promise<ChatSession[]> {
  return api<ChatSession[]>("/api/chat/sessions");
}

export function initChatSession(repositoryId: string): Promise<ChatSession> {
  return api<ChatSession>(`/api/chat/session/init/${repositoryId}`, { method: "POST" });
}

export function getChatMessages(sessionId: string): Promise<ChatMessage[]> {
  return api<ChatMessage[]>(`/api/chat/session/${sessionId}/messages`);
}

export function deleteChatSession(sessionId: string): Promise<void> {
  return api<void>(`/api/chat/session/${sessionId}`, { method: "DELETE" });
}

type ChatStreamHandlers = {
  onToken: (token: string) => void;
  onCitations: (citations: Citation[]) => void;
  onDone: () => void;
};

export async function streamChatMessage(
  sessionId: string,
  question: string,
  handlers: ChatStreamHandlers,
): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/chat/session/${sessionId}/message`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    let message = responseText;
    try {
      const body = JSON.parse(responseText) as { message?: unknown };
      if (typeof body.message === "string") message = body.message;
    } catch {
      // Plain-text error responses are already usable.
    }
    throw new ApiError(message || response.statusText, response.status);
  }

  if (!response.body) throw new Error("The chat stream was not available.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let eventName = "message";
  let eventData: string[] = [];
  let completed = false;

  const dispatchEvent = () => {
    if (!eventData.length) {
      eventName = "message";
      return;
    }

    const data = eventData.join("\n");
    if (eventName === "token") handlers.onToken(data);
    if (eventName === "citations") handlers.onCitations(JSON.parse(data) as Citation[]);
    if (eventName === "done") {
      completed = true;
      handlers.onDone();
    }
    eventName = "message";
    eventData = [];
  };

  const processLine = (line: string) => {
    if (line === "") {
      dispatchEvent();
      return;
    }
    if (line.startsWith(":")) return;
    if (line.startsWith("event:")) {
      eventName = line.slice("event:".length).trim();
      return;
    }
    if (line.startsWith("data:")) {
      eventData.push(line.slice("data:".length));
    }
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value ?? new Uint8Array(), { stream: !done });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";
      lines.forEach(processLine);
      if (done) break;
    }
  } catch (error) {
    if (!completed) throw error;
    return;
  }
  buffer += decoder.decode();
  if (buffer) processLine(buffer);
  dispatchEvent();

  if (!completed) {
    throw new Error("The chat stream ended before completion.");
  }
}
