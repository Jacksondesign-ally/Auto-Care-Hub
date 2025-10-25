/**
 * AutoCare UI Component System
 * Reusable UI components and utilities
 */

const UI = {
    // Create a button component
    button(text, options = {}) {
        const {
            variant = 'primary',
            icon = null,
            onClick = null,
            className = '',
            disabled = false
        } = options;
        
        const btn = document.createElement('button');
        btn.className = `btn-${variant} ${className}`;
        btn.disabled = disabled;
        
        if (icon) {
            const iconEl = document.createElement('i');
            iconEl.setAttribute('data-lucide', icon);
            iconEl.className = 'w-5 h-5';
            btn.appendChild(iconEl);
        }
        
        const textNode = document.createTextNode(text);
        btn.appendChild(textNode);
        
        if (onClick) {
            btn.addEventListener('click', onClick);
        }
        
        return btn;
    },

    // Create a card component
    card(content, options = {}) {
        const {
            title = null,
            footer = null,
            className = ''
        } = options;
        
        const card = document.createElement('div');
        card.className = `card ${className}`;
        
        if (title) {
            const header = document.createElement('div');
            header.className = 'card-header p-4 border-b border-gray-200';
            header.innerHTML = `<h3 class="text-lg font-semibold">${title}</h3>`;
            card.appendChild(header);
        }
        
        const body = document.createElement('div');
        body.className = 'card-body p-4';
        if (typeof content === 'string') {
            body.innerHTML = content;
        } else {
            body.appendChild(content);
        }
        card.appendChild(body);
        
        if (footer) {
            const footerEl = document.createElement('div');
            footerEl.className = 'card-footer p-4 border-t border-gray-200';
            if (typeof footer === 'string') {
                footerEl.innerHTML = footer;
            } else {
                footerEl.appendChild(footer);
            }
            card.appendChild(footerEl);
        }
        
        return card;
    },

    // Create a modal component
    modal(content, options = {}) {
        const {
            title = '',
            onClose = null,
            size = 'md',
            className = ''
        } = options;
        
        const sizeClasses = {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl'
        };
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-xl ${sizeClasses[size]} w-full mx-4 ${className}">
                <div class="bg-red-600 text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
                    <h3 class="text-xl font-bold">${title}</h3>
                    <button class="modal-close text-white hover:text-red-200">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>
                <div class="modal-content p-6">
                    ${typeof content === 'string' ? content : ''}
                </div>
            </div>
        `;
        
        if (typeof content !== 'string') {
            modal.querySelector('.modal-content').appendChild(content);
        }
        
        const closeBtn = modal.querySelector('.modal-close');
        const closeModal = () => {
            modal.remove();
            if (onClose) onClose();
            window.AutoCareEvents.emit(window.Events.MODAL_CLOSE);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        return modal;
    },

    // Show notification
    notify(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification-container') || this.createNotificationContainer();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} p-4 rounded-lg mb-4 shadow-lg transform transition-all`;
        
        const icons = {
            success: 'check-circle',
            error: 'alert-circle',
            warning: 'alert-triangle',
            info: 'info'
        };
        
        const colors = {
            success: 'bg-green-50 text-green-800 border border-green-200',
            error: 'bg-red-50 text-red-800 border border-red-200',
            warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
            info: 'bg-blue-50 text-blue-800 border border-blue-200'
        };
        
        notification.className += ` ${colors[type]}`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i data-lucide="${icons[type]}" class="w-5 h-5 mr-2"></i>
                <p class="flex-1">${message}</p>
                <button class="notification-close ml-4 hover:opacity-70">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
        
        const remove = () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        };
        
        notification.querySelector('.notification-close').addEventListener('click', remove);
        
        if (duration > 0) {
            setTimeout(remove, duration);
        }
        
        window.AutoCareEvents.emit(window.Events.NOTIFICATION_SHOW, { message, type });
        
        return notification;
    },

    // Create notification container
    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 right-4 z-50 w-80';
        document.body.appendChild(container);
        return container;
    },

    // Loading spinner
    spinner(size = 'md') {
        const sizes = {
            sm: 'w-4 h-4',
            md: 'w-8 h-8',
            lg: 'w-12 h-12'
        };
        
        const spinner = document.createElement('div');
        spinner.className = `spinner ${sizes[size]} border-4 border-gray-200 border-t-red-600 rounded-full animate-spin`;
        return spinner;
    },

    // Form input
    input(options = {}) {
        const {
            type = 'text',
            placeholder = '',
            value = '',
            label = null,
            icon = null,
            className = ''
        } = options;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'input-wrapper';
        
        if (label) {
            const labelEl = document.createElement('label');
            labelEl.className = 'block text-sm font-medium text-gray-700 mb-1';
            labelEl.textContent = label;
            wrapper.appendChild(labelEl);
        }
        
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'relative';
        
        if (icon) {
            const iconEl = document.createElement('i');
            iconEl.setAttribute('data-lucide', icon);
            iconEl.className = 'w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2';
            inputWrapper.appendChild(iconEl);
        }
        
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.value = value;
        input.className = `w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`;
        
        inputWrapper.appendChild(input);
        wrapper.appendChild(inputWrapper);
        
        return wrapper;
    }
};

// Export for use in other modules
window.AutoCareUI = UI;
