/**
 * AutoCare AI-Powered Diagnostic System
 * This module provides advanced vehicle diagnostic capabilities using AI techniques
 */

// Database of common car problems, symptoms, and their relationships
const VEHICLE_PROBLEMS_DB = {
    "engine knocking": {
        causes: [
            "Low-octane fuel",
            "Worn spark plugs",
            "Carbon deposits",
            "Incorrect ignition timing",
            "Rod bearing wear",
            "Piston slap"
        ],
        parts: [
            "Spark plugs",
            "Engine cleaner",
            "Knock sensor",
            "Timing belt kit"
        ],
        severity: "medium",
        confidence: 0.85,
        additionalQuestions: [
            "How long have you noticed the knocking sound?",
            "Does the sound increase with engine speed?",
            "Have you recently changed fuel types or brands?"
        ]
    },
    "overheating": {
        causes: [
            "Low coolant",
            "Radiator leak",
            "Faulty thermostat",
            "Water pump failure",
            "Cooling fan not working",
            "Head gasket failure",
            "Blocked radiator"
        ],
        parts: [
            "Coolant",
            "Radiator",
            "Thermostat",
            "Water pump",
            "Fan relay",
            "Head gasket kit"
        ],
        severity: "high",
        confidence: 0.9,
        additionalQuestions: [
            "Does the temperature gauge rise quickly or gradually?",
            "Have you noticed any coolant leaks under the vehicle?",
            "Does the cooling fan turn on when the engine gets hot?"
        ]
    },
    "brake squeal": {
        causes: [
            "Worn brake pads",
            "Glazed pads/rotors",
            "Dust or debris",
            "Lack of shims",
            "Incorrect pad material",
            "Rotor surface issues"
        ],
        parts: [
            "Brake pads",
            "Brake rotors",
            "Shim kit",
            "Brake cleaner",
            "Caliper lubricant"
        ],
        severity: "medium",
        confidence: 0.8,
        additionalQuestions: [
            "Does the squeal occur only when braking or all the time?",
            "When was the last time your brakes were serviced?",
            "Does the squeal change with speed or temperature?"
        ]
    },
    "battery drains": {
        causes: [
            "Parasitic draw",
            "Old battery",
            "Faulty alternator",
            "Loose ground",
            "Corroded terminals",
            "Electrical short"
        ],
        parts: [
            "Battery",
            "Alternator",
            "Ground strap",
            "Terminal cleaner",
            "Multimeter test"
        ],
        severity: "medium",
        confidence: 0.85,
        additionalQuestions: [
            "How old is your battery?",
            "Does the vehicle start normally after sitting overnight?",
            "Have you added any aftermarket electronics recently?"
        ]
    },
    "rough idle": {
        causes: [
            "Vacuum leak",
            "Dirty throttle body",
            "Bad coil pack",
            "Clogged injector",
            "Faulty MAF sensor",
            "EGR valve issues"
        ],
        parts: [
            "Vacuum hose",
            "Throttle body cleaner",
            "Ignition coil",
            "Injector cleaner",
            "MAF sensor",
            "EGR valve"
        ],
        severity: "low",
        confidence: 0.75,
        additionalQuestions: [
            "Does the idle improve when the engine warms up?",
            "Have you noticed any check engine lights?",
            "Does the problem occur in all weather conditions?"
        ]
    },
    "car won't start": {
        causes: [
            "Dead battery",
            "Faulty starter",
            "Ignition switch problem",
            "Fuel pump failure",
            "Security system issue",
            "Clogged fuel filter"
        ],
        parts: [
            "Battery",
            "Starter motor",
            "Ignition switch",
            "Fuel pump",
            "Fuel filter"
        ],
        severity: "high",
        confidence: 0.9,
        additionalQuestions: [
            "Do you hear any clicking sounds when trying to start?",
            "Do the dashboard lights come on?",
            "Have you checked the battery voltage?"
        ]
    },
    "transmission slipping": {
        causes: [
            "Low transmission fluid",
            "Worn clutch plates",
            "Faulty solenoid",
            "Transmission band issues",
            "Torque converter problems"
        ],
        parts: [
            "Transmission fluid",
            "Transmission filter",
            "Solenoid pack",
            "Clutch kit"
        ],
        severity: "high",
        confidence: 0.85,
        additionalQuestions: [
            "Does the slipping occur at specific speeds?",
            "Have you checked the transmission fluid level and condition?",
            "Are there any unusual smells when the problem occurs?"
        ]
    }
};

