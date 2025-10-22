# AutoCare Laravel Backend Setup Guide

## 🚀 Quick Start

### Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL/PostgreSQL
- Node.js & npm (for assets)

### Installation

```bash
# 1. Create new Laravel project
composer create-project laravel/laravel autocare-backend

# 2. Navigate to project
cd autocare-backend

# 3. Configure environment
cp .env.example .env
php artisan key:generate

# 4. Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=autocare
DB_USERNAME=root
DB_PASSWORD=your_password

# 5. Install dependencies
composer install
npm install

# 6. Run migrations
php artisan migrate

# 7. Start development server
php artisan serve
```

Your API will be available at: `http://localhost:8000/api`

---

## 📁 Project Structure

```
autocare-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── DiagnosticController.php
│   │   │   ├── PartController.php
│   │   │   ├── MechanicController.php
│   │   │   ├── VehicleController.php
│   │   │   └── AuthController.php
│   │   └── Middleware/
│   │       └── Cors.php
│   ├── Models/
│   │   ├── Diagnostic.php
│   │   ├── Part.php
│   │   ├── Mechanic.php
│   │   ├── Vehicle.php
│   │   └── User.php
│   └── Services/
│       ├── DiagnosticEngine.php
│       ├── CostEstimator.php
│       └── RegionalPricing.php
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   └── api.php
└── config/
    └── cors.php
```

---

## 🗄️ Database Schema

### Run these commands:

```bash
# Create migrations
php artisan make:migration create_diagnostics_table
php artisan make:migration create_parts_table
php artisan make:migration create_mechanics_table
php artisan make:migration create_vehicles_table
php artisan make:migration create_diagnostic_history_table
```

---

## 🔧 Configuration Files

### 1. CORS Configuration

```bash
# Install CORS package
composer require fruitcake/laravel-cors

# Publish config
php artisan vendor:publish --tag="cors"
```

### 2. API Rate Limiting

```bash
# Already included in Laravel
# Configure in app/Http/Kernel.php
```

---

## 🚀 Quick Deploy

### Option 1: Shared Hosting (Easy)
- Upload to cPanel
- Point domain to `public` folder
- Import database
- Update `.env`

### Option 2: VPS (Recommended)
```bash
# Install on Ubuntu/Debian
sudo apt update
sudo apt install php8.1 php8.1-mysql composer nginx
```

### Option 3: Cloud (Scalable)
- Laravel Forge (easiest)
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Heroku

---

## 💰 Hosting Costs

### Budget Options:
- **Shared Hosting**: $3-10/month (Namecheap, Hostinger)
- **VPS**: $5-20/month (DigitalOcean, Linode)
- **Cloud**: $10-50/month (AWS, Google Cloud)

### Recommended for Starting:
**Namecheap Shared Hosting** - $3.88/month
- Includes MySQL database
- Free SSL certificate
- cPanel included
- Easy Laravel deployment

---

## 🔐 Security Setup

```bash
# Generate app key
php artisan key:generate

# Set up authentication
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate

# Install passport for OAuth (optional)
composer require laravel/passport
php artisan passport:install
```

---

## 📊 Performance Optimization

```bash
# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Optimize autoloader
composer install --optimize-autoloader --no-dev

# Enable OPcache in php.ini
opcache.enable=1
opcache.memory_consumption=128
```

---

## 🧪 Testing

```bash
# Run tests
php artisan test

# Create test
php artisan make:test DiagnosticTest
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

## 🔄 Frontend Integration

Update your frontend API service:

```javascript
// frontend/services/api.js
const API_BASE = 'http://localhost:8000/api'; // Development
// const API_BASE = 'https://api.autocare.com/api'; // Production

const DiagnosticAPI = {
    async diagnose(data) {
        const response = await fetch(`${API_BASE}/diagnose`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};
```

---

## ✅ Next Steps

1. Copy migration files from `backend/migrations/` folder
2. Copy controller files from `backend/controllers/` folder
3. Copy model files from `backend/models/` folder
4. Copy route file from `backend/routes/api.php`
5. Run `php artisan migrate`
6. Run `php artisan db:seed`
7. Test API endpoints

---

## 📚 Useful Commands

```bash
# Create controller
php artisan make:controller DiagnosticController --api

# Create model with migration
php artisan make:model Diagnostic -m

# Create seeder
php artisan make:seeder PartsSeeder

# Run seeder
php artisan db:seed --class=PartsSeeder

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Check routes
php artisan route:list

# Run queue worker
php artisan queue:work
```

---

## 🆘 Troubleshooting

### Issue: CORS errors
**Solution:** Check `config/cors.php` and ensure frontend URL is allowed

### Issue: 500 errors
**Solution:** Check `storage/logs/laravel.log`

### Issue: Database connection failed
**Solution:** Verify `.env` database credentials

### Issue: Permission denied
**Solution:** 
```bash
sudo chmod -R 775 storage bootstrap/cache
sudo chown -R www-data:www-data storage bootstrap/cache
```

---

**Ready to build your Laravel backend!** 🚀
