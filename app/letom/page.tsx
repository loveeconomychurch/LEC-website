import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LetomSection } from "@/components/letom-section"

export default function LetomPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <LetomSection />
      <Footer />
    </main>
  )
}

