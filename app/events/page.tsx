"use client"

import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { events } from "../dummyData";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Music", "Religion", "Seminar", "Comedy", "Sports", "Business"];

  // Auto-filter events based on category
  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesCategory;
  });

  // // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1
  //     }
  //   }
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut"
  //     }
  //   }
  // };

  const categoryVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: { scale: 1.05 }
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-10 px-4">
      <div className="max-w-[1200px] mx-auto">

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-[40px] font-bold mb-6"
        >
          Explore Events
        </motion.h1>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-sm cursor-pointer font-medium transition ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p 
          key={filteredEvents.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-gray-600 font-medium mb-4"
        >
          {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
        </motion.p>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div 
              key="events-grid"
              //variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  //variants={itemVariants}
                  layout
                  whileHover={{ 
                    //y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <motion.img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="p-4">
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.2 }}
                      className="text-xs px-4 py-2 rounded-[30px] bg-gray-100 border-[1px] border-gray-200 font-semibold text-gray-500"
                    >
                      {event.category}
                    </motion.span>

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

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold cursor-pointer hover:bg-black transition"
                    >
                      View Event
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="no-events"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 1, repeat: Infinity, repeatDelay: 2 }
                }}
              >
                <IoSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;