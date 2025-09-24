import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

export function EventsSection() {
  const events = [
    {
      date: "Dec 24",
      title: "Christmas Eve Service",
      time: "7:00 PM",
      location: "Main Sanctuary",
      description: "Join us for a special candlelight service celebrating the birth of Jesus.",
      image: "/christmas-eve-candlelight-church-service.jpg",
    },
    {
      date: "Jan 7",
      title: "New Year Prayer & Fasting",
      time: "6:00 AM - 6:00 PM",
      location: "Prayer Chapel",
      description: "Start the new year with focused prayer and seeking God's direction.",
      image: "/people-praying-together-in-church.jpg",
    },
    {
      date: "Jan 14",
      title: "Youth Winter Retreat",
      time: "All Weekend",
      location: "Mountain View Camp",
      description: "A weekend of worship, fellowship, and fun for our youth ministry.",
      image: "/youth-group-at-winter-retreat-camp.jpg",
    },
  ]

  return (
    <section id="events" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-balance">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Join us for special events, conferences, and community gatherings throughout the year
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-semibold">
                  {event.date}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-playfair)]">{event.title}</h3>
                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">{event.description}</p>
                <Button className="w-full">Register Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Button>
        </div>
      </div>
    </section>
  )
}
