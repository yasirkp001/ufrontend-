import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../services/api';

const ProvenFavorites = () => {
    const products = [
        {
            id: 'pf-1',
            title: "Relaxed Linen Jacket",
            category: "JACKET",
            price: "$69.00",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2572&auto=format&fit=crop"
        },
        {
            id: 'pf-2',
            title: "Basic Regular Fit Tee",
            category: "TEE",
            price: "$19.00",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2600&auto=format&fit=crop"
        },
        {
            id: 'pf-3',
            title: "Baggy Denim Trousers",
            category: "PANTS",
            price: "$89.00",
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2574&auto=format&fit=crop"
        }
    ];

    const { addToCart } = useCart();
    const [selectedSizes, setSelectedSizes] = useState({});
    const [addedId, setAddedId] = useState(null);

    const handleSizeSelect = (productId, size) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    };

    const handleAddToCart = (product) => {
        const size = selectedSizes[product.id] || 'M';
        // Normalize product data for cart (convert title to name, string price to number)
        const cartProduct = {
            ...product,
            name: product.title,
            price: parseFloat(product.price.replace('$', ''))
        };
        addToCart(cartProduct, size);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    return (
        <section className="bg-white text-black py-20 md:py-32 px-6 md:px-10 lg:px-14 border-t border-gray-300">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-16 gap-8 reveal">
                <h2 className="text-3xl md:text-[45px] font-medium tracking-tight leading-tight max-w-sm">
                    Proven<br />Favorites
                </h2>
                <div className="max-w-xs md:mt-4">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
                        Trusted by thousands of customers. These pieces define versatility — perfect for workdays or weekends.
                    </p>
                </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {products.map((product) => (
                    <div key={product.id} className="group cursor-pointer flex flex-col reveal">
                        <div className="overflow-hidden bg-[#f4f4f4] aspect-[3/4] relative w-full mb-6">
                            <img
                                src={getImageUrl(product.image)}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {/* Quick Add Overlay */}
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <div className="flex justify-center flex-wrap gap-2 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <button
                                            key={size}
                                            onClick={(e) => { e.preventDefault(); handleSizeSelect(product.id, size); }}
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
                                    onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                                    className="w-full bg-white text-black py-3 text-[10px] uppercase tracking-widest font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 hover:bg-black hover:text-white"
                                >
                                    {addedId === product.id ? 'Added to Cart' : 'Quick Add +'}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full relative">
                            <div className="flex justify-between items-start w-full pr-12">
                                <h3 className="text-base font-medium line-clamp-1">{product.title}</h3>
                                <p className="text-gray-900 font-medium absolute right-0 top-0">{product.price}</p>
                            </div>
                            <p className="text-xs text-gray-400 font-medium tracking-widest">{product.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProvenFavorites;
