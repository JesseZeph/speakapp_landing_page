'use client'

import InputBox from '@/components/input-box';
import { ScrollReveal } from '@/components/ScrollEffects'
import { validateForm } from '@/lib/validator';
import { useState } from 'react';
import Image from 'next/image';
import emailIcon from '@/public/envelop.png'
import phoneIcon from '@/public/call.png'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog } from '@/components/ui/dialog';
import Footer from '@/components/Footer';

interface MessageForm {
    name: string;
    email: string;
    message: string;
}

const ContactUs = () => {
    const router = useRouter()
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: '',
        description: '',
        cancelText: '',
        confirmText: '',
        onConfirm: () => { }
    });

    const showDialog = ({ title, description, cancelText, confirmText, onConfirm }: {
        title: string;
        description: string;
        cancelText: string;
        confirmText: string;
        onConfirm: () => void;
    }) => {
        setDialogContent({ title, description, cancelText, confirmText, onConfirm });
        setDialogOpen(true);
    };

    const showToast = (message: string, title: string, type: 'success' | 'error' | 'info' | 'warning') => {
        toast[type](message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const [newMessage, setMessage] = useState<MessageForm>({
        name: "",
        email: "",
        message: "",
    });

    function updateMessage(key: keyof MessageForm, value: string) {
        setMessage({ ...newMessage, [key]: value });
        validateForm("submit", "#contactUsForm");
    }

    const handleSubmit = async () => {
        const errors = validateForm("submit", "#contactUsForm");
        if (Object.values(errors).length > 0) {
            return;
        }
        try {
            await axios.post('/api/contact-us', newMessage);
            setMessage({
                name: "",
                email: "",
                message: ""
            });
            showDialog({
                title: "Message Sent Successfully",
                description: "Thank You for contacting us, Our team will get back to you as soon as possible",
                cancelText: 'Close',
                confirmText: 'Visit Our Homepage',
                onConfirm() {
                    router.push('/')
                },
            });
        } catch (error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            showToast(axiosError?.response?.data?.message || 'Failed to Send Message, Please try again', '', 'error');
        }
    };

    return (
        <>
            <section className='w-full mb-10 flex flex-col overflow-x-hidden'>
                <ToastContainer />
                <Dialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    title={dialogContent.title}
                    description={dialogContent.description}
                    cancelText={dialogContent.cancelText}
                    confirmText={dialogContent.confirmText}
                    onConfirm={() => {
                        dialogContent.onConfirm();
                        setDialogOpen(false);
                    }}
                />
                <ScrollReveal>
                    <div className='container mx-auto px-5 pt-5 pb-10'>
                        <h1 className='text-base md:text-3xl text-center mb-10 font-semibold'>Contact Us</h1>
                        <div className='flex flex-col-reverse md:flex-row justify-between items-center gap-10'>
                            <div className="w-full">
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
                                    placeholder="johndoe@mail.com"
                                    required
                                    inputClassname="bg-white dark:bg-white dark:text-black border-[#E8EAED] dark:border-[#E8EAED]"
                                />
                                <InputBox
                                    inputClassname="w-full bg-white dark:bg-white dark:text-black border-[#E8EAED] dark:border-[#E8EAED]"
                                    textarea
                                    value={newMessage.message}
                                    onChange={(ev) => updateMessage("message", ev.target.value)}
                                    label="Message"
                                    type="text"
                                    name="state"
                                    placeholder="Type your message here..."
                                    required
                                    rows={10}
                                />
                                <div className='w-50 btn-primary cursor-pointer mt-10' onClick={handleSubmit}>
                                    <p className='text-center'>Submit</p>
                                </div>
                            </div>

                            <div className="w-full">
                                <div className='flex flex-col gap-4 items-start'>
                                    <div className='flex flex-row items-center justify-center gap-5 p-4 rounded-2xl shadow-lg bg-white'>
                                        <div className='bg-[#C0F0F3] rounded-full w-10 h-10 flex items-center justify-center'>
                                            <Image src={emailIcon} alt='Email' width={20} height={20} />
                                        </div>
                                        <div>
                                            <p className='text-sm font-bold'>Email</p>
                                            <p className='text-sm'>Shoot us a mail</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center justify-center gap-5 p-4 rounded-2xl shadow-lg bg-white'>
                                        <div className='bg-[#C0F0F3] rounded-full w-10 h-10 flex items-center justify-center'>
                                            <Image src={phoneIcon} alt='Email' width={20} height={20} />
                                        </div>
                                        <div>
                                            <p className='text-sm font-bold'>Phone</p>
                                            <p className='text-sm'>+234 906 939 0580</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
            <Footer />
        </>
    )
}

export default ContactUs 