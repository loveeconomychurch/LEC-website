import { Calendar } from "lucide-react"

export interface ServiceTimesRowItem {
  label: string
  time: string
}

/**
 * Horizontal (wraps on mobile) row of service-time entries, each with a
 * calendar icon and a vertical divider between entries. Used wherever
 * service times are shown (About page, Visit page) so the list of
 * services — however many there are — stays in one place and one look.
 */
export function ServiceTimesRow({ items }: { items: ServiceTimesRowItem[] }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
      {items.map((item, i) => (
        <div key={item.label + i} className="flex items-center gap-3 sm:gap-4">
          {i > 0 && <div className="hidden sm:block w-px h-14 sm:h-16 bg-white/20" />}
          <div className="flex items-center gap-3 text-white">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white/90" />
            <div className="text-left">
              <p className="font-bold text-lg sm:text-xl">{item.label}</p>
              <p className="text-neutral-300 text-sm sm:text-base">{item.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
