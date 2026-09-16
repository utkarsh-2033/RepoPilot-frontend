import { GitBranch } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border">
          {/* Brand & status */}
          <div className="flex items-center gap-3">
            <div className="size-7 rounded-md bg-muted border border-border flex items-center justify-center text-primary">
              <GitBranch className="size-4" />
            </div>
            <span className="font-heading font-semibold text-foreground">RepoPilot</span>
            <span className="text-xs text-muted-foreground font-mono">© 2026 RepoPilot Inc.</span>
          </div>

          {/* Telemetry Status indicator */}
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/30 px-3 py-1 rounded border border-emerald-800/30">
            <span className="size-2 rounded-full bg-emerald-400" />
            <span>All systems operational</span>
          </div>

          {/* Developer Links */}
          <div className="flex items-center gap-6 text-xs font-mono">
            <a
              href="https://github.com/utkarsh-2033/RepoPilot-frontend"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a href="#connect" className="hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="#grounding" className="hover:text-foreground transition-colors">
              Security
            </a>
            <a href="#architecture" className="hover:text-foreground transition-colors">
              Changelog
            </a>
            <a href="#supported-stacks" className="hover:text-foreground transition-colors">
              Status
            </a>
          </div>
        </div>

        <div className="pt-6 text-center text-xs text-muted-foreground font-mono">
          Designed for developers.
        </div>
      </div>
    </footer>
  );
}
