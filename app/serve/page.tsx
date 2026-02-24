import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServeSection } from "@/components/serve-section"

export default function ServePage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <ServeSection />
      <Footer />
    </main>
  )
}

