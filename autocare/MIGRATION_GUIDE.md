# AutoCare Migration Guide

## System Redesign Summary

The AutoCare system has been redesigned with a modern, scalable architecture. This guide helps you understand the changes and how to work with the new system.

## What Changed

### Before (Old System)
- ❌ Scattered state across multiple files
- ❌ Direct DOM manipulation everywhere
- ❌ Tight coupling between modules
- ❌ Duplicate code and logic
- ❌ Hard to test and maintain

### After (New System)
- ✅ Centralized state management
- ✅ Event-driven architecture
- ✅ Reusable UI components
- ✅ Modular, independent features
- ✅ Easy to test and extend

## New File Structure

```
autocare/
├── core/                    # NEW: Core system
│   ├── state.js            # State management
│   ├── events.js           # Event bus
│   ├── ui.js               # UI components
│   └── bootstrap.js        # App initialization
│
├── features/               # NEW: Refactored modules
│   ├── diagnostics.js     # Diagnostic system
│   └── ui-manager.js      # UI management
│
└── [legacy files]         # Existing files (still work)
```

## Quick Start

### 1. Using State Management

```javascript
// OLD WAY - Global variables
let currentUser = null;
let diagnosticResults = null;

// NEW WAY - Centralized state
window.AutoCareState.set('auth.user', userData);
window.AutoCareState.set('diagnostics.current', results);

// Get state
const user = window.AutoCareState.get('auth.user');

// React to changes
window.AutoCareState.subscribe('auth.user', (newUser) => {
    console.log('User changed:', newUser);
});
```

### 2. Using Events

```javascript
// OLD WAY - Direct function calls
diagnosticModule.handleSubmit(data);
authModule.login(credentials);

// NEW WAY - Event-driven
window.AutoCareEvents.emit(window.Events.DIAGNOSTIC_SUBMIT, data);
window.AutoCareEvents.emit(window.Events.AUTH_LOGIN, credentials);

// Listen for events
window.AutoCareEvents.on(window.Events.DIAGNOSTIC_RESULT, (result) => {
    console.log('Got result:', result);
});
```

### 3. Using UI Components

```javascript
// OLD WAY - Manual HTML creation
const btn = document.createElement('button');
btn.className = 'btn-primary px-4 py-2 rounded-lg';
btn.innerHTML = '<i data-lucide="send"></i> Submit';
btn.addEventListener('click', handleClick);

// NEW WAY - UI component system
const btn = window.AutoCareUI.button('Submit', {
    variant: 'primary',
    icon: 'send',
    onClick: handleClick
});

// Show notifications
window.AutoCareUI.notify('Success!', 'success');

// Create modals
const modal = window.AutoCareUI.modal('Content', {
    title: 'My Modal',
    size: 'lg'
});
document.body.appendChild(modal);
```

### 4. Tab Switching

```javascript
// OLD WAY - Manual DOM manipulation
document.getElementById('car-sales-section').classList.remove('hidden');
document.getElementById('results-section').classList.add('hidden');

// NEW WAY - Event-driven
window.AutoCareEvents.emit(window.Events.TAB_CHANGE, { tab: 'sales' });
```

## Migrating Your Code

### Step 1: Identify Module Purpose

Determine what your module does:
- **UI Management** → Use `features/ui-manager.js` pattern
- **Data Processing** → Use `features/diagnostics.js` pattern
- **API Calls** → Create new service module
- **Form Handling** → Use events + state

### Step 2: Create Module Structure

```javascript
const MyModule = {
    // Initialize module
    async init() {
        console.log('[MyModule] Initializing...');
        this.setupEventListeners();
        this.setupUI();
    },

    // Set up event listeners
    setupEventListeners() {
        window.AutoCareEvents.on('my:event', this.handleEvent.bind(this));
        
        // Subscribe to state changes
        window.AutoCareState.subscribe('my.data', (newData) => {
            this.render(newData);
        });
    },

    // Set up UI
    setupUI() {
        const container = document.getElementById('my-container');
        if (!container) return;

        // Use UI components
        const btn = window.AutoCareUI.button('Click Me', {
            onClick: () => this.handleClick()
        });
        
        container.appendChild(btn);
    },

    // Handle events
    handleEvent(data) {
        console.log('Event received:', data);
        window.AutoCareState.set('my.data', data);
    },

    // Render UI
    render(data) {
        // Update DOM based on data
    }
};

// Register module
window.AutoCareApp.register('myModule', MyModule);
```

### Step 3: Replace Direct DOM Access

```javascript
// BEFORE
document.getElementById('diagnostic-tab').addEventListener('click', () => {
    // Manual tab switching logic
});

// AFTER
// In HTML: <button data-tab="diagnostics">Diagnostics</button>
// System handles it automatically via ui-manager.js
```

