/**
 * AutoCare Frontend Configuration
 * Backend API Connection Settings
 */

const AutoCareConfig = {
    // Backend API Base URL
    API_BASE_URL: 'http://localhost:8000/api', // Change to your Laravel backend URL
    
    // API Endpoints
    endpoints: {
        // Auth
        login: '/login',
        register: '/register',
        logout: '/logout',
        
        // Parts
        parts: '/parts',
        partsSearch: '/parts/search',
        
        // Mechanics
        mechanics: '/mechanics',
        mechanicsSearch: '/mechanics/search',
        
        // Vehicles
        vehicles: '/vehicles',
        vehiclesSearch: '/vehicles/search',
        
        // Diagnostics
        diagnose: '/diagnose',
        diagnosticsHistory: '/diagnostics/history',
        
        // Carousel/Adverts
        carouselImages: '/carousel-images', // You'll need to create this endpoint
        
        // Health check
        health: '/health'
    },
    
    // Helper function to make API calls
    async apiCall(endpoint, options = {}) {
        const url = this.API_BASE_URL + endpoint;
        const token = localStorage.getItem('auth_token');
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        };
        
        try {
            const response = await fetch(url, { ...defaultOptions, ...options });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }
            
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    },
    
    // Test backend connection
    async testConnection() {
        try {
            const response = await this.apiCall(this.endpoints.health);
            console.log('✅ Backend connected:', response);
            return true;
        } catch (error) {
            console.error('❌ Backend connection failed:', error);
            return false;
        }
    }
};

// Make config globally available
window.AutoCareConfig = AutoCareConfig;

// Test connection on load
document.addEventListener('DOMContentLoaded', () => {
    AutoCareConfig.testConnection();
});
