import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

export function GroundingProof() {
  return (
    <section className="py-20 border-t border-border bg-muted/20" id="grounding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left narrative */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
              Grounding Architecture
            </div>

            <h3 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
              Not a chatbot.
              <br />
              A grounded code engine.
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed">
              Standard conversational chatbots guess method signatures and summarize outdated training data. RepoPilot checks your exact commit state before answering.
            </p>

            <ul className="space-y-3 font-mono text-xs text-foreground/90">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary shrink-0" />
                <span>Direct GitHub deep links to highlighted source lines</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary shrink-0" />
                <span>Tree-sitter symbol resolution for accurate method jumps</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary shrink-0" />
                <span>Audit trail for every file referenced in synthesis</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="#connect"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <span>Inspect how citations work in Docs</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>

          {/* Right citation card proof preview */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-border bg-card p-5 space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs font-mono text-muted-foreground font-semibold">
                  CITATIONS AUDIT PROOF
                </span>
                <Badge
                  variant="outline"
                  className="font-mono text-xs text-emerald-400 border-emerald-800/40 bg-emerald-950/40"
                >
                  Grounded: commit d98f4e2
                </Badge>
              </div>

              {/* Citation item 1 */}
              <div className="p-3.5 rounded bg-muted/30 border border-border text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-primary font-medium">
                    src/security/SecurityConfig.java:42-78
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                    RRF Score 0.941
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs font-mono">
                  Method: <span className="text-foreground">filterChain(HttpSecurity http)</span>
                </p>
                <div className="bg-card p-2.5 rounded font-mono text-[11px] text-foreground/90 border border-border overflow-x-auto">
                  <span className="text-purple-400">return</span> http.authorizeHttpRequests(auth -&gt; auth.requestMatchers(
                  <span className="text-emerald-400">&quot;/api/auth/**&quot;</span>).permitAll());
                </div>
              </div>

              {/* Citation item 2 */}
              <div className="p-3.5 rounded bg-muted/30 border border-border text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-primary font-medium">
                    src/controllers/AuthController.java:18-35
                  </span>
                  <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                    RRF Score 0.892
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs font-mono">
                  Endpoint: <span className="text-foreground">@PostMapping(&quot;/oauth/callback&quot;)</span>
                </p>
                <div className="bg-card p-2.5 rounded font-mono text-[11px] text-foreground/90 border border-border overflow-x-auto">
                  <span className="text-purple-400">public</span> ResponseEntity&lt;OAuthTokenResponse&gt;{" "}
                  <span className="text-blue-400">handleCallback</span>(@RequestParam String code) {"{ ... }"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
