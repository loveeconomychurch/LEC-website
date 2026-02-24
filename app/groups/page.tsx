import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LCLiveSection } from "@/components/lc-live-section"

export const metadata = {
  title: "LC Live | Wednesday Service",
  description: "Our Wednesday service—streamed live. Gather in homes, workplaces, open spaces or anywhere and watch LC Live together online.",
}

export default function LCLivePage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <LCLiveSection />
      <Footer />
    </main>
  )
}

