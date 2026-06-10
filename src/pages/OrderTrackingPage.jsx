import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const OrderTrackingPage = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();
    const [orderId, setOrderId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    const trackOrder = async (idToTrack) => {
        setIsSearching(true);
        setError(null);

        try {
            const id = idToTrack.toUpperCase().trim();
            const existingOrders = await api.getOrders();
            const foundOrder = existingOrders.find(o => o.id === id);

            if (foundOrder) {
                // Create dynamic timeline based on real order status
                const orderDate = new Date(foundOrder.date);
                const status = foundOrder.status || 'Pending';
                
                const steps = [
                    { 
                        title: 'Order Confirmed', 
                        date: orderDate.toLocaleDateString(), 
                        time: orderDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
                        completed: true 
                    },
                    { 
                        title: 'Processing', 
                        date: status === 'Pending' ? 'Preparing your items' : 'Items ready for dispatch', 
                        time: '', 
                        completed: status !== 'Pending', 
                        current: status === 'Pending' || status === 'Confirmed' 
                    },
                    { 
                        title: 'Package Shipped', 
                        date: (status === 'Shipped' || status === 'Delivered') ? 'Package handed to courier' : 'Pending', 
                        time: '', 
                        completed: status === 'Shipped' || status === 'Delivered', 
                        current: false 
                    },
                    { 
                        title: 'Out for Delivery', 
                        date: status === 'Shipped' ? 'In transit to your location' : (status === 'Delivered' ? 'Out for delivery' : 'Pending'), 
                        time: '', 
                        completed: status === 'Delivered', 
                        current: status === 'Shipped' 
                    },
                    { 
                        title: 'Delivered', 
                        date: status === 'Delivered' ? 'Package delivered successfully' : 'Pending', 
                        time: '', 
                        completed: status === 'Delivered', 
                        current: status === 'Delivered' 
                    }
                ];

                setTrackingResult({
                    id,
                    status,
                    estimatedDelivery: foundOrder.estimatedDelivery || 'In 3-5 Business Days',
                    carrier: foundOrder.courier || 'Standard Delivery',
                    trackingNumber: foundOrder.trackingNumber || '',
                    steps,
                    items: foundOrder.items || []
                });
            } else {
                setError(`Order "${id}" not found. Please double-check your Order ID.`);
                setTrackingResult(null);
            }
        } catch (err) {
            console.error('Error tracking order:', err.message);
            setError('Could not fetch tracking details. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleTrack = (e) => {
        e.preventDefault();
        if (orderId.trim()) {
            trackOrder(orderId);
        }
    };

    useEffect(() => {
        if (loading || !isAuthenticated) return;
        const queryOrderId = new URLSearchParams(location.search).get('orderId') || location.state?.orderId;
        if (queryOrderId) {
            const cleanId = queryOrderId.trim().toUpperCase();
            setOrderId(cleanId);
            trackOrder(cleanId);
        }
    }, [location, loading, isAuthenticated]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: '/track' }} />;
    }

    return (
        <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6 font-sans text-black animate-in fade-in duration-700">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Track Your Order</h1>
                    <p className="text-gray-500 text-lg">Enter your order details below to see its journey.</p>
                </div>

                {!trackingResult ? (
                    <form onSubmit={handleTrack} className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 max-w-xl mx-auto rounded-sm">

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-xs font-bold tracking-widest uppercase mb-3 text-gray-500">Order ID</label>
                            <input
                                type="text"
                                required
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="e.g. ORD-123"
                                className="w-full bg-[#f8f8f8] border border-transparent focus:border-black px-5 py-4 outline-none transition-all text-lg"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSearching}
                            className="w-full bg-black text-white font-bold uppercase tracking-widest py-5 hover:bg-gray-900 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isSearching ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    LOCATING...
                                </>
                            ) : (
                                'TRACK ORDER'
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 relative rounded-sm animate-in zoom-in-95 duration-500">
                        <button
                            onClick={() => setTrackingResult(null)}
                            className="absolute top-8 right-8 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                        >
                            Start Over
                        </button>

                        <div className="mb-10 pb-10 border-b border-gray-100">
                            <h2 className="text-2xl font-medium tracking-tight mb-2">Order {trackingResult.id}</h2>
                            <div className="text-sm text-gray-500 flex flex-col gap-1">
                                <div>Carrier: <span className="text-black font-semibold">{trackingResult.carrier}</span></div>
                                {trackingResult.trackingNumber && (
                                    <div>Tracking Number: <span className="text-black font-mono font-bold">{trackingResult.trackingNumber}</span></div>
                                )}
                                {trackingResult.trackingNumber && (() => {
                                    const cleanNum = trackingResult.trackingNumber.trim();
                                    const normCourier = trackingResult.carrier.toLowerCase().trim();
                                    let url = null;
                                    if (normCourier.includes('dhl')) url = `https://www.dhl.com/en/express/tracking.html?AWB=${cleanNum}`;
                                    else if (normCourier.includes('fedex')) url = `https://www.fedex.com/apps/fedextrack/?tracknumbers=${cleanNum}`;
                                    else if (normCourier.includes('ups')) url = `https://www.ups.com/track?loc=en_US&requester=ST&tracknum=${cleanNum}`;
                                    else if (normCourier.includes('delhivery')) url = `https://www.delhivery.com/track/package/${cleanNum}`;
                                    
                                    if (url) {
                                        return (
                                            <div className="mt-2">
                                                <a 
                                                    href={url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="text-xs uppercase font-black tracking-widest text-black border-b border-black pb-[2px] hover:text-gray-500 hover:border-gray-500 transition-colors"
                                                >
                                                    Track on Courier Website &rarr;
                                                </a>
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}
                            </div>

                            <div className="mt-8 bg-[#f8f8f8] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 rounded-sm">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Current Status</p>
                                    <p className="text-xl font-medium text-black flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        {trackingResult.status}
                                    </p>
                                </div>
                                <div className="sm:text-right">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Estimated Delivery</p>
                                    <p className="text-xl font-medium text-black">{trackingResult.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>

                        {/* Beautiful Timeline */}
                        <div className="relative pl-6 sm:pl-8">
                            {/* Vertical Line */}
                            <div className="absolute left-[31px] sm:left-[39px] top-4 bottom-8 w-[2px] bg-gray-100"></div>

                            <div className="space-y-8 relative">
                                {trackingResult.steps.map((step, idx) => (
                                    <div key={idx} className={`flex gap-6 sm:gap-8 ${step.completed || step.current ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`relative z-10 w-4 h-4 mt-1 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${step.completed ? 'bg-black shadow-[0_0_0_4px_rgba(0,0,0,0.1)]' :
                                            step.current ? 'bg-black shadow-[0_0_0_6px_rgba(0,0,0,0.15)] animate-pulse' :
                                                'bg-gray-200'
                                            }`} />
                                        <div className="flex-1">
                                            <h4 className={`text-lg md:text-xl font-medium tracking-tight mb-1 ${step.completed || step.current ? 'text-black' : 'text-gray-400'}`}>{step.title}</h4>
                                            <p className="text-sm text-gray-500">{step.date} {step.time && <span className="mx-1">•</span>} {step.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ordered Items Section */}
                        {trackingResult.items && trackingResult.items.length > 0 && (
                            <div className="mt-12 pt-10 border-t border-gray-100 animate-in slide-in-from-bottom-4 duration-700">
                                <h3 className="text-xl font-medium tracking-tight mb-6">Items inside this package</h3>
                                <div className="flex flex-col gap-4">
                                    {trackingResult.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-6 items-center bg-[#f8f8f8] p-4 sm:p-6 rounded-sm">
                                            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-white shrink-0 border border-gray-100">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xs sm:text-sm uppercase tracking-widest font-bold line-clamp-1">{item.name}</h4>
                                                <p className="text-gray-500 text-[10px] sm:text-xs mt-1 font-medium tracking-wider">Size: {item.size} • Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <p className="text-sm sm:text-lg font-black tracking-tight">${item.price * item.quantity}</p>
                                                <Link to={`/product/${item.id}`} className="mt-2 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-black border-b border-black pb-[2px] hover:text-gray-500 transition-colors">
                                                    View Item
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-12 text-center pt-8 border-t border-gray-100">
                            <p className="text-gray-500 mb-4">Have questions about your order?</p>
                            <Link to="/contact" className="text-black font-bold uppercase tracking-widest text-xs border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">Contact Support</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTrackingPage;
