import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CommunityOutreachSection } from "@/components/community-outreach-section"

export default function CommunityOutreachPage() {
  return (
    <main className="min-h-screen">
      <Header background={true} />
      <CommunityOutreachSection />
      <Footer />
    </main>
  )
}

