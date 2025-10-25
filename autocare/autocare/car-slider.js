// Car Sales Slider Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Create the featured cars slider section
    createFeaturedCarsSlider();
    
    // Initialize the slider functionality
    initSlider();
    
    // Add event listener for tab switching to ensure slider works when tab is shown
    const carSalesTab = document.getElementById('car-sales-tab');
    if (carSalesTab) {
        carSalesTab.addEventListener('click', function() {
            // Reinitialize slider when tab is shown
            setTimeout(initSlider, 100); // Small delay to ensure DOM is updated
        });
    }
});

// Create the featured cars slider HTML structure
function createFeaturedCarsSlider() {
    const carSalesSection = document.getElementById('car-sales-section');
    if (!carSalesSection) return;
    
    // Create slider container
    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'featured-cars-slider mb-8';
    sliderContainer.innerHTML = `
        <div class="bg-gradient-to-r from-red-600 to-red-800 text-white py-6 px-8 rounded-t-xl">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">Featured Commercial Vehicles</h2>
                    <p class="text-white text-opacity-80">Premium selections for your business needs</p>
                </div>
                <div class="slider-controls flex space-x-2">
                    <button id="prev-slide" class="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
                        <i data-lucide="chevron-left" class="w-5 h-5 text-white"></i>
                    </button>
                    <button id="next-slide" class="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all">
                        <i data-lucide="chevron-right" class="w-5 h-5 text-white"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-b-xl shadow-lg overflow-hidden">
            <div class="slider-track-container overflow-hidden relative">
                <div class="slider-track flex transition-transform duration-500 ease-in-out p-6">
                    <!-- Slide 1 -->
                    <div class="slider-slide w-full md:w-1/3 flex-none px-4">
                        <div class="commercial-vehicle-card bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div class="relative">
                                <img src="https://placehold.co/600x400/2c3e50/ffffff?text=Ford+Transit+Van" alt="Ford Transit Van" class="w-full h-48 object-cover">
                                <div class="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-lg font-medium">Commercial</div>
                                <div class="absolute bottom-0 right-0 bg-green-600 text-white px-3 py-1 rounded-tl-lg font-medium">$32,500</div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-bold text-gray-800">2022 Ford Transit Cargo Van</h3>
                                <div class="flex items-center mt-2 text-sm text-gray-600">
                                    <span class="flex items-center mr-3"><i data-lucide="gauge" class="w-4 h-4 mr-1"></i> 15,000 mi</span>
                                    <span class="flex items-center"><i data-lucide="map-pin" class="w-4 h-4 mr-1"></i> Phoenix, AZ</span>
                                </div>
                                <p class="mt-3 text-sm text-gray-700">Perfect for delivery services or mobile business. Low mileage, excellent condition.</p>
                                <div class="mt-4">
                                    <button class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors">View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Slide 2 -->
                    <div class="slider-slide w-full md:w-1/3 flex-none px-4">
                        <div class="commercial-vehicle-card bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div class="relative">
                                <img src="https://placehold.co/600x400/27ae60/ffffff?text=Mercedes+Sprinter" alt="Mercedes Sprinter" class="w-full h-48 object-cover">
                                <div class="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-lg font-medium">Commercial</div>
                                <div class="absolute bottom-0 right-0 bg-green-600 text-white px-3 py-1 rounded-tl-lg font-medium">$45,900</div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-bold text-gray-800">2021 Mercedes-Benz Sprinter</h3>
                                <div class="flex items-center mt-2 text-sm text-gray-600">
                                    <span class="flex items-center mr-3"><i data-lucide="gauge" class="w-4 h-4 mr-1"></i> 28,500 mi</span>
                                    <span class="flex items-center"><i data-lucide="map-pin" class="w-4 h-4 mr-1"></i> Scottsdale, AZ</span>
                                </div>
                                <p class="mt-3 text-sm text-gray-700">High-roof model with custom shelving. Ideal for mobile service business.</p>
                                <div class="mt-4">
                                    <button class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors">View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Slide 3 -->
                    <div class="slider-slide w-full md:w-1/3 flex-none px-4">
                        <div class="commercial-vehicle-card bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div class="relative">
                                <img src="https://placehold.co/600x400/e74c3c/ffffff?text=Chevrolet+Silverado" alt="Chevrolet Silverado" class="w-full h-48 object-cover">
                                <div class="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-lg font-medium">Commercial</div>
                                <div class="absolute bottom-0 right-0 bg-green-600 text-white px-3 py-1 rounded-tl-lg font-medium">$38,750</div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-bold text-gray-800">2020 Chevrolet Silverado 2500HD</h3>
                                <div class="flex items-center mt-2 text-sm text-gray-600">
                                    <span class="flex items-center mr-3"><i data-lucide="gauge" class="w-4 h-4 mr-1"></i> 42,000 mi</span>
                                    <span class="flex items-center"><i data-lucide="map-pin" class="w-4 h-4 mr-1"></i> Mesa, AZ</span>
                                </div>
                                <p class="mt-3 text-sm text-gray-700">Heavy-duty work truck with towing package. Perfect for construction or landscaping.</p>
                                <div class="mt-4">
                                    <button class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors">View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Slide 4 -->
                    <div class="slider-slide w-full md:w-1/3 flex-none px-4">
                        <div class="commercial-vehicle-card bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div class="relative">
                                <img src="https://placehold.co/600x400/3498db/ffffff?text=Ram+ProMaster" alt="Ram ProMaster" class="w-full h-48 object-cover">
                                <div class="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 rounded-br-lg font-medium">Commercial</div>
                                <div class="absolute bottom-0 right-0 bg-green-600 text-white px-3 py-1 rounded-tl-lg font-medium">$29,900</div>
                            </div>
                            <div class="p-4">
                                <h3 class="text-lg font-bold text-gray-800">2021 Ram ProMaster City</h3>
                                <div class="flex items-center mt-2 text-sm text-gray-600">
                                    <span class="flex items-center mr-3"><i data-lucide="gauge" class="w-4 h-4 mr-1"></i> 18,200 mi</span>
                                    <span class="flex items-center"><i data-lucide="map-pin" class="w-4 h-4 mr-1"></i> Tempe, AZ</span>
                                </div>
                                <p class="mt-3 text-sm text-gray-700">Compact cargo van with excellent fuel economy. Ideal for urban deliveries.</p>
                                <div class="mt-4">
                                    <button class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors">View Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slider-dots flex justify-center p-4 space-x-2">
                <button class="slider-dot w-3 h-3 rounded-full bg-red-500" data-index="0"></button>
                <button class="slider-dot w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400" data-index="1"></button>
                <button class="slider-dot w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400" data-index="2"></button>
                <button class="slider-dot w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400" data-index="3"></button>
            </div>
        </div>
    `;
    
    // Insert at the beginning of the car sales section
    carSalesSection.insertBefore(sliderContainer, carSalesSection.firstChild);
    
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Initialize slider functionality
function initSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!sliderTrack || !prevButton || !nextButton) return;
    
    let currentSlide = 0;
    let slideWidth = 100; // Percentage
    const slideCount = document.querySelectorAll('.slider-slide').length;
    
    // Set initial position
    updateSliderPosition();
    
    // Add event listeners for controls
    prevButton.addEventListener('click', () => {
        currentSlide = Math.max(0, currentSlide - 1);
        updateSliderPosition();
    });
    
    nextButton.addEventListener('click', () => {
        currentSlide = Math.min(slideCount - 1, currentSlide + 1);
        updateSliderPosition();
    });
    
    // Add event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSliderPosition();
        });
    });
    
    // Auto-advance slider every 5 seconds
    let autoSlideInterval = setInterval(autoAdvance, 5000);
    
    // Pause auto-advance on hover
    const sliderContainer = document.querySelector('.featured-cars-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(autoAdvance, 5000);
        });
    }
    
    // Function to auto-advance the slider
    function autoAdvance() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSliderPosition();
    }
    
    // Function to update slider position
    function updateSliderPosition() {
        // Calculate slide width based on screen size
        if (window.innerWidth >= 768) { // md breakpoint
            slideWidth = 33.333; // Show 3 slides at once on medium screens and up
        } else {
            slideWidth = 100; // Show 1 slide on small screens
        }
        
        // Update slider track position
        sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('bg-red-500');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('bg-red-500');
                dot.classList.add('bg-gray-300');
            }
        });
        
        // Update button states
        prevButton.disabled = currentSlide === 0;
        prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextButton.disabled = currentSlide === slideCount - 1;
        nextButton.style.opacity = currentSlide === slideCount - 1 ? '0.5' : '1';
    }
    
    // Handle window resize
    window.addEventListener('resize', updateSliderPosition);
}