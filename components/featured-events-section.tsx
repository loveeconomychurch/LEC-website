"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import Image from "next/image"

export function FeaturedEventsSection() {
  const featuredEvents = [
    {
      id: 1,
      date: "Dec 24",
      title: "Christmas Eve Candlelight Service",
      time: "7:00 PM",
      location: "Main Sanctuary",
      attendees: "500+",
      description: "Join us for a special candlelight service celebrating the birth of Jesus. Experience the wonder of Christmas through worship, prayer, and fellowship.",
      image: "/christmas-eve-candlelight-church-service.jpg",
      category: "Worship",
    },
    {
      id: 2,
      date: "Jan 21",
      title: "Believers' Convention",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center",
      attendees: "1000+",
      description: "Our annual gathering of believers from across the region. Powerful teaching, worship, and networking opportunities.",
      image: "/church-worship-service-with-people-raising-hands-i.jpg",
      category: "Conference",
    },
    {
      id: 3,
      date: "Mar 3",
      title: "Ambience of Love",
      time: "7:30 PM",
      location: "Main Sanctuary",
      attendees: "600+",
      description: "A special evening celebrating love, relationships, and God's plan for families. Perfect for couples and singles.",
      image: "/happy-family-at-church-event-together.jpg",
      category: "Family",
    },
  ]

  return (
    <section className="py-28 bg-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-5xl sm:text-5xl font-bold mb-4 text-balance text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Featured Events
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-300 max-w-2xl mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Don't miss these special gatherings that will transform your faith and connect you with our community
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white">
                <div className="relative h-64">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-semibold">
                    {event.date}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold">
                    {event.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-playfair)] text-gray-900">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} expected</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">{event.description}</p>
                  <Button className="w-full group-hover:bg-primary/90">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

