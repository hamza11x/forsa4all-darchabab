// Enhanced App Class for Better Structure
class Forsa4AllApp {
    constructor() {
        this.init();
    }

    init() {
        this.initMenuToggle();
        this.initSmoothScrolling();
        this.initScrollReveal();
        this.initFormHandling();
        this.initProjectCards();
        this.initParallaxEffect();
    }

    // Menu Toggle with Smooth Animation
    initMenuToggle() {
        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar');
        let overlay = document.getElementById('menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'menu-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(0,0,0,0.25)';
            overlay.style.zIndex = '999';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s';
            overlay.style.pointerEvents = 'none';
            document.body.appendChild(overlay);
        }

        function showMenu() {
            navbar.classList.add('active');
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
            menuToggle.classList.add('active');
        }

        function hideMenu() {
            navbar.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            menuToggle.classList.remove('active');
        }

        menuToggle.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                hideMenu();
            } else {
                showMenu();
            }
            // Ripple effect for toggle
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(37,99,235,0.2)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.width = ripple.style.height = '40px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s linear';
            menuToggle.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        overlay.addEventListener('click', hideMenu);

        // Close menu when clicking on links
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', hideMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !menuToggle.contains(e.target) && navbar.classList.contains('active')) {
                hideMenu();
            }
        });
    }

    // Smooth Scrolling for Navigation
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll Reveal Animation
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // Form Handling with Validation
    initFormHandling() {
        const form = document.getElementById('join-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple form validation
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const reason = document.getElementById('reason').value;

            if (name.trim() && phone.trim() && reason.trim()) {
                // Create WhatsApp message
                const message = this.createWhatsAppMessage(name, phone, reason);

                // Open WhatsApp in new tab
                const whatsappUrl = `https://wa.me/+212781119233?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');

                // Show success modal
                setTimeout(() => {
                    this.showSuccessModal();
                    form.reset();
                }, 500);
            }
        });
    }

    // Create WhatsApp message with form data
    createWhatsAppMessage(name, phone, reason) {
        return `Hello! I'm interested in joining Forsa4All. \n
    - Name: ${name} \n
    - Phone Number: ${phone} \n
    - Why do you want to join?: ${reason} \n                       
    Looking forward to hearing from you!`;
    }

    // Project Card Interactions
    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const project = card.dataset.project;
                this.animateCard(card);
                // Here you could open a detailed project modal
            });
        });
    }

    // Parallax Effect for Hero Section
    initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');

            if (hero && heroContent) {
                const rate = scrolled * -0.5;
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Animate Card on Click
    animateCard(card) {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }

    // Show Success Modal
    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        modal.classList.add('active');
    }

    // Close Modal
    closeModal() {
        const modal = document.getElementById('success-modal');
        modal.classList.remove('active');
    }

    // Add Floating Animation to Elements
    addFloatingAnimation() {
        const floatingElements = document.querySelectorAll('.project-card, .member-card');
        floatingElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.style.animation = 'float 6s ease-in-out infinite';
        });
    }

    // Dynamic Background Color Change
    initDynamicBackground() {
        window.addEventListener('scroll', () => {
            const scrollPercent = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
            const hue = Math.floor(scrollPercent * 360);
            document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 10%) 0%, hsl(${hue + 30}, 60%, 15%) 100%)`;
        });
    }
}

// Global Functions
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('active');
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    new Forsa4AllApp();
    setTimeout(() => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            const loader = document.getElementById('loader-overlay');
            if (loader) loader.style.display = 'none';
        }, 700); // matches the fade-out transition
    }, 4000); // 7 seconds
});

// Enhanced Performance Optimizations

// Debounce Function for Scroll Events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy Loading for Images (if any are added)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Preload Critical Resources
const preloadCritical = () => {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
};

// Add Micro-interactions
const addMicroInteractions = () => {
    // Button ripple effect
    document.querySelectorAll('button, .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Magnetic effect for cards
    document.querySelectorAll('.project-card, .member-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
};

// Initialize micro-interactions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    preloadCritical();
    addMicroInteractions();
});

// Performance monitoring
const performanceMonitor = {
    init() {
        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        });

        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                    // Scroll performance optimizations can be added here
                }, 16); // ~60fps
            }
        });
    }
};

performanceMonitor.init();

// Enhanced accessibility features
const accessibilityEnhancements = {
    init() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // ARIA labels and roles
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Project ${index + 1}: ${card.querySelector('h3').textContent}`);
            card.setAttribute('tabindex', '0');
        });

        // Focus management for modal
        const modal = document.getElementById('success-modal');
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
};

accessibilityEnhancements.init();

// Improved Header hide on scroll
let lastScrollY = window.scrollY;
let ticking = false;
const header = document.querySelector('header');
let headerWasAtTop = true;

function handleHeaderHide() {
    if (window.scrollY <= 0) {
        header.classList.remove('header-hide');
        headerWasAtTop = true;
        lastScrollY = window.scrollY;
        ticking = false;
        return;
    }
    if (headerWasAtTop && window.scrollY > 10) {
        headerWasAtTop = false;
    }
    if (!headerWasAtTop) {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
            header.classList.add('header-hide');
        } else if (window.scrollY < lastScrollY) {
            header.classList.remove('header-hide');
        }
    }
    lastScrollY = window.scrollY;
    ticking = false;
}
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleHeaderHide);
        ticking = true;
    }
});