"use client"

import React, { useState } from 'react'
import { 
  IoPersonOutline, 
  IoLockClosedOutline, 
  IoNotificationsOutline, 
  IoCardOutline,
  IoShieldCheckmarkOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircle
} from 'react-icons/io5'

const Page = () => {
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
    dateOfBirth: '1995-05-15',
    gender: 'male',
    address: '123 Street Name, Lagos',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria'
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
    eventReminders: true,
    promotionalEmails: true,
    newEventsInArea: true,
    ticketUpdates: true,
    weeklyNewsletter: false
  })

  // Privacy Settings State
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessaging: true,
    dataSharing: false
  })

  const handleProfileChange = (e: any) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordChange = (e:any) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  // const handleNotificationToggle = (key: any) => {
  //   setNotifications({
  //     ...notifications,
  //     [key]: !notifications[key]
  //   })
  // }

  const handlePrivacyChange = (key: any, value: any) => {
    setPrivacy({
      ...privacy,
      [key]: value
    })
  }

  const handleSaveProfile = (e: any) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleSavePassword = (e: any) => {
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
    { id: 'password', name: 'Password & Security', icon: IoLockClosedOutline },
    //{ id: 'notifications', name: 'Notifications', icon: IoNotificationsOutline },
    //{ id: 'payment', name: 'Payment Methods', icon: IoCardOutline },
    { id: 'privacy', name: 'Privacy & Data', icon: IoShieldCheckmarkOutline }
  ]

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Settings</h1>
        <p className='text-gray-600'>Manage your account settings and preferences</p>
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
                  className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition text-left ${
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

                  {/* Date of Birth & Gender */}
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Date of Birth</label>
                      <input
                        type='date'
                        name='dateOfBirth'
                        value={profileData.dateOfBirth}
                        onChange={handleProfileChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Gender</label>
                      <select
                        name='gender'
                        value={profileData.gender}
                        onChange={handleProfileChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      >
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='other'>Other</option>
                        <option value='prefer-not-to-say'>Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
                    <input
                      type='text'
                      name='address'
                      value={profileData.address}
                      onChange={handleProfileChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                    />
                  </div>

                  {/* City, State, Country */}
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
                      <input
                        type='text'
                        name='city'
                        value={profileData.city}
                        onChange={handleProfileChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>State</label>
                      <input
                        type='text'
                        name='state'
                        value={profileData.state}
                        onChange={handleProfileChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Country</label>
                      <input
                        type='text'
                        name='country'
                        value={profileData.country}
                        onChange={handleProfileChange}
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
                      Save Changes
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

            {/* Notifications Section
            {activeSection === 'notifications' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Notification Preferences</h2>
                
                <div className='space-y-6'>
                  
                  <div className='border-b border-gray-200 pb-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Email Notifications</h3>
                    <div className='space-y-4'>
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                        { key: 'eventReminders', label: 'Event Reminders', desc: 'Get reminders about upcoming events' },
                        { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Receive special offers and promotions' },
                        { key: 'newEventsInArea', label: 'New Events in Your Area', desc: 'Get notified about new events near you' },
                        { key: 'ticketUpdates', label: 'Ticket Updates', desc: 'Updates about your booked tickets' },
                        { key: 'weeklyNewsletter', label: 'Weekly Newsletter', desc: 'Receive our weekly event highlights' }
                      ].map((item) => (
                        <div key={item.key} className='flex items-center justify-between'>
                          <div>
                            <p className='font-medium text-gray-900'>{item.label}</p>
                            <p className='text-sm text-gray-600'>{item.desc}</p>
                          </div>
                          <label className='relative inline-flex items-center cursor-pointer'>
                            <input
                              type='checkbox'
                              checked={notifications[item.key]}
                              onChange={() => handleNotificationToggle(item.key)}
                              className='sr-only peer'
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

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
            )} */}

            {/* Privacy & Data Section */}
            {activeSection === 'privacy' && (
              <div>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Privacy & Data</h2>
                
                <div className='space-y-6'>
                  {/* Profile Visibility */}
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Profile Visibility</h3>
                    <div className='space-y-3'>
                      {['public', 'private', 'friends'].map((option) => (
                        <label key={option} className='flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50'>
                          <input
                            type='radio'
                            name='profileVisibility'
                            checked={privacy.profileVisibility === option}
                            onChange={() => handlePrivacyChange('profileVisibility', option)}
                            className='w-4 h-4 accent-black'
                          />
                          <div>
                            <p className='font-medium text-gray-900 capitalize'>{option}</p>
                            <p className='text-sm text-gray-600'>
                              {option === 'public' && 'Anyone can see your profile'}
                              {option === 'private' && 'Only you can see your profile'}
                              {option === 'friends' && 'Only your connections can see your profile'}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className='border-t border-gray-200 pt-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Contact Information Display</h3>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='font-medium text-gray-900'>Show Email Address</p>
                          <p className='text-sm text-gray-600'>Let others see your email on your profile</p>
                        </div>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            checked={privacy.showEmail}
                            onChange={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                            className='sr-only peer'
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='font-medium text-gray-900'>Show Phone Number</p>
                          <p className='text-sm text-gray-600'>Let others see your phone on your profile</p>
                        </div>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            checked={privacy.showPhone}
                            onChange={() => handlePrivacyChange('showPhone', !privacy.showPhone)}
                            className='sr-only peer'
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='font-medium text-gray-900'>Allow Direct Messaging</p>
                          <p className='text-sm text-gray-600'>Let other users send you messages</p>
                        </div>
                        <label className='relative inline-flex items-center cursor-pointer'>
                          <input
                            type='checkbox'
                            checked={privacy.allowMessaging}
                            onChange={() => handlePrivacyChange('allowMessaging', !privacy.allowMessaging)}
                            className='sr-only peer'
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Data Management */}
                  <div className='border-t border-gray-200 pt-6'>
                    <h3 className='text-lg font-semibold text-gray-900 mb-4'>Data Management</h3>
                    <div className='space-y-3'>
                      <button className='w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition'>
                        <p className='font-medium text-gray-900'>Download Your Data</p>
                        <p className='text-sm text-gray-600'>Get a copy of your account data</p>
                      </button>
                      <button className='w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition'>
                        <p className='font-medium text-red-600'>Delete Your Account</p>
                        <p className='text-sm text-gray-600'>Permanently delete your account and data</p>
                      </button>
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
                      Save Privacy Settings
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

export default Page