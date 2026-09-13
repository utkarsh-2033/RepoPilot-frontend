"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";

export function CliFallback() {
  const [copied, setCopied] = React.useState(false);
  const command = "npx @repopilot/cli login";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="mt-4 p-3 rounded-lg bg-muted/40 border border-border flex items-center justify-between text-xs font-mono">
      <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
        <span className="text-primary select-none font-semibold">$</span>
        <span className="text-foreground">{command}</span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="text-[11px] text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 px-2 py-1 rounded transition-colors shrink-0 ml-2 inline-flex items-center gap-1 cursor-pointer"
        aria-label="Copy CLI login command"
      >
        {copied ? (
          <>
            <Check className="size-3 text-primary" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="size-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
