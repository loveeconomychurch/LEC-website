"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Music, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSiteContent } from "@/hooks/use-site-content"
import { useMerchProductsByIds } from "@/hooks/use-merch-products-by-ids"
import { ProductCard } from "@/components/product-card"
import type { ThreeOneSixPlatformItem } from "@/lib/types/cms"

function PlatformLink({ platform }: { platform: ThreeOneSixPlatformItem }) {
  const label = platform.label.toLowerCase()
  const icon = label.includes("itunes") ? (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  ) : label.includes("spotify") ? (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ) : label.includes("youtube") ? (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ) : label.includes("google") || label.includes("play") ? (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
  ) : label.includes("soundcloud") ? (
    <svg className="w-5 h-5" viewBox="-271 345.8 256 111.2" fill="currentColor">
      <path d="M-238.4,398.1c-0.8,0-1.4,0.6-1.5,1.5l-2.3,28l2.3,27.1c0.1,0.8,0.7,1.5,1.5,1.5c0.8,0,1.4-0.6,1.5-1.5l2.6-27.1l-2.6-28C-237,398.7-237.7,398.1-238.4,398.1z" />
      <path d="M-228.2,399.9c-0.9,0-1.7,0.7-1.7,1.7l-2.1,26l2.1,27.3c0.1,1,0.8,1.7,1.7,1.7c0.9,0,1.6-0.7,1.7-1.7l2.4-27.3l-2.4-26C-226.6,400.6-227.3,399.9-228.2,399.9z" />
      <path d="M-258.6,403.5c-0.5,0-1,0.4-1.1,1l-2.5,23l2.5,22.5c0.1,0.6,0.5,1,1.1,1c0.5,0,1-0.4,1.1-1l2.9-22.5l-2.9-23C-257.7,404-258.1,403.5-258.6,403.5z" />
      <path d="M-268.1,412.3c-0.5,0-1,0.4-1,1l-1.9,14.3l1.9,14c0.1,0.6,0.5,1,1,1s0.9-0.4,1-1l2.2-14l-2.2-14.2C-267.2,412.8-267.6,412.3-268.1,412.3z" />
      <path d="M-207.5,373.5c-1.2,0-2.1,0.9-2.2,2.1l-1.9,52l1.9,27.2c0.1,1.2,1,2.1,2.2,2.1s2.1-0.9,2.2-2.1l2.1-27.2l-2.1-52C-205.4,374.4-206.4,373.5-207.5,373.5z" />
      <path d="M-248.6,399c-0.7,0-1.2,0.5-1.3,1.3l-2.4,27.3l2.4,26.3c0.1,0.7,0.6,1.3,1.3,1.3c0.7,0,1.2-0.5,1.3-1.2l2.7-26.3l-2.7-27.3C-247.4,399.6-247.9,399-248.6,399z" />
      <path d="M-217.9,383.4c-1,0-1.9,0.8-1.9,1.9l-2,42.3l2,27.3c0.1,1.1,0.9,1.9,1.9,1.9s1.9-0.8,1.9-1.9l2.3-27.3l-2.3-42.3C-216,384.2-216.9,383.4-217.9,383.4z" />
      <path d="M-154.4,359.3c-1.8,0-3.2,1.4-3.2,3.2l-1.2,65l1.2,26.1c0,1.8,1.5,3.2,3.2,3.2c1.8,0,3.2-1.5,3.2-3.2l1.4-26.1l-1.4-65C-151.1,360.8-152.6,359.3-154.4,359.3z" />
      <path d="M-197.1,368.9c-1.3,0-2.3,1-2.4,2.4l-1.8,56.3l1.8,26.9c0,1.3,1.1,2.3,2.4,2.3s2.3-1,2.4-2.4l2-26.9l-2-56.3C-194.7,370-195.8,368.9-197.1,368.9z" />
      <path d="M-46.5,394c-4.3,0-8.4,0.9-12.2,2.4C-61.2,368-85,345.8-114,345.8c-7.1,0-14,1.4-20.1,3.8c-2.4,0.9-3,1.9-3,3.7v99.9c0,1.9,1.5,3.5,3.4,3.7c0.1,0,86.7,0,87.3,0c17.4,0,31.5-14.1,31.5-31.5C-15,408.1-29.1,394-46.5,394z" />
      <path d="M-143.6,353.2c-1.9,0-3.4,1.6-3.5,3.5l-1.4,70.9l1.4,25.7c0,1.9,1.6,3.4,3.5,3.4c1.9,0,3.4-1.6,3.5-3.5l1.5-25.8l-1.5-70.9C-140.2,354.8-141.7,353.2-143.6,353.2z" />
      <path d="M-186.5,366.8c-1.4,0-2.5,1.1-2.6,2.6l-1.6,58.2l1.6,26.7c0,1.4,1.2,2.6,2.6,2.6s2.5-1.1,2.6-2.6l1.8-26.7l-1.8-58.2C-184,367.9-185.1,366.8-186.5,366.8z" />
      <path d="M-175.9,368.1c-1.5,0-2.8,1.2-2.8,2.8l-1.5,56.7l1.5,26.5c0,1.6,1.3,2.8,2.8,2.8s2.8-1.2,2.8-2.8l1.7-26.5l-1.7-56.7C-173.1,369.3-174.3,368.1-175.9,368.1z" />
      <path d="M-165.2,369.9c-1.7,0-3,1.3-3,3l-1.4,54.7l1.4,26.3c0,1.7,1.4,3,3,3c1.7,0,3-1.3,3-3l1.5-26.3l-1.5-54.7C-162.2,371.3-163.5,369.9-165.2,369.9z" />
    </svg>
  ) : (
    <Music className="w-5 h-5" />
  )
  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
    >
      {icon}
      <span className="text-sm sm:text-base font-medium">{platform.label}</span>
    </motion.a>
  )
}

