import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Cpu, MessageSquareCode } from "lucide-react";

export function CoreCapabilities() {
  return (
    <section className="py-20 border-t border-border bg-muted/20" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-3 font-semibold">
            Core Workflow
          </h2>
          <h3 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Engineered for deterministic code understanding.
          </h3>
          <p className="mt-4 text-muted-foreground text-base leading-relaxed">
            No generic web search hallucinations. RepoPilot builds an indexed graph directly from your source tree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Card className="hover:border-primary/50 transition-all group bg-card">
            <CardHeader>
              <div className="size-10 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <GitBranch className="size-5" />
              </div>
              <div className="font-mono text-xs text-primary mb-1">01 / INTEGRATION</div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Connect GitHub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Authorize with scoped, read-only OAuth. Pick single repositories or whole organizations. Automatic webhook sync triggers on every push to your default branch.
              </p>
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-1.5 pt-2 border-t border-border">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Public & Private repo support
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="hover:border-primary/50 transition-all group bg-card">
            <CardHeader>
              <div className="size-10 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <Cpu className="size-5" />
              </div>
              <div className="font-mono text-xs text-primary mb-1">02 / EMBEDDINGS</div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Code Indexing with Metadata
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Index your codebase with rich metadata. Every file is tagged with filepath, language, size, and other relevant information.
              </p>
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-1.5 pt-2 border-t border-border">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                context-aware embeddings
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="hover:border-primary/50 transition-all group bg-card">
            <CardHeader>
              <div className="size-10 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                <MessageSquareCode className="size-5" />
              </div>
              <div className="font-mono text-xs text-primary mb-1">03 / RETRIEVAL</div>
              <CardTitle className="text-lg font-semibold text-foreground">
                Grounded Questions with citations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Ask grounded questions and get answers with verifiable citations. Every response includes the source complete filepath , filename, and approximate line range.
              </p>
              <div className="font-mono text-xs text-muted-foreground flex items-center gap-1.5 pt-2 border-t border-border">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Zero hallucinated methods guarantee
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
