# AutoCare System Architecture

## Overview

AutoCare has been redesigned with a modern, modular architecture featuring:
- **Centralized State Management** - Single source of truth for application state
- **Event-Driven Communication** - Decoupled modules communicating via events
- **Reusable UI Components** - Consistent, maintainable UI elements
- **Modular Feature System** - Independent, testable feature modules

## Directory Structure

```
autocare/
├── core/                      # Core system modules
│   ├── state.js              # State management system
│   ├── events.js             # Event bus for inter-module communication
│   ├── ui.js                 # Reusable UI component library
│   └── bootstrap.js          # Application initialization
│
├── features/                  # Feature modules
│   ├── diagnostics.js        # Diagnostic system (refactored)
│   ├── ui-manager.js         # UI state and navigation
│   └── [future modules]      # Sales, auth, etc.
│
├── legacy/                    # Legacy modules (to be refactored)
│   ├── diagnostic-ai.js      # AI diagnostic engine
│   ├── media-upload.js       # Media upload utilities
│   ├── car-sales.js          # Car sales listings
│   ├── car-slider.js         # Featured cars slider
│   ├── chatbot.js            # Chatbot assistant
│   ├── direct-contact.js     # Contact form system
│   └── auth.js               # Authentication (Supabase)
│
└── index.html                # Main application entry point
```

## Core Systems

### 1. State Management (`core/state.js`)

Centralized state container with reactive updates.

**Usage:**
```javascript
// Get state
const user = window.AutoCareState.get('auth.user');

// Set state
window.AutoCareState.set('auth.user', userData);

// Subscribe to changes
const unsubscribe = window.AutoCareState.subscribe('auth.user', (newUser, oldUser) => {
    console.log('User changed:', newUser);
});

// Unsubscribe
unsubscribe();
```

**State Structure:**
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

### 2. Event Bus (`core/events.js`)

Decoupled communication between modules.

**Usage:**
```javascript
// Subscribe to event
window.AutoCareEvents.on(window.Events.DIAGNOSTIC_SUBMIT, (data) => {
    console.log('Diagnostic submitted:', data);
});

// Subscribe once
window.AutoCareEvents.once(window.Events.AUTH_LOGIN, (user) => {
    console.log('User logged in:', user);
});

// Emit event
window.AutoCareEvents.emit(window.Events.TAB_CHANGE, { tab: 'sales' });

// Unsubscribe
window.AutoCareEvents.off(window.Events.DIAGNOSTIC_SUBMIT, handler);
```

**Standard Events:**
- `auth:login`, `auth:logout`, `auth:error`
- `diagnostic:submit`, `diagnostic:result`, `diagnostic:error`
- `ui:tab:change`, `ui:modal:open`, `ui:modal:close`
- `ui:notification:show`, `ui:notification:hide`
- `sales:filter`, `sales:contact`
- `media:upload`, `media:remove`

### 3. UI Components (`core/ui.js`)

Reusable UI component library.

**Usage:**
```javascript
// Create button
const btn = window.AutoCareUI.button('Submit', {
    variant: 'primary',
    icon: 'send',
    onClick: () => console.log('Clicked!')
});

// Create card
const card = window.AutoCareUI.card('Content here', {
    title: 'Card Title',
    footer: 'Footer content'
});

// Create modal
const modal = window.AutoCareUI.modal('Modal content', {
    title: 'Modal Title',
    size: 'lg',
    onClose: () => console.log('Closed')
});
document.body.appendChild(modal);

// Show notification
window.AutoCareUI.notify('Success message', 'success', 5000);

// Create input
const input = window.AutoCareUI.input({
    type: 'email',
    label: 'Email Address',
    icon: 'mail',
    placeholder: 'Enter email'
});
```

### 4. Bootstrap (`core/bootstrap.js`)

Application initialization and module registration.

**Module Registration:**
```javascript
const MyModule = {
    async init() {
        // Initialize module
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        window.AutoCareEvents.on('my:event', this.handleEvent.bind(this));
    },
    
    handleEvent(data) {
        console.log('Event received:', data);
    }
};

// Register module
window.AutoCareApp.register('myModule', MyModule);
```

## Feature Modules

### Diagnostics Module (`features/diagnostics.js`)

Handles vehicle diagnostics with AI integration.

**Features:**
- Form submission handling
- AI diagnostic processing
- Media enhancement
- Results rendering
- Follow-up questions
- State management integration

**Events Emitted:**
- `diagnostic:submit` - When user submits diagnostic
- `diagnostic:result` - When results are ready
- `diagnostic:error` - On diagnostic errors

**State Updates:**
- `diagnostics.current` - Current diagnostic result
- `diagnostics.history` - Diagnostic history (last 10)
- `diagnostics.loading` - Loading state

### UI Manager Module (`features/ui-manager.js`)

Manages global UI state and navigation.

**Features:**
- Tab switching
- Navigation handling
- Icon initialization
- Mobile menu
- Profile dropdown

**Events Handled:**
- `ui:tab:change` - Tab switching
- `ui:modal:open` - Modal opening
- `ui:modal:close` - Modal closing

## Migration Guide

### Converting Legacy Modules

1. **Create module structure:**
```javascript
const MyModule = {
    async init() {
        this.setupEventListeners();
        this.setupUI();
    },
    
    setupEventListeners() {
        // Replace direct DOM listeners with events
        window.AutoCareEvents.on(window.Events.MY_EVENT, this.handleEvent.bind(this));
    },
    
    setupUI() {
        // Use AutoCareUI components
        const btn = window.AutoCareUI.button('Click me', {
            onClick: () => this.handleClick()
        });
    }
};
```

2. **Replace direct state access:**
```javascript
// Before
let currentUser = null;

// After
window.AutoCareState.set('auth.user', userData);
const currentUser = window.AutoCareState.get('auth.user');
```

3. **Use events instead of direct calls:**
```javascript
// Before
diagnosticModule.handleSubmit(data);

// After
window.AutoCareEvents.emit(window.Events.DIAGNOSTIC_SUBMIT, data);
```

4. **Register module:**
```javascript
window.AutoCareApp.register('myModule', MyModule);
```

## Best Practices

### State Management
- ✅ Use state for data that needs to be shared across modules
- ✅ Subscribe to state changes for reactive updates
- ✅ Keep state immutable (don't mutate directly)
- ❌ Don't store UI-only state in global state

### Events
- ✅ Use events for cross-module communication
- ✅ Use standard event names from `window.Events`
- ✅ Handle errors in event listeners
- ❌ Don't create circular event dependencies

### UI Components
- ✅ Use `AutoCareUI` for consistent styling
- ✅ Initialize Lucide icons after DOM changes
- ✅ Clean up event listeners when removing elements
- ❌ Don't mix inline styles with component system

### Module Design
- ✅ Keep modules focused and single-purpose
- ✅ Make modules independently testable
- ✅ Use async/await for initialization
- ❌ Don't create tight coupling between modules

## Performance Considerations

- State updates are synchronous but batched
- Event listeners are called in priority order
- Icon initialization uses MutationObserver (throttled)
- Modules initialize in dependency order

## Future Improvements

1. **TypeScript Migration** - Add type safety
2. **Testing Framework** - Unit and integration tests
3. **Build System** - Webpack/Vite for bundling
4. **Component Library** - Expand UI components
5. **API Layer** - Centralized API service
6. **Router** - Client-side routing
7. **Offline Support** - Service workers and caching
