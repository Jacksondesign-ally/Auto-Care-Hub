/**
 * AutoCare Voice Input Module
 * Multi-language voice-to-text with local dialect support
 */

const VoiceInputModule = {
    recognition: null,
    isListening: false,
    currentLanguage: 'en-US',

    // Supported languages and dialects
    languages: {
        'en-US': { name: 'English (US)', flag: '🇺🇸' },
        'en-GB': { name: 'English (UK)', flag: '🇬🇧' },
        'en-NG': { name: 'English (Nigeria)', flag: '🇳🇬' },
        'en-KE': { name: 'English (Kenya)', flag: '🇰🇪' },
        'en-GH': { name: 'English (Ghana)', flag: '🇬🇭' },
        'en-ZA': { name: 'English (South Africa)', flag: '🇿🇦' },
        'sw-KE': { name: 'Swahili (Kenya)', flag: '🇰🇪' },
        'sw-TZ': { name: 'Swahili (Tanzania)', flag: '🇹🇿' },
        'yo-NG': { name: 'Yoruba (Nigeria)', flag: '🇳🇬' },
        'ig-NG': { name: 'Igbo (Nigeria)', flag: '🇳🇬' },
        'ha-NG': { name: 'Hausa (Nigeria)', flag: '🇳🇬' },
        'fr-FR': { name: 'French', flag: '🇫🇷' },
        'fr-CI': { name: 'French (Ivory Coast)', flag: '🇨🇮' },
        'ar-EG': { name: 'Arabic (Egypt)', flag: '🇪🇬' }
    },

    // Common automotive phrases in different languages
    phrases: {
        'en': {
            start: ['start diagnosis', 'begin', 'help me'],
            stop: ['stop', 'cancel', 'never mind']
        },
        'sw': {
            start: ['anza', 'saidia', 'nisaidie'],
            stop: ['acha', 'sitaki']
        },
        'yo': {
            start: ['bẹ̀rẹ̀', 'ràn mí lọ́wọ́'],
            stop: ['dúró', 'mi ò fẹ́']
        },
        'fr': {
            start: ['commencer', 'aide-moi', 'démarrer'],
            stop: ['arrêter', 'annuler']
        }
    },

    async init() {
        console.log('[VoiceInput] Initializing...');
        
        // Check browser support
        if (!this.checkSupport()) {
            console.warn('[VoiceInput] Speech recognition not supported');
            return;
        }

        this.setupRecognition();
        this.setupUI();
        this.setupEventListeners();
    },

    /**
     * Check browser support for speech recognition
     */
    checkSupport() {
        return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    },

    /**
     * Setup speech recognition
     */
    setupRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();

        // Configure recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 3;
        this.recognition.lang = this.currentLanguage;

        // Event handlers
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI('listening');
            window.AutoCareEvents?.emit('voice:start');
        };

        this.recognition.onresult = (event) => {
            this.handleResult(event);
        };

        this.recognition.onerror = (event) => {
            this.handleError(event);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI('idle');
            window.AutoCareEvents?.emit('voice:end');
        };
    },

    /**
     * Setup voice input UI
     */
    setupUI() {
        // Add voice button to diagnostic form
        const diagnosticForm = document.getElementById('diagnostic-form');
        if (!diagnosticForm) return;

        const descriptionInput = diagnosticForm.querySelector('textarea, input[type="text"]');
        if (!descriptionInput) return;

        // Create voice button
        const voiceBtn = document.createElement('button');
        voiceBtn.type = 'button';
        voiceBtn.id = 'voice-input-btn';
        voiceBtn.className = 'voice-btn p-2 rounded-full hover:bg-red-50 transition-colors';
        voiceBtn.innerHTML = '<i data-lucide="mic" class="w-5 h-5 text-red-600"></i>';
        voiceBtn.title = 'Voice input';

        // Add click handler
        voiceBtn.addEventListener('click', () => this.toggleListening());

        // Insert button next to input
        const container = descriptionInput.parentElement;
        if (container) {
            container.style.position = 'relative';
            voiceBtn.style.position = 'absolute';
            voiceBtn.style.right = '10px';
            voiceBtn.style.top = '50%';
            voiceBtn.style.transform = 'translateY(-50%)';
            container.appendChild(voiceBtn);
        }

        // Create language selector
        this.createLanguageSelector();

        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    /**
     * Create language selector dropdown
     */
    createLanguageSelector() {
        const header = document.querySelector('header .container');
        if (!header) return;

        const selector = document.createElement('div');
        selector.className = 'language-selector relative';
        selector.innerHTML = `
            <button class="language-btn flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <i data-lucide="globe" class="w-5 h-5 text-gray-600"></i>
                <span class="language-name text-sm font-medium">${this.languages[this.currentLanguage].flag}</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-gray-600"></i>
            </button>
            <div class="language-dropdown hidden absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
                ${Object.entries(this.languages).map(([code, lang]) => `
                    <button class="language-option w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-2" data-lang="${code}">
                        <span class="text-xl">${lang.flag}</span>
                        <span class="text-sm">${lang.name}</span>
                    </button>
                `).join('')}
            </div>
        `;

        // Add to header
        const nav = header.querySelector('nav');
        if (nav) {
            header.insertBefore(selector, nav);
        }

        // Setup dropdown
        const btn = selector.querySelector('.language-btn');
        const dropdown = selector.querySelector('.language-dropdown');

        btn.addEventListener('click', () => {
            dropdown.classList.toggle('hidden');
        });

        // Language selection
        selector.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.getAttribute('data-lang');
                this.setLanguage(lang);
                dropdown.classList.add('hidden');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!selector.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });

        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + V to toggle voice
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
                e.preventDefault();
                this.toggleListening();
            }
        });
    },

    /**
     * Toggle listening state
     */
    toggleListening() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    },

    /**
     * Start listening
     */
    startListening() {
        if (!this.recognition) {
            window.AutoCareUI?.notify('Voice input not supported in this browser', 'error');
            return;
        }

        try {
            this.recognition.start();
        } catch (error) {
            console.error('[VoiceInput] Start error:', error);
            window.AutoCareUI?.notify('Could not start voice input', 'error');
        }
    },

    /**
     * Stop listening
     */
    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    },

    /**
     * Handle recognition result
     */
    handleResult(event) {
        const results = event.results;
        const lastResult = results[results.length - 1];
        
        // Get transcript
        const transcript = lastResult[0].transcript;
        const confidence = lastResult[0].confidence;
        const isFinal = lastResult.isFinal;

        // Update UI with interim results
        this.updateTranscript(transcript, isFinal);

        // If final, process the input
        if (isFinal) {
            this.processTranscript(transcript, confidence);
        }

        // Emit event
        window.AutoCareEvents?.emit('voice:result', {
            transcript,
            confidence,
            isFinal,
            language: this.currentLanguage
        });
    },

    /**
     * Handle recognition error
     */
    handleError(event) {
        console.error('[VoiceInput] Error:', event.error);
        
        const errorMessages = {
            'no-speech': 'No speech detected. Please try again.',
            'audio-capture': 'Microphone not accessible. Check permissions.',
            'not-allowed': 'Microphone permission denied.',
            'network': 'Network error. Check your connection.'
        };

        const message = errorMessages[event.error] || 'Voice input error occurred';
        window.AutoCareUI?.notify(message, 'error');

        this.updateUI('error');
    },

    /**
     * Update transcript in UI
     */
    updateTranscript(transcript, isFinal) {
        const diagnosticForm = document.getElementById('diagnostic-form');
        if (!diagnosticForm) return;

        const input = diagnosticForm.querySelector('textarea, input[type="text"]');
        if (!input) return;

        if (isFinal) {
            // Append to existing text
            const currentText = input.value.trim();
            input.value = currentText ? `${currentText} ${transcript}` : transcript;
        } else {
            // Show interim result (optional)
            input.placeholder = `Listening: "${transcript}"...`;
        }
    },

    /**
     * Process final transcript
     */
    processTranscript(transcript, confidence) {
        // Check for commands
        const command = this.detectCommand(transcript);
        
        if (command) {
            this.executeCommand(command);
            return;
        }

        // Translate if needed
        const translatedText = this.translateIfNeeded(transcript);

        // Emit processed transcript
        window.AutoCareEvents?.emit('voice:processed', {
            original: transcript,
            translated: translatedText,
            confidence: confidence,
            language: this.currentLanguage
        });

        // Auto-submit if confidence is high
        if (confidence > 0.8 && translatedText.length > 10) {
            window.AutoCareUI?.notify('Voice input captured successfully', 'success');
        }
    },

    /**
     * Detect voice commands
     */
    detectCommand(transcript) {
        const lower = transcript.toLowerCase();
        const langCode = this.currentLanguage.split('-')[0];
        const phrases = this.phrases[langCode] || this.phrases['en'];

        if (phrases.start.some(phrase => lower.includes(phrase))) {
            return 'start';
        }

        if (phrases.stop.some(phrase => lower.includes(phrase))) {
            return 'stop';
        }

        return null;
    },

    /**
     * Execute voice command
     */
    executeCommand(command) {
        switch (command) {
            case 'start':
                // Trigger diagnostic
                const form = document.getElementById('diagnostic-form');
                if (form) {
                    form.dispatchEvent(new Event('submit'));
                }
                break;
            case 'stop':
                this.stopListening();
                break;
        }
    },

    /**
     * Translate if needed (basic - use proper API in production)
     */
    translateIfNeeded(text) {
        // If not English, would translate here
        // In production, use Google Translate API or similar
        return text;
    },

    /**
     * Set language
     */
    setLanguage(languageCode) {
        this.currentLanguage = languageCode;
        
        if (this.recognition) {
            this.recognition.lang = languageCode;
        }

        // Update UI
        const langName = document.querySelector('.language-name');
        if (langName) {
            langName.textContent = this.languages[languageCode].flag;
        }

        window.AutoCareUI?.notify(
            `Language changed to ${this.languages[languageCode].name}`,
            'success'
        );

        // Emit event
        window.AutoCareEvents?.emit('voice:language:change', {
            language: languageCode,
            name: this.languages[languageCode].name
        });
    },

    /**
     * Update UI state
     */
    updateUI(state) {
        const voiceBtn = document.getElementById('voice-input-btn');
        if (!voiceBtn) return;

        const icon = voiceBtn.querySelector('i');
        if (!icon) return;

        switch (state) {
            case 'listening':
                voiceBtn.classList.add('bg-red-500');
                icon.classList.add('text-white');
                icon.classList.remove('text-red-600');
                voiceBtn.classList.add('animate-pulse');
                break;
            case 'idle':
                voiceBtn.classList.remove('bg-red-500', 'animate-pulse');
                icon.classList.remove('text-white');
                icon.classList.add('text-red-600');
                break;
            case 'error':
                voiceBtn.classList.remove('bg-red-500', 'animate-pulse');
                voiceBtn.classList.add('bg-red-100');
                setTimeout(() => {
                    voiceBtn.classList.remove('bg-red-100');
                }, 1000);
                break;
        }
    }
};

// Register module
window.VoiceInputModule = VoiceInputModule;
window.AutoCareApp?.register('voice', VoiceInputModule);
