"use client"

import React from 'react'
import { IoBookmarkOutline, IoCalendarOutline, IoLocationOutline, IoTrashOutline } from 'react-icons/io5'

const BookmarksPage = () => {
  const bookmarkedEvents = [
    {
      id: 1,
      name: 'Tech Conference 2026',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      date: 'Apr 20, 2026',
      location: 'Lagos, Nigeria',
      price: 15000,
      category: 'Technology'
    },
    {
      id: 2,
      name: 'Comedy Night Live',
      image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=300&fit=crop',
      date: 'Mar 28, 2026',
      location: 'Abuja, Nigeria',
      price: 5000,
      category: 'Comedy'
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Bookmarked Events</h1>
        <p className='text-gray-600'>Events you've saved for later</p>
      </div>

      {/* Bookmarked Events */}
      {bookmarkedEvents.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {bookmarkedEvents.map((event) => (
            <div key={event.id} className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group'>
              <div className='relative h-48'>
                <img
                  src={event.image}
                  alt={event.name}
                  className='w-full h-full object-cover'
                />
                <button className='absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition'>
                  <IoTrashOutline className='text-red-600' />
                </button>
              </div>

              <div className='p-5'>
                <span className='inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 mb-3'>
                  {event.category}
                </span>

                <h3 className='text-lg font-bold text-gray-900 mb-3'>{event.name}</h3>

                <div className='space-y-2 text-sm text-gray-600 mb-4'>
                  <div className='flex items-center gap-2'>
                    <IoCalendarOutline />
                    <span>{event.date}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <IoLocationOutline />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <p className='font-bold text-gray-900'>From ₦{event.price.toLocaleString()}</p>
                  <button className='px-4 py-2 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm'>
                    View Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
          <IoBookmarkOutline className='text-6xl text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>No bookmarked events</h3>
          <p className='text-gray-600 mb-6'>Save events you're interested in to find them easily later</p>
          <a href='/events' className='inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'>
            Browse Events
          </a>
        </div>
      )}
    </div>
  )
}

export default BookmarksPage