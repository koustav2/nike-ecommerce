'use client';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import useAuth from '@/hooks/useAuth';

export default function Home() {
  const { loading, user, logout, navigateToLogin } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }


  return (
    <>
      <Header />

    </>
  );
}