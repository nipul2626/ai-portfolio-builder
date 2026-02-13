import { ParticleBackground } from "@/components/particle-background"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TemplatesSection } from "@/components/templates-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050510]">
      <ParticleBackground />
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="templates">
        <TemplatesSection />
      </div>
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
