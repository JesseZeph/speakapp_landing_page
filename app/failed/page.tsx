'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function FailedPageContent() {
    const searchParams = useSearchParams();
    const reason = searchParams.get('reason');

    let errorMessage = 'We could not verify your payment.';

    if (reason === 'verification') {
        errorMessage = 'Your payment could not be verified. This may be due to a processing issue.';
    } else if (reason === 'error') {
        errorMessage = 'An error occurred while processing your payment verification.';
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-20">
            <div className="text-center bg-white">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Verification Failed</h2>
                <p className="mb-6">{errorMessage}</p>
                <div className="flex gap-4 justify-center">
                    <Link href="/checkout" className="bg-primary text-white px-6 py-2 rounded-md">
                        Try Again
                    </Link>
                    <Link href="/" className="bg-red-500 text-white px-6 py-2 rounded-md">
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function FailedPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>}>
            <FailedPageContent />
        </Suspense>
    );
}