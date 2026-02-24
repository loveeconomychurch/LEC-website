"use client"

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content"

export function CallSection() {
  const { data, loading } = useSiteContent("visit")
  if (loading || !data) return null
  const directionsButtonText = data.directionsButtonText ?? "Call for directions";

  return (
    <section className="pb-18 bg-white px-4 sm:px-6 lg:px-12">
      
        {/* Call for Directions */}
        <motion.div
          className="w-full lg:w-4/5 mx-auto py-10 sm:py-14 px-6 sm:px-8 rounded-2xl sm:rounded-3xl bg-neutral-100 border border-neutral-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4 shrink-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-900 flex items-center justify-center">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">
                  {data.directionsHeadline}
                </h3>
                <a
                  href={`tel:${data.directionsPhone.replace(/\s/g, "")}`}
                  className="text-lg sm:text-xl font-semibold text-[#1762B9] hover:underline"
                >
                  {data.directionsPhone}
                </a>
              </div>
            </div>
            <a
              href={`tel:${data.directionsPhone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#1762B9" }}
            >
              <Phone className="w-5 h-5" />
              {directionsButtonText}
            </a>
          </div>
        </motion.div>
    </section>
  )
}