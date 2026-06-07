import React from 'react';
import ScrollReveal from './ScrollReveal';

const SustainabilitySection = () => {
    return (
        <section className="bg-white text-black py-20 md:py-32 px-6 md:px-14 lg:px-20 border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto">
                <div className="reveal mb-20">
                    <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-none mb-10 max-w-3xl">
                        Thoughtful Creation. Responsibly Sourced.
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
                    <div className="reveal">
                        <img
                            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2548&auto=format&fit=crop"
                            alt="Sustainable Fabric"
                            className="w-full aspect-[4/3] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                    <div className="flex flex-col gap-8">
                        <ScrollReveal baseOpacity={0} blurStrength={4} textClassName="text-2xl md:text-3xl font-normal leading-tight">
                            We believe that fashion should not come at the cost of the environment or the people who make it.
                        </ScrollReveal>
                        <p className="text-gray-600 text-lg leading-relaxed font-light reveal">
                            Our sustainability commitment is woven into every garment. We partner with family-owned mills in Italy and Japan that prioritize water conservation, renewable energy, and fair labor practices.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-gray-100">
                    <div className="reveal">
                        <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">01 / Material</h4>
                        <p className="text-xl font-medium mb-2">Organic & Recycled</p>
                        <p className="text-gray-600 text-sm">We use GOTS-certified organic cotton and GRS-certified recycled polyesters.</p>
                    </div>
                    <div className="reveal">
                        <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">02 / People</h4>
                        <p className="text-xl font-medium mb-2">Ethical Labor</p>
                        <p className="text-gray-600 text-sm">Every artisan in our supply chain is paid a living wage and works in a safe environment.</p>
                    </div>
                    <div className="reveal">
                        <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-4">03 / Future</h4>
                        <p className="text-xl font-medium mb-2">Circular Design</p>
                        <p className="text-gray-600 text-sm">Our garments are engineered to be repaired and eventually recycled, closing the loop.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SustainabilitySection;
