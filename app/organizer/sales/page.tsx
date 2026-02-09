"use client"

import React, { useState } from 'react'
import { 
  IoTicketOutline, 
  IoTrendingUpOutline,
  IoCalendarOutline,
  IoDownloadOutline,
  IoFilterOutline,
  IoPeopleOutline,
  IoWalletOutline
} from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const TicketSalesPage = () => {
  const [selectedEvent, setSelectedEvent] = useState('all')
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  })

  // Organizer's events
  const organizerEvents = [
    { id: 1, name: 'Campus Connect 2.0', date: 'Feb 13, 2026' },
    { id: 2, name: 'Tech Summit Africa', date: 'Mar 20, 2026' },
    { id: 3, name: 'Music Festival Lagos', date: 'Jan 15, 2026' },
  ]

  // Sales data
  const salesData = [
    {
      id: 1,
      orderNumber: 'TKT-2026-001',
      eventName: 'Campus Connect 2.0',
      buyerName: 'John Doe',
      buyerEmail: 'john.doe@example.com',
      ticketType: 'VIP',
      quantity: 2,
      amount: 21000,
      serviceFee: 1000,
      netAmount: 20000,
      status: 'completed',
      paymentMethod: 'card',
      purchaseDate: '2026-01-20T10:30:00',
      eventDate: '2026-02-13'
    },
    {
      id: 2,
      orderNumber: 'TKT-2026-002',
      eventName: 'Campus Connect 2.0',
      buyerName: 'Jane Smith',
      buyerEmail: 'jane.smith@example.com',
      ticketType: 'Regular',
      quantity: 1,
      amount: 10500,
      serviceFee: 500,
      netAmount: 10000,
      status: 'completed',
      paymentMethod: 'bank_transfer',
      purchaseDate: '2026-01-22T14:15:00',
      eventDate: '2026-02-13'
    },
    {
      id: 3,
      orderNumber: 'TKT-2026-003',
      eventName: 'Tech Summit Africa',
      buyerName: 'Mike Johnson',
      buyerEmail: 'mike.johnson@example.com',
      ticketType: 'VIP Pass',
      quantity: 1,
      amount: 26000,
      serviceFee: 1000,
      netAmount: 25000,
      status: 'completed',
      paymentMethod: 'card',
      purchaseDate: '2026-02-01T09:45:00',
      eventDate: '2026-03-20'
    },
    {
      id: 4,
      orderNumber: 'TKT-2026-004',
      eventName: 'Tech Summit Africa',
      buyerName: 'Sarah Williams',
      buyerEmail: 'sarah.w@example.com',
      ticketType: 'Regular',
      quantity: 3,
      amount: 46500,
      serviceFee: 1500,
      netAmount: 45000,
      status: 'pending',
      paymentMethod: 'card',
      purchaseDate: '2026-02-03T16:20:00',
      eventDate: '2026-03-20'
    },
    {
      id: 5,
      orderNumber: 'TKT-2025-089',
      eventName: 'Music Festival Lagos',
      buyerName: 'David Brown',
      buyerEmail: 'david.brown@example.com',
      ticketType: 'Early Bird',
      quantity: 2,
      amount: 31000,
      serviceFee: 1000,
      netAmount: 30000,
      status: 'refunded',
      paymentMethod: 'card',
      purchaseDate: '2025-12-15T11:30:00',
      eventDate: '2026-01-15'
    }
  ]

  // Filter sales
  const filteredSales = salesData.filter(sale => {
    if (selectedEvent !== 'all') {
      return sale.eventName === organizerEvents.find(e => e.id.toString() === selectedEvent)?.name
    }
    return true
  })

  // Calculate totals
  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.amount, 0)
  const totalTickets = filteredSales.reduce((sum, sale) => sum + sale.quantity, 0)
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.netAmount, 0)
  const totalFees = filteredSales.reduce((sum, sale) => sum + sale.serviceFee, 0)
  const completedSales = filteredSales.filter(s => s.status === 'completed').length
  const pendingSales = filteredSales.filter(s => s.status === 'pending').length

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

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'card':
        return 'Card'
      case 'bank_transfer':
        return 'Bank Transfer'
      case 'cash':
        return 'Cash'
      default:
        return method
    }
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Ticket Sales</h1>
        <p className='text-gray-600'>View and manage all your ticket sales</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Sales</p>
              <p className='text-3xl font-bold text-gray-900'>₦{totalSales.toLocaleString()}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoWalletOutline className='text-2xl text-gray-700' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Tickets Sold</p>
              <p className='text-3xl font-bold text-gray-900'>{totalTickets}</p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <IoTicketOutline className='text-2xl text-green-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Net Revenue</p>
              <p className='text-3xl font-bold text-gray-900'>₦{totalRevenue.toLocaleString()}</p>
              <p className='text-xs text-gray-500 mt-1'>After fees: ₦{totalFees.toLocaleString()}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <IoTrendingUpOutline className='text-2xl text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Orders</p>
              <p className='text-3xl font-bold text-gray-900'>{filteredSales.length}</p>
              <p className='text-xs text-gray-500 mt-1'>
                {completedSales} completed, {pendingSales} pending
              </p>
            </div>
            <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
              <IoPeopleOutline className='text-2xl text-purple-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* Event Filter */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Filter by Event
            </label>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder="All Events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Events ({salesData.length} sales)</SelectItem>
                {organizerEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.name} ({salesData.filter(s => s.eventName === event.name).length} sales)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Date Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "w-full h-12 px-4 border border-gray-300 rounded-lg text-left flex items-center gap-2",
                    !dateRange.from && "text-gray-500"
                  )}
                >
                  <IoCalendarOutline className='text-gray-400' />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Pick a date range"
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{ from: dateRange.from, to: dateRange.to }}
                  onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Export Button */}
          <div className='flex items-end'>
            <button className='flex items-center gap-2 px-6 h-12 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium whitespace-nowrap'>
              <IoDownloadOutline className='text-xl' />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Order Details
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Event
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Buyer
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Ticket
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Amount
                </th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredSales.length > 0 ? (
                filteredSales.map((sale) => (
                  <tr key={sale.id} className='hover:bg-gray-50 transition'>
                    <td className='px-6 py-4'>
                      <div>
                        <p className='font-medium text-gray-900'>{sale.orderNumber}</p>
                        <p className='text-sm text-gray-600'>
                          {new Date(sale.purchaseDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className='text-xs text-gray-500'>{getPaymentMethodLabel(sale.paymentMethod)}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='font-medium text-gray-900'>{sale.eventName}</p>
                      <p className='text-sm text-gray-600'>{sale.eventDate}</p>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='font-medium text-gray-900'>{sale.buyerName}</p>
                      <p className='text-sm text-gray-600'>{sale.buyerEmail}</p>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='font-medium text-gray-900'>{sale.ticketType}</p>
                      <p className='text-sm text-gray-600'>Qty: {sale.quantity}</p>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='font-bold text-gray-900'>₦{sale.amount.toLocaleString()}</p>
                      <p className='text-xs text-gray-600'>Fee: ₦{sale.serviceFee.toLocaleString()}</p>
                      <p className='text-xs font-medium text-green-600'>Net: ₦{sale.netAmount.toLocaleString()}</p>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(sale.status)}`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className='px-6 py-12 text-center'>
                    <IoTicketOutline className='text-6xl text-gray-300 mx-auto mb-4' />
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>No sales found</h3>
                    <p className='text-gray-600'>Try adjusting your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredSales.length > 0 && (
          <div className='px-6 py-4 border-t border-gray-200 flex items-center justify-between'>
            <p className='text-sm text-gray-600'>
              Showing {filteredSales.length} sales
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

export default TicketSalesPage