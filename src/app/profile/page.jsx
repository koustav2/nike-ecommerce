'use client'
/* eslint-disable react-hooks/rules-of-hooks */
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
    const router = useRouter(); // Initialize the router
    const { user, loading } = useAuth()

    if (!user) {
        router.push('/login');
        return null; // Return null while redirecting
    }
  return (
    <div>
      
    </div>
  )
}

export default page
