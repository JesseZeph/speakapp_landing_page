'use client'

import { validateForm } from '@/lib/validator';
import { useEffect, useState, Suspense } from 'react';
import InputBox from '@/components/input-box';
import { useParams, useSearchParams } from 'next/navigation';
import { useDonationStore } from '@/store/user/donationStore';
import Link from 'next/link';
import { toast } from 'react-toastify';

interface MessageForm {
    amount: number
    name: string;
    email: string;
    message: string;
}

const CheckoutContent = () => {
    const { status } = useParams();
    const query = useSearchParams();
    const reference = query.get('reference');

    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationComplete, setVerificationComplete] = useState(false);
    const [paymentVerified, setPaymentVerified] = useState(false);
    const { confirmDonationPayment, makeDonation } = useDonationStore();

    const [newMessage, setMessage] = useState<MessageForm>({
        amount: 0,
        name: "",
        email: "",
        message: "",
    });

    // Handle the verification when redirected back from Flutterwave
    useEffect(() => {
        const verifyPayment = async () => {
            if (status === 'success' && reference && !verificationComplete) {
                setIsVerifying(true);
                try {
                    // Call the confirmation endpoint with the reference in the request body
                    const paymentOk = await confirmDonationPayment(reference);
                    setPaymentVerified(paymentOk);
                } catch (error) {
                    console.error('Payment verification error:', error);
                    setPaymentVerified(false);
                } finally {
                    setIsVerifying(false);
                    setVerificationComplete(true);
                }
            }
        };

        verifyPayment();
    }, [confirmDonationPayment, status, reference, verificationComplete]);

    function updateMessage(key: keyof MessageForm, value: string) {
        setMessage({ ...newMessage, [key]: value });
        validateForm("submit", "#checkoutForm");
    }

    function donateToSpeak() {
        const errors = validateForm("submit", "#checkoutForm");
        if (Object.values(errors).length > 0) {
            return;
        }
        try {
            makeDonation({
                amount: Number(newMessage.amount),
                name: newMessage.name,
                email: newMessage.email,
                message: newMessage.message
            }).then((response) => {
                if (!response) {
                    toast.error('Failed to initiate payment. Please try again.');
                    return;
                }

                if (response.paymentLink) {
                    localStorage.setItem('donationReference', response.reference);
                    console.log("Executing redirect now");
                    window.location.href = response.paymentLink;

                    // Add fallback for debugging
                    setTimeout(() => {
                        console.log("Redirect may have failed, still on page after 2 seconds");
                    }, 2000);
                } else {
                    toast.error('No payment link received. Please try again.');
                }
            }).catch((error) => {
                console.error('Donation error:', error);
                toast.error('Failed to process payment. Please try again.');
            });
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
    }

    // Render different UI based on payment status
    if (status === 'success') {
        if (isVerifying) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-lg text-center">Verifying your payment...</p>
                </div>
            );
        }

        if (verificationComplete) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    {paymentVerified ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h2>
                            <p className="mb-6">Thank you for your donation.</p>
                            <Link href="/" className="bg-blue-500 text-white px-6 py-2 rounded-md">
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Verification Failed</h2>
                            <p className="mb-6">We couldn&apos;t verify your payment. Please try again or contact support.</p>
                            <Link href="/donate" className="bg-blue-500 text-white px-6 py-2 rounded-md">
                                Try Again
                            </Link>
                        </div>
                    )}
                </div>
            );
        }
    }

    // Default: Show donation form
    return (
        <div id="checkoutForm">
            <InputBox
                value={newMessage.amount}
                onChange={(ev) => updateMessage("amount", ev.target.value)}
                label="Amount"
                type="number"
                name="amount"
                placeholder="Amount"
                required
                inputClassname="bg-white dark:bg-white dark:text-black border-[#E8EAED] dark:border-[#E8EAED]"
            />
            <InputBox
                value={newMessage.name}
                onChange={(ev) => updateMessage("name", ev.target.value)}
                label="Name"
                type="text"
                name="name"
                placeholder="John Doe"
                required
                inputClassname="bg-white dark:bg-white dark:text-black border-[#E8EAED] dark:border-[#E8EAED]"
            />
            <InputBox
                value={newMessage.email}
                onChange={(ev) => updateMessage("email", ev.target.value)}
                label="Email"
                type="email"
                name="email"
                placeholder="john@doe.com"
                required
                inputClassname="bg-white dark:bg-white dark:text-black border-[#E8EAED] dark:border-[#E8EAED]"
            />
            <InputBox
                value={newMessage.message}
                onChange={(ev) => updateMessage("message", ev.target.value)}
                label="Message"
                type="text"
                name="message"
                placeholder="Message"
                required
                inputClassname="bg-white dark:bg-white dark:text-black border-[#E8EAED] dark:border-[#E8EAED]"
            />

            <div>
                <button onClick={donateToSpeak} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Checkout
                </button>
            </div>
        </div>
    );
};

const Checkout = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
};

export default Checkout;