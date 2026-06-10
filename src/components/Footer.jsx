import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await api.getSiteSettings();
                setSettings(data);
            } catch (err) {
                console.error('Failed to load settings in Footer:', err);
            }
        };
        fetchSettings();
    }, []);

    return (
        <footer className="bg-white text-black py-20 px-6 md:px-14 lg:px-20 font-sans border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto">



                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
                    {/* Left Side: Brand Name */}
                    <div className="lg:w-1/3">
                        <h2 className="text-7xl font-medium tracking-tighter">
                            {settings?.site_name || "Uclose Co."}
                        </h2>
                    </div>

                    {/* Right Side: Links */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 w-full lg:w-2/3">
                        {/* Navigation */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-black">Shop</h4>
                            <ul className="space-y-4 text-gray-500 text-sm">
                                <li><Link to="/products" className="hover:text-black transition-colors">All Products</Link></li>
                                <li><Link to="/products?category=new" className="hover:text-black transition-colors">New Arrivals</Link></li>
                                <li><Link to="/products?sort=best_sellers" className="hover:text-black transition-colors">Best Sellers</Link></li>
                                <li><Link to="/lookbook" className="hover:text-black transition-colors">Lookbook</Link></li>
                                <li><Link to="/news" className="hover:text-black transition-colors">Digital Editorial</Link></li>
                            </ul>
                        </div>

                        {/* About */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-black">About</h4>
                            <ul className="space-y-4 text-gray-500 text-sm">
                                <li><Link to="/about" className="hover:text-black transition-colors">Our Story</Link></li>
                                <li><Link to="/about" className="hover:text-black transition-colors">Sustainability</Link></li>
                                <li><Link to="/about" className="hover:text-black transition-colors">Ethical Craft</Link></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-black">Support</h4>
                            <ul className="space-y-4 text-gray-500 text-sm">
                                <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                                <li><Link to="/support" className="hover:text-black transition-colors">FAQs</Link></li>
                                <li><Link to="/track" className="hover:text-black transition-colors">Track Order</Link></li>
                                <li><Link to="/support" className="hover:text-black transition-colors">Returns</Link></li>
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-black">Connect</h4>
                            <ul className="space-y-4 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Pinterest</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">X / Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                    <p>© 2026 {settings?.site_name || "Uclose Co."}. Crafted in India.</p>

                    {/* Payment Icons at Bottom */}
                    <div className="flex items-center gap-6">
                        <span className="text-black opacity-50">Accepted Payments</span>
                        <div className="flex gap-4 items-center transition-opacity hover:opacity-100">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/200px-Google_Pay_Logo_%282020%29.svg.png" alt="Google Pay" className="h-3 md:h-3.5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 md:h-4.5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" className="h-4 md:h-4.5" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/200px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-4 md:h-4.5" />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                        <Link to="/support" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link to="/support" className="hover:text-black transition-colors">Terms of Service</Link>
                        <Link to="/support" className="hover:text-black transition-colors">Shipping Info</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
