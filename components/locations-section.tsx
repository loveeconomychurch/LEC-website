"use client"

import { useState, useCallback, useMemo } from "react"
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Navigation, Search, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Sample church branch locations - replace with your actual locations
const churchLocations = [
  {
    id: 1,
    name: "Love Economy Church - Main Campus",
    address: "123 Main Street, Accra, Ghana",
    phone: "+233 24 123 4567",
    hours: "Sunday: 9:00 AM - 12:00 PM",
    position: { lat: 5.6037, lng: -0.1870 }, // Accra coordinates
    description: "Our main worship center with full facilities",
    images: [
      "/church-worship-service-with-people-raising-hands-i.jpg",
      "/pastor-preaching-sermon-from-church-pulpit.jpg",
    ],
  },
  {
    id: 2,
    name: "Love Economy Church - East Branch",
    address: "456 East Avenue, Tema, Ghana",
    phone: "+233 24 234 5678",
    hours: "Sunday: 10:00 AM - 1:00 PM",
    position: { lat: 5.6870, lng: -0.0010 }, // Tema coordinates
    description: "Community-focused branch in the eastern region",
    images: [
      "/people-praying-together-in-church.jpg",
      "/worship-team-playing-music-on-church-stage.jpg",
    ],
  },
  {
    id: 3,
    name: "Love Economy Church - West Branch",
    address: "789 West Road, Kumasi, Ghana",
    phone: "+233 24 345 6789",
    hours: "Sunday: 8:00 AM - 11:00 AM",
    position: { lat: 6.6885, lng: -1.6244 }, // Kumasi coordinates
    description: "Serving the Ashanti region",
    images: [
      "/christmas-eve-candlelight-church-service.jpg",
      "/church-worship-service-with-people-raising-hands-i.jpg",
    ],
  },
  {
    id: 4,
    name: "Love Economy Church - North Branch",
    address: "321 North Boulevard, Tamale, Ghana",
    phone: "+233 24 456 7890",
    hours: "Sunday: 9:30 AM - 12:30 PM",
    position: { lat: 9.4000, lng: -0.8393 }, // Tamale coordinates
    description: "Northern region community outreach center",
    images: [
      "/happy-family-at-church-event-together.jpg",
      "/adults-in-bible-study-group-discussion.jpg",
    ],
  },
  {
    id: 5,
    name: "Love Economy Church - Central Branch",
    address: "654 Central Plaza, Cape Coast, Ghana",
    phone: "+233 24 567 8901",
    hours: "Sunday: 8:30 AM - 11:30 AM",
    position: { lat: 5.1053, lng: -1.2466 }, // Cape Coast coordinates
    description: "Historic coastal branch with ocean views",
    images: [
      "/volunteers-serving-food-at-community-outreach-even.jpg",
      "/youth-group-teenagers-in-church-fellowship.jpg",
    ],
  },
]

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: 7.9465, // Center of Ghana
  lng: -1.0232,
}

