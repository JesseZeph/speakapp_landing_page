import React from 'react'
import Image from 'next/image'
import logo from '@/public/logo.png'
import { ScrollFadeIn, ScrollReveal, ScrollSlideIn } from './ScrollEffects'
import linkedin from '@/public/linkedin.png'
import instagram from '@/public/ig.png'
import twitter from '@/public/twitter.png'
import appleLogo from '@/public/apple.png'
import googleLogo from '@/public/playstore.png'

const Footer = () => {
    return (
        <ScrollFadeIn>
            <section className='bg-light text-white'>
                <div className='container mx-auto px-4 py-8'>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <div className='flex flex-col items-center md:items-start'>
                            <Image src={logo} alt='logo' width={100} height={100} />
                            <ScrollSlideIn direction='bottom'>
                                <p className='text-sm md:text-base w-80 mt-5 text-center md:text-left text-heading'>Discover a safe space to share your thoughts, find clarity, and embrace peace. </p>

                            </ScrollSlideIn>
                        </div>
                        <div className='flex flex-col items-center md:items-end'>
                            <p className='text-sm w-80 mt-7 md:mt-5 text-heading text-center md:text-right'>Connect with us:</p>
                            <ScrollReveal className='flex flex-row items-center gap-4 mt-5'>
                                <div className='bg-white rounded-md p-3 cursor-pointer'>
                                    <Image src={twitter} alt='twitter' width={20} height={20} />
                                </div>
                                <div className='bg-white rounded-md p-3 cursor-pointer'>
                                    <Image src={linkedin} alt='linkedin' width={20} height={20} />
                                </div>
                                <div className='bg-white rounded-md p-3'>
                                    <Image src={instagram} alt='instagram' width={20} height={20} />
                                </div>
                            </ScrollReveal>
                            <ScrollReveal className='flex flex-row gap-4 mt-8'>
                                <div className='flex flex-row items-center gap-2 btn-primary  rounded-full'>
                                    <p>App Store</p>
                                    <Image src={appleLogo} alt='apple' width={20} height={20} />
                                </div>
                                <div className='flex flex-row items-center gap-2 btn-primary  rounded-full'>
                                    <p>Play Store</p>
                                    <Image src={googleLogo} alt='google' width={20} height={20} />
                                </div>
                            </ScrollReveal>

                        </div>
                    </div>
                </div>
                <div className='w-full h-[1px] bg-heading/15 mt-5' />
                <div className='flex flex-row justify-between container mx-auto px-4 py-8'>
                    <p className='text-sm text-heading'>© 2025 Speakapp</p>
                    <div className='flex flex-row gap-4'>
                        <p className='text-sm text-heading'>Privacy</p>
                        <p className='text-sm text-heading'>Terms</p>
                    </div>
                </div>
            </section>
        </ScrollFadeIn>
    )
}

export default Footer