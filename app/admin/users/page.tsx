"use client"

import React, { useState } from 'react'
import {
  IoSearchOutline,
  IoPeopleOutline,
  IoEyeOutline,
  IoLockClosedOutline,
  IoCheckmarkCircle,
  IoMailOutline,
  IoEllipsisVertical,
  IoTrashOutline,
  IoCreateOutline,
  IoCloseCircle,
  IoShieldCheckmarkOutline
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
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'view' | 'edit' | 'suspend' | 'delete'>('view')

  const [users, setUsers] = useState([
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
      verified: true,
      role: 'user',
      address: '123 Main St, Lagos',
      city: 'Lagos',
      state: 'Lagos State'
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
      verified: true,
      role: 'user',
      address: '456 Oak Ave, Abuja',
      city: 'Abuja',
      state: 'FCT'
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
      verified: false,
      role: 'user',
      address: '789 Pine Rd, Port Harcourt',
      city: 'Port Harcourt',
      state: 'Rivers State'
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
      verified: true,
      role: 'user',
      address: '321 Elm St, Lagos',
      city: 'Lagos',
      state: 'Lagos State'
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
      verified: false,
      role: 'user',
      address: '654 Maple Dr, Kano',
      city: 'Kano',
      state: 'Kano State'
    },
    {
      id: 6,
      name: 'Emma Wilson',
      email: 'emma.w@example.com',
      phone: '+234 222 333 4444',
      joinDate: '2025-09-01',
      lastActive: '2026-02-10',
      tickets: 18,
      spent: 234000,
      status: 'active',
      verified: true,
      role: 'organizer',
      address: '987 Cedar Ln, Lagos',
      city: 'Lagos',
      state: 'Lagos State'
    }
  ])

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

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setModalType('view')
    setShowModal(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setModalType('edit')
    setShowModal(true)
  }

  const handleSuspendUser = (user: any) => {
    setSelectedUser(user)
    setModalType('suspend')
    setShowModal(true)
  }

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setModalType('delete')
    setShowModal(true)
  }

  const confirmSuspend = () => {
    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' }
        : u
    ))
    setShowModal(false)
  }

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id))
    setShowModal(false)
  }

  const verifyUser = (userId: number) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, verified: true } : u
    ))
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Users Management</h1>
        <p className='text-gray-600'>Manage all platform users and their activities</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Users</p>
              <p className='text-3xl font-bold text-gray-900'>{users.length}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <IoPeopleOutline className='text-2xl text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Active Users</p>
              <p className='text-3xl font-bold text-green-600'>{users.filter(u => u.status === 'active').length}</p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <IoCheckmarkCircle className='text-2xl text-green-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Verified</p>
              <p className='text-3xl font-bold text-blue-600'>{users.filter(u => u.verified).length}</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <IoShieldCheckmarkOutline className='text-2xl text-blue-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Suspended</p>
              <p className='text-3xl font-bold text-red-600'>{users.filter(u => u.status === 'suspended').length}</p>
            </div>
            <div className='w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center'>
              <IoLockClosedOutline className='text-2xl text-red-600' />
            </div>
          </div>
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
                <tr key={user.id} className='hover:bg-gray-50 transition'>
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
                        {user.role === 'organizer' && (
                          <span className='text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium'>
                            Organizer
                          </span>
                        )}
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
                      <button 
                        onClick={() => handleViewUser(user)}
                        className='p-2 hover:bg-gray-100 rounded-lg' 
                        title='View Details'
                      >
                        <IoEyeOutline className='text-xl text-gray-600' />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className='p-2 hover:bg-blue-100 rounded-lg' 
                        title='Edit User'
                      >
                        <IoCreateOutline className='text-xl text-blue-600' />
                      </button>
                      {!user.verified && (
                        <button 
                          onClick={() => verifyUser(user.id)}
                          className='p-2 hover:bg-green-100 rounded-lg' 
                          title='Verify User'
                        >
                          <IoShieldCheckmarkOutline className='text-xl text-green-600' />
                        </button>
                      )}
                      <button 
                        onClick={() => handleSuspendUser(user)}
                        className='p-2 hover:bg-red-100 rounded-lg' 
                        title={user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                      >
                        <IoLockClosedOutline className='text-xl text-red-600' />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className='p-2 hover:bg-red-100 rounded-lg' 
                        title='Delete User'
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

      {/* Modal */}
      {showModal && selectedUser && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            
            {/* View User Modal */}
            {modalType === 'view' && (
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>User Details</h2>
                  <button onClick={() => setShowModal(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
                    <IoCloseCircle className='text-2xl text-gray-600' />
                  </button>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center gap-4 pb-4 border-b'>
                    <div className='w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center'>
                      <IoPeopleOutline className='text-3xl text-gray-600' />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-gray-900'>{selectedUser.name}</h3>
                      <p className='text-gray-600'>{selectedUser.email}</p>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm text-gray-600'>Phone</p>
                      <p className='font-medium text-gray-900'>{selectedUser.phone}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Join Date</p>
                      <p className='font-medium text-gray-900'>{selectedUser.joinDate}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Last Active</p>
                      <p className='font-medium text-gray-900'>{selectedUser.lastActive}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Verified</p>
                      <p className='font-medium text-gray-900'>{selectedUser.verified ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Total Tickets</p>
                      <p className='font-medium text-gray-900'>{selectedUser.tickets}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Total Spent</p>
                      <p className='font-medium text-gray-900'>₦{selectedUser.spent.toLocaleString()}</p>
                    </div>
                    <div className='col-span-2'>
                      <p className='text-sm text-gray-600'>Address</p>
                      <p className='font-medium text-gray-900'>{selectedUser.address}</p>
                      <p className='text-sm text-gray-600'>{selectedUser.city}, {selectedUser.state}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Edit User Modal */}
            {modalType === 'edit' && (
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>Edit User</h2>
                  <button onClick={() => setShowModal(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
                    <IoCloseCircle className='text-2xl text-gray-600' />
                  </button>
                </div>

                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Name</label>
                      <input
                        type='text'
                        defaultValue={selectedUser.name}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                      <input
                        type='email'
                        defaultValue={selectedUser.email}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Phone</label>
                      <input
                        type='tel'
                        defaultValue={selectedUser.phone}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Status</label>
                      <select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'>
                        <option value='active' selected={selectedUser.status === 'active'}>Active</option>
                        <option value='inactive' selected={selectedUser.status === 'inactive'}>Inactive</option>
                        <option value='suspended' selected={selectedUser.status === 'suspended'}>Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div className='flex gap-3 pt-4'>
                    <button
                      onClick={() => setShowModal(false)}
                      className='flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Suspend User Modal */}
            {modalType === 'suspend' && (
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    {selectedUser.status === 'suspended' ? 'Unsuspend User' : 'Suspend User'}
                  </h2>
                  <button onClick={() => setShowModal(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
                    <IoCloseCircle className='text-2xl text-gray-600' />
                  </button>
                </div>

                <div className='mb-6'>
                  <p className='text-gray-700 mb-4'>
                    {selectedUser.status === 'suspended' 
                      ? `Are you sure you want to unsuspend ${selectedUser.name}? They will regain access to their account.`
                      : `Are you sure you want to suspend ${selectedUser.name}? They will lose access to their account.`
                    }
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
                    onClick={confirmSuspend}
                    className={`flex-1 px-4 py-2 rounded-lg transition font-semibold ${
                      selectedUser.status === 'suspended'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {selectedUser.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                  </button>
                </div>
              </div>
            )}

            {/* Delete User Modal */}
            {modalType === 'delete' && (
              <div className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>Delete User</h2>
                  <button onClick={() => setShowModal(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
                    <IoCloseCircle className='text-2xl text-gray-600' />
                  </button>
                </div>

                <div className='mb-6'>
                  <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
                    <p className='text-red-900 font-medium'>Warning: This action cannot be undone!</p>
                  </div>
                  <p className='text-gray-700'>
                    Are you sure you want to permanently delete <strong>{selectedUser.name}</strong>? 
                    All their data including bookings and tickets will be removed.
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

export default AdminUsersPage