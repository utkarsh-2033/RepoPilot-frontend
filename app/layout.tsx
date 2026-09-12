import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Roboto_Slab } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const robotoSlabHeading = Roboto_Slab({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RepoPilot — AI Codebase Assistant with AST Grounding",
  description: "Connect GitHub, index your repositories in seconds, and ask questions about your code with 100% grounded AI answers and exact file citations.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable, robotoSlabHeading.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
