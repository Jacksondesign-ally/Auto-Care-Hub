<?php

namespace App\Services;

use Illuminate\Support\Str;

class DiagnosticEngine
{
    protected $symptomDatabase;
    protected $regionalPricing;

    public function __construct()
    {
        $this->loadSymptomDatabase();
        $this->loadRegionalPricing();
    }

    /**
     * Run AI diagnosis
     * 
     * @param string $description
     * @param array $options
     * @return array
     */
    public function diagnose($description, $options = [])
    {
        $language = $options['language'] ?? 'en';
        $region = $options['region'] ?? 'Nigeria';
        $vehicleAge = $options['vehicleAge'] ?? 5;
        $mileage = $options['mileage'] ?? 50000;
        $season = $options['season'] ?? 'rainy';

        // Normalize input
        $normalizedDesc = $this->normalizeInput($description, $language);

        // Find matches
        $matches = $this->findMatches($normalizedDesc);

        // Get best match
        $bestMatch = $this->getBestMatch($matches);

        if (!$bestMatch) {
            return $this->getGenericDiagnosis($region, $language);
        }

        // Build comprehensive diagnosis
        return $this->buildDiagnosis($bestMatch, [
            'region' => $region,
            'vehicleAge' => $vehicleAge,
            'mileage' => $mileage,
            'season' => $season,
            'language' => $language
        ]);
    }

    /**
     * Normalize input text
     */
    private function normalizeInput($text, $language)
    {
        $normalized = strtolower(trim($text));
        $normalized = preg_replace('/[^\w\s]/', ' ', $normalized);
        $normalized = preg_replace('/\s+/', ' ', $normalized);
        return $normalized;
    }

    /**
     * Find matching symptoms
     */
    private function findMatches($description)
    {
        $matches = [];

        foreach ($this->symptomDatabase as $category => $symptoms) {
            foreach ($symptoms as $symptomKey => $symptom) {
                $score = $this->calculateMatchScore($description, $symptom['keywords']);

                if ($score > 0) {
                    $matches[] = [
                        'category' => $category,
                        'symptomKey' => $symptomKey,
                        'symptom' => $symptom,
                        'score' => $score,
                        'confidence' => $score
                    ];
                }
            }
        }

        usort($matches, function($a, $b) {
            return $b['score'] <=> $a['score'];
        });

        return $matches;
    }

    /**
     * Calculate match score
     */
    private function calculateMatchScore($description, $keywords)
    {
        $score = 0;
        $matchedKeywords = 0;

        foreach ($keywords as $keyword) {
            if (strpos($description, $keyword) !== false) {
                $matchedKeywords++;
                $score += count(explode(' ', $keyword));
            }
        }

        return $matchedKeywords > 0 ? ($score / count($keywords)) : 0;
    }

    /**
     * Get best match
     */
    private function getBestMatch($matches)
    {
        return !empty($matches) ? $matches[0] : null;
    }

    /**
     * Build comprehensive diagnosis
     */
    private function buildDiagnosis($match, $options)
    {
        $region = $options['region'];
        $vehicleAge = $options['vehicleAge'];
        $mileage = $options['mileage'];
        $season = $options['season'];

        // Get base cost estimate
        $baseCost = $this->getBaseCost($match['category'], $match['symptomKey']);

        // Adjust costs for region and vehicle factors
        $adjustedCosts = $this->adjustCosts($baseCost, $region, $vehicleAge, $mileage);

        // Get urgency level
        $urgencyLevel = $this->getUrgencyLevel($match['symptom']['severity']);

        return [
            'problem' => $this->getProblemName($match['category'], $match['symptomKey']),
            'description' => $this->getProblemDescription($match['category'], $match['symptomKey']),
            'category' => $match['category'],
            'confidence' => $match['confidence'],
            'severity' => $match['symptom']['severity'],
            'healthImpact' => $match['symptom']['healthImpact'],
            'healthScore' => 100 - $match['symptom']['healthImpact'],
            'costEstimate' => $adjustedCosts,
            'repairTime' => $this->getRepairTime($match['category'], $match['symptomKey']),
            'causes' => $this->getCauses($match['category'], $match['symptomKey']),
            'parts' => $this->getParts($match['category'], $match['symptomKey']),
            'recommendations' => $this->getRecommendations($match),
            'predictive' => $this->getPredictiveMaintenance($match, $vehicleAge, $mileage),
            'regional' => $this->getRegionalInsights($match, $region, $season),
            'urgencyLevel' => $urgencyLevel,
            'feedbackId' => 'DIAG-' . time() . '-' . Str::random(9),
            'language' => $options['language'],
            'region' => $region
        ];
    }

