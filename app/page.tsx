import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ProductPreview } from "@/components/landing/product-preview";
import { CoreCapabilities } from "@/components/landing/core-capabilities";
import { ArchitectureFlow } from "@/components/landing/architecture-flow";
import { GroundingProof } from "@/components/landing/grounding-proof";
import { SupportedStacks } from "@/components/landing/supported-stacks";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProductPreview />
        <CoreCapabilities />
        <ArchitectureFlow />
        <GroundingProof />
        <SupportedStacks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
