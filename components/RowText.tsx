import React from 'react'

interface RowTextProps {
    description: string
    color?: string
}

const RowText = ({ description, color }: RowTextProps) => {
    return (
        <div className='flex flex-row items-center gap-4'>
            <h2 className={`${color} text-3xl`}>•</h2>
            <p className='text-[12px] md:text-base text-heading'>{description}</p>
        </div>
    )
}

export default RowText