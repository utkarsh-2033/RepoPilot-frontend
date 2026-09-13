import { AlertTriangle } from "lucide-react";

export function SamlNotice() {
  return (
    <div className="mt-4 bg-card/60 border border-amber-500/30 rounded-lg p-3 text-xs text-muted-foreground flex items-start gap-2.5 text-left">
      <AlertTriangle className="size-4 text-amber-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <span className="text-amber-300 font-medium block mb-0.5">
          Organization with SAML SSO?
        </span>
        <span className="leading-relaxed">
          Ensure third-party OAuth application access is authorized in your GitHub organization settings.
        </span>
        <a
          href="https://docs.github.com/en/organizations/managing-oauth-access-to-your-organizations-data"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline block mt-1 font-medium"
        >
          Read SSO troubleshooting guide →
        </a>
      </div>
    </div>
  );
}
