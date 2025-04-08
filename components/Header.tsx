'use client';

import React, { useState } from 'react'
import logo from '@/public/logo.png'
import Image from 'next/image'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <section className='py-5 px-4 sm:px-6 md:px-8'>
            <div className='container mx-auto flex flex-row justify-between items-center'>
                <Image src={logo} alt='logo' width={100} height={100} className='cursor-pointer' />

                {/* Mobile Menu Button */}
                <div className='md:hidden'>
                    <button
                        onClick={toggleMobileMenu}
                        className='flex flex-col space-y-1.5 p-2'
                        aria-label='Toggle mobile menu'
                    >
                        <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex flex-row items-center justify-between max-w-2xl gap-20 cursor-pointer'>
                    <div className='flex flex-row items-center gap-10 mr-10'>
                        <p>Donate</p>
                        <p>Privacy Policy</p>
                        <p>Terms and Conditions</p>
                    </div>
                    <div>
                        <p className='btn-primary'>Contact Us</p>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className='md:hidden absolute top-[80px] left-0 right-0 bg-white z-50 py-5 px-4 shadow-md'>
                        <div className='flex flex-col items-start space-y-4'>
                            <p className='py-2'>Donate</p>
                            <p className='py-2'>Privacy Policy</p>
                            <p className='py-2'>Terms and Conditions</p>
                            <p className='btn-primary w-full text-center py-2 mt-4'>Contact Us</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Header