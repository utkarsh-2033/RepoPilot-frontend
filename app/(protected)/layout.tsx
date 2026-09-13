"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { GitBranch, LoaderCircle } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isError } = useUser();

  React.useEffect(() => {
    if (!isLoading && (isError || !user)) {
      router.replace("/login");
    }
  }, [user, isLoading, isError, router]);

  // Loading state while verifying user session
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary shadow-lg animate-pulse">
            <GitBranch className="size-6" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <LoaderCircle className="size-3.5 animate-spin text-primary" />
            <span>Verifying session...</span>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated, hold until redirect fires
  if (isError || !user) {
    return null;
  }

  // Authenticated: render protected route contents
  return <>{children}</>;
}
