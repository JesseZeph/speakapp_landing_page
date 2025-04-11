'use client'

import { validateForm } from '@/lib/validator';
import { useEffect, useState, Suspense } from 'react';
import InputBox from '@/components/input-box';
import { useParams, useSearchParams } from 'next/navigation';
import { useDonationStore } from '@/store/user/donationStore';
import Link from 'next/link';

interface MessageForm {
    amount: number
    name: string;
    email: string;
    message: string;
}

const CheckoutContent = () => {
    const { status } = useParams()
    const query = useSearchParams()
    const reference = query.get('reference')

    const [paymentVerified, setPaymentVerified] = useState(false)
    const [redirectUrl, setRedirectUrl] = useState('/')
    const { confirmDonationPayment } = useDonationStore()
    const { makeDonation } = useDonationStore()

    function donateToSpeak() {
        const errors = validateForm("submit", "#contactUsForm");
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
                console.log('Donation response:', response);
                if (response?.paymentLink) {
                    console.log('Payment link:', response.paymentLink);
                    localStorage.setItem('donationReference', response.reference);
                    window.location.href = response.paymentLink;
                } else {
                    console.error('No payment link in response:', response);
                }
            });
        } catch (error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            console.error('Donation error:', axiosError);
        }
    }

    useEffect(() => {
        const confirmPayment = async () => {
            if (status === 'success' && reference) {
                const paymentOk = await confirmDonationPayment(reference);
                if (paymentOk) {
                    setPaymentVerified(true);
                    setRedirectUrl('/');
                } else {
                    setPaymentVerified(false);
                    setRedirectUrl('/donate');
                }
            }
        };

        confirmPayment();
    }, [confirmDonationPayment, status, reference]);

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

    return (
        <div>
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
                <button onClick={donateToSpeak} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                    <p>Checkout</p>
                </button>
                {status === 'success' && (
                    <Link href={redirectUrl}>
                        {paymentVerified ? 'Back to home' : 'Try again'}
                    </Link>
                )}
            </div>
        </div>
    )
}

const Checkout = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}

export default Checkout