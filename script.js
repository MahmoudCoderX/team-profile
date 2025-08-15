// Optimized Team Profile JavaScript
// Performance optimized with modern ES6+ features

// Team data - moved to separate file for better maintainability
const teamData = {
    "team": [
        {
            "name": "Mahmoud",
            "username": "@mahmoud",
            "joined": "20-7-2005",
            "bio": "Public Policy Information Systems | Team Leader | Cybersecurity | Data Analyst",
            "location": "Sohag, Egypt",
            "blog": "https://mahmoud",
            "linkedin": "https://linkedin.com/in/mahmoud-dev",
            "instagram": "https://instagram.com/mahmoud.dev",
            "facebook": "https://facebook.com/mahmoud.dev"
        },
        {
            "name": "Alaa",
            "username": "@alaa",
            "joined": "21-3-2006",
            "bio": "Public Policy Information Systems | Frontend Developer",
            "location": "Assiut, Egypt",
            "blog": "https://alaa.com",
            "linkedin": "https://www.linkedin.com/in/alaa-kamel-0aab22374",
            "instagram": "https://www.instagram.com/alaa_fares0?igsh=MXIxbGg2M3R1OHV4eg%3D%3D&utm_source=qr",
            "facebook": "https://www.facebook.com/share/1CJ5AkRLKu/?mibextid=wwXIfr"
        },
        {
            "name": "Abdallah",
            "username": "@abdallah",
            "joined": "Joined Nov 22, 2021",
            "bio": "Public Policy Information Systems | Data Analyst",
            "location": "Assiut, Egypt",
            "blog": "https://abdallahdata",
            "linkedin": "https://linkedin.com/in/abdallah-data",
            "instagram": "https://instagram.com/abdallah.data",
            "facebook": "https://facebook.com/abdallah.data"
        },
        {
            "name": "Amr",
            "username": "@amr",
            "joined": "Joined Jan 10, 2022",
            "bio": "Public Policy Information Systems | Data Analyst",
            "location": "Minya, Egypt",
            "blog": "https://amr.com",
            "linkedin": "https://linkedin.com/in/amr-ui",
            "instagram": "https://instagram.com/amr.ui",
            "facebook": "https://facebook.com/amr.ui"
        }
    ]
};

// Cache DOM elements for better performance
const elements = {
    teamGrid: null,
    searchInput: null,
    themeToggle: null,
    backToTop: null,
    header: null
};

// Theme management
let isDarkTheme = true;

// Performance optimized initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    cacheElements();
    initializeTheme();
    setupEventListeners();
    setupBackToTop();
    setupHeaderScroll();
    setupPerformanceOptimizations();
    
    // Only setup animations if user prefers motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setupScrollAnimations();
        setupMouseInteractions();
        setupInteractiveTilt();
        setupRipples();
    }
}

// Cache frequently used DOM elements
function cacheElements() {
    elements.teamGrid = document.getElementById('teamGrid');
    elements.searchInput = document.getElementById('searchInput');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.backToTop = document.getElementById('backToTop');
    elements.header = document.querySelector('.header');
}

// Theme management with localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        toggleTheme();
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const body = document.body;
    
    if (isDarkTheme) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    }
}

// Performance optimized search with debouncing
let searchTimeout;
function filterTeamMembers(searchTerm) {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        const cards = document.querySelectorAll('.team-card');
        const searchLower = searchTerm.toLowerCase();
        
        cards.forEach(card => {
            const name = card.querySelector('.member-name')?.textContent?.toLowerCase() || '';
            const username = card.querySelector('.member-username')?.textContent?.toLowerCase() || '';
            const bio = card.querySelector('.member-bio')?.textContent?.toLowerCase() || '';
            
            const matches = name.includes(searchLower) || 
                           username.includes(searchLower) || 
                           bio.includes(searchLower);
            
            card.style.display = matches ? 'block' : 'none';
            card.classList.toggle('visible', matches);
        });
    }, 150); // Debounce search for better performance
}

