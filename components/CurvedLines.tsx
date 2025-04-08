'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface CurvedLinesProps {
    containerClassName?: string;
    svgClassName?: string;
    pathProps?: {
        stroke?: string;
        strokeOpacity?: number;
        strokeWidth?: number;
        d?: string;
    };
}

const CurvedLines: React.FC<CurvedLinesProps> = ({
    containerClassName = "w-full h-full absolute overflow-hidden pointer-events-none z-0",
    svgClassName = "absolute top-0 left-0",
    pathProps = {
        stroke: "#95C93D",
        strokeOpacity: 0.3,
        strokeWidth: 8,
        d: "M4 1.5C4 1.5 22.3958 82.4776 59.5 115C116.253 164.745 197.96 79.32 252 132C270.692 150.222 273.219 166.835 288.5 188C379.948 314.659 463.9 366.009 605.5 432C692.435 472.515 746.989 528.412 840 505C893.032 491.651 906.431 418.8 959.5 432C992.96 440.322 1026.5 489.5 1026.5 489.5"
    }
}) => {
    const [isMounted, setIsMounted] = useState(false)
    const { scrollY } = useScroll()

    const y = useTransform(scrollY, [0, 500], [0, -50])
    const opacity = useTransform(scrollY, [0, 200], [1, 0.6])

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <motion.div
            className={`hidden md:block w-full h-full absolute overflow-hidden pointer-events-none z-0 ${containerClassName}`}
            style={{ y, opacity }}
        >
            <svg
                width="978"
                height="515"
                viewBox="0 0 978 515"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={svgClassName}
            >
                <path
                    d={pathProps.d}
                    stroke={pathProps.stroke}
                    strokeOpacity={pathProps.strokeOpacity}
                    strokeWidth={pathProps.strokeWidth}
                />
            </svg>
        </motion.div>
    );
};

export default CurvedLines;