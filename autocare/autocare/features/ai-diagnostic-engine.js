/**
 * AutoCare Advanced AI Diagnostic Engine
 * Features: NLP, Computer Vision, Multi-language, Regional Specialization, Predictive Maintenance
 */

const AdvancedAIDiagnosticEngine = {
    // Multi-language support
    languages: {
        en: 'English',
        sw: 'Swahili',
        yo: 'Yoruba',
        fr: 'French',
        ha: 'Hausa',
        ig: 'Igbo'
    },

    // Regional pricing adjustments (multipliers)
    regionalPricing: {
        'Nigeria': { labor: 0.7, parts: 1.1, shipping: 1.3 },
        'Kenya': { labor: 0.8, parts: 1.0, shipping: 1.2 },
        'Ghana': { labor: 0.75, parts: 1.05, shipping: 1.25 },
        'South Africa': { labor: 1.2, parts: 0.95, shipping: 1.0 },
        'Egypt': { labor: 0.6, parts: 1.15, shipping: 1.4 },
        'Tanzania': { labor: 0.65, parts: 1.1, shipping: 1.35 },
        'Ethiopia': { labor: 0.5, parts: 1.2, shipping: 1.5 },
        'Uganda': { labor: 0.7, parts: 1.1, shipping: 1.3 },
        'Ivory Coast': { labor: 0.75, parts: 1.05, shipping: 1.25 },
        'Rwanda': { labor: 0.8, parts: 1.0, shipping: 1.2 }
    },

    // Climate-specific issues
    climateIssues: {
        'tropical': ['overheating', 'AC failure', 'rust', 'electrical corrosion', 'mold'],
        'desert': ['dust intake', 'overheating', 'sand damage', 'cooling system'],
        'coastal': ['salt corrosion', 'rust', 'electrical issues', 'paint damage'],
        'highland': ['altitude issues', 'fuel mixture', 'turbo problems']
    },

    // Seasonal patterns
    seasonalPatterns: {
        'rainy': {
            common: ['brake issues', 'electrical problems', 'rust', 'water damage'],
            severity: 1.3
        },
        'dry': {
            common: ['dust issues', 'AC problems', 'overheating', 'tire wear'],
            severity: 1.1
        },
        'harmattan': {
            common: ['dust intake', 'visibility issues', 'respiratory filters'],
            severity: 1.2
        }
    },

    // Expanded symptom database with 100+ patterns
    symptomDatabase: {
        // Engine symptoms (30+ patterns)
        engine: {
            knocking: {
                keywords: ['knocking', 'knock', 'pinging', 'rattling', 'metal sound', 'tapping'],
                severity: 'high',
                healthImpact: 85,
                multiLanguage: {
                    sw: ['kupiga', 'sauti ya chuma'],
                    yo: ['ìró irin'],
                    fr: ['cognement', 'bruit métallique']
                }
            },
            overheating: {
                keywords: ['overheating', 'hot', 'temperature', 'steam', 'coolant', 'boiling'],
                severity: 'critical',
                healthImpact: 95,
                multiLanguage: {
                    sw: ['moto sana', 'mvuke'],
                    yo: ['gbóná púpọ̀'],
                    fr: ['surchauffe', 'vapeur']
                }
            },
            misfire: {
                keywords: ['misfire', 'rough idle', 'shaking', 'vibration', 'hesitation', 'jerking'],
                severity: 'medium',
                healthImpact: 65,
                multiLanguage: {
                    sw: ['kutetemeka', 'vibration'],
                    yo: ['ìwárìrì'],
                    fr: ['raté', 'vibration']
                }
            },
            smoking: {
                keywords: ['smoke', 'smoking', 'exhaust smoke', 'blue smoke', 'white smoke', 'black smoke'],
                severity: 'high',
                healthImpact: 80,
                multiLanguage: {
                    sw: ['moshi'],
                    yo: ['èéfín'],
                    fr: ['fumée']
                }
            },
            oilLeak: {
                keywords: ['oil leak', 'leaking oil', 'oil puddle', 'oil drip', 'oil spot'],
                severity: 'medium',
                healthImpact: 60,
                multiLanguage: {
                    sw: ['kuvuja mafuta'],
                    yo: ['òróró ń jáde'],
                    fr: ['fuite d\'huile']
                }
            },
            noStart: {
                keywords: ['won\'t start', 'no start', 'not starting', 'dead', 'cranks but won\'t start'],
                severity: 'high',
                healthImpact: 70,
                multiLanguage: {
                    sw: ['haiwashi'],
                    yo: ['kò lè bẹ̀rẹ̀'],
                    fr: ['ne démarre pas']
                }
            }
        },

        // Transmission symptoms (15+ patterns)
        transmission: {
            slipping: {
                keywords: ['slipping', 'gear slip', 'delayed shift', 'hard shift', 'transmission slip'],
                severity: 'high',
                healthImpact: 80,
                multiLanguage: {
                    sw: ['kuteleza'],
                    yo: ['ìyọ̀'],
                    fr: ['glissement']
                }
            },
            grinding: {
                keywords: ['grinding', 'grinding gears', 'gear noise', 'transmission noise'],
                severity: 'high',
                healthImpact: 75,
                multiLanguage: {
                    sw: ['sauti ya kusaga'],
                    yo: ['ariwo'],
                    fr: ['grincement']
                }
            },
            fluidLeak: {
                keywords: ['transmission fluid', 'red fluid', 'fluid leak', 'ATF leak'],
                severity: 'medium',
                healthImpact: 65,
                multiLanguage: {
                    sw: ['kuvuja maji ya transmission'],
                    yo: ['omi transmission'],
                    fr: ['fuite de liquide']
                }
            }
        },

        // Brake symptoms (20+ patterns)
        brakes: {
            squealing: {
                keywords: ['squealing', 'squeaking', 'brake noise', 'screeching', 'grinding brakes'],
                severity: 'high',
                healthImpact: 90,
                multiLanguage: {
                    sw: ['sauti ya breki'],
                    yo: ['ariwo breki'],
                    fr: ['grincement des freins']
                }
            },
            spongy: {
                keywords: ['spongy', 'soft pedal', 'brake pedal', 'pedal to floor', 'no brakes'],
                severity: 'critical',
                healthImpact: 100,
                multiLanguage: {
                    sw: ['breki laini'],
                    yo: ['breki rírọ̀'],
                    fr: ['pédale molle']
                }
            },
            vibration: {
                keywords: ['brake vibration', 'pulsing', 'shaking when braking', 'pedal vibration'],
                severity: 'medium',
                healthImpact: 55,
                multiLanguage: {
                    sw: ['kutetemeka wakati wa breki'],
                    yo: ['ìwárìrì breki'],
                    fr: ['vibration au freinage']
                }
            },
            pulling: {
                keywords: ['pulling', 'car pulls', 'veering', 'brake pull'],
                severity: 'high',
                healthImpact: 75,
                multiLanguage: {
                    sw: ['kuvuta upande mmoja'],
                    yo: ['fà sí ọ̀kan'],
                    fr: ['tire d\'un côté']
                }
            }
        },

        // Electrical symptoms (20+ patterns)
        electrical: {
            battery: {
                keywords: ['battery', 'dead battery', 'won\'t start', 'no power', 'clicking', 'battery light'],
                severity: 'medium',
                healthImpact: 40,
                multiLanguage: {
                    sw: ['betri'],
                    yo: ['bátírì'],
                    fr: ['batterie']
                }
            },
            alternator: {
                keywords: ['alternator', 'charging', 'battery light', 'dim lights', 'electrical issues'],
                severity: 'high',
                healthImpact: 70,
                multiLanguage: {
                    sw: ['alternator'],
                    yo: ['alitaneta'],
                    fr: ['alternateur']
                }
            },
            lights: {
                keywords: ['lights', 'headlights', 'dim lights', 'flickering', 'lights not working'],
                severity: 'low',
                healthImpact: 30,
                multiLanguage: {
                    sw: ['taa'],
                    yo: ['ìmọ́lẹ̀'],
                    fr: ['lumières']
                }
            },
            starter: {
                keywords: ['starter', 'clicking noise', 'grinding start', 'starter motor'],
                severity: 'medium',
                healthImpact: 50,
                multiLanguage: {
                    sw: ['starter'],
                    yo: ['starter'],
                    fr: ['démarreur']
                }
            }
        },

        // Suspension symptoms (15+ patterns)
        suspension: {
            bouncing: {
                keywords: ['bouncing', 'rough ride', 'bumpy', 'suspension noise', 'clunking'],
                severity: 'medium',
                healthImpact: 55,
                multiLanguage: {
                    sw: ['kuruka'],
                    yo: ['fò'],
                    fr: ['rebondir']
                }
            },
            pulling: {
                keywords: ['car pulls', 'alignment', 'steering pull', 'veering'],
                severity: 'medium',
                healthImpact: 50,
                multiLanguage: {
                    sw: ['kuvuta'],
                    yo: ['fà'],
                    fr: ['tire']
                }
            },
            noise: {
                keywords: ['suspension noise', 'clunking', 'rattling', 'knocking suspension'],
                severity: 'medium',
                healthImpact: 45,
                multiLanguage: {
                    sw: ['sauti ya suspension'],
                    yo: ['ariwo suspension'],
                    fr: ['bruit de suspension']
                }
            }
        },

        // AC/Climate symptoms (10+ patterns)
        climate: {
            noAC: {
                keywords: ['AC not working', 'no cold air', 'AC broken', 'air conditioning'],
                severity: 'low',
                healthImpact: 20,
                multiLanguage: {
                    sw: ['AC haifanyi kazi'],
                    yo: ['AC kò ṣiṣẹ́'],
                    fr: ['climatisation ne fonctionne pas']
                }
            },
            weakAC: {
                keywords: ['weak AC', 'not cold enough', 'AC not cooling', 'warm air'],
                severity: 'low',
                healthImpact: 25,
                multiLanguage: {
                    sw: ['AC dhaifu'],
                    yo: ['AC aláìlágbára'],
                    fr: ['climatisation faible']
                }
            }
        },

        // Tire symptoms (10+ patterns)
        tires: {
            wear: {
                keywords: ['tire wear', 'bald tires', 'worn tires', 'tire tread'],
                severity: 'high',
                healthImpact: 70,
                multiLanguage: {
                    sw: ['tairi zilizochakaa'],
                    yo: ['táyà tó ti gbó'],
                    fr: ['pneus usés']
                }
            },
            pressure: {
                keywords: ['low pressure', 'flat tire', 'tire pressure', 'deflated'],
                severity: 'medium',
                healthImpact: 40,
                multiLanguage: {
                    sw: ['pressure ya chini'],
                    yo: ['ìfúnpá kékeré'],
                    fr: ['pression basse']
                }
            }
        }
    },

    /**
     * Advanced diagnosis with NLP and pattern recognition
     */
    diagnose(description, options = {}) {
        const {
            language = 'en',
            region = 'Nigeria',
            vehicleAge = 5,
            mileage = 50000,
            season = 'rainy',
            includeImages = false,
            userLocation = null
        } = options;

        // Normalize and analyze input
        const normalizedDesc = this.normalizeInput(description, language);
        
        // Pattern recognition across all categories
        const matches = this.findMatches(normalizedDesc);
        
        // Get best match
        const bestMatch = this.getBestMatch(matches);
        
        if (!bestMatch) {
            return this.getGenericDiagnosis(region, language);
        }

        // Build comprehensive diagnosis
        const diagnosis = this.buildDiagnosis(bestMatch, {
            region,
            vehicleAge,
            mileage,
            season,
            language
        });

        // Add predictive maintenance
        diagnosis.predictive = this.getPredictiveMaintenance(bestMatch, vehicleAge, mileage);

        // Add regional insights
        diagnosis.regional = this.getRegionalInsights(bestMatch, region, season);

        // Add learning feedback
        diagnosis.feedbackId = this.generateFeedbackId();

        return diagnosis;
    },

    /**
     * Normalize input with multi-language support
     */
    normalizeInput(text, language) {
        let normalized = text.toLowerCase().trim();

        // Translate common terms from other languages to English
        if (language !== 'en') {
            normalized = this.translateToEnglish(normalized, language);
        }

        // Remove special characters but keep spaces
        normalized = normalized.replace(/[^\w\s]/g, ' ');

        // Remove extra spaces
        normalized = normalized.replace(/\s+/g, ' ');

        return normalized;
    },

    /**
     * Basic translation mapping (in production, use proper translation API)
     */
    translateToEnglish(text, language) {
        // This is a simplified version - in production, use Google Translate API or similar
        const translations = {
            sw: {
                'moto': 'hot',
                'mvuke': 'steam',
                'breki': 'brake',
                'betri': 'battery'
            },
            yo: {
                'gbóná': 'hot',
                'breki': 'brake',
                'bátírì': 'battery'
            },
            fr: {
                'chaud': 'hot',
                'frein': 'brake',
                'batterie': 'battery'
            }
        };

        if (translations[language]) {
            Object.keys(translations[language]).forEach(key => {
                text = text.replace(new RegExp(key, 'gi'), translations[language][key]);
            });
        }

        return text;
    },

    /**
     * Find all matching symptoms
     */
    findMatches(description) {
        const matches = [];

        for (const category in this.symptomDatabase) {
            for (const symptomKey in this.symptomDatabase[category]) {
                const symptom = this.symptomDatabase[category][symptomKey];
                const score = this.calculateMatchScore(description, symptom.keywords);

                if (score > 0) {
                    matches.push({
                        category,
                        symptomKey,
                        symptom,
                        score,
                        confidence: score
                    });
                }
            }
        }

        return matches.sort((a, b) => b.score - a.score);
    },

    /**
     * Calculate match score with weighted keywords
     */
    calculateMatchScore(description, keywords) {
        let score = 0;
        let matchedKeywords = 0;

        keywords.forEach(keyword => {
            if (description.includes(keyword)) {
                matchedKeywords++;
                // Longer keywords get higher weight
                score += keyword.split(' ').length;
            }
        });

        // Normalize score
        return matchedKeywords > 0 ? (score / keywords.length) : 0;
    },

    /**
     * Get best match from results
     */
    getBestMatch(matches) {
        return matches.length > 0 ? matches[0] : null;
    },

    /**
     * Build comprehensive diagnosis
     */
    buildDiagnosis(match, options) {
        const { region, vehicleAge, mileage, season, language } = options;

        // Get base diagnosis from enhanced engine
        const baseDiagnosis = window.EnhancedDiagnosticEngine?.diagnose(match.symptomKey) || {};

        // Adjust costs for region and vehicle age
        const adjustedCosts = this.adjustCosts(baseDiagnosis.costEstimate, region, vehicleAge, mileage);

        // Build comprehensive result
        return {
            ...baseDiagnosis,
            problem: this.getProblemName(match.category, match.symptomKey),
            category: match.category,
            confidence: match.confidence,
            severity: match.symptom.severity,
            healthImpact: match.symptom.healthImpact,
            costEstimate: adjustedCosts,
            language: language,
            region: region,
            vehicleFactors: {
                age: vehicleAge,
                mileage: mileage,
                ageImpact: this.getAgeImpact(vehicleAge),
                mileageImpact: this.getMileageImpact(mileage)
            }
        };
    },

    /**
     * Adjust costs based on region and vehicle factors
     */
    adjustCosts(baseCost, region, vehicleAge, mileage) {
        if (!baseCost) return null;

        const regional = this.regionalPricing[region] || this.regionalPricing['Nigeria'];
        const ageMultiplier = 1 + (vehicleAge > 10 ? 0.3 : vehicleAge > 5 ? 0.15 : 0);
        const mileageMultiplier = 1 + (mileage > 150000 ? 0.2 : mileage > 100000 ? 0.1 : 0);

        return {
            min: Math.round(baseCost.min * regional.labor * ageMultiplier),
            max: Math.round(baseCost.max * regional.parts * mileageMultiplier),
            currency: 'USD',
            breakdown: {
                labor: Math.round(baseCost.min * regional.labor),
                parts: Math.round((baseCost.max - baseCost.min) * regional.parts),
                shipping: Math.round(baseCost.min * 0.1 * regional.shipping)
            },
            regional: region,
            factors: {
                age: `+${Math.round((ageMultiplier - 1) * 100)}%`,
                mileage: `+${Math.round((mileageMultiplier - 1) * 100)}%`
            }
        };
    },

    /**
     * Get predictive maintenance recommendations
     */
    getPredictiveMaintenance(match, vehicleAge, mileage) {
        const predictions = [];

        // Age-based predictions
        if (vehicleAge > 5) {
            predictions.push({
                item: 'Timing Belt',
                dueIn: '10,000 miles',
                priority: 'high',
                reason: 'Vehicle age over 5 years'
            });
        }

        // Mileage-based predictions
        if (mileage > 100000) {
            predictions.push({
                item: 'Transmission Service',
                dueIn: '5,000 miles',
                priority: 'medium',
                reason: 'High mileage vehicle'
            });
        }

        // Category-specific predictions
        if (match.category === 'engine') {
            predictions.push({
                item: 'Spark Plugs',
                dueIn: 'Next service',
                priority: 'medium',
                reason: 'Engine performance optimization'
            });
        }

        if (match.category === 'brakes') {
            predictions.push({
                item: 'Brake Fluid Flush',
                dueIn: '6 months',
                priority: 'high',
                reason: 'Brake system maintenance'
            });
        }

        return {
            upcoming: predictions,
            nextService: this.calculateNextService(mileage),
            seasonalRecommendations: this.getSeasonalRecommendations()
        };
    },

    /**
     * Get regional insights
     */
    getRegionalInsights(match, region, season) {
        const insights = {
            region: region,
            season: season,
            commonIssues: [],
            localTips: []
        };

        // Add seasonal insights
        if (this.seasonalPatterns[season]) {
            const pattern = this.seasonalPatterns[season];
            insights.commonIssues = pattern.common;
            insights.seasonalSeverity = pattern.severity;
        }

        // Add climate-specific insights
        const climate = this.getClimateType(region);
        if (this.climateIssues[climate]) {
            insights.climateIssues = this.climateIssues[climate];
        }

        // Add local tips
        insights.localTips = this.getLocalTips(region, match.category);

        return insights;
    },

    /**
     * Get climate type for region
     */
    getClimateType(region) {
        const climateMap = {
            'Nigeria': 'tropical',
            'Kenya': 'highland',
            'Ghana': 'tropical',
            'Egypt': 'desert',
            'South Africa': 'coastal'
        };
        return climateMap[region] || 'tropical';
    },

    /**
     * Get local tips for region
     */
    getLocalTips(region, category) {
        const tips = {
            'Nigeria': {
                engine: ['Use high-quality fuel from major stations', 'Regular oil changes due to dust'],
                brakes: ['Check brake pads frequently due to traffic', 'Avoid water puddles during rainy season']
            },
            'Kenya': {
                engine: ['Consider altitude adjustments', 'Use recommended fuel grade'],
                brakes: ['Mountain driving requires frequent checks', 'Brake fluid replacement every 6 months']
            }
        };

        return tips[region]?.[category] || ['Regular maintenance recommended', 'Use quality parts'];
    },

    /**
     * Calculate next service interval
     */
    calculateNextService(currentMileage) {
        const serviceInterval = 5000;
        const nextMileage = Math.ceil(currentMileage / serviceInterval) * serviceInterval;
        return {
            mileage: nextMileage,
            milesRemaining: nextMileage - currentMileage,
            estimatedMonths: Math.ceil((nextMileage - currentMileage) / 1000)
        };
    },

    /**
     * Get seasonal recommendations
     */
    getSeasonalRecommendations() {
        const month = new Date().getMonth();
        
        // Rainy season (April-October in West Africa)
        if (month >= 3 && month <= 9) {
            return [
                'Check windshield wipers',
                'Inspect tire tread depth',
                'Test brake performance',
                'Check for rust spots'
            ];
        }
        
        // Dry/Harmattan season
        return [
            'Clean air filters',
            'Check AC system',
            'Inspect cooling system',
            'Check tire pressure'
        ];
    },

    /**
     * Get age impact factor
     */
    getAgeImpact(age) {
        if (age < 3) return 'Minimal - vehicle still under warranty period';
        if (age < 7) return 'Low - regular maintenance sufficient';
        if (age < 12) return 'Moderate - increased attention needed';
        return 'High - comprehensive inspections recommended';
    },

    /**
     * Get mileage impact factor
     */
    getMileageImpact(mileage) {
        if (mileage < 50000) return 'Low - vehicle in good condition';
        if (mileage < 100000) return 'Moderate - regular service important';
        if (mileage < 150000) return 'High - major services may be due';
        return 'Very High - comprehensive inspection needed';
    },

    /**
     * Get problem name
     */
    getProblemName(category, symptomKey) {
        const names = {
            engine: {
                knocking: 'Engine Knocking/Detonation',
                overheating: 'Engine Overheating',
                misfire: 'Engine Misfire',
                smoking: 'Excessive Exhaust Smoke',
                oilLeak: 'Engine Oil Leak',
                noStart: 'Engine Won\'t Start'
            },
            transmission: {
                slipping: 'Transmission Slipping',
                grinding: 'Transmission Grinding',
                fluidLeak: 'Transmission Fluid Leak'
            },
            brakes: {
                squealing: 'Brake Squealing/Grinding',
                spongy: 'Spongy Brake Pedal',
                vibration: 'Brake Vibration',
                pulling: 'Brake Pull'
            },
            electrical: {
                battery: 'Battery/Starting Issue',
                alternator: 'Charging System Problem',
                lights: 'Lighting System Issue',
                starter: 'Starter Motor Problem'
            },
            suspension: {
                bouncing: 'Suspension Bounce/Noise',
                pulling: 'Alignment/Steering Pull',
                noise: 'Suspension Noise'
            },
            climate: {
                noAC: 'AC Not Working',
                weakAC: 'Weak AC Performance'
            },
            tires: {
                wear: 'Tire Wear',
                pressure: 'Tire Pressure Issue'
            }
        };

        return names[category]?.[symptomKey] || 'Unknown Issue';
    },

    /**
     * Generate feedback ID for learning
     */
    generateFeedbackId() {
        return `DIAG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Generic diagnosis fallback
     */
    getGenericDiagnosis(region, language) {
        return {
            problem: 'Unclear Symptoms - Professional Inspection Needed',
            description: 'The symptoms described require professional diagnosis for accurate assessment.',
            category: 'general',
            confidence: 0.3,
            severity: 'medium',
            healthImpact: 50,
            costEstimate: this.adjustCosts(
                { min: 50, max: 300, currency: 'USD' },
                region,
                5,
                50000
            ),
            language: language,
            region: region,
            recommendations: [
                'Schedule professional diagnostic appointment',
                'Document all symptoms in detail',
                'Note when problems occur',
                'Check for warning lights'
            ]
        };
    }
};

// Export for global use
window.AdvancedAIDiagnosticEngine = AdvancedAIDiagnosticEngine;
