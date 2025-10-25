# 🔗 AutoCare Backend Integration Guide

## ✅ Summary of All Changes Made

### Frontend Changes
1. ✅ Added **config.js** for backend API connection
2. ✅ Added dropdown menus for **Car Parts** and **Mechanics**
3. ✅ Replaced "Free Trial" with **"Contact Us"** button
4. ✅ **Hidden** AI Diagnostic Results (shows only after diagnosis)
5. ✅ Added **Parts Section** with backend integration
6. ✅ Added **Mechanics Section** with backend integration
7. ✅ Added **Contact Us Section** with form
8. ✅ Updated **Carousel** to load images from backend

### Backend Changes
1. ✅ Created **CarouselController.php** for managing homepage slides
2. ✅ Added API routes for carousel images
3. ✅ Connected frontend to existing backend API

---

## 📋 Backend Setup Instructions

### Step 1: Start Your Laravel Backend

```bash
# Navigate to backend directory
cd backend

# Start Laravel development server
php artisan serve
```

Your API should now be running at: `http://localhost:8000`

### Step 2: Update Frontend Configuration

Edit `config.js` line 7 to match your backend URL:

```javascript
API_BASE_URL: 'http://localhost:8000/api', // Change if using different port
```

### Step 3: Add CarouselController to Laravel

The file is already created at:
```
backend/controllers/CarouselController.php
```

Make sure it's in the correct Laravel directory:
```
backend/app/Http/Controllers/CarouselController.php
```

If not, move it:
```bash
move backend\controllers\CarouselController.php backend\app\Http\Controllers\
```

### Step 4: Create Carousel Images Folder

```bash
# Create storage folder for carousel images
php artisan storage:link
mkdir storage/app/public/carousel
```

### Step 5: Upload Carousel Images

You can upload carousel images via:

1. **Manually** - Place images in: `storage/app/public/carousel/`
   - slide1.jpg
   - slide2.jpg
   - slide3.jpg
   - slide4.jpg
   - slide5.jpg

2. **Via API** - Use the POST endpoint:
   ```bash
   POST http://localhost:8000/api/carousel
   ```
   
   Form data:
   ```
   image: (file)
   title: "Your Car Ad Title"
   description: "Ad description"
   button_text: "Learn More"
   order: 1
   ```

---

## 🌐 API Endpoints Overview

### Public Endpoints (No Auth Required)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/health` | Check backend status |
| GET | `/api/carousel-images` | Get homepage slides |
| GET | `/api/parts` | Get all parts |
| GET | `/api/parts/{id}` | Get specific part |
| GET | `/api/mechanics` | Get all mechanics |
| GET | `/api/mechanics/{id}` | Get specific mechanic |

### Protected Endpoints (Auth Required)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/carousel` | Upload new carousel slide |
| PUT | `/api/carousel/{id}` | Update carousel slide |
| DELETE | `/api/carousel/{id}` | Delete carousel slide |
| POST | `/api/diagnose` | Submit diagnostic request |

---

## 🧪 Testing Backend Connection

### Test 1: Health Check

Open browser console (F12) and check for:
```
✅ Backend connected: {status: "ok", ...}
```

Or manually test:
```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-25T12:00:00.000000Z",
  "version": "1.0.0"
}
```

### Test 2: Carousel Images

```bash
curl http://localhost:8000/api/carousel-images
```

Expected response:
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "AI-Powered Vehicle Diagnostics",
      "image_url": "http://localhost:8000/storage/carousel/slide1.jpg",
      ...
    }
  ]
}
```

### Test 3: Parts & Mechanics

```bash
# Test parts
curl http://localhost:8000/api/parts

# Test mechanics
curl http://localhost:8000/api/mechanics
```

---

## 🔧 Troubleshooting

### Problem 1: "Backend connection failed"

**Solution:**
1. Check if Laravel server is running: `php artisan serve`
2. Verify URL in `config.js` matches your server
3. Check browser console for CORS errors
4. Add CORS headers in Laravel (`config/cors.php`)

### Problem 2: "Failed to load parts/mechanics"

**Solution:**
1. Check if controllers are returning data
2. Verify database has data
3. Check API endpoint URLs match

### Problem 3: Carousel shows default slides

**Solution:**
This is normal if:
- Backend is not running
- No carousel images uploaded
- Carousel endpoint returns error

The system falls back to default slides automatically.

### Problem 4: CORS Error

Add to `backend/config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

## 📱 Frontend Features

### Navigation Menu

- ✅ **AI Diagnostics** - Main diagnostic tool
- ✅ **Features** - How AI works
- ✅ **Car Parts** dropdown:
  - Browse Parts
  - Search Parts
  - Sell Parts
- ✅ **Mechanics** dropdown:
  - Find Mechanics
  - Mechanics Near Me
  - Register as Mechanic
- ✅ **Support** - Help section
- ✅ **Contact Us** - Contact form (replaces Free Trial)

### Sections

1. **Carousel** - Auto-sliding homepage banner (loads from backend)
2. **AI Diagnostics** - Working diagnostic form
3. **Results** - Hidden until diagnosis complete
4. **Features** - How AI works (3 cards)
5. **Parts** - Browse parts from backend
6. **Mechanics** - Find mechanics from backend
7. **Contact Us** - Contact form

---

## 🎨 Carousel Image Specifications

For best results, carousel images should be:

- **Resolution**: 1920x1080px (Full HD)
- **Format**: JPG or PNG
- **Size**: Under 500KB (compressed)
- **Aspect Ratio**: 16:9

### Recommended Content:
1. Car advertisements
2. Special promotions
3. New features
4. Partner mechanics/shops
5. Seasonal offers

---

## 📊 Database Schema (Optional)

If you want to store carousel in database, create migration:

```php
Schema::create('carousel_slides', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('description')->nullable();
    $table->string('image_url');
    $table->string('button_text')->nullable();
    $table->string('button_link')->nullable();
    $table->integer('order')->default(0);
    $table->boolean('active')->default(true);
    $table->timestamps();
});
```

---

## 🚀 Going Live

### Before Deployment:

1. **Update API URL** in `config.js`:
   ```javascript
   API_BASE_URL: 'https://your-domain.com/api',
   ```

2. **Set Laravel environment**:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan optimize
   ```

3. **Configure CORS** for production domain

4. **Enable HTTPS** for secure API communication

5. **Add rate limiting** to API routes

6. **Set up authentication** for carousel management

---

## 📝 Next Steps

1. ✅ Start Laravel backend
2. ✅ Upload carousel images
3. ✅ Add parts to database
4. ✅ Add mechanics to database
5. ✅ Test all endpoints
6. ✅ Refresh frontend

---

## 💡 Tips

- **Carousel images** are cached for 5 seconds to improve performance
- **Parts and mechanics** reload when sections are viewed
- **Default slides** show if backend is unavailable
- **Diagnostic results** only appear after form submission

---

**Last Updated:** January 25, 2025
**Version:** 1.0.0

For questions or issues, check browser console for detailed error messages.
