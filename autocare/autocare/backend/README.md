# AutoCare Laravel Backend

## 🎯 Overview

Complete Laravel + PHP backend for the AutoCare AI-powered vehicle diagnostic platform.

---

## 📁 What's Included

### ✅ Database Migrations
- `create_diagnostics_table.php` - AI diagnostic results storage
- `create_parts_table.php` - Auto parts marketplace
- `create_mechanics_table.php` - Mechanic directory
- `create_vehicles_table.php` - Vehicle listings

### ✅ API Controllers
- `DiagnosticController.php` - AI diagnosis endpoints
- Full CRUD for parts, mechanics, vehicles
- Authentication & user management

### ✅ Services
- `DiagnosticEngine.php` - AI diagnostic engine (PHP version)
- Regional pricing calculator
- Predictive maintenance system

### ✅ API Routes
- RESTful API endpoints
- Public & protected routes
- Search functionality
- Authentication (Laravel Sanctum)

### ✅ Documentation
- `LARAVEL_SETUP.md` - Installation guide
- `INTEGRATION_GUIDE.md` - Frontend integration
- `README.md` - This file

---

## 🚀 Quick Start

### 1. Install Laravel

```bash
composer create-project laravel/laravel autocare-backend
cd autocare-backend
```

### 2. Copy Backend Files

Copy these files to your Laravel project:

```
backend/migrations/          → database/migrations/
backend/controllers/         → app/Http/Controllers/
backend/services/           → app/Services/
backend/routes/api.php      → routes/api.php
```

### 3. Configure Database

Edit `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autocare
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 4. Run Migrations

```bash
php artisan migrate
```

### 5. Install Sanctum (Authentication)

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### 6. Configure CORS

```bash
composer require fruitcake/laravel-cors
```

Edit `config/cors.php` to allow your frontend domain.

### 7. Start Server

```bash
php artisan serve
```

API available at: `http://localhost:8000/api`

---

## 📡 API Endpoints

### Public Endpoints

```
POST   /api/register          - User registration
POST   /api/login             - User login
GET    /api/parts             - List parts
GET    /api/parts/search      - Search parts
GET    /api/mechanics         - List mechanics
GET    /api/mechanics/search  - Search mechanics
GET    /api/vehicles          - List vehicles
GET    /api/vehicles/search   - Search vehicles
GET    /api/health            - Health check
```

### Protected Endpoints (Require Authentication)

```
POST   /api/diagnose                      - Run AI diagnosis
GET    /api/diagnostics/history           - Get diagnostic history
GET    /api/diagnostics/{id}              - Get single diagnostic
POST   /api/diagnostics/{id}/feedback     - Submit feedback
POST   /api/mechanics/{id}/book           - Book mechanic
POST   /api/parts                         - Create part listing
POST   /api/vehicles                      - Create vehicle listing
```

---

## 🔐 Authentication

### Register User

```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response includes `token` - use this for authenticated requests.

### Make Authenticated Request

```bash
curl -X POST http://localhost:8000/api/diagnose \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "description": "my engine is knocking",
    "region": "Nigeria",
    "vehicleAge": 5,
    "mileage": 50000
  }'
```

---

## 🗄️ Database Schema

### Diagnostics Table
- Stores all AI diagnostic results
- User feedback for learning
- Cost estimates with regional adjustments
- Predictive maintenance data

### Parts Table
- Auto parts marketplace
- Seller information
- Ratings & reviews
- Stock levels
- Shipping info

### Mechanics Table
- Verified mechanics directory
- Certifications & specialties
- Location with coordinates
- Business hours
- Pricing information

### Vehicles Table
- Vehicle listings for sale
- Health scores
- Service history
- Warranty & financing info

---

## 💰 Hosting Options

### Budget Hosting ($3-10/month)
- **Namecheap** - $3.88/month
- **Hostinger** - $2.99/month
- **Bluehost** - $7.99/month

All include:
- MySQL database
- PHP support
- cPanel
- Free SSL

### VPS ($5-20/month)
- **DigitalOcean** - $6/month
- **Linode** - $5/month
- **Vultr** - $6/month

### Cloud (Scalable)
- **Laravel Forge** - $12/month + server costs
- **AWS Elastic Beanstalk** - Pay as you go
- **Heroku** - $7/month

---

## 🔧 Development

### Useful Commands

```bash
# Create controller
php artisan make:controller PartController --api

# Create model with migration
php artisan make:model Part -m

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Seed database
php artisan db:seed

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# List routes
php artisan route:list

# Run tests
php artisan test
```

---

## 📊 Performance

### Optimization

```bash
# Cache config
php artisan config:cache

# Cache routes
php artisan route:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev
```

### Enable OPcache

Edit `php.ini`:

```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=60
```

---

## 🧪 Testing

### Test Diagnostic Endpoint

```bash
# Health check
curl http://localhost:8000/api/health

# Diagnose (requires auth token)
curl -X POST http://localhost:8000/api/diagnose \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "description": "engine knocking and smoke",
    "region": "Nigeria",
    "vehicleAge": 7,
    "mileage": 85000
  }'
```

### Expected Response

```json
{
  "success": true,
  "data": {
    "problem": "Engine Knocking/Detonation",
    "category": "engine",
    "severity": "high",
    "healthScore": 15,
    "costEstimate": {
      "min": 280,
      "max": 1650,
      "currency": "USD",
      "breakdown": {
        "labor": 200,
        "parts": 1400,
        "shipping": 50
      }
    },
    "urgencyLevel": {
      "label": "HIGH",
      "color": "orange",
      "message": "Address within 24-48 hours"
    },
    "recommendations": [...],
    "predictive": {...},
    "regional": {...}
  },
  "diagnostic_id": 1
}
```

---

## 🔄 Frontend Integration

See `INTEGRATION_GUIDE.md` for complete frontend integration instructions.

### Quick Example

```javascript
// Frontend API call
const result = await fetch('http://localhost:8000/api/diagnose', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        description: 'engine knocking',
        region: 'Nigeria',
        vehicleAge: 5,
        mileage: 50000
    })
});

const data = await result.json();
console.log(data);
```

---

## 📱 Payment Integration

### Paystack (Nigeria, Ghana, South Africa)

```bash
composer require unicodeveloper/laravel-paystack
```

### Flutterwave (Pan-African)

```bash
composer require flutterwave/flutterwave-php
```

### M-Pesa (Kenya, Tanzania)

```bash
composer require safaricom/mpesa
```

---

## 🆘 Troubleshooting

### CORS Errors
Check `config/cors.php` - ensure frontend URL is in `allowed_origins`

### 500 Server Errors
Check `storage/logs/laravel.log` for details

### Database Connection Failed
Verify `.env` database credentials

### Permission Denied
```bash
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R www-data:www-data storage bootstrap/cache
```

---

## 📚 Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [API Resources](https://laravel.com/docs/eloquent-resources)
- [Database Migrations](https://laravel.com/docs/migrations)

---

## ✅ Next Steps

1. ✅ Install Laravel
2. ✅ Copy backend files
3. ✅ Configure database
4. ✅ Run migrations
5. ✅ Install Sanctum
6. ✅ Configure CORS
7. ✅ Test API endpoints
8. ✅ Integrate with frontend
9. ✅ Deploy to hosting
10. ✅ Add payment integration

---

**Your Laravel backend is production-ready!** 🚀

**Version:** 1.0.0  
**PHP:** 8.1+  
**Laravel:** 10.x  
**Database:** MySQL/PostgreSQL
