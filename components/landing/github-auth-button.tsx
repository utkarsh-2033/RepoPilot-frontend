"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { getLoginUrl } from "@/lib/api";
import { LoaderCircle } from "lucide-react";

interface GitHubAuthButtonProps extends React.ComponentProps<"button"> {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  children?: React.ReactNode;
}

export function GitHubAuthButton({
  variant = "default",
  size = "default",
  className,
  children,
  onClick,
  disabled,
  ...props
}: GitHubAuthButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }

    try {
      setIsLoading(true);
      const url = await getLoginUrl();
      window.location.assign(url);
    } catch (error) {
      console.error("Failed to fetch login URL from backend, falling back to default:", error);
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, "") ||
        "http://localhost:8080";
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`${serverUrl}/oauth2/authorization/github`);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("cursor-pointer font-medium relative", className)}
      onClick={handleAuth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-1.5">
          <LoaderCircle className="size-3.5 animate-spin" />
          <span>Connecting...</span>
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
