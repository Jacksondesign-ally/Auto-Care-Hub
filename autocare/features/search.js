/**
 * AutoCare Global Search Module
 * Search across parts, mechanics, and vehicles
 */

const SearchModule = {
    searchIndex: null,

    async init() {
        this.buildSearchIndex();
        this.setupSearchUI();
        this.setupEventListeners();
    },

    buildSearchIndex() {
        this.searchIndex = {
            parts: window.MarketplaceData?.parts || [],
            mechanics: window.MarketplaceData?.mechanics || [],
            vehicles: window.MarketplaceData?.vehicles || []
        };
    },

    setupSearchUI() {
        const header = document.querySelector('header .container');
        if (!header) return;

        // Add search bar to header
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container relative flex-1 max-w-xl mx-4';
        searchContainer.innerHTML = `
            <div class="relative">
                <input type="text" 
                    id="global-search" 
                    placeholder="Search parts, mechanics, vehicles..." 
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <i data-lucide="search" class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
            </div>
            <div id="search-results" class="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto hidden z-50">
                <!-- Results will be inserted here -->
            </div>
        `;

        // Insert after logo
        const nav = header.querySelector('nav');
        if (nav) {
            header.insertBefore(searchContainer, nav);
        }

        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    setupEventListeners() {
        const searchInput = document.getElementById('global-search');
        const searchResults = document.getElementById('search-results');

        if (!searchInput) return;

        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const query = e.target.value.trim();

            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }

            debounceTimer = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });

        // Close results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });

        // Show results when focusing input with text
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length >= 2) {
                searchResults.classList.remove('hidden');
            }
        });
    },

    performSearch(query) {
        const results = {
            parts: this.searchParts(query),
            mechanics: this.searchMechanics(query),
            vehicles: this.searchVehicles(query)
        };

        this.displayResults(results, query);
    },

    searchParts(query) {
        const lowerQuery = query.toLowerCase();
        return this.searchIndex.parts.filter(part => 
            part.name.toLowerCase().includes(lowerQuery) ||
            part.category.toLowerCase().includes(lowerQuery) ||
            part.brand.toLowerCase().includes(lowerQuery) ||
            part.description.toLowerCase().includes(lowerQuery)
        ).slice(0, 5);
    },

    searchMechanics(query) {
        const lowerQuery = query.toLowerCase();
        return this.searchIndex.mechanics.filter(mechanic =>
            mechanic.name.toLowerCase().includes(lowerQuery) ||
            mechanic.location.city.toLowerCase().includes(lowerQuery) ||
            mechanic.specialties.some(s => s.toLowerCase().includes(lowerQuery)) ||
            mechanic.services.some(s => s.toLowerCase().includes(lowerQuery))
        ).slice(0, 5);
    },

    searchVehicles(query) {
        const lowerQuery = query.toLowerCase();
        return this.searchIndex.vehicles.filter(vehicle =>
            vehicle.make.toLowerCase().includes(lowerQuery) ||
            vehicle.model.toLowerCase().includes(lowerQuery) ||
            `${vehicle.year}`.includes(lowerQuery) ||
            vehicle.location.city.toLowerCase().includes(lowerQuery)
        ).slice(0, 5);
    },

    displayResults(results, query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        const totalResults = results.parts.length + results.mechanics.length + results.vehicles.length;

        if (totalResults === 0) {
            searchResults.innerHTML = `
                <div class="p-4 text-center text-gray-500">
                    <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
            searchResults.classList.remove('hidden');
            if (window.lucide) window.lucide.createIcons();
            return;
        }

        let html = '<div class="p-2">';

        // Parts results
        if (results.parts.length > 0) {
            html += `
                <div class="mb-4">
                    <h4 class="text-sm font-semibold text-gray-500 uppercase px-2 mb-2">Parts (${results.parts.length})</h4>
                    ${results.parts.map(part => `
                        <a href="#" class="search-result-item block p-3 hover:bg-gray-50 rounded-lg" data-type="part" data-id="${part.id}">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-gray-200 rounded flex-shrink-0 mr-3">
                                    <img src="${part.images[0]}" alt="${part.name}" class="w-full h-full object-cover rounded">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="font-medium text-gray-900 truncate">${part.name}</p>
                                    <p class="text-sm text-gray-500">${part.brand} • $${part.price}</p>
                                </div>
                                <div class="flex items-center text-yellow-500 text-sm ml-2">
                                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                                    <span class="ml-1">${part.rating}</span>
                                </div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            `;
        }

        // Mechanics results
        if (results.mechanics.length > 0) {
            html += `
                <div class="mb-4">
                    <h4 class="text-sm font-semibold text-gray-500 uppercase px-2 mb-2">Mechanics (${results.mechanics.length})</h4>
                    ${results.mechanics.map(mechanic => `
                        <a href="#" class="search-result-item block p-3 hover:bg-gray-50 rounded-lg" data-type="mechanic" data-id="${mechanic.id}">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-red-100 rounded-full flex-shrink-0 mr-3 flex items-center justify-center">
                                    <i data-lucide="wrench" class="w-6 h-6 text-red-600"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center">
                                        <p class="font-medium text-gray-900 truncate">${mechanic.name}</p>
                                        ${mechanic.verified ? '<i data-lucide="badge-check" class="w-4 h-4 text-blue-500 ml-1"></i>' : ''}
                                    </div>
                                    <p class="text-sm text-gray-500">${mechanic.location.city} • ${mechanic.specialties[0]}</p>
                                </div>
                                <div class="flex items-center text-yellow-500 text-sm ml-2">
                                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                                    <span class="ml-1">${mechanic.rating}</span>
                                </div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            `;
        }

        // Vehicles results
        if (results.vehicles.length > 0) {
            html += `
                <div class="mb-4">
                    <h4 class="text-sm font-semibold text-gray-500 uppercase px-2 mb-2">Vehicles (${results.vehicles.length})</h4>
                    ${results.vehicles.map(vehicle => `
                        <a href="#" class="search-result-item block p-3 hover:bg-gray-50 rounded-lg" data-type="vehicle" data-id="${vehicle.id}">
                            <div class="flex items-center">
                                <div class="w-16 h-12 bg-gray-200 rounded flex-shrink-0 mr-3">
                                    <img src="${vehicle.images[0]}" alt="${vehicle.make} ${vehicle.model}" class="w-full h-full object-cover rounded">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="font-medium text-gray-900 truncate">${vehicle.year} ${vehicle.make} ${vehicle.model}</p>
                                    <p class="text-sm text-gray-500">${vehicle.mileage.toLocaleString()} mi • $${vehicle.price.toLocaleString()}</p>
                                </div>
                                <div class="text-sm ml-2">
                                    <div class="flex items-center text-green-600">
                                        <i data-lucide="heart-pulse" class="w-4 h-4 mr-1"></i>
                                        <span>${vehicle.healthScore}%</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            `;
        }

        html += '</div>';

        searchResults.innerHTML = html;
        searchResults.classList.remove('hidden');

        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Add click handlers
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const type = item.getAttribute('data-type');
                const id = item.getAttribute('data-id');
                this.handleResultClick(type, id);
            });
        });
    },

    handleResultClick(type, id) {
        // Hide search results
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.classList.add('hidden');
        }

        // Clear search input
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.value = '';
        }

        // Handle different result types
        if (type === 'part') {
            this.showPartDetails(id);
        } else if (type === 'mechanic') {
            this.showMechanicDetails(id);
        } else if (type === 'vehicle') {
            this.showVehicleDetails(id);
        }
    },

    showPartDetails(id) {
        const part = this.searchIndex.parts.find(p => p.id === id);
        if (!part) return;

        const modal = window.AutoCareUI.modal(this.createPartDetailsHTML(part), {
            title: part.name,
            size: 'xl'
        });

        document.body.appendChild(modal);
        if (window.lucide) window.lucide.createIcons();
    },

    showMechanicDetails(id) {
        const mechanic = this.searchIndex.mechanics.find(m => m.id === id);
        if (!mechanic) return;

        const modal = window.AutoCareUI.modal(this.createMechanicDetailsHTML(mechanic), {
            title: mechanic.name,
            size: 'xl'
        });

        document.body.appendChild(modal);
        if (window.lucide) window.lucide.createIcons();
    },

    showVehicleDetails(id) {
        const vehicle = this.searchIndex.vehicles.find(v => v.id === id);
        if (!vehicle) return;

        const modal = window.AutoCareUI.modal(this.createVehicleDetailsHTML(vehicle), {
            title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
            size: '2xl'
        });

        document.body.appendChild(modal);
        if (window.lucide) window.lucide.createIcons();
    },

    createPartDetailsHTML(part) {
        return `
            <div class="space-y-4">
                <img src="${part.images[0]}" alt="${part.name}" class="w-full h-64 object-cover rounded-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-3xl font-bold text-red-600">$${part.price}</p>
                        <p class="text-sm text-gray-500">${part.stock} in stock</p>
                    </div>
                    <div class="flex items-center text-yellow-500">
                        <i data-lucide="star" class="w-5 h-5 fill-current"></i>
                        <span class="ml-1 font-semibold">${part.rating}</span>
                        <span class="ml-1 text-gray-500">(${part.reviewCount} reviews)</span>
                    </div>
                </div>
                <p class="text-gray-700">${part.description}</p>
                <div class="border-t pt-4">
                    <h4 class="font-semibold mb-2">Seller</h4>
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-medium">${part.seller.name}</p>
                            <p class="text-sm text-gray-500">${part.seller.location}</p>
                        </div>
                        ${part.seller.verified ? '<span class="text-blue-600 text-sm flex items-center"><i data-lucide="badge-check" class="w-4 h-4 mr-1"></i>Verified</span>' : ''}
                    </div>
                </div>
                <button class="w-full btn-primary">Contact Seller</button>
            </div>
        `;
    },

    createMechanicDetailsHTML(mechanic) {
        return `
            <div class="space-y-4">
                <div class="flex items-start justify-between">
                    <div>
                        <div class="flex items-center mb-2">
                            <h3 class="text-xl font-bold">${mechanic.name}</h3>
                            ${mechanic.verified ? '<i data-lucide="badge-check" class="w-5 h-5 text-blue-500 ml-2"></i>' : ''}
                        </div>
                        <p class="text-gray-600">${mechanic.location.address}</p>
                        <p class="text-gray-600">${mechanic.location.city}, ${mechanic.location.country}</p>
                    </div>
                    <div class="text-right">
                        <div class="flex items-center text-yellow-500 text-lg">
                            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
                            <span class="ml-1 font-bold">${mechanic.rating}</span>
                        </div>
                        <p class="text-sm text-gray-500">${mechanic.reviewCount} reviews</p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold mb-2">Specialties</h4>
                        <ul class="space-y-1">
                            ${mechanic.specialties.map(s => `<li class="text-sm text-gray-600">• ${s}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-2">Certifications</h4>
                        <ul class="space-y-1">
                            ${mechanic.certified.map(c => `<li class="text-sm text-gray-600 flex items-center"><i data-lucide="award" class="w-4 h-4 mr-1 text-red-500"></i>${c}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-2">Pricing</h4>
                    <p class="text-gray-600">Labor Rate: $${mechanic.pricing.laborRate}/hour</p>
                    <p class="text-gray-600">Diagnostic Fee: $${mechanic.pricing.diagnosticFee}</p>
                </div>
                
                <div class="flex gap-2">
                    <button class="flex-1 btn-primary">Book Appointment</button>
                    <button class="flex-1 btn-secondary">Call Now</button>
                </div>
            </div>
        `;
    },

    createVehicleDetailsHTML(vehicle) {
        return `
            <div class="space-y-4">
                <img src="${vehicle.images[0]}" alt="${vehicle.make} ${vehicle.model}" class="w-full h-80 object-cover rounded-lg">
                
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-2xl font-bold">${vehicle.year} ${vehicle.make} ${vehicle.model}</h3>
                        <p class="text-gray-600">${vehicle.trim} • ${vehicle.mileage.toLocaleString()} miles</p>
                    </div>
                    <div class="text-right">
                        <p class="text-3xl font-bold text-red-600">$${vehicle.price.toLocaleString()}</p>
                        <div class="flex items-center text-green-600 mt-1">
                            <i data-lucide="heart-pulse" class="w-5 h-5 mr-1"></i>
                            <span class="font-semibold">Health: ${vehicle.healthScore}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 text-sm">
                    <div><span class="text-gray-500">Transmission:</span> ${vehicle.transmission}</div>
                    <div><span class="text-gray-500">Fuel:</span> ${vehicle.fuelType}</div>
                    <div><span class="text-gray-500">Drivetrain:</span> ${vehicle.drivetrain}</div>
                </div>
                
                <div>
                    <h4 class="font-semibold mb-2">Key Features</h4>
                    <div class="grid grid-cols-2 gap-2">
                        ${vehicle.features.slice(0, 6).map(f => `<div class="text-sm text-gray-600 flex items-center"><i data-lucide="check" class="w-4 h-4 mr-1 text-green-500"></i>${f}</div>`).join('')}
                    </div>
                </div>
                
                <div class="flex gap-2">
                    <button class="flex-1 btn-primary">Contact Seller</button>
                    <button class="flex-1 btn-secondary">Schedule Test Drive</button>
                </div>
            </div>
        `;
    }
};

// Register module
window.AutoCareApp.register('search', SearchModule);
