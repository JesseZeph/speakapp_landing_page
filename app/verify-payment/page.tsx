'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDonationStore } from '@/store/user/donationStore';
import { Suspense } from 'react';

function VerifyPaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const { confirmDonationPayment } = useDonationStore();

    useEffect(() => {
        const verifyPayment = async () => {
            const reference = searchParams.get('reference') || searchParams.get('tx_ref');

            if (!reference) {
                console.error('No reference found in URL');
                setVerificationStatus('failed');
                return;
            }

            try {
                console.log('Verifying payment with reference:', reference);
                const verified = await confirmDonationPayment(reference);

                if (verified) {
                    console.log('Payment verification successful');
                    setVerificationStatus('success');
                    // Redirect to success page after short delay
                    setTimeout(() => {
                        router.push('/success?verified=true');
                    }, 1000);
                } else {
                    console.log('Payment verification failed');
                    setVerificationStatus('failed');
                    // Redirect to failure page after short delay
                    setTimeout(() => {
                        router.push('/failed?reason=verification');
                    }, 1000);
                }
            } catch (error) {
                console.error('Error during payment verification:', error);
                setVerificationStatus('failed');
                setTimeout(() => {
                    router.push('/donate/failed?reason=error');
                }, 1000);
            }
        };

        verifyPayment();
    }, [confirmDonationPayment, searchParams, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {verificationStatus === 'verifying' && (
                <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-lg text-center">Verifying your payment...</p>
                </>
            )}

            {verificationStatus === 'success' && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-green-600">Payment Verified!</h2>
                    <p>Redirecting to success page...</p>
                </div>
            )}

            {verificationStatus === 'failed' && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h2>
                    <p>Redirecting...</p>
                </div>
            )}
        </div>
    );
}

export default function VerifyPayment() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>}>
            <VerifyPaymentContent />
        </Suspense>
    );
}