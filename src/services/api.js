const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? '' 
    : 'https://ubackend-guk8.onrender.com';

async function request(endpoint, options = {}) {
    const token = localStorage.getItem('uclose_token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
}

export const api = {
    // Auth endpoints
    register: (name, email, password) => 
        request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        }),
        
    login: (email, password) => 
        request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        }),
        
    getMe: () => 
        request('/api/auth/me'),

    // Products endpoints
    getProducts: () => 
        request('/api/products'),
        
    getProductById: (id) => 
        request(`/api/products/${id}`),

    // Cart endpoints
    getCart: () => 
        request('/api/cart'),
        
    addToCart: (productId, size, quantity = 1) => 
        request('/api/cart', {
            method: 'POST',
            body: JSON.stringify({ product_id: productId, size, quantity })
        }),
        
    updateCartQuantity: (productId, size, quantity) => 
        request('/api/cart/quantity', {
            method: 'PUT',
            body: JSON.stringify({ product_id: productId, size, quantity })
        }),
        
    updateCartSize: (productId, oldSize, newSize) => 
        request('/api/cart/size', {
            method: 'PUT',
            body: JSON.stringify({ product_id: productId, oldSize, newSize })
        }),
        
    removeFromCart: (productId, size) => 
        request(`/api/cart/${productId}?size=${size}`, {
            method: 'DELETE'
        }),
        
    clearCart: () => 
        request('/api/cart/clear', {
            method: 'DELETE'
        }),

    // Orders endpoints
    getOrders: () => 
        request('/api/orders'),
        
    placeOrder: (orderData) => 
        request('/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        }),
        
    cancelOrder: (orderId) => 
        request(`/api/orders/${orderId}`, {
            method: 'DELETE'
        }),

    // Admin endpoints
    getAdminStats: () =>
        request('/api/admin/stats'),

    getAdminUsers: () =>
        request('/api/admin/users'),

    getAdminOrders: () =>
        request('/api/admin/orders'),

    updateOrderStatus: (orderId, status) =>
        request(`/api/admin/orders/${orderId}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        }),

    createProduct: (productData) =>
        request('/api/admin/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        }),

    updateProduct: (productId, productData) =>
        request(`/api/admin/products/${productId}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        }),

    deleteProduct: (productId) =>
        request(`/api/admin/products/${productId}`, {
            method: 'DELETE'
        }),

    // Profile settings endpoints
    updateProfileDetails: (name, phone, dp) => 
        request('/api/auth/profile/update', {
            method: 'PUT',
            body: JSON.stringify({ name, phone, dp })
        }),

    // Coupon endpoints
    getActiveCoupons: () =>
        request('/api/orders/coupons/active'),

    validateCoupon: (code) =>
        request(`/api/orders/coupons/validate/${code}`),

    // Support tickets
    submitSupportTicket: (name, email, message) =>
        request('/api/support/tickets', {
            method: 'POST',
            body: JSON.stringify({ name, email, message })
        }),

    // Order returns
    requestReturn: (orderId) =>
        request(`/api/orders/${orderId}/return`, {
            method: 'PUT'
        }),

    // Size Guide endpoints
    getSizeGuideByCategory: (categoryName) =>
        request(`/api/size-guides/category/${categoryName}`),

    getSizeGuides: () =>
        request('/api/size-guides'),

    // Reviews endpoints
    getProductReviews: (productId) =>
        request(`/api/reviews?productId=${productId}`),

    submitProductReview: (productId, rating, comment) =>
        request('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({ product_id: productId, rating, comment })
        }),

    // Settings endpoint
    getSiteSettings: () =>
        request('/api/settings')
};
