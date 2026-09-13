"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon } from "@/components/icons/github-icon";
import { GitHubAuthButton } from "@/components/landing/github-auth-button";
import {
  GitBranch,
  ArrowRight,
  Shield,
  Info,
  ArrowLeftRight,
} from "lucide-react";

export function OAuthCard() {
  return (
    <div className="bg-card/90 backdrop-blur-xl border border-border shadow-2xl rounded-xl p-6 sm:p-8 relative text-left">
      {/* Connected App Badges */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="size-12 rounded-xl bg-muted/70 border border-border flex items-center justify-center p-2.5 shadow-inner">
          <GitBranch className="size-6 text-primary" />
        </div>

        {/* Bidirectional sync link indicator */}
        <div className="flex items-center justify-center px-1 text-primary">
          <div className="w-6 h-px bg-primary/40" />
          <ArrowLeftRight className="size-3.5 mx-1" />
          <div className="w-6 h-px bg-primary/40" />
        </div>

        <div className="size-12 rounded-xl bg-muted/70 border border-border flex items-center justify-center p-2.5 shadow-inner text-foreground">
          <GitHubIcon className="size-6" />
        </div>
      </div>

      {/* Heading & description */}
      <div className="text-center mb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground mb-2">
          Sign in to RepoPilot
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Connect your GitHub account to index code repositories and ask grounded questions with exact AST citations.
        </p>
      </div>

      {/* Primary Action: Connect with GitHub Button */}
      <div className="mb-5">
        <GitHubAuthButton
          size="lg"
          className="w-full py-3 h-11 text-sm justify-center gap-2.5 shadow-lg shadow-primary/20 hover:shadow-primary/30"
        >
          <GitHubIcon className="size-4.5 shrink-0" />
          <span>Continue with GitHub</span>
          <ArrowRight className="size-4 text-primary-foreground/80 ml-0.5" />
        </GitHubAuthButton>
      </div>

      {/* Scope & Permissions Disclosure */}
      <div className="mb-5 bg-muted/40 border border-border rounded-lg p-3.5 text-xs">
        <div className="flex items-center justify-between text-foreground font-medium mb-2.5">
          <span className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-primary" />
            Requested OAuth Scopes
          </span>
          <Badge
            variant="outline"
            className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-950/60 border-emerald-500/20"
          >
            Read-Only
          </Badge>
        </div>

        {/* Scope breakdown list */}
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2 font-mono text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-muted text-primary border border-border shrink-0">
              read:user
            </span>
            <span className="text-muted-foreground text-[11px] font-sans pt-0.5 leading-snug">
              Public profile identity &amp; verified email address
            </span>
          </li>
          <li className="flex items-start gap-2 font-mono text-[11px]">
            <span className="px-1.5 py-0.5 rounded bg-muted text-primary border border-border shrink-0">
              repo
            </span>
            <span className="text-muted-foreground text-[11px] font-sans pt-0.5 leading-snug">
              Read code syntax trees &amp; trigger webhooks on commit
            </span>
          </li>
        </ul>

        <div className="mt-3 pt-2.5 border-t border-border text-[11px] text-muted-foreground flex items-center gap-1.5">
          <Info className="size-3.5 text-primary shrink-0" />
          <span>Zero code leaves your boundary. AST slices persist in your isolated Qdrant vector collection.</span>
        </div>
      </div>

      {/* Trust Badges List */}
      <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-muted-foreground border-t border-border pt-4 mb-4">
        <div className="p-1.5 rounded bg-muted/30 border border-border">
          <span className="block text-foreground font-medium">SOC 2 Type II</span>
          <span className="text-muted-foreground/80">In Progress</span>
        </div>
        <div className="p-1.5 rounded bg-muted/30 border border-border">
          <span className="block text-foreground font-medium">No Model Training</span>
          <span className="text-muted-foreground/80">Zero Retention</span>
        </div>
        <div className="p-1.5 rounded bg-muted/30 border border-border">
          <span className="block text-foreground font-medium">AST Native</span>
          <span className="text-muted-foreground/80">Tree-Sitter Chunked</span>
        </div>
      </div>

      {/* Interactive Preview Link */}
      <div className="text-center pt-1">
        <Link
          href="/"
          className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-medium transition-colors"
        >
          <span>Want to explore first? View interactive public demo</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
