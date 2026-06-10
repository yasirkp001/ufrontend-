import './App.css';
import { useEffect, useRef, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { gsap } from 'gsap';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import LookbookPage from './pages/LookbookPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import SupportPage from './pages/SupportPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import PageLoader from './components/PageLoader';
import PageFade from './components/PageFade';
import { Routes, Route } from 'react-router-dom';
import { api } from './services/api';

function App() {
  const lenisRef = useRef(null);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    const checkMaintenance = async () => {
      try {
        const settings = await api.getSiteSettings();
        if (settings && (settings.maintenance_mode === 'true' || settings.maintenance_mode === '1')) {
          const adminToken = localStorage.getItem('uclose_admin_token') || sessionStorage.getItem('uclose_admin_token');
          if (!adminToken) {
            setIsMaintenance(true);
            setMaintenanceMessage(settings.announcement_banner || 'The store is currently undergoing maintenance. Please try again later.');
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoadingSettings(false);
      }
    };
    checkMaintenance();
  }, []);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  if (loadingSettings) {
    return (
      <div className="flex items-center justify-center bg-white" style={{ height: '100vh' }}>
        <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isMaintenance) {
    return (
      <div className="maintenance-overlay" style={{
        background: '#09090b',
        color: '#ffffff',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "sans-serif",
        textAlign: 'center',
        padding: '24px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px',
          backdropFilter: 'blur(20px)',
          maxWidth: '500px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            letterSpacing: '-1.5px',
            textTransform: 'uppercase',
            margin: '0 0 16px 0',
            background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Uclose.</h1>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#e4e4e7',
            margin: '0 0 24px 0'
          }}>Under Maintenance</h2>
          <p style={{
            fontSize: '14px',
            color: '#a1a1aa',
            lineHeight: '1.6',
            margin: '0 0 32px 0'
          }}>{maintenanceMessage}</p>
          <div style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#71717a'
          }}>We will be back shortly</div>
        </div>
      </div>
    );
  }

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      <PageLoader />
      <Navbar />
      <PageFade>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/track" element={<OrderTrackingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageFade>
    </ReactLenis>
  );
}

export default App;
