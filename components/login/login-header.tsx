import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { GitBranch, ArrowLeft } from "lucide-react";

export function LoginHeader() {
  return (
    <header className="relative z-10 w-full border-b border-border bg-card/60 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Brand identity */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="RepoPilot Home"
          className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
        >
          <div className="size-7 rounded-md bg-muted border border-border flex items-center justify-center text-primary transition-transform group-hover:scale-105">
            <GitBranch className="size-4" />
          </div>
          <span className="font-heading font-bold text-foreground text-base tracking-tight">
            RepoPilot
          </span>
        </Link>
        <Badge
          variant="outline"
          className="font-mono text-[11px] text-primary border-primary/30 bg-primary/10"
        >
          v2.4-codex
        </Badge>
      </div>

      {/* Quick navigation */}
      <div className="flex items-center gap-4 text-xs">
        <Link
          href="/"
          className="hidden sm:inline-flex items-center text-muted-foreground hover:text-foreground transition-colors font-medium gap-1"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to homepage</span>
        </Link>
        <Link
          href="/#how-it-works"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Documentation
        </Link>
      </div>
    </header>
  );
}
