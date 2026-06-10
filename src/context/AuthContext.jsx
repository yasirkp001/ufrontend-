import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verify token on mount
    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('uclose_token');
            if (token) {
                try {
                    const data = await api.getMe();
                    setIsAuthenticated(true);
                    setUserEmail(data.user.email);
                    setUser(data.user);
                } catch (error) {
                    console.error('Failed to restore session:', error.message);
                    // Invalid token or expired
                    localStorage.removeItem('uclose_token');
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userEmail');
                }
            }
            setLoading(false);
        };

        verifyUser();
    }, []);

    const login = async (email, password) => {
        try {
            const data = await api.login(email, password);
            localStorage.setItem('uclose_token', data.token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', data.user.email);
            
            setIsAuthenticated(true);
            setUserEmail(data.user.email);
            setUser(data.user);
            return data;
        } catch (error) {
            console.error('Login error context:', error.message);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const data = await api.register(name, email, password);
            localStorage.setItem('uclose_token', data.token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', data.user.email);
            
            setIsAuthenticated(true);
            setUserEmail(data.user.email);
            setUser(data.user);
            return data;
        } catch (error) {
            console.error('Registration error context:', error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('uclose_token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        
        setIsAuthenticated(false);
        setUserEmail(null);
        setUser(null);
    };

    const refreshUser = async () => {
        const token = localStorage.getItem('uclose_token');
        if (token) {
            try {
                const data = await api.getMe();
                setIsAuthenticated(true);
                setUserEmail(data.user.email);
                setUser(data.user);
            } catch (error) {
                console.error('Failed to refresh user:', error.message);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userEmail, user, loading, login, register, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
