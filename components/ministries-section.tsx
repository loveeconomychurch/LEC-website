import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MinistriesSection() {
  const ministries = [
    {
      title: "Youth Ministry",
      subtitle: "Ages 12-18",
      description:
        "Empowering the next generation through dynamic worship, relevant teaching, and authentic community.",
      image: "/youth-group-teenagers-in-church-fellowship.jpg",
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Children's Ministry",
      subtitle: "Ages 2-11",
      description:
        "Creating a safe, fun environment where kids can learn about God's love through engaging activities.",
      image: "/children-in-sunday-school-classroom-learning.jpg",
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Adult Ministry",
      subtitle: "All Ages",
      description: "Growing together in faith through Bible studies, life groups, and service opportunities.",
      image: "/adults-in-bible-study-group-discussion.jpg",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Worship Ministry",
      subtitle: "Music & Arts",
      description: "Leading our congregation in heartfelt worship through music, media, and creative expression.",
      image: "/worship-team-playing-music-on-church-stage.jpg",
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Community Outreach",
      subtitle: "Local & Global",
      description: "Making a difference in our community and around the world through service and missions.",
      image: "/volunteers-serving-food-at-community-outreach-even.jpg",
      color: "from-teal-500 to-blue-600",
    },
    {
      title: "Marriage & Family",
      subtitle: "Relationships",
      description: "Strengthening marriages and families through biblical principles and practical support.",
      image: "/happy-family-at-church-event-together.jpg",
      color: "from-rose-500 to-pink-600",
    },
  ]

  return (
    <section id="ministries" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-6xl sm:text-6xl font-bold mb-4 font-serif uppercase text-balance">
            A Place for You and Your Family
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover meaningful ways to grow in faith, build relationships, and make a difference in our community
          </p>
        </div>

        <div className="grid gap"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hidden">
          {ministries.map((ministry, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={ministry.image || "/placeholder.svg"}
                  alt={ministry.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${ministry.color} opacity-80`} />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">{ministry.title}</h3>
                  <p className="text-sm opacity-90">{ministry.subtitle}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">{ministry.description}</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
