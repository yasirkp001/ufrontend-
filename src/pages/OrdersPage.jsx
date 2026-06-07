import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const OrdersPage = () => {
    useScrollReveal();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const { isAuthenticated, loading } = useAuth();
    
    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/orders' } });
            return;
        }

        const fetchOrders = async () => {
            try {
                const data = await api.getOrders();
                setOrders(data);
            } catch (err) {
                console.error('Failed to fetch orders:', err.message);
            }
        };
        fetchOrders();
    }, [isAuthenticated, loading, navigate]);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const [showReturnModal, setShowReturnModal] = useState(false);
    const [orderToReturn, setOrderToReturn] = useState(null);

    const handleCancelOrder = (orderId) => {
        setOrderToCancel(orderId);
        setShowCancelModal(true);
    };

    const confirmCancel = async () => {
        try {
            await api.cancelOrder(orderToCancel);
            // Refresh order list
            const data = await api.getOrders();
            setOrders(data);
            setShowCancelModal(false);
            setOrderToCancel(null);
            navigate('/');
        } catch (err) {
            console.error('Failed to cancel order:', err.message);
        }
    };

    const closeCancelModal = () => {
        setShowCancelModal(false);
        setOrderToCancel(null);
    };

    const handleReturnRequest = (orderId) => {
        setOrderToReturn(orderId);
        setShowReturnModal(true);
    };

    const confirmReturn = async () => {
        try {
            await api.requestReturn(orderToReturn);
            // Refresh order list
            const data = await api.getOrders();
            setOrders(data);
            setShowReturnModal(false);
            setOrderToReturn(null);
        } catch (err) {
            console.error('Failed to request return:', err.message);
        }
    };

    const closeReturnModal = () => {
        setShowReturnModal(false);
        setOrderToReturn(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Standard Sticky Navbar */}


            <div className="pt-32 pb-20 px-6 md:px-14 lg:px-20 max-w-[1400px] mx-auto min-h-[70vh]">
                <div className="mb-16">
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-4 italic">My Orders.</h1>
                    <p className="text-gray-500 text-lg">Review your past purchases and track their status.</p>
                </div>

                {orders.length === 0 ? (
                    <div className="py-20 border-t border-gray-100 text-center flex flex-col items-center">
                        <div className="text-gray-300 mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <p className="text-xl font-light text-gray-400 mb-10">You haven't placed any orders yet.</p>
                        <Link to="/products" className="bg-black text-white px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-10">
                        {orders.map((order) => (
                            <div key={order.id} className="border-t border-gray-100 pt-10 group">
                                <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-2xl font-medium tracking-tight uppercase">Order {order.id}</h3>
                                            <div className="flex items-center gap-3">
                                                <span className={`text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full ${
                                                    order.status === 'Delivered' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                    order.status === 'Shipped' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                    order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                    order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                                    order.status === 'Return Requested' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                                    order.status === 'Returned' ? 'bg-gray-100 text-gray-600 border border-gray-200' :
                                                    order.status === 'Refunded' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
                                                    'bg-blue-50 text-blue-600 border border-blue-100'
                                                }`}>
                                                    {order.status || 'Confirmed'}
                                                </span>
                                                
                                                <Link
                                                    to="/track"
                                                    state={{ orderId: order.id }}
                                                    className="text-[10px] uppercase tracking-widest font-bold text-black hover:text-gray-500 transition-colors border-l border-gray-100 pl-3"
                                                >
                                                    Track Order
                                                </Link>
 
                                                {(order.status === 'Pending' || order.status === 'Confirmed' || !order.status) && (
                                                    <button
                                                        onClick={() => handleCancelOrder(order.id)}
                                                        className="text-[10px] uppercase tracking-widest font-bold text-gray-300 hover:text-red-500 transition-colors border-l border-gray-100 pl-3"
                                                    >
                                                        Cancel Order
                                                    </button>
                                                )}

                                                {order.status === 'Delivered' && (
                                                    <button
                                                        onClick={() => handleReturnRequest(order.id)}
                                                        className="text-[10px] uppercase tracking-widest font-bold text-gray-300 hover:text-red-500 transition-colors border-l border-gray-100 pl-3"
                                                    >
                                                        Request Return
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Placed on {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <p className="text-3xl font-medium tracking-tighter mb-1">${order.total}</p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{order.items.length} Items via {order.paymentMethod.toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 transition-all duration-700">
                                    {order.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col gap-3 cursor-pointer group/item hover:opacity-80 transition-opacity"
                                            onClick={() => setSelectedItem({ item, orderId: order.id })}
                                        >
                                            <div className="aspect-[4/5] bg-gray-50 overflow-hidden relative">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover/item:scale-105 transition-all duration-700" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase font-bold tracking-widest line-clamp-1">{item.name}</p>
                                                <p className="text-[8px] text-gray-400 uppercase tracking-widest">Qty: {item.quantity} | Size: {item.size}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Premium Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"
                        onClick={closeCancelModal}
                    ></div>
                    <div className="bg-white p-10 md:p-14 rounded-sm shadow-2xl relative z-10 max-w-lg w-full text-center animate-in zoom-in-95 fade-in duration-500">
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tighter mb-6">Cancel Order?</h3>
                        <p className="text-gray-500 text-lg mb-10 font-light">Are you sure you want to cancel this order? This action cannot be undone.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={confirmCancel}
                                className="bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all"
                            >
                                Yes, Cancel
                            </button>
                            <button
                                onClick={closeCancelModal}
                                className="bg-gray-100 text-black py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-200 transition-all"
                            >
                                No, Keep It
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Return Request Modal */}
            {showReturnModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"
                        onClick={closeReturnModal}
                    ></div>
                    <div className="bg-white p-10 md:p-14 rounded-sm shadow-2xl relative z-10 max-w-lg w-full text-center animate-in zoom-in-95 fade-in duration-500">
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tighter mb-6">Request Return?</h3>
                        <p className="text-gray-500 text-lg mb-10 font-light">Are you sure you want to request a return for this order? Once requested, our team will review the request.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={confirmReturn}
                                className="bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all"
                            >
                                Yes, Request Return
                            </button>
                            <button
                                onClick={closeReturnModal}
                                className="bg-gray-100 text-black py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-200 transition-all"
                            >
                                No, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"
                        onClick={() => setSelectedItem(null)}
                    ></div>
                    <div className="bg-white p-6 md:p-10 rounded-sm shadow-2xl relative z-10 max-w-2xl w-full flex flex-col md:flex-row gap-8 animate-in zoom-in-95 fade-in duration-500">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="w-full md:w-1/2 aspect-[4/5] bg-gray-50 overflow-hidden relative">
                            <img src={selectedItem.item.image} alt={selectedItem.item.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2 break-all">Order ID: {selectedItem.orderId}</p>
                            <h3 className="text-2xl md:text-3xl font-medium tracking-tighter mb-4 pr-6 leading-tight">{selectedItem.item.name}</h3>
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="bg-gray-100 text-black px-3 py-1 text-xs font-medium rounded-full border border-gray-200">Size: {selectedItem.item.size}</span>
                                <span className="bg-gray-100 text-black px-3 py-1 text-xs font-medium rounded-full border border-gray-200">Qty: {selectedItem.item.quantity}</span>
                                <span className="bg-gray-100 text-black px-3 py-1 text-xs font-bold rounded-full border border-gray-300 shadow-sm">${selectedItem.item.price}</span>
                            </div>

                            <div className="mb-6 flex-1">
                                <h4 className="text-xs font-bold uppercase tracking-widest mb-3 border-b pb-2 text-black">Product Features</h4>
                                <ul className="text-xs text-gray-500 space-y-3 leading-relaxed">
                                    <li className="flex items-start gap-2">
                                        <span className="text-black">•</span>
                                        Premium quality material for everyday wear
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-black">•</span>
                                        Sustainably sourced and responsibly crafted
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-black">•</span>
                                        Designed for outstanding comfort & durability
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={() => setSelectedItem(null)}
                                className="bg-black text-white w-full py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all shadow-xl"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default OrdersPage;
