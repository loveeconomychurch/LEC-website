import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChildrensMinistrySection } from "@/components/childrens-ministry-section"

export default function ChildrensMinistryPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <ChildrensMinistrySection />
      <Footer />
    </main>
  )
}
