# 🚗 Auto Care Hub System Overview

## ✅ System Structure

### Frontend (Public Website)
- **AI Diagnostics** - Users can diagnose vehicle issues in 16 languages
- **Browse Car Parts** - View parts with seller contact info (phone, WhatsApp)
- **Find Mechanics** - View mechanics with direct contact information
- **Homepage Carousel** - Advertisement slides for business promotion
- **Contact Us** - Users can contact system admin
- **WhatsApp Contact** - Direct WhatsApp link: +264 81 209 5793

### Backend (Admin & Seller/Mechanic Management)
- **Seller Dashboard** - Sellers manage their car parts listings
- **Mechanic Dashboard** - Mechanics manage their service profiles
- **Admin Panel** - Admin approves listings, manages system, and advertisements
- **Advertisement Management** - Admin handles homepage carousel ads
- **Package Management** - Admin handles subscriptions for sellers, mechanics, and advertisers

---

## 🔐 How It Works

### For Car Parts Sellers:

1. **Contact Admin via WhatsApp** (+264 81 209 5793)
   - Request to register as seller
   - Discuss package options

2. **Admin Creates Account**
   - Admin creates seller account in backend
   - Sets up package (Basic/Professional/Premium)
   - Package has expiry date (30/90/180 days)

3. **Seller Receives Credentials**
   - Email with login link
   - Username and password

4. **Seller Logs In**
   - Click "Seller Login" on website
   - Redirects to `/backend/seller-login`
   - Access seller dashboard

5. **Seller Adds Listings**
   - Upload car parts with:
     - Photos (up to 5/10/20 depending on package)
     - Price
     - Description
     - Contact details
   - Status: **Pending Approval**

6. **Admin Approves**
   - Admin reviews listing
   - Approves or rejects
   - Status changes to: **Active**

7. **Listing Goes Live**
   - Appears on public website under "Browse Car Parts"
   - Users can see contact details and reach out

8. **Package Expiry**
   - After 30/90/180 days, package expires
   - Listings become **Inactive**
   - Seller must renew package via admin

---

### For Mechanics:

1. **Contact Admin via WhatsApp** (+264 81 209 5793)
   - Request to register as mechanic
   - Discuss package options

2. **Admin Creates Account**
   - Admin creates mechanic account
   - Sets up package
   - Package has expiry date

3. **Mechanic Receives Credentials**
   - Login credentials via email

4. **Mechanic Logs In**
   - Click "Seller Login" → Choose "Mechanic Login"
   - Redirects to `/backend/mechanic-login`
   - Access mechanic dashboard

5. **Mechanic Creates Profile**
   - Add profile photo
   - Specialization (Engine, Transmission, etc.)
   - Services offered
   - Location
   - Contact details (phone, WhatsApp)
   - Status: **Pending Approval**

6. **Admin Approves**
   - Admin reviews profile
   - Approves or rejects
   - Status: **Active**

7. **Profile Goes Live**
   - Appears on public website under "Find Mechanics"
   - Users can contact mechanic directly

8. **Package Expiry**
   - After expiry, profile becomes **Inactive**
   - Must renew via admin

---

### For Advertisers:

1. **Contact Admin via WhatsApp** (+264 81 209 5793)
   - Request homepage carousel advertisement
   - Discuss package options

2. **Choose Advertisement Package**
   - Single Slide: $200/month
   - Triple Slides: $500/month
   - Premium (6 slides): $1000/month

3. **Submit Content**
   - Company logo
   - Banner images
   - Title and subtitle text
   - Landing page URL or contact info

4. **Make Payment**
   - Admin sends payment instructions
   - Advertiser makes payment

5. **Admin Approves**
   - Reviews ad content
   - Approves or requests changes
   - Sets campaign dates

6. **Ad Goes Live**
   - Appears on homepage carousel
   - Rotates with other slides
   - Clickable with analytics tracking

7. **Campaign Monitoring**
   - Track views and clicks
   - Get monthly reports
   - Renew or modify campaign

---

## 💰 Package System

### For Sellers & Mechanics:

### Basic Package - $29/month
- Up to 10 listings
- 5 photos per listing
- Contact details displayed
- 30 days active
- Admin approval required

### Professional Package - $79/month
- Up to 50 listings
- 10 photos per listing
- Priority placement
- 90 days active
- Fast approval
- WhatsApp support

### Premium Package - $149/month
- Unlimited listings
- 20 photos per listing
- Featured placement
- 180 days active
- Instant approval
- Dedicated support
- Analytics dashboard

### For Advertisers:

### Single Slide Package - $200/month
- 1 carousel slide
- Custom design
- Click-through tracking
- 30 days active
- Avg 10,000+ views/month

