// Direct Contact Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Replace cart buttons with contact buttons
    replaceCartButtons();
    
    // Add contact form modal
    addContactModal();
});

// Replace cart buttons with contact buttons
function replaceCartButtons() {
    // Find all "Add to Cart" buttons
    const cartButtons = document.querySelectorAll('.add-to-cart, [data-cart-action]');
    
    cartButtons.forEach(button => {
        // Get product info
        const productName = button.getAttribute('data-product') || 
                           button.closest('[data-product-name]')?.getAttribute('data-product-name') || 
                           'Product';
        
        // Replace with contact button
        button.innerHTML = `<i data-lucide="phone" class="w-4 h-4 mr-1"></i> Contact Directly`;
        button.classList.remove('add-to-cart');
        button.classList.add('contact-directly');
        button.setAttribute('data-product', productName);
        
        // Update event listener
        button.removeEventListener('click', window.addToCartHandler);
        button.addEventListener('click', function() {
            openContactForm(productName);
        });
    });
    
    // Remove cart icon from header if exists
    const cartIcon = document.querySelector('.cart-icon, #cart-icon');
    if (cartIcon) {
        cartIcon.style.display = 'none';
    }
    
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Add contact form modal
function addContactModal() {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.id = 'contact-modal';
    modalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center hidden';
    modalContainer.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <!-- Modal Header -->
            <div class="bg-red-600 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
                <h3 class="text-xl font-bold flex items-center">
                    <i data-lucide="phone" class="w-5 h-5 mr-2"></i>
                    <span>Contact Directly</span>
                </h3>
                <button id="close-contact-modal" class="text-white hover:text-red-200">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-6">
                <p class="mb-4">Please fill out the form below to contact us about <span id="contact-product-name" class="font-semibold"></span>.</p>
                
                <form id="contact-form" class="space-y-4">
                    <div>
                        <label for="contact-name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input type="text" id="contact-name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required>
                    </div>
                    
                    <div>
                        <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" id="contact-email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required>
                    </div>
                    
                    <div>
                        <label for="contact-phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" id="contact-phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required>
                    </div>
                    
                    <div>
                        <label for="contact-message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea id="contact-message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" required></textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                        <div class="flex space-x-4">
                            <label class="flex items-center">
                                <input type="radio" name="contact-method" value="email" class="mr-2" checked>
                                <span>Email</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="contact-method" value="phone" class="mr-2">
                                <span>Phone</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="contact-method" value="text" class="mr-2">
                                <span>Text</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="pt-2">
                        <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(modalContainer);
    
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Add event listeners
    document.getElementById('close-contact-modal').addEventListener('click', closeContactForm);
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
    
    // Close modal when clicking outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeContactForm();
        }
    });
}

// Open contact form
function openContactForm(productName) {
    const modal = document.getElementById('contact-modal');
    const productNameElement = document.getElementById('contact-product-name');
    const messageField = document.getElementById('contact-message');
    
    if (modal && productNameElement) {
        productNameElement.textContent = productName;
        messageField.value = `I'm interested in ${productName} and would like more information.`;
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}

// Close contact form
function closeContactForm() {
    const modal = document.getElementById('contact-modal');
    
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

// Handle contact form submit
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const phone = document.getElementById('contact-phone').value;
    const message = document.getElementById('contact-message').value;
    const contactMethod = document.querySelector('input[name="contact-method"]:checked').value;
    const productName = document.getElementById('contact-product-name').textContent;
    
    // In a real application, this would send the data to a server
    // For demo purposes, we'll just show a success message
    
    // Create success message
    const formContainer = document.querySelector('#contact-modal .p-6');
    formContainer.innerHTML = `
        <div class="text-center py-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i data-lucide="check" class="w-8 h-8 text-green-600"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p class="text-gray-600 mb-6">Thank you for your interest in ${productName}. We'll contact you shortly via ${contactMethod}.</p>
            <button id="close-success" class="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors">
                Close
            </button>
        </div>
    `;
    
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Add event listener to close button
    document.getElementById('close-success').addEventListener('click', closeContactForm);
    
    // Reset form after 5 seconds
    setTimeout(() => {
        closeContactForm();
        
        // Reset form for next use
        setTimeout(() => {
            document.getElementById('contact-form').reset();
            document.getElementById('contact-modal').innerHTML = modalContainer.innerHTML;
            
            // Reinitialize event listeners
            document.getElementById('close-contact-modal').addEventListener('click', closeContactForm);
            document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
        }, 500);
    }, 5000);
}