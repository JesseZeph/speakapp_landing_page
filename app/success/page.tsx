'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
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
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h2>
                <p className="mb-6">Thank you for your donation.</p>
                <Link href="/" className="bg-blue-500 text-white px-6 py-2 rounded-md">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}