### Triple Slide Package - $500/month
- 3 rotating carousel slides
- Custom designs
- Priority placement
- Click-through tracking
- 30 days active
- Avg 30,000+ views/month

### Premium Ad Package - $1000/month
- 6 rotating carousel slides
- Custom designs
- Featured placement (first in rotation)
- Detailed analytics dashboard
- 30 days active
- Avg 60,000+ views/month
- Monthly performance reports

---

## 👨‍💼 Admin Responsibilities

### 1. Account Creation
- Create seller/mechanic accounts manually
- Assign packages
- Set expiry dates

### 2. Payment Tracking
- Confirm payments from sellers/mechanics
- Activate accounts after payment
- Track renewals

### 3. Listing/Profile Approval
- Review all new listings/profiles
- Approve quality content
- Reject spam or inappropriate content
- Contact seller/mechanic if issues

### 4. Package Management
- Monitor expiries
- Send renewal reminders
- Deactivate expired accounts
- Process renewals

### 5. Advertisement Management
- Review advertisement submissions
- Approve/reject ad content
- Set campaign start/end dates
- Monitor ad performance (views, clicks)
- Process ad payments
- Send performance reports to advertisers

### 6. User Support
- Respond to Contact Us messages
- Handle WhatsApp inquiries
- Resolve disputes

---

## 📱 Contact Flow

### For Regular Users (Vehicle Owners):
1. Visit website
2. Use AI Diagnostics
3. Browse parts or find mechanics
4. Contact sellers/mechanics directly
5. If issues → Use "Contact Us" form

### For Sellers/Mechanics:
1. Contact admin via WhatsApp: +264 81 209 5793
2. Discuss registration and packages
3. Make payment
4. Receive login credentials
5. Login and manage listings

---

## 🔧 Backend Structure Needed

### Sellers Table
```
- id
- business_name
- contact_person
- email
- phone
- whatsapp
- location
- package_type (basic/professional/premium)
- package_start_date
- package_expiry_date
- status (pending/active/expired)
- payment_status (pending/paid)
- approved_by (admin_id)
- created_at
- updated_at
```

### Parts Listings Table
```
- id
- seller_id
- title
- description
- price
- images (JSON array)
- contact_phone
- contact_whatsapp
- status (pending/active/rejected)
- approved_by (admin_id)
- created_at
- updated_at
```

### Mechanics Table
```
- id
- name
- specialization
- email
- phone
- whatsapp
- location
- experience_years
- services_offered (TEXT)
- profile_photo
- certifications
- package_type
- package_start_date
- package_expiry_date
- status (pending/active/expired)
- payment_status
- rating (average from reviews)
- approved_by
- created_at
- updated_at
```

---

## 🌐 Backend Pages Needed

### 1. `/backend/seller-login`
- Login form for sellers
- Email/username and password
- Redirect to seller dashboard

### 2. `/backend/seller-dashboard`
- View all listings
- Add new listing
- Edit listings
- View package status and expiry
- View analytics (if premium)

### 3. `/backend/mechanic-login`
- Login form for mechanics
- Redirect to mechanic dashboard

### 4. `/backend/mechanic-dashboard`
- View/edit profile
- View package status
- View reviews
- View analytics (if premium)

### 5. `/backend/admin`
- Manage sellers
- Manage mechanics
- Approve listings/profiles
- Manage packages
- View payments
- View all contact form submissions

---

## 🎯 Key Features

✅ **Package-Based System** - Sellers/mechanics purchase packages
✅ **Admin Approval** - All content reviewed before going live
✅ **Expiry Management** - Automatic deactivation after expiry
✅ **Independent Operations** - Parts and mechanics work separately
✅ **WhatsApp Integration** - Direct contact for registration
✅ **Contact Admin** - Users can reach system owners
✅ **Backend Login** - Separate portals for sellers and mechanics

---

## 📞 Contact Information

**System Admin:**
- WhatsApp: +264 81 209 5793
- Email: admin@autocare.com

**For Registration:**
- Contact admin via WhatsApp
- Discuss packages and pricing
- Make payment
- Receive credentials

---

## 🚀 User Journey Summary

### Vehicle Owner:
1. Visit website
2. Use AI diagnostics
3. Browse parts/mechanics
4. Contact directly
5. Get vehicle fixed ✅

### Seller:
1. WhatsApp admin → Register
2. Pay for package
3. Get login credentials
4. Add listings
5. Wait for approval
6. Listings go live ✅

### Mechanic:
1. WhatsApp admin → Register
2. Pay for package
3. Get login credentials
4. Create profile
5. Wait for approval
6. Profile goes live ✅

---

**Last Updated:** October 25, 2025
