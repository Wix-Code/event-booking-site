"use client"

import React, { useState } from 'react'
import {
  IoAddCircleOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCheckmarkCircle
} from 'react-icons/io5'

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Music', slug: 'music', eventCount: 156, isActive: true, createdAt: '2025-01-15' },
    { id: 2, name: 'Comedy', slug: 'comedy', eventCount: 89, isActive: true, createdAt: '2025-01-15' },
    { id: 3, name: 'Business', slug: 'business', eventCount: 234, isActive: true, createdAt: '2025-01-15' },
    { id: 4, name: 'Technology', slug: 'technology', eventCount: 178, isActive: true, createdAt: '2025-01-15' },
    { id: 5, name: 'Sports', slug: 'sports', eventCount: 67, isActive: true, createdAt: '2025-01-15' },
    { id: 6, name: 'Religion', slug: 'religion', eventCount: 45, isActive: true, createdAt: '2025-01-15' },
    { id: 7, name: 'Seminar', slug: 'seminar', eventCount: 123, isActive: true, createdAt: '2025-01-15' },
    { id: 8, name: 'Workshop', slug: 'workshop', eventCount: 98, isActive: true, createdAt: '2025-01-15' },
    { id: 9, name: 'Conference', slug: 'conference', eventCount: 145, isActive: true, createdAt: '2025-01-15' },
    { id: 10, name: 'Festival', slug: 'festival', eventCount: 72, isActive: true, createdAt: '2025-01-15' },
    { id: 11, name: 'Networking', slug: 'networking', eventCount: 56, isActive: true, createdAt: '2025-01-15' },
    { id: 12, name: 'Arts & Culture', slug: 'arts-culture', eventCount: 34, isActive: false, createdAt: '2025-01-20' },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' })

  const totalEvents = categories.reduce((sum, cat) => sum + cat.eventCount, 0)
  const activeCategories = categories.filter(c => c.isActive).length

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.slug) {
      const category = {
        id: categories.length + 1,
        name: newCategory.name,
        slug: newCategory.slug,
        eventCount: 0,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setCategories([...categories, category])
      setNewCategory({ name: '', slug: '' })
      setShowAddModal(false)
    }
  }

  const toggleCategoryStatus = (id: number) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
    ))
  }

  const deleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Categories Management</h1>
          <p className='text-gray-600'>Manage event categories</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className='flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
        >
          <IoAddCircleOutline className='text-xl' />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Categories</p>
          <p className='text-3xl font-bold text-gray-900'>{categories.length}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Active Categories</p>
          <p className='text-3xl font-bold text-green-600'>{activeCategories}</p>
        </div>
        <div className='bg-white rounded-xl shadow-sm p-6'>
          <p className='text-sm text-gray-600 mb-1'>Total Events</p>
          <p className='text-3xl font-bold text-gray-900'>{totalEvents}</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {categories.map((category) => (
          <div key={category.id} className='bg-white rounded-xl shadow-sm p-6'>
            <div className='flex items-start justify-between mb-4'>
              <div className='flex-1'>
                <h3 className='text-lg font-bold text-gray-900 mb-1'>{category.name}</h3>
                <p className='text-sm text-gray-600'>/{category.slug}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className='mb-4 pb-4 border-b border-gray-100'>
              <p className='text-sm text-gray-600'>Events</p>
              <p className='text-2xl font-bold text-gray-900'>{category.eventCount}</p>
            </div>

            <div className='flex items-center gap-2'>
              <button 
                onClick={() => toggleCategoryStatus(category.id)}
                className='flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-sm'
              >
                {category.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className='p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition'>
                <IoCreateOutline className='text-lg text-gray-600' />
              </button>
              <button 
                onClick={() => deleteCategory(category.id)}
                className='p-2 border border-red-300 rounded-lg hover:bg-red-50 transition'
              >
                <IoTrashOutline className='text-lg text-red-600' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-xl max-w-md w-full p-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Add New Category</h2>
            
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Category Name
                </label>
                <input
                  type='text'
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                  placeholder='e.g., Education'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  URL Slug
                </label>
                <input
                  type='text'
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({...newCategory, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                  placeholder='e.g., education'
                />
              </div>
            </div>

            <div className='flex items-center gap-3 mt-6'>
              <button
                onClick={() => setShowAddModal(false)}
                className='flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold'
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className='flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold'
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCategoriesPage