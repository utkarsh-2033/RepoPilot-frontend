import Link from "next/link";
import { Badge  } from "@/components/ui/badge";
import { SignInButton } from "@/components/landing/sign-in-button";

import { GitBranch } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-8 rounded-md bg-card border border-border flex items-center justify-center text-primary transition-transform group-hover:scale-105">
              <GitBranch className="size-4" />
            </div>
            <span className="font-heading font-semibold text-lg text-foreground tracking-tight">
              RepoPilot
            </span>
          </Link>
          <Badge variant="outline" className="font-mono text-[10px] text-primary">
            v1.0.0
          </Badge>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#architecture" className="hover:text-foreground transition-colors">
            Architecture
          </a>
          <a href="#grounding" className="hover:text-foreground transition-colors">
            Citations & Safety
          </a>
          <a href="#supported-stacks" className="hover:text-foreground transition-colors">
            Supported Stacks
          </a>
          <a href="#connect" className="hover:text-foreground transition-colors">
            Docs
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <SignInButton className="px-7 py-3 text-base" />
          
        </div>
      </div>
    </header>
  );
}
