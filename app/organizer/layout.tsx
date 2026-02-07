"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  IoTicketOutline, 
  IoBookmarkOutline, 
  IoPersonOutline, 
  IoSettingsOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoCalendarOutline,
  IoHeartOutline
} from 'react-icons/io5'

const Layout = ({ children }: {children: React.ReactNode}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { name: 'My Tickets', href: '/dashboard', icon: IoTicketOutline },
    { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: IoBookmarkOutline },
    { name: 'Favorites', href: '/dashboard/favorites', icon: IoHeartOutline },
    { name: 'Upcoming Events', href: '/dashboard/upcoming', icon: IoCalendarOutline },
    { name: 'Profile', href: '/dashboard/profile', icon: IoPersonOutline },
    { name: 'Settings', href: '/dashboard/settings', icon: IoSettingsOutline },
  ]

  const isActive = (href: any) => {
    if (href === '/dashboard') {
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

      <div className='flex'>
        {/* Sidebar - Desktop */}
        <aside className='hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200'>
          {/* Logo */}
          <div className='h-16 flex items-center px-6 border-b border-gray-200'>
            <Link href='/'>
              <img 
                src="https://shows.ng/images/logo.svg" 
                alt="Logo" 
                className="h-8 w-auto"
              />
            </Link>
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
              {/* Navigation */}
              <nav className='px-4 py-6 space-y-1 overflow-y-auto'>
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

export default Layout