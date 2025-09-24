import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { MinistriesSection } from "@/components/ministries-section"
import { SermonSection } from "@/components/sermon-section"
import { EventsSection } from "@/components/events-section"
import { ConnectSection } from "@/components/connect-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ExperienceSection />
      <MinistriesSection />
      <SermonSection />
      <EventsSection />
      <ConnectSection />
      <Footer />
    </main>
  )
}
