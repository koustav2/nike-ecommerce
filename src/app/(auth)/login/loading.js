'use client'
import Loading from '@/components/Loading';

export default function loading() {
    return (
       <div
       className='flex justify-center items-center min-h-screen'
       >
         <Loading />
       </div>
    );
}