import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from "react"
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5"
import { FaMapMarkerAlt } from "react-icons/fa"

type Props = {
  open: boolean
  close: (value: boolean) => void
  onApply: (location: string) => void
}

const LocationFilter = ({ close, open, onApply }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const popularLocations = [
    { id: "lagos", name: "Lagos", icon: "🏙️", count: 450 },
    { id: "abuja", name: "Abuja", icon: "🏛️", count: 234 },
    { id: "port-harcourt", name: "Port Harcourt", icon: "🌊", count: 156 },
    { id: "ibadan", name: "Ibadan", icon: "🏘️", count: 89 },
    { id: "kano", name: "Kano", icon: "🕌", count: 67 },
    { id: "online", name: "Online Events", icon: "💻", count: 324 },
  ]

  const filteredLocations = popularLocations.filter((loc) =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId)
  }

  const handleApply = () => {
    onApply(selectedLocation)
  }

  const handleClear = () => {
    setSelectedLocation("all")
    setSearchQuery("")
    onApply("all")
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogTrigger asChild>
        <button className="hidden">Open</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Filter by Location
          </DialogTitle>
          <DialogDescription>
            Choose where you want to attend events.
          </DialogDescription>
        </DialogHeader>

        {/* SEARCH */}
        <div className="relative mt-4">
          <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search locations..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* ALL LOCATIONS */}
        <button
          onClick={() => handleLocationSelect("all")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition mt-4 ${
            selectedLocation === "all"
              ? "border-black bg-black text-white"
              : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
          }`}
        >
          <span className="text-2xl">🌍</span>
          <div className="text-left flex-1">
            <p className="font-semibold">All Locations</p>
            <p className="text-sm opacity-70">See events everywhere</p>
          </div>
        </button>

        {/* POPULAR LOCATIONS */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Locations</h3>
          <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto">
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition ${
                  selectedLocation === location.id
                    ? "border-black bg-black text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">{location.icon}</span>
                <div className="text-left">
                  <p className="font-semibold">{location.name}</p>
                  <p className="text-xs opacity-70">{location.count} events</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-8">
            <IoLocationOutline className="text-5xl text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No locations found</p>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-between mt-6">
          <button
            className="text-[16px] font-medium text-gray-500 hover:text-black transition"
            onClick={handleClear}
          >
            Clear
          </button>

          <button
            onClick={handleApply}
            className="px-8 py-3 rounded-xl bg-black text-white text-[16px] font-semibold hover:bg-gray-900 transition"
          >
            Apply
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LocationFilter