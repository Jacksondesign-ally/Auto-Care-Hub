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
                location: 'Windhoek, Namibia',
                responseTime: '< 2 hours'
            },
            specifications: {
                partNumber: 'FR7DC+',
                fitment: 'Universal',
                warranty: '12 months',
                material: 'Platinum'
            },
            images: [
                'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=400&fit=crop'
            ],
            description: 'High-performance platinum spark plugs for improved fuel efficiency and engine performance. Perfect for Namibian conditions.',
            compatibility: ['Toyota Hilux', 'VW Polo', 'Honda', 'Nissan', 'Mazda'],
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
                'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop'
            ],
            description: 'Premium quality oil filter with superior filtration efficiency. Essential for Namibian desert conditions.',
            compatibility: ['Toyota Land Cruiser', 'BMW', 'Mercedes-Benz', 'Audi'],
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
            seller_name: 'AutoParts Direct Namibia',
            phone: '+264 81 209 5793',
            whatsapp: '+264812095793',
            seller: {
                id: 'S001',
                name: 'AutoParts Direct',
                verified: true,
                rating: 4.7,
                location: 'Windhoek, Namibia',
                responseTime: '< 2 hours'
            },
            specifications: {
                partNumber: 'P 06 038',
                fitment: 'Front Axle',
                warranty: '24 months',
                material: 'Ceramic'
            },
            images: [
                'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=400&fit=crop&q=80&sat=-100'
            ],
            description: 'High-performance ceramic brake pads for superior stopping power and reduced dust. Perfect for Namibian gravel roads.',
            compatibility: ['Toyota Hilux', 'Ford Ranger', 'Nissan NP200', 'VW Amarok'],
            shipping: {
                available: true,
                cost: 7.99,
                estimatedDays: '3-7'
            }
        },
        {
            id: 'P004',
            name: 'Toyota Hilux Air Filter',
            category: 'Engine',
            subcategory: 'Filters',
            brand: 'Toyota OEM',
            price: 25.00,
            currency: 'USD',
            stock: 120,
            condition: 'new',
            rating: 4.9,
            reviewCount: 89,
            seller_name: 'Namibia Auto Parts',
            phone: '+264 61 123 456',
            whatsapp: '+26461123456',
            seller: {
                id: 'S003',
                name: 'Namibia Auto Parts',
                verified: true,
                rating: 4.8,
                location: 'Windhoek, Namibia',
                responseTime: '< 1 hour'
            },
            specifications: {
                partNumber: '17801-OC010',
                fitment: 'Toyota Hilux 2016-2023',
                warranty: '12 months',
                material: 'High-grade paper'
            },
            images: [
                'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=400&fit=crop&q=70'
            ],
            description: 'Genuine Toyota air filter for Hilux. Essential for Namibian dusty conditions - extends engine life.',
            compatibility: ['Toyota Hilux', 'Toyota Fortuner'],
            shipping: {
                available: true,
                cost: 5.00,
                estimatedDays: '1-2'
            }
        },
        {
            id: 'P005',
            name: 'Heavy Duty Car Battery 12V 100Ah',
            category: 'Electrical',
            subcategory: 'Battery',
            brand: 'Varta',
            price: 150.00,
            currency: 'USD',
            stock: 45,
            condition: 'new',
            rating: 4.8,
            reviewCount: 234,
            seller_name: 'PowerParts Windhoek',
            phone: '+264 81 555 1234',
            whatsapp: '+264815551234',
            seller: {
                id: 'S004',
                name: 'PowerParts Windhoek',
                verified: true,
                rating: 4.9,
                location: 'Windhoek, Namibia',
                responseTime: '< 30 min'
            },
            specifications: {
                partNumber: 'G14',
                fitment: 'Universal',
                warranty: '24 months',
                capacity: '100Ah'
            },
            images: [
                'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=400&fit=crop'
            ],
            description: 'Heavy-duty 12V battery perfect for Namibian heat. Excellent for 4x4 vehicles and extreme temperatures.',
            compatibility: ['Toyota Land Cruiser', 'Ford Ranger', 'VW Amarok', 'Most 4x4s'],
            shipping: {
                available: true,
                cost: 12.00,
                estimatedDays: '1-3'
            }
        }
    ],

    // Mechanics Directory
    mechanics: [
        {
            id: 'M001',
            name: 'Windhoek Auto Service',
            owner: 'Johannes Shikongo',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
            specialization: 'Engine & Transmission Specialist',
            location: 'Katutura, Windhoek, Namibia',
            phone: '+264 81 234 5678',
            whatsapp: '+264812345678',
            verified: true,
            certified: ['Toyota Certified', '4x4 Specialist'],
            rating: 4.9,
            reviewCount: 245,
            specialties: [
                'Engine Diagnostics',
                'Transmission Repair',
                '4x4 Systems',
                'Air Conditioning'
            ],
            services: 'Engine repair, transmission service, 4x4 maintenance, AC repair, general servicing. Expert in Toyota Hilux, Land Cruiser, and Ford Ranger.',
            description: 'Professional mechanic with 12 years experience. Specializing in Toyota and 4x4 vehicles. Fluent in English, Oshiwambo, and Afrikaans.',
            location_obj: {
                city: 'Windhoek',
                country: 'Namibia',
                address: 'Shop 15, Katutura Industrial Area',
                coordinates: { lat: -22.5609, lng: 17.0658 },
                distance: 3.2  // km from center
            },
            contact: {
                phone: '+264 81 234 5678',
                whatsapp: '+264812345678',
                email: 'johannes@windhoek-auto.com.na',
                website: null
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
            name: 'Precision Auto Care Namibia',
            owner: 'Petrus Van Wyk',
            photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
            specialization: 'German Car Specialist (BMW, VW, Audi)',
            location: 'Klein Windhoek, Windhoek, Namibia',
            phone: '+264 61 234 789',
            whatsapp: '+26461234789',
            verified: true,
            certified: ['BMW Certified', 'VW Specialist', 'Bosch Trained'],
            rating: 4.8,
            reviewCount: 198,
            specialties: [
                'German Cars',
                'Engine Diagnostics',
                'Electrical Systems',
                'Computer Programming'
            ],
            services: 'BMW, VW, Audi, Mercedes servicing. Engine diagnostics, electrical repairs, brake service, suspension work. Modern diagnostic equipment.',
            description: 'Specialist in German vehicles with 15 years experience. Factory-trained technician. Workshop equipped with latest diagnostic tools.',
            location_obj: {
                city: 'Windhoek',
                country: 'Namibia',
                address: 'Sam Nujoma Drive, Klein Windhoek',
                coordinates: { lat: -22.5746, lng: 17.0837 },
                distance: 1.8
            },
            contact: {
                phone: '+264 61 234 789',
                whatsapp: '+26461234789',
                email: 'info@precision-autocare.com.na',
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
