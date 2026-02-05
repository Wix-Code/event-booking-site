"use client"

import React from "react"
import { HiSparkles } from "react-icons/hi2"

const HeroPage = () => {
  return (
    <div className="relative mb-8 min-h-[60vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&q=80')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center text-white">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <HiSparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium">
              Nigeria&apos;s #1 Event Platform
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
          Discover Amazing
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Events Near You
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
          From electrifying concerts to inspiring seminars, find and book
          tickets to the hottest events happening across Nigeria.
        </p>

        <button className="px-10 py-4 cursor-pointer hover:bg-[#1f1f1f1c] hover:border-white hover:text-white hover:border-[1px] text-black font-medium mt-6 rounded-[30px] bg-white">
          Create Event
        </button>
      </div>
    </div>
  )
}

export default HeroPage