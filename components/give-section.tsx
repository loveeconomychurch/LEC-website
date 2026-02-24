"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, CreditCard, Smartphone, Building, PiggyBank, TrendingUp, Users, HandHeart, CircleDollarSign } from "lucide-react"
import { useSiteContent } from "@/hooks/use-site-content"
import type { GiveMethodItem, GiveImpactStatItem } from "@/lib/types/cms"

const METHOD_ICONS: Record<GiveMethodItem["icon"], typeof CreditCard> = {
  CreditCard,
  Smartphone,
  Building,
  PiggyBank,
}

const STAT_ICONS: Record<GiveImpactStatItem["icon"], typeof Users> = {
  Users,
  TrendingUp,
  Heart,
}

export function GiveSection() {
  const { data: heroData, loading: heroLoading } = useSiteContent("giveHero")
  const { data: waysData, loading: waysLoading } = useSiteContent("giveWaysToGive")
  const { data: impactData, loading: impactLoading } = useSiteContent("giveImpact")
  const { data: commitData, loading: commitLoading } = useSiteContent("giveCommit")
  const { data: ctaData, loading: ctaLoading } = useSiteContent("giveCta")

  const loading = heroLoading || waysLoading || impactLoading || commitLoading || ctaLoading
  if (loading || !heroData || !waysData || !impactData || !commitData || !ctaData) return null

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div
        data-cms-section="giveHero"
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
              <Link href={heroData.primaryCtaLink ?? "/give"}>{heroData.primaryCta}</Link>
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

      {/* Giving Methods */}
      <div data-cms-section="giveWaysToGive" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
              {waysData.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-2"
            >
              {waysData.sectionSubtitle}
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {waysData.methods.map((method, index) => {
              const MethodIcon = METHOD_ICONS[method.icon]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-neutral-100 transition-colors border border-neutral-200"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-neutral-900/5 mb-3 sm:mb-4">
                    <MethodIcon className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-900" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2 sm:mb-3">{method.title}</h3>
                  <p className="text-neutral-600 text-sm sm:text-base">{method.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div data-cms-section="giveImpact" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2"
            >
              {impactData.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto px-2"
            >
              {impactData.sectionSubtitle}
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {impactData.stats.map((stat, index) => {
              const StatIcon = STAT_ICONS[stat.icon]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-4 sm:mb-6">
                    <StatIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 sm:mb-4">{stat.number}</div>
                  <div className="text-base sm:text-lg md:text-xl text-neutral-300 px-2">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Become a Tither & Partner Section */}
      <div data-cms-section="giveCommit" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
              {commitData.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-2"
            >
              {commitData.sectionSubtitle}
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-neutral-100 transition-colors border border-neutral-200"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-900/5 mb-4 sm:mb-6">
                <CircleDollarSign className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-900" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 sm:mb-4">{commitData.tither.title}</h3>
              <p className="text-neutral-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{commitData.tither.description}</p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
                {commitData.tither.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start text-neutral-600">
                    <span className="text-neutral-900 mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                style={{ backgroundColor: "#1762B9" }}
                className="text-white hover:opacity-90 font-bold w-full sm:w-auto max-w-xs sm:max-w-none !px-6 sm:!px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
                asChild
              >
                <Link href="/give">
                  {commitData.tither.buttonText}
                  <ArrowRight className="ml-2 size-5 sm:size-6" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="bg-neutral-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:bg-neutral-800 transition-colors border border-neutral-800"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-4 sm:mb-6">
                <HandHeart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">{commitData.partner.title}</h3>
              <p className="text-neutral-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{commitData.partner.description}</p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
                {commitData.partner.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start text-neutral-300">
                    <span className="text-white mr-2">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 font-bold border-2 border-white/30 w-full sm:w-auto max-w-xs sm:max-w-none !px-6 sm:!px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
                asChild
              >
                <Link href="/give">
                  {commitData.partner.buttonText}
                  <ArrowRight className="ml-2 size-5 sm:size-6" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div data-cms-section="giveCta" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 px-2"
            >
              {ctaData.headline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-neutral-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
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
                <Link href={ctaData.buttonLink ?? "/give"}>
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
