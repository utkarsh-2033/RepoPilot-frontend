import { Card } from "@/components/ui/card";

interface Stage {
  num: string;
  title: string;
  desc: string;
  tag: string;
  highlight?: boolean;
}

const stages: Stage[] = [
  {
  num: "STAGE 01",
  title: "GitHub Repository Indexing",
  desc: "GitHub tree and blob APIs retrieve repository files for indexing.",
  tag: "GitHub API",
},

{
  num: "STAGE 02",
  title: "Code Filtering & Chunking",
  desc: "Supported source files are filtered and split into token-based code chunks.",
  tag: "TokenTextSplitter",
},

{
  num: "STAGE 03",
  title: "Local Embeddings",
  desc: "Code chunks are converted into dense vector embeddings using Ollama.",
  tag: "nomic-embed-text",
},

{
  num: "STAGE 04",
  title: "PGVector Retrieval",
  desc: "Semantic similarity search retrieves the most relevant code chunks for each query.",
  tag: "pgvector",
},

{
  num: "STAGE 05",
  title: "RAG Context Generation",
  desc: "Retrieved chunks and their source metadata are assembled into the LLM context.",
  tag: "Top-K Context",
},

{
  num: "STAGE 06",
  title: "Verified Citations",
  desc: "LLM source IDs are validated and mapped to file paths and source locations.",
  tag: "Deterministic Mapping",
  highlight: true,
},
];

export function ArchitectureFlow() {
  return (
    <section className="py-20 border-t border-border bg-background" id="architecture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-2 font-semibold">
            Pipeline Topology
          </h2>
          <h3 className="font-heading text-3xl font-bold text-foreground">
            How code turns into deterministic context
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {stages.map((s) => (
            <Card
              key={s.num}
              className={`p-4 flex flex-col justify-between transition-all ${
                s.highlight
                  ? "bg-primary/10 border-primary/40"
                  : "bg-card border-border"
              }`}
            >
              <div>
                <span className="font-mono text-[10px] text-muted-foreground font-medium">
                  {s.num}
                </span>
                <h4 className="text-sm font-semibold text-foreground mt-1">
                  {s.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-border">
                <span
                  className={`font-mono text-[10px] font-semibold ${
                    s.highlight ? "text-primary" : "text-primary/90"
                  }`}
                >
                  {s.tag}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
