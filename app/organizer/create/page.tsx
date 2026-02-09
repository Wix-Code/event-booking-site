"use client"

import React, { useState } from 'react'
import { 
  IoCalendarOutline, 
  IoLocationOutline, 
  IoTicketOutline,
  IoImageOutline,
  IoAddCircleOutline,
  IoTrashOutline,
  IoSaveOutline,
  IoEyeOutline
} from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  minPerOrder: number;
  maxPerOrder: number;
}

const CreateEventPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  
  // Basic Info State
  const [eventData, setEventData] = useState({
    title: '',
    category: '',
    description: '',
    shortDescription: '',
    tags: [] as string[],
  })

  // Date & Time State
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  // Location State
  const [locationType, setLocationType] = useState<'physical' | 'online' | 'hybrid'>('physical')
  const [locationData, setLocationData] = useState({
    venueName: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    onlineLink: ''
  })

  // Event Type
  const [isFreeEvent, setIsFreeEvent] = useState(false)
  
  // Tickets State
  const [tickets, setTickets] = useState<TicketType[]>([])
  
  // Images State
  const [coverImage, setCoverImage] = useState('')
  const [additionalImages, setAdditionalImages] = useState<string[]>([])

  // Settings State
  const [settings, setSettings] = useState({
    maxTicketsPerOrder: 10,
    showAttendeesCount: true,
    requireApproval: false,
    allowWaitlist: false,
  })

  const categories = [
    "Music", "Comedy", "Business", "Technology", "Sports", 
    "Religion", "Seminar", "Workshop", "Conference", "Festival",
    "Networking", "Arts & Culture", "Education", "Food & Drink"
  ]

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationData({
      ...locationData,
      [e.target.name]: e.target.value
    })
  }

  const addTicket = () => {
    const newTicket: TicketType = {
      id: Date.now().toString(),
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      minPerOrder: 1,
      maxPerOrder: 10
    }
    setTickets([...tickets, newTicket])
  }

  const updateTicket = (id: string, field: keyof TicketType, value: any) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, [field]: value } : ticket
    ))
  }

  const removeTicket = (id: string) => {
    setTickets(tickets.filter(ticket => ticket.id !== id))
  }

  const handleSubmit = (status: 'draft' | 'published') => {
    const eventPayload = {
      ...eventData,
      startDate,
      endDate,
      startTime,
      endTime,
      location: {
        type: locationType,
        ...locationData
      },
      isFree: isFreeEvent,
      tickets: isFreeEvent ? [] : tickets,
      coverImage,
      additionalImages,
      settings,
      status
    }
    
    console.log('Event Data:', eventPayload)
    // API call here
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create New Event</h1>
        <p className='text-gray-600'>Fill in the details to create your event</p>
      </div>

      {/* Progress Steps */}
      <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
        <div className='flex items-center justify-between'>
          {[
            { step: 1, label: 'Basic Info' },
            { step: 2, label: 'Date & Time' },
            { step: 3, label: 'Location' },
            { step: 4, label: 'Tickets' },
            { step: 5, label: 'Media & Settings' }
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <div className='flex flex-col items-center'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= item.step 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {item.step}
                </div>
                <span className='text-xs mt-2 text-gray-600 hidden sm:block'>{item.label}</span>
              </div>
              {index < 4 && (
                <div className={`flex-1 h-1 mx-2 ${
                  currentStep > item.step ? 'bg-black' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className='bg-white rounded-xl shadow-sm p-6 sm:p-8'>
        
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Basic Information</h2>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Event Title *
              </label>
              <input
                type='text'
                name='title'
                value={eventData.title}
                onChange={handleBasicInfoChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                placeholder='Enter your event title'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Category *
              </label>
              <Select value={eventData.category} onValueChange={(value) => setEventData({...eventData, category: value})}>
                <SelectTrigger className='w-full h-12'>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Short Description *
              </label>
              <Textarea
                name='shortDescription'
                value={eventData.shortDescription}
                onChange={handleBasicInfoChange}
                rows={2}
                className='resize-none'
                placeholder='Brief summary (visible in event listings)'
                maxLength={150}
              />
              <p className='text-xs text-gray-500 mt-1'>{eventData.shortDescription.length}/150 characters</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Full Description *
              </label>
              <Textarea
                name='description'
                value={eventData.description}
                onChange={handleBasicInfoChange}
                rows={8}
                className='resize-none'
                placeholder='Provide detailed information about your event...'
              />
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === 2 && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Date & Time</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Start Date *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center gap-2",
                        !startDate && "text-gray-500"
                      )}
                    >
                      <IoCalendarOutline className='text-gray-400' />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Start Time *
                </label>
                <input
                  type='time'
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  End Date *
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center gap-2",
                        !endDate && "text-gray-500"
                      )}
                    >
                      <IoCalendarOutline className='text-gray-400' />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date < (startDate || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  End Time *
                </label>
                <input
                  type='time'
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Location</h2>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Event Type *
              </label>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {[
                  { value: 'physical', label: 'Physical Venue', icon: '📍' },
                  { value: 'online', label: 'Online Event', icon: '💻' },
                  { value: 'hybrid', label: 'Hybrid', icon: '🔄' }
                ].map((type) => (
                  <button
                    key={type.value}
                    type='button'
                    onClick={() => setLocationType(type.value as any)}
                    className={`p-4 border-2 rounded-lg transition ${
                      locationType === type.value
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className='text-3xl mb-2'>{type.icon}</div>
                    <p className='font-medium text-gray-900'>{type.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {(locationType === 'physical' || locationType === 'hybrid') && (
              <>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Venue Name *
                  </label>
                  <input
                    type='text'
                    name='venueName'
                    value={locationData.venueName}
                    onChange={handleLocationChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    placeholder='e.g., Eko Convention Center'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Address *
                  </label>
                  <input
                    type='text'
                    name='address'
                    value={locationData.address}
                    onChange={handleLocationChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    placeholder='Street address'
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      City *
                    </label>
                    <input
                      type='text'
                      name='city'
                      value={locationData.city}
                      onChange={handleLocationChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      placeholder='e.g., Lagos'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      State *
                    </label>
                    <input
                      type='text'
                      name='state'
                      value={locationData.state}
                      onChange={handleLocationChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      placeholder='e.g., Lagos State'
                    />
                  </div>
                </div>
              </>
            )}

            {(locationType === 'online' || locationType === 'hybrid') && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Online Event Link *
                </label>
                <input
                  type='url'
                  name='onlineLink'
                  value={locationData.onlineLink}
                  onChange={handleLocationChange}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  placeholder='e.g., https://zoom.us/j/123456789'
                />
                <p className='text-xs text-gray-500 mt-1'>Attendees will receive this link after booking</p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Tickets */}
        {currentStep === 4 && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Tickets & Pricing</h2>

            {/* Free or Paid Toggle */}
            <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'>
              <div>
                <p className='font-medium text-gray-900'>Is this a free event?</p>
                <p className='text-sm text-gray-600'>Toggle to set event as free or paid</p>
              </div>
              <Switch
                checked={isFreeEvent}
                onCheckedChange={setIsFreeEvent}
              />
            </div>

            {!isFreeEvent && (
              <>
                {/* Tickets List */}
                {tickets.length > 0 && (
                  <div className='space-y-4'>
                    {tickets.map((ticket, index) => (
                      <div key={ticket.id} className='border border-gray-200 rounded-lg p-6'>
                        <div className='flex items-center justify-between mb-4'>
                          <h3 className='font-semibold text-gray-900'>Ticket #{index + 1}</h3>
                          <button
                            onClick={() => removeTicket(ticket.id)}
                            className='text-red-600 hover:text-red-700 transition'
                          >
                            <IoTrashOutline className='text-xl' />
                          </button>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Ticket Name *
                            </label>
                            <input
                              type='text'
                              value={ticket.name}
                              onChange={(e) => updateTicket(ticket.id, 'name', e.target.value)}
                              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                              placeholder='e.g., VIP Pass, Regular'
                            />
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Price (₦) *
                            </label>
                            <input
                              type='number'
                              value={ticket.price}
                              onChange={(e) => updateTicket(ticket.id, 'price', parseFloat(e.target.value))}
                              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                              placeholder='0'
                              min='0'
                            />
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Quantity Available *
                            </label>
                            <input
                              type='number'
                              value={ticket.quantity}
                              onChange={(e) => updateTicket(ticket.id, 'quantity', parseInt(e.target.value))}
                              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                              placeholder='0'
                              min='1'
                            />
                          </div>

                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Max Per Order
                            </label>
                            <input
                              type='number'
                              value={ticket.maxPerOrder}
                              onChange={(e) => updateTicket(ticket.id, 'maxPerOrder', parseInt(e.target.value))}
                              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                              placeholder='10'
                              min='1'
                            />
                          </div>

                          <div className='sm:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                              Description
                            </label>
                            <Textarea
                              value={ticket.description}
                              onChange={(e) => updateTicket(ticket.id, 'description', e.target.value)}
                              rows={2}
                              className='resize-none'
                              placeholder='What does this ticket include?'
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Ticket Button */}
                <button
                  onClick={addTicket}
                  className='w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition font-medium text-gray-700'
                >
                  <IoAddCircleOutline className='text-2xl' />
                  Add Ticket Type
                </button>
              </>
            )}

            {isFreeEvent && (
              <div className='text-center py-12 bg-gray-50 rounded-lg border border-gray-200'>
                <IoTicketOutline className='text-6xl text-gray-300 mx-auto mb-4' />
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>Free Event</h3>
                <p className='text-gray-600'>No tickets needed for free events</p>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Media & Settings */}
        {currentStep === 5 && (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Media & Settings</h2>

            {/* Cover Image */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Cover Image *
              </label>
              <div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-black transition'>
                {coverImage ? (
                  <div className='relative'>
                    <img src={coverImage} alt='Cover' className='max-h-64 mx-auto rounded-lg' />
                    <button
                      onClick={() => setCoverImage('')}
                      className='absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700'
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                ) : (
                  <>
                    <IoImageOutline className='text-6xl text-gray-300 mx-auto mb-4' />
                    <p className='text-gray-600 mb-2'>Click to upload cover image</p>
                    <p className='text-xs text-gray-500'>Recommended: 1920x1080px (JPG, PNG)</p>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setCoverImage(reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className='hidden'
                      id='cover-upload'
                    />
                    <label htmlFor='cover-upload' className='mt-4 inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer'>
                      Upload Image
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Event Settings */}
            <div className='border-t border-gray-200 pt-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Event Settings</h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-gray-900'>Show Attendees Count</p>
                    <p className='text-sm text-gray-600'>Display number of attendees publicly</p>
                  </div>
                  <Switch
                    checked={settings.showAttendeesCount}
                    onCheckedChange={(checked) => setSettings({...settings, showAttendeesCount: checked})}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-gray-900'>Require Approval</p>
                    <p className='text-sm text-gray-600'>Manually approve each booking</p>
                  </div>
                  <Switch
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) => setSettings({...settings, requireApproval: checked})}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-gray-900'>Allow Waitlist</p>
                    <p className='text-sm text-gray-600'>Enable waitlist when sold out</p>
                  </div>
                  <Switch
                    checked={settings.allowWaitlist}
                    onCheckedChange={(checked) => setSettings({...settings, allowWaitlist: checked})}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Max Tickets Per Order
                  </label>
                  <input
                    type='number'
                    value={settings.maxTicketsPerOrder}
                    onChange={(e) => setSettings({...settings, maxTicketsPerOrder: parseInt(e.target.value)})}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    min='1'
                    max='50'
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className='flex items-center justify-between mt-8 pt-6 border-t border-gray-200'>
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
          >
            ← Previous
          </button>

          <div className='flex gap-3'>
            {currentStep === 5 ? (
              <>
                <button
                  onClick={() => handleSubmit('draft')}
                  className='flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold'
                >
                  <IoSaveOutline className='text-xl' />
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSubmit('published')}
                  className='flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'
                >
                  <IoEyeOutline className='text-xl' />
                  Publish Event
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEventPage