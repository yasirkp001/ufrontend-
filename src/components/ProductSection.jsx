import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const ProductSection = ({ showFilter = false }) => {
    const { addToCart } = useCart();
    const [searchParams] = useSearchParams();
    const [addedId, setAddedId] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize filter from URL if present
    const categoryParam = searchParams.get('category');
    const sortParam = searchParams.get('sort');

    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await api.getProducts();
                setProducts(data);
            } catch (err) {
                console.error('Failed to load products:', err);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        if (categoryParam === 'new') {
            setActiveFilter('New Arrivals'); // Assuming you had a 'New Arrivals' category or similar logic
        } else if (sortParam === 'best_sellers') {
            // For best sellers, we might want to just show all for now, or you can add a 'isBestSeller' flag to constants later
            setActiveFilter('All');
        }
    }, [categoryParam, sortParam]);

    const categories = ['All', ...new Set(products.map(p => p.category))];

    // Simple sorting to actually demonstrate 'Best Sellers' vs 'New Arrivals'
    let displayedProducts = products;

    if (showFilter && activeFilter !== 'All') {
        displayedProducts = displayedProducts.filter(p => p.category === activeFilter);
    }

    if (sortParam === 'best_sellers') {
        // Mock best sellers by reversing or slicing
        displayedProducts = [...displayedProducts].reverse();
    } else if (categoryParam === 'new') {
        // Mock new arrivals
        displayedProducts = displayedProducts.slice(0, 4);
    }

    const filteredProducts = displayedProducts;
    const handleSizeSelect = (e, productId, size) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    };

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        const size = selectedSizes[product.id] || 'M';
        addToCart(product, size);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    if (loading) {
        return (
            <section className="bg-white text-black py-20 md:py-32 px-6 md:px-10 lg:px-14 flex items-center justify-center min-h-[40vh]" id="product">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </section>
        );
    }

    return (
        <section className="bg-white text-black py-20 md:py-32 px-6 md:px-10 lg:px-14" id="product">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 reveal">
                <h2 className="text-3xl md:text-[45px] font-medium tracking-tight leading-tight max-w-lg">
                    Everyday<br />Essentials
                </h2>
                <p className="text-gray-600 max-w-md text-base md:text-lg leading-relaxed md:pb-2 font-medium">
                    Explore our best-selling categories — from crisp polos and refined shirts to versatile jackets and relaxed-fit trousers, made to elevate your everyday wardrobe.
                </p>
            </div>

            {/* Filter Buttons */}
            {showFilter && (
                <div className="flex flex-wrap gap-4 mb-10 reveal">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-4 py-2 border text-xs uppercase tracking-widest font-bold transition-all ${activeFilter === category
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col animate-in fade-in zoom-in-95 duration-500 text-black no-underline cursor-pointer">
                        <div className="overflow-hidden bg-[#f4f4f4] aspect-[4/5] relative w-full mb-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Quick Add Overlay */}
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <div className="flex justify-center flex-wrap gap-2 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={(e) => handleSizeSelect(e, product.id, size)}
                                            className={`w-8 h-8 rounded-full border text-[10px] font-bold flex items-center justify-center transition-all ${(selectedSizes[product.id] || 'M') === size
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-black border-gray-200 hover:border-black'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className={`w-full py-3 text-[10px] uppercase tracking-widest font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${addedId === product.id ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
                                >
                                    {addedId === product.id ? 'Added to Bag' : 'Quick Add +'}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-start px-1 group-hover:opacity-60 transition-opacity">
                            <h3 className="text-sm md:text-base font-medium uppercase tracking-wider">{product.name}</h3>
                            <p className="text-gray-500 text-sm">${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ProductSection;
