"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Clock, BookOpen, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function PrayerSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    request: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Prayer request submitted:", formData)
  }

  const resources = [
    {
      icon: BookOpen,
      title: "Prayer Guide",
      description: "Learn how to pray effectively and grow in your prayer life."
    },
    {
      icon: Clock,
      title: "Prayer Times",
      description: "Join us for corporate prayer meetings throughout the week."
    },
    {
      icon: Users,
      title: "Prayer Team",
      description: "Connect with our prayer team for ongoing support and encouragement."
    }
  ]

  return (
    <section className="relative flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full min-h-[80vh] flex items-center justify-center px-8 pt-32 pb-16 bg-black bg-cover bg-center" style={{ backgroundImage: "url('/people-praying-together-in-church.jpg')" }}>
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
              Need a Prayer?
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're here to pray with you and for you. Share your prayer request and know that you're being lifted up in prayer.
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
              onClick={() => document.getElementById("prayer-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Submit Request
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 font-semibold border-2 border-white/30 !px-8 py-6 text-lg rounded-full"
              onClick={() => document.getElementById("prayer-resources")?.scrollIntoView({ behavior: "smooth" })}
            >
              Prayer Resources
              <ArrowRight className="ml-2 size-6" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Prayer Request Form Section */}
      <div id="prayer-form" className="relative w-full py-24 px-8 bg-white">
        <div className="max-w-3xl mx-auto">
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
              Submit Your Prayer Request
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-600"
            >
              Your request will be shared with our prayer team
            </motion.p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-neutral-50 rounded-3xl p-8 border border-neutral-200"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Phone (Optional)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label htmlFor="request" className="block text-sm font-semibold text-neutral-900 mb-2">
                Prayer Request
              </label>
              <Textarea
                id="request"
                placeholder="Share your prayer request here..."
                value={formData.request}
                onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                className="w-full min-h-[150px]"
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              style={{ backgroundColor: "#1762B9" }}
              className="w-full text-white hover:opacity-90 font-bold py-6 text-lg rounded-full"
            >
              Submit Prayer Request
              <ArrowRight className="ml-2 size-6" />
            </Button>
          </motion.form>
        </div>
      </div>

      {/* Visual Break Section */}
      <div className="relative w-full pt-16 px-0 bg-white">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 w-full overflow-hidden"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/p1.mov" type="video/quicktime" />
                <source src="/p1.mov" type="video/mp4" />
              </video>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative h-96 w-full overflow-hidden"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/p2.mov" type="video/quicktime" />
                <source src="/p2.mov" type="video/mp4" />
              </video>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-96 w-full overflow-hidden"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/p3.mov" type="video/quicktime" />
                <source src="/p3.mov" type="video/mp4" />
              </video>
            </motion.div>
            <div className="absolute top-16 inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-transparent -rotate-[180deg] h-96 z-10"></div>
          </div>
        </div>
      </div>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70"></div> */}

      {/* Prayer Resources Section */}
      <div id="prayer-resources" className="relative w-full py-24 px-8 bg-neutral-900">
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
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Prayer Resources
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-300 max-w-2xl mx-auto"
            >
              Tools and opportunities to grow in your prayer life
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-800 rounded-3xl p-8 hover:bg-neutral-700 transition-colors border border-neutral-700"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-6">
                  <resource.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{resource.title}</h3>
                <p className="text-neutral-300 leading-relaxed">{resource.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Prayer Meeting Times Section */}
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
              Prayer Meeting Times
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-neutral-600"
            >
              Join us for corporate prayer
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {[
              { day: "Sunday", time: "8:00 AM - 8:30 AM", location: "Main Sanctuary", description: "Pre-service prayer" },
              { day: "Wednesday", time: "7:00 PM - 8:30 PM", location: "Prayer Room", description: "Mid-week prayer and intercession" },
              { day: "Friday", time: "6:00 AM - 7:00 AM", location: "Online", description: "Virtual prayer meeting" }
            ].map((meeting, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 items-start bg-neutral-50 rounded-3xl p-8 border border-neutral-200"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                    <Clock className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">{meeting.day} Prayer</h3>
                  <p className="text-lg text-neutral-600 mb-1">
                    <strong>Time:</strong> {meeting.time}
                  </p>
                  <p className="text-lg text-neutral-600 mb-1">
                    <strong>Location:</strong> {meeting.location}
                  </p>
                  <p className="text-neutral-700">{meeting.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

