'use client'

import React from 'react'
import appleLogo from '@/public/apple.png'
import googleLogo from '@/public/playstore.png'
import Image from 'next/image'
import CurvedLines from '@/components/CurvedLines'
import heroOne from '@/public/hero-one.png'
import heroTwo from '@/public/hero-2.png'
import therapist from '@/public/therapist-screen.png'
import imageStack from '@/public/images-stack.png'
import { motion } from 'framer-motion'
import ProcessSteps from '@/components/ProcessSteps'
import FeatureTile from '@/components/FeatureTile'
import FeatureTileReverse from '@/components/FeatureTile'
import appointment from '@/public/appointment.png'
import appointmentTwo from '@/public/appointment-two.png'
import community from '@/public/community.png'
import communityTwo from '@/public/community-two.png'
import communityThree from '@/public/community-three.png'
import signUp from '@/public/signup.png'
import signUpTwo from '@/public/signup-2.png'
import earn from '@/public/earn.png'
import earnTwo from '@/public/earn-2.png'
import earnThree from '@/public/earn-3.png'
import semiCircle from '@/public/semi-circle.png'
import lightEllipse from '@/public/light-ellipse.png'
import speakCropped from '@/public/speak-cropped.png'
import semiCircleUp from '@/public/semi-circle-up.png'
import {
    ScrollFadeIn,
    FloatingImage,
    ScrollFadeUp,
    ScrollScale,
    ScrollSlideIn,
    ScrollReveal
} from '@/components/ScrollEffects'
import Footer from '@/components/Footer'
import { StepProvider } from '@/context/StepContext'
import StepImages from '@/components/StepsImages'


