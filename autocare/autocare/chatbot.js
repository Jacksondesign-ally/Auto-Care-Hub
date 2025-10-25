// AutoCare Chatbot Assistant
document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot UI
    createChatbotUI();
    
    // Initialize chatbot functionality
    initChatbot();
});

// Create chatbot UI
function createChatbotUI() {
    const body = document.body;
    
    // Create chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.className = 'fixed bottom-6 right-6 z-50';
    chatbotContainer.innerHTML = `
        <!-- Chatbot Button -->
        <button id="chatbot-toggle" class="bg-red-600 hover:bg-red-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all">
            <i data-lucide="message-circle" class="w-6 h-6"></i>
        </button>
        
        <!-- Chatbot Panel -->
        <div id="chatbot-panel" class="hidden absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all">
            <!-- Chatbot Header -->
            <div class="bg-red-600 text-white p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <i data-lucide="bot" class="w-6 h-6 mr-2"></i>
                        <h3 class="font-bold">AutoCare Assistant</h3>
                    </div>
                    <button id="chatbot-close" class="text-white hover:text-red-200">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
            
            <!-- Chatbot Messages -->
            <div id="chatbot-messages" class="p-4 h-80 overflow-y-auto flex flex-col space-y-3">
                <!-- Welcome message -->
                <div class="chat-message bot-message">
                    <div class="flex items-start">
                        <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <i data-lucide="bot" class="w-5 h-5 text-red-600"></i>
                        </div>
                        <div class="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                            <p>👋 Hi there! I'm your AutoCare Assistant. How can I help you today?</p>
                        </div>
                    </div>
                </div>
                <div class="chat-message bot-message">
                    <div class="flex items-start">
                        <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0">
                            <i data-lucide="bot" class="w-5 h-5 text-red-600"></i>
                        </div>
                        <div class="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                            <p>I can help with:</p>
                            <ul class="list-disc pl-5 mt-1 space-y-1">
                                <li>Car diagnostic questions</li>
                                <li>Finding the right mechanic</li>
                                <li>Parts information</li>
                                <li>Vehicle maintenance tips</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Replies -->
            <div id="quick-replies" class="px-4 py-2 border-t border-gray-200">
                <div class="flex flex-wrap gap-2">
                    <button class="quick-reply-btn px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">Car won't start</button>
                    <button class="quick-reply-btn px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">Find a mechanic</button>
                    <button class="quick-reply-btn px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">Maintenance tips</button>
                </div>
            </div>
            
            <!-- Chatbot Input -->
            <div class="p-4 border-t border-gray-200">
                <form id="chatbot-form" class="flex items-center">
                    <input type="text" id="chatbot-input" placeholder="Type your message..." class="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    <button type="submit" class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-r-lg">
                        <i data-lucide="send" class="w-5 h-5"></i>
                    </button>
                </form>
            </div>
        </div>
    `;
    
    // Add to body
    body.appendChild(chatbotContainer);
    
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Initialize chatbot functionality
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const quickReplyButtons = document.querySelectorAll('.quick-reply-btn');
    
    if (!chatbotToggle || !chatbotPanel) return;
    
    // Toggle chatbot panel
    chatbotToggle.addEventListener('click', () => {
        chatbotPanel.classList.toggle('hidden');
        // Scroll to bottom of messages
        if (!chatbotPanel.classList.contains('hidden')) {
            scrollToBottom();
        }
    });
    
    // Close chatbot panel
    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotPanel.classList.add('hidden');
        });
    }
    
    // Handle form submission
    if (chatbotForm) {
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const message = chatbotInput.value.trim();
            if (!message) return;
            
            // Add user message to chat
            addUserMessage(message);
            
            // Clear input
            chatbotInput.value = '';
            
            // Get bot response
            getBotResponse(message);
        });
    }
    
    // Handle quick reply buttons
    quickReplyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.textContent.trim();
            
            // Add user message to chat
            addUserMessage(message);
            
            // Get bot response
            getBotResponse(message);
        });
    });
    
    // Function to add user message to chat
    function addUserMessage(message) {
        const userMessageHTML = `
            <div class="chat-message user-message">
                <div class="flex items-start justify-end">
                    <div class="bg-red-600 text-white rounded-lg p-3 max-w-[85%]">
                        <p>${message}</p>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center ml-2 flex-shrink-0">
                        <i data-lucide="user" class="w-5 h-5 text-white"></i>
                    </div>
                </div>
            </div>
        `;
        
        chatbotMessages.insertAdjacentHTML('beforeend', userMessageHTML);
        
        // Initialize Lucide icons for new elements
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    // Function to add bot message to chat
    function addBotMessage(message) {
        const botMessageHTML = `
            <div class="chat-message bot-message">
                <div class="flex items-start">
                    <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0">
                        <i data-lucide="bot" class="w-5 h-5 text-red-600"></i>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                        <p>${message}</p>
                    </div>
                </div>
            </div>
        `;
        
        chatbotMessages.insertAdjacentHTML('beforeend', botMessageHTML);
        
        // Initialize Lucide icons for new elements
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    // Function to scroll to bottom of messages
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to get bot response
    function getBotResponse(message) {
        // Show typing indicator
        const typingIndicator = `
            <div id="typing-indicator" class="chat-message bot-message">
                <div class="flex items-start">
                    <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-2 flex-shrink-0">
                        <i data-lucide="bot" class="w-5 h-5 text-red-600"></i>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                        <div class="flex space-x-1">
                            <div class="typing-dot w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div class="typing-dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            <div class="typing-dot w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        chatbotMessages.insertAdjacentHTML('beforeend', typingIndicator);
        scrollToBottom();
        
        // Initialize Lucide icons for new elements
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Simulate response delay (would be replaced with actual API call)
        setTimeout(() => {
            // Remove typing indicator
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
            
            // Get response based on message
            const response = getResponseForMessage(message);
            
            // Add bot response
            addBotMessage(response);
        }, 1000);
    }
    
    // Function to get response based on message
    function getResponseForMessage(message) {
        message = message.toLowerCase();
        
        // Simple response logic
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return 'Hello! How can I help you with your vehicle today?';
        } else if (message.includes('car won\'t start') || message.includes('start')) {
            return 'If your car won\'t start, it could be due to a dead battery, starter motor issue, or fuel system problem. Would you like me to help diagnose the specific issue?';
        } else if (message.includes('find a mechanic') || message.includes('mechanic')) {
            return 'I can help you find a mechanic near you. Could you share your location or zip code?';
        } else if (message.includes('maintenance') || message.includes('tips')) {
            return 'Regular maintenance is key to vehicle longevity! Remember to: <br>1. Change oil every 3,000-5,000 miles<br>2. Rotate tires every 6,000-8,000 miles<br>3. Replace air filters yearly<br>4. Check fluid levels monthly<br><br>Would you like specific maintenance tips for your vehicle?';
        } else if (message.includes('diagnostic') || message.includes('diagnose')) {
            return 'For a detailed diagnostic, I recommend using our AI Diagnostic tool. Would you like me to guide you to that section?';
        } else if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
            return 'Repair costs vary based on your vehicle make, model, and the specific issue. Would you like a cost estimate for a particular repair?';
        } else if (message.includes('thank')) {
            return 'You\'re welcome! Is there anything else I can help you with?';
        } else {
            return 'I\'m not sure I understand. Could you provide more details about your question or choose one of the quick reply options below?';
        }
    }
}