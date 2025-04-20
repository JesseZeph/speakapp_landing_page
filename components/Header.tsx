'use client';

import React, { useState } from 'react'
import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <section className='py-5 px-4 sm:px-6 md:px-8'>
            <div className='container mx-auto flex flex-row justify-between items-center'>
                <Link href='/'>
                    <Image src={logo} alt='logo' width={100} height={100} className='cursor-pointer' />
                </Link>

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
                        {/* <Link href='/donate'>
                            <p className={pathname === '/donate' ? 'text-lime-500 font-semibold' : ''}>Donate</p>
                        </Link> */}
                        <Link href='/privacy'>
                            <p className={pathname === '/privacy' ? 'text-lime-500 font-semibold' : ''}>Privacy Policy</p>
                        </Link>
                        <Link href='/terms'>
                            <p className={pathname === '/terms' ? 'text-lime-500 font-semibold' : ''}>Terms and Conditions</p>
                        </Link>
                    </div>
                    <div>
                        <Link href='/contact-us'>
                            <p className={`btn-primary ${pathname === '/contact-us' ? 'bg-opacity-90' : ''}`}>Contact Us</p>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className='md:hidden absolute top-[80px] left-0 right-0 bg-white z-50 py-5 px-4 shadow-md'>
                        <div className='flex flex-col items-start space-y-4'>
                            <Link href='/donate'>
                                <p className={`py-2 ${pathname === '/donate' ? 'text-primary font-semibold' : ''}`}>Donate</p>
                            </Link>
                            <Link href='/privacy'>
                                <p className={`py-2 ${pathname === '/privacy' ? 'text-primary font-semibold' : ''}`}>Privacy Policy</p>
                            </Link>
                            <Link href='/terms'>
                                <p className={`py-2 ${pathname === '/terms' ? 'text-primary font-semibold' : ''}`}>Terms and Conditions</p>
                            </Link>
                            <Link href='/contact-us'>
                                <p className={`btn-primary w-full text-center py-2 mt-4 ${pathname === '/contact-us' ? 'bg-opacity-90' : ''}`}>Contact Us</p>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Header