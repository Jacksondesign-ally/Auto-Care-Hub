# 📢 Auto Care Hub - Advertisement Package

## 🎯 Overview

Auto Care Hub offers **homepage carousel advertising** for businesses that want to promote their products or services on the platform.

---

## 💰 Advertisement Package

### **Banner Ad Slide**
- **Premium placement** on homepage carousel
- **High visibility** - rotates with other slides every 5 seconds
- **Click-through** to your website or landing page
- **Custom design** with your branding

### **Pricing:**
- **$200/month** - Single slide
- **$500/month** - 3 slides (rotating)
- **$1000/month** - 6 slides + featured placement

---

## 📋 What's Included:

✅ **Custom Slide Design**
- Your logo and branding
- Custom gradient/background
- Call-to-action button
- Clickable link to your website

✅ **Premium Placement**
- Homepage carousel rotation
- 5-second display time
- Auto-play enabled
- Mobile responsive

✅ **Analytics** (Premium)
- View count
- Click-through rate
- User engagement metrics

✅ **Duration**
- 30-day campaign
- Renewable monthly
- Can update content mid-campaign

---

## 🎨 Ad Slide Specifications:

### **Image Requirements:**
- **Dimensions:** 1920x1080px (Full HD)
- **Format:** JPG, PNG, WebP
- **File Size:** Max 2MB
- **Resolution:** 72-300 DPI

### **Text Requirements:**
- **Title:** Max 60 characters
- **Subtitle:** Max 120 characters
- **CTA Button:** Max 20 characters

### **Design Elements:**
- Custom gradient background
- Logo placement (top-right or center)
- Sponsor name/branding
- Custom button action (link, phone, WhatsApp)

---

## 🔧 Backend Implementation

### **Database Table: `advertisements`**

```sql
CREATE TABLE advertisements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    advertiser_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    
    -- Package Details
    package_type ENUM('single', 'triple', 'premium') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status ENUM('pending', 'active', 'expired', 'rejected') DEFAULT 'pending',
    
    -- Slide Content
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    background_image VARCHAR(500),
    gradient_from VARCHAR(50),
    gradient_to VARCHAR(50),
    sponsor_logo VARCHAR(500),
    
    -- Call-to-Action
    cta_text VARCHAR(100) DEFAULT 'Learn More',
    cta_action ENUM('external', 'phone', 'whatsapp', 'email') DEFAULT 'external',
    cta_url VARCHAR(500),
    cta_value VARCHAR(255),
    
    -- Analytics
    views INT DEFAULT 0,
    clicks INT DEFAULT 0,
    
    -- Payment
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    payment_amount DECIMAL(10,2),
    payment_date DATETIME,
    
    -- Admin
    approved_by INT,
    approved_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (approved_by) REFERENCES admins(id)
);
```

---

## 📡 API Endpoints

### **1. Submit Advertisement Request**
```
POST /api/advertisements/submit
```

**Request Body:**
```json
{
    "advertiser_name": "John Doe",
    "company_name": "ABC Motors",
    "email": "john@abcmotors.com",
    "phone": "+264812345678",
    "whatsapp": "+264812345678",
    "package_type": "single",
    "title": "Quality Car Parts at Best Prices",
    "subtitle": "Genuine parts with warranty. Delivery available.",
    "cta_text": "Shop Now",
    "cta_action": "external",
    "cta_url": "https://abcmotors.com",
    "gradient_from": "#667eea",
    "gradient_to": "#764ba2"
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Advertisement submitted. Awaiting admin approval.",
    "data": {
        "ad_id": 123,
        "status": "pending",
        "payment_instructions": "..."
    }
}
```

---

### **2. Get Active Advertisements (Public)**
```
GET /api/advertisements/active
```

**Response:**
```json
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "title": "Quality Car Parts",
            "subtitle": "Best prices guaranteed",
            "sponsor": "ABC Motors",
            "gradient": "from-blue-600 to-purple-600",
            "cta": {
                "text": "Shop Now",
                "action": "external",
                "url": "https://abcmotors.com"
            }
        }
    ]
}
```

---

### **3. Admin: Approve Advertisement**
```
POST /api/admin/advertisements/{id}/approve
```

**Request Body:**
```json
{
    "start_date": "2025-11-01",
    "end_date": "2025-11-30"
}
```

