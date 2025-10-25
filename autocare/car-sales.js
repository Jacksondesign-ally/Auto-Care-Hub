// Car Sales & Classifieds Module
const CAR_LISTINGS = [
  {
    id: 1,
    title: "2019 Toyota Camry XSE",
    price: 22500,
    mileage: 35000,
    location: "Phoenix, AZ",
    condition: "Excellent",
    image: "https://placehold.co/300x200/e74c3c/ffffff?text=Toyota+Camry",
    features: ["Leather Seats", "Sunroof", "Backup Camera", "Bluetooth"],
    description: "One owner, well maintained Toyota Camry XSE with all service records. No accidents.",
    contact: "seller1@example.com",
    posted: "2 days ago",
    health_score: 92
  },
  {
    id: 2,
    title: "2017 Honda Accord Sport",
    price: 18900,
    mileage: 48000,
    location: "Scottsdale, AZ",
    condition: "Good",
    image: "https://placehold.co/300x200/3498db/ffffff?text=Honda+Accord",
    features: ["Apple CarPlay", "Android Auto", "Alloy Wheels", "Keyless Entry"],
    description: "Clean title Honda Accord Sport with recent brake service and new tires.",
    contact: "seller2@example.com",
    posted: "5 days ago",
    health_score: 87
  },
  {
    id: 3,
    title: "2020 Ford Mustang GT",
    price: 34500,
    mileage: 22000,
    location: "Tempe, AZ",
    condition: "Excellent",
    image: "https://placehold.co/300x200/f39c12/ffffff?text=Ford+Mustang",
    features: ["5.0L V8", "Premium Sound", "Performance Package", "Heated Seats"],
    description: "Low mileage Mustang GT with factory warranty remaining. Adult owned and garage kept.",
    contact: "seller3@example.com",
    posted: "1 day ago",
    health_score: 95
  },
  {
    id: 4,
    title: "2016 Chevrolet Silverado 1500 LT",
    price: 26800,
    mileage: 65000,
    location: "Mesa, AZ",
    condition: "Good",
    image: "https://placehold.co/300x200/2ecc71/ffffff?text=Chevy+Silverado",
    features: ["4x4", "Tow Package", "Bed Liner", "Crew Cab"],
    description: "Well maintained Silverado with recent service. New brakes and rotors.",
    contact: "seller4@example.com",
    posted: "1 week ago",
    health_score: 84
  }
];

// Initialize car sales module
function initCarSales() {
  const carListingsContainer = document.getElementById('car-listings');
  if (!carListingsContainer) return;
  
  // Clear existing listings
  carListingsContainer.innerHTML = '';
  
  // Add listings
  CAR_LISTINGS.forEach(car => {
    const carCard = createCarCard(car);
    carListingsContainer.appendChild(carCard);
  });
  
  // Initialize filter functionality
  initFilters();
}

// Create car listing card
function createCarCard(car) {
  const card = document.createElement('div');
  card.className = 'car-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-102 hover:shadow-lg';
  card.dataset.id = car.id;
  
  // Health score indicator color
  let healthColor = 'bg-red-500';
  if (car.health_score >= 90) {
    healthColor = 'bg-green-500';
  } else if (car.health_score >= 80) {
    healthColor = 'bg-yellow-500';
  }
  
  card.innerHTML = `
    <div class="relative">
      <img src="${car.image}" alt="${car.title}" class="w-full h-48 object-cover">
      <div class="absolute top-2 right-2 flex items-center bg-black bg-opacity-70 text-white px-2 py-1 rounded">
        <span class="w-3 h-3 ${healthColor} rounded-full mr-1"></span>
        <span class="text-sm font-medium">${car.health_score}%</span>
      </div>
    </div>
    <div class="p-4">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-gray-800">${car.title}</h3>
        <p class="text-xl font-bold text-red-600">$${car.price.toLocaleString()}</p>
      </div>
      <div class="mt-2 flex items-center text-sm text-gray-600">
        <span class="mr-3">${car.mileage.toLocaleString()} mi</span>
        <span>${car.condition}</span>
      </div>
      <div class="mt-1 text-sm text-gray-600">
        <span>${car.location}</span>
      </div>
      <div class="mt-3">
        <p class="text-sm text-gray-700 line-clamp-2">${car.description}</p>
      </div>
      <div class="mt-3 flex flex-wrap gap-1">
        ${car.features.slice(0, 3).map(feature => 
          `<span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">${feature}</span>`
        ).join('')}
        ${car.features.length > 3 ? `<span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">+${car.features.length - 3} more</span>` : ''}
      </div>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-xs text-gray-500">Posted ${car.posted}</span>
        <button class="contact-seller-btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors" data-id="${car.id}">Contact Seller</button>
      </div>
    </div>
  `;
  
  return card;
}

// Initialize filter functionality
function initFilters() {
  const filterForm = document.getElementById('car-filter-form');
  if (!filterForm) return;
  
  filterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    const condition = document.getElementById('condition').value;
    
    filterListings(minPrice, maxPrice, condition);
  });
}

// Filter car listings
function filterListings(minPrice, maxPrice, condition) {
  const carCards = document.querySelectorAll('.car-card');
  
  CAR_LISTINGS.forEach(car => {
    const card = document.querySelector(`.car-card[data-id="${car.id}"]`);
    if (!card) return;
    
    let visible = true;
    
    if (minPrice && car.price < minPrice) visible = false;
    if (maxPrice && car.price > maxPrice) visible = false;
    if (condition && condition !== 'any' && car.condition.toLowerCase() !== condition.toLowerCase()) visible = false;
    
    card.style.display = visible ? 'block' : 'none';
  });
}

// Handle contact seller button clicks
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('contact-seller-btn')) {
    const carId = e.target.dataset.id;
    const car = CAR_LISTINGS.find(c => c.id == carId);
    
    if (car) {
      alert(`Contact information for ${car.title}:\nEmail: ${car.contact}`);
    }
  }
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the car sales page
  if (document.getElementById('car-listings')) {
    initCarSales();
  }
  
  // Add event listener for tab switching
  const carSalesTab = document.getElementById('car-sales-tab');
  if (carSalesTab) {
    carSalesTab.addEventListener('click', function() {
      // Show car sales section, hide diagnostics results
      const salesSection = document.getElementById('car-sales-section');
      const resultsSection = document.getElementById('results-section');
      if (salesSection) salesSection.classList.remove('hidden');
      if (resultsSection) resultsSection.classList.add('hidden');

      // Update active tab styles (red theme)
      const diagnosticTab = document.getElementById('diagnostic-tab');
      if (diagnosticTab) {
        diagnosticTab.classList.remove('active-tab', 'border-red-500', 'text-red-500');
        diagnosticTab.classList.add('border-transparent', 'text-gray-500');
      }
      carSalesTab.classList.add('active-tab', 'border-red-500', 'text-red-500');
      carSalesTab.classList.remove('border-transparent', 'text-gray-500');

      // Initialize car sales if not already done
      initCarSales();
    });
  }
});