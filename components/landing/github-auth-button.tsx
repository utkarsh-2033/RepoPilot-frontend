"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

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
  ...props
}: GitHubAuthButtonProps) {
  const handleAuth = () => {
    const authServerUrl = process.env.NEXT_PUBLIC_AUTH_SERVER_URL;
    if (authServerUrl) {
      window.location.href = authServerUrl;
    } else {
      window.location.href = "http://localhost:8080/oauth2/authorization/github";
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("cursor-pointer font-medium", className)}
      onClick={handleAuth}
      {...props}
    >
      {children}
    </Button>
  );
}
