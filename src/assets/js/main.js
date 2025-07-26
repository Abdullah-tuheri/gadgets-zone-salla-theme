/**
 * Gadgets Zone Theme - Main JavaScript File
 * Handles all interactive functionality and user experience features
 */

// Global theme object
window.GadgetsZone = {
    // Configuration
    config: {
        currency: '$',
        locale: 'en',
        cartStorageKey: 'gadgets_zone_cart',
        wishlistStorageKey: 'gadgets_zone_wishlist',
        recentlyViewedKey: 'gadgets_zone_recently_viewed',
        animationDuration: 300,
        notificationDuration: 3000
    },

    // State management
    state: {
        cart: [],
        wishlist: [],
        recentlyViewed: [],
        isLoading: false,
        currentUser: null
    },

    // Initialize the theme
    init: function() {
        this.loadStoredData();
        this.bindEvents();
        this.initializeComponents();
        this.updateCartCounter();
        this.updateWishlistCounter();
        console.log('Gadgets Zone Theme initialized successfully');
    },

    // Load data from localStorage
    loadStoredData: function() {
        try {
            this.state.cart = JSON.parse(localStorage.getItem(this.config.cartStorageKey)) || [];
            this.state.wishlist = JSON.parse(localStorage.getItem(this.config.wishlistStorageKey)) || [];
            this.state.recentlyViewed = JSON.parse(localStorage.getItem(this.config.recentlyViewedKey)) || [];
        } catch (error) {
            console.warn('Error loading stored data:', error);
            this.state.cart = [];
            this.state.wishlist = [];
            this.state.recentlyViewed = [];
        }
    },

    // Save data to localStorage
    saveToStorage: function() {
        try {
            localStorage.setItem(this.config.cartStorageKey, JSON.stringify(this.state.cart));
            localStorage.setItem(this.config.wishlistStorageKey, JSON.stringify(this.state.wishlist));
            localStorage.setItem(this.config.recentlyViewedKey, JSON.stringify(this.state.recentlyViewed));
        } catch (error) {
            console.warn('Error saving to storage:', error);
        }
    },

    // Bind global event listeners
    bindEvents: function() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Search functionality
        const searchForm = document.querySelector('.search-form');
        const searchInput = document.querySelector('.search-input');
        const searchSuggestions = document.querySelector('.search-suggestions');

        if (searchForm) {
            searchForm.addEventListener('submit', (e) => this.handleSearch(e));
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearchInput(e));
            searchInput.addEventListener('focus', () => this.showSearchSuggestions());
            searchInput.addEventListener('blur', () => {
                setTimeout(() => this.hideSearchSuggestions(), 200);
            });
        }

        // Cart functionality
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
                e.preventDefault();
                const btn = e.target.matches('.add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
                this.addToCart(btn);
            }

            if (e.target.matches('.remove-from-cart') || e.target.closest('.remove-from-cart')) {
                e.preventDefault();
                const btn = e.target.matches('.remove-from-cart') ? e.target : e.target.closest('.remove-from-cart');
                this.removeFromCart(btn);
            }

            if (e.target.matches('.wishlist-btn') || e.target.closest('.wishlist-btn')) {
                e.preventDefault();
                const btn = e.target.matches('.wishlist-btn') ? e.target : e.target.closest('.wishlist-btn');
                this.toggleWishlist(btn);
            }
        });

        // Quantity controls
        document.addEventListener('click', (e) => {
            if (e.target.matches('.qty-btn-minus')) {
                e.preventDefault();
                this.updateQuantity(e.target, 'decrease');
            }

            if (e.target.matches('.qty-btn-plus')) {
                e.preventDefault();
                this.updateQuantity(e.target, 'increase');
            }
        });

        // Product filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleProductFilter(e));
        });

        // Product tabs
        const productTabs = document.querySelectorAll('.product-tab');
        productTabs.forEach(tab => {
            tab.addEventListener('click', (e) => this.handleProductTab(e));
        });

        // Newsletter subscription
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubscription(e));
        }

        // Scroll to top
        const scrollTopBtn = document.querySelector('.scroll-to-top');
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => this.scrollToTop());
        }

        // Window scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Window resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    },

    // Initialize components
    initializeComponents: function() {
        this.initializeSliders();
        this.initializeModals();
        this.initializeTooltips();
        this.initializeLazyLoading();
        this.initializeAnimations();
    },

    // Mobile menu functionality
    toggleMobileMenu: function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;

        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
            body.classList.toggle('mobile-menu-open');
        }
    },

    closeMobileMenu: function() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;

        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        }
    },

    // Search functionality
    handleSearch: function(e) {
        e.preventDefault();
        const searchInput = e.target.querySelector('.search-input');
        const query = searchInput.value.trim();

        if (query.length < 2) {
            this.showNotification('Please enter at least 2 characters to search', 'warning');
            return;
        }

        // Simulate search (in real implementation, this would make an API call)
        this.showNotification(`Searching for "${query}"...`, 'info');
        
        // Redirect to search results page
        setTimeout(() => {
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }, 500);
    },

    handleSearchInput: function(e) {
        const query = e.target.value.trim();
        
        if (query.length >= 2) {
            this.showSearchSuggestions();
            this.loadSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    },

    showSearchSuggestions: function() {
        const suggestions = document.querySelector('.search-suggestions');
        if (suggestions) {
            suggestions.classList.add('active');
        }
    },

    hideSearchSuggestions: function() {
        const suggestions = document.querySelector('.search-suggestions');
        if (suggestions) {
            suggestions.classList.remove('active');
        }
    },

    loadSearchSuggestions: function(query) {
        // Simulate API call for search suggestions
        const suggestions = [
            'Wireless Headphones',
            'Bluetooth Speakers',
            'Smart Watches',
            'Gaming Headsets',
            'Earbuds'
        ].filter(item => item.toLowerCase().includes(query.toLowerCase()));

        this.displaySearchSuggestions(suggestions);
    },

    displaySearchSuggestions: function(suggestions) {
        const suggestionsContainer = document.querySelector('.search-suggestions');
        if (!suggestionsContainer) return;

        suggestionsContainer.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" data-suggestion="${suggestion}">
                <i class="icon-search"></i>
                <span>${suggestion}</span>
            </div>
        `).join('');

        // Bind click events to suggestions
        suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const suggestion = e.currentTarget.dataset.suggestion;
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.value = suggestion;
                    this.handleSearch({ target: searchInput.closest('form'), preventDefault: () => {} });
                }
            });
        });
    },

    // Cart functionality
    addToCart: function(btn) {
        const productId = btn.dataset.productId || btn.closest('[data-product-id]')?.dataset.productId;
        const productName = btn.dataset.productName || btn.closest('.product-card')?.querySelector('.product-name')?.textContent;
        const productPrice = btn.dataset.productPrice || btn.closest('.product-card')?.querySelector('.current-price')?.textContent;
        const productImage = btn.dataset.productImage || btn.closest('.product-card')?.querySelector('img')?.src;

        if (!productId) {
            this.showNotification('Product information not found', 'error');
            return;
        }

        // Check if product already in cart
        const existingItem = this.state.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.state.cart.push({
                id: productId,
                name: productName || 'Unknown Product',
                price: parseFloat(productPrice?.replace(/[^0-9.]/g, '') || '0'),
                image: productImage || '',
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }

        this.saveToStorage();
        this.updateCartCounter();
        this.showCartNotification(productName || 'Product');
        this.animateAddToCart(btn);
    },

    removeFromCart: function(btn) {
        const productId = btn.dataset.productId;
        
        if (!productId) return;

        this.state.cart = this.state.cart.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartCounter();
        this.showNotification('Item removed from cart', 'success');
        
        // Remove the cart item element if we're on the cart page
        const cartItem = btn.closest('.cart-item');
        if (cartItem) {
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'translateX(-100%)';
            setTimeout(() => cartItem.remove(), 300);
        }
    },

    updateQuantity: function(btn, action) {
        const qtyInput = btn.parentElement.querySelector('.qty-input');
        const productId = btn.closest('[data-product-id]')?.dataset.productId;
        
        if (!qtyInput) return;

        let currentQty = parseInt(qtyInput.value) || 1;
        let newQty = action === 'increase' ? currentQty + 1 : Math.max(1, currentQty - 1);
        
        qtyInput.value = newQty;

        // Update cart if this is a cart page
        if (productId) {
            const cartItem = this.state.cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity = newQty;
                this.saveToStorage();
                this.updateCartCounter();
                this.updateCartTotals();
            }
        }
    },

    updateCartCounter: function() {
        const cartCounters = document.querySelectorAll('.cart-counter');
        const totalItems = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        cartCounters.forEach(counter => {
            counter.textContent = totalItems;
            counter.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    },

    updateCartTotals: function() {
        const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
        const total = subtotal + tax + shipping;

        // Update totals on cart page
        const subtotalElements = document.querySelectorAll('.cart-subtotal');
        const taxElements = document.querySelectorAll('.cart-tax');
        const shippingElements = document.querySelectorAll('.cart-shipping');
        const totalElements = document.querySelectorAll('.cart-total');

        subtotalElements.forEach(el => el.textContent = this.formatPrice(subtotal));
        taxElements.forEach(el => el.textContent = this.formatPrice(tax));
        shippingElements.forEach(el => el.textContent = shipping === 0 ? 'Free' : this.formatPrice(shipping));
        totalElements.forEach(el => el.textContent = this.formatPrice(total));
    },

    // Wishlist functionality
    toggleWishlist: function(btn) {
        const productId = btn.dataset.productId || btn.closest('[data-product-id]')?.dataset.productId;
        const productName = btn.dataset.productName || btn.closest('.product-card')?.querySelector('.product-name')?.textContent;
        const productPrice = btn.dataset.productPrice || btn.closest('.product-card')?.querySelector('.current-price')?.textContent;
        const productImage = btn.dataset.productImage || btn.closest('.product-card')?.querySelector('img')?.src;

        if (!productId) return;

        const existingIndex = this.state.wishlist.findIndex(item => item.id === productId);
        
        if (existingIndex > -1) {
            // Remove from wishlist
            this.state.wishlist.splice(existingIndex, 1);
            btn.classList.remove('active');
            this.showNotification('Removed from wishlist', 'info');
        } else {
            // Add to wishlist
            this.state.wishlist.push({
                id: productId,
                name: productName || 'Unknown Product',
                price: parseFloat(productPrice?.replace(/[^0-9.]/g, '') || '0'),
                image: productImage || '',
                addedAt: new Date().toISOString()
            });
            btn.classList.add('active');
            this.showNotification('Added to wishlist', 'success');
        }

        this.saveToStorage();
        this.updateWishlistCounter();
    },

    updateWishlistCounter: function() {
        const wishlistCounters = document.querySelectorAll('.wishlist-counter');
        const totalItems = this.state.wishlist.length;
        
        wishlistCounters.forEach(counter => {
            counter.textContent = totalItems;
            counter.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    },

    // Product filtering
    handleProductFilter: function(e) {
        e.preventDefault();
        const btn = e.target;
        const filter = btn.dataset.filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter products
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const productCategories = product.dataset.categories?.split(',') || [];
            const productTags = product.dataset.tags?.split(',') || [];
            
            if (filter === 'all' || 
                productCategories.includes(filter) || 
                productTags.includes(filter)) {
                product.style.display = 'block';
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            } else {
                product.style.opacity = '0';
                product.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    },

    // Product tabs
    handleProductTab: function(e) {
        e.preventDefault();
        const tab = e.target;
        const targetTab = tab.dataset.tab;
        
        // Update active tab
        document.querySelectorAll('.product-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show corresponding content
        document.querySelectorAll('.tab-content').forEach(content => {
            if (content.dataset.tabContent === targetTab) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    },

    // Newsletter subscription
    handleNewsletterSubscription: function(e) {
        e.preventDefault();
        const form = e.target;
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (!emailInput.value.trim()) {
            this.showNotification('Please enter your email address', 'warning');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    },

    // Utility functions
    formatPrice: function(price) {
        return this.config.currency + price.toFixed(2);
    },

    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification show ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="notification-icon icon-${type === 'error' ? 'x-circle' : type === 'warning' ? 'alert-triangle' : type === 'info' ? 'info' : 'check-circle'}"></i>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="icon-x"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, this.config.notificationDuration);
    },

    showCartNotification: function(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification show';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="notification-icon icon-check-circle"></i>
                <div class="notification-text">
                    <strong>${productName}</strong> added to cart
                </div>
                <div class="notification-actions">
                    <button class="btn btn-secondary btn-small" onclick="this.closest('.cart-notification').remove()">Continue Shopping</button>
                    <a href="/cart" class="btn btn-primary btn-small">View Cart</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    },

    animateAddToCart: function(btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="icon-check"></i> Added!';
        btn.classList.add('added');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('added');
        }, 2000);
    },

    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    handleScroll: function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollTopBtn = document.querySelector('.scroll-to-top');
        
        if (scrollTopBtn) {
            if (scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Header scroll effect
        const header = document.querySelector('.site-header');
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    },

    handleResize: function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    },

    // Component initializers
    initializeSliders: function() {
        // Initialize product image sliders, hero sliders, etc.
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            // Basic slider implementation would go here
            // In a real implementation, you might use Swiper.js or similar
        });
    },

    initializeModals: function() {
        // Initialize modal functionality
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.dataset.modal;
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                    document.body.classList.add('modal-open');
                }
            });
        });

        // Close modals
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-overlay') || e.target.matches('.modal-close')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
            }
        });
    },

    initializeTooltips: function() {
        // Initialize tooltip functionality
        const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
        tooltipTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', (e) => {
                const tooltipText = trigger.dataset.tooltip;
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipText;
                document.body.appendChild(tooltip);
                
                const rect = trigger.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                setTimeout(() => tooltip.classList.add('visible'), 10);
            });
            
            trigger.addEventListener('mouseleave', () => {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    },

    initializeLazyLoading: function() {
        // Initialize lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    },

    initializeAnimations: function() {
        // Initialize scroll animations
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                    }
                });
            }, {
                threshold: 0.1
            });
            
            animatedElements.forEach(el => animationObserver.observe(el));
        }
    },

    // Translation helper
    trans: function(key, params = {}) {
        // Basic translation function - in real implementation, this would load from localization files
        const translations = {
            'common.home': 'Home',
            'common.about': 'About',
            'common.contact': 'Contact',
            'common.search': 'Search',
            'common.cart': 'Cart',
            'common.wishlist': 'Wishlist',
            'common.account': 'Account',
            'common.login': 'Login',
            'common.register': 'Register',
            'common.logout': 'Logout',
            'product.add_to_cart': 'Add to Cart',
            'product.add_to_wishlist': 'Add to Wishlist',
            'product.quick_view': 'Quick View',
            'product.compare': 'Compare',
            'product.out_of_stock': 'Out of Stock',
            'cart.empty': 'Your cart is empty',
            'cart.continue_shopping': 'Continue Shopping',
            'cart.proceed_to_checkout': 'Proceed to Checkout',
            'newsletter.subscribe': 'Subscribe to Newsletter',
            'newsletter.email_placeholder': 'Enter your email address'
        };
        
        let translated = translations[key] || key;
        
        // Replace parameters
        for (const param in params) {
            translated = translated.replace(`{${param}}`, params[param]);
        }
        
        return translated;
    }
};

// Initialize theme when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    GadgetsZone.init();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GadgetsZone;
}

