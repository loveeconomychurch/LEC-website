import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThreeOneSixSection } from "@/components/3one6-section"

export default function ThreeOneSixPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <ThreeOneSixSection />
      <Footer />
    </main>
  )
}

