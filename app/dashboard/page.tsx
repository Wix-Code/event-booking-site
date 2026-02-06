"use client"

import React, { useState } from 'react'
import { IoTicketOutline, IoCalendarOutline, IoLocationOutline, IoDownloadOutline, IoQrCodeOutline } from 'react-icons/io5'

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming')

  const tickets = [
    {
      id: 1,
      eventName: 'Campus Connect 2.0',
      eventImage: 'https://shows.ng/su/evu/1766565553_IMG_8193.jpeg',
      date: 'Feb 13, 2026',
      time: '12:00 PM',
      location: 'Bamidele Olumilua University, Ikere-ekiti',
      ticketType: 'VIP Ticket',
      quantity: 2,
      orderNumber: 'TKT-2026-001',
      status: 'confirmed',
      totalPaid: 21000
    },
    {
      id: 2,
      eventName: 'Lagos Music Festival 2026',
      eventImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
      date: 'Mar 15, 2026',
      time: '6:00 PM',
      location: 'Eko Convention Center, Lagos',
      ticketType: 'Regular Ticket',
      quantity: 1,
      orderNumber: 'TKT-2026-002',
      status: 'confirmed',
      totalPaid: 15000
    },
    {
      id: 3,
      eventName: 'Tech Summit Africa',
      eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      date: 'Jan 20, 2026',
      time: '9:00 AM',
      location: 'Transcorp Hilton, Abuja',
      ticketType: 'VIP Pass',
      quantity: 1,
      orderNumber: 'TKT-2025-045',
      status: 'past',
      totalPaid: 25000
    }
  ]

  const upcomingTickets = tickets.filter(t => t.status === 'confirmed')
  const pastTickets = tickets.filter(t => t.status === 'past')

  const displayTickets = activeTab === 'upcoming' ? upcomingTickets : pastTickets

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Tickets</h1>
        <p className='text-gray-600'>View and manage your event tickets</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Tickets</p>
              <p className='text-3xl font-bold text-gray-900'>{tickets.length}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoTicketOutline className='text-2xl text-gray-700' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Upcoming Events</p>
              <p className='text-3xl font-bold text-gray-900'>{upcomingTickets.length}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoCalendarOutline className='text-2xl text-gray-700' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Spent</p>
              <p className='text-3xl font-bold text-gray-900'>
                ₦{tickets.reduce((sum, t) => sum + t.totalPaid, 0).toLocaleString()}
              </p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <span className='text-2xl font-bold text-gray-700'>₦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='bg-white rounded-xl shadow-sm mb-6'>
        <div className='border-b border-gray-200'>
          <div className='flex'>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-4 font-medium transition ${
                activeTab === 'upcoming'
                  ? 'border-b-2 border-black text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming ({upcomingTickets.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-4 font-medium transition ${
                activeTab === 'past'
                  ? 'border-b-2 border-black text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Events ({pastTickets.length})
            </button>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      {displayTickets.length > 0 ? (
        <div className='space-y-6'>
          {displayTickets.map((ticket) => (
            <div key={ticket.id} className='bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition'>
              <div className='flex flex-col sm:flex-row'>
                {/* Event Image */}
                <div className='sm:w-48 h-48 sm:h-auto flex-shrink-0'>
                  <img
                    src={ticket.eventImage}
                    alt={ticket.eventName}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Ticket Details */}
                <div className='flex-1 p-6'>
                  <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4'>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900 mb-2'>{ticket.eventName}</h3>
                      <div className='space-y-1 text-sm text-gray-600'>
                        <div className='flex items-center gap-2'>
                          <IoCalendarOutline className='text-gray-500' />
                          <span>{ticket.date} • {ticket.time}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <IoLocationOutline className='text-gray-500' />
                          <span>{ticket.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-4 sm:mt-0'>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status === 'confirmed' ? 'Confirmed' : 'Completed'}
                      </span>
                    </div>
                  </div>

                  <div className='flex flex-wrap items-center gap-4 text-sm border-t border-gray-100 pt-4'>
                    <div>
                      <span className='text-gray-600'>Ticket Type: </span>
                      <span className='font-medium text-gray-900'>{ticket.ticketType}</span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Quantity: </span>
                      <span className='font-medium text-gray-900'>{ticket.quantity}</span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Order #: </span>
                      <span className='font-medium text-gray-900'>{ticket.orderNumber}</span>
                    </div>
                    <div>
                      <span className='text-gray-600'>Total: </span>
                      <span className='font-bold text-gray-900'>₦{ticket.totalPaid.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {ticket.status === 'confirmed' && (
                    <div className='flex flex-wrap gap-3 mt-4'>
                      <button className='flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm'>
                        <IoQrCodeOutline className='text-lg' />
                        View QR Code
                      </button>
                      <button className='flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
                        <IoDownloadOutline className='text-lg' />
                        Download Ticket
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
          <IoTicketOutline className='text-6xl text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>No {activeTab} tickets</h3>
          <p className='text-gray-600 mb-6'>
            {activeTab === 'upcoming' 
              ? "You don't have any upcoming events. Start exploring!"
              : "You haven't attended any events yet."}
          </p>
          <a href='/events' className='inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'>
            Browse Events
          </a>
        </div>
      )}
    </div>
  )
}

export default MainPage