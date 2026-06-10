import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, getImageUrl } from '../services/api';

const HeroSection = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await api.getSiteSettings();
                setSettings(data);
            } catch (err) {
                console.error('Failed to fetch site settings in HeroSection:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    // Fallbacks
    const heroImage = settings?.hero_image 
        ? getImageUrl(settings.hero_image)
        : "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=2600";
    const heroTitle = settings?.hero_title || "Uclose Co.";
    const heroTagline = settings?.hero_tagline || "Timeless Wardrobe\nEveryday Power.";

    return (
        <div className="relative h-screen w-full bg-black font-sans xl:clip-path-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
            <div className="fixed top-0 left-0 w-full h-screen -z-10">
                {/* Background Image Setup */}
                <img
                    src={heroImage}
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
                            {heroTitle}
                        </h1>

                        {/* Tagline comes from Right */}
                        <div className="text-right flex flex-col items-end opacity-0 animate-slide-in-right">
                            <p className="text-lg md:text-2xl lg:text-3xl font-normal tracking-wide text-gray-100 mb-2">
                                {heroTagline.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < heroTagline.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
