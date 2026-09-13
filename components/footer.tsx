"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useSiteContent } from "@/hooks/use-site-content"
import { SOCIAL_LINKS } from "@/lib/social-links"

export function Footer() {
  const { data, loading } = useSiteContent("footer")
  if (loading || !data) return null

  return (
    <footer id="footer" data-cms-section="footer" className="bg-background text-background pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-8">
          {/* Church Info */}
          <div className="w-full lg:w-1/4">
            <Image
              src="/love-economy-church-logo.png"
              alt="Love Economy Church Logo"
              width={40}
              height={40}
              className="w-40 sm:w-48 md:w-56 h-auto"
            />
            <p className="text-foreground/80 my-3 sm:my-4 text-sm max-w-sm">
              {data.tagline}
            </p>
            <div className="flex space-x-4 text-background">
              {SOCIAL_LINKS.map(({ label, href, Icon, strokeWidth }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="bg-foreground rounded-full p-2 stroke-foreground hover:bg-accent hover:stroke-accent cursor-pointer transition-colors"
                >
                  <Icon className="h-5 w-5 stroke-foreground hover:stroke-accent" fill="black" strokeWidth={strokeWidth} />
                </a>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/4 space-y-4">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">{data.newsletterTitle}</h4>
            <div className="flex flex-col gap-2 text-background mt-2 sm:mt-4 max-w-sm">
              <Input type="email" placeholder={data.newsletterPlaceholder} className="w-full p-2 pl-5 rounded-full h-11 text-foreground border border-foreground/50" />
              <Button className="bg-foreground h-11 rounded-full p-2 stroke-foreground hover:bg-accent hover:stroke-accent cursor-pointer transition-colors">
                {data.newsletterButton}
              </Button>
            </div>
            <p className="text-foreground/80 text-sm">{data.newsletterDescription}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-8 sm:gap-6 w-full lg:w-2/4">
            {/* Quick Links */}
            <div className="min-w-[140px]">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-4 text-foreground/80 text-sm">
                <li>
                  <a href="/about" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/#ministries" className="hover:text-accent transition-colors">
                    Ministries
                  </a>
                </li>
                <li>
                  <a href="/#latest-sermon" className="hover:text-accent transition-colors">
                    Sermons
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-accent transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="/give" className="hover:text-accent transition-colors">
                    Partner & Give a Seed
                  </a>
                </li>
                <li>
                  <a href="/locations" className="hover:text-accent transition-colors">
                    Locations
                  </a>
                </li>
              </ul>
            </div>

            {/* Ministries */}
            <div className="min-w-[140px]">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Ministries</h4>
              <ul className="space-y-4 text-foreground/80 text-sm">
                <li>
                  <a href="/letom" className="hover:text-accent transition-colors">
                    L.E.T.O.M
                  </a>
                </li>
                <li>
                  <a href="/3one6" className="hover:text-accent transition-colors">
                    3one6
                  </a>
                </li>
                <li>
                  <a href="/community-outreach" className="hover:text-accent transition-colors">
                    Community Outreach
                  </a>
                </li>
                <li>
                  <a href="/k-church" className="hover:text-accent transition-colors">
                    K-church
                  </a>
                </li>
                <li>
                  <a href="/childrens-ministry" className="hover:text-accent transition-colors">
                    Children's Ministry
                  </a>
                </li>
                <li>
                  <a href="/teens-church" className="hover:text-accent transition-colors">
                    Teens Church
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="min-w-[140px]">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Contact Info</h4>
              <div className="space-y-4 text-foreground/80 text-sm">
                <p>
                  Love Economy Church, Thesaurus
                  <br />
                  GE-113-5393
                  <br />
                  Sena Road - Sun-City, Agbogba
                  <br />
                  Accra, Ghana
                  <br />
                  <a href="tel:+233592222695" className="hover:text-accent transition-colors">
                    +233 592222695
                  </a>
                </p>

                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-foreground">Box Address</h3>
                <p>
                  Christ World Incorporated
                  <br />
                  LGpmb99
                  <br />
                  Legon
                </p>
                <div className="mt-6">
                  <a href="/locations" className="hover:text-accent transition-colors text-foreground/80 text-sm">
                    View All Locations
                  </a>
                </div>
                <div className="mt-8 space-y-1">
                  <p className="font-semibold text-foreground mb-3">Service Times:</p>
                  <p>Sunday Love Service: 9:00 AM</p>
                  <p>Sunday Enlargement Service: 12:30 PM</p>
                  <p>Wednesday: 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-3 text-foreground/60 text-xs sm:text-sm px-2">
          <p>&copy; {new Date().getFullYear()} Love Economy Church. All rights reserved.</p>
          <a href="mailto:info@loveeconomychurch.org" className="ml-auto hover:text-accent transition-colors">
            info@loveeconomychurch.org
          </a>
        </div>
      </div>
    </footer>
  )
}
