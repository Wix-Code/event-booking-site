"use client"

import React, { useState } from 'react'
import {
  IoSettingsOutline,
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
  IoNotificationsOutline,
  IoCardOutline,
  IoGlobeOutline
} from 'react-icons/io5'
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const AdminSettingsPage = () => {
  const [activeSection, setActiveSection] = useState('general')
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Events Nigeria',
    siteEmail: 'support@events.ng',
    sitePhone: '+234 123 456 7890',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
  })

  const [platformSettings, setPlatformSettings] = useState({
    platformFeePercentage: 5,
    minTicketPrice: 500,
    maxTicketPrice: 1000000,
    autoApproveEvents: false,
    autoApproveOrganizers: false,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    paystackPublicKey: 'pk_test_xxxxxxxxxxxxxxx',
    paystackSecretKey: 'sk_test_xxxxxxxxxxxxxxx',
    flutterwavePublicKey: 'FLWPUBK_TEST-xxxxxxxxxxxxxxx',
    enablePaystack: true,
    enableFlutterwave: false,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@events.ng',
    smtpPassword: '••••••••••••',
    fromName: 'Events Nigeria',
    fromEmail: 'noreply@events.ng',
  })

  const sections = [
    { id: 'general', name: 'General Settings', icon: IoSettingsOutline },
    { id: 'platform', name: 'Platform Settings', icon: IoShieldCheckmarkOutline },
    { id: 'payment', name: 'Payment Gateways', icon: IoCardOutline },
    { id: 'email', name: 'Email Configuration', icon: IoNotificationsOutline },
    { id: 'seo', name: 'SEO & Meta', icon: IoGlobeOutline },
  ]

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Platform Settings</h1>
        <p className='text-gray-600'>Configure platform-wide settings</p>
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
                      ? 'bg-red-600 text-white'
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
            
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>General Settings</h2>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Site Name
                  </label>
                  <input
                    type='text'
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Support Email
                    </label>
                    <input
                      type='email'
                      value={generalSettings.siteEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteEmail: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Support Phone
                    </label>
                    <input
                      type='tel'
                      value={generalSettings.sitePhone}
                      onChange={(e) => setGeneralSettings({...generalSettings, sitePhone: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                </div>

                <div className='space-y-4 pt-6 border-t border-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-gray-900'>Maintenance Mode</p>
                      <p className='text-sm text-gray-600'>Disable public access to the platform</p>
                    </div>
                    <Switch
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                    />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-gray-900'>Allow User Registration</p>
                      <p className='text-sm text-gray-600'>Enable new users to sign up</p>
                    </div>
                    <Switch
                      checked={generalSettings.allowRegistration}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, allowRegistration: checked})}
                    />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-gray-900'>Require Email Verification</p>
                      <p className='text-sm text-gray-600'>Users must verify email before access</p>
                    </div>
                    <Switch
                      checked={generalSettings.requireEmailVerification}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, requireEmailVerification: checked})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Platform Settings */}
            {activeSection === 'platform' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Platform Settings</h2>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Platform Fee (%)
                  </label>
                  <input
                    type='number'
                    value={platformSettings.platformFeePercentage}
                    onChange={(e) => setPlatformSettings({...platformSettings, platformFeePercentage: parseFloat(e.target.value)})}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    min='0'
                    max='100'
                    step='0.1'
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Minimum Ticket Price (₦)
                    </label>
                    <input
                      type='number'
                      value={platformSettings.minTicketPrice}
                      onChange={(e) => setPlatformSettings({...platformSettings, minTicketPrice: parseInt(e.target.value)})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Maximum Ticket Price (₦)
                    </label>
                    <input
                      type='number'
                      value={platformSettings.maxTicketPrice}
                      onChange={(e) => setPlatformSettings({...platformSettings, maxTicketPrice: parseInt(e.target.value)})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                </div>

                <div className='space-y-4 pt-6 border-t border-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-gray-900'>Auto-Approve Events</p>
                      <p className='text-sm text-gray-600'>Automatically approve new events</p>
                    </div>
                    <Switch
                      checked={platformSettings.autoApproveEvents}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, autoApproveEvents: checked})}
                    />
                  </div>

                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='font-medium text-gray-900'>Auto-Approve Organizers</p>
                      <p className='text-sm text-gray-600'>Automatically verify new organizers</p>
                    </div>
                    <Switch
                      checked={platformSettings.autoApproveOrganizers}
                      onCheckedChange={(checked) => setPlatformSettings({...platformSettings, autoApproveOrganizers: checked})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeSection === 'payment' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Payment Gateways</h2>

                <div className='border border-gray-200 rounded-lg p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>Paystack</h3>
                    <Switch
                      checked={paymentSettings.enablePaystack}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enablePaystack: checked})}
                    />
                  </div>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Public Key
                      </label>
                      <input
                        type='text'
                        value={paymentSettings.paystackPublicKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paystackPublicKey: e.target.value})}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Secret Key
                      </label>
                      <input
                        type='password'
                        value={paymentSettings.paystackSecretKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paystackSecretKey: e.target.value})}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                      />
                    </div>
                  </div>
                </div>

                <div className='border border-gray-200 rounded-lg p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg font-semibold text-gray-900'>Flutterwave</h3>
                    <Switch
                      checked={paymentSettings.enableFlutterwave}
                      onCheckedChange={(checked) => setPaymentSettings({...paymentSettings, enableFlutterwave: checked})}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Public Key
                    </label>
                    <input
                      type='text'
                      value={paymentSettings.flutterwavePublicKey}
                      onChange={(e) => setPaymentSettings({...paymentSettings, flutterwavePublicKey: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeSection === 'email' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>Email Configuration</h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      SMTP Host
                    </label>
                    <input
                      type='text'
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      SMTP Port
                    </label>
                    <input
                      type='text'
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      SMTP Username
                    </label>
                    <input
                      type='text'
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      SMTP Password
                    </label>
                    <input
                      type='password'
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      From Name
                    </label>
                    <input
                      type='text'
                      value={emailSettings.fromName}
                      onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      From Email
                    </label>
                    <input
                      type='email'
                      value={emailSettings.fromEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    />
                  </div>
                </div>

                <button className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold'>
                  Send Test Email
                </button>
              </div>
            )}

            {/* SEO Settings */}
            {activeSection === 'seo' && (
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>SEO & Meta Tags</h2>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Meta Title
                  </label>
                  <input
                    type='text'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    placeholder='Events Nigeria - Discover Amazing Events'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Meta Description
                  </label>
                  <Textarea
                    rows={3}
                    className='resize-none'
                    placeholder='Discover and book tickets to the best events in Nigeria...'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Meta Keywords
                  </label>
                  <input
                    type='text'
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                    placeholder='events, tickets, nigeria, concerts, festivals'
                  />
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className='flex justify-end pt-6 border-t border-gray-200 mt-8'>
              <button
                onClick={handleSave}
                className='px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettingsPage