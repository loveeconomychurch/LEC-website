import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationsSection } from "@/components/locations-section"

export default function LocationsPage() {
  return (
    <main className="min-h-screen">
      {/* <Header background={true} /> */}
      <LocationsSection />
      {/* <Footer /> */}
    </main>
  )
}

