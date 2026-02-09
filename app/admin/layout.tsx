"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  IoStatsChartOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoBusinessOutline,
  IoTicketOutline,
  IoWalletOutline,
  IoFlagOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoShieldCheckmarkOutline,
  IoDocumentTextOutline,
  IoNotificationsOutline
} from 'react-icons/io5'

const AdminLayout = ({ children }: {children: React.ReactNode}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: IoStatsChartOutline },
    { name: 'Events', href: '/admin/events', icon: IoCalendarOutline },
    { name: 'Users', href: '/admin/users', icon: IoPeopleOutline },
    { name: 'Organizers', href: '/admin/organizers', icon: IoBusinessOutline },
    { name: 'Bookings', href: '/admin/bookings', icon: IoTicketOutline },
    { name: 'Payouts', href: '/admin/payouts', icon: IoWalletOutline },
    { name: 'Reports', href: '/admin/reports', icon: IoFlagOutline },
    { name: 'Categories', href: '/admin/categories', icon: IoDocumentTextOutline },
    { name: 'Settings', href: '/admin/settings', icon: IoSettingsOutline },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile Header */}
      <div className='lg:hidden bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <IoShieldCheckmarkOutline className='text-2xl text-red-600' />
            <span className='font-bold text-gray-900'>Admin Panel</span>
          </div>
          <div className='flex items-center gap-2'>
            <button className='p-2 rounded-lg hover:bg-gray-100'>
              <IoNotificationsOutline className='text-xl' />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='p-2 rounded-lg hover:bg-gray-100'
            >
              {sidebarOpen ? (
                <IoCloseOutline className='text-2xl' />
              ) : (
                <IoMenuOutline className='text-2xl' />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className='flex'>
        {/* Sidebar - Desktop */}
        <aside className='hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200'>
          {/* Logo */}
          <div className='h-16 flex items-center justify-between px-6 border-b border-gray-200'>
            <div className='flex items-center gap-2'>
              <IoShieldCheckmarkOutline className='text-2xl text-red-600' />
              <span className='font-bold text-gray-900'>Admin Panel</span>
            </div>
            <button className='p-2 rounded-lg hover:bg-gray-100'>
              <IoNotificationsOutline className='text-xl' />
            </button>
          </div>

          {/* Admin Badge */}
          <div className='px-6 py-4 bg-red-50 border-b border-red-100'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                A
              </div>
              <div>
                <p className='font-semibold text-gray-900 text-sm'>Super Admin</p>
                <p className='text-xs text-gray-600'>admin@events.ng</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1 px-4 py-6 space-y-1 overflow-y-auto'>
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive(item.href)
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className='text-xl' />
                  <span className='font-medium'>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className='p-4 border-t border-gray-200'>
            <button className='flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition'>
              <IoLogOutOutline className='text-xl' />
              <span className='font-medium'>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div 
              className='fixed inset-0 bg-black/50 z-40 lg:hidden'
              onClick={() => setSidebarOpen(false)}
            />
            <aside className='fixed inset-y-0 left-0 w-64 bg-white z-50 lg:hidden'>
              {/* Admin Badge */}
              <div className='px-6 py-4 bg-red-50 border-b border-red-100'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                    A
                  </div>
                  <div>
                    <p className='font-semibold text-gray-900 text-sm'>Super Admin</p>
                    <p className='text-xs text-gray-600'>admin@events.ng</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className='px-4 py-6 space-y-1 overflow-y-auto h-[calc(100vh-200px)]'>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        isActive(item.href)
                          ? 'bg-red-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className='text-xl' />
                      <span className='font-medium'>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Logout */}
              <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200'>
                <button className='flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition'>
                  <IoLogOutOutline className='text-xl' />
                  <span className='font-medium'>Logout</span>
                </button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className='flex-1 lg:ml-64'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout