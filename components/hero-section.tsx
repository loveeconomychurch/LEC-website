"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useSiteContent } from "@/hooks/use-site-content"
import { defaultHero } from "@/lib/content-defaults"

export function HeroSection() {
  const { data, loading } = useSiteContent("hero")
  if (loading || !data) return null
  return (
    <section id="home" data-cms-section="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 hidden">
        <Image
          src={data.backgroundImageUrl}
          alt="Church worship service"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-100"
        >
          <source
            src={data.videoUrl}
            type="video/mp4"
          />
          <img
            src={data.backgroundImageUrl}
            alt="Church worship service"
            className="w-full h-full object-cover opacity-70"
          />
        </video>
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div 
          className="mb-8 hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Image
            src="/love-economy-church-logo.png"
            alt="Love Economy Church Logo"
            width={120}
            height={120}
            className="mx-auto filter brightness-0 invert"
          />
        </motion.div>

        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 text-balance leading-tight tracking-wider px-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <span style={{ color: "white" }}>{data.headline}</span>
        </motion.h1>

        <motion.p 
          className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-5 text-gray-200 max-w-4xl mx-auto text-balance font-light leading-relaxed w-full sm:w-5/6 px-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {defaultHero.subtitle}
        </motion.p>

        <motion.p 
          className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 text-gray-200 max-w-4xl mx-auto text-balance font-semibold leading-relaxed w-full sm:w-5/6 px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {defaultHero.serviceTimes}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            {data.primaryCtaLink ? (
              <Button
                size="lg"
                style={{ backgroundColor: "#1762B9" }}
                className="text-white hover:opacity-90 font-bold w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full"
                asChild
              >
                <Link href={data.primaryCtaLink}>{data.primaryCta}</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                style={{ backgroundColor: "#1762B9" }}
                className="text-white hover:opacity-90 font-bold w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full"
              >
                {data.primaryCta}
              </Button>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto max-w-xs sm:max-w-none"
          >
            {data.secondaryCtaLink ? (
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full"
                asChild
              >
                <Link 
                href={data.secondaryCtaLink}>
                  {data.secondaryCta}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full"
              >
                {data.secondaryCta}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden" aria-hidden>
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </section>
  )
}
