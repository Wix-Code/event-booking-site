"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline, IoPersonOutline, IoCallOutline } from 'react-icons/io5'
import { FcGoogle } from 'react-icons/fc'
import { IoLogoFacebook, IoLogoApple } from 'react-icons/io5'

const Page = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    
    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy')
      return
    }
    
    // Handle sign-up logic here
    console.log('Sign-up data:', formData)
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full'>
        {/* Logo and Header */}
        <div className='text-center mb-8'>
          <Link href='/'>
            <img 
              src="https://shows.ng/images/logo.svg" 
              alt="Logo" 
              className="h-12 w-auto mx-auto mb-6"
            />
          </Link>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Create Your Account
          </h1>
          <p className='text-gray-600'>
            Join thousands discovering amazing events
          </p>
        </div>

        {/* Sign-Up Form Card */}
        <div className='bg-white rounded-2xl shadow-lg p-8'>
          {/* Social Sign-Up Buttons */}
          <div className='space-y-3 mb-6'>
            <button className='w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              <FcGoogle className='text-xl' />
              Sign up with Google
            </button>
            <button className='w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              <IoLogoFacebook className='text-xl text-blue-600' />
              Sign up with Facebook
            </button>
            <button className='w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700'>
              <IoLogoApple className='text-xl' />
              Sign up with Apple
            </button>
          </div>

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-white text-gray-500'>Or sign up with email</span>
            </div>
          </div>

          {/* Sign-Up Form */}
          <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Full Name Input */}
            <div>
              <label htmlFor='fullName' className='block text-sm font-medium text-gray-700 mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <IoPersonOutline className='text-gray-400 text-xl' />
                </div>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition'
                  placeholder='John Doe'
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <IoMailOutline className='text-gray-400 text-xl' />
                </div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition'
                  placeholder='you@example.com'
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
                Phone Number
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <IoCallOutline className='text-gray-400 text-xl' />
                </div>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition'
                  placeholder='+234 123 456 7890'
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <IoLockClosedOutline className='text-gray-400 text-xl' />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className='w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition'
                  placeholder='Create a strong password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center'
                >
                  {showPassword ? (
                    <IoEyeOffOutline className='text-gray-400 text-xl hover:text-gray-600' />
                  ) : (
                    <IoEyeOutline className='text-gray-400 text-xl hover:text-gray-600' />
                  )}
                </button>
              </div>
              <p className='text-xs text-gray-500 mt-1'>Must be at least 8 characters</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                  <IoLockClosedOutline className='text-gray-400 text-xl' />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className='w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition'
                  placeholder='Re-enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center'
                >
                  {showConfirmPassword ? (
                    <IoEyeOffOutline className='text-gray-400 text-xl hover:text-gray-600' />
                  ) : (
                    <IoEyeOutline className='text-gray-400 text-xl hover:text-gray-600' />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className='flex items-start'>
              <input
                type='checkbox'
                id='terms'
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className='h-4 w-4 rounded border-gray-300 text-black focus:ring-black accent-black mt-1'
              />
              <label htmlFor='terms' className='ml-2 text-sm text-gray-700'>
                I agree to the{' '}
                <Link href='/terms' className='font-medium text-gray-900 hover:text-gray-700 underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='/privacy' className='font-medium text-gray-900 hover:text-gray-700 underline'>
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition'
            >
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <Link href='/login' className='font-semibold text-gray-900 hover:text-gray-700'>
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className='mt-6 text-center'>
          <p className='text-xs text-gray-500'>
            By creating an account, you'll be able to book tickets, manage your events, and receive exclusive updates.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page