    /**
     * Adjust costs based on region and vehicle factors
     */
    private function adjustCosts($baseCost, $region, $vehicleAge, $mileage)
    {
        $regional = $this->regionalPricing[$region] ?? $this->regionalPricing['Nigeria'];
        $ageMultiplier = 1 + ($vehicleAge > 10 ? 0.3 : ($vehicleAge > 5 ? 0.15 : 0));
        $mileageMultiplier = 1 + ($mileage > 150000 ? 0.2 : ($mileage > 100000 ? 0.1 : 0));

        return [
            'min' => round($baseCost['min'] * $regional['labor'] * $ageMultiplier),
            'max' => round($baseCost['max'] * $regional['parts'] * $mileageMultiplier),
            'currency' => 'USD',
            'breakdown' => [
                'labor' => round($baseCost['min'] * $regional['labor']),
                'parts' => round(($baseCost['max'] - $baseCost['min']) * $regional['parts']),
                'shipping' => round($baseCost['min'] * 0.1 * $regional['shipping'])
            ],
            'regional' => $region,
            'factors' => [
                'age' => '+' . round(($ageMultiplier - 1) * 100) . '%',
                'mileage' => '+' . round(($mileageMultiplier - 1) * 100) . '%'
            ]
        ];
    }

    /**
     * Get urgency level
     */
    private function getUrgencyLevel($severity)
    {
        $levels = [
            'critical' => [
                'label' => 'CRITICAL',
                'color' => 'red',
                'icon' => 'alert-octagon',
                'message' => 'Stop driving immediately and seek professional help',
                'priority' => 1
            ],
            'high' => [
                'label' => 'HIGH',
                'color' => 'orange',
                'icon' => 'alert-triangle',
                'message' => 'Address within 24-48 hours to prevent further damage',
                'priority' => 2
            ],
            'medium' => [
                'label' => 'MEDIUM',
                'color' => 'yellow',
                'icon' => 'alert-circle',
                'message' => 'Schedule repair within 1-2 weeks',
                'priority' => 3
            ],
            'low' => [
                'label' => 'LOW',
                'color' => 'green',
                'icon' => 'info',
                'message' => 'Monitor and address at next service',
                'priority' => 4
            ]
        ];

        return $levels[$severity] ?? $levels['medium'];
    }

    /**
     * Get predictive maintenance
     */
    private function getPredictiveMaintenance($match, $vehicleAge, $mileage)
    {
        $predictions = [];

        if ($vehicleAge > 5) {
            $predictions[] = [
                'item' => 'Timing Belt',
                'dueIn' => '10,000 miles',
                'priority' => 'high',
                'reason' => 'Vehicle age over 5 years'
            ];
        }

        if ($mileage > 100000) {
            $predictions[] = [
                'item' => 'Transmission Service',
                'dueIn' => '5,000 miles',
                'priority' => 'medium',
                'reason' => 'High mileage vehicle'
            ];
        }

        return [
            'upcoming' => $predictions,
            'nextService' => $this->calculateNextService($mileage),
            'seasonalRecommendations' => $this->getSeasonalRecommendations()
        ];
    }

    /**
     * Get regional insights
     */
    private function getRegionalInsights($match, $region, $season)
    {
        return [
            'region' => $region,
            'season' => $season,
            'commonIssues' => $this->getCommonIssues($season),
            'localTips' => $this->getLocalTips($region, $match['category'])
        ];
    }

    /**
     * Calculate next service
     */
    private function calculateNextService($currentMileage)
    {
        $serviceInterval = 5000;
        $nextMileage = ceil($currentMileage / $serviceInterval) * $serviceInterval;
        
        return [
            'mileage' => $nextMileage,
            'milesRemaining' => $nextMileage - $currentMileage,
            'estimatedMonths' => ceil(($nextMileage - $currentMileage) / 1000)
        ];
    }

    /**
     * Get seasonal recommendations
     */
    private function getSeasonalRecommendations()
    {
        $month = date('n');
        
        if ($month >= 4 && $month <= 10) {
            return [
                'Check windshield wipers',
                'Inspect tire tread depth',
                'Test brake performance',
                'Check for rust spots'
            ];
        }
        
        return [
            'Clean air filters',
            'Check AC system',
            'Inspect cooling system',
            'Check tire pressure'
        ];
    }

    /**
     * Get common issues for season
     */
    private function getCommonIssues($season)
    {
        $issues = [
            'rainy' => ['brake issues', 'electrical problems', 'rust', 'water damage'],
            'dry' => ['dust issues', 'AC problems', 'overheating', 'tire wear'],
            'harmattan' => ['dust intake', 'visibility issues', 'respiratory filters']
        ];

        return $issues[$season] ?? $issues['rainy'];
    }

