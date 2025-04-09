
import Image from 'next/image'
import React from 'react'
import RowText from './RowText'
import {
    ScrollFadeUp,
    ScrollSlideIn,
    ScrollStagger,
    StaggerItem,
    FloatingImage
} from './ScrollEffects'

interface ImageProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    className?: string;
}

interface FeatureTileProps {
    // Content
    title?: string;
    descriptions?: string[];

    // Images
    images?: ImageProps[];

    // Styling options
    textColor?: string;
    bgColor?: string;
    backgroundColor?: string;

    // Additional class names
    containerClassName?: string;
    contentClassName?: string;
    imageContainerClassName?: string;

    // Animation options
    animated?: boolean;
    contentDirection?: "left" | "right" | "top" | "bottom";
    imageDirection?: "left" | "right" | "top" | "bottom";
    floatingImages?: boolean;
}

const AnimatedFeatureTile = ({
    // Content
    title = 'Track your Appointments',
    descriptions = [
        'View upcoming and past therapy sessions in one place.',
        'Stay on top of your wellness journey with real-time updates.',
        'Get reminders and notifications for your scheduled sessions.',
        'Access details of completed sessions anytime for reference.'
    ],

    images = [],

    // Styling options
    textColor = 'text-primary',
    bgColor = 'bg-primary',
    backgroundColor = 'bg-light',

    // Additional class names
    containerClassName = '',
    contentClassName = '',
    imageContainerClassName = '',

    // Animation options
    animated = true,
    contentDirection = "left",
    imageDirection = "right",
    floatingImages = false
}: FeatureTileProps) => {
    // Render standard component without animations
    if (!animated) {
        return (
            <section className={`px-4 md:px-6 ${backgroundColor} ${containerClassName}`}>
                <div className='container mx-auto pt-5 pb-10'>
                    <div className='flex flex-col md:flex-row justify-between'>
                        <div className={`flex flex-col justify-center ${contentClassName}`}>
                            <h1 className={`text-3xl ${textColor} ml-6 mb-5`}>{title}</h1>
                            <div className='flex flex-row gap-5'>
                                <div className={`flex flex-col w-1.5 h-auto ${bgColor} rounded-md`}>
                                </div>
                                <div className='flex flex-col'>
                                    {descriptions.map((description, index) => (
                                        <RowText key={index} color={textColor} description={description} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={`flex flex-row ${imageContainerClassName}`}>
                            {images.map((img, index) => (
                                <div key={index} className="filter drop-shadow-lg">
                                    <Image
                                        src={img.src}
                                        alt={img.alt || `feature-image-${index}`}
                                        width={img.width || 300}
                                        height={img.height || 300}
                                        className={`${img.className || ''}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // Render with animations
    return (
        <ScrollFadeUp className={`px-4 md:px-6 ${backgroundColor} ${containerClassName}`}>
            <div className='container mx-auto pt-5 pb-10'>
                <div className='flex flex-col md:flex-row justify-between'>
                    <ScrollSlideIn
                        direction={contentDirection}
                        className={`flex flex-col justify-center ${contentClassName}`}
                    >
                        <ScrollStagger>
                            <StaggerItem>
                                <h1 className={`text-3xl ${textColor} ml-6 mb-5`}>{title}</h1>
                            </StaggerItem>
                            <div className='flex flex-row gap-5'>
                                <div className={`flex flex-col w-1.5 h-auto ${bgColor} rounded-md`}>
                                </div>
                                <div className='flex flex-col'>
                                    {descriptions.map((description, index) => (
                                        <StaggerItem key={index}>
                                            <RowText color={textColor} description={description} />
                                        </StaggerItem>
                                    ))}
                                </div>
                            </div>
                        </ScrollStagger>
                    </ScrollSlideIn>

                    <ScrollSlideIn
                        direction={imageDirection}
                        className={`flex flex-row ${imageContainerClassName}`}
                    >
                        {images.map((img, index) => (
                            floatingImages ? (
                                <FloatingImage key={index} duration={4 + index * 0.5} distance={10}>
                                    <div className="filter drop-shadow-lg">
                                        <Image
                                            src={img.src}
                                            alt={img.alt || `feature-image-${index}`}
                                            width={img.width || 300}
                                            height={img.height || 300}
                                            className={img.className || ''}
                                        />
                                    </div>
                                </FloatingImage>
                            ) : (
                                <div key={index} className="filter drop-shadow-lg">
                                    <Image
                                        src={img.src}
                                        alt={img.alt || `feature-image-${index}`}
                                        width={img.width || 300}
                                        height={img.height || 300}
                                        className={img.className || ''}
                                    />
                                </div>
                            )
                        ))}
                    </ScrollSlideIn>
                </div>
            </div>
        </ScrollFadeUp>
    )
}

export default AnimatedFeatureTile

export const AnimatedFeatureTileReverse = ({
    // Content
    title = 'Track your Appointments',
    descriptions = [
        'View upcoming and past therapy sessions in one place.',
        'Stay on top of your wellness journey with real-time updates.',
        'Get reminders and notifications for your scheduled sessions.',
        'Access details of completed sessions anytime for reference.'
    ],

    // Images - can be any number of images with their own classNames
    images = [],

    // Styling options
    textColor = 'text-lime-500',
    bgColor = 'bg-lime-500',
    backgroundColor = 'bg-lime-50',

    // Additional class names
    containerClassName = '',
    contentClassName = '',
    imageContainerClassName = '',

    // Animation options
    animated = true,
    contentDirection = "right",
    imageDirection = "left",
    floatingImages = false
}: FeatureTileProps) => {
    // Render standard component without animations
    if (!animated) {
        return (
            <section className={`px-4 md:px-6 ${backgroundColor} ${containerClassName}`}>
                <div className='container mx-auto pt-5 pb-10'>
                    <div className='flex flex-col md:flex-row-reverse justify-between'>
                        <div className={`flex flex-col justify-center ${contentClassName}`}>
                            <h1 className={`text-3xl ${textColor} ml-6 mb-5`}>{title}</h1>
                            <div className='flex flex-row gap-5'>
                                <div className={`flex flex-col w-1.5 h-auto ${bgColor} rounded-md`}>
                                </div>
                                <div className='flex flex-col'>
                                    {descriptions.map((description, index) => (
                                        <RowText key={index} color={textColor} description={description} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={`flex flex-row relative translate-x-8 md:translate-x-0 mt-10 ${imageContainerClassName}`}>
                            {images.map((img, index) => (
                                <div key={index} className="filter drop-shadow-lg">
                                    <Image
                                        src={img.src}
                                        alt={img.alt || `feature-image-${index}`}
                                        width={img.width || 300}
                                        height={img.height || 300}
                                        className={img.className || ''}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    // Render with animations
    return (
        <ScrollFadeUp className={`px-4 md:px-6 ${backgroundColor} ${containerClassName}`}>
            <div className='container mx-auto pt-5 pb-10'>
                <div className='flex flex-col md:flex-row-reverse justify-between'>
                    <ScrollSlideIn
                        direction={contentDirection}
                        className={`flex flex-col justify-center ${contentClassName}`}
                    >
                        <ScrollStagger>
                            <StaggerItem>
                                <h1 className={`text-3xl ${textColor} ml-6 mb-5`}>{title}</h1>
                            </StaggerItem>
                            <div className='flex flex-row gap-5'>
                                <div className={`flex flex-col w-1.5 h-auto ${bgColor} rounded-md`}>
                                </div>
                                <div className='flex flex-col'>
                                    {descriptions.map((description, index) => (
                                        <StaggerItem key={index}>
                                            <RowText color={textColor} description={description} />
                                        </StaggerItem>
                                    ))}
                                </div>
                            </div>
                        </ScrollStagger>
                    </ScrollSlideIn>

                    <ScrollSlideIn
                        direction={imageDirection}
                        className={`flex flex-row relative translate-x-8 md:translate-x-0 mt-10 ${imageContainerClassName}`}
                    >
                        {images.map((img, index) => (
                            floatingImages ? (
                                <FloatingImage key={index} duration={4 + index * 0.5} distance={10}>
                                    <div className="filter drop-shadow-lg">
                                        <Image
                                            src={img.src}
                                            alt={img.alt || `feature-image-${index}`}
                                            width={img.width || 300}
                                            height={img.height || 300}
                                            className={img.className || ''}
                                        />
                                    </div>
                                </FloatingImage>
                            ) : (
                                <div key={index} className="filter drop-shadow-lg">
                                    <Image
                                        src={img.src}
                                        alt={img.alt || `feature-image-${index}`}
                                        width={img.width || 300}
                                        height={img.height || 300}
                                        className={img.className || ''}
                                    />
                                </div>
                            )
                        ))}
                    </ScrollSlideIn>
                </div>
            </div>
        </ScrollFadeUp>
    )
}