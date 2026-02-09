"use client"

import { SelectContent, Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import { 
  IoPersonOutline, 
  IoBusinessOutline, 
  IoLockClosedOutline, 
  IoNotificationsOutline, 
  IoCardOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoGlobeOutline
} from 'react-icons/io5'

const OrganizerSettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+234 123 456 7890',
    bio: 'Professional event organizer with 5+ years of experience.',
    website: 'https://johnevents.com',
    facebook: 'johnevents',
    twitter: 'johnevents',
    instagram: 'johnevents'
  })

  // Organization Settings State
  const [organizationData, setOrganizationData] = useState({
    organizationName: 'John Events Ltd',
    businessType: 'company',
    taxId: '12345678',
    address: '123 Business Street',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    postalCode: '100001',
    businessEmail: 'info@johnevents.com',
    businessPhone: '+234 098 765 4321'
  })

  // Password Settings State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newBooking: true,
    eventReminders: true,
    payoutNotifications: true,
    marketingEmails: false,
    attendeeMessages: true,
    eventUpdates: true
  })

  // Payout Settings State
  const [payoutData, setPayoutData] = useState({
    accountName: 'John Events Ltd',
    bankName: 'First Bank',
    accountNumber: '1234567890',
    payoutSchedule: 'weekly'
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOrganizationData({
      ...organizationData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleNotificationToggle = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    })
  }

  const handlePayoutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPayoutData({
      ...payoutData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    setSaveSuccess(true)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const sections = [
    { id: 'profile', name: 'Profile Information', icon: IoPersonOutline },
    { id: 'organization', name: 'Organization Details', icon: IoBusinessOutline },
    { id: 'password', name: 'Password & Security', icon: IoLockClosedOutline },
    { id: 'notifications', name: 'Notifications', icon: IoNotificationsOutline },
    { id: 'payout', name: 'Payout Settings', icon: IoCardOutline },
    { id: 'legal', name: 'Legal & Compliance', icon: IoDocumentTextOutline }
  ]

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Organizer Settings</h1>
        <p className='text-gray-600'>Manage your organizer account and preferences</p>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className='mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3'>
          <IoCheckmarkCircle className='text-green-600 text-2xl' />
          <p className='text-green-800 font-medium'>Settings saved successfully!</p>
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Settings Navigation */}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-xl shadow-sm p-4 space-y-1 sticky top-4'>
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left ${
                    activeSection === section.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className='text-xl' />
                  <span className='font-medium text-sm'>{section.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className='lg:col-span-3'>
          <div className='bg-white rounded-xl shadow-sm p-6 sm:p-8'>
            
            {/* Profile Information Section */}
            {activeSection === 'profile' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Profile Information</h2>
                
                <form onSubmit={handleSaveProfile} className='space-y-6'>
                  {/* Profile Picture */}
                  <div className='flex items-center gap-6 pb-6 border-b border-gray-200'>
                    <div className='w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center'>
                      <IoPersonOutline className='text-4xl text-gray-500' />
                    </div>
                    <div>
                      <button type='button' className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm'>
                        Change Photo
                      </button>
                      <p className='text-xs text-gray-500 mt-2'>JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>First Name</label>
                      <input
                        type='text'
                        name='firstName'
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Last Name</label>
                      <input
                        type='text'
                        name='lastName'
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                      <input
                        type='email'
                        name='email'
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                      <input
                        type='tel'
                        name='phone'
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Bio</label>
                    <textarea
                      name='bio'
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows={4}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none'
                      placeholder='Tell attendees about yourself...'
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Website</label>
                    <input
                      type='url'
                      name='website'
                      value={profileData.website}
                      onChange={handleProfileChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      placeholder='https://yourwebsite.com'
                    />
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Social Media Links</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Facebook</label>
                        <input
                          type='text'
                          name='facebook'
                          value={profileData.facebook}
                          onChange={handleProfileChange}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                          placeholder='username'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Twitter</label>
                        <input
                          type='text'
                          name='twitter'
                          value={profileData.twitter}
                          onChange={handleProfileChange}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                          placeholder='@username'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Instagram</label>
                        <input
                          type='text'
                          name='instagram'
                          value={profileData.instagram}
                          onChange={handleProfileChange}
                          className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                          placeholder='@username'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className='flex justify-end pt-4'>
                    <button
                      type='submit'
                      className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Organization Details Section */}
            {activeSection === 'organization' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Organization Details</h2>
                
                <form onSubmit={handleSaveProfile} className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Organization Name</label>
                    <input
                      type='text'
                      name='organizationName'
                      value={organizationData.organizationName}
                      onChange={handleOrganizationChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Business Type</label>
                      <select
                        name='businessType'
                        value={organizationData.businessType}
                        onChange={handleOrganizationChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      >
                        <option value='individual'>Individual</option>
                        <option value='company'>Company</option>
                        <option value='nonprofit'>Non-Profit</option>
                      </select>
                      <Select>
                        <SelectTrigger className="w-full max-w-48">
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Tax ID / Business Number</label>
                      <input
                        type='text'
                        name='taxId'
                        value={organizationData.taxId}
                        onChange={handleOrganizationChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Business Address</label>
                    <input
                      type='text'
                      name='address'
                      value={organizationData.address}
                      onChange={handleOrganizationChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
                      <input
                        type='text'
                        name='city'
                        value={organizationData.city}
                        onChange={handleOrganizationChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>State</label>
                      <input
                        type='text'
                        name='state'
                        value={organizationData.state}
                        onChange={handleOrganizationChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
                      <input
                        type='text'
                        name='country'
                        value={organizationData.country}
                        onChange={handleOrganizationChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Postal Code</label>
                      <input
                        type='text'
                        name='postalCode'
                        value={organizationData.postalCode}
                        onChange={handleOrganizationChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Business Email</label>
                      <input
                        type='email'
                        name='businessEmail'
                        value={organizationData.businessEmail}
                        onChange={handleOrganizationChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Business Phone</label>
                      <input
                        type='tel'
                        name='businessPhone'
                        value={organizationData.businessPhone}
                        onChange={handleOrganizationChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className='flex justify-end pt-4'>
                    <button
                      type='submit'
                      className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'
                    >
                      Save Organization Details
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Password & Security Section */}
            {activeSection === 'password' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Password & Security</h2>
                
                <form onSubmit={handleSavePassword} className='space-y-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Current Password</label>
                    <div className='relative'>
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        name='currentPassword'
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                        className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                      <button
                        type='button'
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className='absolute inset-y-0 right-0 pr-4 flex items-center'
                      >
                        {showCurrentPassword ? (
                          <IoEyeOffOutline className='text-gray-400 text-xl' />
                        ) : (
                          <IoEyeOutline className='text-gray-400 text-xl' />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>New Password</label>
                    <div className='relative'>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        name='newPassword'
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={8}
                        className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                      <button
                        type='button'
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className='absolute inset-y-0 right-0 pr-4 flex items-center'
                      >
                        {showNewPassword ? (
                          <IoEyeOffOutline className='text-gray-400 text-xl' />
                        ) : (
                          <IoEyeOutline className='text-gray-400 text-xl' />
                        )}
                      </button>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>Must be at least 8 characters</p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm New Password</label>
                    <div className='relative'>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name='confirmPassword'
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                        className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                      <button
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className='absolute inset-y-0 right-0 pr-4 flex items-center'
                      >
                        {showConfirmPassword ? (
                          <IoEyeOffOutline className='text-gray-400 text-xl' />
                        ) : (
                          <IoEyeOutline className='text-gray-400 text-xl' />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className='border-t border-gray-200 pt-6 mt-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Two-Factor Authentication</h3>
                    <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                      <div>
                        <p className='font-medium text-gray-900'>Enable 2FA</p>
                        <p className='text-sm text-gray-600'>Add an extra layer of security to your account</p>
                      </div>
                      <button type='button' className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition font-medium text-sm'>
                        Enable
                      </button>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className='flex justify-end pt-4'>
                    <button
                      type='submit'
                      className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Notification Preferences</h2>
                
                <div className='space-y-6'>
                  {/* Email Notifications */}
                  <div className='border-b border-gray-200 pb-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Email Notifications</h3>
                    <div className='space-y-4'>
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                        { key: 'newBooking', label: 'New Bookings', desc: 'Get notified when someone books a ticket' },
                        { key: 'eventReminders', label: 'Event Reminders', desc: 'Reminders about your upcoming events' },
                        { key: 'payoutNotifications', label: 'Payout Notifications', desc: 'Updates about your payouts' },
                        { key: 'attendeeMessages', label: 'Attendee Messages', desc: 'Messages from your attendees' },
                        { key: 'eventUpdates', label: 'Event Updates', desc: 'Important updates about your events' },
                        { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Tips and best practices for organizers' }
                      ].map((item) => (
                        <div key={item.key} className='flex items-center justify-between'>
                          <div>
                            <p className='font-medium text-gray-900'>{item.label}</p>
                            <p className='text-sm text-gray-600'>{item.desc}</p>
                          </div>
                          <label className='relative inline-flex items-center cursor-pointer'>
                            <input
                              type='checkbox'
                              checked={notifications[item.key as keyof typeof notifications]}
                              onChange={() => handleNotificationToggle(item.key)}
                              className='sr-only peer'
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SMS Notifications */}
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>SMS Notifications</h3>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-medium text-gray-900'>SMS Notifications</p>
                        <p className='text-sm text-gray-600'>Receive important updates via SMS</p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notifications.smsNotifications}
                          onChange={() => handleNotificationToggle('smsNotifications')}
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className='flex justify-end pt-4'>
                    <button
                      onClick={() => {
                        setSaveSuccess(true)
                        setTimeout(() => setSaveSuccess(false), 3000)
                      }}
                      className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Payout Settings Section */}
            {activeSection === 'payout' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Payout Settings</h2>
                
                <form onSubmit={handleSaveProfile} className='space-y-6'>
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
                    <p className='text-sm text-blue-800'>
                      <strong>Note:</strong> Payouts are processed according to your selected schedule. Ensure your bank details are correct to avoid delays.
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Account Name</label>
                    <input
                      type='text'
                      name='accountName'
                      value={payoutData.accountName}
                      onChange={handlePayoutChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    />
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Bank Name</label>
                      <select
                        name='bankName'
                        value={payoutData.bankName}
                        onChange={handlePayoutChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      >
                        <option value='First Bank'>First Bank</option>
                        <option value='GTBank'>GTBank</option>
                        <option value='Access Bank'>Access Bank</option>
                        <option value='Zenith Bank'>Zenith Bank</option>
                        <option value='UBA'>UBA</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Account Number</label>
                      <input
                        type='text'
                        name='accountNumber'
                        value={payoutData.accountNumber}
                        onChange={handlePayoutChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Payout Schedule</label>
                    <select
                      name='payoutSchedule'
                      value={payoutData.payoutSchedule}
                      onChange={handlePayoutChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    >
                      <option value='daily'>Daily</option>
                      <option value='weekly'>Weekly</option>
                      <option value='biweekly'>Bi-Weekly</option>
                      <option value='monthly'>Monthly</option>
                    </select>
                  </div>

                  {/* Payout History Link */}
                  <div className='border-t border-gray-200 pt-6'>
                    <button type='button' className='text-black hover:text-gray-700 font-medium'>
                      View Payout History →
                    </button>
                  </div>

                  {/* Save Button */}
                  <div className='flex justify-end pt-4'>
                    <button
                      type='submit'
                      className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-semibold'
                    >
                      Save Payout Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Legal & Compliance Section */}
            {activeSection === 'legal' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Legal & Compliance</h2>
                
                <div className='space-y-6'>
                  <div className='bg-gray-50 border border-gray-200 rounded-lg p-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Terms & Policies</h3>
                    <div className='space-y-3'>
                      <button className='w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <IoDocumentTextOutline className='text-xl text-gray-600' />
                          <div>
                            <p className='font-medium text-gray-900'>Terms of Service</p>
                            <p className='text-sm text-gray-600'>Review our organizer terms</p>
                          </div>
                        </div>
                        <span className='text-gray-400'>→</span>
                      </button>

                      <button className='w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <IoShieldCheckmarkOutline className='text-xl text-gray-600' />
                          <div>
                            <p className='font-medium text-gray-900'>Privacy Policy</p>
                            <p className='text-sm text-gray-600'>How we handle your data</p>
                          </div>
                        </div>
                        <span className='text-gray-400'>→</span>
                      </button>

                      <button className='w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <IoGlobeOutline className='text-xl text-gray-600' />
                          <div>
                            <p className='font-medium text-gray-900'>Refund Policy</p>
                            <p className='text-sm text-gray-600'>Set your refund policies</p>
                          </div>
                        </div>
                        <span className='text-gray-400'>→</span>
                      </button>
                    </div>
                  </div>

                  {/* Tax Information */}
                  <div className='bg-gray-50 border border-gray-200 rounded-lg p-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Tax Information</h3>
                    <p className='text-sm text-gray-600 mb-4'>
                      Download your tax documents and statements for the current year
                    </p>
                    <button className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
                      Download Tax Forms
                    </button>
                  </div>

                  {/* Account Closure */}
                  <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
                    <h3 className='text-lg font-semibold text-red-900 mb-2'>Close Organizer Account</h3>
                    <p className='text-sm text-red-700 mb-4'>
                      Once you close your organizer account, all your events will be deactivated and you won't be able to create new events.
                    </p>
                    <button className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm'>
                      Close Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizerSettingsPage