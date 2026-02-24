"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, Briefcase, TreePine, Wifi, Calendar, Heart, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSiteContent } from "@/hooks/use-site-content"
import type { LcLiveBenefitIcon } from "@/lib/types/cms"

const GATHER_ICONS = [Home, Briefcase, TreePine] as const

const BENEFIT_ICONS: Record<LcLiveBenefitIcon, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Wifi,
  Users,
  Heart,
}

export function LCLiveSection() {
  const { data: hero, loading: heroLoading } = useSiteContent("lcLiveHero")
  const { data: gatherTypesData, loading: gatherLoading } = useSiteContent("lcLiveGatherTypes")
  const { data: gallery, loading: galleryLoading } = useSiteContent("lcLiveGallery")
  const { data: benefitsData, loading: benefitsLoading } = useSiteContent("lcLiveBenefits")
  const { data: visualBreak, loading: visualBreakLoading } = useSiteContent("lcLiveVisualBreak")
  const { data: howToJoin, loading: howToJoinLoading } = useSiteContent("lcLiveHowToJoin")

  const loading = heroLoading || gatherLoading || galleryLoading || benefitsLoading || visualBreakLoading || howToJoinLoading
  if (loading || !hero || !gatherTypesData || !gallery || !benefitsData || !visualBreak || !howToJoin) return null

  return (
    <section className="relative flex flex-col overflow-hidden" data-cms-section="lcLive">
      {/* Hero Section */}
      <div
        data-cms-section="lcLiveHero"
        className="relative w-full min-h-[80vh] flex items-center justify-center px-8 pt-32 pb-16 bg-black bg-cover bg-center"
        style={{ backgroundImage: hero.backgroundImageUrl ? `url(${hero.backgroundImageUrl})` : undefined }}
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
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-5xl lg:text-5xl xl:text-6xl font-black mb-8 text-balance leading-tight tracking-wider uppercase">
              {hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            {hero.primaryCtaLink ? (
              <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full" asChild>
                <Link href={hero.primaryCtaLink}>{hero.primaryCta}</Link>
              </Button>
            ) : (
              <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full">
                {hero.primaryCta}
              </Button>
            )}
            {hero.secondaryCtaLink ? (
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 !px-8 py-6 text-lg rounded-full" asChild>
                <Link href={hero.secondaryCtaLink}>
                  {hero.secondaryCta}
                  <ArrowRight className="ml-2 size-6" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 !px-8 py-6 text-lg rounded-full">
                {hero.secondaryCta}
                <ArrowRight className="ml-2 size-6" />
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Where We Gather Section */}
      <div data-cms-section="lcLiveGatherTypes" className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
            >
              {gatherTypesData.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-600 max-w-2xl mx-auto"
            >
              {gatherTypesData.sectionSubtitle}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gatherTypesData.types.map((type, index) => {
              const IconComponent = GATHER_ICONS[index] ?? Home
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-neutral-50 rounded-3xl p-8 hover:bg-neutral-100 transition-colors border border-neutral-200"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900/5 mb-6">
                    <IconComponent className="w-7 h-7 text-neutral-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-3">{type.title}</h3>
                  <p className="text-neutral-600 mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {(type.examples || []).map((example, i) => (
                      <li key={i} className="text-neutral-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div data-cms-section="lcLiveGallery" className="relative w-full py-24 px-8 bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n, index) => {
              const url = n === 1 ? gallery.image1Url : n === 2 ? gallery.image2Url : gallery.image3Url
              const alt = n === 1 ? gallery.image1Alt : n === 2 ? gallery.image2Alt : gallery.image3Alt
              if (!url) return null
              return (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative h-64 md:h-80 rounded-3xl overflow-hidden"
                >
                  <Image src={url} alt={alt || ""} fill className="object-cover" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div data-cms-section="lcLiveBenefits" className="relative w-full py-24 px-8 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              {benefitsData.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-300 max-w-2xl mx-auto"
            >
              {benefitsData.sectionSubtitle}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefitsData.benefits.map((benefit, index) => {
              const IconComponent = BENEFIT_ICONS[benefit.icon] ?? Heart
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-neutral-800 rounded-3xl p-8 hover:bg-neutral-700 transition-colors border border-neutral-700"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-6">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Visual Break Section */}
      <div data-cms-section="lcLiveVisualBreak" className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-3xl overflow-hidden"
          >
            {visualBreak.imageUrl ? (
              <Image
                src={visualBreak.imageUrl}
                alt=""
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-200" />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-8">
                <h3 className="text-4xl font-bold mb-4">{visualBreak.headline}</h3>
                <p className="text-xl">{visualBreak.subline}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How to Join Section */}
      <div id="how-to-join" data-cms-section="lcLiveHowToJoin" className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
            >
              {howToJoin.sectionTitle}
            </motion.h2>
          </motion.div>

          <div className="space-y-8">
            {howToJoin.steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-center"
          >
            {howToJoin.ctaLink ? (
              <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full" asChild>
                <Link href={howToJoin.ctaLink}>
                  {howToJoin.ctaText}
                  <ArrowRight className="ml-2 size-6" />
                </Link>
              </Button>
            ) : (
              <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full">
                {howToJoin.ctaText}
                <ArrowRight className="ml-2 size-6" />
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
