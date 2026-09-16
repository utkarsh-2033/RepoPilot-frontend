"use client";

import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SignInButton({ className }: { className?: string }) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  return (
    <Button
      type="button"
      size="lg"
      className={cn("gap-2.5 shadow-lg", className)}
      disabled={isLoading}
      onClick={() => router.push(user ? "/dashboard" : "/login")}
    >
      {isLoading ? <LoaderCircle className="size-4 animate-spin" /> : null}
      {isLoading ? "Checking session" : user ? "Open dashboard" : "Sign in"}
    </Button>
  );
}

