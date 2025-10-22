/**
 * AutoCare Enhanced Diagnostic Engine
 * Advanced symptom analysis with health scoring and urgency levels
 */

const EnhancedDiagnosticEngine = {
    // Enhanced diagnostic database with detailed information
    diagnosticDatabase: {
        'engine': {
            symptoms: [
                {
                    keywords: ['knocking', 'knock', 'pinging', 'rattling noise', 'metal sound'],
                    problem: 'Engine Knocking',
                    description: 'A knocking sound from the engine usually indicates pre-ignition or detonation issues, often caused by low-quality fuel or carbon buildup.',
                    causes: [
                        'Low octane fuel',
                        'Carbon deposits on pistons',
                        'Incorrect ignition timing',
                        'Worn engine bearings',
                        'Overheating'
                    ],
                    urgency: 'high',
                    healthImpact: 85,
                    costEstimate: { min: 200, max: 2000, currency: 'USD' },
                    repairTime: '2-8 hours',
                    parts: ['Spark plugs', 'Engine oil', 'Fuel injector cleaner', 'Timing belt'],
                    preventiveMeasures: [
                        'Use recommended octane fuel',
                        'Regular oil changes',
                        'Keep engine cool',
                        'Use quality fuel additives'
                    ]
                },
                {
                    keywords: ['overheating', 'hot', 'temperature', 'steam', 'coolant'],
                    problem: 'Engine Overheating',
                    description: 'Engine temperature exceeding normal range can cause severe damage if not addressed immediately.',
                    causes: [
                        'Low coolant level',
                        'Faulty thermostat',
                        'Radiator blockage',
                        'Water pump failure',
                        'Cooling fan malfunction'
                    ],
                    urgency: 'critical',
                    healthImpact: 95,
                    costEstimate: { min: 150, max: 1500, currency: 'USD' },
                    repairTime: '1-6 hours',
                    parts: ['Coolant', 'Thermostat', 'Radiator', 'Water pump', 'Cooling fan'],
                    preventiveMeasures: [
                        'Check coolant level monthly',
                        'Flush cooling system annually',
                        'Inspect hoses for leaks',
                        'Monitor temperature gauge'
                    ]
                },
                {
                    keywords: ['misfire', 'rough idle', 'shaking', 'vibration', 'hesitation'],
                    problem: 'Engine Misfire',
                    description: 'One or more cylinders not firing properly, causing rough running and reduced performance.',
                    causes: [
                        'Worn spark plugs',
                        'Faulty ignition coils',
                        'Clogged fuel injectors',
                        'Vacuum leaks',
                        'Low compression'
                    ],
                    urgency: 'medium',
                    healthImpact: 65,
                    costEstimate: { min: 100, max: 800, currency: 'USD' },
                    repairTime: '1-4 hours',
                    parts: ['Spark plugs', 'Ignition coils', 'Fuel injectors', 'Air filter'],
                    preventiveMeasures: [
                        'Replace spark plugs every 30,000 miles',
                        'Use quality fuel',
                        'Regular tune-ups',
                        'Check engine codes promptly'
                    ]
                }
            ]
        },
        'transmission': {
            symptoms: [
                {
                    keywords: ['slipping', 'gear slip', 'delayed shift', 'hard shift'],
                    problem: 'Transmission Slipping',
                    description: 'Transmission fails to engage properly or slips between gears, indicating internal wear or fluid issues.',
                    causes: [
                        'Low transmission fluid',
                        'Worn clutch plates',
                        'Faulty solenoid',
                        'Torque converter issues',
                        'Internal seal leaks'
                    ],
                    urgency: 'high',
                    healthImpact: 80,
                    costEstimate: { min: 300, max: 3500, currency: 'USD' },
                    repairTime: '4-12 hours',
                    parts: ['Transmission fluid', 'Filter', 'Solenoid', 'Clutch kit', 'Seals'],
                    preventiveMeasures: [
                        'Check fluid level regularly',
                        'Change transmission fluid per schedule',
                        'Avoid aggressive driving',
                        'Service transmission every 50,000 miles'
                    ]
                }
            ]
        },
        'brakes': {
            symptoms: [
                {
                    keywords: ['squealing', 'grinding', 'brake noise', 'metal sound brakes'],
                    problem: 'Worn Brake Pads',
                    description: 'Brake pads have worn down to the wear indicators or metal backing, requiring immediate replacement.',
                    causes: [
                        'Normal wear and tear',
                        'Aggressive braking',
                        'Poor quality pads',
                        'Stuck caliper',
                        'Rotor damage'
                    ],
                    urgency: 'high',
                    healthImpact: 90,
                    costEstimate: { min: 150, max: 400, currency: 'USD' },
                    repairTime: '1-2 hours',
                    parts: ['Brake pads', 'Rotors', 'Brake fluid', 'Calipers'],
                    preventiveMeasures: [
                        'Inspect brakes every 10,000 miles',
                        'Avoid hard braking',
                        'Use quality brake pads',
                        'Flush brake fluid every 2 years'
                    ]
                },
                {
                    keywords: ['spongy', 'soft pedal', 'brake pedal floor', 'no brakes'],
                    problem: 'Brake System Failure',
                    description: 'Critical brake system issue requiring immediate attention. Do not drive the vehicle.',
                    causes: [
                        'Brake fluid leak',
                        'Air in brake lines',
                        'Master cylinder failure',
                        'Brake line rupture',
                        'ABS malfunction'
                    ],
                    urgency: 'critical',
                    healthImpact: 100,
                    costEstimate: { min: 200, max: 1200, currency: 'USD' },
                    repairTime: '2-6 hours',
                    parts: ['Brake fluid', 'Master cylinder', 'Brake lines', 'ABS module'],
                    preventiveMeasures: [
                        'Check brake fluid monthly',
                        'Inspect brake lines for corrosion',
                        'Address leaks immediately',
                        'Professional inspection annually'
                    ]
                }
            ]
        },
        'electrical': {
            symptoms: [
                {
                    keywords: ['battery', 'dead', 'won\'t start', 'no power', 'clicking'],
                    problem: 'Battery/Starting System Issue',
                    description: 'Vehicle fails to start or shows signs of weak electrical power.',
                    causes: [
                        'Dead battery',
                        'Corroded terminals',
                        'Faulty alternator',
                        'Bad starter motor',
                        'Parasitic drain'
                    ],
                    urgency: 'medium',
                    healthImpact: 40,
                    costEstimate: { min: 100, max: 800, currency: 'USD' },
                    repairTime: '0.5-3 hours',
                    parts: ['Battery', 'Alternator', 'Starter', 'Battery terminals'],
                    preventiveMeasures: [
                        'Test battery annually',
                        'Clean terminals regularly',
                        'Check alternator output',
                        'Avoid short trips only'
                    ]
                }
            ]
        },
        'suspension': {
            symptoms: [
                {
                    keywords: ['bouncing', 'rough ride', 'clunking', 'suspension noise'],
                    problem: 'Worn Suspension Components',
                    description: 'Suspension system showing signs of wear, affecting ride quality and handling.',
                    causes: [
                        'Worn shock absorbers',
                        'Damaged struts',
                        'Broken springs',
                        'Worn bushings',
                        'Ball joint wear'
                    ],
                    urgency: 'medium',
                    healthImpact: 55,
                    costEstimate: { min: 200, max: 1500, currency: 'USD' },
                    repairTime: '2-6 hours',
                    parts: ['Shock absorbers', 'Struts', 'Springs', 'Bushings', 'Ball joints'],
                    preventiveMeasures: [
                        'Inspect suspension annually',
                        'Avoid potholes',
                        'Check alignment regularly',
                        'Replace worn parts promptly'
                    ]
                }
            ]
        }
    },

    /**
     * Analyze symptoms and return enhanced diagnostic result
     */
    diagnose(description) {
        const normalizedDesc = description.toLowerCase();
        let bestMatch = null;
        let highestScore = 0;

        // Search through all categories
        for (const category in this.diagnosticDatabase) {
            const symptoms = this.diagnosticDatabase[category].symptoms;
            
            for (const symptom of symptoms) {
                const score = this.calculateMatchScore(normalizedDesc, symptom.keywords);
                
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = {
                        ...symptom,
                        category,
                        confidence: score
                    };
                }
            }
        }

        if (!bestMatch || highestScore < 0.3) {
            return this.getGenericDiagnosis();
        }

        return this.formatDiagnosticResult(bestMatch);
    },

    /**
     * Calculate match score between description and keywords
     */
    calculateMatchScore(description, keywords) {
        let matches = 0;
        let totalKeywords = keywords.length;

        for (const keyword of keywords) {
            if (description.includes(keyword)) {
                matches++;
            }
        }

        return matches / totalKeywords;
    },

    /**
     * Format diagnostic result with all enhanced information
     */
    formatDiagnosticResult(match) {
        return {
            problem: match.problem,
            description: match.description,
            category: match.category,
            causes: match.causes,
            parts: match.parts,
            confidence: match.confidence,
            urgency: match.urgency,
            urgencyLevel: this.getUrgencyLevel(match.urgency),
            healthImpact: match.healthImpact,
            healthScore: 100 - match.healthImpact,
            costEstimate: match.costEstimate,
            repairTime: match.repairTime,
            preventiveMeasures: match.preventiveMeasures,
            recommendations: this.generateRecommendations(match),
            nextSteps: this.generateNextSteps(match.urgency)
        };
    },

    /**
     * Get urgency level configuration
     */
    getUrgencyLevel(urgency) {
        const levels = {
            'critical': {
                label: 'CRITICAL',
                color: 'red',
                icon: 'alert-octagon',
                message: 'Stop driving immediately and seek professional help',
                priority: 1
            },
            'high': {
                label: 'HIGH',
                color: 'orange',
                icon: 'alert-triangle',
                message: 'Address within 24-48 hours to prevent further damage',
                priority: 2
            },
            'medium': {
                label: 'MEDIUM',
                color: 'yellow',
                icon: 'alert-circle',
                message: 'Schedule repair within 1-2 weeks',
                priority: 3
            },
            'low': {
                label: 'LOW',
                color: 'green',
                icon: 'info',
                message: 'Monitor and address at next service',
                priority: 4
            }
        };

        return levels[urgency] || levels['medium'];
    },

    /**
     * Generate personalized recommendations
     */
    generateRecommendations(match) {
        const recommendations = [];

        if (match.urgency === 'critical') {
            recommendations.push('Do not drive the vehicle');
            recommendations.push('Call a tow service');
        }

        if (match.healthImpact > 80) {
            recommendations.push('Seek immediate professional diagnosis');
        } else if (match.healthImpact > 50) {
            recommendations.push('Schedule appointment with mechanic soon');
        }

        if (match.costEstimate.max > 1000) {
            recommendations.push('Get multiple quotes from mechanics');
            recommendations.push('Ask about warranty options');
        }

        recommendations.push('Keep records of all repairs');
        
        return recommendations;
    },

    /**
     * Generate next steps based on urgency
     */
    generateNextSteps(urgency) {
        const steps = {
            'critical': [
                'Stop driving immediately',
                'Contact emergency roadside assistance',
                'Have vehicle towed to mechanic',
                'Do not attempt DIY repairs'
            ],
            'high': [
                'Limit driving to essential trips only',
                'Schedule mechanic appointment today',
                'Prepare for potential towing',
                'Gather vehicle service history'
            ],
            'medium': [
                'Schedule mechanic appointment this week',
                'Monitor symptoms for changes',
                'Research repair costs',
                'Check warranty coverage'
            ],
            'low': [
                'Add to next service appointment',
                'Monitor for worsening symptoms',
                'Research preventive maintenance',
                'Keep detailed notes'
            ]
        };

        return steps[urgency] || steps['medium'];
    },

    /**
     * Generic diagnosis for unclear symptoms
     */
    getGenericDiagnosis() {
        return {
            problem: 'Unclear Symptoms',
            description: 'The symptoms described don\'t match our diagnostic database clearly. Professional inspection recommended.',
            category: 'general',
            causes: ['Multiple possible causes'],
            parts: ['Requires professional diagnosis'],
            confidence: 0.3,
            urgency: 'medium',
            urgencyLevel: this.getUrgencyLevel('medium'),
            healthImpact: 50,
            healthScore: 50,
            costEstimate: { min: 50, max: 500, currency: 'USD' },
            repairTime: 'Varies',
            preventiveMeasures: ['Regular maintenance', 'Professional inspections'],
            recommendations: [
                'Provide more specific symptoms',
                'Note when problem occurs',
                'Record any warning lights',
                'Consult professional mechanic'
            ],
            nextSteps: [
                'Schedule diagnostic appointment',
                'Document all symptoms',
                'Check for error codes',
                'Avoid aggressive driving'
            ]
        };
    }
};

// Export for use in diagnostic module
window.EnhancedDiagnosticEngine = EnhancedDiagnosticEngine;
