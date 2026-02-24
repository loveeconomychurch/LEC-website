"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"
import { useSiteContent } from "@/hooks/use-site-content"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url?.trim()) return null
  const t = url.trim()
  const short = t.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (short) return `https://www.youtube.com/embed/${short[1]}?autoplay=1`
  const watch = t.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/)
  if (watch) return `https://www.youtube.com/embed/${watch[1]}?autoplay=1`
  return null
}

export function LatestSermon() {
  const { data, loading } = useSiteContent("latestSermon")
  const [videoOpen, setVideoOpen] = useState(false)
  if (loading || !data) return null
  const youtubeEmbed = getYouTubeEmbedUrl(data.videoUrl)
  const isDirectVideo = !!(
    data.videoUrl &&
    !youtubeEmbed &&
    (data.videoUrl.endsWith(".mp4") ||
      data.videoUrl.endsWith(".webm") ||
      data.videoUrl.includes("firebasestorage") ||
      data.videoUrl.startsWith("http") ||
      data.videoUrl.startsWith("/"))
  )
  return (
    <section id="latest-sermon" data-cms-section="latestSermon" className="py-12 sm:py-16 md:py-24 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full md:w-4/5">
            <motion.div 
                className="w-1 h-12 sm:h-16 bg-neutral-900 mx-auto mb-6 sm:mb-8"
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true, margin: "-100px" }}
            />
            <div className="text-center mb-12">
                <motion.h2 
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-10 font-[family-name:var(--font-playfair)] text-balance text-neutral-900"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {data.sectionTitle}
                </motion.h2>
                <motion.p 
                    className="text-base sm:text-lg text-neutral-900 mx-auto text-balance font-semibold tracking-wider px-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {data.sermonTitle}
                </motion.p>
                <motion.p 
                    className="text-base sm:text-lg text-neutral-900 mx-auto text-balance mt-3 sm:mt-4 tracking-wider px-2"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {data.speaker}
                </motion.p>
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <Image src={data.thumbnailUrl} alt="Latest Sermon" width={200} height={200} className="w-full max-w-2xl aspect-video object-cover mx-auto mt-8 sm:mt-12 rounded-2xl sm:rounded-4xl" />
                    <Button
                      type="button"
                      size="lg"
                      className="bg-transparent hover:bg-transparent text-white absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-50 border-2 border-white w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full cursor-pointer"
                      onClick={() => setVideoOpen(true)}
                    >
                      <PlayIcon className="!w-6 !h-6 sm:!w-7 sm:!h-7 md:!w-8 md:!h-8 text-white" fill="white" />
                    </Button>
                </motion.div>

                <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
                  <DialogContent className="sm:max-w-4xl bg-neutral-900 border-neutral-700 p-0 overflow-hidden">
                    <DialogTitle className="sr-only">{data.sermonTitle}</DialogTitle>
                    <div className="aspect-video w-full bg-black">
                      {youtubeEmbed ? (
                        <iframe
                          src={youtubeEmbed}
                          title={data.sermonTitle}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : isDirectVideo ? (
                        <video
                          src={data.videoUrl}
                          controls
                          autoPlay
                          className="w-full h-full"
                          title={data.sermonTitle}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-400 p-6 text-center">
                          No video URL set. Add a video or YouTube link in the admin.
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {data.watchMoreUrl ? (
                      <a
                        href={data.watchMoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border-2 border-neutral-900/30 bg-transparent px-12 py-2 text-lg font-semibold text-neutral-900 hover:bg-black/10 mt-6"
                      >
                        {data.watchMoreLabel}
                      </a>
                    ) : (
                      <Button
                        size="lg"
                        variant="ghost"
                        className="text-neutral-900 hover:bg-black/10 font-semibold border-2 border-neutral-900/30 px-6 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full mt-4 sm:mt-6"
                      >
                        {data.watchMoreLabel}
                      </Button>
                    )}
                </motion.div>
            </div>
        </div>
    </section>
  )
}