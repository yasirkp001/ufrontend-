import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import AccountHero from '../components/AccountHero';

const AccountPage = () => {
    useScrollReveal();
    const navigate = useNavigate();
    const { isAuthenticated, userEmail, user, loading, logout, refreshUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    // State for Profile
    const [profile, setProfile] = useState({
        name: user?.name || userEmail?.split('@')[0] || 'User',
        phone: user?.phone || '',
        email: userEmail || '',
        dp: user?.dp || ''
    });

    const [isSaving, setIsSaving] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState('');
    const [profileError, setProfileError] = useState('');

    // State for Addresses
    const [addresses] = useState([
        { id: 1, type: 'Home', address: '123 Fashion Ave, NY 10001', isDefault: true },
        { id: 2, type: 'Office', address: '456 Business St, NY 10002', isDefault: false }
    ]);

    // State for Wishlist
    const [wishlist, setWishlist] = useState([]);

    // State for active coupons
    const [activeCoupons, setActiveCoupons] = useState([]);

    // State for Payments
    const [paymentMethods] = useState([
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
        { id: 2, type: 'Mastercard', last4: '8888', expiry: '05/25', isDefault: false }
    ]);

    useEffect(() => {
        if (loading) return;
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/account' } });
            return;
        }

        const fetchAccountData = async () => {
            try {
                const data = await api.getOrders();
                setOrders(data);
                
                // Load wishlist from local storage (kept local for wishlist)
                const wishlistKey = userEmail ? `uclose_wishlist_${userEmail}` : 'uclose_wishlist_guest';
                const savedWishlist = JSON.parse(localStorage.getItem(wishlistKey) || '[]');
                setWishlist(savedWishlist);

                // Load active coupons dynamically
                const couponsData = await api.getActiveCoupons();
                setActiveCoupons(couponsData);
            } catch (err) {
                console.error('Failed to load account details from API:', err.message);
            }
        };
        fetchAccountData();
    }, [isAuthenticated, loading, userEmail, navigate]);

    useEffect(() => {
        if (user) {
            setProfile({
                name: user.name || '',
                phone: user.phone || '',
                email: user.email || '',
                dp: user.dp || ''
            });
        }
    }, [user]);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const handleSaveProfile = async () => {
        if (!profile.name.trim()) {
            setProfileError('Name is required.');
            return;
        }

        setIsSaving(true);
        setProfileError('');
        setProfileSuccess('');

        try {
            await api.updateProfileDetails(profile.name.trim(), profile.phone.trim(), profile.dp.trim());
            setProfileSuccess('Profile updated successfully.');
            await refreshUser();
        } catch (err) {
            setProfileError(err.message || 'Failed to update profile.');
        } finally {
            setIsSaving(false);
        }
    };



    const totalSpent = orders.reduce((acc, order) => acc + parseFloat(order.total), 0).toFixed(2);

    const menuItems = [
        { id: 'dashboard', label: 'Overview' },
        { id: 'profile', label: 'Profile Settings' },
        { id: 'orders', label: 'Orders & Status' },
        { id: 'addresses', label: 'Address Book' },
        { id: 'wishlist', label: 'Wishlist' },
        { id: 'payments', label: 'Payment Methods' },
        { id: 'returns', label: 'Easy Returns' },
        { id: 'coupons', label: 'Coupons & Vouchers' },
        { id: 'support', label: 'Help & Support' },
    ];

    // Helper to render active content
    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="flex flex-col gap-10">
                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-8 border border-gray-100 shadow-sm group hover:border-black transition-all">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Total Orders</p>
                                <p className="text-4xl font-medium tracking-tighter">{orders.length}</p>
                            </div>
                            <div className="bg-white p-8 border border-gray-100 shadow-sm group hover:border-black transition-all">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Total Spent</p>
                                <p className="text-4xl font-medium tracking-tighter">${totalSpent}</p>
                            </div>
                            <div className="bg-white p-8 border border-gray-100 shadow-sm group hover:border-black transition-all">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">Saved Addresses</p>
                                <p className="text-4xl font-medium tracking-tighter">{addresses.length}</p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-100">
                                <h3 className="text-xl font-bold tracking-tight">Recent Orders</h3>
                                <button onClick={() => setActiveTab('orders')} className="text-[10px] uppercase tracking-widest font-bold hover:text-gray-400">View All</button>
                            </div>

                            {orders.length === 0 ? (
                                <div className="bg-white p-12 border border-gray-100 text-center flex flex-col items-center">
                                    <p className="text-gray-400 mb-6 font-light">No recent orders found.</p>
                                    <Link to="/products" className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all">Shop Now</Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {orders.slice().reverse().slice(0, 3).map((order) => (
                                        <div key={order.id} className="bg-white border border-gray-100 p-6 flex justify-between items-center group hover:border-black transition-all shadow-sm">
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Order #{order.id}</p>
                                                <p className="font-bold tracking-tight">${order.total}</p>
                                                <p className="text-xs text-gray-500 mt-1">{new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-2">
                                                 <span className={`text-[9px] px-2 py-1 font-bold uppercase tracking-widest ${
                                                     order.status === 'Delivered' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                     order.status === 'Shipped' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                     order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                     order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                                     'bg-blue-50 text-blue-600 border border-blue-100'
                                                 }`}>
                                                     {order.status || 'Confirmed'}
                                                 </span>
                                                 <button onClick={() => navigate('/track', { state: { orderId: order.id } })} className="text-[10px] uppercase font-bold border-b border-black">Track</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div className="max-w-xl flex flex-col gap-8">
                        <div className="pb-4 border-b border-gray-100">
                            <h3 className="text-xl font-bold tracking-tight">Profile Settings</h3>
                            <p className="text-sm text-gray-500 mt-1">Update your personal information and contact details.</p>
                        </div>

                        {/* Premium Avatar Preview Section */}
                        <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 shadow-sm rounded-sm">
                            <div className="relative group w-20 h-20 rounded-full overflow-hidden border border-gray-200 shrink-0">
                                <img
                                    src={profile.dp || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name || 'User')}`}
                                    alt="Profile Avatar"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name || 'User')}`;
                                    }}
                                />
                            </div>
                            <div>
                                <h4 className="font-bold tracking-tight text-lg">{profile.name || 'Your Name'}</h4>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">Customer Account</p>
                            </div>
                        </div>
                        
                        {profileSuccess && (
                            <div className="bg-black text-white p-4 text-xs font-bold tracking-wider uppercase border border-black flex justify-between items-center">
                                <span>{profileSuccess}</span>
                                <button onClick={() => setProfileSuccess('')} className="hover:text-gray-300">✕</button>
                            </div>
                        )}

                        {profileError && (
                            <div className="bg-red-50 text-red-800 border border-red-200 p-4 text-xs font-bold tracking-wider uppercase flex justify-between items-center">
                                <span>{profileError}</span>
                                <button onClick={() => setProfileError('')} className="hover:text-red-900">✕</button>
                            </div>
                        )}

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Profile Picture URL</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/avatar.jpg"
                                    value={profile.dp}
                                    onChange={(e) => setProfile({ ...profile, dp: e.target.value })}
                                    className="w-full p-4 border border-gray-100 bg-white focus:border-black outline-none transition-all font-medium"
                                    disabled={isSaving}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full p-4 border border-gray-100 bg-white focus:border-black outline-none transition-all font-medium"
                                    disabled={isSaving}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 9876543210"
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="w-full p-4 border border-gray-100 bg-white focus:border-black outline-none transition-all font-medium"
                                    disabled={isSaving}
                                />
                            </div>
                            <div className="flex flex-col gap-2 opacity-50">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address (Read-only)</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    readOnly
                                    className="w-full p-4 border border-gray-100 bg-gray-50 cursor-not-allowed outline-none font-medium"
                                />
                            </div>
                            <button 
                                onClick={handleSaveProfile}
                                disabled={isSaving}
                                className="bg-black text-white p-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-800 transition-all mt-4 disabled:bg-gray-400 flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <span>Save Changes</span>
                                )}
                            </button>
                        </div>
                    </div>
                );

            case 'orders':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="pb-4 border-b border-gray-100 flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight">Order History</h3>
                                <p className="text-sm text-gray-500 mt-1">Manage and track all your purchases.</p>
                            </div>
                        </div>
                        {orders.length === 0 ? (
                            <div className="bg-white p-20 border border-gray-100 text-center flex flex-col items-center">
                                <p className="text-gray-400 mb-6">No orders found in your history.</p>
                                <Link to="/products" className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold">Start Shopping</Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {orders.slice().reverse().map((order) => (
                                    <div key={order.id} className="bg-white border border-gray-100 p-8 flex flex-col md:flex-row justify-between gap-8 md:items-center hover:border-black transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-24 bg-gray-50 overflow-hidden border border-gray-100 shrink-0">
                                                {order.items[0]?.image && <img src={order.items[0].image} className="w-full h-full object-cover grayscale" alt="" />}
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Order #{order.id}</p>
                                                <p className="text-lg font-bold tracking-tight">${order.total}</p>
                                                <p className="text-sm text-gray-500 mt-1">{order.items.length} Items • Placed on {new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:items-end gap-3">
                                            <div className="flex gap-2">
                                                 <span className={`text-[10px] px-3 py-1 font-bold uppercase tracking-widest ${
                                                     order.status === 'Delivered' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                     order.status === 'Shipped' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                     order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border border-red-100' :
                                                     order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                                     'bg-black text-white'
                                                 }`}>
                                                     {order.status || 'Confirmed'}
                                                 </span>
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={() => navigate('/track', { state: { orderId: order.id } })} className="text-[10px] uppercase font-bold border-b border-black">Track Order</button>
                                                <button className="text-[10px] uppercase font-bold text-gray-400 hover:text-black">Order Details</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case 'addresses':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="pb-4 border-b border-gray-100 flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight">Address Book</h3>
                                <p className="text-sm text-gray-500 mt-1">Manage your delivery and billing addresses.</p>
                            </div>
                            <button className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1">+ Add New</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addresses.map(addr => (
                                <div key={addr.id} className="bg-white p-8 border border-gray-100 flex flex-col justify-between group hover:border-black transition-all">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-gray-100">{addr.type}</span>
                                            {addr.isDefault && <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Default</span>}
                                        </div>
                                        <p className="font-bold tracking-tight text-lg mb-2">Alex Johnson</p>
                                        <p className="text-sm text-gray-500 leading-relaxed">{addr.address}<br />New York, United States</p>
                                    </div>
                                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-50">
                                        <button className="text-[10px] uppercase font-bold border-b border-black">Edit</button>
                                        <button className="text-[10px] uppercase font-bold text-red-400 hover:text-red-600">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'wishlist':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="pb-4 border-b border-gray-100">
                            <h3 className="text-xl font-bold tracking-tight">My Wishlist</h3>
                            <p className="text-sm text-gray-500 mt-1">Items you've saved for later.</p>
                        </div>
                        {wishlist.length === 0 ? (
                            <div className="bg-white p-20 border border-gray-100 text-center flex flex-col items-center">
                                <p className="text-gray-400 mb-6">Your wishlist is empty.</p>
                                <Link to="/products" className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold">Explore Collections</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Wishlist grid items would go here */}
                                <p className="text-gray-400">Wishlist feature coming soon to the grid.</p>
                            </div>
                        )}
                    </div>
                );

            case 'payments':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="pb-4 border-b border-gray-100 flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold tracking-tight">Payment Methods</h3>
                                <p className="text-sm text-gray-500 mt-1">Manage your saved cards and payment accounts.</p>
                            </div>
                            <button className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1">+ Add Card</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {paymentMethods.map(method => (
                                <div key={method.id} className="bg-white p-8 border border-gray-100 flex flex-col justify-between group hover:border-black transition-all">
                                    <div className="flex justify-between items-start mb-10">
                                        <div>
                                            <p className="font-bold tracking-tighter text-2xl">{method.type}</p>
                                            <p className="text-xs text-gray-400 mt-1">Ending in {method.last4}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Expiry</p>
                                            <p className="font-bold tracking-tight">{method.expiry}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center bg-gray-50 -mx-8 -mb-8 p-4 px-8 border-t border-gray-100">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{method.isDefault ? 'Default Method' : ''}</span>
                                        <button className="text-[10px] uppercase font-bold text-red-400">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'returns':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="pb-4 border-b border-gray-100">
                            <h3 className="text-xl font-bold tracking-tight">Easy Returns</h3>
                            <p className="text-sm text-gray-500 mt-1">Initiate a return or check status of current returns.</p>
                        </div>
                        <div className="bg-white p-12 border border-gray-100 text-center flex flex-col items-center">
                            <p className="text-lg font-medium mb-2">No active returns.</p>
                            <p className="text-sm text-gray-500 mb-8 max-w-md">You have 30 days from the delivery date to return eligible items.</p>
                            <button onClick={() => setActiveTab('orders')} className="text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1">Start a return from an order</button>
                        </div>
                    </div>
                );

            case 'coupons':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="pb-4 border-b border-gray-100">
                            <h3 className="text-xl font-bold tracking-tight">Coupons & Vouchers</h3>
                            <p className="text-sm text-gray-500 mt-1">Available discounts and promotional codes for you.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {activeCoupons.map((coupon, idx) => (
                                <div key={idx} className="bg-white p-8 border-2 border-dashed border-gray-200 flex flex-col justify-between hover:border-black transition-all group">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-black text-white">{coupon.code}</span>
                                        <h4 className="text-2xl font-bold tracking-tighter mt-4">
                                            {coupon.discount_type === 'percentage' ? `${coupon.discount_value}% Off Order` : `$${coupon.discount_value} Off Order`}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Valid on any purchase over $${parseFloat(coupon.min_purchase || 0).toFixed(2)}. Cannot be combined with other offers.
                                        </p>
                                    </div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400 mt-8">Limited Time Offer</p>
                                </div>
                            ))}
                            {activeCoupons.length === 0 && (
                                <p className="text-gray-400 font-light text-sm italic">No active promotional vouchers available right now.</p>
                            )}
                        </div>
                    </div>
                );

            case 'support':
                return (
                    <div className="flex flex-col gap-8">
                        <div className="pb-4 border-b border-gray-100 text-center md:text-left">
                            <h3 className="text-xl font-bold tracking-tight">Help & Support</h3>
                            <p className="text-sm text-gray-500 mt-1">We're here to assist you with any questions or concerns.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'Order Status', desc: 'Need help tracking your package?' },
                                { title: 'Returns Policy', desc: 'View our terms for returns and refunds.' },
                                { title: 'Contact Us', desc: 'Chat with our team or send us an email.' }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 border border-gray-100 hover:border-black transition-all cursor-pointer group shadow-sm">
                                    <h4 className="font-bold tracking-tight mb-2 group-hover:translate-x-1 transition-transform">{item.title} →</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-black text-white p-12 text-center mt-4">
                            <h4 className="text-3xl font-bold tracking-tighter mb-4 italic">Need immediate help?</h4>
                            <p className="text-gray-400 mb-8 max-w-sm mx-auto text-sm">Our support team is available 24/7 to help you with your fashion needs.</p>
                            <button className="bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gray-200 transition-all">Start Live Chat</button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAFA] min-h-screen font-sans">
            <div className="h-20 md:h-24"></div> {/* Spacer for fixed white navbar */}
            <AccountHero />
            <div className="pt-12 pb-20 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto min-h-[70vh]">

                {/* Header Section */}
                <div className="mb-14 reveal flex items-center gap-4">
                    <img
                        src={user?.dp || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                        onError={(e) => {
                            e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`;
                        }}
                    />
                    <div>
                        <p className="text-gray-500 text-sm md:text-lg font-medium tracking-tight flex items-center gap-2 italic">
                            Logged in as <span className="text-black not-italic font-bold border-b border-black outline-offset-4">{userEmail}</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                    {/* Sticky Sidebar Navigation */}
                    <div className="w-full md:w-1/4 flex flex-col gap-4 reveal shrink-0 h-fit md:sticky md:top-32">
                        <div className="bg-white p-2 border border-gray-100 shadow-sm flex flex-col gap-1">
                            {menuItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`text-left px-5 py-3 transition-all font-bold text-xs tracking-[0.1em] uppercase ${activeTab === item.id
                                            ? 'bg-black text-white'
                                            : 'text-gray-400 hover:text-black hover:bg-gray-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="text-left px-5 py-4 text-red-500 hover:text-red-700 font-black text-xs tracking-[0.1em] uppercase mt-4 border-t border-gray-100 flex justify-between items-center"
                            >
                                Sign Out
                                <span className="text-[10px]">→</span>
                            </button>
                        </div>

                        {/* Quick Stats Mini-Card */}
                        <div className="hidden md:flex bg-black p-8 flex-col gap-4 text-white">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-500 mb-1">Total Savings</p>
                                <p className="text-2xl font-bold italic tracking-tighter">$140.00</p>
                            </div>
                            <div className="h-px bg-gray-900"></div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-500 mb-1">Member Status</p>
                                <p className="text-xl font-bold italic tracking-tighter">Gold Tier</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full md:w-3/4 min-h-[500px] reveal">
                        {renderTabContent()}
                    </div>
                </div>
            </div>



            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white p-8 md:p-10 border border-gray-100 max-w-sm w-full mx-6 shadow-2xl rounded-sm animate-in zoom-in-95 duration-200">
                        <h3 className="text-xl font-bold tracking-tight mb-2 uppercase text-black">Logout</h3>
                        <p className="text-sm text-gray-500 mb-8 leading-relaxed">Are you sure you want to logout?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 border border-black p-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gray-50 transition-all text-center text-black"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowLogoutConfirm(false);
                                    logout();
                                    navigate('/');
                                }}
                                className="flex-1 bg-red-600 text-white p-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-red-700 transition-all text-center"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default AccountPage;
