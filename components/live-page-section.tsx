"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Youtube, Calendar, Radio, Flame, Video, Tv, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useSiteContent } from "@/hooks/use-site-content"

const STREAM_ICONS = [Calendar, Radio, Flame, Video, Tv, PlayCircle]

export function LivePageSection() {
  const { data: hero, loading: heroLoading } = useSiteContent("liveHero")
  const { data: streamsData, loading: streamsLoading } = useSiteContent("liveStreams")

  if (heroLoading || streamsLoading || !hero || !streamsData) return null

  return (
    <section className="relative flex flex-col overflow-hidden" data-cms-section="live">
      {/* Hero */}
      <div
        data-cms-section="liveHero"
        className="relative w-full min-h-[70vh] flex items-center justify-center px-8 pt-32 pb-16 bg-black bg-cover bg-center"
        style={{ backgroundImage: hero.backgroundImageUrl ? `url(${hero.backgroundImageUrl})` : undefined }}
      >
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-red-950/50 via-black to-black" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-600/20 mb-6">
              <Youtube className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-balance leading-tight tracking-tight">
              {hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-bold !px-8 py-6 text-lg rounded-full"
              asChild
            >
              <Link href={hero.ctaLink} target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 size-5" />
                {hero.ctaText}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Sections: Sunday Service, LC Live, Stir Up */}
      <div data-cms-section="liveStreams" className="w-full py-24 px-8 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-neutral-900 text-center mb-4"
          >
            {streamsData.sectionTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-neutral-600 text-center max-w-2xl mx-auto mb-16"
          >
            {streamsData.sectionSubtitle}
          </motion.p>

          <div className="space-y-12">
            {streamsData.streams.map((stream, index) => {
              const Icon = STREAM_ICONS[index % STREAM_ICONS.length] ?? Radio
              const slug = stream.title ? stream.title.toLowerCase().replace(/\s+/g, "-") : ""
              return (
                <motion.div
                  key={index}
                  id={slug ? `stream-${slug}` : `stream-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex gap-5">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-2">{stream.title}</h3>
                        <p className="text-neutral-600 leading-relaxed">{stream.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50 font-semibold rounded-full"
                        asChild
                      >
                        <Link href={stream.link} target="_blank" rel="noopener noreferrer">
                          <Youtube className="mr-2 size-5" />
                          {stream.ctaLabel}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
