"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, LoaderCircle } from "lucide-react";
import { useUser } from "@/hooks/use-user";

export function LoginAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) router.replace("/dashboard");
  }, [isLoading, router, user]);

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <GitBranch className="size-6 text-primary" />
          <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return children;
}