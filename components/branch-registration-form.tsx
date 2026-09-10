"use client"

import { useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { MapPin, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "400px",
  borderRadius: "0.5rem",
}

const defaultCenter = {
  lat: 7.9465, // Center of Ghana
  lng: -1.0232,
}

export function BranchRegistrationForm() {
  const router = useRouter()
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [branchName, setBranchName] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onMapUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      })
    }
  }

  const handleGetMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setSelectedLocation(location)
          if (map) {
            map.panTo(location)
            map.setZoom(15)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          toast.error("Could not get your location. Please drop a pin manually.")
        }
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!branchName.trim()) {
      toast.error("Please enter a branch name")
      return
    }

    if (!selectedLocation) {
      toast.error("Please select a location on the map by clicking to drop a pin")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-branch-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          branchName,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit registration")
      }

      toast.success("Branch registered successfully! Check your email.")
      setBranchName("")
      setSelectedLocation(null)
      // Optional: router.push("/")
    } catch (error: any) {
      toast.error(error.message || "An error occurred while submitting.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-black mb-2 text-gray-900 uppercase">Register New Branch</h2>
        <p className="text-gray-600">Enter the branch name and drop a pin on the map to mark its location.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Left Side - Form Details */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="space-y-2">
            <Label htmlFor="branchName" className="text-base font-semibold">
              Branch Name
            </Label>
            <Input
              id="branchName"
              placeholder="e.g. Love Economy Church - North"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base font-semibold">Selected Coordinates</Label>
            {selectedLocation ? (
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-md text-sm text-blue-800 font-mono">
                Lat: {selectedLocation.lat.toFixed(6)}
                <br />
                Lng: {selectedLocation.lng.toFixed(6)}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500 italic">
                No location selected yet. Click on the map to drop a pin.
              </div>
            )}
          </div>

          <div className="pt-4 mt-auto">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Registration
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="w-full lg:w-2/3 h-[500px] lg:h-[600px] relative border border-gray-200 rounded-lg overflow-hidden">
          {/* Controls overlay */}
          <div className="absolute top-4 left-4 z-10">
            <Button
              type="button"
              onClick={handleGetMyLocation}
              className="bg-white text-gray-800 hover:bg-gray-50 shadow-md"
              variant="outline"
              size="sm"
            >
              <MapPin className="w-4 h-4 mr-2 text-blue-600" />
              Use My Location
            </Button>
          </div>

          {loadError && (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center p-8">
                <p className="text-red-600 mb-2 font-semibold">Error loading Google Maps</p>
                <p className="text-sm text-gray-600">Please check your API key configuration.</p>
              </div>
            </div>
          )}
          
          {!isLoaded && !loadError && (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={selectedLocation || defaultCenter}
              zoom={selectedLocation ? 15 : 7}
              onLoad={onMapLoad}
              onUnmount={onMapUnmount}
              onClick={handleMapClick}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                clickableIcons: false, // Prevents clicking on random POIs
                cursor: "crosshair", // Suggests clicking is allowed
              }}
            >
              {selectedLocation && (
                <Marker
                  position={selectedLocation}
                  animation={google.maps.Animation.DROP}
                />
              )}
            </GoogleMap>
          )}
        </div>
      </form>
    </div>
  )
}
