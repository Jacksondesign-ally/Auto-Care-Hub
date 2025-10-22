# AutoCare Quick Reference

## 🚀 Common Tasks

### State Management

```javascript
// Get state
const user = AutoCareState.get('auth.user');
const tab = AutoCareState.get('ui.activeTab');

// Set state
AutoCareState.set('auth.user', userData);
AutoCareState.set('diagnostics.current', diagnosis);

// Subscribe to changes
const unsubscribe = AutoCareState.subscribe('auth.user', (newUser, oldUser) => {
    console.log('User changed:', newUser);
});

// Unsubscribe
unsubscribe();
```

### Events

```javascript
// Emit event
AutoCareEvents.emit(Events.DIAGNOSTIC_SUBMIT, { description: 'Issue' });
AutoCareEvents.emit(Events.TAB_CHANGE, { tab: 'sales' });

// Listen for event
AutoCareEvents.on(Events.DIAGNOSTIC_RESULT, (result) => {
    console.log('Result:', result);
});

// Listen once
AutoCareEvents.once(Events.AUTH_LOGIN, (user) => {
    console.log('Logged in:', user);
});

// Unsubscribe
AutoCareEvents.off(Events.DIAGNOSTIC_SUBMIT, handler);
```

### UI Components

```javascript
// Button
const btn = AutoCareUI.button('Click Me', {
    variant: 'primary',  // or 'secondary'
    icon: 'send',
    onClick: () => console.log('Clicked!'),
    disabled: false
});

// Card
const card = AutoCareUI.card('Content here', {
    title: 'Card Title',
    footer: 'Footer content',
    className: 'custom-class'
});

// Modal
const modal = AutoCareUI.modal('Modal content', {
    title: 'Modal Title',
    size: 'md',  // sm, md, lg, xl, 2xl
    onClose: () => console.log('Closed')
});
document.body.appendChild(modal);

// Notification
AutoCareUI.notify('Success message', 'success', 5000);
AutoCareUI.notify('Error message', 'error');
AutoCareUI.notify('Warning', 'warning');
AutoCareUI.notify('Info', 'info');

// Input
const input = AutoCareUI.input({
    type: 'email',
    label: 'Email Address',
    icon: 'mail',
    placeholder: 'Enter email',
    value: ''
});

// Spinner
const spinner = AutoCareUI.spinner('md');  // sm, md, lg
```

## 📋 Standard Events

```javascript
// Authentication
Events.AUTH_LOGIN
Events.AUTH_LOGOUT
Events.AUTH_ERROR

// Diagnostics
Events.DIAGNOSTIC_SUBMIT
Events.DIAGNOSTIC_RESULT
Events.DIAGNOSTIC_ERROR

// UI
Events.TAB_CHANGE
Events.MODAL_OPEN
Events.MODAL_CLOSE
Events.NOTIFICATION_SHOW
Events.NOTIFICATION_HIDE

// Sales
Events.SALES_FILTER
Events.SALES_CONTACT

// Media
Events.MEDIA_UPLOAD
Events.MEDIA_REMOVE
```

## 🗂️ State Structure

```javascript
{
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
}
```

## 🔧 Module Template

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
        AutoCareEvents.on('my:event', this.handleEvent.bind(this));
        AutoCareState.subscribe('my.data', this.render.bind(this));
    },

    // Set up UI
    setupUI() {
        const container = document.getElementById('my-container');
        if (!container) return;

        const btn = AutoCareUI.button('Click Me', {
            onClick: () => this.handleClick()
        });
        
        container.appendChild(btn);
    },

    // Handle event
    handleEvent(data) {
        AutoCareState.set('my.data', data);
    },

    // Handle click
    handleClick() {
        AutoCareEvents.emit('my:action', { action: 'clicked' });
    },

    // Render UI
    render(data) {
        // Update DOM based on data
    }
};

// Register module
AutoCareApp.register('myModule', MyModule);
```

## 🎨 CSS Classes

### Buttons
```html
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
```

### Cards
```html
<div class="card">
    <div class="card-header p-4">Header</div>
    <div class="card-body p-4">Body</div>
    <div class="card-footer p-4">Footer</div>
</div>
```

### Tabs
```html
<button data-tab="diagnostics" class="active-tab">Tab 1</button>
<button data-tab="sales">Tab 2</button>

<div data-tab-content="diagnostics">Content 1</div>
<div data-tab-content="sales" class="hidden">Content 2</div>
```

## 🐛 Debugging

```javascript
// Check state
console.log(AutoCareState.get('ui'));

// Check if module initialized
console.log(AutoCareApp.isModuleInitialized('diagnostics'));

// Get module instance
const module = AutoCareApp.getModule('diagnostics');

// Test event
AutoCareEvents.on('test:event', (data) => console.log('Got:', data));
AutoCareEvents.emit('test:event', { test: 'data' });

// Check app status
console.log('App initialized:', AutoCareApp.initialized);
```

## 📱 HTML Attributes

```html
<!-- Tab buttons -->
<button data-tab="diagnostics">Diagnostics</button>

<!-- Tab content -->
<section data-tab-content="diagnostics">...</section>

<!-- Icons -->
<i data-lucide="icon-name"></i>
```

## ⚡ Performance Tips

```javascript
// ✅ Good - Batch state updates
AutoCareState.set('diagnostics.current', diagnosis);
AutoCareState.set('diagnostics.loading', false);

// ❌ Bad - Multiple small updates in loop
for (let i = 0; i < items.length; i++) {
    AutoCareState.set(`items.${i}`, items[i]);
}

// ✅ Good - Single update
AutoCareState.set('items', items);

// ✅ Good - Unsubscribe when done
const unsub = AutoCareState.subscribe('data', handler);
// Later...
unsub();

// ❌ Bad - Never unsubscribe (memory leak)
AutoCareState.subscribe('data', handler);
```

## 🔒 Best Practices

### State
- ✅ Use for shared data
- ✅ Keep immutable
- ✅ Subscribe for reactive updates
- ❌ Don't mutate directly

### Events
- ✅ Use for cross-module communication
- ✅ Use standard event names
- ✅ Handle errors in listeners
- ❌ Don't create circular dependencies

### UI Components
- ✅ Use for consistency
- ✅ Initialize icons after DOM changes
- ✅ Clean up listeners
- ❌ Don't mix inline styles

### Modules
- ✅ Keep focused
- ✅ Make testable
- ✅ Use async/await
- ❌ Don't create tight coupling

## 📚 Documentation Files

- `ARCHITECTURE.md` - Complete system architecture
- `MIGRATION_GUIDE.md` - Step-by-step migration
- `REDESIGN_SUMMARY.md` - Overview of changes
- `QUICK_REFERENCE.md` - This file

## 🆘 Common Issues

### Module not initializing
```javascript
// Check if registered
console.log(AutoCareApp.modules.has('myModule'));

// Register before bootstrap
AutoCareApp.register('myModule', MyModule);
```

### State not updating
```javascript
// ❌ Don't mutate
const data = AutoCareState.get('my.data');
data.value = 'new';

// ✅ Use set
AutoCareState.set('my.data', { ...data, value: 'new' });
```

### Events not firing
```javascript
// ✅ Use exact event name
AutoCareEvents.on(Events.DIAGNOSTIC_SUBMIT, handler);

// ❌ Wrong name
AutoCareEvents.on('diagnosticSubmit', handler);
```

---

**Quick Links:**
- [Architecture](./ARCHITECTURE.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [Redesign Summary](./REDESIGN_SUMMARY.md)
