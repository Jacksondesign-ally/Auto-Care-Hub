// Supabase Authentication for AutoCare
const SUPABASE_URL = 'https://your-supabase-project-url.supabase.co';
const SUPABASE_KEY = 'your-supabase-anon-key';

// Initialize Supabase client
let supabaseClient;

document.addEventListener('DOMContentLoaded', initSupabase);

function initSupabase() {
    // Guard if credentials are not configured
    const missingCreds = !SUPABASE_URL || SUPABASE_URL.includes('your-supabase-project-url') ||
                         !SUPABASE_KEY || SUPABASE_KEY.includes('your-supabase-anon-key');

    // Load Supabase script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => {
        // Initialize Supabase client after script loads
        try {
            if (missingCreds) {
                console.warn('Supabase credentials are not configured. Auth UI will be shown but disabled.');
            }
            const createClient = window.supabase && window.supabase.createClient;
            if (typeof createClient !== 'function') {
                console.error('Supabase library did not load correctly.');
                return;
            }
            supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

            // Check if user is already logged in
            if (!missingCreds) {
                checkAuthState();
            } else {
                updateUIForLoggedOutUser();
            }

            // Set up auth UI elements
            setupAuthUI(missingCreds);
        } catch (err) {
            console.error('Failed to initialize Supabase:', err);
        }
    };
    document.head.appendChild(script);
}

// Authentication state management
async function checkAuthState() {
    try {
        if (!supabaseClient) return;
        const { data: { user } } = await supabaseClient.auth.getUser();
        
        if (user) {
            // User is logged in
            updateUIForLoggedInUser(user);
        } else {
            // User is not logged in
            updateUIForLoggedOutUser();
        }
    } catch (error) {
        console.error('Error checking auth state:', error);
        updateUIForLoggedOutUser();
    }
}

// Sign up with email and password
async function signUp(email, password, fullName) {
    try {
        if (!supabaseClient) return null;
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });
        
        if (error) throw error;
        
        showMessage('success', 'Registration successful! Please check your email for verification.');
        return data;
    } catch (error) {
        showMessage('error', error.message || 'Error during sign up');
        console.error('Error signing up:', error);
        return null;
    }
}

// Sign in with email and password
async function signIn(email, password) {
    try {
        if (!supabaseClient) return null;
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        
        showMessage('success', 'Logged in successfully!');
        updateUIForLoggedInUser(data.user);
        return data;
    } catch (error) {
        showMessage('error', error.message || 'Error during sign in');
        console.error('Error signing in:', error);
        return null;
    }
}

// Sign out
async function signOut() {
    try {
        if (!supabaseClient) return;
        const { error } = await supabaseClient.auth.signOut();
        
        if (error) throw error;
        
        showMessage('success', 'Logged out successfully!');
        updateUIForLoggedOutUser();
    } catch (error) {
        showMessage('error', error.message || 'Error during sign out');
        console.error('Error signing out:', error);
    }
}

// UI Management
function setupAuthUI(disabled = false) {
    // Set up login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (disabled) {
                showMessage('error', 'Authentication is not configured. Please set Supabase credentials.');
                return;
            }
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            await signIn(email, password);
        });
    }
    
    // Set up signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (disabled) {
                showMessage('error', 'Authentication is not configured. Please set Supabase credentials.');
                return;
            }
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const fullName = document.getElementById('signup-name').value;
            await signUp(email, password, fullName);
        });
    }
    
    // Set up sign out button
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', signOut);
    }
    
    // Set up auth modal toggles
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const authModal = document.getElementById('auth-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (loginToggle) {
        loginToggle.addEventListener('click', () => {
            showAuthModal('login');
        });
    }
    
    if (signupToggle) {
        signupToggle.addEventListener('click', () => {
            showAuthModal('signup');
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            hideAuthModal();
        });
    }
    
    // Close modal when clicking outside
    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) {
                hideAuthModal();
            }
        });
    }
    
    // Set up profile dropdown
    const profileMenuButton = document.getElementById('profile-menu-button');
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (profileMenuButton && profileDropdown) {
        profileMenuButton.addEventListener('click', () => {
            profileDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileMenuButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
}

function updateUIForLoggedInUser(user) {
    // Update UI elements for logged in state
    const authButtons = document.querySelectorAll('.auth-button');
    const userProfileElements = document.querySelectorAll('.user-profile');
    const protectedElements = document.querySelectorAll('.protected-content');
    
    // Hide auth buttons, show user profile
    authButtons.forEach(btn => btn.classList.add('hidden'));
    userProfileElements.forEach(el => {
        el.classList.remove('hidden');
        const userNameEl = el.querySelector('.user-name');
        if (userNameEl) {
            userNameEl.textContent = user.user_metadata?.full_name || user.email;
        }
    });
    
    // Show protected content
    protectedElements.forEach(el => el.classList.remove('hidden'));
    
    // Hide auth modal if open
    hideAuthModal();
}

function updateUIForLoggedOutUser() {
    // Update UI elements for logged out state
    const authButtons = document.querySelectorAll('.auth-button');
    const userProfileElements = document.querySelectorAll('.user-profile');
    const protectedElements = document.querySelectorAll('.protected-content');
    
    // Show auth buttons, hide user profile
    authButtons.forEach(btn => btn.classList.remove('hidden'));
    userProfileElements.forEach(el => el.classList.add('hidden'));
    
    // Hide protected content
    protectedElements.forEach(el => el.classList.add('hidden'));
}

function showAuthModal(type = 'login') {
    const authModal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form-container');
    const signupForm = document.getElementById('signup-form-container');
    
    if (authModal) {
        authModal.classList.remove('hidden');
    }
    
    if (loginForm && signupForm) {
        if (type === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        }
    }
}

function hideAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.classList.add('hidden');
    }
}

function showMessage(type, message) {
    const messageContainer = document.getElementById('message-container');
    if (!messageContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type} p-4 rounded-lg mb-4`;
    messageElement.innerHTML = `
        <div class="flex items-center">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5 mr-2 ${type === 'success' ? 'text-green-500' : 'text-red-500'}"></i>
            <p>${message}</p>
        </div>
    `;
    
    messageContainer.appendChild(messageElement);
    
    // Initialize Lucide icon
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageContainer.removeChild(messageElement);
        }, 300);
    }, 5000);
}