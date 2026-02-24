"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Music, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSiteContent } from "@/hooks/use-site-content"
import type { TeensChurchProgramIcon } from "@/lib/types/cms"

const PROGRAM_ICONS: Record<TeensChurchProgramIcon, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Music,
  Users,
  Heart,
}

export function TeensChurchSection() {
  const { data: hero, loading: heroLoading } = useSiteContent("teensChurchHero")
  const { data: about, loading: aboutLoading } = useSiteContent("teensChurchAbout")
  const { data: programsData, loading: programsLoading } = useSiteContent("teensChurchPrograms")
  const { data: meetingsData, loading: meetingsLoading } = useSiteContent("teensChurchMeetings")

  const loading = heroLoading || aboutLoading || programsLoading || meetingsLoading
  if (loading || !hero || !about || !programsData || !meetingsData) return null

  return (
    <section className="relative flex flex-col overflow-hidden" data-cms-section="teensChurch">
      {/* Hero Section */}
      <div
        data-cms-section="teensChurchHero"
        className="relative w-full min-h-[80vh] flex items-center justify-center px-8 pt-32 pb-16 bg-black bg-cover bg-center"
        style={hero.backgroundImageUrl ? { backgroundImage: `url(${hero.backgroundImageUrl})` } : undefined}
      >
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-neutral-900/40 via-black/80 to-neutral-900/10" />
          <div className="absolute inset-0 bg-black/20" />
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

      {/* About Section */}
      <div id="about" data-cms-section="teensChurchAbout" className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6"
            >
              {about.sectionTitle}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-lg text-neutral-600 leading-relaxed"
            >
              <p>{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
              <p>{about.paragraph3}</p>
            </motion.div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {about.image1Url && (
              <div className="relative h-80 rounded-3xl overflow-hidden">
                <Image src={about.image1Url} alt="Teens gathering" fill className="object-cover" />
              </div>
            )}
            {about.image2Url && (
              <div className="relative h-80 rounded-3xl overflow-hidden">
                <Image src={about.image2Url} alt="Teens retreat" fill className="object-cover" />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Programs Section */}
      <div data-cms-section="teensChurchPrograms" className="relative w-full py-24 px-8 bg-neutral-900">
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
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              {programsData.sectionTitle}
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programsData.programs.map((program, index) => {
              const IconComponent = PROGRAM_ICONS[program.icon] ?? Heart
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
                  <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{program.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Meeting Times Section */}
      <div data-cms-section="teensChurchMeetings" className="relative w-full py-24 px-8 bg-neutral-50" id="meetings">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-14 text-center"
          >
            {meetingsData.sectionTitle}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {meetingsData.meetings.map((meeting, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-100 rounded-2xl p-8 border border-neutral-200 text-center"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-[#1762B9] mb-3">{meeting.day}</p>
                <p className="text-2xl font-bold text-neutral-900 tabular-nums mb-4">{meeting.time}</p>
                <p className="text-neutral-600 font-medium mb-2">{meeting.location}</p>
                <p className="text-neutral-500 text-sm leading-relaxed">{meeting.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
