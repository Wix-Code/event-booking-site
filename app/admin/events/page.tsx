"use client"

import React, { useState } from 'react'
import {
  IoSearchOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoEyeOutline,
  IoEllipsisVertical,
  IoCreateOutline,
  IoTrashOutline,
  IoCalendarOutline
} from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const AdminEventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject' | 'delete'>('view')
  const [rejectionReason, setRejectionReason] = useState('')

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Summit Africa 2026',
      organizer: 'John Events Ltd',
      organizerId: 1,
      category: 'Technology',
      date: 'Mar 20, 2026',
      time: '9:00 AM',
      location: 'Transcorp Hilton, Abuja',
      city: 'Abuja',
      tickets: 150,
      sold: 89,
      revenue: 890000,
      platformFee: 44500,
      status: 'approved',
      isFree: false,
      price: 10000,
      createdAt: 'Jan 20, 2026',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Music Festival Lagos',
      organizer: 'Sarah Music Ltd',
      organizerId: 2,
      category: 'Music',
      date: 'Apr 15, 2026',
      time: '6:00 PM',
      location: 'Eko Convention Center',
      city: 'Lagos',
      tickets: 500,
      sold: 0,
      revenue: 0,
      platformFee: 0,
      status: 'pending',
      isFree: false,
      price: 5000,
      createdAt: 'Feb 1, 2026',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Business Workshop Series',
      organizer: 'Mike Seminars',
      organizerId: 3,
      category: 'Business',
      date: 'Feb 28, 2026',
      time: '10:00 AM',
      location: 'Online Event',
      city: 'Online',
      tickets: 80,
      sold: 67,
      revenue: 335000,
      platformFee: 16750,
      status: 'approved',
      isFree: false,
      price: 5000,
      createdAt: 'Jan 28, 2026',
      image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Comedy Night Live',
      organizer: 'Laugh Hub',
      organizerId: 4,
      category: 'Comedy',
      date: 'Mar 5, 2026',
      time: '8:00 PM',
      location: 'Terra Kulture, Lagos',
      city: 'Lagos',
      tickets: 200,
      sold: 0,
      revenue: 0,
      platformFee: 0,
      status: 'rejected',
      isFree: false,
      price: 3000,
      createdAt: 'Feb 3, 2026',
      image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Free Coding Bootcamp',
      organizer: 'Code Academy NG',
      organizerId: 5,
      category: 'Technology',
      date: 'Mar 1, 2026',
      time: '10:00 AM',
      location: 'Online via Zoom',
      city: 'Online',
      tickets: 100,
      sold: 0,
      revenue: 0,
      platformFee: 0,
      status: 'pending',
      isFree: true,
      price: 0,
      createdAt: 'Feb 5, 2026',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop'
    }
  ])

  const categories = ['all', 'Music', 'Comedy', 'Business', 'Technology', 'Sports', 'Religion', 'Seminar', 'Workshop']

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleViewEvent = (event: any) => {
    setSelectedEvent(event)
    setModalType('view')
    setShowModal(true)
  }

  const handleApproveEvent = (event: any) => {
    setSelectedEvent(event)
    setModalType('approve')
    setShowModal(true)
  }

  const handleRejectEvent = (event: any) => {
    setSelectedEvent(event)
    setModalType('reject')
    setShowModal(true)
  }

  const handleDeleteEvent = (event: any) => {
    setSelectedEvent(event)
    setModalType('delete')
    setShowModal(true)
  }

  const confirmApprove = () => {
    setEvents(events.map(e => 
      e.id === selectedEvent.id ? { ...e, status: 'approved' } : e
    ))
    setShowModal(false)
  }

  const confirmReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection')
      return
    }
    setEvents(events.map(e => 
      e.id === selectedEvent.id ? { ...e, status: 'rejected' } : e
    ))
    setRejectionReason('')
    setShowModal(false)
  }

  const confirmDelete = () => {
    setEvents(events.filter(e => e.id !== selectedEvent.id))
    setShowModal(false)
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Events Management</h1>
        <p className='text-gray-600'>Review, approve, and manage all platform events</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Events</p>
          <p className='text-3xl font-bold text-gray-900'>{events.length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Approved</p>
          <p className='text-3xl font-bold text-green-600'>{events.filter(e => e.status === 'approved').length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Pending Review</p>
          <p className='text-3xl font-bold text-yellow-600'>{events.filter(e => e.status === 'pending').length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Rejected</p>
          <p className='text-3xl font-bold text-red-600'>{events.filter(e => e.status === 'rejected').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <div className='relative'>
              <IoSearchOutline className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl' />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search events or organizers...'
                className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
              />
            </div>
          </div>
          <div className='sm:w-48'>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className='capitalize'>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='sm:w-48'>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='approved'>Approved</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Event</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Organizer</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Date & Location</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Sales</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Status</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredEvents.map((event) => (
                <tr key={event.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <img src={event.image} alt={event.title} className='w-16 h-16 object-cover rounded-lg' />
                      <div>
                        <p className='font-semibold text-gray-900'>{event.title}</p>
                        <p className='text-sm text-gray-600'>{event.category}</p>
                        {event.isFree && (
                          <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium'>FREE</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-gray-900'>{event.organizer}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-gray-900'>{event.date}</p>
                    <p className='text-sm text-gray-600'>{event.city}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='font-bold text-gray-900'>{event.sold}/{event.tickets}</p>
                    <p className='text-sm text-gray-600'>₦{event.revenue.toLocaleString()}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <button 
                        onClick={() => handleViewEvent(event)}
                        className='p-2 hover:bg-gray-100 rounded-lg'
                      >
                        <IoEyeOutline className='text-xl text-gray-600' />
                      </button>
                      {event.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveEvent(event)}
                            className='p-2 hover:bg-green-100 rounded-lg'
                          >
                            <IoCheckmarkCircle className='text-xl text-green-600' />
                          </button>
                          <button 
                            onClick={() => handleRejectEvent(event)}
                            className='p-2 hover:bg-red-100 rounded-lg'
                          >
                            <IoCloseCircle className='text-xl text-red-600' />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleDeleteEvent(event)}
                        className='p-2 hover:bg-red-100 rounded-lg'
                      >
                        <IoTrashOutline className='text-xl text-red-600' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showModal && selectedEvent && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            
            {/* View Event Modal */}
            {modalType === 'view' && (
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>Event Details</h2>
                  <button onClick={() => setShowModal(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
                    <IoCloseCircle className='text-2xl text-gray-600' />
                  </button>
                </div>

                <img src={selectedEvent.image} alt={selectedEvent.title} className='w-full h-48 object-cover rounded-lg mb-4' />

                <div className='space-y-4'>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>{selectedEvent.title}</h3>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedEvent.status)}`}>
                      {selectedEvent.status}
                    </span>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm text-gray-600'>Organizer</p>
                      <p className='font-medium text-gray-900'>{selectedEvent.organizer}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Category</p>
                      <p className='font-medium text-gray-900'>{selectedEvent.category}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Date & Time</p>
                      <p className='font-medium text-gray-900'>{selectedEvent.date} {selectedEvent.time}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Location</p>
                      <p className='font-medium text-gray-900'>{selectedEvent.location}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Tickets</p>
                      <p className='font-medium text-gray-900'>{selectedEvent.sold}/{selectedEvent.tickets} sold</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Price</p>
                      <p className='font-medium text-gray-900'>{selectedEvent.isFree ? 'FREE' : `₦${selectedEvent.price.toLocaleString()}`}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Revenue</p>
                      <p className='font-medium text-gray-900'>₦{selectedEvent.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Platform Fee</p>
                      <p className='font-medium text-gray-900'>₦{selectedEvent.platformFee.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Approve Event Modal */}
            {modalType === 'approve' && (
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>Approve Event</h2>
                  <button onClick={() => setShowModal(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
                    <IoCloseCircle className='text-2xl text-gray-600' />
                  </button>
                </div>

                <div className='mb-6'>
                  <p className='text-gray-700 mb-4'>
                    Are you sure you want to approve <strong>{selectedEvent.title}</strong>?
                  </p>
                  <p className='text-sm text-gray-600'>
                    This event will become visible to all users and attendees can start booking tickets.
                  </p>
                </div>

                <div className='flex gap-3'>
                  <button
                    onClick={() => setShowModal(false)}
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmApprove}
                    className='flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold'
                  >
                    Approve Event
                  </button>
                </div>
              </div>
            )}

            {/* Reject Event Modal */}
            {modalType === 'reject' && (
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>Reject Event</h2>
                  <button onClick={() => setShowModal(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
                    <IoCloseCircle className='text-2xl text-gray-600' />
                  </button>
                </div>

                <div className='mb-6'>
                  <p className='text-gray-700 mb-4'>
                    Please provide a reason for rejecting <strong>{selectedEvent.title}</strong>:
                  </p>
                  <Textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={4}
                    className='resize-none'
                    placeholder='e.g., Event description violates platform policies...'
                  />
                </div>

                <div className='flex gap-3'>
                  <button
                    onClick={() => setShowModal(false)}
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmReject}
                    className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
                  >
                    Reject Event
                  </button>
                </div>
              </div>
            )}

            {/* Delete Event Modal */}
            {modalType === 'delete' && (
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>Delete Event</h2>
                  <button onClick={() => setShowModal(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
                    <IoCloseCircle className='text-2xl text-gray-600' />
                  </button>
                </div>

                <div className='mb-6'>
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
                    <p className='text-red-900 font-medium'>Warning: This action cannot be undone!</p>
                  </div>
                  <p className='text-gray-700'>
                    Are you sure you want to permanently delete <strong>{selectedEvent.title}</strong>? 
                    All associated bookings and data will be removed.
                  </p>
                </div>

                <div className='flex gap-3'>
                  <button
                    onClick={() => setShowModal(false)}
                    className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
                  >
                    Delete Permanently
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEventsPage