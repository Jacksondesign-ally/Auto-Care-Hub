# AutoCare Frontend-Backend Integration Guide

## 🔗 Connecting Your JavaScript Frontend to Laravel Backend

### Step 1: Create API Service in Frontend

Create a new file: `frontend/services/api.js`

```javascript
const API_BASE = 'http://localhost:8000/api'; // Development
// const API_BASE = 'https://api.autocare.com/api'; // Production

const AutoCareAPI = {
    // Authentication
    async register(data) {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async login(email, password) {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('auth_token', data.token);
        }
        return data;
    },

    async logout() {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${API_BASE}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        localStorage.removeItem('auth_token');
        return response.json();
    },

    // Diagnostics
    async diagnose(data) {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${API_BASE}/diagnose`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async getDiagnosticHistory() {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${API_BASE}/diagnostics/history`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.json();
    },

    async submitFeedback(diagnosticId, feedback) {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${API_BASE}/diagnostics/${diagnosticId}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(feedback)
        });
        return response.json();
    },

    // Parts
    async searchParts(query) {
        const response = await fetch(`${API_BASE}/parts/search?q=${encodeURIComponent(query)}`);
        return response.json();
    },

    async getParts(filters = {}) {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/parts?${params}`);
        return response.json();
    },

    // Mechanics
    async searchMechanics(query) {
        const response = await fetch(`${API_BASE}/mechanics/search?q=${encodeURIComponent(query)}`);
        return response.json();
    },

    async getMechanics(filters = {}) {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/mechanics?${params}`);
        return response.json();
    },

    async bookMechanic(mechanicId, bookingData) {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`${API_BASE}/mechanics/${mechanicId}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        });
        return response.json();
    },

    // Vehicles
    async searchVehicles(query) {
        const response = await fetch(`${API_BASE}/vehicles/search?q=${encodeURIComponent(query)}`);
        return response.json();
    },

    async getVehicles(filters = {}) {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/vehicles?${params}`);
        return response.json();
    }
};

// Export
window.AutoCareAPI = AutoCareAPI;
```

### Step 2: Update Diagnostic Module

Update `features/diagnostics.js`:

```javascript
async handleDiagnostic(data) {
    try {
        window.AutoCareState.set('diagnostics.loading', true);

        // Call backend API
        const result = await window.AutoCareAPI.diagnose({
            description: data.description,
            language: data.language || 'en',
            region: data.region || 'Nigeria',
            vehicleAge: data.vehicleAge || 5,
            mileage: data.mileage || 50000,
            season: this.getCurrentSeason(),
            media: data.media || []
        });

        if (result.success) {
            const diagnosis = result.data;
            
            // Update state
            window.AutoCareState.set('diagnostics.current', diagnosis);
            
            // Add to history
            const history = window.AutoCareState.get('diagnostics.history') || [];
            history.unshift(diagnosis);
            window.AutoCareState.set('diagnostics.history', history.slice(0, 10));
            
            // Render results
            this.renderResults(diagnosis);
            
            // Emit success event
            window.AutoCareEvents.emit(window.Events.DIAGNOSTIC_RESULT, diagnosis);
        } else {
            throw new Error(result.message || 'Diagnosis failed');
        }
    } catch (error) {
        console.error('[Diagnostics] Error:', error);
        window.AutoCareUI.notify('Diagnosis failed. Please try again.', 'error');
        window.AutoCareEvents.emit(window.Events.DIAGNOSTIC_ERROR, error);
    } finally {
        window.AutoCareState.set('diagnostics.loading', false);
    }
}
```

### Step 3: Update Search Module

Update `features/search.js`:

```javascript
async performSearch(query) {
    try {
        // Call backend APIs
        const [partsResult, mechanicsResult, vehiclesResult] = await Promise.all([
            window.AutoCareAPI.searchParts(query),
            window.AutoCareAPI.searchMechanics(query),
            window.AutoCareAPI.searchVehicles(query)
        ]);

        const results = {
            parts: partsResult.data || [],
            mechanics: mechanicsResult.data || [],
            vehicles: vehiclesResult.data || []
        };

        this.displayResults(results, query);
    } catch (error) {
        console.error('[Search] Error:', error);
        window.AutoCareUI.notify('Search failed', 'error');
    }
}
```

### Step 4: Update index.html

Add the API service script:

```html
<!-- Add before other feature scripts -->
<script src="services/api.js"></script>
```

### Step 5: Configure CORS in Laravel

Update `config/cors.php`:

```php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:8080',
        'http://127.0.0.1:5500', // VS Code Live Server
        'https://your-frontend-domain.com'
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## 🚀 Deployment Options

### Option 1: Same Server (Easiest)

```
your-domain.com/          → Frontend (index.html)
your-domain.com/api/      → Laravel Backend
```

**Setup:**
1. Upload Laravel to server root
2. Move frontend files to `public` folder
3. Configure `.htaccess` to route `/api` to Laravel

### Option 2: Separate Domains (Recommended)

```
app.autocare.com          → Frontend
api.autocare.com          → Laravel Backend
```

**Setup:**
1. Deploy frontend to Netlify/Vercel (free)
2. Deploy backend to shared hosting/VPS
3. Update `API_BASE` in frontend
4. Configure CORS

### Option 3: Subdirectory

```
autocare.com/             → Frontend
autocare.com/backend/     → Laravel Backend
```

---

## 🔐 Authentication Flow

### 1. User Registration

```javascript
// Frontend
const result = await AutoCareAPI.register({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    password_confirmation: 'password123'
});

if (result.success) {
    // Auto-login or redirect to login
}
```

### 2. User Login

```javascript
// Frontend
const result = await AutoCareAPI.login('john@example.com', 'password123');

if (result.success) {
    // Token is automatically stored
    // Redirect to dashboard
    window.location.href = '/dashboard';
}
```

### 3. Protected Requests

```javascript
// Token is automatically included in all requests
const diagnosis = await AutoCareAPI.diagnose(data);
```

---

## 📊 Data Flow

```
User Input (Frontend)
    ↓
JavaScript API Service
    ↓
HTTP Request (JSON)
    ↓
Laravel API Route
    ↓
Controller
    ↓
Service (DiagnosticEngine)
    ↓
Database (Save)
    ↓
JSON Response
    ↓
Frontend State Update
    ↓
UI Render
```

---

## 🧪 Testing

### Test Backend API

```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Test diagnosis (with auth)
curl -X POST http://localhost:8000/api/diagnose \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"description":"engine knocking","region":"Nigeria"}'
```

### Test Frontend Integration

```javascript
// In browser console
AutoCareAPI.diagnose({
    description: 'my engine is knocking',
    region: 'Nigeria',
    vehicleAge: 5,
    mileage: 50000
}).then(console.log);
```

---

## ✅ Checklist

- [ ] Laravel project created
- [ ] Database configured
- [ ] Migrations run
- [ ] CORS configured
- [ ] API service created in frontend
- [ ] Diagnostic module updated
- [ ] Search module updated
- [ ] Authentication working
- [ ] API endpoints tested
- [ ] Frontend-backend communication working

---

## 🆘 Common Issues

### Issue: CORS Error
**Solution:** Check `config/cors.php` and add your frontend URL

### Issue: 401 Unauthorized
**Solution:** Check if token is being sent in Authorization header

### Issue: 500 Server Error
**Solution:** Check `storage/logs/laravel.log` for details

### Issue: Database Connection Failed
**Solution:** Verify `.env` database credentials

---

**Your Laravel backend is ready to power your AutoCare frontend!** 🎉