// Event listeners setup
function setupEventListeners() {
    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Search functionality with performance optimizations
    if (elements.searchInput) {
        elements.searchInput.addEventListener('input', (e) => {
            filterTeamMembers(e.target.value);
        });
        
        // Keyboard shortcuts
        elements.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                elements.searchInput.value = '';
                filterTeamMembers('');
                elements.searchInput.blur();
            }
        });
    }
    
    // Card click effects
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.team-card');
        if (card) {
            addClickEffect(card);
        }
    });
}

// Optimized click effect
function addClickEffect(card) {
    card.style.transform = 'scale(0.98)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
}

// Back to Top functionality
function setupBackToTop() {
    if (!elements.backToTop) return;
    
    const showBackToTop = () => {
        if (window.pageYOffset > 300) {
            elements.backToTop.classList.add('show');
        } else {
            elements.backToTop.classList.remove('show');
        }
    };
    
    window.addEventListener('scroll', showBackToTop, { passive: true });
    
    elements.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Header scroll functionality with performance optimizations
function setupHeaderScroll() {
    if (!elements.header) return;
    
    let lastScrollTop = 0;
    let scrollTimer = null;
    let headerVisible = true;
    
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            elements.header.classList.add('scrolled');
            if (scrollTop > 100 && headerVisible) {
                elements.header.classList.add('hidden');
                headerVisible = false;
            }
        } else {
            elements.header.classList.remove('scrolled', 'hidden');
            headerVisible = true;
        }
        
        lastScrollTop = scrollTop;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Performance optimizations
function setupPerformanceOptimizations() {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Optimize animations for mobile
    if (window.innerWidth <= 768) {
        document.body.style.setProperty('--animation-duration', '0.3s');
    }
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.style.setProperty('--animation-duration', '0s');
    }
}

// Scroll animations with Intersection Observer
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.team-card, .about-card, .section-title, .stat-card, .detail-card');
    
    if (!animateElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${0.1 * index}s`;
        
        if (index % 3 === 0) element.classList.add('fade-in-left');
        else if (index % 3 === 1) element.classList.add('fade-in-up');
        else element.classList.add('fade-in-right');
        
        observer.observe(element);
    });
}

// Mouse interactions with throttling
function setupMouseInteractions() {
    let mouseMoveTimeout;
    
    const handleMouseMove = (e) => {
        if (mouseMoveTimeout) return;
        
        mouseMoveTimeout = setTimeout(() => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            document.body.style.setProperty('--mouse-x', `${x}%`);
            document.body.style.setProperty('--mouse-y', `${y}%`);
            
            mouseMoveTimeout = null;
        }, 16); // ~60fps
    };
    
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
}

// Interactive tilt effects
function setupInteractiveTilt() {
    const interactiveElements = document.querySelectorAll('.team-card, .about-card, .stat-card, .detail-card, .skill-category, .profile-avatar, .about-icon');
    
    interactiveElements.forEach((el) => {
        el.classList.add('interactive-tilt');
        
        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            
            const nx = dx / (rect.width / 2);
            const ny = dy / (rect.height / 2);
            
            const maxTilt = 8;
            const tiltX = (-ny * maxTilt).toFixed(2);
            const tiltY = (nx * maxTilt).toFixed(2);
            
            el.style.setProperty('--tiltX', tiltX + 'deg');
            el.style.setProperty('--tiltY', tiltY + 'deg');
        };
        
        const handleMouseLeave = () => {
            el.style.setProperty('--tiltX', '0deg');
            el.style.setProperty('--tiltY', '0deg');
        };
        
        el.addEventListener('mousemove', handleMouseMove, { passive: true });
        el.addEventListener('mouseleave', handleMouseLeave);
    });
}

// Ripple effects
function setupRipples() {
    const rippleTargets = document.querySelectorAll('.team-card, .about-card, .stat-card, .detail-card, .skill-category, .profile-avatar, .about-icon, .nav-btn, .cv-button, .theme-toggle, .back-to-top');
    
    rippleTargets.forEach((target) => {
        if (window.getComputedStyle(target).position === 'static') {
            target.style.position = 'relative';
        }
        
        target.addEventListener('click', (e) => {
            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            target.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });
}

// Utility functions
const utils = {
    formatNumber: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { teamData, utils };
}