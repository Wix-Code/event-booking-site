"use client"

import React, { useState } from 'react'
import { links } from '../dummyData'
import Link from 'next/link'
import { IoClose, IoMenu } from 'react-icons/io5'
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const pathname = usePathname()

  return (
    <>
      <nav className={`sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50 ${
        pathname === "/dashboard" ? "hidden" : ""
      }`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/login"
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200 px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-black transition-colors"
              aria-label="Toggle menu"
            >
              <IoMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            onClick={closeMenu}
            className="p-2 text-gray-700 hover:text-black transition-colors"
            aria-label="Close menu"
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex flex-col p-6">
          {/* Navigation Links */}
          <div className="flex flex-col gap-1 mb-8">
            {links.map((item) => (
              <Link 
                key={item.id} 
                href={item.link}
                onClick={closeMenu}
                className="text-gray-700 hover:text-black hover:bg-gray-100 font-medium transition-all duration-200 px-4 py-3 rounded-lg"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-3 border-t border-gray-200 pt-6">
            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="text-center text-gray-700 hover:text-black font-medium transition-colors duration-200 px-4 py-3 border border-gray-300 rounded-full hover:border-black"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              onClick={closeMenu}
              className="text-center text-gray-700 hover:text-black font-medium transition-colors duration-200 px-4 py-3 border border-gray-300 rounded-full hover:border-black"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              onClick={closeMenu}
              className="text-center bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar