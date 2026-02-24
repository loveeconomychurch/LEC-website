import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MinistriesSection } from "@/components/ministries-section"
import { Footer } from "@/components/footer"
import { LatestSermon } from "@/components/latest-sermon"
import { VisitSection } from "@/components/visit-section"
import { WelcomeSection } from "@/components/welcome-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <LatestSermon />
      <MinistriesSection />
      <VisitSection />
      <WelcomeSection />
      <Footer />
    </main>
  )
}
