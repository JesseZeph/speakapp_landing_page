import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useStepContext } from '@/context/StepContext';
import { StaticImageData } from 'next/image';

import therapist from '@/public/therapist-screen.png';
import therapistTwo from '@/public/therapist-screen-2.png';
import bookingStep from '@/public/booking-step.png';
import bookingStepMini from '@/public/booking-step-mini.png';
import paymentStep from '@/public/booking-step-2.png'
import paymentStepMini from '@/public/booking-step-mini-2.png';



interface StepImage {
    src: StaticImageData;
    alt: string;
    width: number;
    height: number;
    className: string;
}

const StepImages: React.FC = () => {
    const { activeStep } = useStepContext();

    const stepImages: StepImage[][] = [
        // Step 1: Browse
        [
            {
                src: therapist,
                alt: 'Browse therapists',
                width: 450,
                height: 450,
                className: 'w-[250px] h-auto sm:w-[350px] md:w-[450px]'
            },
            {
                src: therapistTwo,
                alt: 'Therapist details',
                width: 300,
                height: 300,
                className: 'hidden md:block absolute -bottom-0 md:right-15 lg:-right-40'
            }
        ],
        // Step 2: Book a Session
        [
            {
                src: bookingStep,
                alt: 'Appointment calendar',
                width: 450,
                height: 450,
                className: 'w-[250px] h-auto sm:w-[350px] md:w-[450px]'
            },
            {
                src: bookingStepMini,
                alt: 'Appointment details',
                width: 300,
                height: 300,
                className: 'hidden md:block absolute -bottom-0 md:right-15 lg:-right-40'
            }
        ],
        // Step 3: Make Payment
        [
            {
                src: paymentStep,
                alt: 'Payment screen',
                width: 450,
                height: 450,
                className: 'w-[250px] h-auto sm:w-[350px] md:w-[450px]'
            },
            {
                src: paymentStepMini,
                alt: 'Payment confirmation',
                width: 300,
                height: 300,
                className: 'hidden md:block absolute -bottom-0 md:right-15 lg:-right-40'
            }
        ]
    ];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                {stepImages[activeStep].map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className={image.className}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};

export default StepImages;