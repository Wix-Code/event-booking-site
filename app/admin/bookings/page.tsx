"use client"

import React, { useState } from 'react'
import {
  IoSearchOutline,
  IoTicketOutline,
  IoDownloadOutline,
  IoEyeOutline
} from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AdminBookingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const bookings = [
    {
      id: 1,
      orderNumber: 'TKT-2026-001',
      eventName: 'Campus Connect 2.0',
      organizer: 'John Events Ltd',
      buyerName: 'John Doe',
      buyerEmail: 'john.doe@example.com',
      tickets: 2,
      amount: 21000,
      platformFee: 1050,
      status: 'completed',
      paymentMethod: 'card',
      date: '2026-01-20'
    },
    {
      id: 2,
      orderNumber: 'TKT-2026-002',
      eventName: 'Tech Summit Africa',
      organizer: 'Sarah Events',
      buyerName: 'Jane Smith',
      buyerEmail: 'jane@example.com',
      tickets: 1,
      amount: 26000,
      platformFee: 1300,
      status: 'completed',
      paymentMethod: 'bank_transfer',
      date: '2026-02-01'
    },
    {
      id: 3,
      orderNumber: 'TKT-2026-003',
      eventName: 'Music Festival',
      organizer: 'Music Productions',
      buyerName: 'Mike Johnson',
      buyerEmail: 'mike@example.com',
      tickets: 3,
      amount: 46500,
      platformFee: 2325,
      status: 'pending',
      paymentMethod: 'card',
      date: '2026-02-05'
    },
    {
      id: 4,
      orderNumber: 'TKT-2026-004',
      eventName: 'Business Workshop',
      organizer: 'Mike Seminars',
      buyerName: 'Sarah Williams',
      buyerEmail: 'sarah@example.com',
      tickets: 1,
      amount: 15000,
      platformFee: 750,
      status: 'refunded',
      paymentMethod: 'card',
      date: '2026-02-03'
    }
  ]

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.buyerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0)
  const totalFees = bookings.reduce((sum, b) => sum + b.platformFee, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'refunded':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Bookings Management</h1>
        <p className='text-gray-600'>Monitor all ticket bookings and transactions</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Bookings</p>
          <p className='text-3xl font-bold text-gray-900'>{bookings.length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Revenue</p>
          <p className='text-3xl font-bold text-gray-900'>₦{totalRevenue.toLocaleString()}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Platform Fees</p>
          <p className='text-3xl font-bold text-green-600'>₦{totalFees.toLocaleString()}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Completed</p>
          <p className='text-3xl font-bold text-gray-900'>{bookings.filter(b => b.status === 'completed').length}</p>
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
                placeholder='Search bookings...'
                className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
              />
            </div>
          </div>
          <div className='sm:w-64'>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='refunded'>Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <button className='flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium whitespace-nowrap'>
            <IoDownloadOutline className='text-xl' />
            Export
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Order</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Event</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Buyer</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Tickets</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Amount</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Fee</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Status</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4'>
                    <p className='font-semibold text-gray-900'>{booking.orderNumber}</p>
                    <p className='text-xs text-gray-500'>{booking.date}</p>
                    <p className='text-xs text-gray-500 capitalize'>{booking.paymentMethod}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='font-medium text-gray-900'>{booking.eventName}</p>
                    <p className='text-sm text-gray-600'>{booking.organizer}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-900'>{booking.buyerName}</p>
                    <p className='text-sm text-gray-600'>{booking.buyerEmail}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='font-bold text-gray-900'>{booking.tickets}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='font-bold text-gray-900'>₦{booking.amount.toLocaleString()}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='font-bold text-green-600'>₦{booking.platformFee.toLocaleString()}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <button className='p-2 hover:bg-gray-100 rounded-lg'>
                      <IoEyeOutline className='text-xl text-gray-600' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingsPage