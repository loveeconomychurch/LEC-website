import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { KChurchSection } from "@/components/k-church-section"

export default function KChurchPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <KChurchSection />
      <Footer />
    </main>
  )
}

