import React from 'react';
import HeroSection from '../components/HeroSection';
import ProvenFavorites from '../components/ProvenFavorites';
import FeaturesSection from '../components/FeaturesSection';
import StyleSection from '../components/StyleSection';
import SustainabilitySection from '../components/SustainabilitySection';
import StoresSection from '../components/StoresSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';

const HomePage = () => {
    useScrollReveal();
    return (
        <div className="bg-white min-h-screen">
            <HeroSection />
            <ProvenFavorites />
            <FeaturesSection />
            <StyleSection />
            <SustainabilitySection />
            <StoresSection />
            <FaqSection />
            <Footer />
        </div>
    );
};

export default HomePage;
