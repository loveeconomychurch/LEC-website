import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 hidden">
        <Image
          src="/church-worship-service-with-people-raising-hands-i.jpg"
          alt="Church worship service"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          // onError={() => console.log("[v0] Video failed to load")}
          // onLoadStart={() => console.log("[v0] Video loading started")}
          // onCanPlay={() => console.log("[v0] Video can play")}
        >
          <source
            src="/marv.mov"
            type="video/mp4"
          />
          {/* Fallback image */}
          <img
            src="/church-worship-service-with-people-raising-hands-i.jpg"
            alt="Church worship service"
            className="w-full h-full object-cover opacity-70"
          />
        </video>
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-8 hidden">
          <Image
            src="/love-economy-church-logo.png"
            alt="Love Economy Church Logo"
            width={120}
            height={120}
            className="mx-auto filter brightness-0 invert"
          />
        </div>

        <h1 className="font-serif text-5xl sm:text-5xl lg:text-5xl xl:text-6xl font-black mb-8 text-balance leading-tight tracking-wider">
          <span style={{ color: "white" }}>OUR YEAR OF ABUNDANT GRACE AND GREAT APOSTLESHIP</span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-base mb-12 text-gray-200 max-w-4xl mx-auto text-balance font-light leading-relaxed w-5/6">
          Love Economy Church is a community where faith transforms lives and purpose drives action. We believe in the
          power of love to create lasting change in our hearts, families, and world.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            style={{ backgroundColor: "#1762B9" }}
            className="text-white hover:opacity-90 font-bold px-12 py-4 text-lg rounded-full"
          >
            Join Our Community
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 px-12 py-4 text-lg rounded-full"
          >
            Watch Online
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 hidden">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </section>
  )
}
