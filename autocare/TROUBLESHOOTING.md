# AutoCare Troubleshooting Guide

## 🔍 Can't See Changes?

### Quick Fixes

#### 1. **Hard Refresh the Browser**
- **Windows/Linux**: `Ctrl + F5` or `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- This clears cached JavaScript and CSS files

#### 2. **Clear Browser Cache**
- Chrome: Settings → Privacy → Clear browsing data
- Firefox: Options → Privacy → Clear Data
- Safari: Preferences → Privacy → Manage Website Data

#### 3. **Check Browser Console**
Open Developer Tools (F12) and look for errors:
```javascript
// You should see these messages:
[AutoCare] Initializing application...
[AutoCare] Initializing homepage...
[AutoCare] Initializing search...
[AutoCare] Application initialized successfully
```

#### 4. **Test with TEST_FEATURES.html**
Open `TEST_FEATURES.html` in your browser to test features in isolation:
- Homepage carousel should replace hero section
- Diagnostic test should show enhanced results
- Feature status should show all green checkmarks

---

## 🐛 Common Issues

### Issue 1: Carousel Not Showing

**Symptoms:**
- Old hero section still visible
- No sliding carousel

**Solutions:**
1. Check if `hero-section` class exists in HTML:
   ```html
   <section class="hero-section ...">
   ```

2. Verify script loading order in `index.html`:
   ```html
   <script src="features/homepage-carousel.js" defer></script>
   ```

3. Check browser console for errors

4. Ensure module is registered:
   ```javascript
   // In browser console:
   AutoCareApp.modules.has('homepage') // Should return true
   ```

---

### Issue 2: Search Bar Not Appearing

**Symptoms:**
- No search bar in header
- Search functionality not working

**Solutions:**
1. Check if header has proper structure:
   ```html
   <header>
       <div class="container">
           <!-- Search will be inserted here -->
       </div>
   </header>
   ```

2. Verify search module loaded:
   ```javascript
   // In browser console:
   AutoCareApp.modules.has('search') // Should return true
   ```

3. Check for JavaScript errors in console

---

### Issue 3: Enhanced Diagnostics Not Working

**Symptoms:**
- Old diagnostic results showing
- No health scores or urgency levels

**Solutions:**
1. Verify enhanced engine loaded:
   ```javascript
   // In browser console:
   window.EnhancedDiagnosticEngine // Should be defined
   ```

2. Check if diagnostic module uses enhanced engine:
   ```javascript
   // Should see in console:
   [AutoCare] Initializing diagnostics...
   ```

3. Test with known symptoms:
   - "engine knocking"
   - "car overheating"
   - "brakes squealing"

---

### Issue 4: Marketplace Data Not Loading

**Symptoms:**
- Search returns no results
- No parts/mechanics/vehicles data

**Solutions:**
1. Check if data loaded:
   ```javascript
   // In browser console:
   window.MarketplaceData // Should show object with parts, mechanics, vehicles
   MarketplaceData.parts.length // Should be 3
   MarketplaceData.mechanics.length // Should be 3
   MarketplaceData.vehicles.length // Should be 2
   ```

2. Verify script loading:
   ```html
   <script src="data/marketplace-data.js"></script>
   ```

---

## 🔧 Debugging Steps

### Step 1: Check File Structure
Ensure all files exist:
```
autocare/
├── core/
│   ├── state.js ✓
│   ├── events.js ✓
│   ├── ui.js ✓
│   └── bootstrap.js ✓
├── features/
│   ├── homepage-carousel.js ✓
│   ├── enhanced-diagnostics.js ✓
│   ├── search.js ✓
│   ├── diagnostics.js ✓
│   └── ui-manager.js ✓
├── data/
│   └── marketplace-data.js ✓
└── index.html ✓
```

### Step 2: Verify Script Loading
Open browser DevTools → Network tab → Reload page

Check that all scripts load with status 200:
- core/state.js
- core/events.js
- core/ui.js
- data/marketplace-data.js
- features/enhanced-diagnostics.js
- features/homepage-carousel.js
- features/search.js
- core/bootstrap.js

### Step 3: Check Console for Errors
Look for:
- ❌ 404 errors (file not found)
- ❌ Syntax errors
- ❌ Reference errors
- ✅ Initialization messages

### Step 4: Test Core Systems
Open browser console and run:

```javascript
// Test State Management
AutoCareState.set('test', 'value');
AutoCareState.get('test'); // Should return 'value'

// Test Event Bus
AutoCareEvents.on('test', (data) => console.log('Got:', data));
AutoCareEvents.emit('test', { hello: 'world' });

