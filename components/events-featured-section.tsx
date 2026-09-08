"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import { useSiteContent } from "@/hooks/use-site-content"
import { SOCIAL_LINKS } from "@/lib/social-links"

const rounded = "rounded-xl sm:rounded-2xl"

function EventCard({
  title,
  bgImage,
  date,
  location,
}: {
  title: string
  bgImage: string
  date?: string
  location?: string
}) {
  return (
    <div
      className={`min-h-[50vh] sm:min-h-[60vh] md:h-[80vh] w-full bg-cover bg-center ${rounded} relative overflow-hidden`}
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className={`w-full h-full bg-black/70 ${rounded} flex items-center justify-center p-4 sm:p-6`}>
        <div className="text-center max-w-2xl">
          <p className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold px-2">{title}</p>
          <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-3 sm:mt-4 text-sm sm:text-base text-white/90">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{date}</span>
              </span>
            )}
            {date && location && <span className="hidden sm:inline" aria-hidden>|</span>}
            {location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{location}</span>
              </span>
            )}
          </span>
          <Button className="mt-4 sm:mt-6 h-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">Register Now</Button>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-10">
            {SOCIAL_LINKS.map(({ label, href, Icon, strokeWidth }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="bg-white rounded-full p-1.5 sm:p-2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-opacity hover:opacity-80"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-foreground" fill="black" strokeWidth={strokeWidth} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EventsFeaturedSection() {
  const { data, loading } = useSiteContent("eventsFeatured")
  if (loading || !data) return null

  return (
    <section data-cms-section="eventsFeatured" className="relative flex flex-col gap-6 sm:gap-10 items-center justify-center overflow-hidden bg-black pt-20 sm:pt-24 md:mt-26 px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
      {data.events.map((event, i) => (
        <EventCard
          key={i}
          title={event.title}
          bgImage={event.imageUrl}
          date={event.date}
          location={event.location}
        />
      ))}
    </section>
  )
}
