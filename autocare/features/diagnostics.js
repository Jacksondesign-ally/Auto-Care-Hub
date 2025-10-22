/**
 * AutoCare Diagnostics Module
 * Refactored with state management and event-driven architecture
 */

const DiagnosticsModule = {
    ai: null,
    enhancedEngine: null,
    advancedEngine: null,

    async init() {
        this.ai = new VehicleDiagnosticAI();
        this.enhancedEngine = window.EnhancedDiagnosticEngine;
        this.advancedEngine = window.AdvancedAIDiagnosticEngine;
        this.setupEventListeners();
        this.setupFormHandler();
    },

    setupEventListeners() {
        // Listen for diagnostic submissions
        window.AutoCareEvents.on(window.Events.DIAGNOSTIC_SUBMIT, (data) => {
            this.handleDiagnostic(data);
        });

        // Subscribe to state changes
        window.AutoCareState.subscribe('diagnostics.current', (diagnosis) => {
            if (diagnosis) {
                this.renderResults(diagnosis);
            }
        });
    },

    setupFormHandler() {
        const form = document.getElementById('diagnostic-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const input = document.getElementById('fault-input');
            if (!input || !input.value.trim()) return;

            // Emit diagnostic event
            window.AutoCareEvents.emit(window.Events.DIAGNOSTIC_SUBMIT, {
                description: input.value.trim(),
                media: this.getUploadedMedia()
            });
        });
    },

    async handleDiagnostic(data) {
        try {
            // Set loading state
            window.AutoCareState.set('diagnostics.loading', true);

            // Use advanced AI engine if available, fallback to enhanced, then basic
            let diagnosis;
            if (this.advancedEngine) {
                // Use advanced engine with regional and vehicle data
                diagnosis = this.advancedEngine.diagnose(data.description, {
                    language: data.language || 'en',
                    region: data.region || 'Nigeria',
                    vehicleAge: data.vehicleAge || 5,
                    mileage: data.mileage || 50000,
                    season: this.getCurrentSeason(),
                    includeImages: data.media && data.media.length > 0
                });
            } else if (this.enhancedEngine) {
                diagnosis = this.enhancedEngine.diagnose(data.description);
            } else {
                diagnosis = this.ai.diagnose(data.description);
            }

            // Enhance with media if available
            if (data.media && data.media.length > 0) {
                diagnosis = this.enhanceWithMedia(diagnosis, data.media);
            }

            // Update state
            window.AutoCareState.set('diagnostics.current', diagnosis);
            
            // Add to history
            const history = window.AutoCareState.get('diagnostics.history') || [];
            history.unshift({
                ...diagnosis,
                timestamp: new Date().toISOString(),
                description: data.description
            });
            window.AutoCareState.set('diagnostics.history', history.slice(0, 10)); // Keep last 10

            // Emit result event
            window.AutoCareEvents.emit(window.Events.DIAGNOSTIC_RESULT, diagnosis);

            // Show results section
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) {
                resultsSection.classList.remove('hidden');
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }

        } catch (error) {
            console.error('Diagnostic error:', error);
            window.AutoCareEvents.emit(window.Events.DIAGNOSTIC_ERROR, error);
            window.AutoCareUI.notify('Failed to process diagnostic', 'error');
        } finally {
            window.AutoCareState.set('diagnostics.loading', false);
        }
    },

    renderResults(diagnosis) {
        this.renderCauses(diagnosis.causes);
        this.renderHealth(diagnosis);
        this.renderParts(diagnosis.parts);
        this.renderFollowUp(diagnosis);

        // Reinitialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    renderCauses(causes) {
        const list = document.getElementById('causes-list');
        if (!list) return;

        list.innerHTML = causes.map(cause => `
            <li class="py-1">
                <div class="flex items-start">
                    <span class="text-red-600 mr-2">•</span>
                    <span>${cause}</span>
                </div>
            </li>
        `).join('');
    },

    renderHealth(diagnosis) {
        const indicator = document.getElementById('health-indicator');
        const description = document.getElementById('health-description');
        
        if (!indicator || !description) return;

        // Use enhanced urgency level if available
        const urgencyLevel = diagnosis.urgencyLevel || {
            label: diagnosis.severity?.toUpperCase() || 'UNKNOWN',
            color: diagnosis.severity === 'high' ? 'red' : diagnosis.severity === 'medium' ? 'yellow' : 'gray',
            icon: 'alert-circle',
            message: 'Professional diagnosis recommended'
        };

        const colorMap = {
            red: 'bg-red-500',
            orange: 'bg-orange-500',
            yellow: 'bg-yellow-500',
            green: 'bg-green-500',
            gray: 'bg-gray-500'
        };

        const healthScore = diagnosis.healthScore || (100 - (diagnosis.healthImpact || 50));
        const confidence = Math.round((diagnosis.confidence || 0.5) * 100);

        indicator.innerHTML = `
            <!-- Urgency Badge -->
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center px-3 py-1 rounded-full bg-${urgencyLevel.color}-100 text-${urgencyLevel.color}-800">
                    <i data-lucide="${urgencyLevel.icon}" class="w-4 h-4 mr-1"></i>
                    <span class="text-sm font-semibold">${urgencyLevel.label} URGENCY</span>
                </div>
                <div class="text-sm text-gray-600">
                    Confidence: ${confidence}%
                </div>
            </div>
            
            <!-- Health Score Bar -->
            <div class="mb-2">
                <div class="flex justify-between text-sm mb-1">
                    <span class="font-medium">Vehicle Health Score</span>
                    <span class="font-bold text-${urgencyLevel.color}-600">${healthScore}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="${colorMap[urgencyLevel.color]} h-3 rounded-full transition-all duration-500" 
                        style="width: ${healthScore}%"></div>
                </div>
            </div>
            
            <!-- Cost Estimate -->
            ${diagnosis.costEstimate ? `
                <div class="mt-3 p-2 bg-gray-50 rounded">
                    <div class="text-sm text-gray-600">Estimated Repair Cost</div>
                    <div class="font-bold text-lg">$${diagnosis.costEstimate.min} - $${diagnosis.costEstimate.max}</div>
                    ${diagnosis.repairTime ? `<div class="text-sm text-gray-500">Repair Time: ${diagnosis.repairTime}</div>` : ''}
                </div>
            ` : ''}
        `;

        description.innerHTML = `
            <div class="space-y-2">
                <p class="font-medium text-${urgencyLevel.color}-700">${urgencyLevel.message}</p>
                ${diagnosis.recommendations ? `
                    <div class="mt-3">
                        <p class="font-semibold text-sm mb-1">Recommendations:</p>
                        <ul class="text-sm space-y-1">
                            ${diagnosis.recommendations.slice(0, 3).map(r => `
                                <li class="flex items-start">
                                    <i data-lucide="chevron-right" class="w-4 h-4 mr-1 text-red-500 flex-shrink-0 mt-0.5"></i>
                                    <span>${r}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;

        // Reinitialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    renderParts(parts) {
        const list = document.getElementById('parts-list');
        if (!list) return;

        if (!parts || parts.length === 0) {
            list.innerHTML = '<li class="text-gray-500">No specific parts recommended</li>';
            return;
        }

        list.innerHTML = parts.map(part => `
            <li class="py-1">
                <div class="flex items-center justify-between">
                    <span>${part}</span>
                    <button class="text-red-600 hover:text-red-800 part-add-btn" data-part="${part}">
                        <i data-lucide="plus-circle" class="w-5 h-5"></i>
                    </button>
                </div>
            </li>
        `).join('');

        // Add event listeners to part buttons
        list.querySelectorAll('.part-add-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const part = btn.getAttribute('data-part');
                window.AutoCareUI.notify(`Added ${part} to inquiry list`, 'success');
            });
        });
    },

    renderFollowUp(diagnosis) {
        if (!diagnosis.additionalQuestions || diagnosis.additionalQuestions.length === 0) {
            const container = document.getElementById('follow-up-container');
            if (container) container.classList.add('hidden');
            return;
        }

        let container = document.getElementById('follow-up-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'follow-up-container';
            container.className = 'mt-8 bg-red-50 rounded-xl p-6 border border-red-100';
            const resultsGrid = document.querySelector('#results-section .grid');
            if (resultsGrid) {
                resultsGrid.parentNode.insertBefore(container, resultsGrid.nextSibling);
            }
        }

        container.classList.remove('hidden');
        container.innerHTML = `
            <div class="flex items-center mb-4">
                <i data-lucide="help-circle" class="w-6 h-6 text-red-600 mr-2"></i>
                <h4 class="text-xl font-semibold">Refine Your Diagnosis</h4>
            </div>
            <p class="mb-4 text-gray-700">Answer these questions to improve accuracy:</p>
            <div class="space-y-4">
                ${diagnosis.additionalQuestions.map((q, i) => `
                    <div class="follow-up-question">
                        <p class="font-medium mb-2">${q}</p>
                        <div class="flex space-x-2">
                            <button class="follow-up-btn px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50" 
                                data-question="${i}" data-answer="yes">Yes</button>
                            <button class="follow-up-btn px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50" 
                                data-question="${i}" data-answer="no">No</button>
                            <button class="follow-up-btn px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50" 
                                data-question="${i}" data-answer="unsure">Not Sure</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add event listeners
        container.querySelectorAll('.follow-up-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const questionIndex = parseInt(btn.getAttribute('data-question'));
                const answer = btn.getAttribute('data-answer');
                const question = diagnosis.additionalQuestions[questionIndex];
                
                this.handleFollowUp(question, answer, btn);
            });
        });
    },

    handleFollowUp(question, answer, btn) {
        const refined = this.ai.answerFollowUp(question, answer);
        if (refined) {
            window.AutoCareState.set('diagnostics.current', refined);
            
            // Disable question buttons
            const questionEl = btn.closest('.follow-up-question');
            questionEl.querySelectorAll('button').forEach(b => {
                b.disabled = true;
                b.classList.add('opacity-50');
            });
            btn.classList.remove('opacity-50');
            btn.classList.add('bg-red-50', 'border-red-300');
        }
    },

    getUploadedMedia() {
        if (window.mediaUploadUtils) {
            return window.mediaUploadUtils.getUploadedMediaFiles();
        }
        return [];
    },

    getCurrentSeason() {
        // Determine season based on month (for West Africa)
        const month = new Date().getMonth();
        
        // Rainy season: April-October (months 3-9)
        if (month >= 3 && month <= 9) {
            return 'rainy';
        }
        
        // Dry/Harmattan season: November-March
        return 'dry';
    },

    enhanceWithMedia(diagnosis, mediaFiles) {
        if (window.mediaUploadUtils) {
            return window.mediaUploadUtils.enhanceDiagnosisWithMedia(diagnosis, mediaFiles);
        }
        return diagnosis;
    }
};

// Register module
window.AutoCareApp.register('diagnostics', DiagnosticsModule);
