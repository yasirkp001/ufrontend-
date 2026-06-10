import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { api } from '../services/api';

const CheckoutPage = () => {
    useScrollReveal();
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart, appliedPromo, discount } = useCart();
    const finalTotal = Math.max(0, cartTotal - discount);
    const { isAuthenticated, loading } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    // Order ID Generation
    const [orderId] = useState(() => 'UC-' + Math.random().toString(36).substring(2, 11).toUpperCase());

    // Multi-step state
    const [currentStep, setCurrentStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/checkout' } });
        }
    }, [isAuthenticated, loading, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = (e) => {
        e.preventDefault();
        setCurrentStep(2);
        window.scrollTo(0, 0);
    };

    const prevStep = () => {
        setCurrentStep(1);
        window.scrollTo(0, 0);
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        const newOrder = {
            id: orderId,
            items: [...cartItems],
            total: finalTotal,
            paymentMethod: paymentMethod,
            shippingDetails: formData,
            promoCode: appliedPromo?.code || null,
            discount: discount || 0
        };

        try {
            await api.placeOrder(newOrder);
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();
        } catch (err) {
            console.error('Checkout failed:', err.message);
            setIsProcessing(false);
            alert('Checkout failed: ' + err.message);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                navigate('/orders');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    if (isSuccess) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center p-6 md:p-10 font-sans overflow-hidden">
                <div className="text-center w-full max-w-[1400px]">
                    <div className="mb-14 inline-block p-10 rounded-full bg-green-50 text-green-500 animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-24 h-24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-4 items-center text-center">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-black">Payment Confirmed</h4>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-tight mb-2 text-black italic">
                            Order Successfully.
                        </h1>
                        <p className="text-[11px] uppercase tracking-[0.4em] font-black text-black mb-8 font-mono">Order ID: {orderId}</p>
                    </div>

                    <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto">
                        Thank you for your trust. Your order is being prepared and will be delivered with premium care.
                        Redirecting to your orders in a few seconds...
                    </p>

                    <Link
                        to="/orders"
                        className="inline-block bg-black text-white px-20 py-8 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gray-800 transition-all duration-500 hover:scale-105"
                    >
                        View My Orders
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Redesigned Navbar with Logo between icons */}


            <div className="pt-32 pb-20 px-6 md:px-14 lg:px-20 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    {/* Checkout Form */}
                    <div className="reveal">
                        {currentStep === 1 ? (
                            <div>
                                <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-12">Contact Details.</h2>
                                <form onSubmit={nextStep} className="flex flex-col gap-10">
                                    <div className="flex flex-col gap-8">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                                            <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="john@example.com" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                                            <PhoneInput
                                                international
                                                defaultCountry="IN"
                                                value={formData.phone}
                                                onChange={(value) => setFormData(prev => ({ ...prev, phone: value || '' }))}
                                                className="bg-transparent border-b border-gray-200 py-3 focus-within:border-black transition-colors"
                                                style={{ '--PhoneInput-color--focus': 'black', '--PhoneInputCountryFlag-borderColor': 'transparent', '--PhoneInputCountrySelectArrow-color': 'gray' }}
                                                numberInputProps={{ className: 'bg-transparent border-none outline-none text-lg font-light w-full placeholder-gray-400', required: true }}
                                            />
                                        </div>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mt-10 mb-2">Shipping Information.</h2>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">First Name</label>
                                            <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="John" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Last Name</label>
                                            <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Doe" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Address</label>
                                        <input required name="address" value={formData.address} onChange={handleInputChange} type="text" placeholder="House no, Street name" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">City</label>
                                            <input required name="city" value={formData.city} onChange={handleInputChange} type="text" placeholder="London" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Zip Code</label>
                                            <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} type="text" placeholder="W1D 1AN" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-6 text-xs uppercase tracking-widest font-bold mt-10 hover:bg-gray-800 transition-colors"
                                    >
                                        Continue to Payment
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors mb-8"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                    Back to Shipping
                                </button>
                                <div className="flex justify-between items-end mb-12">
                                    <h2 className="text-4xl md:text-5xl font-medium tracking-tighter">Payment Method.</h2>
                                    <div className="text-[10px] uppercase tracking-widest font-black text-black pb-2 font-mono">
                                        ID: {orderId}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 mb-12">
                                    {[
                                        {
                                            id: 'stripe',
                                            name: 'Stripe',
                                            logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg'
                                        },
                                        {
                                            id: 'paypal',
                                            name: 'PayPal',
                                            logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'
                                        },
                                        {
                                            id: 'gpay',
                                            name: 'Google Pay',
                                            logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg'
                                        },
                                        {
                                            id: 'cod',
                                            name: 'Cash on Delivery',
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m1.5-10.5h15.75c.621 0 1.125.504 1.125 1.125v13.5c0 .621-.504 1.125-1.125 1.125H5.25a1.125 1.125 0 01-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125z" />
                                                </svg>
                                            )
                                        },
                                        {
                                            id: 'wallet',
                                            name: 'Wallet',
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                                </svg>
                                            )
                                        }
                                    ].map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`flex items-center justify-between p-6 border transition-all ${paymentMethod === method.id
                                                ? 'border-black bg-gray-50'
                                                : 'border-gray-100 hover:border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center gap-6 text-sm font-medium">
                                                <div className="w-12 h-8 flex items-center justify-center">
                                                    {method.logo ? (
                                                        <img src={method.logo} alt={method.name} className="max-w-full max-h-full object-contain" />
                                                    ) : (
                                                        method.icon
                                                    )}
                                                </div>
                                                <span className="uppercase tracking-widest text-[10px] font-bold">{method.name}</span>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === method.id ? 'border-black' : 'border-gray-300'
                                                }`}>
                                                {paymentMethod === method.id && <div className="w-2 h-2 rounded-full bg-black" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <form onSubmit={handleCheckout} className="flex flex-col gap-10">
                                    {paymentMethod === 'stripe' && (
                                        <div className="flex flex-col gap-10">
                                            <div className="flex flex-col gap-2">
                                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Card Number</label>
                                                <input required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" placeholder="0000 0000 0000 0000" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Expiry (MM/YY)</label>
                                                    <input required name="expiry" value={formData.expiry} onChange={handleInputChange} type="text" placeholder="MM / YY" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">CVC</label>
                                                    <input required name="cvc" value={formData.cvc} onChange={handleInputChange} type="text" placeholder="000" className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'paypal' && (
                                        <div className="p-8 bg-blue-50/50 rounded-sm border border-blue-100 flex flex-col items-center justify-center text-center">
                                            <p className="text-sm text-blue-600 font-medium mb-6">Scan the QR code below using your PayPal app to securely pay.</p>
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 mb-6 w-48 h-48 flex items-center justify-center">
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://paypal.me/uclosestore/${finalTotal.toFixed(2)}USD`}
                                                    alt="PayPal QR Code"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <p className="text-xs text-blue-800 font-bold uppercase tracking-widest">Amount to pay: ${finalTotal.toFixed(2)}</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'gpay' && (
                                        <div className="p-8 bg-gray-50 rounded-sm border border-gray-200 flex flex-col items-center justify-center text-center">
                                            <p className="text-sm text-gray-600 font-medium mb-6">Scan the QR code below using any UPI app to securely pay.</p>
                                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 w-48 h-48 flex items-center justify-center">
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=uclosestore@okhdfcbank&pn=Uclose%20Co&cu=INR&am=${finalTotal.toFixed(2)}`}
                                                    alt="Google Pay QR Code"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <p className="text-xs text-black font-bold uppercase tracking-widest">Amount to pay: ${finalTotal.toFixed(2)}</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'cod' && (
                                        <div className="p-8 bg-green-50/50 rounded-sm border border-green-100">
                                            <p className="text-sm text-green-700 font-medium">You will pay <span className="font-bold">${finalTotal.toFixed(2)}</span> in cash upon delivery of your order.</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'wallet' && (
                                        <div className="p-8 bg-purple-50/50 rounded-sm border border-purple-100 flex flex-col items-center justify-center text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-purple-600 mb-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                            </svg>
                                            <p className="text-sm text-purple-700 font-medium mb-2">Pay securely using your Uclose Wallet balance.</p>
                                            <p className="text-xs text-purple-800 font-bold uppercase tracking-widest">Amount to deduct: ${finalTotal.toFixed(2)}</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full bg-black text-white py-6 text-xs uppercase tracking-widest font-bold mt-10 hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-4"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                Processing Order...
                                            </>
                                        ) : (
                                            paymentMethod === 'cod' ? 'Confirm Delivery Order' : paymentMethod === 'wallet' ? 'Pay with Wallet' : `Complete Purchase — $${finalTotal.toFixed(2)}`
                                        )}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="reveal lg:sticky lg:top-32 bg-gray-50 p-10 md:p-14 rounded-sm">
                        <h3 className="text-2xl font-medium tracking-tight mb-10">Order Summary.</h3>
                        <div className="flex flex-col gap-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex gap-6 items-center">
                                    <div className="w-20 h-24 bg-white flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs uppercase tracking-widest font-bold line-clamp-1">{item.name}</h4>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium tracking-tight">${item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 mt-10 pt-10 flex flex-col gap-4">
                            <div className="flex justify-between text-sm font-medium tracking-wide text-gray-500">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-sm font-medium tracking-wide text-green-600">
                                    <span>Discount ({appliedPromo?.code})</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm font-medium tracking-wide text-gray-500">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold tracking-tight mt-4 border-t border-gray-200 pt-6 text-black">
                                <span>Total</span>
                                <span>${finalTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
