'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
function SuccessPage() {
    const searchParams = useSearchParams();
    const verified = searchParams.get('verified') === 'true';
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
        // Ensure this page is only accessible after verification
        if (!verified) {
            window.location.href = '/verify-payment';
            return;
        }

        setShowPage(true);
    }, [verified]);

    if (!showPage) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-20">
            <div className="text-center bg-white">

                <h2 className="text-xl font-bold mb-4 text-green-600">Payment Successful!</h2>
                <p className="mb-6">Thank you for your donation.</p>
                <Link href="/" className="bg-primary text-white px-6 py-2 rounded-md">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPageWrapper() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>}>
            <SuccessPage />
        </Suspense>
    );
}