    /**
     * Get local tips
     */
    private function getLocalTips($region, $category)
    {
        $tips = [
            'Nigeria' => [
                'engine' => ['Use high-quality fuel from major stations', 'Regular oil changes due to dust'],
                'brakes' => ['Check brake pads frequently due to traffic', 'Avoid water puddles during rainy season']
            ],
            'Kenya' => [
                'engine' => ['Consider altitude adjustments', 'Use recommended fuel grade'],
                'brakes' => ['Mountain driving requires frequent checks', 'Brake fluid replacement every 6 months']
            ]
        ];

        return $tips[$region][$category] ?? ['Regular maintenance recommended', 'Use quality parts'];
    }

    /**
     * Generic diagnosis fallback
     */
    private function getGenericDiagnosis($region, $language)
    {
        return [
            'problem' => 'Unclear Symptoms - Professional Inspection Needed',
            'description' => 'The symptoms described require professional diagnosis for accurate assessment.',
            'category' => 'general',
            'confidence' => 0.3,
            'severity' => 'medium',
            'healthImpact' => 50,
            'healthScore' => 50,
            'costEstimate' => $this->adjustCosts(['min' => 50, 'max' => 300], $region, 5, 50000),
            'language' => $language,
            'region' => $region,
            'recommendations' => [
                'Schedule professional diagnostic appointment',
                'Document all symptoms in detail',
                'Note when problems occur',
                'Check for warning lights'
            ],
            'urgencyLevel' => $this->getUrgencyLevel('medium'),
            'feedbackId' => 'DIAG-' . time() . '-' . Str::random(9)
        ];
    }

    // Helper methods for getting data
    private function getBaseCost($category, $symptomKey) {
        $costs = [
            'engine' => ['knocking' => ['min' => 200, 'max' => 2000], 'overheating' => ['min' => 150, 'max' => 1500]],
            'brakes' => ['squealing' => ['min' => 150, 'max' => 400], 'spongy' => ['min' => 200, 'max' => 1200]],
            'electrical' => ['battery' => ['min' => 100, 'max' => 800]],
        ];
        return $costs[$category][$symptomKey] ?? ['min' => 100, 'max' => 500];
    }

    private function getProblemName($category, $symptomKey) {
        $names = [
            'engine' => ['knocking' => 'Engine Knocking/Detonation', 'overheating' => 'Engine Overheating'],
            'brakes' => ['squealing' => 'Brake Squealing/Grinding', 'spongy' => 'Spongy Brake Pedal'],
        ];
        return $names[$category][$symptomKey] ?? 'Unknown Issue';
    }

    private function getProblemDescription($category, $symptomKey) {
        return 'Detailed analysis of the issue based on symptoms provided.';
    }

    private function getRepairTime($category, $symptomKey) {
        return '2-4 hours';
    }

    private function getCauses($category, $symptomKey) {
        return ['Cause 1', 'Cause 2', 'Cause 3'];
    }

    private function getParts($category, $symptomKey) {
        return ['Part 1', 'Part 2'];
    }

    private function getRecommendations($match) {
        return ['Recommendation 1', 'Recommendation 2'];
    }

    /**
     * Load symptom database (simplified version)
     */
    private function loadSymptomDatabase()
    {
        $this->symptomDatabase = [
            'engine' => [
                'knocking' => [
                    'keywords' => ['knocking', 'knock', 'pinging', 'rattling', 'metal sound'],
                    'severity' => 'high',
                    'healthImpact' => 85
                ],
                'overheating' => [
                    'keywords' => ['overheating', 'hot', 'temperature', 'steam', 'coolant'],
                    'severity' => 'critical',
                    'healthImpact' => 95
                ],
            ],
            'brakes' => [
                'squealing' => [
                    'keywords' => ['squealing', 'squeaking', 'brake noise', 'grinding'],
                    'severity' => 'high',
                    'healthImpact' => 90
                ],
                'spongy' => [
                    'keywords' => ['spongy', 'soft pedal', 'brake pedal', 'no brakes'],
                    'severity' => 'critical',
                    'healthImpact' => 100
                ],
            ],
            'electrical' => [
                'battery' => [
                    'keywords' => ['battery', 'dead', 'won\'t start', 'no power', 'clicking'],
                    'severity' => 'medium',
                    'healthImpact' => 40
                ],
            ],
        ];
    }

    /**
     * Load regional pricing
     */
    private function loadRegionalPricing()
    {
        $this->regionalPricing = [
            'Nigeria' => ['labor' => 0.7, 'parts' => 1.1, 'shipping' => 1.3],
            'Kenya' => ['labor' => 0.8, 'parts' => 1.0, 'shipping' => 1.2],
            'Ghana' => ['labor' => 0.75, 'parts' => 1.05, 'shipping' => 1.25],
            'South Africa' => ['labor' => 1.2, 'parts' => 0.95, 'shipping' => 1.0],
            'Egypt' => ['labor' => 0.6, 'parts' => 1.15, 'shipping' => 1.4],
        ];
    }
}
