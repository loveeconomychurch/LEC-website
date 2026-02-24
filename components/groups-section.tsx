"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, MapPin, Calendar, Heart, BookOpen } from "lucide-react"
import Image from "next/image"

export function GroupsSection() {
  const groupTypes = [
    {
      icon: Users,
      title: "Age-Based Groups",
      description: "Connect with people in your life stage",
      groups: ["Young Adults (18-25)", "Adults (26-40)", "Seniors (40+)"]
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "Find groups meeting near you",
      groups: ["Accra Central", "East Legon", "Tema", "Kumasi"]
    },
    {
      icon: Heart,
      title: "Interest-Based",
      description: "Join groups around shared interests",
      groups: ["Bible Study", "Prayer Warriors", "Sports & Fitness", "Business & Career"]
    }
  ]

  const benefits = [
    {
      icon: Users,
      title: "Authentic Community",
      description: "Build deep, meaningful relationships with people who truly care about you."
    },
    {
      icon: BookOpen,
      title: "Spiritual Growth",
      description: "Grow in your faith through shared Bible study and accountability."
    },
    {
      icon: Heart,
      title: "Support System",
      description: "Find encouragement, prayer, and practical help when you need it most."
    },
    {
      icon: Calendar,
      title: "Regular Gatherings",
      description: "Meet consistently to study, pray, and do life together."
    }
  ]

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full min-h-[80vh] flex items-center justify-center px-8 pt-32 pb-16 bg-black bg-cover bg-center" style={{ backgroundImage: "url('/happy-family-at-church-event-together.jpg')" }}>
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
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-5xl lg:text-5xl xl:text-6xl font-black mb-8 text-balance leading-tight tracking-wider uppercase">
              Join a Group
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with a community where you can grow in faith, build meaningful relationships, and experience authentic fellowship.
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
              Find a Group
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 !px-8 py-6 text-lg rounded-full"
            >
              Start Your Own
              <ArrowRight className="ml-2 size-6" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Group Types Section */}
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
              Types of Groups
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-600 max-w-2xl mx-auto"
            >
              Find the perfect group for you based on your age, location, or interests
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {groupTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-3xl p-8 hover:bg-neutral-100 transition-colors border border-neutral-200"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-neutral-900/5 mb-6">
                  <type.icon className="w-7 h-7 text-neutral-900" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">{type.title}</h3>
                <p className="text-neutral-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.groups.map((group, i) => (
                    <li key={i} className="text-neutral-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      {group}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="relative w-full py-24 px-8 bg-neutral-100">
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
                src="/adults-in-bible-study-group-discussion.jpg"
                alt="Bible study group"
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
                alt="Church community"
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
                src="/youth-group-teenagers-in-church-fellowship.jpg"
                alt="Youth fellowship"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative w-full py-24 px-8 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
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
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Why Join a Group?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-300 max-w-2xl mx-auto"
            >
              Experience the transformative power of community
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-800 rounded-3xl p-8 hover:bg-neutral-700 transition-colors border border-neutral-700"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-6">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-neutral-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Break Section */}
      <div className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-3xl overflow-hidden"
          >
            <Image
              src="/church-worship-service-with-people-raising-hands-i.jpg"
              alt="Worship service"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-8">
                <h3 className="text-4xl font-bold mb-4">Life Happens Better Together</h3>
                <p className="text-xl">Join a group and experience the power of authentic community</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* How to Join Section */}
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
              How to Join
            </motion.h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { step: "1", title: "Explore Groups", description: "Browse our directory to find groups that match your interests, location, or life stage." },
              { step: "2", title: "Contact a Leader", description: "Reach out to the group leader to learn more and see if it's a good fit for you." },
              { step: "3", title: "Visit a Meeting", description: "Attend a group meeting to experience the community and see if you'd like to join." },
              { step: "4", title: "Start Growing", description: "Become a regular member and start building relationships and growing in your faith." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-neutral-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Button
              size="lg"
              style={{ backgroundColor: "#1762B9" }}
              className="text-white hover:opacity-90 font-bold !px-8 py-6 text-lg rounded-full"
            >
              Browse Groups
              <ArrowRight className="ml-2 size-6" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

