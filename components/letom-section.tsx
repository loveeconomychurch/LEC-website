"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, School, Calendar, Heart, MapPin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSiteContent } from "@/hooks/use-site-content"
import type { LetomProgramIcon } from "@/lib/types/cms"

const PROGRAM_ICONS: Record<LetomProgramIcon, React.ComponentType<{ className?: string }>> = {
  School,
  Users,
  Heart,
}

export function LetomSection() {
  const { data: hero, loading: heroLoading } = useSiteContent("letomHero")
  const { data: about, loading: aboutLoading } = useSiteContent("letomAbout")
  const { data: programsData, loading: programsLoading } = useSiteContent("letomPrograms")
  const { data: eventsData, loading: eventsLoading } = useSiteContent("letomEvents")
  const { data: getInvolved, loading: getInvolvedLoading } = useSiteContent("letomGetInvolved")

  const loading = heroLoading || aboutLoading || programsLoading || eventsLoading || getInvolvedLoading
  if (loading || !hero || !about || !programsData || !eventsData || !getInvolved) return null

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div
        data-cms-section="letomHero"
        className="relative w-full min-h-[80vh] flex items-center justify-center px-8 pt-32 pb-16 bg-black overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          {hero.videoUrl ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={hero.videoUrl} type="video/mp4" />
              <source src={hero.videoUrl} type="video/quicktime" />
              {hero.backgroundImageUrl ? (
                <img src={hero.backgroundImageUrl} alt="" className="w-full h-full object-cover" />
              ) : null}
            </video>
          ) : hero.backgroundImageUrl ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${hero.backgroundImageUrl})` }}
            />
          ) : (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: "url('/youth-group-teenagers-in-church-fellowship.jpg')" }}
            />
          )}
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

      {/* About Section */}
      <div data-cms-section="letomAbout" className="relative w-full py-24 px-8 bg-white">
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

          {(about.image1Url || about.image2Url) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {about.image1Url && (
                <div className="relative h-80 rounded-3xl overflow-hidden">
                  <Image src={about.image1Url} alt="Youth group" fill className="object-cover" />
                </div>
              )}
              {about.image2Url && (
                <div className="relative h-80 rounded-3xl overflow-hidden">
                  <Image src={about.image2Url} alt="Youth retreat" fill className="object-cover" />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Outreach Programs */}
      <div data-cms-section="letomPrograms" className="relative w-full py-24 px-8 bg-neutral-900">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programsData.programs.map((outreach, index) => {
              const Icon = PROGRAM_ICONS[outreach.icon]
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
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{outreach.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{outreach.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div data-cms-section="letomEvents" className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
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
              {eventsData.sectionTitle}
            </motion.h2>
          </motion.div>

          <div className="space-y-6">
            {eventsData.events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col lg:flex-row gap-6 items-start bg-neutral-50 rounded-3xl p-8 border border-neutral-200 overflow-hidden"
              >
                <div className="flex-shrink-0 relative w-full lg:w-64 h-48 lg:h-full min-h-[12rem] rounded-2xl overflow-hidden bg-neutral-200">
                  {event.imageUrl ? (
                    <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-neutral-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                    <Calendar className="w-10 h-10" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">{event.title}</h3>
                    <div className="flex flex-wrap gap-4 text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Get Involved Section */}
      <div data-cms-section="letomGetInvolved" className="relative w-full py-24 px-8 bg-neutral-900">
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
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              {getInvolved.sectionTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-300 mb-8"
            >
              {getInvolved.subtitle}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-neutral-800 rounded-3xl p-8 border border-neutral-700"
            >
              <School className="w-12 h-12 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">{getInvolved.forSchoolsTitle}</h3>
              <p className="text-neutral-300 mb-4">{getInvolved.forSchoolsBody}</p>
              {getInvolved.forSchoolsCtaLink ? (
                <Button variant="outline" className="text-white border-white hover:bg-white/10 rounded-full" asChild>
                  <Link href={getInvolved.forSchoolsCtaLink}>
                    {getInvolved.forSchoolsCta}
                    <Mail className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" className="text-white border-white hover:bg-white/10 rounded-full">
                  {getInvolved.forSchoolsCta}
                  <Mail className="ml-2 w-4 h-4" />
                </Button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-neutral-800 rounded-3xl p-8 border border-neutral-700"
            >
              <Users className="w-12 h-12 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">{getInvolved.forVolunteersTitle}</h3>
              <p className="text-neutral-300 mb-4">{getInvolved.forVolunteersBody}</p>
              {getInvolved.forVolunteersCtaLink ? (
                <Button style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 rounded-full" asChild>
                  <Link href={getInvolved.forVolunteersCtaLink}>
                    {getInvolved.forVolunteersCta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              ) : (
                <Button style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 rounded-full">
                  {getInvolved.forVolunteersCta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
