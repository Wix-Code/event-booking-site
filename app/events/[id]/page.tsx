"use client"

import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoTicketOutline } from 'react-icons/io5'
import { GoPlus } from 'react-icons/go'
import { FiMinus } from 'react-icons/fi'

const Page = () => {
  const [selectedTicket, setSelectedTicket] = useState('')
  const [quantity, setQuantity] = useState(1)

  const tickets = [
    { id: 'regular', name: 'Regular Ticket', price: 5000 },
    { id: 'vip', name: 'VIP Ticket', price: 10000 },
    { id: 'vvip', name: 'VVIP Ticket', price: 15000 }
  ]

  const selectedTicketPrice = tickets.find(t => t.id === selectedTicket)?.price || 0
  const totalAmount = selectedTicketPrice * quantity

  const incrementQuantity = () => setQuantity(quantity + 1)
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  return (
    <div className='py-8 bg-gray-50'>
      <div className='max-w-[1200px] mx-auto px-4'>
        {/* Event Header */}
        <div className='flex flex-row gap-4 mb-8'>
          <div className='bg-white justify-center flex flex-col items-center w-[120px] rounded-lg overflow-hidden shadow-sm'>
            <button className='w-full py-2 bg-black text-white text-[20px] font-bold'>FEB</button>
            <button className='w-full text-[40px] font-bold py-2'>13</button>
          </div>
          <div className='flex flex-col gap-2 justify-center'>
            <h1 className='text-2xl font-bold text-gray-900'>Campus Connect 2.0</h1>
            <p className='text-gray-600'>Sodiq Alao • Starts on Fri, Feb 13, 2026 12:00 PM</p>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Left Column - Event Details */}
          <div className='flex-1 lg:flex-[2] flex flex-col gap-6'>
            <img 
              className='w-full h-[500px] lg:h-[600px] object-cover rounded-xl' 
              src="https://shows.ng/su/evu/1766565553_IMG_8193.jpeg" 
              alt="Campus Connect 2.0" 
            />
            
            <div className=' p-6 rounded-xl'>
              <h2 className='text-2xl font-bold mb-4 text-gray-900'>About This Event</h2>
              <p className='text-justify text-gray-600 leading-relaxed text-[15px]'>
                Welcome to Campus Connect 1.0 — a standout moment you won't want to miss. It's simple: chill vibes, casual energy, and time to reconnect with people who matter. Whether you're coming for the conversation or just some company, this space is yours. You bring the mood, we'll bring the comfort. Let's just hang. Mark your calendar—Friday, February 13, 2026 is when it happens. Things get started around 12:00 PM. The event is happening at Bamidele Olumilua University Of Education, Science And Technology., located at Ikere-ekiti, Ikere. This hangouts is built with intention, energy, and something truly special. Come ready for an experience that will stay with you long after it's over.
              </p>
            </div>
          </div>

          {/* Right Column - Booking Details */}
          <div className='flex-1 lg:flex-[1]'>
            <div className='bg-white rounded-xl border-[1px] border-gray-200 sticky top-4'>
              {/* Header */}
              <div className='p-6 border-b border-gray-200'>
                <h3 className='text-xl font-bold text-gray-900'>Booking Details</h3>
              </div>

              <div className='p-6 space-y-6'>
                {/* Organizer */}
                <div className='flex flex-row items-center gap-3 pb-6 border-b border-gray-100'>
                  <div className='w-12 h-12 rounded-full bg-gray-200 justify-center items-center flex flex-shrink-0'>
                    <MdAccountCircle className='text-[24px] text-gray-600' />
                  </div>
                  <div>
                    <p className='text-[13px] text-gray-500'>Organized by</p>
                    <p className='font-semibold text-gray-900'>Ogbonna Wisdom</p>
                  </div>
                </div>

                {/* Location */}
                <div className='flex gap-3'>
                  <div className='w-12 h-12 rounded-full bg-gray-200 justify-center items-center flex flex-shrink-0'>
                    <IoLocationOutline className='text-[24px] text-gray-700 flex-shrink-0' />
                  </div>
                  
                  <div>
                    <p className='text-[13px] text-gray-500 mb-1'>Location</p>
                    <p className='font-medium text-gray-900 text-[15px]'>Bamidele Olumilua University</p>
                    <p className='text-[14px] text-gray-600'>Ikere-ekiti, Ikere</p>
                  </div>
                </div>

                {/* Date */}
                <div className='flex gap-3'>
                  <div className='w-12 h-12 rounded-full bg-gray-200 justify-center items-center flex flex-shrink-0'>
                    <IoCalendarOutline className='text-[22px] text-gray-700 flex-shrink-0' />
                  </div>
                  <div>
                    <p className='text-[13px] text-gray-500 mb-1'>Date</p>
                    <p className='font-medium text-gray-900 text-[15px]'>Friday, February 13, 2026</p>
                  </div>
                </div>

                {/* Time */}
                <div className='flex gap-3 pb-6 border-b border-gray-100'>
                  <div className='w-12 h-12 rounded-full bg-gray-200 justify-center items-center flex flex-shrink-0'>
                    <IoTimeOutline className='text-[24px] text-gray-700 flex-shrink-0' />
                  </div>             
                  <div>
                    <p className='text-[13px] text-gray-500 mb-1'>Time</p>
                    <p className='font-medium text-gray-900 text-[15px]'>12:00 PM</p>
                  </div>
                </div>

                {/* Select Ticket */}
                <div>
                  <label className='block text-[14px] font-semibold text-gray-900 mb-3'>
                    Select Ticket Type
                  </label>
                  <div className='space-y-3'>
                    {tickets.map((ticket) => (
                      <label
                        key={ticket.id}
                        className={`flex items-center justify-between p-4 border-1 rounded-lg cursor-pointer transition ${
                          selectedTicket === ticket.id
                            ? 'border-black border-2 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className='flex items-center gap-3'>
                          <input
                            type='radio'
                            name='ticket'
                            value={ticket.id}
                            checked={selectedTicket === ticket.id}
                            onChange={(e) => setSelectedTicket(e.target.value)}
                            className='w-4 h-4 accent-black'
                          />
                          <div>
                            <p className='font-medium text-gray-900'>{ticket.name}</p>
                          </div>
                        </div>
                        <p className='font-bold text-gray-900'>₦{ticket.price.toLocaleString()}</p>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className='block text-[14px] font-semibold text-gray-900 mb-3'>
                    Ticket Quantity
                  </label>
                  <div className='flex items-center gap-4'>
                    <button
                      onClick={decrementQuantity}
                      className='w-10 h-10 border-[1px] border-gray-300 cursor-pointer flex justify-center items-center rounded-full  font-bold text-gray-700 hover:bg-gray-100 transition'
                    >
                      <FiMinus />
                    </button>
                    <span className='text-xl font-bold text-gray-900 w-12 text-center'>{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className='w-10 h-10 border-[1px] border-gray-300 flex justify-center items-center rounded-full cursor-pointer font-bold text-gray-700 hover:bg-gray-100 transition'
                    >
                      <GoPlus />
                    </button>
                  </div>
                </div>

                {/* Total Amount */}
                <div className='bg-gray-50 p-4 rounded-lg'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='font-medium text-gray-900'>₦{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between items-center pt-2 border-t border-gray-200'>
                    <span className='font-bold text-gray-900'>Total Amount</span>
                    <span className='font-bold text-xl text-gray-900'>₦{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button 
                  className='w-full bg-black py-4 cursor-pointer font-semibold text-white rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed'
                  disabled={!selectedTicket}
                >
                  {selectedTicket ? 'Book Now' : 'Select a ticket to continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page