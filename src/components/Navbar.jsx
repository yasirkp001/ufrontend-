import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const { cartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Fire once to set initial state
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setShowUserMenu(false);
    }, [location]);

    // Determine if the current page should have a transparent top nav
    const isTransparentPage = location.pathname === '/';
    const isTransparent = isTransparentPage && !isScrolled && !isMobileMenuOpen;

    const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${isTransparent
        ? 'bg-transparent text-white border-b-0'
        : isScrolled
            ? 'bg-white/70 backdrop-blur-2xl border-b border-black/10 shadow-sm text-black'
            : 'bg-white text-black border-b border-gray-100'
        }`;

    const links = [
        { path: '/', label: 'Home', mobileOnly: true },
        { path: '/products', label: 'All Products' },
        { path: '/news', label: 'News' },
        { path: '/lookbook', label: 'Lookbook' },
        { path: '/about', label: 'About' }
    ];

    return (
        <nav className={navClass}>
            <div className="flex items-center justify-between w-full p-6 md:p-10 lg:px-14 py-4 md:py-6">
                {/* Left Side: Logo */}
                <div className="flex items-center w-1/3">
                    {/* Logo / Brand Name */}
                    <Link to="/" className="text-xl md:text-2xl font-medium tracking-tight hover:opacity-50 transition-opacity whitespace-nowrap">
                        Uclose Co.
                    </Link>
                </div>

                {/* Center Links (Desktop) */}
                <div className="hidden md:flex items-center justify-center gap-8 md:gap-14 text-sm font-medium tracking-wide w-1/3">
                    {links.filter(link => !link.mobileOnly).map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`transition-colors ${location.pathname === link.path
                                ? (isTransparent ? 'text-white font-bold' : 'text-black font-bold')
                                : (isTransparent ? 'text-white/80 hover:text-white' : 'hover:text-gray-600')
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center justify-end gap-5 md:gap-6 relative w-2/3 md:w-1/3 transition-colors duration-300">
                    {/* Track Order Icon */}
                    <Link to="/track" className="hover:opacity-50 transition-opacity flex items-center" title="Track Order">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.624v6.624" />
                        </svg>
                    </Link>

                    {isAuthenticated ? (
                        <div className="relative group flex items-center">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="hover:opacity-50 transition-opacity flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </button>
                            {showUserMenu && (
                                <div className="absolute right-[-10px] top-full mt-6 bg-white text-black p-5 shadow-2xl border border-gray-100 min-w-[170px] rounded-sm animate-in zoom-in-95 fade-in duration-200 origin-top-right">
                                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t border-l border-gray-100 rotate-45"></div>
                                    <Link to="/account" className="relative z-10 block text-[11px] uppercase tracking-widest font-bold mb-4 hover:text-gray-500 transition-colors">My Account</Link>
                                    <Link to="/orders" className="relative z-10 block text-[11px] uppercase tracking-widest font-bold mb-5 hover:text-gray-500 transition-colors">My Orders</Link>
                                    <div className="relative z-10 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => { logout(); setShowUserMenu(false); }}
                                            className="text-[11px] uppercase tracking-widest font-bold text-red-600 hover:text-red-700 transition-colors w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="hover:opacity-50 transition-opacity flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </Link>
                    )}
                    <Link to="/cart" className="cursor-pointer hover:opacity-50 transition-opacity relative group flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className={`absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in duration-300 ${isTransparent ? 'bg-white text-black' : 'bg-red-600 text-white'}`}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button - Moved to Right Side on Mobile */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="hover:opacity-50 transition-opacity focus:outline-none flex items-center"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white text-black w-full border-t border-gray-100 shadow-xl absolute top-full left-0 origin-top animate-in slide-in-from-top-2 duration-300">
                    <div className="flex flex-col px-6 py-4 gap-4">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm uppercase tracking-widest py-2 border-b border-gray-50 flex items-center justify-between ${location.pathname === link.path ? 'font-bold' : 'font-medium text-gray-500'
                                    }`}
                            >
                                <span>{link.label}</span>
                                {location.pathname === link.path && (
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
