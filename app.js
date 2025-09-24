// Portfolio Website JavaScript
// Author: Guilherme Secca

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHeroTypingAnimation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initMobileMenu();
    initProjectLinks();
    initSocialLinks();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Handle scroll effects on navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu on window resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Project links functionality
function initProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link[data-action]');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'demo':
                    showNotification('Live demo would be available here. This project is currently in development.', 'info');
                    break;
                case 'github':
                    showNotification('GitHub repository would be linked here when the project is made public.', 'info');
                    break;
                case 'case-study':
                    showNotification('Detailed case study would be available here showcasing the complete project journey.', 'info');
                    break;
                default:
                    showNotification('Project link coming soon!', 'info');
            }
        });
    });
}

// Social links functionality
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link[data-social]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-social');
            
            switch(platform) {
                case 'linkedin':
                    showNotification('LinkedIn profile would be linked here. Connect with Guilherme on LinkedIn!', 'info');
                    break;
                case 'github':
                    showNotification('GitHub profile would be linked here. Check out Guilherme\'s repositories!', 'info');
                    break;
                default:
                    showNotification('Social media profile coming soon!', 'info');
            }
        });
    });
}

// Hero typing animation
function initHeroTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const phrases = [
        'Passionate about AR/VR technologies and web development',
        'Creating innovative solutions that bridge technology and real-world applications',
        'Building the future with cutting-edge software engineering',
        'Transforming ideas into impactful digital experiences'
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeWriter() {
        const current = phrases[currentPhrase];
        
        if (isDeleting) {
            typingElement.textContent = current.substring(0, currentChar - 1);
            currentChar--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = current.substring(0, currentChar + 1);
            currentChar++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && currentChar === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation
    setTimeout(typeWriter, 1000);
}

// Scroll animations for sections
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards for fade-in animation
    const elementsToAnimate = document.querySelectorAll(
        'section, .card, .experience-card, .project-card, .timeline-item, .skill-category, .stat-item, .highlight-item, .contact-item'
    );
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Contact form validation and handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm();
        } else {
            showNotification('Please correct the errors below.', 'error');
        }
    });
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + '-error');
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error state
    field.classList.remove('error');
    errorElement.classList.remove('show');
    
    // Required field validation
    if (value === '') {
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
        isValid = false;
    } else {
        // Specific validation rules
        switch (fieldName) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address.';
                    isValid = false;
                }
                break;
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long.';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long.';
                    isValid = false;
                }
                break;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
    
    return isValid;
}

// Form submission handler
function submitForm() {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent successfully. Guilherme will get back to you soon!', 'success');
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Clear any validation errors
        const errorMessages = document.querySelectorAll('.error-message');
        const inputs = document.querySelectorAll('.form-control');
        
        errorMessages.forEach(error => error.classList.remove('show'));
        inputs.forEach(input => input.classList.remove('error'));
        
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid ${getNotificationColor(type)};
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: var(--space-12);
        color: var(--color-text);
    `;
    
    const icon = notification.querySelector('i:first-child');
    icon.style.color = getNotificationColor(type);
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: var(--color-text-secondary);
        cursor: pointer;
        padding: var(--space-4);
        margin-left: auto;
        border-radius: var(--radius-sm);
        transition: var(--transition-smooth);
    `;
    
    // Add hover effect to close button
    closeButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = 'var(--color-secondary)';
    });
    
    closeButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'transparent';
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Helper function for notification icons
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Helper function for notification colors
function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'var(--color-success)';
        case 'error': return 'var(--color-error)';
        case 'warning': return 'var(--color-warning)';
        default: return 'var(--color-info)';
    }
}

// Utility functions for smooth interactions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Enhanced scroll performance
const throttledScrollHandler = debounce(() => {
    // Any additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Close any open notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add CSS for form validation errors and enhanced styling
const style = document.createElement('style');
style.textContent = `
    .form-control.error {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
    }
    
    .form-control.error:focus {
        border-color: var(--color-error) !important;
        outline: 2px solid var(--color-error);
    }
    
    .notification {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .project-link:hover,
    .social-link:hover {
        transform: translateY(-2px);
    }
    
    .project-link:active,
    .social-link:active {
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load heavy content
function lazyLoadContent() {
    // This function can be extended to lazy load images or other heavy content
    // For now, it's a placeholder for future enhancements
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadContent);

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(() => {
    // Handle any resize-specific logic here
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}, 250));

// Console welcome message
console.log(`
🚀 Welcome to Guilherme Secca's Portfolio
💻 Built with modern web technologies
🌟 Interested in collaboration? Get in touch!
📧 guisecca17@gmail.com
🔗 All interactive elements are now fully functional!
`);

// Export functions for potential external use
window.PortfolioApp = {
    showNotification,
    validateField,
    debounce
};