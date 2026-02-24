import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PrayerSection } from "@/components/prayer-section"

export default function PrayerPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <PrayerSection />
      <Footer />
    </main>
  )
}

