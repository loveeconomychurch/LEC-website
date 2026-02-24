"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ArrowRight, Filter } from "lucide-react"
import Image from "next/image"

export function AllEventsSection() {
  const allEvents = [
    {
      id: 1,
      date: "Jan 7",
      title: "New Year Prayer & Fasting",
      time: "6:00 AM - 6:00 PM",
      location: "Prayer Chapel",
      attendees: "200+",
      description: "Start the new year with focused prayer and seeking God's direction. Join us for a day of fasting, prayer, and spiritual renewal.",
      image: "/people-praying-together-in-church.jpg",
      category: "Prayer",
    },
    {
      id: 2,
      date: "Jan 14",
      title: "Youth Winter Retreat",
      time: "All Weekend",
      location: "Mountain View Camp",
      attendees: "150+",
      description: "A weekend of worship, fellowship, and fun for our youth ministry. Games, worship, and deep spiritual conversations await.",
      image: "/youth-group-at-winter-retreat-camp.jpg",
      category: "Youth",
    },
    {
      id: 3,
      date: "Feb 4",
      title: "Yadah Concert",
      time: "7:00 PM",
      location: "Main Sanctuary",
      attendees: "800+",
      description: "An evening of powerful worship and praise. Join us for an unforgettable night of music and ministry.",
      image: "/worship-team-playing-music-on-church-stage.jpg",
      category: "Worship",
    },
    {
      id: 4,
      date: "Feb 18",
      title: "One Life Jam",
      time: "6:00 PM",
      location: "Youth Center",
      attendees: "300+",
      description: "A dynamic event for young adults featuring music, testimonies, and life-changing messages.",
      image: "/youth-group-teenagers-in-church-fellowship.jpg",
      category: "Youth",
    },
    {
      id: 5,
      date: "Mar 17",
      title: "Community Outreach Day",
      time: "9:00 AM - 3:00 PM",
      location: "Various Locations",
      attendees: "200+",
      description: "Join us as we serve our community through various outreach activities. Make a difference in people's lives.",
      image: "/volunteers-serving-food-at-community-outreach-even.jpg",
      category: "Outreach",
    },
    {
      id: 6,
      date: "Apr 2",
      title: "Easter Celebration",
      time: "9:00 AM - 12:00 PM",
      location: "Main Sanctuary",
      attendees: "1200+",
      description: "Celebrate the resurrection of Jesus Christ with worship, fellowship, and a special message of hope.",
      image: "/church-worship-service-with-people-raising-hands-i.jpg",
      category: "Worship",
    },
  ]

  const categories = ["All", "Worship", "Prayer", "Youth", "Conference", "Family", "Outreach"]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-3xl sm:text-6xl font-bold mb-2 font-[family-name:var(--font-playfair)] text-balance text-neutral-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            All Events
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-900 mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Discover all our upcoming events and find the perfect gathering for you
          </motion.p>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  category === "All" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-primary-foreground"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {allEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-48">
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
                  <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-playfair)]">
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
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                    {event.description}
                  </p>
                  <Button className="w-full group-hover:bg-primary/90">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Button variant="outline" size="lg" className="mr-4">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Button>
          <Button size="lg">
            <Filter className="mr-2 h-4 w-4" />
            Filter Events
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

