import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const CartPage = () => {
    useScrollReveal();
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, updateSize, cartTotal, cartCount, addToCart, appliedPromo, setAppliedPromo, discount } = useCart();
    const { isAuthenticated, loading } = useAuth();

    // Promo Code Logic
    const [promoCode, setPromoCode] = useState(appliedPromo ? appliedPromo.code : '');
    const [promoError, setPromoError] = useState('');

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return;

        try {
            const coupon = await api.validateCoupon(promoCode);
            if (coupon.valid) {
                if (cartTotal < coupon.min_purchase) {
                    setPromoError(`Minimum purchase of $${coupon.min_purchase} required`);
                    setTimeout(() => setPromoError(''), 3000);
                    return;
                }
                setAppliedPromo(coupon);
                setPromoError('');
            }
        } catch (err) {
            setAppliedPromo(null);
            setPromoError(err.message || 'Invalid or expired promo code');
            setTimeout(() => setPromoError(''), 3000);
        }
    };

    const removePromo = () => {
        setPromoCode('');
        setAppliedPromo(null);
    };

    const promoApplied = !!appliedPromo;

    const finalTotal = Math.max(0, cartTotal - discount);

    // Free Shipping Progress
    const freeShippingThreshold = 200;
    const amountLeft = Math.max(0, freeShippingThreshold - cartTotal);
    const progress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

    const handleAddSuggested = (product) => {
        addToCart(product, 'M');
    };

    // Suggested Products
    const suggestedProducts = [
        { id: 'sugg-1', name: "Signature Leather Belt", price: 65, category: "Accessories", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=2570&auto=format&fit=crop" },
        { id: 'sugg-2', name: "Classic Aviator Sunglasses", price: 110, category: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2560&auto=format&fit=crop" },
        { id: 'sugg-3', name: "Canvas Weekend Tote", price: 85, category: "Bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2560&auto=format&fit=crop" },
        { id: 'sugg-4', name: "Minimalist Silver Watch", price: 145, category: "Accessories", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=2600&auto=format&fit=crop" }
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: '/cart' }} />;
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            <div className="pt-32 pb-20 px-6 md:px-14 lg:px-20 max-w-[1400px] mx-auto min-h-[70vh]">
                <div className="reveal mb-12">
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-none mb-4">Your Cart.</h1>
                    <p className="text-gray-500 text-lg font-light tracking-wide">
                        {cartCount === 0 ? 'Your cart is currently empty.' : `You have ${cartCount} items in your cart.`}
                    </p>
                </div>

                {cartItems.length > 0 ? (
                    <div className="flex flex-col w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
                            {/* LEFT COLUMN: Free Shipping + Cart Items */}
                            <div className="lg:col-span-2 flex flex-col gap-10">

                                {/* Premium Free Shipping Meter */}
                                <div className="bg-gray-50 p-8 rounded-sm reveal">
                                    <div className="flex justify-between items-end mb-4">
                                        <h3 className="text-xl font-medium tracking-tight">Free Shipping</h3>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                                            {amountLeft > 0
                                                ? `Add $${amountLeft.toFixed(2)} more`
                                                : "Unlocked!"}
                                        </p>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 overflow-hidden rounded-full">
                                        <div
                                            className="h-full bg-green-600 transition-all duration-1000 ease-out rounded-full"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    {amountLeft <= 0 && (
                                        <p className="text-xs text-green-600 font-bold tracking-wide mt-4 uppercase">
                                            Congratulations! You've qualified for free standard shipping.
                                        </p>
                                    )}
                                </div>

                                {/* Cart Items List */}
                                <div className="flex flex-col gap-8 reveal">
                                    {cartItems.map((item) => (
                                        <div key={`${item.id}-${item.size}`} className="flex flex-col md:flex-row gap-8 border-b border-gray-100 pb-8 last:border-0 group">
                                            <div className="w-full md:w-40 aspect-[4/5] bg-[#f4f4f4] overflow-hidden relative">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-xl font-medium uppercase tracking-tight pr-6">{item.name}</h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id, item.size)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-400 font-medium mb-6">${item.price}</p>

                                                    <div className="flex flex-wrap md:flex-nowrap gap-6 mt-4">
                                                        <div className="min-w-[120px]">
                                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Size</label>
                                                            <select
                                                                value={item.size}
                                                                onChange={(e) => updateSize(item.id, item.size, e.target.value)}
                                                                className="w-full border border-gray-200 bg-white py-2 px-3 text-sm font-medium tracking-wide focus:outline-none focus:border-black transition-colors cursor-pointer appearance-none"
                                                            >
                                                                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                                                    <option key={size} value={size}>{size}</option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div className="min-w-[120px]">
                                                            <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Quantity</label>
                                                            <div className="flex items-center border border-gray-200 h-[38px]">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                                    className="flex-1 hover:bg-gray-50 transition-colors text-gray-500 hover:text-black font-medium"
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="flex-1 text-sm font-medium border-x border-gray-200 text-center flex items-center justify-center">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                                    className="flex-1 hover:bg-gray-50 transition-colors text-gray-500 hover:text-black font-medium"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-8 md:mt-0 font-medium text-right md:text-left">
                                                    <p className="text-2xl tracking-tight font-black">${item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Order Summary & Promo */}
                            <div className="lg:sticky lg:top-32 h-fit space-y-8 reveal">
                                {/* Promo Code Box */}
                                <div className="bg-gray-50 p-8 rounded-sm">
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Gift Card / Promo Code</h3>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            disabled={promoApplied}
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter UCLOSE10"
                                            className="flex-1 border border-gray-200 bg-white py-3 px-4 text-sm tracking-wide focus:outline-none focus:border-black uppercase disabled:opacity-50"
                                        />
                                        {!promoApplied ? (
                                            <button
                                                onClick={handleApplyPromo}
                                                className="bg-black text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors"
                                            >
                                                Apply
                                            </button>
                                        ) : (
                                            <button
                                                onClick={removePromo}
                                                className="bg-red-50 text-red-600 border border-red-100 px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-red-100 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                    {promoError && <p className="text-[10px] text-red-500 mt-3 font-bold uppercase tracking-widest animate-in fade-in">{promoError}</p>}
                                    {promoApplied && <p className="text-[10px] text-green-600 mt-3 font-bold uppercase tracking-widest animate-in fade-in">Promo successfully applied!</p>}
                                </div>

                                {/* Order Summary */}
                                <div className="bg-gray-50 p-8 md:p-10 rounded-sm">
                                    <h2 className="text-2xl font-medium tracking-tight mb-8">Summary</h2>
                                    <div className="flex flex-col gap-6 text-sm font-medium tracking-wide">
                                        <div className="flex justify-between text-gray-500">
                                            <span>Subtotal</span>
                                            <span>${cartTotal.toFixed(2)}</span>
                                        </div>

                                        {promoApplied && (
                                            <div className="flex justify-between text-green-600 animate-in slide-in-from-right duration-300">
                                                <span>Discount</span>
                                                <span>-${discount.toFixed(2)}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-gray-500">
                                            <span>Shipping</span>
                                            <span className={amountLeft <= 0 ? "text-green-600 font-bold" : ""}>
                                                {amountLeft <= 0 ? "Free" : "Calculated at checkout"}
                                            </span>
                                        </div>

                                        <div className="border-t border-gray-200 pt-6 mt-2 flex justify-between items-end">
                                            <span className="text-xl font-bold tracking-tight">Total</span>
                                            <div className="text-right">
                                                <span className="text-3xl font-black tracking-tighter block">${finalTotal.toFixed(2)}</span>
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest block mt-1">USD</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (isAuthenticated) {
                                                navigate('/checkout');
                                            } else {
                                                navigate('/login', { state: { from: '/cart' } });
                                            }
                                        }}
                                        className="w-full bg-black text-white py-5 text-xs uppercase tracking-widest font-bold mt-10 hover:bg-gray-800 transition-colors shadow-2xl hover:shadow-none hover:translate-y-1"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM RECOMMENDED PRODUCTS / CROSS SELL */}
                        <div className="mt-10 md:mt-20 pt-16 border-t border-gray-100 reveal">
                            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Complete the Look</h2>
                            <p className="text-gray-500 mb-12">Perfectly matched essentials to elevate your current selections.</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {suggestedProducts.map(product => {
                                    const isAdded = cartItems.some(item => item.id === product.id);
                                    return (
                                        <div key={product.id} className="group">
                                            <div className="aspect-[4/5] bg-[#f4f4f4] overflow-hidden relative mb-4">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                    <button
                                                        onClick={() => handleAddSuggested(product)}
                                                        disabled={isAdded}
                                                        className={`w-full py-3 text-[10px] uppercase tracking-widest font-bold transition-colors ${isAdded
                                                            ? 'bg-green-50 text-green-600 cursor-not-allowed'
                                                            : 'bg-black text-white hover:bg-gray-800'
                                                            }`}
                                                    >
                                                        {isAdded ? 'Added' : 'Add to Cart'}
                                                    </button>
                                                </div>
                                            </div>
                                            <h4 className="text-xs uppercase tracking-widest font-bold mb-1 line-clamp-1">{product.name}</h4>
                                            <p className="text-sm font-medium text-gray-500">${product.price}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="reveal flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-medium tracking-tight mb-6">Your cart is feeling light</h2>
                        <p className="text-gray-500 max-w-md mx-auto mb-10">You haven't added anything to your cart yet. Explore our latest arrivals and find something you'll love.</p>
                        <Link to="/products" className="bg-black text-white px-10 py-5 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gray-800 transition-colors shadow-xl hover:shadow-none">
                            Discover Collection
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;