// AI diagnostic system
class VehicleDiagnosticAI {
    constructor() {
        this.problemsDatabase = VEHICLE_PROBLEMS_DB;
        this.userResponses = [];
        this.currentDiagnosis = null;
    }

    // Process the user's description and return diagnostic results
    diagnose(userInput) {
        const text = userInput.toLowerCase().trim();
        
        // Store user input for context
        this.userResponses.push({
            type: 'initial',
            text: userInput
        });
        
        // Find matching symptoms using keyword analysis
        const matches = this._findMatches(text);
        
        if (matches.length === 0) {
            return {
                causes: ["No specific issue identified. Please provide more details about the symptoms."],
                parts: [],
                severity: "unknown",
                confidence: 0.3,
                additionalQuestions: [
                    "When does the problem occur? (e.g., when starting, driving, braking)",
                    "Are there any unusual sounds, smells, or vibrations?",
                    "Has the check engine light or any other warning lights come on?"
                ],
                needsMoreInfo: true
            };
        }
        
        // Calculate confidence scores for each match
        const scoredMatches = matches.map(match => {
            return {
                symptom: match,
                score: this._calculateConfidenceScore(text, match),
                data: this.problemsDatabase[match]
            };
        }).sort((a, b) => b.score - a.score);
        
        // Get the best match
        const bestMatch = scoredMatches[0];
        this.currentDiagnosis = {
            ...bestMatch.data,
            matchedSymptom: bestMatch.symptom,
            confidence: bestMatch.score,
            alternativeDiagnoses: scoredMatches.slice(1, 3).map(m => ({
                symptom: m.symptom,
                confidence: m.score
            }))
        };
        
        return this.currentDiagnosis;
    }
    
    // Answer follow-up questions to refine the diagnosis
    answerFollowUp(question, answer) {
        if (!this.currentDiagnosis) {
            return null;
        }
        
        // Store the response
        this.userResponses.push({
            type: 'followUp',
            question: question,
            answer: answer
        });
        
        // Refine the diagnosis based on the new information
        const refinedDiagnosis = this._refineDiagnosis(question, answer);
        this.currentDiagnosis = refinedDiagnosis;
        
        return refinedDiagnosis;
    }
    
    // Find matching symptoms in the database
    _findMatches(text) {
        // Direct keyword matching
        const directMatches = Object.keys(this.problemsDatabase).filter(k => 
            text.includes(k)
        );
        
        if (directMatches.length > 0) {
            return directMatches;
        }
        
        // Advanced matching using symptom patterns
        const symptomPatterns = {
            "engine knocking": ["knock", "tapping", "pinging", "metallic sound", "engine noise"],
            "overheating": ["hot", "temperature", "overheat", "steam", "boil"],
            "brake squeal": ["squeal", "squeak", "noise when braking", "brake noise", "grinding"],
            "battery drains": ["battery dead", "won't hold charge", "battery dies", "electrical problem"],
            "rough idle": ["rough", "idle", "stalling", "hesitation", "uneven", "shaking"],
            "car won't start": ["won't start", "no start", "cranks but won't start", "doesn't turn over"],
            "transmission slipping": ["slipping", "jerking", "not shifting", "transmission", "gear problem"]
        };
        
        const patternMatches = [];
        
        for (const [symptom, patterns] of Object.entries(symptomPatterns)) {
            for (const pattern of patterns) {
                if (text.includes(pattern)) {
                    patternMatches.push(symptom);
                    break;
                }
            }
        }
        
        return patternMatches;
    }
    
