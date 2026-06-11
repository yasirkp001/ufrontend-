import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    useScrollReveal();
    const navigate = useNavigate();
    const location = useLocation();
    const { login, register, googleLogin } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [googleInitialized, setGoogleInitialized] = useState(false);

    const from = location.state?.from || '/';
    
    const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
    const isPlaceholder = !clientID || clientID.includes('placeholder') || clientID.startsWith('928374982734-');

    const handleSimulatedGoogleLogin = async () => {
        const emailInput = prompt("Enter email for Simulated Google Login:", "yasirkp1014@gmail.com");
        if (!emailInput) return;
        
        setIsLoading(true);
        setError('');
        try {
            const mockName = emailInput.split('@')[0];
            const credential = `mock_token_${Date.now()}_${emailInput.toLowerCase()}_${mockName}`;
            await googleLogin(credential);
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                navigate(from);
            }, 1500);
        } catch (err) {
            setIsLoading(false);
            setError(err.message || 'Google authentication failed. Please try again.');
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const errParam = queryParams.get('error');
        if (errParam) {
            setError(errParam);
        }
    }, [location.search]);

    useEffect(() => {
        const handleGoogleLoginResponse = async (response) => {
            setIsLoading(true);
            setError('');
            try {
                await googleLogin(response.credential);
                setIsLoading(false);
                setIsSuccess(true);
                setTimeout(() => {
                    navigate(from);
                }, 1500);
            } catch (err) {
                setIsLoading(false);
                setError(err.message || 'Google authentication failed. Please try again.');
            }
        };

        const initGoogleSignIn = () => {
            if (window.google?.accounts?.id) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '928374982734-nbm1234abcd5678efgh9012ijkl3456.apps.googleusercontent.com',
                    callback: handleGoogleLoginResponse
                });
                setGoogleInitialized(true);
            }
        };

        let script;
        if (!window.google?.accounts?.id) {
            script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initGoogleSignIn;
            document.body.appendChild(script);
        } else {
            initGoogleSignIn();
        }

        return () => {
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, [googleLogin, navigate, from]);

    const renderGoogleButton = (element) => {
        if (element && googleInitialized && window.google?.accounts?.id) {
            window.google.accounts.id.renderButton(
                element,
                { 
                    theme: 'outline', 
                    size: 'large', 
                    text: 'continue_with',
                    shape: 'rectangular',
                    width: '380'
                }
            );
        }
    };

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
                            <div className="text-red-500 text-xs font-semibold uppercase tracking-wider text-center bg-red-50 py-3 border border-red-100 px-4">
                                {error.includes('deactivated') ? (
                                    <span>
                                        Your account has been deactivated. Please{' '}
                                        <Link to="/contact" className="underline font-bold hover:text-red-700">
                                            Contact Support
                                        </Link>
                                    </span>
                                ) : (
                                    error
                                )}
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

                            <div className="flex items-center w-full my-4">
                                <div className="flex-1 border-t border-gray-100"></div>
                                <span className="mx-4 text-[10px] uppercase tracking-widest text-gray-400 font-bold">or</span>
                                <div className="flex-1 border-t border-gray-100"></div>
                            </div>

                            <div className="w-full flex justify-center">
                                {isPlaceholder ? (
                                    <button
                                        type="button"
                                        onClick={handleSimulatedGoogleLogin}
                                        className="w-full border border-gray-200 py-3.5 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-medium text-sm text-gray-700 rounded-sm cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        Continue with Google
                                    </button>
                                ) : (
                                    <div ref={renderGoogleButton} className="w-full min-h-[44px]"></div>
                                )}
                            </div>
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
