import React from 'react';
import ScrollFloat from './ScrollFloat';

const StyleSection = () => {
    return (
        <section className="bg-white text-black h-screen w-full flex flex-col items-center justify-center p-6 md:p-10 lg:p-14 relative font-sans">
            {/* Centered Large Text */}
            <div className="flex-1 flex items-center justify-center">
                <ScrollFloat
                    textClassName="text-[12vw] sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-medium tracking-tighter leading-[0.9] text-center"
                >
                    Style It Your Way
                </ScrollFloat>
            </div>

            {/* Footer / Attribution - Absolute to not affect centering */}
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 lg:bottom-14 lg:right-14 opacity-0 pointer-events-none">
                <div className="text-[10px] text-gray-300">Made with Uclose</div>
            </div>
        </section>
    );
};

export default StyleSection;