    // Calculate confidence score for a match
    _calculateConfidenceScore(text, match) {
        const baseConfidence = this.problemsDatabase[match].confidence;
        
        // Adjust confidence based on specificity of description
        let adjustedConfidence = baseConfidence;
        
        // More detailed descriptions increase confidence
        if (text.length > 50) adjustedConfidence += 0.05;
        if (text.length > 100) adjustedConfidence += 0.05;
        
        // Multiple symptom mentions increase confidence
        const symptomPatterns = {
            "engine knocking": ["knock", "tapping", "pinging", "metallic sound", "engine noise"],
            "overheating": ["hot", "temperature", "overheat", "steam", "boil"],
            "brake squeal": ["squeal", "squeak", "noise when braking", "brake noise", "grinding"],
            "battery drains": ["battery dead", "won't hold charge", "battery dies", "electrical problem"],
            "rough idle": ["rough", "idle", "stalling", "hesitation", "uneven", "shaking"],
            "car won't start": ["won't start", "no start", "cranks but won't start", "doesn't turn over"],
            "transmission slipping": ["slipping", "jerking", "not shifting", "transmission", "gear problem"]
        };
        
        const relevantPatterns = symptomPatterns[match];
        let matchCount = 0;
        
        for (const pattern of relevantPatterns) {
            if (text.includes(pattern)) {
                matchCount++;
            }
        }
        
        if (matchCount > 1) adjustedConfidence += 0.05;
        if (matchCount > 2) adjustedConfidence += 0.05;
        
        // Cap confidence at 0.95
        return Math.min(adjustedConfidence, 0.95);
    }
    
    // Refine diagnosis based on follow-up answers
    _refineDiagnosis(question, answer) {
        if (!this.currentDiagnosis) {
            return null;
        }
        
        const diagnosis = {...this.currentDiagnosis};
        const symptom = diagnosis.matchedSymptom;
        
        // Adjust confidence and causes based on specific answers
        switch(symptom) {
            case "engine knocking":
                if (question.includes("engine speed") && answer.toLowerCase().includes("yes")) {
                    // If knocking increases with engine speed, more likely rod bearing or piston issue
                    diagnosis.causes = diagnosis.causes.filter(c => 
                        c.includes("Rod bearing") || c.includes("Piston") || c.includes("Carbon")
                    ).concat(diagnosis.causes.filter(c => 
                        !c.includes("Rod bearing") && !c.includes("Piston") && !c.includes("Carbon")
                    ));
                    diagnosis.confidence += 0.05;
                }
                break;
                
            case "overheating":
                if (question.includes("coolant leaks") && answer.toLowerCase().includes("yes")) {
                    // If there are coolant leaks, prioritize those causes
                    diagnosis.causes = diagnosis.causes.filter(c => 
                        c.includes("leak") || c.includes("Radiator") || c.includes("Head gasket")
                    ).concat(diagnosis.causes.filter(c => 
                        !c.includes("leak") && !c.includes("Radiator") && !c.includes("Head gasket")
                    ));
                    diagnosis.confidence += 0.05;
                }
                break;
                
            // Add more symptom-specific refinements here
        }
        
        // Cap confidence at 0.95
        diagnosis.confidence = Math.min(diagnosis.confidence, 0.95);
        
        return diagnosis;
    }
    
    // Get repair difficulty estimation
    getRepairDifficulty() {
        if (!this.currentDiagnosis) {
            return null;
        }
        
        const symptom = this.currentDiagnosis.matchedSymptom;
        
        const difficultyMap = {
            "engine knocking": "High - Professional mechanic recommended",
            "overheating": "Medium - Some repairs can be DIY, others need professional help",
            "brake squeal": "Low to Medium - Many brake issues can be DIY with proper tools",
            "battery drains": "Low to Medium - Diagnostics may be complex, but repairs often simple",
            "rough idle": "Medium - May require diagnostic equipment for precise cause",
            "car won't start": "Varies - From simple battery replacement to complex fuel system issues",
            "transmission slipping": "High - Transmission work typically requires professional service"
        };
        
        return difficultyMap[symptom] || "Unknown - Professional diagnosis recommended";
    }
    
    // Get cost estimate range
    getCostEstimate() {
        if (!this.currentDiagnosis) {
            return null;
        }
        
        const symptom = this.currentDiagnosis.matchedSymptom;
        
        const costMap = {
            "engine knocking": "$500 - $2,500+",
            "overheating": "$150 - $1,500",
            "brake squeal": "$150 - $600",
            "battery drains": "$100 - $800",
            "rough idle": "$100 - $1,000",
            "car won't start": "$50 - $1,000+",
            "transmission slipping": "$800 - $3,500+"
        };
        
        return costMap[symptom] || "Varies - Professional diagnosis recommended";
    }
}

