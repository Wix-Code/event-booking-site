"use client"

import React, { useState } from 'react'
import { 
  IoPeopleOutline, 
  IoSearchOutline, 
  IoFilterOutline,
  IoDownloadOutline,
  IoMailOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoQrCodeOutline,
  IoEllipsisVertical
} from 'react-icons/io5'

const AttendeesPage = () => {
  const [selectedEvent, setSelectedEvent] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Organizer's events
  const organizerEvents = [
    { id: 1, name: 'Campus Connect 2.0', date: 'Feb 13, 2026', totalAttendees: 145 },
    { id: 2, name: 'Tech Summit Africa', date: 'Mar 20, 2026', totalAttendees: 89 },
    { id: 3, name: 'Music Festival Lagos', date: 'Jan 15, 2026', totalAttendees: 500 },
    { id: 4, name: 'Comedy Night Live', date: 'Apr 5, 2026', totalAttendees: 67 }
  ]

  // All attendees from all events
  const allAttendees = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+234 123 456 7890',
      eventId: 1,
      eventName: 'Campus Connect 2.0',
      ticketType: 'VIP',
      quantity: 2,
      checkInStatus: 'checked-in',
      purchaseDate: 'Jan 20, 2026',
      orderNumber: 'TKT-2026-001',
      amount: 21000
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+234 098 765 4321',
      eventId: 1,
      eventName: 'Campus Connect 2.0',
      ticketType: 'Regular',
      quantity: 1,
      checkInStatus: 'not-checked-in',
      purchaseDate: 'Jan 22, 2026',
      orderNumber: 'TKT-2026-002',
      amount: 10000
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+234 111 222 3333',
      eventId: 2,
      eventName: 'Tech Summit Africa',
      ticketType: 'VIP Pass',
      quantity: 1,
      checkInStatus: 'checked-in',
      purchaseDate: 'Feb 1, 2026',
      orderNumber: 'TKT-2026-003',
      amount: 25000
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '+234 444 555 6666',
      eventId: 2,
      eventName: 'Tech Summit Africa',
      ticketType: 'Regular',
      quantity: 3,
      checkInStatus: 'not-checked-in',
      purchaseDate: 'Feb 3, 2026',
      orderNumber: 'TKT-2026-004',
      amount: 45000
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+234 777 888 9999',
      eventId: 3,
      eventName: 'Music Festival Lagos',
      ticketType: 'Early Bird',
      quantity: 2,
      checkInStatus: 'checked-in',
      purchaseDate: 'Dec 15, 2025',
      orderNumber: 'TKT-2025-089',
      amount: 30000
    },
    {
      id: 6,
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '+234 222 333 4444',
      eventId: 4,
      eventName: 'Comedy Night Live',
      ticketType: 'VIP',
      quantity: 1,
      checkInStatus: 'not-checked-in',
      purchaseDate: 'Feb 5, 2026',
      orderNumber: 'TKT-2026-005',
      amount: 15000
    }
  ]

  // Filter attendees based on selected event, search query, and status
  const filteredAttendees = allAttendees.filter(attendee => {
    const matchesEvent = selectedEvent === 'all' || attendee.eventId === parseInt(selectedEvent)
    const matchesSearch = attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         attendee.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || attendee.checkInStatus === selectedStatus
    
    return matchesEvent && matchesSearch && matchesStatus
  })

  // Calculate stats based on filtered attendees
  const totalAttendees = filteredAttendees.length
  const checkedIn = filteredAttendees.filter(a => a.checkInStatus === 'checked-in').length
  const notCheckedIn = filteredAttendees.filter(a => a.checkInStatus === 'not-checked-in').length
  const totalRevenue = filteredAttendees.reduce((sum, a) => sum + a.amount, 0)

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Attendees Management</h1>
        <p className='text-gray-600'>View and manage all attendees across your events</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Attendees</p>
              <p className='text-3xl font-bold text-gray-900'>{totalAttendees}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoPeopleOutline className='text-2xl text-gray-700' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Checked In</p>
              <p className='text-3xl font-bold text-green-600'>{checkedIn}</p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <IoCheckmarkCircle className='text-2xl text-green-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Not Checked In</p>
              <p className='text-3xl font-bold text-gray-900'>{notCheckedIn}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoCloseCircle className='text-2xl text-gray-700' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Revenue</p>
              <p className='text-3xl font-bold text-gray-900'>₦{totalRevenue.toLocaleString()}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <span className='text-2xl font-bold text-gray-700'>₦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Event Filter */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Filter by Event
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
            >
              <option value='all'>All Events ({allAttendees.length} attendees)</option>
              {organizerEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name} ({allAttendees.filter(a => a.eventId === event.id).length} attendees)
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Search Attendees
            </label>
            <div className='relative'>
              <IoSearchOutline className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search by name, email, or order number...'
                className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Check-in Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
            >
              <option value='all'>All Status</option>
              <option value='checked-in'>Checked In</option>
              <option value='not-checked-in'>Not Checked In</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200'>
          <button className='flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm'>
            <IoDownloadOutline className='text-lg' />
            Export to CSV
          </button>
          <button className='flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
            <IoMailOutline className='text-lg' />
            Email All Attendees
          </button>
          <button className='flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
            <IoQrCodeOutline className='text-lg' />
            Generate QR Codes
          </button>
        </div>
      </div>

      {/* Attendees Table */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Attendee
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Event
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Ticket Type
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Quantity
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Amount
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredAttendees.length > 0 ? (
                filteredAttendees.map((attendee) => (
                  <tr key={attendee.id} className='hover:bg-gray-50 transition'>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='font-medium text-gray-900'>{attendee.name}</p>
                        <p className='text-sm text-gray-600'>{attendee.email}</p>
                        <p className='text-sm text-gray-600'>{attendee.phone}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='font-medium text-gray-900'>{attendee.eventName}</p>
                      <p className='text-xs text-gray-600'>{attendee.orderNumber}</p>
                    </td>
                    <td className='px-6 py-4'>
                      <span className='px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700'>
                        {attendee.ticketType}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='font-medium text-gray-900'>{attendee.quantity}</p>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='font-bold text-gray-900'>₦{attendee.amount.toLocaleString()}</p>
                      <p className='text-xs text-gray-600'>{attendee.purchaseDate}</p>
                    </td>
                    <td className='px-6 py-4'>
                      {attendee.checkInStatus === 'checked-in' ? (
                        <span className='inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold'>
                          <IoCheckmarkCircle />
                          Checked In
                        </span>
                      ) : (
                        <span className='inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold'>
                          <IoCloseCircle />
                          Not Checked In
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-2'>
                        <button className='p-2 hover:bg-gray-100 rounded-lg transition'>
                          <IoMailOutline className='text-xl text-gray-600' />
                        </button>
                        <button className='p-2 hover:bg-gray-100 rounded-lg transition'>
                          <IoQrCodeOutline className='text-xl text-gray-600' />
                        </button>
                        <button className='p-2 hover:bg-gray-100 rounded-lg transition'>
                          <IoEllipsisVertical className='text-xl text-gray-600' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className='px-6 py-12 text-center'>
                    <IoPeopleOutline className='text-6xl text-gray-300 mx-auto mb-4' />
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>No attendees found</h3>
                    <p className='text-gray-600'>
                      {searchQuery || selectedEvent !== 'all' || selectedStatus !== 'all'
                        ? 'Try adjusting your filters or search query'
                        : 'No attendees registered yet'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredAttendees.length > 0 && (
          <div className='px-6 py-4 border-t border-gray-200 flex items-center justify-between'>
            <p className='text-sm text-gray-600'>
              Showing {filteredAttendees.length} of {allAttendees.length} attendees
            </p>
            <div className='flex gap-2'>
              <button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
                Previous
              </button>
              <button className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm'>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AttendeesPage