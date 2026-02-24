"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, BookOpen, Target, Users, TrendingUp, Award, Briefcase, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

export function BusinessSchoolSection() {
  // Create duplicated events for infinite loop
  const events = [
    {
      title: "Business Excellence Workshop",
      image: "/adults-in-bible-study-group-discussion.jpg",
      dateFrom: "2024-03-15",
      dateTo: "2024-03-17"
    },
    {
      title: "Entrepreneurship Summit",
      image: "/people-praying-together-in-church.jpg",
      dateFrom: "2024-04-10",
      dateTo: "2024-04-12"
    },
    {
      title: "Leadership Development Conference",
      image: "/volunteers-serving-food-at-community-outreach-even.jpg",
      dateFrom: "2024-06-20",
      dateTo: "2024-06-22"
    },
    {
      title: "Networking & Community Event",
      image: "/happy-family-at-church-event-together.jpg",
      dateFrom: "2024-05-05",
      dateTo: "2024-05-05"
    }
  ]
  
  // Duplicate events 3 times for seamless infinite scroll
  const duplicatedEvents = [...events, ...events, ...events]
  const startIndex = events.length // Start in the middle copy
  
  const [currentEventIndex, setCurrentEventIndex] = useState(startIndex)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [disableTransition, setDisableTransition] = useState(false)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Responsive slides per view: 1 on mobile, 2 on md, 3 on lg
  useEffect(() => {
    const updateSlidesPerView = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024
      if (w < 768) setSlidesPerView(1)
      else if (w < 1024) setSlidesPerView(2)
      else setSlidesPerView(3)
    }
    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)
    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  // Handle seamless infinite loop reset
  useEffect(() => {
    if (disableTransition && sliderRef.current) {
      // Temporarily disable transition for seamless jump
      sliderRef.current.style.transition = 'none'
      // Reset transition after a brief moment
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = ''
          setDisableTransition(false)
        }
      }, 50)
    }
  }, [disableTransition])
  const features = [
    {
      icon: BookOpen,
      title: "Biblical Business Principles",
      description: "Learn how to integrate faith and business, making God-honoring decisions in your entrepreneurial journey."
    },
    {
      icon: Target,
      title: "Practical Training",
      description: "Gain hands-on experience with real-world business scenarios and case studies from successful Christian entrepreneurs."
    },
    {
      icon: Users,
      title: "Network & Community",
      description: "Connect with like-minded business owners and entrepreneurs who share your values and vision."
    },
    {
      icon: TrendingUp,
      title: "Growth & Development",
      description: "Develop essential skills in leadership, management, marketing, and financial stewardship."
    },
    {
      icon: Award,
      title: "Excellence Focus",
      description: "Pursue excellence in all areas of business, reflecting God's character in your work."
    },
    {
      icon: Briefcase,
      title: "Mentorship",
      description: "Receive guidance from experienced business leaders who are committed to your success."
    }
  ]

  const programs = [
    {
      title: "Entrepreneurship Fundamentals",
      description: "Build a strong foundation in business creation, planning, and execution from a biblical perspective.",
      image: "/adults-in-bible-study-group-discussion.jpg"
    },
    {
      title: "Business Management",
      description: "Master the essentials of managing operations, teams, and resources effectively and ethically.",
      image: "/people-praying-together-in-church.jpg"
    },
    {
      title: "Financial Stewardship",
      description: "Learn biblical principles of money management, budgeting, and financial planning for business.",
      image: "/volunteers-serving-food-at-community-outreach-even.jpg"
    },
    {
      title: "Marketing & Branding",
      description: "Develop strategies to communicate your values and reach your target market authentically.",
      image: "/happy-family-at-church-event-together.jpg"
    },
    {
      title: "Leadership Development",
      description: "Cultivate servant leadership skills that inspire teams and create positive workplace cultures.",
      image: "/worship-team-playing-music-on-church-stage.jpg"
    },
    {
      title: "Scaling Your Business",
      description: "Learn how to grow and expand your business while maintaining integrity and purpose.",
      image: "/youth-group-teenagers-in-church-fellowship.jpg"
    }
  ]

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-black bg-cover bg-center" style={{ backgroundImage: "url('/adults-in-bible-study-group-discussion.jpg')" }}>
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-neutral-900/40 via-black/80 to-neutral-900/10" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 text-balance leading-tight tracking-wider uppercase px-2">
              Love Economy Business School
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              Equipping entrepreneurs and business leaders with biblical principles and practical skills to build God-honoring businesses that transform communities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 px-2"
          >
            <Button
              size="lg"
              style={{ backgroundColor: "#1762B9" }}
              className="text-white hover:opacity-90 font-bold w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0 !px-6 sm:!px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
            >
              Enroll Now
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0 !px-6 sm:!px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full"
            >
              Learn More
              <ArrowRight className="ml-2 size-5 sm:size-6" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* About Section with Image */}
      <div className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6 px-1"
              >
                Building Businesses That Honor God
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4 text-base sm:text-lg text-neutral-600 leading-relaxed"
              >
                <p>
                  Love Economy Business School is dedicated to empowering Christian entrepreneurs and business leaders to build successful enterprises that reflect God's character and advance His kingdom.
                </p>
                <p>
                  Our comprehensive curriculum combines timeless biblical principles with modern business practices, ensuring that you can excel in the marketplace while maintaining your integrity and purpose.
                </p>
                <p>
                  Whether you're just starting your business journey or looking to take your existing enterprise to the next level, we provide the knowledge, skills, and community support you need to succeed.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="relative h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden order-first lg:order-none"
            >
              <Image
                src="/church-worship-service-with-people-raising-hands-i.jpg"
                alt="Business School"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2"
            >
              Why Choose Love Economy Business School
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto px-2"
            >
              Experience a unique approach to business education that integrates faith and excellence
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-colors border border-white/10"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 mb-3 sm:mb-4">
                    <FeatureIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Programs Section with Images */}
      <div className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 px-2"
            >
              Our Programs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-2"
            >
              Comprehensive courses designed to equip you for business success
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="overflow-hidden transition-all group"
              >
                <div className="relative h-44 sm:h-52 md:h-56 w-full rounded-2xl sm:rounded-3xl overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1.5 sm:mb-2">{program.title}</h3>
                  <p className="text-neutral-600 leading-relaxed text-xs sm:text-sm">{program.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 px-2"
            >
              Events
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto px-2"
            >
              Join us for workshops, seminars, networking events, and community gatherings
            </motion.p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto">
            {/* Navigation Buttons - visible on all screens, inset on mobile */}
            <button
              onClick={() => {
                if (isTransitioning) return
                setDirection(-1)
                setIsTransitioning(true)
                setCurrentEventIndex((prev) => {
                  const newIndex = prev - 1
                  // If we're leaving the middle section going left, jump to equivalent in last section
                  if (newIndex < startIndex) {
                    // Calculate equivalent position
                    const relativeIndex = ((newIndex % events.length) + events.length) % events.length
                    // Return position in last section for seamless loop
                    return startIndex + events.length + relativeIndex
                  }
                  return newIndex
                })
                // Reset to middle section after animation if needed
                setTimeout(() => {
                  setCurrentEventIndex((prev) => {
                    if (prev >= startIndex + events.length || prev < startIndex) {
                      const relativeIndex = prev % events.length
                      setDisableTransition(true)
                      return startIndex + relativeIndex
                    }
                    return prev
                  })
                }, 500)
                setTimeout(() => {
                  setIsTransitioning(false)
                  setDirection(0)
                }, 500)
              }}
              className="absolute left-2 sm:left-0 top-1/3 -translate-y-1/2 sm:-translate-x-12 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg cursor-pointer hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous event"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-900" />
            </button>
            <button
              onClick={() => {
                if (isTransitioning) return
                setDirection(1)
                setIsTransitioning(true)
                setCurrentEventIndex((prev) => {
                  const newIndex = prev + 1
                  // If we're leaving the middle section going right, jump to equivalent in first section
                  if (newIndex >= startIndex + events.length) {
                    // Calculate relative position
                    const relativeIndex = newIndex % events.length
                    // Return position in first section for seamless loop
                    return relativeIndex
                  }
                  return newIndex
                })
                // Reset to middle section after animation if needed
                setTimeout(() => {
                  setCurrentEventIndex((prev) => {
                    if (prev >= startIndex + events.length || prev < startIndex) {
                      const relativeIndex = prev % events.length
                      setDisableTransition(true)
                      return startIndex + relativeIndex
                    }
                    return prev
                  })
                }, 500)
                setTimeout(() => {
                  setIsTransitioning(false)
                  setDirection(0)
                }, 500)
              }}
              className="absolute right-2 sm:right-0 top-1/3 -translate-y-1/2 sm:translate-x-12 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg cursor-pointer hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next event"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-900" />
            </button>

            {/* Slider Container - Full width, responsive slides per view */}
            <div className="overflow-hidden relative w-full">
              <div 
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentEventIndex * (100 / slidesPerView)}%)`,
                  transition: disableTransition ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {duplicatedEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-2 sm:px-3"
                    style={{
                      width: `${100 / slidesPerView}%`
                    }}
                  >
                    <div className="overflow-hidden group cursor-pointer">
                    <div className="relative h-52 sm:h-60 md:h-64 w-full rounded-2xl sm:rounded-3xl overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-gray-50 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg text-center">
                        <p className="text-xs sm:text-sm text-gray-500 text-center leading-tight uppercase">
                          {new Date(event.dateFrom).toLocaleString('default', { month: 'short' })}
                        </p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                          {new Date(event.dateFrom).getDate()}
                        </p>
                      </div>
                    </div>
                    <div className="text-center mt-2 sm:mt-3 px-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-900">{event.title}</h3>
                      <p className="text-neutral-600 text-xs sm:text-sm mt-0.5">
                        {new Date(event.dateFrom).toLocaleString('default', { month: 'short' }) + ', ' + 
                         new Date(event.dateFrom).getDate() + ' ' + 
                         new Date(event.dateFrom).getFullYear() + ' - ' + 
                         new Date(event.dateTo).toLocaleString('default', { month: 'short' }) + ', ' + 
                         new Date(event.dateTo).getDate() + ' ' + 
                         new Date(event.dateTo).getFullYear()}
                      </p>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
              {events.map((_, index) => {
                // Calculate which indicator should be active based on current position
                const activeIndex = currentEventIndex % events.length
                const isActive = activeIndex === index
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (isTransitioning || isActive) return
                      setDirection((startIndex + index) > currentEventIndex ? 1 : -1)
                      setIsTransitioning(true)
                      // Always navigate to the middle section
                      setCurrentEventIndex(startIndex + index)
                      setTimeout(() => {
                        setIsTransitioning(false)
                        setDirection(0)
                      }, 500)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      isActive ? 'w-8 bg-neutral-900' : 'w-2 bg-neutral-300'
                    }`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action with Background Image */}
      <div className="relative w-full py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900 bg-cover bg-center" style={{ backgroundImage: "url('/church-worship-service-with-people-raising-hands-i.jpg')" }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-2"
            >
              Ready to Build Your Business?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-neutral-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
            >
              Join us and discover how to create a business that not only succeeds but also makes an eternal impact.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                <Button
                  size="lg"
                  style={{ backgroundColor: "#1762B9" }}
                  className="text-white hover:opacity-90 font-bold w-full sm:w-auto px-6 sm:px-10 md:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-full"
                >
                  Apply Now
                  <ArrowRight className="ml-2 size-5 sm:size-6" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto max-w-xs sm:max-w-none"
              >
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 w-full sm:w-auto px-6 sm:px-10 md:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-full"
                >
                  Contact Us
                  <ArrowRight className="ml-2 size-5 sm:size-6" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

