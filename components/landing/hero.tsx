import { Button } from "@/components/ui/button";
import { GitHubAuthButton } from "@/components/landing/github-auth-button";
import { ArrowRight, Check, Code2, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[380px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-wide uppercase mb-6">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          AI Codebase Assistant · RAG with AST Chunking
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
          Talk to your codebase.
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Connect GitHub, index your repositories in seconds, and ask questions about your code with 100% grounded AI answers and exact file citations.
        </p>

        {/* CTA Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <GitHubAuthButton size="lg" className="w-full sm:w-auto gap-2 text-sm">
            <span>Continue with GitHub</span>
            <ArrowRight className="size-4" />
          </GitHubAuthButton>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2 text-sm border-border"
            render={<a href="#how-it-works" />}
          >
            <Terminal className="size-4 text-primary" />
            <span>See How It Works</span>
          </Button>
        </div>

        {/* Trust signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-muted-foreground font-mono">
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-primary" />
            Zero code leaves your boundary
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-primary" />
            Read-only GitHub OAuth
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Code2 className="size-3.5 text-primary" />
            AST Semantic Parsing
          </span>
        </div>
      </div>
    </section>
  );
}
