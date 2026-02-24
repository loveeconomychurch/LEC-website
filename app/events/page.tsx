import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventsFeaturedSection } from "@/components/events-featured-section"

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <EventsFeaturedSection />
      <Footer />
    </main>
  )
}

