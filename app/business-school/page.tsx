import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BusinessSchoolSection } from "@/components/business-school-section"

export default function BusinessSchoolPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <BusinessSchoolSection />
      <Footer />
    </main>
  )
}

