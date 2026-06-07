import React from 'react';
import { Link } from 'react-router-dom';
import NewsSection from '../components/NewsSection';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
const NewsPage = () => {
    useScrollReveal();
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Sticky Navbar */}


            <div className="pt-24">
                <NewsSection />
            </div>

            {/* Extended News Section for the Page */}
            <div className="bg-white py-12 pb-32 px-6 md:px-10 lg:px-14">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="reveal group cursor-pointer">
                        <div className="overflow-hidden bg-[#f4f4f4] aspect-video relative w-full mb-6">
                            <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop"
                                alt="Editorial"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                        </div>
                        <h3 className="text-2xl font-medium mb-2">Summer Monochrome Editorial</h3>
                        <p className="text-gray-500">Exploring the nuances of a single shade under the midday sun.</p>
                    </div>
                    <div className="reveal group cursor-pointer md:mt-12">
                        <div className="overflow-hidden bg-[#f4f4f4] aspect-video relative w-full mb-6">
                            <img
                                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2670&auto=format&fit=crop"
                                alt="Workshop"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                        </div>
                        <h3 className="text-2xl font-medium mb-2">Back to the Studio</h3>
                        <p className="text-gray-500">A glimpse into our workshop as we prepare the next capsule collection.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NewsPage;