---

### **4. Track Ad Clicks**
```
POST /api/advertisements/{id}/click
```

**Request Body:**
```json
{
    "referrer": "homepage_carousel"
}
```

---

## 🎨 Frontend Integration

### **Carousel Slide Template:**

```javascript
// In features/homepage-carousel.js or index.html

// Load ads from backend
async function loadAdvertisements() {
    const response = await fetch('/api/advertisements/active');
    const ads = await response.json();
    
    const carouselSlides = document.getElementById('carousel-slides');
    
    ads.data.forEach(ad => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.background = `linear-gradient(135deg, ${ad.gradient_from} 0%, ${ad.gradient_to} 100%)`;
        
        slide.innerHTML = `
            <div class="carousel-content">
                <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    Sponsored by ${ad.sponsor}
                </div>
                <h2 class="text-5xl font-bold mb-4">${ad.title}</h2>
                <p class="text-xl mb-6">${ad.subtitle}</p>
                <button onclick="trackAdClick(${ad.id}, '${ad.cta.url}')" 
                        class="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
                    ${ad.cta.text}
                </button>
            </div>
        `;
        
        carouselSlides.appendChild(slide);
    });
}

// Track ad clicks
async function trackAdClick(adId, url) {
    await fetch(`/api/advertisements/${adId}/click`, {
        method: 'POST',
        body: JSON.stringify({ referrer: 'homepage_carousel' })
    });
    
    window.open(url, '_blank');
}
```

---

## 👨‍💼 Admin Dashboard Features

### **Advertisement Management:**

1. **Pending Approvals**
   - View submitted advertisements
   - Review content and design
   - Approve or reject
   - Set campaign dates

2. **Active Campaigns**
   - View all active ads
   - Pause/resume campaigns
   - Edit content (if needed)
   - Extend duration

3. **Analytics Dashboard**
   - Total impressions (views)
   - Click-through rate (CTR)
   - Revenue from ad packages
   - Performance by advertiser

4. **Payment Management**
   - Track payment status
   - Send payment reminders
   - Process refunds

---

## 📞 How to Purchase Advertisement Package

### **For Advertisers:**

1. **Contact Admin via WhatsApp:** +264 81 209 5793
2. **Discuss package options:**
   - Single slide ($200/month)
   - Triple slides ($500/month)
   - Premium package ($1000/month)
3. **Submit content:**
   - Logo
   - Images
   - Text (title, subtitle)
   - Landing page URL
4. **Make payment**
5. **Admin approves and activates**
6. **Your ad goes live on homepage!**

---

## 📊 Advertisement Performance Metrics

### **Basic Package:**
- Average 10,000+ views/month
- 2-5% click-through rate
- 200-500 clicks/month

### **Triple Package:**
- Average 30,000+ views/month
- 3-7% CTR
- 900-2,100 clicks/month

### **Premium Package:**
- Average 60,000+ views/month
- 5-10% CTR
- 3,000-6,000 clicks/month
- Detailed analytics dashboard

---

## 🎯 Target Audience

- **Vehicle owners** seeking diagnostics
- **Parts buyers** browsing marketplace
- **Mechanics** looking for suppliers
- **Car enthusiasts** in African markets

**Geographic Coverage:**
- Nigeria, Kenya, Ghana, South Africa
- Tanzania, Uganda, Ethiopia, Namibia
- Rwanda, Ivory Coast, Egypt

---

## ✅ Benefits of Advertising on Auto Care Hub

✅ **Targeted Traffic** - Vehicle owners actively looking for parts/services  
✅ **High Engagement** - Users spend avg 5-10 minutes on platform  
✅ **Mobile Optimized** - 70% of traffic is mobile  
✅ **Multi-Language** - Reach 16 language groups  
✅ **Regional Focus** - African markets expertise  
✅ **Premium Placement** - Homepage carousel prime real estate  
✅ **Measurable Results** - Track views and clicks  

---

## 📧 Contact for Advertising

**Auto Care Hub Admin Team**
- **WhatsApp:** +264 81 209 5793
- **Email:** ads@autocarehub.com
- **Hours:** Mon-Fri 8AM-6PM, Sat 9AM-2PM

---

**Last Updated:** October 25, 2025  
**Version:** 1.0
