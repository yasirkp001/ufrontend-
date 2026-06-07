import React from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

const NotFoundPage = () => {
    useScrollReveal();

    return (
        <div className="bg-white min-h-screen text-black font-sans flex flex-col relative overflow-hidden">
            {/* Background Aesthetic Line Patterns */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-10 md:px-24">
                <div className="w-[1px] h-full bg-gray-50"></div>
                <div className="w-[1px] h-full bg-gray-50 hidden md:block"></div>
                <div className="w-[1px] h-full bg-gray-50"></div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 pt-32 relative z-10">
                <div className="w-full max-w-lg text-center reveal">
                    {/* Big Bold Minimalist Error Code */}
                    <div className="relative inline-block mb-8">
                        <h1 className="text-[10rem] md:text-[14rem] font-light tracking-tighter leading-none select-none text-black">
                            404
                        </h1>
                        <span className="absolute -bottom-2 right-4 bg-black text-white text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1">
                            Page Not Found
                        </span>
                    </div>

                    {/* Explanatory Text */}
                    <div className="mb-12 max-w-md mx-auto">
                        <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-4 uppercase">
                            Lost in Time.
                        </h2>
                        <p className="text-gray-400 text-sm font-light leading-relaxed">
                            The item or collection you are looking for is unavailable, has been renamed, or does not exist in our current catalog.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
                        <Link
                            to="/"
                            className="w-full sm:w-auto bg-black text-white px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-all duration-300 rounded-sm text-center"
                        >
                            Return Home
                        </Link>
                        <Link
                            to="/products"
                            className="w-full sm:w-auto bg-transparent border border-gray-200 text-black px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all duration-300 rounded-sm text-center"
                        >
                            Shop Catalog
                        </Link>
                    </div>
                </div>
            </div>

            {/* Subtle Footer */}
            <div className="p-10 text-center text-[10px] uppercase tracking-[0.2em] text-gray-300 font-light relative z-10">
                © 2026 Uclose Co. — Timeless Wardrobe.
            </div>
        </div>
    );
};

export default NotFoundPage;
