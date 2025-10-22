/**
 * AutoCare Event Bus
 * Decoupled communication between modules
 */

class EventBus {
    constructor() {
        this.events = new Map();
    }

    // Subscribe to an event
    on(eventName, callback, options = {}) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        
        const listener = {
            callback,
            once: options.once || false,
            priority: options.priority || 0
        };
        
        this.events.get(eventName).push(listener);
        
        // Sort by priority (higher first)
        this.events.get(eventName).sort((a, b) => b.priority - a.priority);
        
        // Return unsubscribe function
        return () => this.off(eventName, callback);
    }

    // Subscribe once
    once(eventName, callback, options = {}) {
        return this.on(eventName, callback, { ...options, once: true });
    }

    // Unsubscribe from an event
    off(eventName, callback) {
        const listeners = this.events.get(eventName);
        if (!listeners) return;
        
        const index = listeners.findIndex(l => l.callback === callback);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
        
        if (listeners.length === 0) {
            this.events.delete(eventName);
        }
    }

    // Emit an event
    emit(eventName, data) {
        const listeners = this.events.get(eventName);
        if (!listeners || listeners.length === 0) return;
        
        // Create a copy to avoid issues if listeners modify the array
        const listenersCopy = [...listeners];
        
        for (const listener of listenersCopy) {
            try {
                listener.callback(data);
                
                if (listener.once) {
                    this.off(eventName, listener.callback);
                }
            } catch (error) {
                console.error(`Error in event listener for ${eventName}:`, error);
            }
        }
    }

    // Clear all listeners for an event
    clear(eventName) {
        if (eventName) {
            this.events.delete(eventName);
        } else {
            this.events.clear();
        }
    }
}

// Create singleton instance
const eventBus = new EventBus();

// Define standard events
const Events = {
    // Auth events
    AUTH_LOGIN: 'auth:login',
    AUTH_LOGOUT: 'auth:logout',
    AUTH_ERROR: 'auth:error',
    
    // Diagnostic events
    DIAGNOSTIC_SUBMIT: 'diagnostic:submit',
    DIAGNOSTIC_RESULT: 'diagnostic:result',
    DIAGNOSTIC_ERROR: 'diagnostic:error',
    
    // UI events
    TAB_CHANGE: 'ui:tab:change',
    MODAL_OPEN: 'ui:modal:open',
    MODAL_CLOSE: 'ui:modal:close',
    NOTIFICATION_SHOW: 'ui:notification:show',
    NOTIFICATION_HIDE: 'ui:notification:hide',
    
    // Sales events
    SALES_FILTER: 'sales:filter',
    SALES_CONTACT: 'sales:contact',
    
    // Media events
    MEDIA_UPLOAD: 'media:upload',
    MEDIA_REMOVE: 'media:remove'
};

// Export for use in other modules
window.AutoCareEvents = eventBus;
window.Events = Events;
