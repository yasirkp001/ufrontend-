import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import ScrollReveal from '../components/ScrollReveal';
const AboutPage = () => {
    useScrollReveal();
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Sticky Navbar */}


            {/* Main Content */}
            <div className="pt-32 pb-20 px-6 md:px-14 lg:px-20 max-w-[1400px] mx-auto">
                <div className="reveal mb-20">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-none mb-10">
                        Our Story.
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div className="reveal">
                        <img
                            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2670&auto=format&fit=crop"
                            alt="Studio"
                            className="w-full aspect-[4/5] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>

                    <div className="flex flex-col gap-10">
                        <ScrollReveal
                            baseOpacity={0}
                            baseRotation={2}
                            blurStrength={5}
                            textClassName="text-2xl md:text-3xl lg:text-4xl font-normal leading-tight text-gray-800"
                        >
                            At Uclose Co., we believe that true elegance lies in simplicity. Our journey began with a single mission: to craft a wardrobe that empowers the everyday person through timeless design and unparalleled quality.
                        </ScrollReveal>

                        <div className="reveal text-lg text-gray-600 leading-relaxed font-light flex flex-col gap-6">
                            <p>
                                Founded in 2026, we've spent years obsessing over the details—from the strength of our stitching to the softness of our ethically sourced fabrics. We don't follow trends; we create pieces that last a lifetime.
                            </p>
                            <p>
                                Our design philosophy is rooted in minimalism. Every cut, color, and texture is chosen with intention, ensuring that our collection transitions seamlessly from a morning meeting to an evening out.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-10 border-t border-gray-100 reveal">
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Philosophy</h4>
                                <p className="text-base font-medium">Timeless Minimalism</p>
                            </div>
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2">Craft</h4>
                                <p className="text-base font-medium">Ethically Sourced</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutPage;
