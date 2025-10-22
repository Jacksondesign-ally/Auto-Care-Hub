/**
 * AutoCare Setup Verification Script
 * Run this in browser console to verify all features are loaded
 */

(function() {
    console.log('='.repeat(50));
    console.log('AutoCare Setup Verification');
    console.log('='.repeat(50));
    
    const checks = [];
    
    // Check Core Systems
    checks.push({
        name: 'State Manager',
        status: !!window.AutoCareState,
        details: window.AutoCareState ? 'Loaded' : 'Missing'
    });
    
    checks.push({
        name: 'Event Bus',
        status: !!window.AutoCareEvents,
        details: window.AutoCareEvents ? 'Loaded' : 'Missing'
    });
    
    checks.push({
        name: 'UI Components',
        status: !!window.AutoCareUI,
        details: window.AutoCareUI ? 'Loaded' : 'Missing'
    });
    
    checks.push({
        name: 'App Bootstrap',
        status: !!window.AutoCareApp,
        details: window.AutoCareApp ? 
            `Initialized: ${window.AutoCareApp.initialized}` : 
            'Missing'
    });
    
    // Check Enhanced Features
    checks.push({
        name: 'Enhanced Diagnostics',
        status: !!window.EnhancedDiagnosticEngine,
        details: window.EnhancedDiagnosticEngine ? 'Loaded' : 'Missing'
    });
    
    checks.push({
        name: 'Marketplace Data',
        status: !!window.MarketplaceData,
        details: window.MarketplaceData ? 
            `Parts: ${window.MarketplaceData.parts.length}, Mechanics: ${window.MarketplaceData.mechanics.length}, Vehicles: ${window.MarketplaceData.vehicles.length}` :
            'Missing'
    });
    
    // Check Modules
    if (window.AutoCareApp && window.AutoCareApp.modules) {
        const modules = Array.from(window.AutoCareApp.modules.keys());
        checks.push({
            name: 'Registered Modules',
            status: modules.length > 0,
            details: modules.join(', ') || 'None'
        });
    }
    
    // Check DOM Elements
    checks.push({
        name: 'Hero Section',
        status: !!document.querySelector('.hero-section'),
        details: document.querySelector('.hero-section') ? 'Found' : 'Missing'
    });
    
    checks.push({
        name: 'Carousel',
        status: !!document.querySelector('.homepage-carousel'),
        details: document.querySelector('.homepage-carousel') ? 'Active' : 'Not initialized'
    });
    
    checks.push({
        name: 'Search Bar',
        status: !!document.getElementById('global-search'),
        details: document.getElementById('global-search') ? 'Active' : 'Not initialized'
    });
    
    // Display Results
    console.log('\n📊 Verification Results:\n');
    
    let passCount = 0;
    let failCount = 0;
    
    checks.forEach(check => {
        const icon = check.status ? '✅' : '❌';
        const status = check.status ? 'PASS' : 'FAIL';
        console.log(`${icon} ${check.name}: ${status}`);
        console.log(`   ${check.details}`);
        
        if (check.status) passCount++;
        else failCount++;
    });
    
    console.log('\n' + '='.repeat(50));
    console.log(`Total: ${checks.length} | Passed: ${passCount} | Failed: ${failCount}`);
    console.log('='.repeat(50));
    
    // Recommendations
    if (failCount > 0) {
        console.log('\n⚠️  Issues Detected!\n');
        console.log('Recommendations:');
        console.log('1. Hard refresh browser (Ctrl+F5)');
        console.log('2. Check browser console for errors');
        console.log('3. Verify all script files exist');
        console.log('4. Check Network tab for 404 errors');
        console.log('5. Try TEST_FEATURES.html for isolated testing');
        console.log('\nSee TROUBLESHOOTING.md for detailed help');
    } else {
        console.log('\n✅ All systems operational!');
        console.log('\nYou can now:');
        console.log('- Use the sliding homepage carousel');
        console.log('- Search for parts, mechanics, vehicles');
        console.log('- Get enhanced diagnostic results');
        console.log('- Access comprehensive marketplace data');
    }
    
    // Return summary
    return {
        passed: passCount,
        failed: failCount,
        total: checks.length,
        checks: checks,
        allPassed: failCount === 0
    };
})();
