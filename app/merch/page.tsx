import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MerchSection } from "@/components/merch-section"

export default function MerchPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <MerchSection />
      <Footer />
    </main>
  )
}

