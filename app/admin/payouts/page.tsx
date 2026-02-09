"use client"

import React, { useState } from 'react'
import {
  IoWalletOutline,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCloseCircle,
  IoEyeOutline
} from 'react-icons/io5'

const AdminPayoutsPage = () => {
  const [activeTab, setActiveTab] = useState('all')

  const payouts = [
    {
      id: 1,
      organizerName: 'John Events Ltd',
      amount: 1250000,
      platformFee: 62500,
      netAmount: 1187500,
      status: 'completed',
      period: 'Jan 1 - Jan 31, 2026',
      events: 5,
      bankName: 'First Bank',
      accountNumber: '****7890',
      processedDate: '2026-02-05',
      createdDate: '2026-02-01'
    },
    {
      id: 2,
      organizerName: 'Sarah Music Productions',
      amount: 890000,
      platformFee: 44500,
      netAmount: 845500,
      status: 'processing',
      period: 'Feb 1 - Feb 7, 2026',
      events: 3,
      bankName: 'GTBank',
      accountNumber: '****1234',
      processedDate: null,
      createdDate: '2026-02-08'
    },
    {
      id: 3,
      organizerName: 'Mike Seminars',
      amount: 450000,
      platformFee: 22500,
      netAmount: 427500,
      status: 'pending',
      period: 'Feb 8 - Feb 14, 2026',
      events: 2,
      bankName: 'Access Bank',
      accountNumber: '****5678',
      processedDate: null,
      createdDate: '2026-02-15'
    },
    {
      id: 4,
      organizerName: 'Laugh Hub Entertainment',
      amount: 150000,
      platformFee: 7500,
      netAmount: 142500,
      status: 'failed',
      period: 'Dec 15 - Dec 21, 2025',
      events: 1,
      bankName: 'UBA',
      accountNumber: '****9012',
      processedDate: null,
      createdDate: '2025-12-22'
    }
  ]

  const filteredPayouts = payouts.filter(payout => {
    if (activeTab === 'all') return true
    return payout.status === activeTab
  })

  const totalPayouts = payouts.reduce((sum, p) => sum + p.amount, 0)
  const totalFees = payouts.reduce((sum, p) => sum + p.platformFee, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: IoCheckmarkCircle }
      case 'processing':
        return { bg: 'bg-blue-100', text: 'text-blue-800', icon: IoTimeOutline }
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: IoTimeOutline }
      case 'failed':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: IoCloseCircle }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: IoTimeOutline }
    }
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Payouts Management</h1>
        <p className='text-gray-600'>Manage organizer payouts and transfers</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Payouts</p>
          <p className='text-3xl font-bold text-gray-900'>₦{totalPayouts.toLocaleString()}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Platform Fees</p>
          <p className='text-3xl font-bold text-green-600'>₦{totalFees.toLocaleString()}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Pending</p>
          <p className='text-3xl font-bold text-yellow-600'>{payouts.filter(p => p.status === 'pending').length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Completed</p>
          <p className='text-3xl font-bold text-gray-900'>{payouts.filter(p => p.status === 'completed').length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className='bg-white rounded-xl shadow-sm mb-6'>
        <div className='border-b border-gray-200'>
          <div className='flex overflow-x-auto'>
            {['all', 'pending', 'processing', 'completed', 'failed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition whitespace-nowrap capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-red-600 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab} ({payouts.filter(p => tab === 'all' || p.status === tab).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payouts List */}
      <div className='space-y-4'>
        {filteredPayouts.map((payout) => {
          const statusInfo = getStatusBadge(payout.status)
          const StatusIcon = statusInfo.icon
          
          return (
            <div key={payout.id} className='bg-white rounded-xl shadow-sm p-6'>
              <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <h3 className='text-xl font-bold text-gray-900'>{payout.organizerName}</h3>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusInfo.bg} ${statusInfo.text}`}>
                      <StatusIcon className='text-sm' />
                      {payout.status}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600'>Period: {payout.period}</p>
                  <p className='text-sm text-gray-600'>{payout.events} events included</p>
                </div>

                <div className='text-right'>
                  <p className='text-sm text-gray-600 mb-1'>Net Amount</p>
                  <p className='text-3xl font-bold text-gray-900'>₦{payout.netAmount.toLocaleString()}</p>
                  <p className='text-xs text-gray-500'>Gross: ₦{payout.amount.toLocaleString()}</p>
                  <p className='text-xs text-green-600'>Fee: ₦{payout.platformFee.toLocaleString()}</p>
                </div>
              </div>

              <div className='border-t border-gray-100 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm'>
                <div>
                  <p className='text-gray-600 mb-1'>Bank</p>
                  <p className='font-medium text-gray-900'>{payout.bankName}</p>
                </div>
                <div>
                  <p className='text-gray-600 mb-1'>Account</p>
                  <p className='font-medium text-gray-900'>{payout.accountNumber}</p>
                </div>
                <div>
                  <p className='text-gray-600 mb-1'>Created</p>
                  <p className='font-medium text-gray-900'>{payout.createdDate}</p>
                </div>
                {payout.processedDate && (
                  <div>
                    <p className='text-gray-600 mb-1'>Processed</p>
                    <p className='font-medium text-gray-900'>{payout.processedDate}</p>
                  </div>
                )}
              </div>

              <div className='border-t border-gray-100 pt-4 mt-4 flex items-center gap-3'>
                <button className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
                  <IoEyeOutline />
                  View Details
                </button>
                {payout.status === 'pending' && (
                  <button className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm'>
                    <IoCheckmarkCircle />
                    Process Payout
                  </button>
                )}
                {payout.status === 'failed' && (
                  <button className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm'>
                    Retry Payout
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminPayoutsPage