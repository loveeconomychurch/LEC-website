"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Users, HandHeart, Building, ClipboardCheck, Heart, Video, Camera, Lightbulb, Radio, Globe, Monitor, Footprints, Film } from "lucide-react"
import { useSiteContent } from "@/hooks/use-site-content"
import type { ServeDepartmentIcon } from "@/lib/types/cms"

const DEPT_ICONS: Record<ServeDepartmentIcon, typeof Mic> = {
  Mic,
  Users,
  HandHeart,
  Building,
  ClipboardCheck,
  Heart,
  Globe,
  Video,
  Camera,
  Lightbulb,
  Radio,
  Monitor,
  Footprints,
  Film,
}

export function ServeSection() {
  const { data: heroData, loading: heroLoading } = useSiteContent("serveHero")
  const { data: departmentsData, loading: departmentsLoading } = useSiteContent("serveDepartments")
  const { data: ctaData, loading: ctaLoading } = useSiteContent("serveCta")

  const loading = heroLoading || departmentsLoading || ctaLoading
  if (loading || !heroData || !departmentsData || !ctaData) return null

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div
        data-cms-section="serveHero"
        className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${heroData.backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-neutral-900/40 via-black/80 to-neutral-900/10" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 text-balance leading-tight tracking-wider uppercase px-2">
              {heroData.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              {heroData.subtitle}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 px-2"
          >
            <Button
              size="lg"
              style={{ backgroundColor: "#1762B9" }}
              className="text-white hover:opacity-90 font-bold w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0 !px-6 sm:!px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
              asChild
            >
              <Link href="/serve">{heroData.primaryCta}</Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0 !px-6 sm:!px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
              asChild
            >
              <Link href={heroData.secondaryCtaLink ?? "/contact"}>
                {heroData.secondaryCta}
                <ArrowRight className="ml-2 size-5 sm:size-6" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Departments Section */}
      <div data-cms-section="serveDepartments" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 px-2"
            >
              {departmentsData.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-2"
            >
              {departmentsData.sectionSubtitle}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {departmentsData.departments.map((department, index) => {
              const DeptIcon = DEPT_ICONS[department.icon] ?? Heart
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-neutral-100 transition-colors border border-neutral-200 hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900/5 mb-3 sm:mb-4">
                    <DeptIcon className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-900" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2 sm:mb-3">{department.name}</h3>
                  <p className="text-neutral-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{department.description}</p>
                  <Button
                    variant="ghost"
                    className="text-neutral-900 hover:bg-neutral-200 font-semibold border border-neutral-300 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/serve">
                      {departmentsData.joinButtonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div data-cms-section="serveCta" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2"
            >
              {ctaData.headline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-neutral-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
            >
              {ctaData.body}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <Button
                size="lg"
                style={{ backgroundColor: "#1762B9" }}
                className="text-white hover:opacity-90 font-bold w-full sm:w-auto max-w-xs sm:max-w-none px-6 sm:px-10 md:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-full"
                asChild
              >
                <Link href="/serve">
                  {ctaData.buttonText}
                  <ArrowRight className="ml-2 size-5 sm:size-6" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
