'use client'

import { validateForm } from '@/lib/validator';
import { useState, Suspense } from 'react';
import InputBox from '@/components/input-box';
import { useDonationStore } from '@/store/user/donationStore';
import { toast } from 'react-toastify';

interface MessageForm {
    amount: number
    name: string;
    email: string;
    message: string;
}

function CheckoutContent() {
    const { makeDonation } = useDonationStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [newMessage, setMessage] = useState<MessageForm>({
        amount: 0,
        name: "",
        email: "",
        message: "",
    });

    function updateMessage(key: keyof MessageForm, value: string) {
        setMessage({ ...newMessage, [key]: value });
        validateForm("submit", "#checkoutForm");
    }

    async function donateToSpeak() {
        const errors = validateForm("submit", "#checkoutForm");
        if (Object.values(errors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await makeDonation({
                amount: Number(newMessage.amount),
                name: newMessage.name,
                email: newMessage.email,
                message: newMessage.message
            });

            if (!response) {
                toast.error('Failed to initiate payment. Please try again.');
                return;
            }

            if (response.paymentLink) {
                localStorage.setItem('donationReference', response.reference);
                console.log("Executing redirect now");
                window.location.href = response.paymentLink;
            } else {
                toast.error('No payment link received. Please try again.');
            }
        } catch (error) {
            console.error('Donation error:', error);
            toast.error('Failed to process payment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div id="checkoutForm" className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Make a Donation</h2>

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

            <div className="mt-6">
                <button
                    onClick={donateToSpeak}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Processing...' : 'Checkout'}
                </button>
            </div>
        </div>
    );
}

export default function Checkout() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>}>
            <CheckoutContent />
        </Suspense>
    );
}
