import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LivePageSection } from "@/components/live-page-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Watch Live | Love Economy Church",
  description:
    "Watch Sunday Service, LC Live, and Stir Up prayer meetings live on our YouTube channel. Join from anywhere.",
}

export default function LivePage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <LivePageSection />
      <Footer />
    </main>
  )
}
