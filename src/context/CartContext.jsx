import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../services/api';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [appliedPromo, setAppliedPromo] = useState(null);

    // Sync cart when authentication status changes
    useEffect(() => {
        const fetchCart = async () => {
            if (isAuthenticated) {
                try {
                    const data = await api.getCart();
                    setCartItems(data);
                } catch (err) {
                    console.error('Fetch cart failed:', err.message);
                }
            } else {
                setCartItems([]);
                setAppliedPromo(null);
            }
        };
        fetchCart();
    }, [isAuthenticated]);

    const addToCart = async (product, size = 'M') => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        try {
            await api.addToCart(product.id, size, 1);
            const data = await api.getCart();
            setCartItems(data);
        } catch (err) {
            console.error('Add to cart failed:', err.message);
        }
    };

    const removeFromCart = async (id, size) => {
        if (!isAuthenticated) return;

        try {
            await api.removeFromCart(id, size);
            const data = await api.getCart();
            setCartItems(data);
        } catch (err) {
            console.error('Remove from cart failed:', err.message);
        }
    };

    const updateQuantity = async (id, size, quantity) => {
        if (quantity < 1 || !isAuthenticated) return;

        try {
            await api.updateCartQuantity(id, size, quantity);
            const data = await api.getCart();
            setCartItems(data);
        } catch (err) {
            console.error('Update quantity failed:', err.message);
        }
    };

    const updateSize = async (id, oldSize, newSize) => {
        if (oldSize === newSize || !isAuthenticated) return;

        try {
            await api.updateCartSize(id, oldSize, newSize);
            const data = await api.getCart();
            setCartItems(data);
        } catch (err) {
            console.error('Update size failed:', err.message);
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated) {
            setCartItems([]);
            setAppliedPromo(null);
            return;
        }

        try {
            await api.clearCart();
            setCartItems([]);
            setAppliedPromo(null);
        } catch (err) {
            console.error('Clear cart failed:', err.message);
        }
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Discount is derived from the applied promo and current cart total.
    // Below the minimum purchase the promo simply yields no discount (it
    // re-applies automatically once the cart total qualifies again).
    const discount = useMemo(() => {
        if (!appliedPromo) return 0;
        if (cartTotal < appliedPromo.min_purchase) return 0;
        if (appliedPromo.discount_type === 'percentage') {
            return cartTotal * (appliedPromo.discount_value / 100);
        }
        return appliedPromo.discount_value;
    }, [cartTotal, appliedPromo]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            updateSize,
            clearCart,
            cartCount,
            cartTotal,
            isCartOpen,
            setIsCartOpen,
            appliedPromo,
            setAppliedPromo,
            discount
        }}>
            {children}
        </CartContext.Provider>
    );
};
