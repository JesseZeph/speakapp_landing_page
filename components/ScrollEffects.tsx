'use client'

import React, { useEffect, useRef, ReactNode } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import Image from 'next/image'
import RowText from './RowText';


interface AnimationProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    once?: boolean;
    className?: string;
}

// ScrollFadeIn component - Fades in when scrolled into view
export const ScrollFadeIn = ({
    children,
    delay = 0,
    duration = 0.5,
    once = false,
    className = ""
}: AnimationProps) => {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once })

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, isInView])

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration, delay }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ScrollFadeUp component - Fades up when scrolled into view
export const ScrollFadeUp = ({
    children,
    delay = 0,
    duration = 0.5,
    once = false,
    className = ""
}: AnimationProps & { y?: number }) => {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, isInView])

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// ScrollScale component - Scales up when scrolled into view
export const ScrollScale = ({
    children,
    delay = 0,
    duration = 0.5,
    once = false,
    className = ""
}: AnimationProps) => {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: "-50px" })

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, isInView])

    const variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, delay }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface SlideInProps extends AnimationProps {
    direction?: "left" | "right" | "top" | "bottom";
    distance?: number;
}

// ScrollSlideIn component - Slides in from direction when scrolled into view
export const ScrollSlideIn = ({
    children,
    delay = 0,
    duration = 0.5,
    direction = "left",
    distance = 100,
    once = false,
    className = ""
}: SlideInProps) => {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, isInView])

    const getDirectionOffset = () => {
        switch (direction) {
            case "left": return { x: -distance, y: 0 }
            case "right": return { x: distance, y: 0 }
            case "top": return { x: 0, y: -distance }
            case "bottom": return { x: 0, y: distance }
            default: return { x: -distance, y: 0 }
        }
    }

    const variants = {
        hidden: { opacity: 0, ...getDirectionOffset() },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration, delay }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

interface StaggerProps extends AnimationProps {
    delayChildren?: number;
    staggerChildren?: number;
}

// Stagger children animations
export const ScrollStagger = ({
    children,
    delayChildren = 0.1,
    staggerChildren = 0.1,
    once = false,
    className = ""
}: StaggerProps) => {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, isInView])

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delayChildren, staggerChildren }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// For items inside a stagger container
export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    }

    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    )
}

// ScrollReveal component - Reveals content with a mask effect
export const ScrollReveal = ({
    children,
    delay = 0,
    duration = 0.5,
    once = false,
    className = ""
}: AnimationProps) => {
    const controls = useAnimation()
    const ref = useRef(null)
    const isInView = useInView(ref, { once })

    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, isInView])

    const variants = {
        hidden: { clipPath: "inset(0 100% 0 0)" },
        visible: {
            clipPath: "inset(0 0% 0 0)",
            transition: { duration, delay }
        }
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Animated content reveal for feature tiles
export const AnimatedFeatureContent = ({
    title,
    descriptions,
    textColor,
    bgColor,
    className = ""
}: {
    title: string;
    descriptions: string[];
    textColor: string;
    bgColor: string;
    className?: string;
}) => {


    return (
        <ScrollStagger className={`flex flex-col justify-center ${className}`}>
            <StaggerItem>
                <h1 className={`text-3xl ${textColor} ml-6 mb-5`}>{title}</h1>
            </StaggerItem>
            <div className='flex flex-row gap-5'>
                <div className={`flex flex-col w-1.5 h-auto ${bgColor} rounded-md`}></div>
                <div className='flex flex-col'>
                    {descriptions.map((description, index) => (
                        <StaggerItem key={index}>
                            <RowText color={textColor} description={description} />
                        </StaggerItem>
                    ))}
                </div>
            </div>
        </ScrollStagger>
    )
}

// Image float animation
export const FloatingImage = ({
    children,
    duration = 4,
    distance = 10,
    className = ""
}: {
    children: ReactNode;
    duration?: number;
    distance?: number;
    className?: string;
}) => {
    const floatingAnimation = {
        y: [0, -distance, 0],
        transition: {
            duration,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut"
        }
    }

    return (
        <motion.div
            animate={floatingAnimation}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Staggered image group
export const StaggeredImageGroup = ({
    images,
    className = ""
}: {
    images: {
        src: string;
        alt?: string;
        width?: number;
        height?: number;
        className?: string;
    }[];
    className?: string;
}) => {
    return (
        <ScrollStagger className={`flex flex-row ${className}`}>
            {images.map((img, index) => (
                <StaggerItem key={index} className="relative">
                    <Image
                        src={img.src}
                        alt={img.alt || `feature-image-${index}`}
                        width={img.width || 300}
                        height={img.height || 300}
                        className={img.className || ''}
                    />
                </StaggerItem>
            ))}
        </ScrollStagger>
    )
}