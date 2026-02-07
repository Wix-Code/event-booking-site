"use client"

import React, { useState } from 'react'
import { 
  IoCalendarOutline, 
  IoSearchOutline,
  IoAddCircleOutline,
  IoEyeOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCopyOutline,
  IoShareSocialOutline,
  IoEllipsisVertical,
  IoTicketOutline,
  IoPeopleOutline,
  IoLocationOutline,
  IoTimeOutline
} from 'react-icons/io5'
import Link from 'next/link'

const MyEventsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMenu, setShowMenu] = useState<number | null>(null)

  const events = [
    {
      id: 1,
      name: 'Campus Connect 2.0',
      image: 'https://shows.ng/su/evu/1766565553_IMG_8193.jpeg',
      date: 'Feb 13, 2026',
      time: '12:00 PM',
      location: 'Bamidele Olumilua University, Ikere-ekiti',
      status: 'upcoming',
      category: 'Seminar',
      ticketsSold: 145,
      totalTickets: 200,
      revenue: 725000,
      views: 1234,
      attendees: 145,
      createdDate: 'Jan 15, 2026'
    },
    {
      id: 2,
      name: 'Tech Summit Africa',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      date: 'Mar 20, 2026',
      time: '9:00 AM',
      location: 'Transcorp Hilton, Abuja',
      status: 'upcoming',
      category: 'Business',
      ticketsSold: 89,
      totalTickets: 150,
      revenue: 890000,
      views: 2456,
      attendees: 89,
      createdDate: 'Jan 20, 2026'
    },
    {
      id: 3,
      name: 'Music Festival Lagos',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
      date: 'Jan 15, 2026',
      time: '6:00 PM',
      location: 'Eko Convention Center, Lagos',
      status: 'past',
      category: 'Music',
      ticketsSold: 500,
      totalTickets: 500,
      revenue: 2500000,
      views: 5678,
      attendees: 500,
      createdDate: 'Nov 10, 2025'
    },
    {
      id: 4,
      name: 'Comedy Night Live',
      image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=300&fit=crop',
      date: 'Apr 5, 2026',
      time: '8:00 PM',
      location: 'Terra Kulture, Lagos',
      status: 'draft',
      category: 'Comedy',
      ticketsSold: 0,
      totalTickets: 200,
      revenue: 0,
      views: 0,
      attendees: 0,
      createdDate: 'Feb 1, 2026'
    },
    {
      id: 5,
      name: 'Business Workshop Series',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop',
      date: 'May 10, 2026',
      time: '10:00 AM',
      location: 'Online Event',
      status: 'upcoming',
      category: 'Business',
      ticketsSold: 67,
      totalTickets: 100,
      revenue: 335000,
      views: 890,
      attendees: 67,
      createdDate: 'Jan 28, 2026'
    }
  ]

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesTab = activeTab === 'all' || event.status === activeTab
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const upcomingEvents = events.filter(e => e.status === 'upcoming')
  const pastEvents = events.filter(e => e.status === 'past')
  const draftEvents = events.filter(e => e.status === 'draft')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'past':
        return 'bg-gray-100 text-gray-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Events</h1>
            <p className='text-gray-600'>Create and manage your events</p>
          </div>
          <Link href='/organizer/create'>
            <button className='flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'>
              <IoAddCircleOutline className='text-xl' />
              Create New Event
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Events</p>
              <p className='text-3xl font-bold text-gray-900'>{events.length}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoCalendarOutline className='text-2xl text-gray-700' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Upcoming</p>
              <p className='text-3xl font-bold text-blue-600'>{upcomingEvents.length}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <IoCalendarOutline className='text-2xl text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Drafts</p>
              <p className='text-3xl font-bold text-yellow-600'>{draftEvents.length}</p>
            </div>
            <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center'>
              <IoCreateOutline className='text-2xl text-yellow-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Past Events</p>
              <p className='text-3xl font-bold text-gray-900'>{pastEvents.length}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoCalendarOutline className='text-2xl text-gray-700' />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className='bg-white rounded-xl shadow-sm mb-6'>
        {/* Search Bar */}
        <div className='p-6 border-b border-gray-200'>
          <div className='relative'>
            <IoSearchOutline className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search events by name, location, or category...'
              className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
            />
          </div>
        </div>

        {/* Tabs */}
        <div className='flex overflow-x-auto'>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-4 font-medium transition whitespace-nowrap ${
              activeTab === 'all'
                ? 'border-b-2 border-black text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-4 font-medium transition whitespace-nowrap ${
              activeTab === 'upcoming'
                ? 'border-b-2 border-black text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('draft')}
            className={`px-6 py-4 font-medium transition whitespace-nowrap ${
              activeTab === 'draft'
                ? 'border-b-2 border-black text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Drafts ({draftEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-4 font-medium transition whitespace-nowrap ${
              activeTab === 'past'
                ? 'border-b-2 border-black text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Past Events ({pastEvents.length})
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filteredEvents.map((event) => (
            <div key={event.id} className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition group'>
              {/* Event Image */}
              <div className='relative h-48'>
                <img
                  src={event.image}
                  alt={event.name}
                  className='w-full h-full object-cover'
                />
                <div className='absolute top-3 left-3'>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <div className='absolute top-3 right-3'>
                  <button 
                    onClick={() => setShowMenu(showMenu === event.id ? null : event.id)}
                    className='w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition'
                  >
                    <IoEllipsisVertical className='text-gray-700' />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showMenu === event.id && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10'>
                      <button className='w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700'>
                        <IoEyeOutline />
                        View Event
                      </button>
                      <button className='w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700'>
                        <IoCreateOutline />
                        Edit Event
                      </button>
                      <button className='w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700'>
                        <IoCopyOutline />
                        Duplicate Event
                      </button>
                      <button className='w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700'>
                        <IoShareSocialOutline />
                        Share Event
                      </button>
                      <hr className='my-2' />
                      <button className='w-full text-left px-4 py-2 hover:bg-red-50 flex items-center gap-2 text-sm text-red-600'>
                        <IoTrashOutline />
                        Delete Event
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div className='p-5'>
                <div className='mb-3'>
                  <span className='inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 mb-2'>
                    {event.category}
                  </span>
                  <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2'>{event.name}</h3>
                </div>

                <div className='space-y-2 text-sm text-gray-600 mb-4'>
                  <div className='flex items-center gap-2'>
                    <IoCalendarOutline className='text-gray-500' />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <IoLocationOutline className='text-gray-500' />
                    <span className='line-clamp-1'>{event.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100'>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Sold</p>
                    <p className='font-bold text-gray-900'>{event.ticketsSold}/{event.totalTickets}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Revenue</p>
                    <p className='font-bold text-gray-900'>₦{(event.revenue / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Views</p>
                    <p className='font-bold text-gray-900'>{event.views}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {event.status !== 'draft' && (
                  <div className='mb-4'>
                    <div className='flex justify-between text-xs text-gray-600 mb-1'>
                      <span>Ticket Sales</span>
                      <span>{Math.round((event.ticketsSold / event.totalTickets) * 100)}%</span>
                    </div>
                    <div className='w-full h-2 bg-gray-200 rounded-full'>
                      <div 
                        className='h-full bg-black rounded-full'
                        style={{ width: `${(event.ticketsSold / event.totalTickets) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className='flex gap-2'>
                  {event.status === 'draft' ? (
                    <>
                      <button className='flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm'>
                        Continue Editing
                      </button>
                      <button className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
                        Publish
                      </button>
                    </>
                  ) : (
                    <>
                      <button className='flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm'>
                        View Details
                      </button>
                      <button className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
          <IoCalendarOutline className='text-6xl text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>
            {searchQuery ? 'No events found' : `No ${activeTab} events`}
          </h3>
          <p className='text-gray-600 mb-6'>
            {searchQuery 
              ? 'Try adjusting your search query'
              : activeTab === 'all' 
                ? "You haven't created any events yet"
                : `You don't have any ${activeTab} events`}
          </p>
          {!searchQuery && (
            <Link href='/organizer/create'>
              <button className='inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'>
                <IoAddCircleOutline className='text-xl' />
                Create Your First Event
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default MyEventsPage