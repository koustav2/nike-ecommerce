'use client';
import useAuth from '@/hooks/useAuth';
import Head from 'next/head';
import Image from 'next/image';
import { DotLoader } from 'react-spinners';

export default function Home() {
  const { loading, user, logout, navigateToLogin } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DotLoader color="#36D7B7" loading={loading} size={200} />
      </div>
    );
  }


  return (
    <main>
      {user ? (
        <div>
          <button onClick={() => logout()}>Logout</button>
          <p>Welcome, {user.displayName}</p>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={() => navigateToLogin()}>Go to Login</button>
        </div>
      )}
    </main>
  );
}