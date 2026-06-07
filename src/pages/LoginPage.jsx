import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    useScrollReveal();
    const navigate = useNavigate();
    const location = useLocation();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const from = location.state?.from || '/';

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            setIsLoading(false);
            setIsSuccess(true);

            // Redirect to home after showing success message
            setTimeout(() => {
                navigate(from);
            }, 1500);
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Authentication failed. Please try again.');
        }
    };

    return (
        <div className="bg-white min-h-screen text-black font-sans flex flex-col relative overflow-hidden">
            {/* Minimal Navbar */}


            {/* Login Section */}
            <div className="flex-1 flex items-center justify-center p-6 pt-32">
                <div className="w-full max-w-md reveal">
                    <div className="mb-12 text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl font-medium tracking-tighter leading-none mb-4">
                            {isLogin ? 'Sign In.' : 'Register.'}
                        </h1>
                        <p className="text-gray-500 text-lg font-light">
                            {isLogin
                                ? 'Welcome back to Uclose Co.'
                                : 'Join the Uclose Co. community today.'}
                        </p>
                    </div>

                    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light"
                                    placeholder="Enter your name"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Password</label>
                                {isLogin && (
                                    <a href="#" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors">Forgot?</a>
                                )}
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors text-lg font-light"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-xs font-semibold uppercase tracking-wider text-center bg-red-50 py-3 border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="mt-4 flex flex-col items-center gap-4">
                            {/* Small round spinner + Success text */}
                            <div className="h-6 flex items-center justify-center">
                                {isLoading && (
                                    <div className="w-5 h-5 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
                                )}
                                {isSuccess && (
                                    <p className="text-green-600 text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                                        {isLogin ? 'Login Successfully Completed' : 'Account Created Successfully'}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || isSuccess}
                                className={`w-full bg-black text-white py-5 text-xs uppercase tracking-widest font-bold transition-all duration-500 rounded-sm ${isLoading || isSuccess ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                            >
                                {isLoading ? 'Processing...' : isSuccess ? 'Redirecting...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-sm text-gray-400 font-light italic">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={toggleMode}
                                className="text-black font-medium hover:underline ml-1"
                            >
                                {isLogin ? 'Register now' : 'Sign in here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Subtle Footer */}
            <div className="p-10 text-center text-[10px] uppercase tracking-[0.2em] text-gray-300 font-light">
                © 2026 Uclose Co. — Timeless Wardrobe.
            </div>
        </div>
    );
};

export default LoginPage;
