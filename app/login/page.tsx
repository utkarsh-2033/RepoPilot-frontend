import type { Metadata } from "next";
import { LoginHeader } from "@/components/login/login-header";
import { OAuthCard } from "@/components/login/oauth-card";
import { SamlNotice } from "@/components/login/saml-notice";
import { LoginFooter } from "@/components/login/login-footer";
import { LoginAuthGuard } from "@/components/login/login-auth-guard";

export const metadata: Metadata = {
  title: "Sign in · RepoPilot Codebase Assistant",
  description:
    "Connect your GitHub account to index code repositories and ask grounded questions with exact citations.",
};

export default function LoginPage() {
  return <LoginAuthGuard><div className="min-h-screen flex flex-col justify-between bg-background text-foreground relative overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <div className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center"><div className="h-122.5 w-137.5 rounded-full bg-primary/10 blur-3xl" /></div>
      <LoginHeader />

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-115 mx-auto">
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Decoupled Grounding Engine
            </div>
          </div>

          <OAuthCard />
          <SamlNotice />
        </div>
      </main>

      <LoginFooter />
    </div></LoginAuthGuard>;
}
