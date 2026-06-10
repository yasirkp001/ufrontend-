import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageLoader = () => {
    const location = useLocation();
    const [isAnimating, setIsAnimating] = useState(true);
    const [renderBase, setRenderBase] = useState(true);

    useEffect(() => {
        // Scroll to top immediately when route changes
        window.scrollTo(0, 0);

        // Start showing the loader
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRenderBase(true);
        setIsAnimating(true);

        // Block visibility for exactly 500ms (0.5s)
        const exitTimer = setTimeout(() => {
            setIsAnimating(false);
        }, 500);

        // Remove from DOM completely after fade out finishes
        const unmountTimer = setTimeout(() => {
            setRenderBase(false);
        }, 800); // 500ms + 300ms CSS transition

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(unmountTimer);
        };
    }, [location.pathname]);

    if (!renderBase) return null;

    return (
        <div
            className={`fixed inset-0 z-[99999] bg-[#fafafa] flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${isAnimating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Branded Circular Loading Spinner */}
            <div className="relative flex items-center justify-center">
                <div className="absolute w-28 h-28 border border-gray-200 border-t-black rounded-full animate-spin"></div>
                <span className="text-xl font-medium tracking-tighter uppercase text-black">Uclose</span>
            </div>
        </div>
    );
};

export default PageLoader;
