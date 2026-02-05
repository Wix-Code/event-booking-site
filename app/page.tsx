"use client"

import React, { useState } from "react";
import { events } from "./dummyData";
import { IoSearch } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import HeroPage from "./components/HeroPage";

const Page = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Music", "Religion", "Seminar", "Comedy"];
  
  // Quick search suggestions
  const quickSearches = ["Music", "Religion", "Seminar", "Comedy"];

  // Auto-filter events based on query and category
  const filteredEvents = events.filter((event) => {
    const matchesQuery = event.title.toLowerCase().includes(query.toLowerCase()) ||
                        event.location.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen mb-10 bg-white">
      <HeroPage />
      <div className="max-w-[1200px] mx-auto">
        {/* Search Section */}
        <div className="flex md:mx-0 mx-5 flex-col lg:flex-row justify-between gap-4 items-start lg:items-center mb-8">
          {/* Search Bar */}
          <div className="w-full lg:flex-1">
            <div className="w-full flex justify-between items-center h-[54px] border-gray-200 rounded-[30px] p-1 border-[1px] bg-gray-50">
              <div className="flex justify-between items-center flex-1 px-2">
                <IoSearch className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="outline-0 bg-transparent w-full h-full text-sm sm:text-base"
                  placeholder="Search events..."
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <LiaTimesSolid className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button className="px-6 sm:px-10 bg-black text-white font-medium h-full rounded-[30px] text-sm sm:text-base whitespace-nowrap">
                Search
              </button>
            </div>
          </div>

          {/* Quick Search Buttons */}
          <div className="w-full lg:flex-1">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-start lg:justify-end">
              {quickSearches.map((searchTerm) => (
                <button
                  key={searchTerm}
                  onClick={() => setQuery(searchTerm)}
                  className="px-6 h-[50px] cursor-pointer rounded-[30px] text-sm font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {searchTerm}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:mx-0 mx-5 sm:text-4xl lg:text-[50px] font-bold mb-6">
          Discover Events in Naija
        </h1>

        {/* Results Count */}
        <p className="text-gray-600 md:mx-0 mx-5 mb-4">
          Trending events in Nigeria
        </p>

        {/* Events Grid */}
        <div className="grid md:mx-0 mx-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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

                <button className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-black transition">
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;