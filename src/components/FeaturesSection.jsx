import React from 'react';
import ScrollFloat from './ScrollFloat';

const FeaturesSection = () => {
    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25a9 9 0 00-9-9h-2.25" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5h16.5M3.75 14.25L5.106 5.272M16.5 14.25l1.087-7.138a1.5 1.5 0 00-1.444-1.862H5.106" />
                </svg>
            ),
            text: "Free shipping on orders over $75"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            ),
            text: "14-day hassle-free returns"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.223a.75.75 0 00-.384.236 13.52 13.52 0 00-2.099 8.664 11.959 11.959 0 0010.884 9.136 11.959 11.959 0 0010.884-9.136 13.52 13.52 0 00-2.099-8.664.75.75 0 00-.384-.236A11.959 11.959 0 0112 2.714z" />
                </svg>
            ),
            text: "30-day product warranty"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75V10.5m0 2.25V13.5m0 2.25V16.5m-5.25-9h10.5a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H9a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 19.5a4.5 4.5 0 01-4.5-4.5V12a4.5 4.5 0 119 0v3a4.5 4.5 0 01-4.5 4.5z" />
                </svg>
            ),
            text: "Customer support 24/7"
        }
    ];

    return (
        <section className="relative z-10 bg-white py-12 md:py-20 border-t border-gray-200 min-h-[320px] flex items-center">
            <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-y-12 md:gap-y-0">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center text-center px-4 md:px-4 py-4 md:py-0 reveal ${index !== 0 ? 'md:border-l border-gray-200' : ''
                                }`}
                        >
                            <div className="mb-6 text-black">
                                {feature.icon}
                            </div>
                            <div className="flex justify-center w-full">
                                <ScrollFloat
                                    animationDuration={0.8}
                                    stagger={0.015}
                                    containerClassName="!my-0 !mt-2 flex justify-center w-full"
                                    textClassName="text-base md:text-lg leading-snug font-medium text-black max-w-[200px] text-center"
                                >
                                    {feature.text}
                                </ScrollFloat>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
