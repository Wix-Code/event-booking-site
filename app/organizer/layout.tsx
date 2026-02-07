"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  IoCalendarOutline, 
  IoStatsChartOutline, 
  IoTicketOutline, 
  IoPersonOutline, 
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoAddCircleOutline,
  IoWalletOutline,
  IoNotificationsOutline
} from 'react-icons/io5'

const OrganizerLayout = ({ children }: {children: React.ReactNode}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { name: 'Overview', href: '/organizer', icon: IoStatsChartOutline },
    { name: 'My Events', href: '/organizer/events', icon: IoCalendarOutline },
    { name: 'Create Event', href: '/organizer/create', icon: IoAddCircleOutline },
    { name: 'Ticket Sales', href: '/organizer/sales', icon: IoTicketOutline },
    { name: 'Attendees', href: '/organizer/attendees', icon: IoPersonOutline },
    { name: 'Payouts', href: '/organizer/payouts', icon: IoWalletOutline },
    { name: 'Settings', href: '/organizer/settings', icon: IoSettingsOutline },
  ]

  const isActive = (href: string) => {
    if (href === '/organizer') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile Header */}
      <div className='lg:hidden bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40'>
        <div className='flex items-center justify-between'>
          <Link href='/'>
            <img 
              src="https://shows.ng/images/logo.svg" 
              alt="Logo" 
              className="h-8 w-auto"
            />
          </Link>
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
            <Link href='/'>
              <img 
                src="https://shows.ng/images/logo.svg" 
                alt="Logo" 
                className="h-8 w-auto"
              />
            </Link>
            <button className='p-2 rounded-lg hover:bg-gray-100'>
              <IoNotificationsOutline className='text-xl' />
            </button>
          </div>

          {/* Organizer Badge */}
          <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm'>
                O
              </div>
              <div>
                <p className='font-semibold text-gray-900 text-sm'>Organizer Mode</p>
                <p className='text-xs text-gray-600'>Event Manager</p>
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
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className='text-xl' />
                  <span className='font-medium'>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Switch to User & Logout */}
          <div className='p-4 border-t border-gray-200 space-y-2'>
            <Link href='/dashboard' className='flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 w-full transition'>
              <IoPersonOutline className='text-xl' />
              <span className='font-medium'>User Dashboard</span>
            </Link>
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
              {/* Organizer Badge */}
              <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm'>
                    O
                  </div>
                  <div>
                    <p className='font-semibold text-gray-900 text-sm'>Organizer Mode</p>
                    <p className='text-xs text-gray-600'>Event Manager</p>
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
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className='text-xl' />
                      <span className='font-medium'>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              {/* Switch & Logout */}
              <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-2'>
                <Link href='/dashboard' className='flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 w-full transition'>
                  <IoPersonOutline className='text-xl' />
                  <span className='font-medium'>User Dashboard</span>
                </Link>
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

export default OrganizerLayout