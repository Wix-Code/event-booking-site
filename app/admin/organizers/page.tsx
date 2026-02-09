"use client"

import React, { useState } from 'react'
import {
  IoSearchOutline,
  IoBusinessOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoEyeOutline,
  IoShieldCheckmarkOutline,
  IoEllipsisVertical
} from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AdminOrganizersPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const organizers = [
    {
      id: 1,
      name: 'John Events Ltd',
      email: 'john@events.ng',
      phone: '+234 123 456 7890',
      contactPerson: 'John Doe',
      joinDate: '2025-09-15',
      events: 12,
      totalRevenue: 2400000,
      status: 'verified',
      businessType: 'company'
    },
    {
      id: 2,
      name: 'Sarah Music Productions',
      email: 'sarah@music.ng',
      phone: '+234 098 765 4321',
      contactPerson: 'Sarah Williams',
      joinDate: '2025-11-20',
      events: 8,
      totalRevenue: 1890000,
      status: 'pending',
      businessType: 'company'
    },
    {
      id: 3,
      name: 'Mike Seminars',
      email: 'mike@seminars.ng',
      phone: '+234 111 222 3333',
      contactPerson: 'Mike Johnson',
      joinDate: '2025-12-05',
      events: 5,
      totalRevenue: 675000,
      status: 'verified',
      businessType: 'individual'
    },
    {
      id: 4,
      name: 'Laugh Hub Entertainment',
      email: 'info@laughhub.ng',
      phone: '+234 444 555 6666',
      contactPerson: 'David Brown',
      joinDate: '2026-01-10',
      events: 3,
      totalRevenue: 450000,
      status: 'suspended',
      businessType: 'company'
    },
    {
      id: 5,
      name: 'Tech Events NG',
      email: 'tech@events.ng',
      phone: '+234 777 888 9999',
      contactPerson: 'Emma Wilson',
      joinDate: '2026-01-25',
      events: 0,
      totalRevenue: 0,
      status: 'pending',
      businessType: 'individual'
    }
  ]

  const filteredOrganizers = organizers.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         org.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Organizers Management</h1>
        <p className='text-gray-600'>Manage and verify event organizers</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Organizers</p>
          <p className='text-3xl font-bold text-gray-900'>{organizers.length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Verified</p>
          <p className='text-3xl font-bold text-green-600'>{organizers.filter(o => o.status === 'verified').length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Pending Review</p>
          <p className='text-3xl font-bold text-yellow-600'>{organizers.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Revenue</p>
          <p className='text-3xl font-bold text-gray-900'>
            ₦{organizers.reduce((sum, o) => sum + o.totalRevenue, 0).toLocaleString()}
          </p>
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
                placeholder='Search organizers...'
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
                <SelectItem value='verified'>Verified</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='suspended'>Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Organizers Table */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Organizer</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Contact</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Performance</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Status</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredOrganizers.map((org) => (
                <tr key={org.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                        <IoBusinessOutline className='text-xl text-gray-600' />
                      </div>
                      <div>
                        <p className='font-semibold text-gray-900 flex items-center gap-2'>
                          {org.name}
                          {org.status === 'verified' && (
                            <IoShieldCheckmarkOutline className='text-green-600 text-sm' />
                          )}
                        </p>
                        <p className='text-xs text-gray-500 capitalize'>{org.businessType}</p>
                        <p className='text-xs text-gray-500'>Joined {org.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm font-medium text-gray-900'>{org.contactPerson}</p>
                    <p className='text-sm text-gray-600'>{org.email}</p>
                    <p className='text-sm text-gray-600'>{org.phone}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-900'>{org.events} events</p>
                    <p className='text-sm font-bold text-gray-900'>₦{org.totalRevenue.toLocaleString()}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(org.status)}`}>
                      {org.status}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <button className='p-2 hover:bg-gray-100 rounded-lg' title='View Details'>
                        <IoEyeOutline className='text-xl text-gray-600' />
                      </button>
                      {org.status === 'pending' && (
                        <>
                          <button className='p-2 hover:bg-green-100 rounded-lg' title='Verify'>
                            <IoCheckmarkCircle className='text-xl text-green-600' />
                          </button>
                          <button className='p-2 hover:bg-red-100 rounded-lg' title='Reject'>
                            <IoCloseCircle className='text-xl text-red-600' />
                          </button>
                        </>
                      )}
                      <button className='p-2 hover:bg-gray-100 rounded-lg'>
                        <IoEllipsisVertical className='text-xl text-gray-600' />
                      </button>
                    </div>
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

export default AdminOrganizersPage