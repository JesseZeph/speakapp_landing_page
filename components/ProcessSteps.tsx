import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { headContainerAnimation, headContentAnimation } from '@/lib/motion';
import { useStepContext } from '@/context/StepContext';

interface Step {
    number: string;
    title: string;
    description: string;
}

const ProcessSteps: React.FC = () => {
    const { activeStep, setActiveStep } = useStepContext();

    const steps: Step[] = [
        {
            number: '01',
            title: 'Browse',
            description: 'Browse certified therapists tailored to your unique needs and preferences'
        },
        {
            number: '02',
            title: 'Book a Session',
            description: 'Schedule sessions at your convenience and enjoy secure, private conversations'
        },
        {
            number: '03',
            title: 'Talk to a Therapist',
            description: 'Enjoy a safe space to share your thoughts, find clarity, and embrace peace.'
        }
    ];

    return (
        <AnimatePresence>
            <div>
                {steps.map((step, index) => (
                    <div
                        key={step.number}
                        className={`flex relative cursor-pointer hover:opacity-500 ${activeStep === index ? 'opacity-100' : 'opacity-80'}`}
                        onClick={() => setActiveStep(index)}
                    >
                        <div className="relative flex flex-col items-center justify-center">
                            <motion.div
                                className={`w-15 h-15 md:w-28 md:h-28 rounded-full flex items-center justify-center z-10 border-3 
                                    ${activeStep === index ? 'bg-lime-200 border-lime-500' : 'bg-lime-50 border-lime-300'}`}
                                {...headContainerAnimation}
                            >
                                <span className={`font-bold text-2xl md:text-3xl lg:text-4xl
                                    ${activeStep === index ? 'text-lime-700' : 'text-lime-500'}`}>
                                    {step.number}
                                </span>
                            </motion.div>

                            {index < steps.length - 1 && (
                                <div className="w-0.5 border-l-2 border-dashed border-lime-300 h-14 md:h-24"></div>
                            )}
                        </div>

                        <motion.div className="ml-4 md:ml-6 pt-3 md:pt-6 lg:pt-8" {...headContentAnimation}>
                            <h2 className={`${activeStep === index ? 'text-lime-700' : 'text-lime-500'} text-base md:text-2xl lg:text-3xl font-light mb-1 md:mb-2`}>
                                {step.title}
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base max-w-xl">{step.description}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </AnimatePresence>
    );
};

export default ProcessSteps;