const Homepage = () => {

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const floatingAnimation = {
        initial: { y: 0 },
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" as 'reverse',
                ease: "easeInOut"
            }
        }
    }
    return (
        <div className='w-full h-screen flex flex-col overflow-x-hidden'>
            <ScrollReveal>

                <ScrollFadeIn>
                    <section className='bg-light md:pt-20 px-4 sm:px-6 md:px-8 relative'>
                        <CurvedLines containerClassName='curved-lines left-[48%] top-[3px]' />
                        <CurvedLines containerClassName='curved-lines left-[46%] top-0' />
                        <div className='container mx-auto justify-between flex flex-col md:flex-row w-full relative overflow-hidden'>
                            <motion.div className='flex flex-col py-10' initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer} >
                                <motion.h1 variants={fadeInUp} className='text-4xl'><span className="text-lime-500 text-4xl">Speak</span>app</motion.h1>
                                <motion.p variants={fadeInUp} className='text-sm md:text-base w-full md:w-[500px] text-[24px] font-light mt-5 my-10'>Discover a safe space to share your thoughts, find clarity, and embrace peace. Browse certified therapists tailored to your unique needs and preferences</motion.p>
                                <ScrollSlideIn direction='bottom'>
                                    <div className='flex flex-row gap-4'>
                                        <div className='flex flex-row items-center gap-2 btn-primary cursor-pointer'>
                                            <p>App Store</p>
                                            <Image src={appleLogo} alt='apple' width={20} height={20} />
                                        </div>
                                        <div className='flex flex-row items-center gap-2 btn-primary cursor-pointer'>
                                            <p>Play Store</p>
                                            <Image src={googleLogo} alt='google' width={20} height={20} />
                                        </div>
                                    </div>
                                </ScrollSlideIn>
                                <motion.div variants={fadeInUp} className='flex flex-row items-center gap-2 mt-5 text-gray-500'>
                                    <Image src={imageStack} alt='image-stack' width={150} height={100} />
                                    <p className='text-sm md:text-base'>500+ Users all over the world</p>
                                </motion.div>
                            </motion.div>
                            <div className='flex flex-row relative'>
                                <motion.div initial="initial"
                                    animate="animate"
                                    variants={floatingAnimation}>
                                    <Image src={heroOne} alt='hero-one' width={300} height={300} className='hidden md:block filter' />
                                </motion.div>
                                <Image src={heroTwo} alt='hero-two' width={300} height={300} className='pt-10 hidden lg:block filter drop-shadow-lg' />

                            </div>


                        </div>
                    </section>

                </ScrollFadeIn>
                <section className='container mx-auto px-4 md:px-6'>
                    <ScrollFadeUp className='flex flex-col lg:flex-row mt-10 md:mt-20 gap-10 md:gap-20 lg:gap-32 md:justify-between'>
                        <StepProvider>
                            <ScrollSlideIn direction="left" className='mb-8 md:mb-0 relative w-full lg:w-1/2'>
                                <FloatingImage>
                                    <StepImages />
                                </FloatingImage>
                            </ScrollSlideIn>
                            <ScrollSlideIn direction="right" className='pb-10 w-full lg:w-1/2'>
                                <ProcessSteps />
                            </ScrollSlideIn>
                        </StepProvider>
                    </ScrollFadeUp>
                </section>


                <FeatureTile
                    images={[
                        {
                            src: appointment.src,
                            alt: 'appointment calendar',
                            className: 'w-[180px] h-[300px] md:w-[200px] md:h-[300px] mt-10 lg:w-[340px] lg:h-[610px] '
                        },
                        {
                            src: appointmentTwo.src,
                            alt: 'appointment details',
                            className: 'w-[180px] h-[300px] md:w-[300px] md:h-[300px] mt-15 md:hidden lg:block lg:w-[340px] lg:h-[610px]'
                        }
                    ]}
                />



                <FeatureTileReverse
                    images={[
                        {
                            src: community.src,
                            alt: 'community chat',
                            className: 'w-[100px] h-[200px] md:w-[200px] md:h-[300px] mt-10 md:mt-5 lg:w-[300px] lg:h-[550px]'
                        },
                        {
                            src: communityTwo.src,
                            alt: 'community profile',
                            className: 'w-[100px] h-[200px] mt-20 md:hidden lg:block lg:w-[300px] lg:h-[550px]'
                        },
                        {
                            src: communityThree.src,
                            alt: 'community members',
                            className: 'w-[100px] h-[200px] md:hidden mt-5 lg:block lg:w-[300px] lg:h-[550px]'
                        }
                    ]}
                    title='Join Community'
                    descriptions={[
                        'Connect with others on similar wellness journeys.',
                        'Share experiences, insights, and encouragement.',
                        'Participate in discussions and support groups.',
                        'Grow together in a safe and welcoming space.'
                    ]}
                    imageContainerClassName='rotate-4'
                    backgroundColor='bg-lime-50/50'
                />



                <FeatureTile
                    images={[
                        {
                            src: signUp.src,
                            alt: 'appointment calendar',
                            className: 'w-[160px] h-[280px] md:w-[200px] md:h-[300px] mt-10 lg:w-[350px] lg:h-[620px]'
                        },
                        {
                            src: signUpTwo.src,
                            alt: 'appointment details',
                            className: 'w-[200px] h-[280px] md:w-[300px] md:h-[300px] mt-15 md:hidden lg:block lg:w-[420px] lg:h-[620px]'
                        }
                    ]}
                    title='Sign up as a Therapist'
                    descriptions={[
                        'Expand your practice by connecting with clients online.',
                        'Manage appointments and sessions effortlessly.',
                        'Provide support and track client progress in one place.',
                        'Join a trusted platform dedicated to mental wellness.'
                    ]}
                />


                <FeatureTileReverse
                    images={[
                        {
                            src: earn.src,
                            alt: 'earn',
                            className: 'w-[110px] h-[200px] md:w-[200px] md:h-[300px] lg:w-[300px] lg:h-[550px]'
                        },
                        {
                            src: earnTwo.src,
                            alt: 'earn',
                            className: 'w-[110px] h-[200px] md:hidden lg:block lg:w-[300px] lg:h-[550px]'
                        },
                        {
                            src: earnThree.src,
                            alt: 'earn',
                            className: 'w-[110px] h-[200px] md:hidden lg:block lg:w-[300px] lg:h-[550px]'
                        }
                    ]}
                    title='Earn as a Therapist'
                    descriptions={[
                        'Grow your practice with flexible online sessions.',
                        'Set your own schedule and rates.',
                        'Get paid securely and on time.',
                        'Help clients while building a sustainable income.'
                    ]}
                    imageContainerClassName='md:rotate-0 mt-10'
                    backgroundColor='bg-lime-50/50'
                />
            </ScrollReveal>


            <section className='px-4 sm:px-6 md:px-8'>
                <ScrollReveal className='container mx-auto relative py-10 md:pt-30 overflow-clip'>
                    <div className='bg-primary py-15 px-5 md:py-20 md:px-10 rounded-3xl relative'>
                        <ScrollFadeUp delay={0.2}>
                            <h1 className='text-white text-2xl md:text-2xl lg:text-3xl w-70 md:w-80 lg:w-100 font-light relative z-10'>Download the app now and unlock instant benefits and features.</h1>
                        </ScrollFadeUp>
                        <ScrollScale delay={0.4}>
                            <h2 className='text-sm md:text-base bg-white py-2 px-4 rounded-full w-50 text-center mt-5 relative z-10 cursor-pointer'>Download now</h2>
                        </ScrollScale>
                        <Image src={semiCircle} alt='semi-circle' width={400} height={300} className='hidden md:block absolute bottom-0  -left-10 z-0' />
                        <Image src={lightEllipse} alt='semi-circle' width={150} height={150} className='hidden md:block absolute top-1 -left-5 z-0' />
                        <Image src={semiCircleUp} alt='semi-circle' width={400} height={300} className='hidden md:block absolute top-0  right-0 z-0' />
                        <Image src={semiCircleUp} alt='semi-circle' width={200} height={200} className='md:hidden absolute top-0  right-0 z-0' />
                        <ScrollSlideIn direction="bottom" className='hidden md:block absolute bottom-0 md:right-5 lg:right-10 z-1'>
                            <Image src={therapist} alt='therapist-screen' width={300} height={300} />
                        </ScrollSlideIn>
                        <ScrollSlideIn direction="right" delay={0.2} className='hidden md:block absolute bottom-0 md:right-50 lg:right-60 z-1'>
                            <Image src={speakCropped} alt='light-ellipse' width={200} height={200} />
                        </ScrollSlideIn>
                    </div>
                </ScrollReveal>
            </section>
            <Footer />

        </div>
    )
}

export default Homepage