export function ThreeOneSixSection() {
  const { data: hero, loading: heroLoading } = useSiteContent("threeOneSixHero")
  const { data: listenNow, loading: listenNowLoading } = useSiteContent("threeOneSixListenNow")
  const { data: releasesData, loading: releasesLoading } = useSiteContent("threeOneSixReleases")
  const { data: nowPlaying, loading: nowPlayingLoading } = useSiteContent("threeOneSixNowPlaying")
  const { data: artistsData, loading: artistsLoading } = useSiteContent("threeOneSixArtists")
  const { data: inYourCity, loading: inYourCityLoading } = useSiteContent("threeOneSixInYourCity")
  const { data: merchData, loading: merchLoading } = useSiteContent("threeOneSixMerch")
  const { data: faithStreets, loading: faithStreetsLoading } = useSiteContent("threeOneSixFaithStreets")

  const productIds = merchData?.productIds ?? []
  const { products: ecommerceProducts, loading: merchProductsLoading } = useMerchProductsByIds(productIds)
  const useEcommerceMerch = productIds.length > 0

  const cmsLoading = heroLoading || listenNowLoading || releasesLoading || nowPlayingLoading || artistsLoading || inYourCityLoading || merchLoading || faithStreetsLoading
  if (cmsLoading || !hero || !listenNow || !releasesData || !nowPlaying || !artistsData || !inYourCity || !merchData || !faithStreets) return null

  return (
    <section className="relative flex flex-col overflow-hidden" data-cms-section="threeOneSix">
      {/* Hero Section */}
      <div
        data-cms-section="threeOneSixHero"
        className="relative w-full min-h-[90vh] flex items-center justify-center px-8 pt-32 pb-20 bg-black"
      >
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
            <source src={hero.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 text-balance leading-tight tracking-wider uppercase"
              animate={{
                textShadow: [
                  "0 0 20px rgba(23, 98, 185, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.5)",
                  "0 0 20px rgba(23, 98, 185, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {hero.title}
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {hero.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                style={{ backgroundColor: "#1762B9" }}
                className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full"
                onClick={() => document.getElementById("releases")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Music className="mr-2 w-5 h-5" />
                {hero.ctaText}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Listen Now Section */}
      <div data-cms-section="threeOneSixListenNow" className="w-full bg-black py-12 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-sm sm:text-base font-semibold text-white uppercase tracking-wider mb-8">
              {listenNow.sectionTitle}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
              {listenNow.platforms.map((platform, i) => (
                <PlatformLink key={i} platform={platform} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* New Releases */}
      <div id="releases" data-cms-section="threeOneSixReleases" className="w-full bg-neutral-950 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">{releasesData.sectionTitle}</h2>
            {releasesData.viewAllLink ? (
              <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full" asChild>
                <Link href={releasesData.viewAllLink}>{releasesData.viewAllText}</Link>
              </Button>
            ) : (
              <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full">
                {releasesData.viewAllText}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {releasesData.releases.map((release, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group"
              >
                <div className="relative h-96 overflow-hidden rounded-3xl mb-4 bg-neutral-800">
                  {release.imageUrl ? (
                    <Image src={release.imageUrl} alt={release.title} fill className="object-cover transition-all duration-500 group-hover:scale-105" />
                  ) : null}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{release.title}</h3>
                <p className="text-neutral-300 font-medium text-sm mb-1">{release.artist}</p>
                {release.featuring && <p className="text-neutral-500 text-sm">Feat. {release.featuring}</p>}
                <p className="text-neutral-500 text-sm mt-1">{release.type} • {release.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Now Playing */}
      <div data-cms-section="threeOneSixNowPlaying" className="w-full bg-neutral-900 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-neutral-500 text-sm uppercase tracking-wider mb-6">{nowPlaying.label}</p>
          <div className="relative h-16 flex items-end justify-center gap-1 mb-8">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [8, 24 + Math.random() * 20, 8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                className={`w-1.5 rounded-full ${i === 12 ? "bg-[#1762B9]" : "bg-neutral-600"}`}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-[#1762B9] flex items-center justify-center">
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              </div>
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">{nowPlaying.trackTitle}</h3>
          <p className="text-neutral-400 mt-1">{nowPlaying.artistName}</p>
        </div>
      </div>

      {/* Featured Artists */}
      <div id="artists" data-cms-section="threeOneSixArtists" className="w-full bg-neutral-950 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12">{artistsData.sectionTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {artistsData.artists.map((artist, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="text-center group"
              >
                <div className="relative w-full h-[450px] mx-auto rounded-full overflow-hidden mb-4 ring-2 ring-neutral-700 group-hover:ring-[#1762B9] transition-all bg-neutral-800">
                  {artist.imageUrl ? <Image src={artist.imageUrl} alt={artist.name} fill className="object-cover" /> : null}
                </div>
                <h3 className="text-white font-semibold">{artist.name}</h3>
                <p className="text-neutral-400 text-sm">{artist.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* In Your City CTA */}
      <div data-cms-section="threeOneSixInYourCity" className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={inYourCity.videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-8 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2">{inYourCity.title}</h2>
          <h3 className="text-2xl sm:text-3xl font-medium mb-6 text-neutral-200">{inYourCity.subtitle}</h3>
          <p className="text-neutral-300 mb-8 leading-relaxed">{inYourCity.body}</p>
          <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full">
            {inYourCity.ctaText}
          </Button>
        </div>
      </div>

      {/* Upcoming Merch */}
      <div id="merch" data-cms-section="threeOneSixMerch" className="w-full bg-neutral-950 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">{merchData.sectionTitle}</h2>
            {merchData.viewAllLink ? (
              <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full" asChild>
                <Link href={merchData.viewAllLink}>{merchData.viewAllText}</Link>
              </Button>
            ) : (
              <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full">
                {merchData.viewAllText}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {useEcommerceMerch ? (
              merchProductsLoading ? (
                <p className="col-span-full text-neutral-500 text-center py-8">Loading products…</p>
              ) : (
                ecommerceProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant="dark"
                    imageHeight="h-[480px]"
                    index={i}
                  />
                ))
              )
            ) : (
              (merchData?.items ?? []).map((item, i) => (
                <ProductCard
                  key={i}
                  product={{
                    name: item.name,
                    price: item.price,
                    image: item.imageUrl,
                  }}
                  variant="dark"
                  imageHeight="h-64"
                  index={i}
                  viewAllLink={merchData?.viewAllLink || "/merch"}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Faith in the Streets CTA */}
      <div data-cms-section="threeOneSixFaithStreets" className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        {faithStreets.imageUrl ? (
          <Image src={faithStreets.imageUrl} alt="3one6 Ministry" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-neutral-900" />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-8 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2">{faithStreets.title}</h2>
          <h3 className="text-2xl sm:text-3xl font-medium mb-6 text-neutral-200">{faithStreets.subtitle}</h3>
          <p className="text-neutral-300 mb-8 leading-relaxed">{faithStreets.body}</p>
          {faithStreets.ctaLink ? (
            <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full" asChild>
              <Link href={faithStreets.ctaLink} target="_blank" rel="noopener noreferrer">
                {faithStreets.ctaText}
              </Link>
            </Button>
          ) : (
            <Button size="lg" style={{ backgroundColor: "#1762B9" }} className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full">
              {faithStreets.ctaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
