"use client"

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { events } from "../dummyData";
import Link from "next/link";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Music", "Religion", "Seminar", "Comedy", "Sports", "Business"];

  // Auto-filter events based on category
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold mb-6">
          Explore Events
        </h1>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-sm cursor-pointer font-medium transition ${
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
        <p className="text-gray-600 font-medium mb-4">
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
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;