import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full bg-black font-sans xl:clip-path-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
            <div className="fixed top-0 left-0 w-full h-screen -z-10">
                {/* Background Image Setup */}
                {/* Note: Updated background image to a new fashion-forward, unique moody shot */}
                <img
                    src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=2600"
                    alt="Hero Background"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                />

                {/* Subtle Overlay to make text pop */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                {/* Real Content Wrapper */}
                <div className="relative z-10 flex flex-col h-full justify-end p-6 md:p-10 lg:p-14 text-white pb-32">


                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-6">
                        {/* Main Title comes from Left */}
                        <h1 className="text-6xl md:text-8xl lg:text-[130px] font-medium tracking-tighter leading-none opacity-0 animate-slide-in-left">
                            Uclose Co.
                        </h1>

                        {/* Tagline comes from Right */}
                        <div className="text-right flex flex-col items-end opacity-0 animate-slide-in-right">
                            <p className="text-lg md:text-2xl lg:text-3xl font-normal tracking-wide text-gray-100 mb-2">
                                Timeless Wardrobe<br />
                                Everyday Power.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HeroSection;