### Step 4: Use Standard Events

```javascript
// Available events in window.Events:
Events.AUTH_LOGIN
Events.AUTH_LOGOUT
Events.DIAGNOSTIC_SUBMIT
Events.DIAGNOSTIC_RESULT
Events.TAB_CHANGE
Events.MODAL_OPEN
Events.MODAL_CLOSE
Events.NOTIFICATION_SHOW
Events.SALES_FILTER
Events.MEDIA_UPLOAD
```

## Common Patterns

### Pattern 1: Form Submission

```javascript
const FormModule = {
    async init() {
        const form = document.getElementById('my-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const data = new FormData(form);
            window.AutoCareEvents.emit('form:submit', {
                formData: Object.fromEntries(data)
            });
        });
    }
};
```

### Pattern 2: Loading States

```javascript
const LoadingModule = {
    async fetchData() {
        // Set loading
        window.AutoCareState.set('my.loading', true);
        
        try {
            const data = await fetch('/api/data').then(r => r.json());
            window.AutoCareState.set('my.data', data);
        } catch (error) {
            window.AutoCareUI.notify('Error loading data', 'error');
        } finally {
            window.AutoCareState.set('my.loading', false);
        }
    }
};
```

### Pattern 3: Modal Dialogs

```javascript
function showConfirmDialog(message, onConfirm) {
    const content = document.createElement('div');
    content.innerHTML = `
        <p class="mb-4">${message}</p>
        <div class="flex gap-2 justify-end">
            <button class="cancel-btn btn-secondary">Cancel</button>
            <button class="confirm-btn btn-primary">Confirm</button>
        </div>
    `;
    
    const modal = window.AutoCareUI.modal(content, {
        title: 'Confirm Action',
        onClose: () => console.log('Cancelled')
    });
    
    content.querySelector('.confirm-btn').addEventListener('click', () => {
        onConfirm();
        modal.remove();
    });
    
    content.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });
    
    document.body.appendChild(modal);
}
```

## Testing Your Changes

### 1. Check Console

Open browser console and look for:
```
[AutoCare] Initializing application...
[AutoCare] Initializing auth...
[AutoCare] Initializing diagnostics...
[AutoCare] Application initialized successfully
```

### 2. Test State

```javascript
// In browser console
AutoCareState.get('ui.activeTab')  // Should show current tab
AutoCareState.set('ui.activeTab', 'sales')  // Should switch tabs
```

### 3. Test Events

```javascript
// In browser console
AutoCareEvents.on('test:event', (data) => console.log('Got:', data));
AutoCareEvents.emit('test:event', { test: 'data' });
```

## Troubleshooting

### Module Not Initializing

**Problem:** Module doesn't run on page load

**Solution:**
```javascript
// Make sure module is registered BEFORE bootstrap.js loads
window.AutoCareApp.register('myModule', MyModule);

// Or check if app is already initialized
if (window.AutoCareApp.initialized) {
    MyModule.init();
} else {
    window.AutoCareApp.register('myModule', MyModule);
}
```

### State Not Updating

**Problem:** State changes don't trigger updates

**Solution:**
```javascript
// Don't mutate state directly
const data = AutoCareState.get('my.data');
data.value = 'new';  // ❌ Won't trigger updates

// Use set() instead
const data = AutoCareState.get('my.data');
AutoCareState.set('my.data', { ...data, value: 'new' });  // ✅
```

### Events Not Firing

**Problem:** Event listeners not being called

**Solution:**
```javascript
// Check event name matches exactly
AutoCareEvents.on(Events.DIAGNOSTIC_SUBMIT, handler);  // ✅
AutoCareEvents.on('diagnostic:submit', handler);       // ✅
AutoCareEvents.on('diagnosticSubmit', handler);        // ❌ Wrong name
```

## Next Steps

1. **Read** `ARCHITECTURE.md` for detailed system documentation
2. **Review** `features/diagnostics.js` for a complete example
3. **Migrate** one module at a time
4. **Test** thoroughly after each migration
5. **Document** any new patterns you discover

## Getting Help

- Check browser console for errors
- Review `ARCHITECTURE.md` for API reference
- Look at existing feature modules for examples
- Test in isolation before integrating

## Benefits of New System

✅ **Maintainability** - Clear separation of concerns
✅ **Testability** - Modules can be tested independently  
✅ **Scalability** - Easy to add new features
✅ **Debugging** - Centralized state makes issues easier to track
✅ **Performance** - Optimized event handling and state updates
✅ **Developer Experience** - Consistent patterns and APIs