export function LocationsSection() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const [selectedLocation, setSelectedLocation] = useState<typeof churchLocations[0] | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  // Helper function to get Google Maps directions URL
  const getDirectionsUrl = (location: typeof churchLocations[0]) => {
    const { lat, lng } = location.position
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  }

  // Filter locations based on search query
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) return churchLocations
    const query = searchQuery.toLowerCase()
    return churchLocations.filter(
      (location) =>
        location.name.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query) ||
        location.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onMapUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleLocationClick = (location: typeof churchLocations[0]) => {
    setSelectedLocation(location)
    if (map) {
      map.panTo(location.position)
      map.setZoom(15)
    }
  }

  const handleGetMyLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          if (map) {
            map.panTo(location)
            map.setZoom(12)
          }
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoadingLocation(false)
        }
      )
    } else {
      setIsLoadingLocation(false)
    }
  }

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Sort locations by distance if user location is available
  const sortedLocations = useMemo(() => {
    if (!userLocation) return filteredLocations
    return [...filteredLocations].sort((a, b) => {
      const distA = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        a.position.lat,
        a.position.lng
      )
      const distB = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        b.position.lat,
        b.position.lng
      )
      return distA - distB
    })
  }, [filteredLocations, userLocation])

  return (
    <section className="relative flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative w-full py-10 px-8 bg-gradient-to-br border-b border-gray-200">
        <div className=" mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between text-center text-white"
          >
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <Image
                  src="/love-economy-church-logo.png"
                  alt="Love Economy Church Logo"
                  width={40}
                  height={40}
                  className="w-46 h-auto grayscale-100 invert"
                />
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div></div>
            {/* <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 uppercase tracking-wider">
              Find a Branch Near You
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our church locations across the region. We'd love to welcome you!
            </p> */}
          </motion.div>
        </div>
      </div>

      {/* Main Content - Map and List */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-300px)] min-h-[600px]">
        {/* Left Sidebar - Locations List */}
        <div className="w-full lg:w-[450px] bg-white border-r border-gray-200 flex flex-col overflow-hidden">

          <div className="p-4">
            <Button
              onClick={handleGetMyLocation}
              disabled={isLoadingLocation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              variant="default"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {isLoadingLocation ? "Getting Location..." : "Find Near Me"}
            </Button>
          </div>

          {/* Locations List */}
          <div className="flex-1 overflow-y-auto">
            {sortedLocations.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>No locations found matching your search.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {sortedLocations.map((location) => {
                  const distance = userLocation
                    ? calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        location.position.lat,
                        location.position.lng
                      )
                    : null

                  return (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedLocation?.id === location.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
                      }`}
                      onClick={() => handleLocationClick(location)}
                    >
                      <div className="flex items-start gap-3">
                        {/* <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" /> */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                          {distance !== null && (
                            <p className="text-xs text-blue-600 font-medium mb-2">
                              {distance.toFixed(1)} km away
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{location.phone}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{location.hours}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="flex-1 relative">
          {loadError && (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="text-center p-8">
                <p className="text-red-600 mb-2">Error loading Google Maps</p>
                <p className="text-sm text-gray-600">
                  Please check your API key configuration
                </p>
              </div>
            </div>
          )}
          {!isLoaded && !loadError && (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={selectedLocation?.position || defaultCenter}
              zoom={selectedLocation ? 15 : 7}
              onLoad={onMapLoad}
              onUnmount={onMapUnmount}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
              {/* Markers for all locations */}
              {churchLocations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.position}
                  onClick={() => setSelectedLocation(location)}
                  title={location.name}
                />
              ))}

              {/* User location marker */}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                  }}
                  title="Your Location"
                />
              )}

              {/* Info Window for selected location */}
              {selectedLocation && (
                <InfoWindow
                  position={selectedLocation.position}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div className="p-0 max-w-xs">

                  {/* <X className="absolute top-2 right-2" /> */}
                    {selectedLocation.images && selectedLocation.images.length > 0 && (
                      <div className="flex gap-1">
                        {selectedLocation.images.slice(0, 2).map((image, index) => (
                          <div key={index} className="relative flex-1 h-32">
                            <Image
                              src={image}
                              alt={`${selectedLocation.name} - Image ${index + 1}`}
                              fill
                              className="object-cover rounded-lg"
                              sizes="(max-width: 320px) 50vw, 160px"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800">{selectedLocation.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{selectedLocation.address}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">{selectedLocation.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">{selectedLocation.hours}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">{selectedLocation.description}</p>

                      {selectedLocation && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(getDirectionsUrl(selectedLocation), "_blank")
                          }}
                          size="sm"
                          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                          variant="default"
                        >
                          <ExternalLink className="w-3 h-3 mr-1 inline" />
                          Get Directions
                        </Button>
                      )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </section>
  )
}

