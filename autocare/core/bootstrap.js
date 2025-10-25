/**
 * AutoCare Application Bootstrap
 * Initializes all modules in the correct order
 */

class AutoCareApp {
    constructor() {
        this.modules = new Map();
        this.initialized = false;
        this.debugMode = window.location.search.includes('debug=true');
        
        // Enable debug logging
        if (this.debugMode) {
            console.debug('[AutoCare] Debug mode enabled');
        }
    }

    // Register a module
    register(name, module) {
        if (this.debugMode) {
            console.debug(`[AutoCare] Registering module: ${name}`);
        }
        if (this.modules.has(name)) {
            console.warn(`Module ${name} is already registered`);
            return;
        }
        
        this.modules.set(name, {
            instance: module,
            initialized: false
        });
    }

    // Initialize all modules
    async init() {
        if (this.initialized) {
            console.warn('Application already initialized');
            return;
        }

        if (this.debugMode) {
            console.debug('[AutoCare] Initializing application...');
        }

        try {
            // Initialize Lucide icons
            if (window.lucide) {
                window.lucide.createIcons();
            }

            // Initialize modules in order
            const initOrder = [
                'homepage',
                'search',
                'voice',
                'vision',
                'auth',
                'diagnostics',
                'sales',
                'chatbot',
                'ui'
            ];

            for (const moduleName of initOrder) {
                const module = this.modules.get(moduleName);
                if (module && module.instance.init) {
                    if (this.debugMode) {
                        console.debug(`[AutoCare] Initializing ${moduleName}...`);
                    }
                    await module.instance.init();
                    module.initialized = true;
                }
            }

            // Set up global event listeners
            this.setupGlobalListeners();

            // Mark as initialized
            this.initialized = true;

            if (this.debugMode) {
                console.debug('[AutoCare] Application initialized successfully');
            }

            // Emit ready event
            window.AutoCareEvents.emit('app:ready');

        } catch (error) {
            console.error('[AutoCare] Initialization error:', error);
            window.AutoCareUI.notify('Failed to initialize application', 'error');
        }
    }

    // Set up global event listeners
    setupGlobalListeners() {
        // Tab switching
        window.AutoCareEvents.on(window.Events.TAB_CHANGE, (data) => {
            window.AutoCareState.set('ui.activeTab', data.tab);
            this.handleTabChange(data.tab);
        });

        // Modal management
        window.AutoCareEvents.on(window.Events.MODAL_OPEN, (data) => {
            window.AutoCareState.set('ui.modalOpen', data.modal);
        });

        window.AutoCareEvents.on(window.Events.MODAL_CLOSE, () => {
            window.AutoCareState.set('ui.modalOpen', null);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                const modalOpen = window.AutoCareState.get('ui.modalOpen');
                if (modalOpen) {
                    window.AutoCareEvents.emit(window.Events.MODAL_CLOSE);
                }
            }
        });
    }

    // Handle tab changes
    handleTabChange(tab) {
        // Hide all tab content
        document.querySelectorAll('[data-tab-content]').forEach(el => {
            el.classList.add('hidden');
        });

        // Show selected tab content
        const tabContent = document.querySelector(`[data-tab-content="${tab}"]`);
        if (tabContent) {
            tabContent.classList.remove('hidden');
        }

        // Update tab buttons
        document.querySelectorAll('[data-tab]').forEach(btn => {
            const btnTab = btn.getAttribute('data-tab');
            if (btnTab === tab) {
                btn.classList.add('active-tab', 'border-red-500', 'text-red-500');
                btn.classList.remove('border-transparent', 'text-gray-500');
            } else {
                btn.classList.remove('active-tab', 'border-red-500', 'text-red-500');
                btn.classList.add('border-transparent', 'text-gray-500');
            }
        });
    }

    // Get a module instance
    getModule(name) {
        const module = this.modules.get(name);
        return module ? module.instance : null;
    }

    // Check if a module is initialized
    isModuleInitialized(name) {
        const module = this.modules.get(name);
        return module ? module.initialized : false;
    }
}

// Create singleton instance
const app = new AutoCareApp();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Export for use in other modules
window.AutoCareApp = app;
