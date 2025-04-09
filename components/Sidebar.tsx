'use client'

import React from 'react';

interface SidebarProps {
    sections: { id: string; title: string }[];
    activeId: string;
    onSelect: (id: string) => void;
}

const Sidebar = ({ sections, activeId, onSelect }: SidebarProps) => {
    return (
        <div className='hidden md:block border border-gray-300 rounded-lg md:w-130 lg:w-100 sticky top-24'>
            <div>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => {
                            const el = document.getElementById(section.id);
                            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            onSelect(section.id);
                        }}
                        className={`w-full flex items-center gap-2 p-3 rounded-lg text-left ${activeId === section.id ? 'text-black font-semibold' : 'text-gray-500 hover:text-black'}`}
                    >
                        <span className={`w-2 h-2 rounded-full ${activeId === section.id ? 'bg-green-500' : 'bg-green-300'}`}></span>
                        <span className='text-sm'>{section.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar; 