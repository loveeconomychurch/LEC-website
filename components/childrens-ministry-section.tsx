"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Heart, Calendar, Music } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSiteContent } from "@/hooks/use-site-content"
import type { ChildrensMinistryProgramIcon } from "@/lib/types/cms"

const PROGRAM_ICONS: Record<ChildrensMinistryProgramIcon, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Music,
  Users,
  Heart,
  Calendar,
}

export function ChildrensMinistrySection() {
  const { data: hero, loading: heroLoading } = useSiteContent("childrensMinistryHero")
  const { data: about, loading: aboutLoading } = useSiteContent("childrensMinistryAbout")
  const { data: programsData, loading: programsLoading } = useSiteContent("childrensMinistryPrograms")
  const { data: ageGroupsData, loading: ageGroupsLoading } = useSiteContent("childrensMinistryAgeGroups")

  const loading = heroLoading || aboutLoading || programsLoading || ageGroupsLoading
  if (loading || !hero || !about || !programsData || !ageGroupsData) return null

  return (
    <section className="relative flex flex-col overflow-hidden" data-cms-section="childrensMinistry">
      {/* Hero Section */}
      <div
        data-cms-section="childrensMinistryHero"
        className="relative w-full min-h-[80vh] flex items-center justify-center px-8 pt-32 pb-16 bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.backgroundImageUrl})` }}
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

      {/* About Section */}
      <div id="about" data-cms-section="childrensMinistryAbout" className="relative w-full py-24 px-8 bg-white">
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
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <Image src={about.image1Url} alt="Children learning" fill className="object-cover object-top" />
              </div>
            )}
            {about.image2Url && (
              <div className="relative h-96 rounded-3xl overflow-hidden">
                <Image src={about.image2Url} alt="Children's ministry" fill className="object-cover object-top" />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Programs Section */}
      <div data-cms-section="childrensMinistryPrograms" className="relative w-full py-24 px-8 bg-neutral-900">
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

      {/* Age Groups Section – single centered block for one age group */}
      <div data-cms-section="childrensMinistryAgeGroups" className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
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
              {ageGroupsData.sectionTitle}
            </motion.h2>
          </motion.div>

          <div className="space-y-8">
            {ageGroupsData.groups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-3xl p-10 sm:p-12 border border-neutral-200 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">{group.age}</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">{group.title}</h3>
                <p className="text-neutral-600 text-lg leading-relaxed max-w-xl mx-auto">{group.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
