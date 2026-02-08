// ============================================
// RiseFinance Landing Page Scripts
// ============================================

// Mobile Menu Toggle Functionality
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Newsletter Subscription Handler
function handleSubscribe(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Basic email validation
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    alert(`Thank you for subscribing with: ${email}\nYou will receive our latest fintech insights soon!`);
    e.target.reset();
}

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply fade-in animation to key sections
    const animatedElements = document.querySelectorAll(
        '.hero-content, .hero-image, .section-header, .dashboard-showcase, ' +
        '.process-image-container, .process-content, .case-study-content, ' +
        '.case-study-image, .case-study-stats, .case-detail-content, .desktop-showcase'
    );
    
    animatedElements.forEach((el) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open before scrolling
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effects
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    });

    console.log('RiseFinance Landing Page Loaded Successfully');
});

// Parallax effect for hero image (desktop only)
window.addEventListener('scroll', () => {
    if (window.innerWidth > 968) {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.credit-card-mockup');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    }
});