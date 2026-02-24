"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { useSiteContent } from "@/hooks/use-site-content"

export function VisitHeroSection() {
  const { data: visitHeroData, loading: visitHeroLoading } = useSiteContent("visitHero")
  const { data: heroData, loading: heroLoading } = useSiteContent("hero")
  const { data: serviceTimesData, loading: serviceTimesLoading } = useSiteContent("aboutServiceTimes")

  if (visitHeroLoading || heroLoading || serviceTimesLoading || !visitHeroData || !heroData || !serviceTimesData) return null

  const videoUrl = visitHeroData.videoUrl || heroData.videoUrl
  const backgroundImageUrl = visitHeroData.backgroundImageUrl || heroData.backgroundImageUrl

  return (
    <section data-cms-section="visitHero" className="bg-black">
      <div className="relative h-[65vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
            <img
              src={backgroundImageUrl}
              alt="Church worship service"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {visitHeroData.title}
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {visitHeroData.subheadline}
          </motion.p>
        </div>
        <div className="absolute top-[25vh] inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-transparent -rotate-[180deg] h-96 z-10" />
      </div>

      {/* Service times + CTA */}
      <div className="w-full mx-auto py-16 sm:py-18 px-6 sm:px-8 bg-neutral-900">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 text-white">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white/90" />
            <div className="text-left">
              <p className="font-bold text-lg sm:text-xl">{serviceTimesData.sundayLabel}</p>
              <p className="text-neutral-300 text-sm sm:text-base">{serviceTimesData.sundayTime}</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-14 sm:h-16 bg-white/20" />
          <div className="flex items-center gap-3 text-white">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white/90" />
            <div className="text-left">
              <p className="font-bold text-lg sm:text-xl">{serviceTimesData.sundayLabel}</p>
              <p className="text-neutral-300 text-sm sm:text-base">{serviceTimesData.sundayTime}</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-14 sm:h-16 bg-white/20" />
          <div className="flex items-center gap-3 text-white">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white/90" />
            <div className="text-left">
              <p className="font-bold text-lg sm:text-xl">{serviceTimesData.wednesdayLabel}</p>
              <p className="text-neutral-300 text-sm sm:text-base">{serviceTimesData.wednesdayTime}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            size="lg"
            style={{ backgroundColor: "#1762B9" }}
            className="text-white hover:opacity-90 font-bold px-6 sm:px-10 py-4 sm:py-5 text-base rounded-full"
            asChild
          >
            <Link href={visitHeroData.ctaLink}>
              {visitHeroData.ctaText}
              <ArrowRight className="ml-2 size-5 sm:size-6" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
