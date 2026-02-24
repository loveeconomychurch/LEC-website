"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { ChevronRight } from "lucide-react"
import { useSiteContent } from "@/hooks/use-site-content"

export function VisitSection() {
  const { data, loading } = useSiteContent("visit")
  if (loading || !data) return null

  const card1Link = data.cardCtaLink ?? "/locations"
  const card2Link = data.card2CtaLink ?? "/groups"
  const directionsButtonText = data.directionsButtonText ?? "Call for directions"

  return (
    <section id="visit" data-cms-section="visit" className="py-12 sm:py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto px-0 sm:px-2 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full lg:w-4/5 mx-auto">
          <motion.div
            className="text-center cursor-pointer"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="bg-white bg-cover bg-center h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] mb-4 sm:mb-5 rounded-2xl sm:rounded-3xl"
              style={{ backgroundImage: `url(${data.cardImageUrl})` }}
            />
            <motion.p className="text-neutral-900 text-base sm:text-lg mb-2 px-2">
              {data.cardTitle}
            </motion.p>
            <motion.h4 className="text-secondary font-bold text-3xl sm:text-4xl lg:text-5xl px-2">
              {data.cardSubtitle}
            </motion.h4>
            <motion.div>
              <Button
                className="text-primary-foreground w-fit font-semibold text-sm rounded-full flex items-center gap-2 bg-transparent border-[0.5px] border-neutral-400 !py-4 sm:!py-5 !px-6 sm:!px-8 mt-4 sm:mt-5 mx-auto"
                asChild
              >
                <Link href={card1Link}>
                  {data.cardCta} <ChevronRight />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="bg-white bg-cover bg-center h-[280px] sm:h-[350px] md:h-[450px] lg:h-[550px] mb-4 sm:mb-5 rounded-2xl sm:rounded-3xl"
              style={{ backgroundImage: `url(${data.card2ImageUrl})` }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            />
            <motion.p className="text-neutral-900 text-base sm:text-lg mb-2 px-2">
              {data.card2Title}
            </motion.p>
            <motion.h4 className="text-secondary font-bold text-3xl sm:text-4xl lg:text-5xl px-2">
              {data.card2Subtitle}
            </motion.h4>
            <motion.div>
              <Button
                className="text-primary-foreground w-fit font-semibold text-sm rounded-full flex items-center gap-2 bg-transparent border-[0.5px] border-neutral-400 !py-4 sm:!py-5 !px-6 sm:!px-8 mt-4 sm:mt-5 mx-auto"
                asChild
              >
                <Link href={card2Link}>
                  {data.card2Cta} <ChevronRight />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