// Initialize the diagnostic AI
const vehicleDiagnosticAI = new VehicleDiagnosticAI();

// Export the diagnostic AI instance
window.vehicleDiagnosticAI = vehicleDiagnosticAI;

// Enhanced diagnostic handler function
function handleAIDiagnosticSubmit(e) {
    e.preventDefault();
    
    const faultInput = document.getElementById('fault-input').value;
    if (!faultInput) return;
    
    // Get AI diagnosis
    let diagnosis = vehicleDiagnosticAI.diagnose(faultInput);
    
    // Enhance diagnosis with media if available
    if (window.mediaUploadUtils) {
        const mediaFiles = window.mediaUploadUtils.getUploadedMediaFiles();
        if (mediaFiles.length > 0) {
            diagnosis = window.mediaUploadUtils.enhanceDiagnosisWithMedia(diagnosis, mediaFiles);
        }
    }
    
    // Show results section
    document.getElementById('results-section').classList.remove('hidden');
    
    // Populate causes
    const causesList = document.getElementById('causes-list');
    causesList.innerHTML = '';
    diagnosis.causes.forEach(cause => {
        const li = document.createElement('li');
        li.className = 'py-1';
        li.innerHTML = `<div class="flex items-start">
            <span class="text-red-600 mr-2">•</span>
            <span>${cause}</span>
        </div>`;
        causesList.appendChild(li);
    });
    
    // Populate health indicator
    const healthIndicator = document.getElementById('health-indicator');
    const healthDescription = document.getElementById('health-description');
    
    let healthColor, healthText;
    switch(diagnosis.severity) {
        case 'high':
            healthColor = 'bg-red-500';
            healthText = 'Critical - Immediate attention required';
            break;
        case 'medium':
            healthColor = 'bg-yellow-500';
            healthText = 'Warning - Service recommended soon';
            break;
        case 'low':
            healthColor = 'bg-green-500';
            healthText = 'Minor issue - Monitor the situation';
            break;
        default:
            healthColor = 'bg-gray-500';
            healthText = 'Unknown - More information needed';
    }
    
    healthIndicator.innerHTML = `
        <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div class="${healthColor} h-4 rounded-full" style="width: ${diagnosis.severity === 'high' ? '80%' : diagnosis.severity === 'medium' ? '50%' : '20%'}"></div>
        </div>
        <div class="flex justify-between text-sm text-gray-600">
            <span>Confidence: ${Math.round(diagnosis.confidence * 100)}%</span>
        </div>
    `;
    
    healthDescription.textContent = healthText;
    
    // Populate parts
    const partsList = document.getElementById('parts-list');
    partsList.innerHTML = '';
    diagnosis.parts.forEach(part => {
        const li = document.createElement('li');
        li.className = 'py-1';
        li.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${part}</span>
                <button class="text-red-600 hover:text-red-800">
                    <i data-lucide="plus-circle" class="w-5 h-5"></i>
                </button>
            </div>
        `;
        partsList.appendChild(li);
    });
    
    // Add follow-up questions if available
    if (diagnosis.additionalQuestions && diagnosis.additionalQuestions.length > 0) {
        // Create or show follow-up questions container
        let followUpContainer = document.getElementById('follow-up-container');
        
        if (!followUpContainer) {
            // Create the container if it doesn't exist
            followUpContainer = document.createElement('div');
            followUpContainer.id = 'follow-up-container';
            followUpContainer.className = 'mt-8 bg-red-50 rounded-xl p-6 border border-red-100';
            
            // Add it after the results grid
            const resultsGrid = document.querySelector('#results-section .grid');
            resultsGrid.parentNode.insertBefore(followUpContainer, resultsGrid.nextSibling);
        } else {
            // Show the container if it exists
            followUpContainer.classList.remove('hidden');
        }
        
        // Populate follow-up questions
        followUpContainer.innerHTML = `
            <div class="flex items-center mb-4">
                <i data-lucide="help-circle" class="w-6 h-6 text-red-600 mr-2"></i>
                <h4 class="text-xl font-semibold">Refine Your Diagnosis</h4>
            </div>
            <p class="mb-4 text-gray-700">Answer these questions to improve the accuracy of your diagnosis:</p>
            <div class="space-y-4" id="follow-up-questions">
                ${diagnosis.additionalQuestions.map((question, index) => `
                    <div class="follow-up-question">
                        <p class="font-medium mb-2">${question}</p>
                        <div class="flex space-x-2">
                            <button class="follow-up-btn px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50" 
                                data-question="${index}" data-answer="yes">Yes</button>
                            <button class="follow-up-btn px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50" 
                                data-question="${index}" data-answer="no">No</button>
                            <button class="follow-up-btn px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50" 
                                data-question="${index}" data-answer="unsure">Not Sure</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add repair difficulty and cost estimates
        const repairDifficulty = vehicleDiagnosticAI.getRepairDifficulty();
        const costEstimate = vehicleDiagnosticAI.getCostEstimate();
        
        if (repairDifficulty && costEstimate) {
            followUpContainer.innerHTML += `
                <div class="mt-6 pt-6 border-t border-red-100">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h5 class="font-medium text-gray-900 mb-2">Repair Difficulty</h5>
                            <p class="text-gray-700">${repairDifficulty}</p>
                        </div>
                        <div>
                            <h5 class="font-medium text-gray-900 mb-2">Estimated Cost</h5>
                            <p class="text-gray-700">${costEstimate}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Add event listeners to follow-up buttons
        setTimeout(() => {
            const followUpBtns = document.querySelectorAll('.follow-up-btn');
            followUpBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const questionIndex = parseInt(this.dataset.question);
                    const answer = this.dataset.answer;
                    const question = diagnosis.additionalQuestions[questionIndex];
                    
                    // Process the answer
                    const refinedDiagnosis = vehicleDiagnosticAI.answerFollowUp(question, answer);
                    
                    // Update the UI with refined diagnosis
                    if (refinedDiagnosis) {
                        // Update causes list with new ordering
                        causesList.innerHTML = '';
                        refinedDiagnosis.causes.forEach(cause => {
                            const li = document.createElement('li');
                            li.className = 'py-1';
                            li.innerHTML = `<div class="flex items-start">
                                <span class="text-red-600 mr-2">•</span>
                                <span>${cause}</span>
                            </div>`;
                            causesList.appendChild(li);
                        });
                        
                        // Update confidence
                        const confidenceEl = document.querySelector('#health-indicator .text-sm');
                        if (confidenceEl) {
                            confidenceEl.textContent = `Confidence: ${Math.round(refinedDiagnosis.confidence * 100)}%`;
                        }
                        
                        // Disable the answered question
                        const questionEl = this.closest('.follow-up-question');
                        const buttons = questionEl.querySelectorAll('button');
                        buttons.forEach(b => {
                            b.disabled = true;
                            b.classList.add('opacity-50');
                        });
                        this.classList.remove('opacity-50');
                        this.classList.add('bg-red-50', 'border-red-300');
                    }
                });
            });
            
            // Reinitialize icons for dynamically added content
            lucide.createIcons();
        }, 100);
    }
    
    // Reinitialize icons for dynamically added content
    lucide.createIcons();
    
    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace the original diagnostic form handler with the AI version
    const diagnosticForm = document.getElementById('diagnostic-form');
    if (diagnosticForm) {
        // Remove any existing event listeners (if possible)
        const newForm = diagnosticForm.cloneNode(true);
        diagnosticForm.parentNode.replaceChild(newForm, diagnosticForm);
        
        // Add the AI diagnostic handler
        newForm.addEventListener('submit', handleAIDiagnosticSubmit);
    }

    // Diagnostics tab switching (red theme)
    const diagnosticTab = document.getElementById('diagnostic-tab');
    if (diagnosticTab) {
        diagnosticTab.addEventListener('click', function() {
            const salesSection = document.getElementById('car-sales-section');
            if (salesSection) salesSection.classList.add('hidden');

            // Do not force show results; user can submit to reveal
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) resultsSection.classList.add('hidden');

            // Update tab styles (red theme)
            const carSalesTab = document.getElementById('car-sales-tab');
            if (carSalesTab) {
                carSalesTab.classList.remove('active-tab', 'border-red-500', 'text-red-500');
                carSalesTab.classList.add('border-transparent', 'text-gray-500');
            }
            diagnosticTab.classList.add('active-tab', 'border-red-500', 'text-red-500');
            diagnosticTab.classList.remove('border-transparent', 'text-gray-500');
        });
    }
});