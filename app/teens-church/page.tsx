import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TeensChurchSection } from "@/components/teens-church-section"

export default function TeensChurchPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <TeensChurchSection />
      <Footer />
    </main>
  )
}

