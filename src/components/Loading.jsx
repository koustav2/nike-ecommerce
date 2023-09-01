'use client'
import GridLoader from 'react-spinners/GridLoader';

export default function Loading() {
    return (
        <div className="w-full flex justify-center items-center min-h-screen">
            <GridLoader
                color="#2936ca"
                size={120}
            />
        </div>
    );
}