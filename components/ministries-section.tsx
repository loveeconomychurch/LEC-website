"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, FastForwardIcon, SmileIcon } from "lucide-react"
import { useSiteContent } from "@/hooks/use-site-content"
import type { MinistryCard } from "@/lib/types/cms"

const BG_CLASS_MAP: Record<string, string> = {
  "green-700": "bg-green-700",
  black: "bg-black",
  "yellow-700": "bg-yellow-700",
  "amber-800": "bg-amber-800",
}

function MinistryCardBlock({
  card,
  index,
  colSpan,
  delay,
  xDir,
}: {
  card: MinistryCard
  index: number
  colSpan: 2 | 3
  delay: number
  xDir?: number
}) {
  const hasBgImage = !!card.backgroundImage
  const hasVideo = !!card.videoUrl
  const bgClass = card.bgColor ? BG_CLASS_MAP[card.bgColor] ?? "bg-neutral-800" : ""
  const bgStyle = card.backgroundImage ? { backgroundImage: `url(${card.backgroundImage})` } : undefined

  const content = (
    <div
      className={
        hasVideo
          ? "flex flex-col justify-end h-full"
          : "flex items-center h-full relative z-10 min-h-0"
      }
    >
      <div className={hasVideo ? "pb-14" : "w-full"}>
        {card.label ? <h2 className="text-sm mb-1">{card.label}</h2> : null}
        {card.headline ? (
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-bold tracking-wider ${hasVideo ? "max-w-xl" : ""}`}
          >
            {card.headline}
          </h2>
        ) : null}
        {(() => {
          const link = card.learnMoreLink ?? (index === 1 ? "/k-church" : index === 2 ? "/childrens-ministry" : undefined)
          const showLink = (card.showLearnMore && link) || (index === 1 && (card.learnMoreLink ?? "/k-church")) || (index === 2 && (card.learnMoreLink ?? "/childrens-ministry"))
          return showLink ? (
          <Link
            href={link ?? "#"}
            className={`font-semibold text-xs sm:text-sm rounded-full flex items-center gap-2 absolute border-[0.5px] border-neutral-400 py-1.5 sm:py-2 px-4 sm:px-6 w-fit ${hasBgImage ? "text-primary-foreground" : "text-white"} ${hasVideo ? "bottom-4 left-4 sm:bottom-6 sm:left-6" : "bottom-0 left-0"}`}
          >
            Learn more <ChevronRight />
          </Link>
          ) : null
        })()}
      </div>
    </div>
  )

  return (
    <motion.div
      key={index}
      className={`text-white p-4 sm:p-6 min-h-[260px] sm:min-h-[320px] lg:h-[385px] rounded-2xl sm:rounded-3xl relative overflow-hidden ${!hasBgImage && !hasVideo ? bgClass : ""} ${hasBgImage ? "bg-contain bg-no-repeat bg-center bg-white" : ""} ${hasVideo ? "bg-amber-800" : ""} ${colSpan === 2 ? "col-span-1 md:col-span-2 lg:col-span-2" : "col-span-1 md:col-span-2 lg:col-span-3"}`}
      style={hasBgImage ? bgStyle : undefined}
      initial={{ opacity: 0, x: xDir ? xDir * 50 : 0, y: xDir ? 0 : 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.02 }}
    >
      {card.icon === "fastForward" && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-5 rotate-22">
          <FastForwardIcon className="w-full h-full" />
        </div>
      )}
      {card.icon === "smile" && (
        <div className="absolute -top-5 -right-22 bottom-0 flex items-center justify-center opacity-10 -rotate-22">
          <SmileIcon className="w-full h-full" />
        </div>
      )}
      {hasVideo ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={card.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 bg-black/50">
            {content}
          </div>
        </>
      ) : (
        content
      )}
    </motion.div>
  )
}

export function MinistriesSection() {
  const { data, loading } = useSiteContent("ministries")
  if (loading || !data) return null
  const cards = data.ministries ?? []

  return (
    <section id="ministries" data-cms-section="ministries" className="py-12 sm:py-16 md:py-24 lg:py-28 bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance px-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {data.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto text-balance px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {data.sectionSubtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 p-4 sm:p-6 w-full lg:w-4/5 mx-auto">
          {cards[0] && <MinistryCardBlock card={cards[0]} index={0} colSpan={2} delay={0.6} xDir={-1} />}
          {cards[1] && <MinistryCardBlock card={cards[1]} index={1} colSpan={2} delay={0.7} />}
          {cards[2] && <MinistryCardBlock card={cards[2]} index={2} colSpan={2} delay={0.8} xDir={1} />}
          {cards[3] && <MinistryCardBlock card={cards[3]} index={3} colSpan={3} delay={0.9} xDir={-1} />}
          {cards[4] && <MinistryCardBlock card={cards[4]} index={4} colSpan={3} delay={1.0} xDir={1} />}
        </div>
      </div>
    </section>
  )
}
