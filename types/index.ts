export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface GithubRepository {
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
}
