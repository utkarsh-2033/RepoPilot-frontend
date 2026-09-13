import Link from "next/link";
import { Lock } from "lucide-react";

export function LoginFooter() {
  return (
    <footer className="relative z-10 w-full border-t border-border bg-card/60 px-4 py-4 text-xs text-muted-foreground text-center">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Security Protocol Note */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Lock className="size-3.5 text-primary shrink-0" />
          <span>GitHub OAuth 2.0· End-to-end encrypted session tokens</span>
        </div>

        {/* Operational Status and Links */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 font-medium">All systems operational</span>
          </div>
          <span className="text-border">|</span>
          <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/#architecture" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/#grounding" className="hover:text-foreground transition-colors">
            Security
          </Link>
        </div>
      </div>
    </footer>
  );
}
