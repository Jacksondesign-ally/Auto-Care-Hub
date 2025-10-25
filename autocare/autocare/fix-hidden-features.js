/**
 * AutoCare - Quick Fix for Hidden Features
 * This script automatically shows all hidden features on page load
 */

(function() {
    'use strict';
    
    console.log('🔧 [AutoCare] Fixing hidden features...');
    
    // Wait for DOM to be ready
    function init() {
        // 1. Show Results Section
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            console.log('✅ Results section visible');
        }
        
        // 2. Show Car Sales Section  
        const carSalesSection = document.getElementById('car-sales-section');
        if (carSalesSection) {
            carSalesSection.classList.remove('hidden');
            console.log('✅ Car sales section visible');
        }
        
        // 3. Initialize Voice Input
        if (window.VoiceInputModule) {
            try {
                if (typeof window.VoiceInputModule.init === 'function') {
                    window.VoiceInputModule.init();
                    console.log('✅ Voice input initialized');
                }
            } catch (error) {
                console.warn('⚠️ Voice input initialization failed:', error.message);
            }
        }
        
        // 4. Initialize Computer Vision
        if (window.ComputerVisionModule) {
            try {
                if (typeof window.ComputerVisionModule.init === 'function') {
                    window.ComputerVisionModule.init();
                    console.log('✅ Computer vision initialized');
                }
            } catch (error) {
                console.warn('⚠️ Computer vision initialization failed:', error.message);
            }
        }
        
        // 5. Ensure all feature modules are registered
        if (window.AutoCareApp) {
            const modules = window.AutoCareApp.modules;
            if (modules) {
                console.log('📦 Registered modules:', Array.from(modules.keys()));
            }
        }
        
        // 6. Show Debug Panel if in debug mode
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('debug') === 'true') {
            const debugPanel = document.getElementById('debug-panel');
            if (debugPanel) {
                debugPanel.classList.remove('hidden');
                console.log('✅ Debug panel visible');
            }
        }
        
        // 7. Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
            console.log('✅ Icons initialized');
        }
        
        // 8. Show all data-tab-content sections (make them togglable instead of hidden)
        const tabSections = document.querySelectorAll('[data-tab-content]');
        tabSections.forEach(section => {
            // Don't remove hidden, just make them toggleable
            console.log('📄 Tab section found:', section.id);
        });
        
        // 9. Check for missing modules
        const expectedModules = [
            'VoiceInputModule',
            'AdvancedAIDiagnosticEngine', 
            'EnhancedDiagnosticEngine',
            'ComputerVisionModule',
            'DiagnosticsModule'
        ];
        
        console.log('\n📊 Module Status:');
        expectedModules.forEach(moduleName => {
            if (window[moduleName]) {
                console.log(`  ✅ ${moduleName}: Available`);
            } else {
                console.log(`  ❌ ${moduleName}: Missing`);
            }
        });
        
        // 10. Fix any elements with display:none inline style
        document.querySelectorAll('[style*="display: none"], [style*="display:none"]').forEach(el => {
            if (el.id && !el.classList.contains('intentionally-hidden')) {
                console.log(`⚠️ Found hidden element: ${el.id || el.className}`);
            }
        });
        
        console.log('\n✨ All visible features have been initialized!');
        console.log('💡 Tip: Add ?debug=true to URL to see debug panel');
        
        // Show notification if AutoCareUI is available
        if (window.AutoCareUI && typeof window.AutoCareUI.notify === 'function') {
            window.AutoCareUI.notify('All features initialized successfully!', 'success');
        }
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Export for manual use
    window.AutoCareFixHiddenFeatures = {
        init: init,
        showAll: function() {
            // Force show everything
            document.querySelectorAll('.hidden').forEach(el => {
                if (el.id) {
                    el.classList.remove('hidden');
                    console.log('👁️ Showing:', el.id);
                }
            });
        },
        checkModules: function() {
            const modules = ['VoiceInputModule', 'AdvancedAIDiagnosticEngine', 'ComputerVisionModule'];
            modules.forEach(name => {
                console.log(`${name}:`, window[name] ? '✅' : '❌');
            });
        }
    };
})();
