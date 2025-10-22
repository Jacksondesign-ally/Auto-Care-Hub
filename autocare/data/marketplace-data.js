/**
 * AutoCare Marketplace Data Structures
 * Comprehensive data for parts, mechanics, and vehicles
 */

const MarketplaceData = {
    // Parts Marketplace
    parts: [
        {
            id: 'P001',
            name: 'Bosch Spark Plugs Set (4pcs)',
            category: 'Engine',
            subcategory: 'Ignition',
            brand: 'Bosch',
            price: 45.99,
            currency: 'USD',
            stock: 150,
            condition: 'new',
            rating: 4.8,
            reviewCount: 234,
            seller: {
                id: 'S001',
                name: 'AutoParts Direct',
                verified: true,
                rating: 4.7,
                location: 'Lagos, Nigeria',
                responseTime: '< 2 hours'
            },
            specifications: {
                partNumber: 'FR7DC+',
                fitment: 'Universal',
                warranty: '12 months',
                material: 'Platinum'
            },
            images: [
                'https://placehold.co/400x400/2c3e50/ffffff?text=Spark+Plugs'
            ],
            description: 'High-performance platinum spark plugs for improved fuel efficiency and engine performance.',
            compatibility: ['Toyota', 'Honda', 'Nissan', 'Mazda'],
            shipping: {
                available: true,
                cost: 5.99,
                estimatedDays: '2-5'
            }
        },
        {
            id: 'P002',
            name: 'Mann Oil Filter',
            category: 'Engine',
            subcategory: 'Filters',
            brand: 'Mann',
            price: 12.50,
            currency: 'USD',
            stock: 300,
            condition: 'new',
            rating: 4.9,
            reviewCount: 567,
            seller: {
                id: 'S002',
                name: 'Premium Auto Supply',
                verified: true,
                rating: 4.9,
                location: 'Nairobi, Kenya',
                responseTime: '< 1 hour'
            },
            specifications: {
                partNumber: 'HU 925/4 x',
                fitment: 'BMW, Mercedes',
                warranty: '6 months',
                material: 'Synthetic'
            },
            images: [
                'https://placehold.co/400x400/27ae60/ffffff?text=Oil+Filter'
            ],
            description: 'Premium quality oil filter with superior filtration efficiency.',
            compatibility: ['BMW', 'Mercedes-Benz', 'Audi'],
            shipping: {
                available: true,
                cost: 3.99,
                estimatedDays: '1-3'
            }
        },
        {
            id: 'P003',
            name: 'Brembo Brake Pads Front',
            category: 'Brakes',
            subcategory: 'Brake Pads',
            brand: 'Brembo',
            price: 89.99,
            currency: 'USD',
            stock: 75,
            condition: 'new',
            rating: 4.9,
            reviewCount: 412,
            seller: {
                id: 'S001',
                name: 'AutoParts Direct',
                verified: true,
                rating: 4.7,
                location: 'Lagos, Nigeria',
                responseTime: '< 2 hours'
            },
            specifications: {
                partNumber: 'P 06 038',
                fitment: 'Front Axle',
                warranty: '24 months',
                material: 'Ceramic'
            },
            images: [
                'https://placehold.co/400x400/e74c3c/ffffff?text=Brake+Pads'
            ],
            description: 'High-performance ceramic brake pads for superior stopping power and reduced dust.',
            compatibility: ['Toyota Camry', 'Honda Accord', 'Nissan Altima'],
            shipping: {
                available: true,
                cost: 7.99,
                estimatedDays: '3-7'
            }
        }
    ],

    // Mechanics Directory
    mechanics: [
        {
            id: 'M001',
            name: 'Mike\'s Auto Repair',
            owner: 'Michael Okonkwo',
            verified: true,
            certified: ['ASE Master', 'BMW Certified'],
            rating: 4.8,
            reviewCount: 342,
            specialties: [
                'Engine Diagnostics',
                'Transmission Repair',
                'Electrical Systems',
                'Air Conditioning'
            ],
            services: [
                'General Maintenance',
                'Engine Repair',
                'Brake Service',
                'Transmission Service',
                'AC Repair',
                'Diagnostics',
                'Oil Change',
                'Tire Service'
            ],
            location: {
                city: 'Lagos',
                country: 'Nigeria',
                address: '123 Victoria Island Road',
                coordinates: { lat: 6.4281, lng: 3.4219 },
                distance: 2.5  // km from user
            },
            contact: {
                phone: '+234 123 456 7890',
                email: 'mike@mikesauto.ng',
                website: 'www.mikesauto.ng'
            },
            hours: {
                monday: '8:00 AM - 6:00 PM',
                tuesday: '8:00 AM - 6:00 PM',
                wednesday: '8:00 AM - 6:00 PM',
                thursday: '8:00 AM - 6:00 PM',
                friday: '8:00 AM - 6:00 PM',
                saturday: '9:00 AM - 4:00 PM',
                sunday: 'Closed'
            },
            pricing: {
                laborRate: 45,  // per hour
                diagnosticFee: 50,
                currency: 'USD'
            },
            features: [
                'Free Diagnostics',
                'Warranty on Parts',
                'Loaner Vehicles',
                'Pick-up & Drop-off',
                'Mobile Service'
            ],
            images: [
                'https://placehold.co/800x600/2c3e50/ffffff?text=Shop+Front',
                'https://placehold.co/800x600/34495e/ffffff?text=Workshop'
            ],
            yearsInBusiness: 15,
            employeeCount: 8,
            languages: ['English', 'Yoruba', 'Igbo']
        },
        {
            id: 'M002',
            name: 'Precision Auto Care',
            owner: 'Sarah Mwangi',
            verified: true,
            certified: ['Toyota Certified', 'Hybrid Specialist'],
            rating: 4.9,
            reviewCount: 567,
            specialties: [
                'Hybrid Systems',
                'Toyota/Lexus',
                'Preventive Maintenance',
                'Computer Diagnostics'
            ],
            services: [
                'Hybrid Service',
                'Engine Diagnostics',
                'Brake Service',
                'Suspension',
                'Alignment',
                'Tire Service',
                'Oil Change',
                'Inspection'
            ],
            location: {
                city: 'Nairobi',
                country: 'Kenya',
                address: '456 Mombasa Road',
                coordinates: { lat: -1.2921, lng: 36.8219 },
                distance: 1.2
            },
            contact: {
                phone: '+254 712 345 678',
                email: 'info@precisionauto.ke',
                website: 'www.precisionauto.ke'
            },
            hours: {
                monday: '7:30 AM - 6:30 PM',
                tuesday: '7:30 AM - 6:30 PM',
                wednesday: '7:30 AM - 6:30 PM',
                thursday: '7:30 AM - 6:30 PM',
                friday: '7:30 AM - 6:30 PM',
                saturday: '8:00 AM - 5:00 PM',
                sunday: 'Closed'
            },
            pricing: {
                laborRate: 40,
                diagnosticFee: 45,
                currency: 'USD'
            },
            features: [
                'Online Booking',
                'Digital Inspection',
                'Warranty on Work',
                'Shuttle Service',
                'Waiting Area'
            ],
            images: [
                'https://placehold.co/800x600/27ae60/ffffff?text=Modern+Shop',
                'https://placehold.co/800x600/2ecc71/ffffff?text=Service+Bay'
            ],
            yearsInBusiness: 10,
            employeeCount: 12,
            languages: ['English', 'Swahili']
        },
        {
            id: 'M003',
            name: 'Express Auto Service',
            owner: 'Ahmed Hassan',
            verified: true,
            certified: ['ASE Certified', 'Mercedes Specialist'],
            rating: 4.7,
            reviewCount: 189,
            specialties: [
                'German Cars',
                'Quick Service',
                'Oil Changes',
                'Brake Service'
            ],
            services: [
                'Oil Change',
                'Brake Service',
                'Tire Rotation',
                'Battery Service',
                'Inspection',
                'Fluid Service',
                'Filter Replacement'
            ],
            location: {
                city: 'Accra',
                country: 'Ghana',
                address: '789 Independence Avenue',
                coordinates: { lat: 5.6037, lng: -0.1870 },
                distance: 3.8
            },
            contact: {
                phone: '+233 24 123 4567',
                email: 'service@expressauto.gh',
                website: 'www.expressauto.gh'
            },
            hours: {
                monday: '8:00 AM - 7:00 PM',
                tuesday: '8:00 AM - 7:00 PM',
                wednesday: '8:00 AM - 7:00 PM',
                thursday: '8:00 AM - 7:00 PM',
                friday: '8:00 AM - 7:00 PM',
                saturday: '9:00 AM - 6:00 PM',
                sunday: '10:00 AM - 4:00 PM'
            },
            pricing: {
                laborRate: 35,
                diagnosticFee: 40,
                currency: 'USD'
            },
            features: [
                'No Appointment Needed',
                'While You Wait',
                'Free WiFi',
                'Coffee Bar',
                'Kids Play Area'
            ],
            images: [
                'https://placehold.co/800x600/3498db/ffffff?text=Express+Service',
                'https://placehold.co/800x600/2980b9/ffffff?text=Quick+Bay'
            ],
            yearsInBusiness: 7,
            employeeCount: 6,
            languages: ['English', 'Twi', 'Ga']
        }
    ],

    // Enhanced Vehicle Listings
    vehicles: [
        {
            id: 'V001',
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            trim: 'XLE',
            price: 24500,
            currency: 'USD',
            mileage: 35000,
            condition: 'excellent',
            transmission: 'Automatic',
            fuelType: 'Gasoline',
            drivetrain: 'FWD',
            engine: '2.5L 4-Cylinder',
            exteriorColor: 'Silver',
            interiorColor: 'Black',
            vin: '4T1B11HK5LU123456',
            location: {
                city: 'Lagos',
                country: 'Nigeria',
                dealer: 'Premium Motors'
            },
            features: [
                'Leather Seats',
                'Sunroof',
                'Navigation',
                'Backup Camera',
                'Bluetooth',
                'Heated Seats',
                'Lane Departure Warning',
                'Adaptive Cruise Control'
            ],
            healthScore: 92,
            healthReport: {
                engine: 95,
                transmission: 90,
                brakes: 88,
                suspension: 92,
                electrical: 94,
                lastInspection: '2024-09-15',
                nextService: '2025-01-15'
            },
            history: {
                owners: 1,
                accidents: 0,
                serviceRecords: 8,
                title: 'Clean'
            },
            images: [
                'https://placehold.co/800x600/2c3e50/ffffff?text=Toyota+Camry+Front',
                'https://placehold.co/800x600/34495e/ffffff?text=Interior',
                'https://placehold.co/800x600/2c3e50/ffffff?text=Side+View'
            ],
            seller: {
                type: 'dealer',
                name: 'Premium Motors',
                verified: true,
                rating: 4.6,
                phone: '+234 123 456 7890'
            },
            warranty: {
                available: true,
                duration: '12 months',
                coverage: 'Powertrain'
            },
            financing: {
                available: true,
                downPayment: 4900,
                monthlyPayment: 450,
                term: 48
            }
        },
        {
            id: 'V002',
            make: 'Honda',
            model: 'CR-V',
            year: 2019,
            trim: 'EX',
            price: 22800,
            currency: 'USD',
            mileage: 42000,
            condition: 'very good',
            transmission: 'Automatic',
            fuelType: 'Gasoline',
            drivetrain: 'AWD',
            engine: '1.5L Turbo 4-Cylinder',
            exteriorColor: 'Blue',
            interiorColor: 'Gray',
            vin: '2HKRW2H85KH123456',
            location: {
                city: 'Nairobi',
                country: 'Kenya',
                dealer: 'AutoHub Kenya'
            },
            features: [
                'All-Wheel Drive',
                'Backup Camera',
                'Bluetooth',
                'Keyless Entry',
                'Power Liftgate',
                'Apple CarPlay',
                'Android Auto',
                'Blind Spot Monitor'
            ],
            healthScore: 88,
            healthReport: {
                engine: 90,
                transmission: 88,
                brakes: 85,
                suspension: 87,
                electrical: 90,
                lastInspection: '2024-08-20',
                nextService: '2024-12-20'
            },
            history: {
                owners: 2,
                accidents: 0,
                serviceRecords: 12,
                title: 'Clean'
            },
            images: [
                'https://placehold.co/800x600/27ae60/ffffff?text=Honda+CRV',
                'https://placehold.co/800x600/2ecc71/ffffff?text=Interior',
                'https://placehold.co/800x600/27ae60/ffffff?text=Cargo'
            ],
            seller: {
                type: 'dealer',
                name: 'AutoHub Kenya',
                verified: true,
                rating: 4.8,
                phone: '+254 712 345 678'
            },
            warranty: {
                available: true,
                duration: '6 months',
                coverage: 'Limited'
            },
            financing: {
                available: true,
                downPayment: 4560,
                monthlyPayment: 420,
                term: 48
            }
        }
    ],

    // Categories for filtering
    categories: {
        parts: [
            'Engine', 'Transmission', 'Brakes', 'Suspension', 'Electrical',
            'Exhaust', 'Cooling', 'Fuel System', 'Ignition', 'Filters',
            'Belts & Hoses', 'Body Parts', 'Interior', 'Lighting', 'Wheels & Tires'
        ],
        services: [
            'General Maintenance', 'Engine Repair', 'Transmission', 'Brakes',
            'Electrical', 'AC/Heating', 'Suspension', 'Diagnostics',
            'Oil Change', 'Tire Service', 'Alignment', 'Inspection'
        ],
        vehicleTypes: [
            'Sedan', 'SUV', 'Truck', 'Van', 'Coupe', 'Wagon',
            'Convertible', 'Hatchback', 'Crossover', 'Commercial'
        ]
    },

    // African cities for location services
    locations: [
        { city: 'Lagos', country: 'Nigeria', code: 'NG' },
        { city: 'Nairobi', country: 'Kenya', code: 'KE' },
        { city: 'Accra', country: 'Ghana', code: 'GH' },
        { city: 'Johannesburg', country: 'South Africa', code: 'ZA' },
        { city: 'Cairo', country: 'Egypt', code: 'EG' },
        { city: 'Dar es Salaam', country: 'Tanzania', code: 'TZ' },
        { city: 'Addis Ababa', country: 'Ethiopia', code: 'ET' },
        { city: 'Kampala', country: 'Uganda', code: 'UG' },
        { city: 'Abidjan', country: 'Ivory Coast', code: 'CI' },
        { city: 'Kigali', country: 'Rwanda', code: 'RW' }
    ]
};

// Export for use in other modules
window.MarketplaceData = MarketplaceData;
