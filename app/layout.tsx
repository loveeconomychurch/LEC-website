import type React from "react"
import type { Metadata } from "next"
import { Anton, Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CmsPreviewListener } from "@/components/cms-preview-listener"
import { CartWrapper } from "@/components/cart"
import { SiteContentProvider } from "@/components/site-content-provider"
import { getAllContent } from "@/lib/cms-server"
import "./globals.css"

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://loveeconomychurch.org"),
  title: "Love Economy Church - Where Love Transforms Lives",
  description:
    "Join us for inspiring worship, meaningful community, and life-changing messages. Experience God's love economy in a welcoming environment.",
  generator: "v0.app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const content = await getAllContent()

  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${montserrat.variable} ${anton.variable} antialiased`}>
        <SiteContentProvider content={content}>
          <CartWrapper>
            <Suspense fallback={null}>{children}</Suspense>
            <CmsPreviewListener />
            <Analytics />
          </CartWrapper>
        </SiteContentProvider>
      </body>
    </html>
  )
}