// Test UI Components
document.body.appendChild(
    AutoCareUI.button('Test Button', { 
        onClick: () => alert('Works!') 
    })
);

// Test Enhanced Diagnostics
const result = EnhancedDiagnosticEngine.diagnose('engine knocking');
console.log(result);

// Test Marketplace Data
console.log(MarketplaceData.parts);
console.log(MarketplaceData.mechanics);
console.log(MarketplaceData.vehicles);
```

---

## 📋 Verification Checklist

### Before Reporting Issues:

- [ ] Hard refreshed browser (Ctrl+F5)
- [ ] Cleared browser cache
- [ ] Checked browser console for errors
- [ ] Verified all script files exist
- [ ] Tested with TEST_FEATURES.html
- [ ] Checked Network tab for 404 errors
- [ ] Tried in different browser
- [ ] Checked file paths are correct

### What to Include in Bug Report:

1. **Browser & Version**: Chrome 120, Firefox 121, etc.
2. **Console Errors**: Copy exact error messages
3. **Network Errors**: Screenshot of failed requests
4. **Steps to Reproduce**: What you did before issue occurred
5. **Expected vs Actual**: What should happen vs what happens

---

## 🚀 Quick Test Commands

### Test in Browser Console:

```javascript
// 1. Check if everything loaded
console.log('State:', !!window.AutoCareState);
console.log('Events:', !!window.AutoCareEvents);
console.log('UI:', !!window.AutoCareUI);
console.log('Enhanced Diagnostics:', !!window.EnhancedDiagnosticEngine);
console.log('Marketplace:', !!window.MarketplaceData);
console.log('App:', !!window.AutoCareApp);

// 2. Check modules
if (window.AutoCareApp) {
    console.log('Modules:', Array.from(AutoCareApp.modules.keys()));
    console.log('Initialized:', AutoCareApp.initialized);
}

// 3. Test diagnostic
const diagnosis = EnhancedDiagnosticEngine.diagnose('my engine is knocking');
console.log('Diagnosis:', diagnosis);

// 4. Test notification
AutoCareUI.notify('Test notification!', 'success');

// 5. Check data
console.log('Parts:', MarketplaceData.parts.length);
console.log('Mechanics:', MarketplaceData.mechanics.length);
console.log('Vehicles:', MarketplaceData.vehicles.length);
```

---

## 🔄 Reset to Working State

If nothing works, try these steps:

### 1. Backup Current Files
```bash
# Create backup folder
mkdir autocare_backup
# Copy files
cp -r autocare/* autocare_backup/
```

### 2. Verify File Integrity
- Check that no files are corrupted
- Ensure all files have content
- Verify no syntax errors

### 3. Test Minimal Setup
Use `TEST_FEATURES.html` which has minimal dependencies

### 4. Incremental Testing
1. Test core system first (state, events, UI)
2. Add enhanced diagnostics
3. Add homepage carousel
4. Add search
5. Add full index.html

---

## 📞 Still Having Issues?

### Check Documentation:
- `ARCHITECTURE.md` - System architecture
- `ENHANCED_FEATURES.md` - Feature documentation
- `QUICK_REFERENCE.md` - API reference
- `MIGRATION_GUIDE.md` - Migration patterns

### Debug Mode:
Add this to see detailed logs:
```javascript
// In browser console
localStorage.setItem('debug', 'true');
location.reload();
```

### Test Files:
- `TEST_FEATURES.html` - Isolated feature testing
- Open in browser and check console

---

## ✅ Success Indicators

You'll know everything works when:

1. **Homepage Carousel**
   - ✓ Sliding hero section visible
   - ✓ 5 slides with smooth transitions
   - ✓ Navigation arrows and dots work
   - ✓ Auto-play every 5 seconds

2. **Enhanced Diagnostics**
   - ✓ Urgency badges show (CRITICAL, HIGH, etc.)
   - ✓ Health scores display (0-100%)
   - ✓ Cost estimates appear
   - ✓ Recommendations list shows

3. **Global Search**
   - ✓ Search bar in header
   - ✓ Results appear as you type
   - ✓ Parts, mechanics, vehicles searchable
   - ✓ Click opens detailed modal

4. **Console Messages**
   ```
   [AutoCare] Initializing application...
   [AutoCare] Initializing homepage...
   [AutoCare] Initializing search...
   [AutoCare] Initializing diagnostics...
   [AutoCare] Application initialized successfully
   ```

---

**Last Updated**: October 2025
**Version**: 2.1.0
