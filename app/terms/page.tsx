'use client'

import { ScrollReveal } from '@/components/ScrollEffects'
import Sidebar from '@/components/Sidebar'
import React, { useEffect, useRef, useState } from 'react'

const termsSections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'definitions', title: 'Definition and Interpretations' },
    { id: 'acceptance', title: 'Acceptance of the Terms' },
    { id: 'the-site', title: 'The Site' },
    { id: 'our-services', title: 'Our Services' },
    { id: 'payment', title: 'Payment' },
    { id: 'our-liability', title: 'Our Liability' },
    { id: 'termination', title: 'Termination' },
    { id: 'intellectual-property', title: 'Intellectual Property Rights' },
    { id: 'dispute-resolution', title: 'Dispute Resolution' },
    { id: 'privacy-policy', title: 'Privacy Policy' },
    { id: 'disclaimer', title: 'Disclaimer' },
    { id: 'governing-law', title: 'Governing Law' },
];

export const termsContentSections = [
    {
        id: 'introduction',
        title: 'Introduction',
        content:
            'Lorem ipsum dolor sit amet consectetur. Varius duis lacinia consequat posuere netus. Senectus sed ornare et iud in dui sodales. Nulla nisi euismod varius pellentesque sit egestas mi ultricies. Sit a dui non fermentum. Ornare quis elit imperdiet sodales aliquet nam. Bibendum orci arcuen purus vitae purus. Dignissim tristique in porttitor venenatis rutrum volutpat ultricies viverra.',
    },
    {
        id: 'definitions',
        title: 'Definition and Interpretations',
        content:
            'Lorem ipsum dolor sit amet consectetur. Varius duis lacinia consequat posuere netus. Senectus sed ornare et iud in dui sodales. Nulla nisi euismod varius pellentesque sit egestas mi ultricies. Sit a dui non fermentum. Ornare quis elit imperdiet sodales aliquet nam. Bibendum orci arcuen purus vitae purus. Dignissim tristique in porttitor venenatis rutrum volutpat ultricies viverra.',
    },
    {
        id: 'acceptance',
        title: 'Acceptance of the Terms',
        content:
            'Lorem ipsum dolor sit amet consectetur. Varius duis lacinia consequat posuere netus. Senectus sed ornare et iud in dui sodales. Nulla nisi euismod varius pellentesque sit egestas mi ultricies. Sit a dui non fermentum. Ornare quis elit imperdiet sodales aliquet nam. Bibendum orci arcuen purus vitae purus. Dignissim tristique in porttitor venenatis rutrum volutpat ultricies viverra.',
    },
    {
        id: 'the-site',
        title: 'The Site',
        content:
            'Lorem ipsum dolor sit amet consectetur. Varius duis lacinia consequat posuere netus. Senectus sed ornare et iud in dui sodales. Nulla nisi euismod varius pellentesque sit egestas mi ultricies. Sit a dui non fermentum. Ornare quis elit imperdiet sodales aliquet nam. Bibendum orci arcuen purus vitae purus. Dignissim tristique in porttitor venenatis rutrum volutpat ultricies viverra.',
    },
    {
        id: 'our-services',
        title: 'Our Services',
        content:
            'Lorem ipsum dolor sit amet consectetur. Varius duis lacinia consequat posuere netus. Senectus sed ornare et iud in dui sodales. Nulla nisi euismod varius pellentesque sit egestas mi ultricies. Sit a dui non fermentum. Ornare quis elit imperdiet sodales aliquet nam. Bibendum orci arcuen purus vitae purus. Dignissim tristique in porttitor venenatis rutrum volutpat ultricies viverra.',
    },
    {
        id: 'payment',
        title: 'Payment',
        content:
            'Lorem ipsum dolor sit amet consectetur. Varius duis lacinia consequat posuere netus. Senectus sed ornare et iud in dui sodales. Nulla nisi euismod varius pellentesque sit egestas mi ultricies. Sit a dui non fermentum. Ornare quis elit imperdiet sodales aliquet nam. Bibendum orci arcuen purus vitae purus. Dignissim tristique in porttitor venenatis rutrum volutpat ultricies viverra.',
    },
    {
        id: 'our-liability',
        title: 'Our Liability',
        content:
            'Lorem ipsum dolor sit amet consectetur. Varius duis lacinia consequat posuere netus. Senectus sed ornare et iud in dui sodales. Nulla nisi euismod varius pellentesque sit egestas mi ultricies. Sit a dui non fermentum. Ornare quis elit imperdiet sodales aliquet nam. Bibendum orci arcuen purus vitae purus. Dignissim tristique in porttitor venenatis rutrum volutpat ultricies viverra.',
    },
];

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
                    <h1 className='text-base md:text-2xl text-center mb-10'>Terms of Service</h1>
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