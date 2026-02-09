"use client"

import React, { useState } from 'react'
import {
  IoFlagOutline,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoEyeOutline,
  IoAlertCircle
} from 'react-icons/io5'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AdminReportsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all')

  const reports = [
    {
      id: 1,
      reportedBy: 'John Doe',
      reportedByEmail: 'john@example.com',
      type: 'event',
      targetName: 'Fake Concert Event',
      targetOrganizer: 'Scam Events Ltd',
      reason: 'Fraud/Scam',
      description: 'This event looks fake. The organizer has no verifiable information and the ticket prices are suspiciously low.',
      status: 'pending',
      severity: 'high',
      date: '2026-02-08',
      evidence: 'Screenshots attached'
    },
    {
      id: 2,
      reportedBy: 'Jane Smith',
      reportedByEmail: 'jane@example.com',
      type: 'organizer',
      targetName: 'Suspicious Events Co',
      targetOrganizer: 'Suspicious Events Co',
      reason: 'Inappropriate Content',
      description: 'Event description contains offensive language and inappropriate imagery.',
      status: 'under_review',
      severity: 'medium',
      date: '2026-02-07',
      evidence: 'Link provided'
    },
    {
      id: 3,
      reportedBy: 'Mike Johnson',
      reportedByEmail: 'mike@example.com',
      type: 'event',
      targetName: 'Music Festival 2026',
      targetOrganizer: 'Music Productions',
      reason: 'Misleading Information',
      description: 'Event advertised artists that are not actually performing.',
      status: 'resolved',
      severity: 'low',
      date: '2026-02-05',
      evidence: 'None',
      resolution: 'Organizer updated event details'
    },
    {
      id: 4,
      reportedBy: 'Sarah Williams',
      reportedByEmail: 'sarah@example.com',
      type: 'user',
      targetName: 'Fake User Account',
      targetOrganizer: 'N/A',
      reason: 'Spam/Bot',
      description: 'This user is sending spam messages to other attendees.',
      status: 'dismissed',
      severity: 'low',
      date: '2026-02-03',
      evidence: 'Chat logs',
      resolution: 'No violation found'
    }
  ]

  const filteredReports = reports.filter(report => {
    if (statusFilter === 'all') return true
    return report.status === statusFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'under_review':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'dismissed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-orange-100 text-orange-800'
      case 'low':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Reports Management</h1>
        <p className='text-gray-600'>Review and handle user reports</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Reports</p>
          <p className='text-3xl font-bold text-gray-900'>{reports.length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Pending</p>
          <p className='text-3xl font-bold text-yellow-600'>{reports.filter(r => r.status === 'pending').length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Under Review</p>
          <p className='text-3xl font-bold text-blue-600'>{reports.filter(r => r.status === 'under_review').length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Resolved</p>
          <p className='text-3xl font-bold text-green-600'>{reports.filter(r => r.status === 'resolved').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
        <div className='flex items-center gap-4'>
          <div className='w-64'>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-full h-12'>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='under_review'>Under Review</SelectItem>
                <SelectItem value='resolved'>Resolved</SelectItem>
                <SelectItem value='dismissed'>Dismissed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className='space-y-4'>
        {filteredReports.map((report) => (
          <div key={report.id} className='bg-white rounded-xl shadow-sm p-6'>
            <div className='flex items-start justify-between mb-4'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <h3 className='text-lg font-bold text-gray-900'>{report.targetName}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(report.status)}`}>
                    {report.status.replace('_', ' ')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getSeverityBadge(report.severity)}`}>
                    {report.severity} priority
                  </span>
                </div>
                <p className='text-sm text-gray-600 mb-1'>
                  <span className='font-medium'>Type:</span> {report.type} | 
                  <span className='font-medium'> Reason:</span> {report.reason}
                </p>
                <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Reported by:</span> {report.reportedBy} ({report.reportedByEmail})
                </p>
              </div>
            </div>

            <div className='bg-gray-50 rounded-lg p-4 mb-4'>
              <p className='text-sm font-semibold text-gray-700 mb-2'>Description:</p>
              <p className='text-sm text-gray-900'>{report.description}</p>
              {report.evidence !== 'None' && (
                <p className='text-xs text-gray-600 mt-2'>
                  <span className='font-medium'>Evidence:</span> {report.evidence}
                </p>
              )}
            </div>

            {report.resolution && (
              <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-4'>
                <p className='text-sm font-semibold text-green-900 mb-1'>Resolution:</p>
                <p className='text-sm text-green-800'>{report.resolution}</p>
              </div>
            )}

            <div className='flex items-center justify-between pt-4 border-t border-gray-200'>
              <p className='text-xs text-gray-500'>Reported on {report.date}</p>
              <div className='flex items-center gap-2'>
                <button className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm'>
                  <IoEyeOutline />
                  View Details
                </button>
                {report.status === 'pending' && (
                  <>
                    <button className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm'>
                      <IoAlertCircle />
                      Review
                    </button>
                    <button className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm'>
                      <IoCheckmarkCircle />
                      Resolve
                    </button>
                    <button className='flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium text-sm'>
                      <IoCloseCircle />
                      Dismiss
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminReportsPage