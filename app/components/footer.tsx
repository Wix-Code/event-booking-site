import React from 'react'
import Link from 'next/link'
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io5'
import { IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact Us', href: '/contact-us' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    discover: [
      { name: 'Browse Events', href: '/events' },
      { name: 'Music Events', href: '/events?category=music' },
      { name: 'Comedy Shows', href: '/events?category=comedy' },
      { name: 'Religious Events', href: '/events?category=religion' },
      { name: 'Seminars', href: '/events?category=seminar' },
    ],
    organizers: [
      { name: 'Create Event', href: '/create-event' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Resources', href: '/resources' },
      { name: 'Event Planning', href: '/event-planning' },
      { name: 'Help Center', href: '/help' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refund' },
      { name: 'Community Guidelines', href: '/guidelines' },
    ],
  }

  const socialLinks = [
    { name: 'Facebook', icon: IoLogoFacebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: IoLogoTwitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: IoLogoInstagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: IoLogoLinkedin, href: 'https://linkedin.com' },
    { name: 'YouTube', icon: IoLogoYoutube, href: 'https://youtube.com' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/">
              <img 
                src="https://shows.ng/images/logo.svg" 
                alt="Logo" 
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Discover and book amazing events across Nigeria. From concerts to seminars, find experiences that matter to you.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <IoLocationOutline className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  Lagos, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-3">
                <IoMailOutline className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@events.ng" className="text-sm text-gray-400 hover:text-white transition-colors">
                  info@events.ng
                </a>
              </div>
              <div className="flex items-center gap-3">
                <IoCallOutline className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="tel:+2341234567890" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +234 123 456 7890
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Organizers Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Organizers</h3>
            <ul className="space-y-3">
              {footerLinks.organizers.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for the latest events and exclusive offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © {currentYear} Events Nigeria. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer