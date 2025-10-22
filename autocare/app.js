// Vehicle Diagnostic Knowledge Base
const DIAGNOSTIC_RULES = {
  "engine knocking": {
    causes: ["Low-octane fuel", "Worn spark plugs", "Carbon deposits", "Incorrect ignition timing"],
    parts: ["Spark plugs", "Engine cleaner", "Knock sensor"],
    severity: "medium"
  },
  "overheating": {
    causes: ["Low coolant", "Radiator leak", "Faulty thermostat", "Water pump failure", "Cooling fan not working"],
    parts: ["Coolant", "Radiator", "Thermostat", "Water pump", "Fan relay"],
    severity: "high"
  },
  "brake squeal": {
    causes: ["Worn brake pads", "Glazed pads/rotors", "Dust or debris", "Lack of shims"],
    parts: ["Brake pads", "Brake rotors", "Shim kit", "Brake cleaner"],
    severity: "medium"
  },
  "battery drains": {
    causes: ["Parasitic draw", "Old battery", "Faulty alternator", "Loose ground"],
    parts: ["Battery", "Alternator", "Ground strap", "Multimeter test"],
    severity: "medium"
  },
  "rough idle": {
    causes: ["Vacuum leak", "Dirty throttle body", "Bad coil pack", "Clogged injector"],
    parts: ["Vacuum hose", "Throttle body cleaner", "Ignition coil", "Injector cleaner"],
    severity: "low"
  },
  "check engine light": {
    causes: ["Oxygen sensor failure", "Loose gas cap", "Catalytic converter issue", "Mass airflow sensor problem"],
    parts: ["Oxygen sensor", "Gas cap", "Catalytic converter", "Mass airflow sensor"],
    severity: "medium"
  },
  "car won't start": {
    causes: ["Dead battery", "Faulty starter", "Ignition switch problem", "Fuel pump failure"],
    parts: ["Battery", "Starter motor", "Ignition switch", "Fuel pump"],
    severity: "high"
  }
};

// Diagnostic function
function diagnoseVehicleIssue(input) {
  const text = input.toLowerCase().trim();
  const matches = Object.keys(DIAGNOSTIC_RULES).filter(k => text.includes(k));
  
  if (matches.length > 0) {
    return {
      ...DIAGNOSTIC_RULES[matches[0]],
      matchedSymptom: matches[0]
    };
  }
  
  return {
    causes: ["No specific issue identified. Please provide more details."],
    parts: [],
    severity: "unknown"
  };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Handle diagnostic form submission
  const diagnosticForm = document.getElementById('diagnostic-form');
  if (diagnosticForm) {
    diagnosticForm.addEventListener('submit', handleDiagnosticSubmit);
  }
  
  // Initialize tab switching
  const diagnosticTab = document.getElementById('diagnostic-tab');
  const carSalesTab = document.getElementById('car-sales-tab');
  
  if (diagnosticTab) {
    diagnosticTab.addEventListener('click', function() {
      // Show diagnostic section
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
      document.getElementById('results-section').classList.remove('hidden');
      
      // Update active tab
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active-tab', 'border-blue-500', 'text-blue-500'));
      diagnosticTab.classList.add('active-tab', 'border-blue-500', 'text-blue-500');
    });
  }
});

// Handle diagnostic form submission
function handleDiagnosticSubmit(e) {
  e.preventDefault();
  
  const faultInput = document.getElementById('fault-input').value;
  if (!faultInput) return;
  
  const diagnosis = diagnoseVehicleIssue(faultInput);
  
  // Show results section
  const resultsSection = document.getElementById('results-section');
  if (resultsSection) {
    resultsSection.classList.remove('hidden');
  }
  
  // Populate causes
  const causesList = document.getElementById('causes-list');
  if (causesList) {
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
  }
  
  // Update health indicator
  const healthIndicator = document.getElementById('health-indicator');
  const healthDescription = document.getElementById('health-description');
  
  if (healthIndicator && healthDescription) {
    let healthColor, healthText, healthPercentage;
    
    switch(diagnosis.severity) {
      case 'high':
        healthColor = 'bg-red-500';
        healthText = 'Critical - Immediate attention required';
        healthPercentage = '80%';
        break;
      case 'medium':
        healthColor = 'bg-yellow-500';
        healthText = 'Warning - Service recommended soon';
        healthPercentage = '50%';
        break;
      case 'low':
        healthColor = 'bg-green-500';
        healthText = 'Minor issue - Monitor the situation';
        healthPercentage = '20%';
        break;
      default:
        healthColor = 'bg-gray-500';
        healthText = 'Unknown - More information needed';
        healthPercentage = '30%';
    }
    
    healthIndicator.innerHTML = `
      <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div class="${healthColor} h-4 rounded-full" style="width: ${healthPercentage}"></div>
      </div>
    `;
    
    healthDescription.textContent = healthText;
  }
  
  // Populate parts
  const partsList = document.getElementById('parts-list');
  if (partsList) {
    partsList.innerHTML = '';
    
    if (diagnosis.parts.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No specific parts recommended for this issue.';
      partsList.appendChild(li);
    } else {
      diagnosis.parts.forEach(part => {
        const li = document.createElement('li');
        li.className = 'py-1';
        li.innerHTML = `
          <div class="flex items-center justify-between">
            <span>${part}</span>
            <button class="text-red-600 hover:text-red-800" onclick="alert('Added ${part} to cart')">
              <i data-lucide="plus-circle" class="w-5 h-5"></i>
            </button>
          </div>
        `;
        partsList.appendChild(li);
      });
    }
  }
  
  // Reinitialize icons for dynamically added content
  lucide.createIcons();
  
  // Scroll to results
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
}