"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Users, HandHeart, Globe, Calendar, MapPin } from "lucide-react"
import Image from "next/image"

export function CommunityOutreachSection() {
  const programs = [
    {
      icon: HandHeart,
      title: "Food Distribution",
      description: "Providing meals and groceries to families in need throughout our community."
    },
    {
      icon: Heart,
      title: "Medical Outreach",
      description: "Free health screenings and medical care for underserved communities."
    },
    {
      icon: Users,
      title: "Education Support",
      description: "Tutoring, school supplies, and educational resources for students."
    },
    {
      icon: Globe,
      title: "Global Missions",
      description: "Supporting missions and relief efforts around the world."
    }
  ]

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full min-h-[80vh] flex items-center justify-center px-8 pt-32 pb-16 bg-black bg-cover bg-center" style={{ backgroundImage: "url('/volunteers-serving-food-at-community-outreach-even.jpg')" }}>
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-neutral-900/40 via-black/80 to-neutral-900/10" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-5xl lg:text-5xl xl:text-6xl font-black mb-8 text-balance leading-tight tracking-wider uppercase">
              Community Outreach
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Making a difference in our community and around the world through service, compassion, and the love of Christ.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Button
              size="lg"
              style={{ backgroundColor: "#1762B9" }}
              className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full"
            >
              Volunteer
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 !px-8 py-6 text-lg rounded-full"
            >
              Partner With Us
              <ArrowRight className="ml-2 size-6" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
            >
              Our Outreach Programs
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-3xl p-8 hover:bg-neutral-100 transition-colors border border-neutral-200"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900/5 mb-6">
                  <program.icon className="w-7 h-7 text-neutral-900" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">{program.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="relative w-full py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-64 md:h-80 rounded-3xl overflow-hidden"
            >
              <Image
                src="/volunteers-serving-food-at-community-outreach-even.jpg"
                alt="Volunteers serving food"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-64 md:h-80 rounded-3xl overflow-hidden"
            >
              <Image
                src="/happy-family-at-church-event-together.jpg"
                alt="Community event"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 md:h-80 rounded-3xl overflow-hidden"
            >
              <Image
                src="/church-worship-service-with-people-raising-hands-i.jpg"
                alt="Community service"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="relative w-full py-24 px-8 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Making an Impact
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Families Served Monthly" },
              { number: "50+", label: "Community Partners" },
              { number: "1000+", label: "Volunteers Active" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-800 rounded-3xl p-8 text-center border border-neutral-700"
              >
                <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-neutral-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Get Involved Section */}
      <div className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4"
            >
              Get Involved
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-600"
            >
              Join us in making a difference in our community
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <Button
              size="lg"
              style={{ backgroundColor: "#1762B9" }}
              className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full"
            >
              Volunteer Now
              <ArrowRight className="ml-2 size-6" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

