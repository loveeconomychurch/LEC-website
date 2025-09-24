import { Button } from "@/components/ui/button"
import { MapPin, Monitor, Users, ArrowUp } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      icon: MapPin,
      title: "Physical Campus",
      description: "Worship with us in person at one of our physical locations.",
      action: "Find a location",
    },
    {
      icon: Monitor,
      title: "Live Streams",
      description: "Join us online for community and worship from anywhere.",
      action: "Find a time",
    },
    {
      icon: Users,
      title: "Watch Party",
      description: "Watch Parties are groups of people that stream live together.",
      action: "Find a watch party",
    },
    {
      icon: ArrowUp,
      title: "Pop-Up",
      description: "A Pop-Up is where existing church members meet in different cities.",
      action: "Find a pop-up",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 text-balance">
            Find the right experience for you.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-balance">
            No matter where you are, online or in-person, become a part of all God is doing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {experiences.map((experience, index) => (
            <div key={index} className="text-center">
              <div className="mb-6">
                <experience.icon className="h-16 w-16 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{experience.title}</h3>
              <p className="text-gray-600 mb-6 text-balance leading-relaxed">{experience.description}</p>
              <Button variant="link" className="text-primary hover:text-primary/80 p-0 h-auto font-semibold">
                {experience.action} →
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="link" className="text-primary hover:text-primary/80 font-semibold text-lg">
            View locations →
          </Button>
        </div>
      </div>
    </section>
  )
}
