import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-[family-name:var(--font-playfair)]">Grace Community</h3>
            <p className="text-background/80 mb-4">
              A place where faith comes alive through worship, community, and God's transforming love.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#ministries" className="hover:text-accent transition-colors">
                  Ministries
                </a>
              </li>
              <li>
                <a href="#sermons" className="hover:text-accent transition-colors">
                  Sermons
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-accent transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ministries</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Youth Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Children's Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Adult Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Worship Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Community Outreach
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-background/80">
              <p>
                123 Faith Street
                <br />
                Your City, State 12345
              </p>
              <p>(555) 123-4567</p>
              <p>info@gracecommunity.org</p>
              <div className="mt-4">
                <p className="font-semibold text-background">Service Times:</p>
                <p>Sunday: 9:00 AM & 11:00 AM</p>
                <p>Wednesday: 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 Grace Community Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
