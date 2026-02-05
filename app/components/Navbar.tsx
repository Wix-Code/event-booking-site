import React from 'react'
import { links } from '../dummyData'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img 
                src="https://shows.ng/images/logo.svg" 
                alt="Logo" 
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((item) => (
              <Link 
                key={item.id} 
                href={item.link}
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-gray-700 hover:text-black font-medium transition-colors duration-200 px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-700 hover:text-black">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar