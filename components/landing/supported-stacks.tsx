export function SupportedStacks() {
  const stacks = [
    { name: "TypeScript / JavaScript", dotColor: "bg-yellow-400" },
    { name: "Java (Spring / Quarkus)", dotColor: "bg-orange-400" },
    { name: "Python (FastAPI / Django)", dotColor: "bg-blue-400" },
    { name: "Golang", dotColor: "bg-cyan-400" },
    { name: "Rust", dotColor: "bg-amber-600" },
    { name: "C# (.NET Core)", dotColor: "bg-purple-400" },
    { name: "Ruby (Rails)", dotColor: "bg-red-400" },
    { name: "PHP (Laravel / Symfony)", dotColor: "bg-pink-400" },
    { name: "C++", dotColor: "bg-gray-400" },
    { name: "Kotlin", dotColor: "bg-indigo-400" },
    { name: "Swift", dotColor: "bg-teal-400" },
    { name: "Scala", dotColor: "bg-violet-400" },
    { name: "Elixir (Phoenix)", dotColor: "bg-green-400" },
    
  ];

  return (
    <section className="py-16 border-t border-border bg-background" id="supported-stacks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    
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
