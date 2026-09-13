"use client";

import * as React from "react";
import { GitHubAuthButton } from "@/components/landing/github-auth-button";
import { GitHubIcon } from "@/components/icons/github-icon";
import { Copy, Check } from "lucide-react";

export function CTASection() {
  const [copied, setCopied] = React.useState(false);
  const command = "npx @repopilot/cli index --current-repo";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <section className="py-24 border-t border-border bg-muted/20 relative overflow-hidden" id="connect">
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
          Your codebase already has the answers.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
          Index your first repository in under 60 seconds. Connect your GitHub account to get started immediately.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <GitHubAuthButton size="lg" className="px-7 py-3 text-base gap-2.5 shadow-lg">
            <GitHubIcon className="size-5" />
            <span>Continue with GitHub</span>
          </GitHubAuthButton>
        </div>

        {/* CLI quick tip */}
        <div className="mt-8 inline-block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border font-mono text-xs text-foreground/90 shadow-sm">
            <span className="text-muted-foreground">$</span>
            <span>{command}</span>
            <button
              onClick={handleCopy}
              className="ml-2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5 rounded transition-colors"
              title="Copy CLI Command"
              aria-label="Copy CLI command"
            >
              {copied ? (
                <Check className="size-3.5 text-primary" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
