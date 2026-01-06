// Smooth scrolling and interactivity for Web3 landing page
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const cryptoIcons = document.querySelectorAll('.crypto-icon');
    const featureCards = document.querySelectorAll('.feature-card');
    const buttons = document.querySelectorAll('.btn');
    
    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on links
    navLinks?.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation scroll effect
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Clear timeout if user is still scrolling
        clearTimeout(scrollTimeout);
        
        // Add background to nav when scrolling
        if (scrollTop > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.9)';
            nav.style.boxShadow = 'none';
        }
        
        // Keep nav always visible and centered
        nav.style.transform = 'translateX(-50%) translateY(0)';
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Parallax effect for crypto icons
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        cryptoIcons.forEach((icon, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            icon.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = Array.from(featureCards);
                    const index = cards.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .kia-feature, .section-badge, .section-title, .section-subtitle');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Button hover effects
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Click ripple effect
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
            
            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Crypto icons click interaction
    cryptoIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Create floating animation
            this.style.animation = 'none';
            this.style.transform = 'scale(1.5) rotate(360deg)';
            this.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = '';
                this.style.animation = '';
            }, 500);
            
            // Create particle effect
            createParticles(this);
        });
    });
    
    // Particle effect function
    function createParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#61bb9f';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (i / 6) * Math.PI * 2;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(particle);
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    }
    
    // Dynamic scaling based on viewport
    function updateScaleFactor() {
        const viewportWidth = window.innerWidth;
        let scaleFactor = 1;
        
        if (viewportWidth <= 640) {
            scaleFactor = 0.75;
        } else if (viewportWidth <= 768) {
            scaleFactor = 0.85;
        } else if (viewportWidth <= 1024) {
            scaleFactor = 0.9;
        } else {
            scaleFactor = 1;
        }
        
        document.documentElement.style.setProperty('--scale-factor', scaleFactor);
    }
    
    // Update scale factor on resize with debouncing
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateScaleFactor, 100);
    });
    
    updateScaleFactor(); // Initial call
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons, .hero-dashboard');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `fadeInUp 1s ease-out ${index * 0.2}s both`;
            }, 100);
        });
    });
    
    // Initialize body opacity
    document.body.style.opacity = '0';
    
    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        }
    });
    
    // Form submission handling (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state to submit button
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Sent!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
    });
    
    // Enhanced scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0%';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, #61bb9f, #94ffde)';
        progressBar.style.zIndex = '10000';
        progressBar.style.transition = 'width 0.1s ease';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    createScrollProgress();
    
    // Console easter egg
    console.log(`
    🚀 Welcome to Popn - The All-in-One Web3 Everything App!
    
    Built with:
    - Pure HTML, CSS, and JavaScript
    - Responsive design with CSS custom properties
    - Smooth animations and interactions
    - Accessibility features
    
    Ready to explore Web3? Let's go! 🌊
    `);
    
    // Performance monitoring
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Lazy load non-critical animations
            const nonCriticalAnimations = document.querySelectorAll('.gradient-circles .circle');
            nonCriticalAnimations.forEach(circle => {
                circle.style.animation = circle.style.animation || 'pulse 4s ease-in-out infinite';
            });
        });
    }
    
    // Add focus management for better accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = Array.from(document.querySelectorAll(focusableElements))
                .filter(el => !el.disabled && !el.hidden && el.offsetParent !== null);
            
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.shiftKey && document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
    // Hero Slider Functionality
    const heroSlides = document.getElementById('heroSlides');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = 2;

    function moveSlider(index) {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = totalSlides - 1;
        if (currentSlide >= totalSlides) currentSlide = 0;
        
        heroSlides.style.transform = `translateX(-${currentSlide * 50}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    sliderPrev?.addEventListener('click', () => {
        moveSlider(currentSlide - 1);
        resetAutoSlider();
    });

    sliderNext?.addEventListener('click', () => {
        moveSlider(currentSlide + 1);
        resetAutoSlider();
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            moveSlider(i);
            resetAutoSlider();
        });
    });

    // Auto slider
    let autoSliderInterval = setInterval(() => {
        moveSlider(currentSlide + 1);
    }, 5000);

    function resetAutoSlider() {
        clearInterval(autoSliderInterval);
        autoSliderInterval = setInterval(() => {
            moveSlider(currentSlide + 1);
        }, 5000);
    }
});