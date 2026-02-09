"use client"

import React, { useState } from 'react'
import { 
  IoWalletOutline, 
  IoCheckmarkCircle,
  IoTimeOutline,
  IoCloseCircle,
  IoDownloadOutline,
  IoCalendarOutline,
  IoCardOutline
} from 'react-icons/io5'

const PayoutsPage = () => {
  const [activeTab, setActiveTab] = useState('all')

  // Payout data
  const payouts = [
    {
      id: 1,
      amount: 1250000,
      status: 'completed',
      periodStart: '2026-01-01',
      periodEnd: '2026-01-31',
      events: [
        { name: 'Music Festival Lagos', revenue: 750000, tickets: 300 },
        { name: 'Campus Connect 2.0', revenue: 500000, tickets: 50 }
      ],
      accountName: 'John Events Ltd',
      bankName: 'First Bank',
      accountNumber: '****7890',
      transactionId: 'TXN-2026-001',
      paidAt: '2026-02-05T10:30:00',
      createdAt: '2026-02-01T00:00:00'
    },
    {
      id: 2,
      amount: 890000,
      status: 'processing',
      periodStart: '2026-02-01',
      periodEnd: '2026-02-07',
      events: [
        { name: 'Tech Summit Africa', revenue: 890000, tickets: 89 }
      ],
      accountName: 'John Events Ltd',
      bankName: 'First Bank',
      accountNumber: '****7890',
      transactionId: null,
      paidAt: null,
      createdAt: '2026-02-08T00:00:00'
    },
    {
      id: 3,
      amount: 450000,
      status: 'pending',
      periodStart: '2026-02-08',
      periodEnd: '2026-02-14',
      events: [
        { name: 'Business Workshop Series', revenue: 335000, tickets: 67 },
        { name: 'Campus Connect 2.0', revenue: 115000, tickets: 23 }
      ],
      accountName: 'John Events Ltd',
      bankName: 'First Bank',
      accountNumber: '****7890',
      transactionId: null,
      paidAt: null,
      createdAt: '2026-02-15T00:00:00'
    },
    {
      id: 4,
      amount: 150000,
      status: 'failed',
      periodStart: '2025-12-15',
      periodEnd: '2025-12-21',
      events: [
        { name: 'Comedy Night Live', revenue: 150000, tickets: 30 }
      ],
      accountName: 'John Events Ltd',
      bankName: 'First Bank',
      accountNumber: '****7890',
      transactionId: null,
      paidAt: null,
      failureReason: 'Invalid account details',
      createdAt: '2025-12-22T00:00:00'
    }
  ]

  // Filter payouts
  const filteredPayouts = payouts.filter(payout => {
    if (activeTab === 'all') return true
    return payout.status === activeTab
  })

  const completedPayouts = payouts.filter(p => p.status === 'completed')
  const processingPayouts = payouts.filter(p => p.status === 'processing')
  const pendingPayouts = payouts.filter(p => p.status === 'pending')
  const failedPayouts = payouts.filter(p => p.status === 'failed')

  // Calculate totals
  const totalEarnings = completedPayouts.reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = [...processingPayouts, ...pendingPayouts].reduce((sum, p) => sum + p.amount, 0)

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
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Payouts</h1>
        <p className='text-gray-600'>Manage your earnings and payout history</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Total Earnings</p>
              <p className='text-3xl font-bold text-gray-900'>₦{totalEarnings.toLocaleString()}</p>
            </div>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
              <IoWalletOutline className='text-2xl text-green-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Pending Payouts</p>
              <p className='text-3xl font-bold text-yellow-600'>₦{pendingAmount.toLocaleString()}</p>
            </div>
            <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center'>
              <IoTimeOutline className='text-2xl text-yellow-600' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Completed</p>
              <p className='text-3xl font-bold text-gray-900'>{completedPayouts.length}</p>
            </div>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoCheckmarkCircle className='text-2xl text-gray-700' />
            </div>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 mb-1'>Next Payout</p>
              <p className='text-lg font-bold text-gray-900'>Feb 22, 2026</p>
              <p className='text-xs text-gray-600 mt-1'>Weekly schedule</p>
            </div>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
              <IoCalendarOutline className='text-2xl text-blue-600' />
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account Info */}
      <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center'>
              <IoCardOutline className='text-2xl text-gray-700' />
            </div>
            <div>
              <p className='font-semibold text-gray-900'>John Events Ltd</p>
              <p className='text-sm text-gray-600'>First Bank • ****7890</p>
            </div>
          </div>
          <button className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
            Change Account
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className='bg-white rounded-xl shadow-sm mb-6'>
        <div className='border-b border-gray-200'>
          <div className='flex overflow-x-auto'>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'all'
                  ? 'border-b-2 border-black text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Payouts ({payouts.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'completed'
                  ? 'border-b-2 border-black text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed ({completedPayouts.length})
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'processing'
                  ? 'border-b-2 border-black text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Processing ({processingPayouts.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'pending'
                  ? 'border-b-2 border-black text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pending ({pendingPayouts.length})
            </button>
            <button
              onClick={() => setActiveTab('failed')}
              className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === 'failed'
                  ? 'border-b-2 border-black text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Failed ({failedPayouts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Payouts List */}
      {filteredPayouts.length > 0 ? (
        <div className='space-y-4'>
          {filteredPayouts.map((payout) => {
            const statusInfo = getStatusBadge(payout.status)
            const StatusIcon = statusInfo.icon
            
            return (
              <div key={payout.id} className='bg-white rounded-xl shadow-sm overflow-hidden'>
                <div className='p-6'>
                  <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <h3 className='text-xl font-bold text-gray-900'>
                          ₦{payout.amount.toLocaleString()}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusInfo.bg} ${statusInfo.text}`}>
                          <StatusIcon className='text-sm' />
                          {payout.status}
                        </span>
                      </div>
                      <p className='text-sm text-gray-600'>
                        Period: {new Date(payout.periodStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(payout.periodEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    <div className='flex items-center gap-3'>
                      {payout.status === 'completed' && (
                        <button className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
                          <IoDownloadOutline />
                          Receipt
                        </button>
                      )}
                      {payout.status === 'failed' && (
                        <button className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium text-sm'>
                          Retry Payout
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Events Breakdown */}
                  <div className='border-t border-gray-100 pt-4 mt-4'>
                    <h4 className='text-sm font-semibold text-gray-700 mb-3'>Events Included:</h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {payout.events.map((event, index) => (
                        <div key={index} className='bg-gray-50 rounded-lg p-3'>
                          <p className='font-medium text-gray-900 text-sm mb-1'>{event.name}</p>
                          <p className='text-xs text-gray-600'>{event.tickets} tickets</p>
                          <p className='text-sm font-bold text-gray-900 mt-1'>₦{event.revenue.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payout Details */}
                  <div className='border-t border-gray-100 pt-4 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm'>
                    <div>
                      <p className='text-gray-600 mb-1'>Bank</p>
                      <p className='font-medium text-gray-900'>{payout.bankName}</p>
                    </div>
                    <div>
                      <p className='text-gray-600 mb-1'>Account</p>
                      <p className='font-medium text-gray-900'>{payout.accountNumber}</p>
                    </div>
                    {payout.transactionId && (
                      <div>
                        <p className='text-gray-600 mb-1'>Transaction ID</p>
                        <p className='font-medium text-gray-900'>{payout.transactionId}</p>
                      </div>
                    )}
                    {payout.paidAt && (
                      <div>
                        <p className='text-gray-600 mb-1'>Paid On</p>
                        <p className='font-medium text-gray-900'>
                          {new Date(payout.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Failure Reason */}
                  {payout.status === 'failed' && payout.failureReason && (
                    <div className='border-t border-gray-100 pt-4 mt-4'>
                      <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                        <p className='text-sm font-medium text-red-900 mb-1'>Failure Reason:</p>
                        <p className='text-sm text-red-700'>{payout.failureReason}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
          <IoWalletOutline className='text-6xl text-gray-300 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>No {activeTab} payouts</h3>
          <p className='text-gray-600'>Payouts will appear here once processed</p>
        </div>
      )}
    </div>
  )
}

export default PayoutsPage