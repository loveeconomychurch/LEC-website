import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GiveSection } from "@/components/give-section"

export default function GivePage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <GiveSection />
      <Footer />
    </main>
  )
}
