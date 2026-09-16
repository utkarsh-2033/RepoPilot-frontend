export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface GithubRepository {
  id: string;
  githubRepoId: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  defaultBranch: string;
  language: string | null;
  owner: string;
  ownerHtmlUrl: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  indexStatus: "PENDING" | "INDEXING" | "READY" | "FAILED";
  indexError: string | null;
  filesProcessed: number;
  filesTotal: number;
  chunkCount: number;
}

export type RepositoryIndexStatus = "PENDING" | "INDEXING" | "READY" | "FAILED";

export interface RepositoryIndexStatusResponse {
  indexStatus: RepositoryIndexStatus;
  message: string | null;
  filesProcessed: number;
  totalFiles: number;
  chunkCount: number;
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
  repositoryId: string;
  repositoryName: string | null;
}

export interface Citation {
  id: string;
  filePath: string;
  startLine: number;
  endLine: number;
  language: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  role: "USER" | "ASSISTANT";
  createdAt: string;
  citations: Citation[];
}
