import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';

const ProductDetailPage = () => {
    useScrollReveal();
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('M');
    const [added, setAdded] = useState(false);
    const [activeTab, setActiveTab] = useState('description');
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    // Size Guide States
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [sizeGuide, setSizeGuide] = useState(null);
    const [guideLoading, setGuideLoading] = useState(false);
    const [guideError, setGuideError] = useState(null);
    const dialogRef = React.useRef(null);

    useEffect(() => {
        const loadDetails = async () => {
            setLoading(true);
            try {
                const prodData = await api.getProductById(id);
                setProduct(prodData);
                
                // Default selection to first available size or 'M'
                if (prodData.sizes && prodData.sizes.length > 0) {
                    setSelectedSize(prodData.sizes[0]);
                } else {
                    setSelectedSize('M');
                }
                
                const allProds = await api.getProducts();
                setRecommended(allProds.filter(p => p.id !== prodData.id).slice(0, 4));
            } catch (err) {
                console.error('Failed to load product details:', err);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
        window.scrollTo(0, 0);
    }, [id]);

    // Manage Native Dialog Open/Close state
    useEffect(() => {
        if (showSizeGuide) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [showSizeGuide]);

    // Fallback light-dismiss backdrop listener for Safari and older browsers
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleBackdropClick = (event) => {
            if (event.target !== dialog) return;
            const rect = dialog.getBoundingClientRect();
            const isDialogContent = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );
            if (!isDialogContent) {
                setShowSizeGuide(false);
            }
        };

        dialog.addEventListener('click', handleBackdropClick);
        return () => {
            dialog.removeEventListener('click', handleBackdropClick);
        };
    }, [showSizeGuide]);

    const handleOpenSizeGuide = async () => {
        setShowSizeGuide(true);
        setGuideLoading(true);
        setGuideError(null);
        try {
            const data = await api.getSizeGuideByCategory(product.category);
            setSizeGuide(data);
        } catch (err) {
            setSizeGuide(null);
            setGuideError('No specific size guide available for this category. Please follow standard sizing.');
            console.error('Error fetching size guide:', err);
        } finally {
            setGuideLoading(false);
        }
    };

    if (loading || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, selectedSize);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen font-sans text-black">
            {/* Spacer for Fixed Navbar */}
            <div className="h-24 md:h-32"></div>

            <div className="pb-20 px-6 md:px-14 lg:px-20 max-w-[1400px] mx-auto">
                {/* Back Link */}
                <Link to="/products" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors mb-12 group">
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Back to Collection
                </Link>

                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Left: Product Image - Sticky on Desktop */}
                    <div className="lg:sticky lg:top-32 w-full order-1 lg:order-1 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        <div className="aspect-[4/5] bg-[#f8f8f8] overflow-hidden rounded-sm group">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000"
                                loading="eager"
                            />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 order-2 lg:order-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-4">{product.category}</p>
                        <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">{product.name}</h1>
                        <p className="text-2xl font-light mb-10">${product.price}</p>

                        {/* Size Selection */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Select Size</label>
                                <button 
                                    onClick={handleOpenSizeGuide}
                                    className="text-[10px] uppercase tracking-widest font-bold text-black border-b border-black hover:opacity-75 transition-opacity"
                                >
                                    Size Guide
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 border flex items-center justify-center text-xs font-bold transition-all ${selectedSize === size
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-black border-gray-200 hover:border-black'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={added}
                            className={`w-full py-6 text-xs uppercase tracking-widest font-black transition-all mb-12 ${added
                                ? 'bg-green-600 text-white'
                                : 'bg-black text-white hover:bg-gray-800'}`}
                        >
                            {added ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Added to bag
                                </span>
                            ) : 'Add to Shopping Bag'}
                        </button>

                        {/* Tabs / Accordions */}
                        <div className="border-t border-gray-100 space-y-4 pt-4">
                            {/* Description */}
                            <div className="border-b border-gray-100 pb-4">
                                <button
                                    onClick={() => setActiveTab(activeTab === 'description' ? null : 'description')}
                                    className="w-full flex items-center justify-between py-4 text-left"
                                >
                                    <span className="text-[10px] uppercase tracking-widest font-black">Description & Fit</span>
                                    <svg className={`w-4 h-4 transition-transform ${activeTab === 'description' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {activeTab === 'description' && (
                                    <div className="py-4 text-gray-500 leading-relaxed text-sm animate-in fade-in duration-300">
                                        <p className="mb-4">{product.description}</p>
                                        <ul className="space-y-2">
                                            {product.details.map((detail, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-2 shrink-0"></span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Care */}
                            <div className="border-b border-gray-100 pb-4">
                                <button
                                    onClick={() => setActiveTab(activeTab === 'care' ? null : 'care')}
                                    className="w-full flex items-center justify-between py-4 text-left"
                                >
                                    <span className="text-[10px] uppercase tracking-widest font-black">Care Instructions</span>
                                    <svg className={`w-4 h-4 transition-transform ${activeTab === 'care' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {activeTab === 'care' && (
                                    <div className="py-4 text-gray-500 leading-relaxed text-sm animate-in fade-in duration-300">
                                        {product.care}
                                    </div>
                                )}
                            </div>

                            {/* Shipping */}
                            <div className="border-b border-gray-100 pb-4">
                                <button
                                    onClick={() => setActiveTab(activeTab === 'shipping' ? null : 'shipping')}
                                    className="w-full flex items-center justify-between py-4 text-left"
                                >
                                    <span className="text-[10px] uppercase tracking-widest font-black">Shipping & Returns</span>
                                    <svg className={`w-4 h-4 transition-transform ${activeTab === 'shipping' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {activeTab === 'shipping' && (
                                    <div className="py-4 text-gray-500 leading-relaxed text-sm animate-in fade-in duration-300">
                                        Free standard delivery on all orders over $200. Express delivery available at checkout. 30-day returns on all unused items.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Section */}
                <div className="mt-32">
                    <h2 className="text-2xl font-medium tracking-tight mb-12">You may also like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {recommended.map(item => (
                            <Link key={item.id} to={`/product/${item.id}`} className="group no-underline">
                                <div className="aspect-[3/4] bg-[#f8f8f8] overflow-hidden mb-4">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <h3 className="text-xs uppercase tracking-widest font-black text-black group-hover:opacity-60 transition-opacity">{item.name}</h3>
                                <p className="text-gray-400 text-[10px] mt-1">${item.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />

            {/* Native Size Guide Dialog */}
            <dialog
                ref={dialogRef}
                closedby="any"
                onClose={() => setShowSizeGuide(false)}
                className="p-8 max-w-lg w-[90%] md:w-full border-0 shadow-2xl rounded bg-white outline-none fixed inset-0 m-auto text-black z-50 animate-in fade-in zoom-in-95 duration-200"
            >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <h3 className="text-xs uppercase tracking-widest font-black text-black">
                        {product.category} Size Guide
                    </h3>
                    <button
                        onClick={() => setShowSizeGuide(false)}
                        className="text-gray-400 hover:text-black transition-colors"
                        aria-label="Close dialog"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {guideLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Loading Guide...</p>
                    </div>
                ) : guideError ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        <p className="mb-2 font-medium">No size guide found</p>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                            No specific size guide is available for this category yet. Standard sizing rules apply.
                        </p>
                    </div>
                ) : sizeGuide ? (
                    <div className="overflow-x-auto">
                        <p className="text-[10px] text-gray-400 mb-4 italic">All measurements are in inches unless otherwise specified.</p>
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-gray-100 uppercase tracking-wider text-[10px] text-gray-400 font-bold">
                                    <th className="py-3 pr-4">Size</th>
                                    {sizeGuide.columns?.map((col, i) => (
                                        <th key={i} className="py-3 px-4">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {sizeGuide.slots?.map((slot, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 pr-4 font-bold text-black">{slot.size}</td>
                                        {slot.measurements?.map((m, colIndex) => (
                                            <td key={colIndex} className="py-4 px-4 text-gray-600">{m}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </dialog>
        </div>
    );
};

export default ProductDetailPage;
