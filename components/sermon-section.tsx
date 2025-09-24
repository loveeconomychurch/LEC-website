import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download, Calendar } from "lucide-react"

export function SermonSection() {
  return (
    <section id="sermons" className="py-16 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-balance">
            Latest Message
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Be encouraged and challenged by God's Word through our weekly messages
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="relative">
              <img src="/pastor-preaching-sermon-from-church-pulpit.jpg" alt="Latest sermon" className="w-full h-64 sm:h-80 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/50">
                  <Play className="mr-2 h-6 w-6" />
                  Watch Sermon
                </Button>
              </div>
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="h-4 w-4" />
                <span>December 15, 2024</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-balance">
                Finding Hope in Difficult Times
              </h3>
              <p className="text-muted-foreground mb-6 text-balance">
                In this powerful message, Pastor Johnson explores how we can maintain hope and faith even when facing
                life's greatest challenges. Discover the biblical principles that will strengthen your faith and give
                you peace in any storm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Now
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Download Audio
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Sermons
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
