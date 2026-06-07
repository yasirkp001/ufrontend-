import React from 'react';
import { Link } from 'react-router-dom';
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
const ProductsPage = () => {
    useScrollReveal();
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Sticky Navbar for Products Page */}


            <div className="pt-24">
                <ProductSection showFilter={true} />
            </div>
            <Footer />
        </div>
    );
};

export default ProductsPage;
