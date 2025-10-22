/**
 * AutoCare State Management System
 * Centralized state with event-driven updates
 */

class StateManager {
    constructor() {
        this.state = {
            auth: {
                user: null,
                isAuthenticated: false,
                loading: false
            },
            diagnostics: {
                current: null,
                history: [],
                loading: false
            },
            ui: {
                activeTab: 'diagnostics',
                modalOpen: null,
                notifications: []
            },
            sales: {
                listings: [],
                filters: {
                    minPrice: null,
                    maxPrice: null,
                    condition: 'any'
                }
            }
        };
        
        this.listeners = new Map();
        this.middleware = [];
    }

    // Subscribe to state changes
    subscribe(path, callback) {
        if (!this.listeners.has(path)) {
            this.listeners.set(path, new Set());
        }
        this.listeners.get(path).add(callback);
        
        // Return unsubscribe function
        return () => {
            const callbacks = this.listeners.get(path);
            if (callbacks) {
                callbacks.delete(callback);
            }
        };
    }

    // Get state value by path
    get(path) {
        const keys = path.split('.');
        let value = this.state;
        
        for (const key of keys) {
            if (value === undefined || value === null) return undefined;
            value = value[key];
        }
        
        return value;
    }

    // Update state and notify listeners
    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let target = this.state;
        
        // Navigate to the parent object
        for (const key of keys) {
            if (!(key in target)) {
                target[key] = {};
            }
            target = target[key];
        }
        
        // Store old value for middleware
        const oldValue = target[lastKey];
        
        // Apply middleware
        let newValue = value;
        for (const mw of this.middleware) {
            newValue = mw(path, newValue, oldValue);
        }
        
        // Set new value
        target[lastKey] = newValue;
        
        // Notify listeners
        this.notify(path, newValue, oldValue);
        
        // Notify parent path listeners
        const parentPath = keys.join('.');
        if (parentPath) {
            this.notify(parentPath, this.get(parentPath), undefined);
        }
    }

    // Notify all listeners for a path
    notify(path, newValue, oldValue) {
        const callbacks = this.listeners.get(path);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    console.error(`Error in state listener for ${path}:`, error);
                }
            });
        }
    }

    // Add middleware for state changes
    use(middleware) {
        this.middleware.push(middleware);
    }

    // Reset state to initial values
    reset() {
        this.state = {
            auth: { user: null, isAuthenticated: false, loading: false },
            diagnostics: { current: null, history: [], loading: false },
            ui: { activeTab: 'diagnostics', modalOpen: null, notifications: [] },
            sales: { listings: [], filters: { minPrice: null, maxPrice: null, condition: 'any' } }
        };
        this.listeners.clear();
    }
}

// Create singleton instance
const stateManager = new StateManager();

// Add logging middleware in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    stateManager.use((path, newValue, oldValue) => {
        console.log(`[State] ${path}:`, { old: oldValue, new: newValue });
        return newValue;
    });
}

// Export for use in other modules
window.AutoCareState = stateManager;
