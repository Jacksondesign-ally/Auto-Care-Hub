/**
 * AutoCare UI Manager Module
 * Handles tab switching, navigation, and global UI state
 */

const UIManagerModule = {
    async init() {
        this.setupTabSwitching();
        this.setupNavigation();
        this.initializeIcons();
    },

    setupTabSwitching() {
        // Set up tab buttons
        document.querySelectorAll('[data-tab]').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                window.AutoCareEvents.emit(window.Events.TAB_CHANGE, { tab });
            });
        });

        // Initialize first tab
        const activeTab = window.AutoCareState.get('ui.activeTab');
        if (activeTab) {
            window.AutoCareEvents.emit(window.Events.TAB_CHANGE, { tab: activeTab });
        }
    },

    setupNavigation() {
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Profile dropdown
        const profileBtn = document.getElementById('profile-menu-button');
        const profileDropdown = document.getElementById('profile-dropdown');
        
        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                    profileDropdown.classList.add('hidden');
                }
            });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },

    initializeIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
            
            // Re-initialize icons when DOM changes
            const observer = new MutationObserver(() => {
                window.lucide.createIcons();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
};

// Register module
window.AutoCareApp.register('ui', UIManagerModule);
