"use client"

import React from 'react'
import { 
  IoCalendarOutline, 
  IoTicketOutline, 
  IoWalletOutline, 
  IoPeopleOutline,
  IoTrendingUpOutline,
  IoEyeOutline
} from 'react-icons/io5'

const OrganizerOverview = () => {
  const stats = [
    { label: 'Total Events', value: '12', icon: IoCalendarOutline, change: '+2 this month', trend: 'up' },
    { label: 'Tickets Sold', value: '1,247', icon: IoTicketOutline, change: '+18% vs last month', trend: 'up' },
    { label: 'Total Revenue', value: '₦2.4M', icon: IoWalletOutline, change: '+12% vs last month', trend: 'up' },
    { label: 'Total Attendees', value: '934', icon: IoPeopleOutline, change: '+8% vs last month', trend: 'up' },
  ]

  const recentEvents = [
    {
      id: 1,
      name: 'Campus Connect 2.0',
      date: 'Feb 13, 2026',
      status: 'upcoming',
      ticketsSold: 145,
      totalTickets: 200,
      revenue: 72500
    },
    {
      id: 2,
      name: 'Tech Summit Africa',
      date: 'Mar 20, 2026',
      status: 'upcoming',
      ticketsSold: 89,
      totalTickets: 150,
      revenue: 178000
    },
    {
      id: 3,
      name: 'Music Festival Lagos',
      date: 'Jan 15, 2026',
      status: 'completed',
      ticketsSold: 500,
      totalTickets: 500,
      revenue: 1250000
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Overview</h1>
        <p className='text-gray-600'>Welcome back! Here's what's happening with your events</p>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
                  <Icon className='text-2xl text-gray-700' />
                </div>
                <div className='flex items-center gap-1 text-green-600 text-sm'>
                  <IoTrendingUpOutline />
                  <span className='font-medium'>{stat.change.split(' ')[0]}</span>
                </div>
              </div>
              <p className='text-3xl font-bold text-gray-900 mb-1'>{stat.value}</p>
              <p className='text-sm text-gray-600'>{stat.label}</p>
              <p className='text-xs text-gray-500 mt-2'>{stat.change}</p>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
        <h2 className='text-xl font-bold text-gray-900 mb-4'>Quick Actions</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <button className='flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition'>
            <div className='w-10 h-10 bg-black rounded-lg flex items-center justify-center'>
              <IoCalendarOutline className='text-xl text-white' />
            </div>
            <div className='text-left'>
              <p className='font-semibold text-gray-900'>Create Event</p>
              <p className='text-xs text-gray-600'>Set up a new event</p>
            </div>
          </button>

          <button className='flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition'>
            <div className='w-10 h-10 bg-black rounded-lg flex items-center justify-center'>
              <IoTicketOutline className='text-xl text-white' />
            </div>
            <div className='text-left'>
              <p className='font-semibold text-gray-900'>View Sales</p>
              <p className='text-xs text-gray-600'>Check ticket sales</p>
            </div>
          </button>

          <button className='flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition'>
            <div className='w-10 h-10 bg-black rounded-lg flex items-center justify-center'>
              <IoPeopleOutline className='text-xl text-white' />
            </div>
            <div className='text-left'>
              <p className='font-semibold text-gray-900'>Manage Attendees</p>
              <p className='text-xs text-gray-600'>View attendee list</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Events */}
      <div className='bg-white rounded-xl shadow-sm p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-gray-900'>Recent Events</h2>
          <button className='text-sm font-medium text-gray-700 hover:text-gray-900'>View All →</button>
        </div>

        <div className='space-y-4'>
          {recentEvents.map((event) => (
            <div key={event.id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h3 className='font-semibold text-gray-900'>{event.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      event.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600'>📅 {event.date}</p>
                </div>

                <div className='flex items-center gap-6'>
                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Tickets Sold</p>
                    <p className='font-bold text-gray-900'>{event.ticketsSold}/{event.totalTickets}</p>
                    <div className='w-24 h-2 bg-gray-200 rounded-full mt-1'>
                      <div 
                        className='h-full bg-black rounded-full'
                        style={{ width: `${(event.ticketsSold / event.totalTickets) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className='text-xs text-gray-600 mb-1'>Revenue</p>
                    <p className='font-bold text-gray-900'>₦{event.revenue.toLocaleString()}</p>
                  </div>

                  <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm font-medium'>
                    <IoEyeOutline />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrganizerOverview;