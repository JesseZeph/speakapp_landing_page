import { ScrollReveal } from '@/components/ScrollEffects'
import Image from 'next/image'
import React from 'react'
import donateImage from '@/public/donate.png'

const Donate = () => {
    return (
        <section className='w-full min-h-screen flex flex-col overflow-x-hidden'>
            <ScrollReveal>
                <div className='container mx-auto px-5 pt-5 pb-10'>
                    <h1 className='text-base md:text-3xl text-center mb-10 font-semibold'>Donate</h1>
                    <div className='flex flex-col lg:flex-row gap-10'>
                        <div className='self-start'>
                            <Image
                                src={donateImage}
                                alt='Donate'
                                width={600}
                                height={600}
                                className='w-full h-auto object-contain'
                            />

                        </div>

                        <div className="space-y-4 text-justify">
                            <p>
                                Therapy has long been underrated, especially in this part of the world. We have witnessed countless disturbing events caused by individuals labeled as mentally unstable or toxic—most times, victims of untreated trauma or someone else’s pain passed on to them.
                            </p>

                            <p>
                                Mental illness isn’t madness or psychosis, but a psychological disorder. It’s simply when your mind isn’t working the way it should, making it hard to feel good or handle daily affairs—most times confused for a clinical disorder.
                            </p>

                            <p>
                                The SPEAK initiative is more than just an app, it’s a movement. A movement designed to connect people to professional therapists and supportive communities, while also sensitizing and educating the world on the importance of mental wellness.
                            </p>

                            <p>
                                As a nation, we must take proactive steps to preserve our sanity. Only then can we promote peace and order in our developing societies.
                            </p>

                            <p>
                                While the need for mental wellness cannot be overemphasized, not everyone can afford therapy. That’s where the SpeakApp donation platform comes in.
                            </p>

                            <p>
                                We have created this website to give governments, private sector organizations, and individuals the opportunity to sponsor therapy sessions for those who need it most and can’t afford it.
                            </p>

                            <p>
                                Your donations would not only provide access to vital mental health services but also create job opportunities for certified professionals offering help on the app.
                            </p>

                            <p>
                                An unstable mind eventually leads to unstable decisions, and those decisions turn into a more toxic society. We must normalize prioritizing our mental health for the sake of a sane society.
                            </p>

                            <p>
                                Today, more than ever, the internet is chaotic, and society is overwhelmed with negativity. From the military to civil servants, healthcare workers, educators, students, children who need child therapy, and even the everyday person hustling to make ends meet—everyone deserves to speak. They deserve a chance to heal, because speaking is our first therapy.
                            </p>

                            <p>
                                This platform promotes complete transparency, ensuring your donations are tracked and directed appropriately toward either free or subsidized therapy services, while still supporting the professionals providing services on the app.
                            </p>

                            <p>
                                Let’s protect our future by safeguarding our minds.<br />
                                Let’s promote sanity.<br />
                                Let’s create a safe space in a toxic world.<br />
                                Let’s support mental wellness in our society.
                            </p>

                            <p>
                                We may lose our society if we don’t fight for a sane atmosphere.<br />
                                Join us. Give hope. Let them SPEAK.
                            </p>

                            <div className='w-50 btn-primary cursor-pointer mt-10'>
                                <p className='text-center'>Donate Now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}

export default Donate