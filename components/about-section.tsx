"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Target, Users, Globe, BookOpen } from "lucide-react"
import { useSiteContent } from "@/hooks/use-site-content"
import { ServiceTimesRow } from "@/components/service-times-row"

const VALUE_ICONS: Record<string, typeof Heart> = {
  Love: Heart,
  Truth: BookOpen,
  Community: Users,
  Impact: Globe,
}

export function AboutSection() {
  const { data: heroData, loading: heroLoading } = useSiteContent("aboutHero")
  const { data: storyData, loading: storyLoading } = useSiteContent("aboutStory")
  const { data: missionVisionData, loading: missionLoading } = useSiteContent("aboutMissionVision")
  const { data: messageData, loading: messageLoading } = useSiteContent("aboutMessage")
  const { data: culturesData, loading: culturesLoading } = useSiteContent("aboutCultures")
  const { data: coreValuesData, loading: coreValuesLoading } = useSiteContent("aboutCoreValues")
  const { data: serviceTimesData, loading: serviceTimesLoading } = useSiteContent("aboutServiceTimes")
  const { data: ctaData, loading: ctaLoading } = useSiteContent("aboutCta")

  const loading = heroLoading || storyLoading || missionLoading || messageLoading || culturesLoading || coreValuesLoading || serviceTimesLoading || ctaLoading
  if (loading || !heroData || !storyData || !missionVisionData || !messageData || !culturesData || !coreValuesData || !serviceTimesData || !ctaData) return null

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div data-cms-section="aboutHero" className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-black bg-cover bg-center" style={{ backgroundImage: `url(${heroData.heroImageUrl})` }}>
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
              {heroData.heroTitle}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              {heroData.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <div data-cms-section="aboutStory" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-10 sm:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6"
            >
              {storyData.storyTitle}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-base sm:text-lg text-neutral-600 leading-relaxed"
            >
              <p>{storyData.storyParagraph1}</p>
              <p>{storyData.storyParagraph2}</p>
              <p>{storyData.storyParagraph3}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div data-cms-section="aboutMissionVision" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2"
            >
              {missionVisionData.missionVisionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto px-2"
            >
              {missionVisionData.missionVisionSubtitle}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-4 sm:mb-6">
                <Target className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">{missionVisionData.missionTitle}</h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">{missionVisionData.missionText}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 mb-4 sm:mb-6">
                <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">{missionVisionData.visionTitle}</h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">{missionVisionData.visionText}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* The Message Of The House Section */}
      <div data-cms-section="aboutMessage" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 px-2"
            >
              {messageData.messageTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-neutral-900 font-semibold mb-8 sm:mb-12 max-w-3xl mx-auto px-2"
            >
              {messageData.messageTagline}
            </motion.p>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-neutral-200"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6">{messageData.messagePoint1Title}</h3>
              <div className="space-y-5 sm:space-y-6 pl-2 sm:pl-4">
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">{messageData.messagePoint1aTitle}</h4>
                  <p className="text-neutral-600 leading-relaxed mb-2 text-sm sm:text-base">{messageData.messagePoint1aText}</p>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">{messageData.messagePoint1bTitle}</h4>
                  <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">{messageData.messagePoint1bText}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="bg-neutral-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-neutral-200"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4 sm:mb-6">{messageData.messagePoint2Title}</h3>
              <div className="space-y-5 sm:space-y-6 pl-2 sm:pl-4">
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">{messageData.messagePoint2aTitle}</h4>
                  <p className="text-neutral-600 leading-relaxed mb-2 text-sm sm:text-base">{messageData.messagePoint2aText}</p>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">{messageData.messagePoint2bTitle}</h4>
                  <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">{messageData.messagePoint2bText}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cultures Of The House Section */}
      <div data-cms-section="aboutCultures" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900">
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2"
            >
              {culturesData.culturesTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto px-2"
            >
              {culturesData.culturesSubtitle}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {culturesData.cultures.map((culture, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-white font-bold text-base sm:text-lg">{culture.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{culture.title}</h3>
                    {culture.description && (
                      <p className="text-neutral-300 text-sm mb-3 leading-relaxed">{culture.description}</p>
                    )}
                    <p className="text-neutral-400 text-xs italic">{culture.references}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div data-cms-section="aboutCoreValues" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
              {coreValuesData.coreValuesTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-2"
            >
              {coreValuesData.coreValuesSubtitle}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreValuesData.coreValues.map((value, index) => {
              const IconComponent = VALUE_ICONS[value.title] ?? Heart;
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
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-900" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-neutral-600 text-sm sm:text-base">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Times Section */}
      <div data-cms-section="aboutServiceTimes" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 sm:mb-6 px-2"
            >
              {serviceTimesData.serviceTimesTitle}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 sm:mb-12"
            >
              <ServiceTimesRow
                items={[
                  ...serviceTimesData.sundayServices,
                  { label: serviceTimesData.wednesdayLabel, time: serviceTimesData.wednesdayTime },
                ]}
              />
            </motion.div>
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
                <a href="/locations">
                  {serviceTimesData.visitCtaText}
                  <ArrowRight className="ml-2 size-5 sm:size-6" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <div data-cms-section="aboutCta" className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
              {ctaData.ctaTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-neutral-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
            >
              {ctaData.ctaSubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto max-w-xs sm:max-w-none">
                <Button
                  size="lg"
                  style={{ backgroundColor: "#1762B9" }}
                  className="text-white hover:opacity-90 font-bold w-full sm:w-auto px-6 sm:px-10 md:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-full"
                  asChild
                >
                  <a href="/locations">{ctaData.ctaPrimary}<ArrowRight className="ml-2 size-5 sm:size-6" /></a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto max-w-xs sm:max-w-none">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-neutral-900 hover:bg-neutral-100 font-semibold border-2 border-neutral-900/30 w-full sm:w-auto px-6 sm:px-10 md:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-full"
                  asChild
                >
                  <a href="/groups">{ctaData.ctaSecondary}<ArrowRight className="ml-2 size-5 sm:size-6" /></a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

