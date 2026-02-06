"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { IoMailOutline, IoPersonOutline, IoCallOutline, IoTicketOutline, IoCheckmarkCircle } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [ticketCount] = useState(3) // Example: 3 tickets
  const [sameEmail, setSameEmail] = useState(true)
  const [buyingForSelf, setBuyingForSelf] = useState(true)

  const router = useRouter()

  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const [attendees, setAttendees] = useState(
    Array(ticketCount).fill({
      name: '',
      email: '',
      phone: ''
    })
  )

  // Order details (from previous page)
  const orderDetails = {
    eventName: 'Campus Connect 2.0',
    eventDate: 'Friday, February 13, 2026',
    eventTime: '12:00 PM',
    location: 'Bamidele Olumilua University, Ikere-ekiti',
    ticketType: 'VIP Ticket',
    ticketPrice: 10000,
    quantity: ticketCount,
    subtotal: 10000 * ticketCount,
    serviceFee: 500 * ticketCount,
    total: (10000 * ticketCount) + (500 * ticketCount)
  }

  const handleBuyerChange = (e: any) => {
    setBuyerInfo({
      ...buyerInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleAttendeeChange = (index : any, field: any, value: any) => {
    const newAttendees = [...attendees]
    newAttendees[index] = {
      ...newAttendees[index],
      [field]: value
    }
    setAttendees(newAttendees)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Buyer Info:', buyerInfo)
    console.log('Attendees:', attendees)
    console.log('Same Email:', sameEmail)
    console.log('Buying For Self:', buyingForSelf)
    // Proceed to payment
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Progress Indicator */}
        <div className='mb-8'>
          <div className='flex items-center justify-center gap-2 mb-4'>
            <div className='flex items-center'>
              <div className='w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm'>
                1
              </div>
              <span className='ml-2 text-sm font-medium text-gray-900'>Select Tickets</span>
            </div>
            <div className='w-16 h-0.5 bg-black'></div>
            <div className='flex items-center'>
              <div className='w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm'>
                2
              </div>
              <span className='ml-2 text-sm font-medium text-gray-900'>Contact Info</span>
            </div>
            <div className='w-16 h-0.5 bg-gray-300'></div>
            <div className='flex items-center'>
              <div className='w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold text-sm'>
                3
              </div>
              <span className='ml-2 text-sm font-medium text-gray-500'>Payment</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Contact Information */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-2xl shadow-lg p-6 sm:p-8'>
              <h1 className='text-2xl font-bold text-gray-900 mb-2'>Contact Information</h1>
              <p className='text-gray-600 mb-6'>Enter your details to receive booking confirmation</p>

              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Buyer Information */}
                <div className='border-b border-gray-200 pb-6'>
                  <h2 className='text-lg font-semibold text-gray-900 mb-4'>Your Information</h2>
                  
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Full Name *
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <IoPersonOutline className='text-gray-400' />
                        </div>
                        <input
                          type='text'
                          name='name'
                          value={buyerInfo.name}
                          onChange={handleBuyerChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                          placeholder='John Doe'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Email Address *
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <IoMailOutline className='text-gray-400' />
                        </div>
                        <input
                          type='email'
                          name='email'
                          value={buyerInfo.email}
                          onChange={handleBuyerChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                          placeholder='you@example.com'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Phone Number *
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <IoCallOutline className='text-gray-400' />
                        </div>
                        <input
                          type='tel'
                          name='phone'
                          value={buyerInfo.phone}
                          onChange={handleBuyerChange}
                          required
                          className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                          placeholder='+234 123 456 7890'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buying For Self or Others */}
                {ticketCount > 1 && (
                  <div className='border-b border-gray-200 pb-6'>
                    <h2 className='text-lg font-semibold text-gray-900 mb-4'>Who are you buying for?</h2>
                    
                    <div className='space-y-3'>
                      <label className='flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition'>
                        <input
                          type='radio'
                          name='buyingFor'
                          checked={buyingForSelf}
                          onChange={() => setBuyingForSelf(true)}
                          className='mt-1 w-4 h-4 accent-black'
                        />
                        <div>
                          <p className='font-medium text-gray-900'>I'm buying for myself and others</p>
                          <p className='text-sm text-gray-600'>All tickets will be sent to your email</p>
                        </div>
                      </label>

                      <label className='flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition'>
                        <input
                          type='radio'
                          name='buyingFor'
                          checked={!buyingForSelf}
                          onChange={() => setBuyingForSelf(false)}
                          className='mt-1 w-4 h-4 accent-black'
                        />
                        <div>
                          <p className='font-medium text-gray-900'>I'm buying for someone else</p>
                          <p className='text-sm text-gray-600'>You can specify different attendees</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Attendee Information */}
                {ticketCount > 1 && (
                  <div className='pb-6'>
                    <div className='flex items-center justify-between mb-4'>
                      <h2 className='text-lg font-semibold text-gray-900'>
                        Attendee Details ({ticketCount} Tickets)
                      </h2>
                    </div>

                    {/* Same Email for All Option */}
                    <div className='bg-gray-50 p-4 rounded-lg mb-4'>
                      <label className='flex items-center gap-3 cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={sameEmail}
                          onChange={(e) => setSameEmail(e.target.checked)}
                          className='w-4 h-4 accent-black'
                        />
                        <div>
                          <p className='font-medium text-gray-900'>Send all tickets to the same email</p>
                          <p className='text-sm text-gray-600'>All tickets will be sent to your email address</p>
                        </div>
                      </label>
                    </div>

                    {/* Attendee Forms */}
                    <div className='space-y-6'>
                      {attendees.map((attendee, index) => (
                        <div key={index} className='border border-gray-200 rounded-lg p-4'>
                          <div className='flex items-center gap-2 mb-4'>
                            <IoTicketOutline className='text-gray-600' />
                            <h3 className='font-semibold text-gray-900'>Ticket {index + 1}</h3>
                          </div>

                          <div className='space-y-4'>
                            <div>
                              <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Attendee Name *
                              </label>
                              <input
                                type='text'
                                value={attendee.name}
                                onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                                required
                                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                placeholder='Attendee full name'
                              />
                            </div>

                            {!sameEmail && (
                              <>
                                <div>
                                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Email Address *
                                  </label>
                                  <input
                                    type='email'
                                    value={attendee.email}
                                    onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                                    required
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                    placeholder='attendee@example.com'
                                  />
                                </div>

                                <div>
                                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Phone Number (Optional)
                                  </label>
                                  <input
                                    type='tel'
                                    value={attendee.phone}
                                    onChange={(e) => handleAttendeeChange(index, 'phone', e.target.value)}
                                    className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                                    placeholder='+234 123 456 7890'
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className='pt-4'>
                  <button
                    type='submit'
                    className='w-full bg-black text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition'
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-lg p-6 sticky top-4'>
              <h2 className='text-xl font-bold text-gray-900 mb-4'>Order Summary</h2>

              {/* Event Details */}
              <div className='space-y-3 pb-4 border-b border-gray-200'>
                <h3 className='font-semibold text-gray-900'>{orderDetails.eventName}</h3>
                <div className='space-y-1 text-sm text-gray-600'>
                  <p>📅 {orderDetails.eventDate}</p>
                  <p>🕐 {orderDetails.eventTime}</p>
                  <p>📍 {orderDetails.location}</p>
                </div>
              </div>

              {/* Ticket Details */}
              <div className='py-4 border-b border-gray-200'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-gray-700'>{orderDetails.ticketType}</span>
                  <span className='font-medium text-gray-900'>₦{orderDetails.ticketPrice.toLocaleString()}</span>
                </div>
                <div className='flex justify-between items-center text-sm text-gray-600'>
                  <span>Quantity</span>
                  <span>x {orderDetails.quantity}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className='py-4 border-b border-gray-200 space-y-2'>
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal</span>
                  <span>₦{orderDetails.subtotal.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Service Fee</span>
                  <span>₦{orderDetails.serviceFee.toLocaleString()}</span>
                </div>
              </div>

              {/* Total */}
              <div className='pt-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-bold text-gray-900'>Total</span>
                  <span className='text-2xl font-bold text-gray-900'>₦{orderDetails.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className='mt-6 bg-gray-50 p-4 rounded-lg'>
                <div className='flex items-start gap-3'>
                  <IoCheckmarkCircle className='text-green-600 text-xl flex-shrink-0 mt-0.5' />
                  <div>
                    <p className='text-sm font-medium text-gray-900'>Secure Checkout</p>
                    <p className='text-xs text-gray-600 mt-1'>Your information is protected with SSL encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className='mt-8 text-center'>
          <Link href='/event-details' onClick={() => router.back()} className='text-gray-600 hover:text-gray-900 font-medium'>
            ← Back to Event Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Page