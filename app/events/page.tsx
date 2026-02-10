"use client"

import React, { useState } from "react"
import { IoSearch } from "react-icons/io5"
import { events } from "../dummyData"
import Link from "next/link"
import { FaLocationDot, FaVideo } from "react-icons/fa6"
import PriceFilter from "../components/PriceFilter"
import DateFilter from "../components/DateFilter"
import LocationFilter from "../components/LocationFilter"
import { IoCalendarOutline, IoWalletOutline } from "react-icons/io5"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openPrice, setOpenPrice] = useState(false)
  const [openDate, setOpenDate] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(undefined)
  const [selectedLocation, setSelectedLocation] = useState<string>("all")

  const categories = ["All", "Music", "Religion", "Seminar", "Comedy", "Sports", "Business"]

  const eventTypes = [
    { id: "all", name: "All Events", icon: null },
    { id: "physical", name: "Physical Events", icon: FaLocationDot },
    { id: "virtual", name: "Virtual Events", icon: FaVideo },
  ]

  // Filter events based on all criteria
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    const matchesPrice = event.priceFrom >= priceRange[0] && event.priceFrom <= priceRange[1]
    const matchesType = selectedType === "all" || 
                       (selectedType === "physical" && event.location.toLowerCase() !== "online") ||
                       (selectedType === "virtual" && event.location.toLowerCase() === "online")
    const matchesLocation = selectedLocation === "all" || event.location.toLowerCase().includes(selectedLocation.toLowerCase())
    
    // Date filtering logic
    let matchesDate = true
    if (dateFilter !== "all") {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const eventDate = new Date(event.date)
      
      if (dateFilter === "today") {
        matchesDate = eventDate.toDateString() === today.toDateString()
      } else if (dateFilter === "tomorrow") {
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        matchesDate = eventDate.toDateString() === tomorrow.toDateString()
      } else if (dateFilter === "this-week") {
        const weekEnd = new Date(today)
        weekEnd.setDate(today.getDate() + 7)
        matchesDate = eventDate >= today && eventDate <= weekEnd
      } else if (dateFilter === "this-weekend") {
        const saturday = new Date(today)
        saturday.setDate(today.getDate() + (6 - today.getDay()))
        const sunday = new Date(saturday)
        sunday.setDate(saturday.getDate() + 1)
        matchesDate = eventDate.toDateString() === saturday.toDateString() || 
                     eventDate.toDateString() === sunday.toDateString()
      } else if (dateFilter === "this-month") {
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        matchesDate = eventDate >= today && eventDate <= monthEnd
      } else if (dateFilter === "custom" && customDateRange?.from) {
        const from = new Date(customDateRange.from)
        from.setHours(0, 0, 0, 0)
        if (customDateRange.to) {
          const to = new Date(customDateRange.to)
          to.setHours(23, 59, 59, 999)
          matchesDate = eventDate >= from && eventDate <= to
        } else {
          matchesDate = eventDate.toDateString() === from.toDateString()
        }
      }
    }
    
    return matchesCategory && matchesPrice && matchesType && matchesLocation && matchesDate
  })

  const handlePriceApply = (newPrice: [number, number]) => {
    setPriceRange(newPrice)
    setOpenPrice(false)
  }

  const handleDateApply = (filter: string, dateRange?: DateRange) => {
    setDateFilter(filter)
    setCustomDateRange(dateRange)
    setOpenDate(false)
  }

  const handleLocationApply = (location: string) => {
    setSelectedLocation(location)
    setOpenLocation(false)
  }

  const clearAllFilters = () => {
    setSelectedCategory("All")
    setPriceRange([0, 500000])
    setDateFilter("all")
    setCustomDateRange(undefined)
    setSelectedType("all")
    setSelectedLocation("all")
  }

  const hasActiveFilters = selectedCategory !== "All" || 
                          priceRange[0] !== 0 || 
                          priceRange[1] !== 500000 || 
                          dateFilter !== "all" || 
                          selectedType !== "all" ||
                          selectedLocation !== "all"

  const getDateFilterLabel = () => {
    if (dateFilter === "all") return "Date"
    if (dateFilter === "today") return "Today"
    if (dateFilter === "tomorrow") return "Tomorrow"
    if (dateFilter === "this-week") return "This Week"
    if (dateFilter === "this-weekend") return "This Weekend"
    if (dateFilter === "this-month") return "This Month"
    if (dateFilter === "custom" && customDateRange?.from) {
      if (customDateRange.to) {
        return `${format(customDateRange.from, "MMM dd")} - ${format(customDateRange.to, "MMM dd")}`
      }
      return format(customDateRange.from, "MMM dd, yyyy")
    }
    return "Date"
  }

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-bold mb-4">
            Discover Events For All The Things You Love
          </h1>
          <p className="text-gray-600 text-lg">
            Find and book amazing experiences happening around you
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {/* Price Filter */}
            <button
              onClick={() => setOpenPrice(true)}
              className={`flex items-center gap-2 px-5 py-3 border-2 rounded-xl font-medium transition ${
                priceRange[0] !== 0 || priceRange[1] !== 500000
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <IoWalletOutline className="text-lg" />
              {priceRange[0] === 0 && priceRange[1] === 500000 
                ? "Price" 
                : `₦${priceRange[0].toLocaleString()} - ₦${priceRange[1].toLocaleString()}`
              }
            </button>

            {/* Date Filter */}
            <button
              onClick={() => setOpenDate(true)}
              className={`flex items-center gap-2 px-5 py-3 border-2 rounded-xl font-medium transition ${
                dateFilter !== "all"
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <IoCalendarOutline className="text-lg" />
              {getDateFilterLabel()}
            </button>

            {/* Location Filter */}
            <button
              onClick={() => setOpenLocation(true)}
              className={`flex items-center gap-2 px-5 py-3 border-2 rounded-xl font-medium transition ${
                selectedLocation !== "all"
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              <FaLocationDot className="text-lg" />
              {selectedLocation === "all" ? "Location" : selectedLocation}
            </button>

            {/* Event Type */}
            {eventTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-2 px-5 py-3 border-2 rounded-xl font-medium transition ${
                    selectedType === type.id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {Icon && <Icon className="text-lg" />}
                  {type.name}
                </button>
              )
            })}

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-5 py-3 border-2 border-red-200 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-sm cursor-pointer font-medium transition rounded-xl ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 font-medium mb-6">
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
        </p>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <span className="text-xs px-4 py-2 rounded-[30px] bg-gray-100 border-[1px] border-gray-200 font-semibold text-gray-500">
                    {event.category}
                  </span>

                  <h2 className="text-lg font-bold mt-2 line-clamp-2">
                    {event.title}
                  </h2>

                  <p className="text-sm sm:text-[16px] text-gray-500 mt-2">
                    📅 {event.date}
                  </p>

                  <p className="text-sm sm:text-[16px] mt-1 text-gray-500 line-clamp-1">
                    📍 {event.location}
                  </p>

                  <p className="mt-2 font-semibold text-base">
                    From ₦{event.priceFrom.toLocaleString()}
                  </p>

                  <Link 
                    href={`/events/${event.id}`}
                    className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-black transition block text-center"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <IoSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <PriceFilter 
        open={openPrice} 
        close={setOpenPrice}
        initialPrice={priceRange}
        onApply={handlePriceApply}
      />
      <DateFilter 
        open={openDate} 
        close={setOpenDate}
        onApply={handleDateApply}
      />
      <LocationFilter 
        open={openLocation} 
        close={setOpenLocation}
        onApply={handleLocationApply}
      />
    </div>
  )
}

export default Page