"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Facebook, Twitter, Youtube, Instagram, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useSiteContent } from "@/hooks/use-site-content"
import type { HeaderNavLink } from "@/lib/types/cms"

export function Header(background: { background?: boolean }) {
  const { data, loading } = useSiteContent("header")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (loading || !data) return null

  return (
    <>
      <header className={`absolute top-0 right-0 left-0 z-50 ${background ? "bg-black/0" : "bg-black/95"} min-h-[72px]`}>
        <div className=" mx-auto px-4 sm:px-6 lg:px-26 py-4">
          <div className="flex items-center">


            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <Image
                  src={data.logoUrl}
                  alt={data.logoAlt}
                  width={40}
                  height={40}
                  className="w-46 h-auto"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 font-bold absolute left-1/2 transform -translate-x-1/2">
              {data.navLinks.map((link: HeaderNavLink) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="text-white hover:text-orange-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>


            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4 ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={data.searchPlaceholder}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                />
              </div>
              <Button variant="ghost" size="sm" className="rounded-full hidden">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👤</span>
                </div>
              </Button>
            </div>

            {/* Hamburger menu - visible on all screen sizes */}
            <div className="ml-auto md:ml-4 flex items-center relative z-[999]">
              <button
                type="button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="w-10 h-10 shrink-0 border border-gray-500 rounded-full flex flex-col gap-1 items-center justify-center cursor-pointer relative z-[999] hover:border-gray-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <>
                    <span className="w-3/5 h-[1px] rounded-full bg-white absolute rotate-45" />
                    <span className="w-3/5 h-[1px] rounded-full bg-white absolute -rotate-45" />
                  </>
                ) : (
                  <>
                    <span className="w-3/5 h-[1px] rounded-full bg-white" />
                    <span className="w-3/5 h-[1px] rounded-full bg-white" />
                    <span className="w-3/5 h-[1px] rounded-full bg-white" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
      {isMenuOpen && (
          <motion.div 
            className="fixed top-0 right-0 left-0 bottom-0 z-998 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="h-full flex items-center justify-center overflow-auto">
              <button
                type="button"
                aria-label="Close menu"
                className="w-10 h-10 shrink-0 border border-gray-500 rounded-full flex flex-col gap-1 items-center justify-center cursor-pointer absolute top-8 right-12 sm:right-6 md:right-26 z-[999] hover:border-gray-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="w-3/5 h-[1px] rounded-full bg-white absolute rotate-45" />
                <span className="w-3/5 h-[1px] rounded-full bg-white absolute -rotate-45" />
              </button>

            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 pt-16 pb-12 px-4 w-full max-w-4/5">
                <motion.div 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-montserrat)] grid gap-6 lg:gap-8 mr-auto"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.h1 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Visit LEC
                  </motion.h1>
                  <motion.a
                    href="/prayer"
                    className="block"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <h1>Need a Prayer?</h1>
                  </motion.a>
                  <motion.a
                    href="https://pastoroti.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <h1 className="flex items-center gap-2">Meet the Bishop <ArrowRight className="-rotate-45 h-8 w-8 sm:h-10 sm:w-10 lg:w-[50px] lg:h-[50px]" /></h1>
                  </motion.a>
                  <motion.a
                    href="/live"
                    className="block"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <h1>Join Us Live</h1>
                  </motion.a>
                  <motion.a
                    href="/give"
                    className="block"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <h1>Give</h1>
                  </motion.a>
                  <motion.h1 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="border-t border-white/10 pt-10"
                  >
                    Follow Us
                  </motion.h1>
                  <motion.div 
                    className="flex space-x-6 text-background"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.div 
                      className="bg-foreground rounded-full p-2 stroke-foreground hover:bg-accent cursor-pointer transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                    <Facebook className="h-8 w-8 stroke-foreground hover:stroke-accent" fill="black" strokeWidth={0} />
                    </motion.div>
                    <motion.div 
                      className="bg-foreground rounded-full p-2 stroke-foreground hover:bg-accent hover:stroke-accent cursor-pointer transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    >
                    <Instagram className="h-8 w-8 stroke-foreground hover:stroke-accent" fill="black" strokeWidth={1.5} />
                    </motion.div>
                    <motion.div 
                      className="bg-foreground rounded-full p-2 stroke-foreground hover:bg-accent hover:stroke-accent cursor-pointer transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.0, ease: [0.4, 0, 0.2, 1] }}
                    >
                    <Youtube className="h-8 w-8 stroke-foreground hover:stroke-accent" fill="black" strokeWidth={1.5} />
                    </motion.div>
                    <motion.div 
                      className="bg-foreground rounded-full p-2 stroke-foreground hover:bg-accent hover:stroke-accent cursor-pointer transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
                    >
                    <Twitter className="h-8 w-8 stroke-foreground hover:stroke-accent" fill="black" strokeWidth={0} />
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col gap-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.div 
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.h4 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Grow with us
                    </motion.h4>
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Youtube
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Spotify
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Podcasts
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Podcast Addict
                    </motion.p>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.h4 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                      More
                    </motion.h4>
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Business School
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Meletao
                    </motion.p>
                    <motion.a
                      href="/merch"
                      className="block"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p>LEC Merch</p>
                    </motion.a>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col gap-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.div 
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.h4 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Ministries
                    </motion.h4>
                    <motion.a
                      href="/letom"
                      className="block"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p>Letom</p>
                    </motion.a>
                    <motion.a
                      href="/3one6"
                      className="block"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p>3one6</p>
                    </motion.a>
                    <motion.a
                      href="/community-outreach"
                      className="block"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p>Community Outreach</p>
                    </motion.a>
                    <motion.a
                      href="/k-church"
                      className="block"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p>K-church</p>
                    </motion.a>
                    <motion.a
                      href="/childrens-ministry"
                      className="block"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.95, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p>Children's Ministry</p>
                    </motion.a>
                    <motion.a
                      href="/teens-church"
                      className="block"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <p>Teens Church</p>
                    </motion.a>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <motion.h4 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Actions
                    </motion.h4>
                    <motion.a
                      href="/locations"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Find a branch <ArrowRight className="h-5 w-5 -rotate-45" />
                    </motion.a>
                    <motion.p 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Join a cell <ArrowRight className="h-5 w-5 -rotate-45" />
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Download LECTV
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.0, ease: [0.4, 0, 0.2, 1] }}
                    >
                      Have a Question?
                    </motion.p>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.a 
                    href="/events"
                    className="text-2xl font-bold block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Events
                  </motion.a>
                  <motion.a 
                    href="/events"
                    className="block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Believers' Convention
                  </motion.a>
                  <motion.a 
                    href="/events"
                    className="block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Yadah Concert
                  </motion.a>
                  <motion.a 
                    href="/events"
                    className="block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  >
                    One Life Jam
                  </motion.a>
                  <motion.a 
                    href="/events"
                    className="block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  >
                    Ambience of Love
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
