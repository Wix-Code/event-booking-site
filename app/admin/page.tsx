"use client"

import React, { useState } from 'react'
import {
  IoSearchOutline,
  IoPeopleOutline,
  IoEyeOutline,
  IoLockClosedOutline,
  IoCheckmarkCircle,
  IoMailOutline,
  IoEllipsisVertical
} from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+234 123 456 7890',
      joinDate: '2025-11-15',
      lastActive: '2026-02-08',
      tickets: 12,
      spent: 125000,
      status: 'active',
      verified: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+234 098 765 4321',
      joinDate: '2025-12-20',
      lastActive: '2026-02-07',
      tickets: 8,
      spent: 89000,
      status: 'active',
      verified: true
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '+234 111 222 3333',
      joinDate: '2026-01-05',
      lastActive: '2026-01-10',
      tickets: 0,
      spent: 0,
      status: 'inactive',
      verified: false
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      phone: '+234 444 555 6666',
      joinDate: '2025-10-12',
      lastActive: '2026-02-09',
      tickets: 25,
      spent: 345000,
      status: 'active',
      verified: true
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.b@example.com',
      phone: '+234 777 888 9999',
      joinDate: '2026-01-28',
      lastActive: '2026-01-30',
      tickets: 3,
      spent: 45000,
      status: 'suspended',
      verified: false
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
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
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Users Management</h1>
        <p className='text-gray-600'>Manage all platform users</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Users</p>
          <p className='text-3xl font-bold text-gray-900'>{users.length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Active Users</p>
          <p className='text-3xl font-bold text-green-600'>{users.filter(u => u.status === 'active').length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Verified</p>
          <p className='text-3xl font-bold text-blue-600'>{users.filter(u => u.verified).length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Suspended</p>
          <p className='text-3xl font-bold text-red-600'>{users.filter(u => u.status === 'suspended').length}</p>
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
                placeholder='Search users by name or email...'
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
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='inactive'>Inactive</SelectItem>
                <SelectItem value='suspended'>Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>User</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Contact</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Activity</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Stats</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Status</th>
                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredUsers.map((user) => (
                <tr key={user.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
                        <IoPeopleOutline className='text-xl text-gray-600' />
                      </div>
                      <div>
                        <p className='font-semibold text-gray-900 flex items-center gap-2'>
                          {user.name}
                          {user.verified && (
                            <IoCheckmarkCircle className='text-blue-600 text-sm' />
                          )}
                        </p>
                        <p className='text-xs text-gray-500'>Joined {user.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-900'>{user.email}</p>
                    <p className='text-sm text-gray-600'>{user.phone}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-900'>Last active</p>
                    <p className='text-sm text-gray-600'>{user.lastActive}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-900'>{user.tickets} tickets</p>
                    <p className='text-sm font-bold text-gray-900'>₦{user.spent.toLocaleString()}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-2'>
                      <button className='p-2 hover:bg-gray-100 rounded-lg' title='View Details'>
                        <IoEyeOutline className='text-xl text-gray-600' />
                      </button>
                      <button className='p-2 hover:bg-blue-100 rounded-lg' title='Send Email'>
                        <IoMailOutline className='text-xl text-blue-600' />
                      </button>
                      {user.status !== 'suspended' && (
                        <button className='p-2 hover:bg-red-100 rounded-lg' title='Suspend User'>
                          <IoLockClosedOutline className='text-xl text-red-600' />
                        </button>
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

        {/* Pagination */}
        <div className='px-6 py-4 border-t border-gray-200 flex items-center justify-between'>
          <p className='text-sm text-gray-600'>
            Showing {filteredUsers.length} users
          </p>
          <div className='flex gap-2'>
            <button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
              Previous
            </button>
            <button className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm'>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPage