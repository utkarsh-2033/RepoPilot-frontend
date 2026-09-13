import type { User, GithubRepository } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, "") ||
  "http://localhost:8080";

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
    const errorText = await res.text().catch(() => res.statusText);
    throw new Error(errorText || `Request failed with status ${res.status}`);
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

export function getUserRepositories(): Promise<GithubRepository[]> {
  return api<GithubRepository[]>("/api/user/repos");
}

export function syncUserRepositories(): Promise<void> {
  return api<void>("/api/user/repos/sync", { method: "POST" });
}
