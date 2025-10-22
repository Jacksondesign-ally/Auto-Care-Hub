/**
 * AutoCare Homepage Carousel
 * Sliding hero section with advertising support
 */

const HomepageCarouselModule = {
    currentSlide: 0,
    autoPlayInterval: null,
    slides: [
        {
            id: 1,
            type: 'hero',
            title: 'AI-Powered Vehicle Diagnostics',
            subtitle: 'Get instant, accurate diagnosis for your vehicle issues',
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=600&fit=crop',
            cta: {
                text: 'Start Diagnosis',
                action: 'diagnostics'
            },
            gradient: 'from-red-600 to-red-800'
        },
        {
            id: 2,
            type: 'feature',
            title: 'Find Trusted Mechanics Near You',
            subtitle: 'Connect with verified mechanics in your area',
            image: 'https://images.unsplash.com/photo-1632823469850-1b4e1e5f6c3f?w=1200&h=600&fit=crop',
            cta: {
                text: 'Browse Mechanics',
                action: 'mechanics'
            },
            gradient: 'from-orange-600 to-red-700'
        },
        {
            id: 3,
            type: 'marketplace',
            title: 'Quality Auto Parts Marketplace',
            subtitle: 'Shop genuine parts from verified sellers',
            image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=600&fit=crop',
            cta: {
                text: 'Shop Parts',
                action: 'parts'
            },
            gradient: 'from-red-700 to-orange-600'
        },
        {
            id: 4,
            type: 'sales',
            title: 'Buy & Sell Vehicles',
            subtitle: 'Browse our curated selection of quality vehicles',
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=600&fit=crop',
            cta: {
                text: 'View Listings',
                action: 'sales'
            },
            gradient: 'from-gray-800 to-red-700'
        },
        {
            id: 5,
            type: 'ad',
            title: 'Premium Brake Service',
            subtitle: 'Get 20% off on all brake repairs this month',
            image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1200&h=600&fit=crop',
            sponsor: 'AutoCare Partners',
            cta: {
                text: 'Learn More',
                action: 'external',
                url: '#'
            },
            gradient: 'from-blue-600 to-blue-800'
        }
    ],

    async init() {
        this.createCarousel();
        this.setupControls();
        this.startAutoPlay();
        this.setupEventListeners();
    },

    createCarousel() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        // Replace hero section with carousel
        heroSection.innerHTML = `
            <div class="homepage-carousel relative overflow-hidden">
                <!-- Slides Container -->
                <div class="carousel-slides relative h-[600px] md:h-[500px]">
                    ${this.slides.map((slide, index) => this.createSlide(slide, index)).join('')}
                </div>

                <!-- Navigation Arrows -->
                <button class="carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all backdrop-blur-sm">
                    <i data-lucide="chevron-left" class="w-6 h-6 text-white"></i>
                </button>
                <button class="carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 p-3 rounded-full transition-all backdrop-blur-sm">
                    <i data-lucide="chevron-right" class="w-6 h-6 text-white"></i>
                </button>

                <!-- Dots Indicator -->
                <div class="carousel-dots absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                    ${this.slides.map((_, index) => `
                        <button class="carousel-dot w-3 h-3 rounded-full transition-all ${index === 0 ? 'bg-white w-8' : 'bg-white bg-opacity-50'}" 
                            data-index="${index}"></button>
                    `).join('')}
                </div>

                <!-- Progress Bar -->
                <div class="carousel-progress absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-20 z-20">
                    <div class="carousel-progress-bar h-full bg-white transition-all duration-300" style="width: 0%"></div>
                </div>
            </div>
        `;

        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    createSlide(slide, index) {
        const isAd = slide.type === 'ad';
        return `
            <div class="carousel-slide absolute inset-0 transition-all duration-700 ${index === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}" 
                data-index="${index}">
                <!-- Background Image with Overlay -->
                <div class="absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90"></div>
                <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${slide.image}'); mix-blend-mode: overlay; opacity: 0.3;"></div>
                
                <!-- Content -->
                <div class="relative h-full container flex items-center">
                    <div class="max-w-2xl text-white">
                        ${isAd ? `<div class="inline-block bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                            <i data-lucide="zap" class="w-4 h-4 inline mr-1"></i>
                            Sponsored
                        </div>` : ''}
                        
                        <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                            ${slide.title}
                        </h1>
                        <p class="text-xl md:text-2xl mb-8 text-white text-opacity-90 animate-fade-in-delay">
                            ${slide.subtitle}
                        </p>
                        
                        ${slide.sponsor ? `<p class="text-sm mb-4 text-white text-opacity-75">By ${slide.sponsor}</p>` : ''}
                        
                        <button class="carousel-cta btn-primary text-lg px-8 py-3 animate-fade-in-delay-2" 
                            data-action="${slide.cta.action}" 
                            ${slide.cta.url ? `data-url="${slide.cta.url}"` : ''}>
                            ${slide.cta.text}
                            <i data-lucide="arrow-right" class="w-5 h-5 ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    setupControls() {
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const dots = document.querySelectorAll('.carousel-dot');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousSlide();
                this.resetAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // CTA buttons
        document.querySelectorAll('.carousel-cta').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const url = btn.getAttribute('data-url');
                this.handleCTA(action, url);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Touch/swipe support
        this.setupTouchControls();
    },

    setupTouchControls() {
        const carousel = document.querySelector('.homepage-carousel');
        if (!carousel) return;

        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) this.nextSlide();
            if (touchEndX > touchStartX + 50) this.previousSlide();
        };

        this.handleSwipe = handleSwipe;
    },

    setupEventListeners() {
        // Pause on hover
        const carousel = document.querySelector('.homepage-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    },

    nextSlide() {
        this.goToSlide((this.currentSlide + 1) % this.slides.length);
    },

    previousSlide() {
        this.goToSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length);
    },

    goToSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');

        // Hide current slide
        slides[this.currentSlide].classList.remove('opacity-100', 'translate-x-0');
        slides[this.currentSlide].classList.add('opacity-0', 'translate-x-full');

        // Update current slide
        this.currentSlide = index;

        // Show new slide
        slides[this.currentSlide].classList.remove('opacity-0', 'translate-x-full');
        slides[this.currentSlide].classList.add('opacity-100', 'translate-x-0');

        // Update dots
        dots.forEach((dot, i) => {
            if (i === this.currentSlide) {
                dot.classList.add('w-8', 'bg-white');
                dot.classList.remove('bg-opacity-50');
            } else {
                dot.classList.remove('w-8');
                dot.classList.add('bg-opacity-50');
            }
        });

        // Reinitialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Update progress bar
        this.updateProgress();
    },

    updateProgress() {
        const progressBar = document.querySelector('.carousel-progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = '100%';
                progressBar.style.transition = 'width 5000ms linear';
            }, 50);
        }
    },

    startAutoPlay() {
        this.pauseAutoPlay();
        this.updateProgress();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    },

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },

    resetAutoPlay() {
        this.startAutoPlay();
    },

    handleCTA(action, url) {
        if (action === 'external' && url) {
            window.open(url, '_blank');
            return;
        }

        // Map actions to tabs or sections
        const actionMap = {
            'diagnostics': 'diagnostics',
            'mechanics': 'mechanics',
            'parts': 'parts',
            'sales': 'sales'
        };

        const tab = actionMap[action];
        if (tab) {
            if (tab === 'diagnostics') {
                // Scroll to diagnostic form
                const diagnosticSection = document.querySelector('.hero-section').nextElementSibling;
                if (diagnosticSection) {
                    diagnosticSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (tab === 'sales') {
                window.AutoCareEvents.emit(window.Events.TAB_CHANGE, { tab: 'sales' });
            } else if (tab === 'mechanics') {
                // Scroll to mechanics section
                const mechanicsSection = document.querySelector('#mechanics-section');
                if (mechanicsSection) {
                    mechanicsSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (tab === 'parts') {
                // Future: Navigate to parts marketplace
                window.AutoCareUI.notify('Parts marketplace coming soon!', 'info');
            }
        }
    }
};

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out;
    }
    
    .animate-fade-in-delay {
        animation: fadeIn 0.8s ease-out 0.2s both;
    }
    
    .animate-fade-in-delay-2 {
        animation: fadeIn 0.8s ease-out 0.4s both;
    }
    
    .carousel-slide {
        transition: opacity 0.7s ease-in-out, transform 0.7s ease-in-out;
    }
`;
document.head.appendChild(style);

// Register module
window.AutoCareApp.register('homepage', HomepageCarouselModule);
