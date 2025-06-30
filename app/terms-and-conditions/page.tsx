'use client'

import { ScrollReveal } from '@/components/ScrollEffects'
import Sidebar from '@/components/Sidebar'
import { termsContentSections, termsSections } from '@/data';
import React, { useEffect, useRef, useState } from 'react'



const Terms = () => {
    const [activeId, setActiveId] = useState('introduction');
    const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(entry => entry.isIntersecting);

                const topEntry = visibleEntries.sort((a, b) => {
                    const rectA = a.boundingClientRect;
                    const rectB = b.boundingClientRect;
                    return rectA.top - rectB.top;
                })[0];

                if (topEntry) {
                    setActiveId(topEntry.target.id);
                }
            },
            {
                rootMargin: '-100px 0px -50% 0px',
                threshold: [0, 0.1, 0.5, 0.9]
            }
        );

        termsContentSections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        setActiveId(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className='w-full min-h-screen flex flex-col overflow-x-hidden'>
            <ScrollReveal>
                <div className='container mx-auto px-5 pt-5 pb-10'>
                    <h1 className='text-base md:text-3xl text-center mb-10 font-semibold'>Terms of Service</h1>
                    <div className='flex flex-row gap-10'>
                        <Sidebar
                            sections={termsSections}
                            activeId={activeId}
                            onSelect={scrollToSection}
                        />
                        <div className='w-full'>
                            {termsContentSections.map((section) => (
                                <div
                                    key={section.id}
                                    id={section.id}
                                    className='scroll-mt-24'
                                    ref={(el) => {
                                        contentRefs.current[section.id] = el;
                                    }}
                                >
                                    <h1 className='text-base md:text-2xl font-semibold mb-5'>{section.title}</h1>
                                    <p className='text-sm md:text-base text-gray-500 mb-10'>{section.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default Terms;