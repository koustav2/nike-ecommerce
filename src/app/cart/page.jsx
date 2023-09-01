/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
    const router = useRouter(); // Initialize the router
    const { user, loading } = useAuth()

    if (loading) {
        return <div>loading...</div>
    }
    if (!user) {
        // Redirect to the login page if the user is not authenticated
        router.push('/login');
        return null; // Return null while redirecting
    }
    return (
        <div>

        </div>
    )
}

export default page
