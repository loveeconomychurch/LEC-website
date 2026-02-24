"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "./ui/button"
import { useSiteContent } from "@/hooks/use-site-content"

const MARQUEE_SIZE_CLASSES = [
  "w-48 sm:w-60 md:w-72 h-80 sm:h-96 md:h-[30rem]",
  "w-64 sm:w-96 md:w-[30rem] h-48 sm:h-60 md:h-72",
  "w-48 sm:w-60 md:w-72 h-80 sm:h-96 md:h-[30rem]",
  "w-56 sm:w-80 md:w-[25rem] h-48 sm:h-60 md:h-72",
] as const

export function WelcomeSection() {
  const { data, loading } = useSiteContent("welcome")
  if (loading || !data) return null
  const marqueeImages = (data.marqueeImages ?? []).filter((src): src is string => Boolean(src))
  const marqueeDuplicated = [...marqueeImages, ...marqueeImages]
  const showMarquee = marqueeDuplicated.length > 0
  return (
    <>
      <section data-cms-section="welcome" className="py-12 sm:py-16 md:py-24 bg-neutral-100 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Header Section */}
        <motion.div 
          className="mb-10 sm:mb-16 mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-xs sm:text-sm uppercase tracking-wider text-neutral-600 mb-4 sm:mb-6 font-medium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {data.label}
          </motion.h2>
          <motion.div 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 sm:mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p>{data.headline}</p>
          </motion.div>
          
          {/* Call-to-Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              {data.visitCtaLink ? (
                <Button
                  size="lg"
                  style={{ backgroundColor: "#1762B9" }}
                  className="text-white hover:opacity-90 font-bold w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full"
                  asChild
                >
                  <Link href={data.visitCtaLink}>{data.visitCta}</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  style={{ backgroundColor: "#1762B9" }}
                  className="text-white hover:opacity-90 font-bold w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full"
                >
                  {data.visitCta}
                </Button>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              {data.aboutCtaLink ? (
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-primary hover:bg-white/10 font-semibold border-2 border-black/30 w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full"
                  asChild
                >
                  <Link href={data.aboutCtaLink}>{data.aboutCta}</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-primary hover:bg-white/10 font-semibold border-2 border-black/30 w-full sm:w-auto px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full"
                >
                  {data.aboutCta}
                </Button>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="flex gap-8 sm:gap-14 items-center animate-scroll-left">
            {showMarquee
              ? marqueeDuplicated.map((src, i) => {
                  const sizeClass = MARQUEE_SIZE_CLASSES[i % MARQUEE_SIZE_CLASSES.length]
                  return (
                    <div
                      key={`${src}-${i}`}
                      className={`${sizeClass} overflow-hidden flex-shrink-0 group rounded-2xl sm:rounded-3xl`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )
                })
              : null}
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
