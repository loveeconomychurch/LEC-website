import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VisitHeroSection } from "@/components/visit-hero-section"
import { VisitSection } from "@/components/visit-section"
import { CallSection } from "@/components/call-section"

export default function VisitPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <VisitHeroSection />
      <VisitSection />
      <CallSection />
      <Footer />
    </main>
  )
}
