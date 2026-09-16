"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
          <Button size="lg" className="px-7 py-3 text-base gap-2.5 shadow-lg">
            <Link href="/login" className="w-full sm:w-auto gap-2 text-sm font-medium text-foreground underline">Sign in</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
