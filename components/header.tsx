"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Search } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="absolute top-0 right-0 left-0 z-50 bg-black/0 min-h-[72px]">
        <div className=" mx-auto px-4 sm:px-6 lg:px-26 py-4">
          <div className="flex items-center">

            <div className="rounded-full hover:bg-transparent">
              <div className="w-10 aspect-square border border-gray-500 rounded-full flex flex-col gap-1 items-center justify-center">
                <span className="w-3/5 h-[1px] rounded-full bg-white"></span>
                <span className="w-3/5 h-[1px] rounded-full bg-white"></span>
                <span className="w-3/5 h-[1px] rounded-full bg-white"></span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8  ml-10 font-bold">
              <a href="#give" className="text-white hover:text-orange-500 transition-colors">
                Give
              </a>
              <a href="#groups" className="text-white hover:text-orange-500 transition-colors">
                Groups
              </a>
              <a href="#serve" className="text-white hover:text-orange-500 transition-colors">
                Serve
              </a>
              <a href="#events" className="text-white hover:text-orange-500 transition-colors">
                Events
              </a>
              <a href="#about" className="text-white hover:text-orange-500 transition-colors">
                About
              </a>
            </nav>

            {/* Logo */}
            <div className="flex items-center mx-auto mt-7 absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-3">
                <Image
                  src="/love-economy-church-logo.png"
                  alt="Love Economy Church Logo"
                  width={40}
                  height={40}
                  className="w-46 h-auto"
                />
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4 ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                />
              </div>
              <Button variant="ghost" size="sm" className="rounded-full hidden">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">👤</span>
                </div>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-gray-800"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 bg-black shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/love-economy-church-logo.png"
                    alt="Love Economy Church Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="text-lg font-serif font-bold text-white">Love Economy Church</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:bg-gray-800"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-800">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6">
                <div className="space-y-4">
                  <a
                    href="#give"
                    className="block text-white hover:text-orange-500 transition-colors font-medium text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Give
                  </a>
                  <a
                    href="#groups"
                    className="block text-white hover:text-orange-500 transition-colors font-medium text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Groups
                  </a>
                  <a
                    href="#serve"
                    className="block text-white hover:text-orange-500 transition-colors font-medium text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Serve
                  </a>
                  <a
                    href="#events"
                    className="block text-white hover:text-orange-500 transition-colors font-medium text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Events
                  </a>
                  <a
                    href="#about"
                    className="block text-white hover:text-orange-500 transition-colors font-medium text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </a>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-800">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg">
                  Get Connected
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
