import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FolderGit2,
  FileCode2,
  ArrowRight,
  Send,
  ShieldCheck,
} from "lucide-react";

export function ProductPreview() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden text-left text-xs font-sans">
        {/* Window Frame Header */}
        <div className="h-10 bg-muted/40 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-red-500/80" />
            <div className="size-2.5 rounded-full bg-yellow-500/80" />
            <div className="size-2.5 rounded-full bg-green-500/80" />
            <span className="text-muted-foreground text-xs ml-2 font-mono hidden sm:inline">
              repopilot-workspace — utkarsh/myrepo
            </span>
          </div>

          {/* Active repo indicator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-muted border border-border font-mono text-[11px] text-foreground">
              <FolderGit2 className="size-3.5 text-muted-foreground" />
              <span>utkarsh/myrepo</span>
              <span className="text-primary font-semibold">main</span>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] font-mono text-emerald-400 border-emerald-800/40 bg-emerald-950/40 gap-1"
            >
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ready
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
            <span>commit d98f4e2</span>
          </div>
        </div>

        {/* Workspace Layout: Mini Sidebar + Chat Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-120">
          {/* Mini Sessions Sidebar */}
          <div className="hidden md:block md:col-span-3 border-r border-border bg-muted/20 p-3 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="text-[11px] font-mono font-medium text-muted-foreground uppercase tracking-wider">
                Sessions (6)
              </span>
              <button className="text-xs text-primary font-medium hover:underline cursor-pointer">
                + New chat
              </button>
            </div>

            {/* Active session item */}
            <div className="p-2.5 rounded bg-muted/60 border border-primary/40 text-foreground">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium truncate">Authentication architect...</span>
                <span className="text-[10px] text-primary font-mono">4 msgs</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 truncate">
                Spring Security & OAuth flow
              </p>
            </div>

            {/* Inactive session items */}
            <div className="p-2 rounded hover:bg-muted/40 text-muted-foreground text-[11px] cursor-pointer">
              <div className="flex justify-between">
                <span className="truncate">Repository indexing flow</span>
                <span className="text-[10px]">1d</span>
              </div>
              <span className="text-[10px] text-muted-foreground/70">Chunking pipeline</span>
            </div>

            <div className="p-2 rounded hover:bg-muted/40 text-muted-foreground text-[11px] cursor-pointer">
              <div className="flex justify-between">
                <span className="truncate">RAG vector chunking</span>
                <span className="text-[10px]">2d</span>
              </div>
              </div>

            <div className="p-2 rounded hover:bg-muted/40 text-muted-foreground text-[11px] cursor-pointer">
              <div className="flex justify-between">
                <span className="truncate">Database pool parameters</span>
                <span className="text-[10px]">3d</span>
              </div>
              <span className="text-[10px] text-muted-foreground/70">HikariCP tuning</span>
            </div>

            {/* Telemetry pill in mini-sidebar */}
            <div className="pt-8 text-[11px] text-muted-foreground font-mono">
              <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1">
                <span>Vector Grounding</span>
                <span className="text-primary font-semibold">100% Synced</span>
              </div>
              <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-full" />
              </div>
              <p className="text-[9px] mt-1.5 text-muted-foreground">42,381 chunks active</p>
            </div>
          </div>

          {/* Main Chat Panel */}
          <div className="md:col-span-9 p-4 sm:p-6 flex flex-col justify-between space-y-4 bg-background">
            <div className="space-y-4">
              {/* User Question Bubble */}
              <div className="flex justify-end">
                <div className="max-w-xl bg-primary/10 border border-primary/30 rounded-lg p-3 text-sm text-foreground">
                  How is authentication and GitHub OAuth handled, and what files configure the security filter chain?
                  <div className="text-[10px] text-primary/80 text-right mt-1 font-mono">
                    Utkarsh · 2m ago
                  </div>
                </div>
              </div>

              {/* Assistant Response Bubble */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-[10px] text-primary border-primary/40 bg-primary/10">
                    RepoPilot Assistant v2.4
                  </Badge>
                  <span className="text-[11px] text-muted-foreground font-mono">1m ago</span>
                </div>

                <div className="text-sm text-foreground/90 leading-relaxed">
                  Authentication in{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 bg-muted rounded border border-border text-primary">
                    utkarsh/myrepo
                  </code>{" "}
                  is architected via <strong>Spring Security 6</strong> with delegated GitHub OAuth2 provider flows. Incoming requests traverse a custom security filter chain defined in{" "}
                  <code className="font-mono text-xs px-1.5 py-0.5 bg-muted rounded border border-border text-primary">
                    SecurityConfig.java
                  </code>
                  , mounting a stateless JWT filter before username-password handlers.
                </div>

                {/* Grounded Citations Box */}
                <div className="p-3 rounded-md bg-muted/40 border border-border space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-primary">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <ShieldCheck className="size-3.5 text-primary" />
                      RETRIEVED CODE CITATIONS (2 FILES GROUNDED)
                    </span>
                    <span className="text-muted-foreground text-[10px]">Vector similarity: 0.94</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-card border border-border text-foreground hover:border-primary transition-colors cursor-pointer">
                      <FileCode2 className="size-3.5 text-primary" />
                      <span>src/security/SecurityConfig.java</span>
                      <Badge variant="secondary" className="text-[10px] font-mono text-primary bg-primary/15 px-1 py-0">
                        L42-78
                      </Badge>
                      <ArrowRight className="size-3 text-muted-foreground" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-card border border-border text-foreground hover:border-primary transition-colors cursor-pointer">
                      <FileCode2 className="size-3.5 text-primary" />
                      <span>src/controllers/AuthController.java</span>
                      <Badge variant="secondary" className="text-[10px] font-mono text-foreground bg-muted px-1 py-0">
                        L18-54
                      </Badge>
                      <ArrowRight className="size-3 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Code Block Preview */}
                <div className="rounded-md border border-border bg-card overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-muted/40 border-b border-border text-[11px] font-mono text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FileCode2 className="size-3.5 text-primary" />
                      <span>SecurityConfig.java · lines 42-50</span>
                    </div>
                    <span className="text-[10px] font-bold">JAVA</span>
                  </div>
                  <pre className="p-3 text-[11px] font-mono leading-relaxed overflow-x-auto text-foreground/90 bg-muted/10">
                    <span className="text-muted-foreground/60 select-none">42 </span>
                    <span className="text-primary font-medium">@Configuration</span>
                    {"\n"}
                    <span className="text-muted-foreground/60 select-none">43 </span>
                    <span className="text-primary font-medium">@EnableWebSecurity</span>
                    {"\n"}
                    <span className="text-muted-foreground/60 select-none">44 </span>
                    <span className="text-purple-400">public class</span>{" "}
                    <span className="text-yellow-300">SecurityConfig</span> {"{"}
                    {"\n"}
                    <span className="text-muted-foreground/60 select-none">45 </span>
                    {"\n"}
                    <span className="text-muted-foreground/60 select-none">46 </span>{"   "}
                    <span className="text-primary font-medium">@Bean</span>
                    {"\n"}
                    <span className="text-muted-foreground/60 select-none">47 </span>{"   "}
                    <span className="text-purple-400">public</span> SecurityFilterChain{" "}
                    <span className="text-blue-400">filterChain</span>(HttpSecurity http){" "}
                    <span className="text-purple-400">throws</span> Exception {"{"}
                    {"\n"}
                    <span className="text-muted-foreground/60 select-none">48 </span>{"     "}
                    <span className="text-purple-400">return</span> http
                    {"\n"}
                    <span className="text-muted-foreground/60 select-none">49 </span>{"       "}
                    .csrf(AbstractHttpConfigurer::disable)
                    {"\n"}
                    <span className="text-muted-foreground/60 select-none">50 </span>{"       "}
                    .authorizeHttpRequests(auth -&gt; auth.requestMatchers(
                    <span className="text-emerald-400">&quot;/api/auth/**&quot;</span>).permitAll());
                  </pre>
                </div>
              </div>
            </div>

            {/* Sticky Prompt Composer Inside Preview */}
            <div className="pt-3 border-t border-border">
              <div className="rounded-lg border border-border bg-card p-2 flex items-center justify-between gap-2">
                <span className="text-muted-foreground text-xs font-mono pl-2 truncate">
                  Ask about architecture, files, flows in utkarsh/myrepo...
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline">
                    Press Enter ↵
                  </span>
                  <Button size="xs" className="gap-1 px-2.5">
                    <span>Send</span>
                    <Send className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
