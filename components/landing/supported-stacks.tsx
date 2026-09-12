export function SupportedStacks() {
  const stacks = [
    { name: "TypeScript / JavaScript", dotColor: "bg-yellow-400" },
    { name: "Java (Spring / Quarkus)", dotColor: "bg-orange-400" },
    { name: "Python (FastAPI / Django)", dotColor: "bg-blue-400" },
    { name: "Golang", dotColor: "bg-cyan-400" },
    { name: "Rust", dotColor: "bg-amber-600" },
  ];

  return (
    <section className="py-16 border-t border-border bg-background" id="supported-stacks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6 font-semibold">
          First-Class AST Grammars Supported
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 font-mono text-sm text-foreground">
          {stacks.map((stack) => (
            <div
              key={stack.name}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-card border border-border hover:border-primary/40 transition-colors"
            >
              <span className={`size-2 rounded-full ${stack.dotColor}`} />
              <span>{stack.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
