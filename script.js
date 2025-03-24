document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let scrollThreshold = 100; // Threshold for background change
    let isMenuOpen = false;

    // Menu toggle functionality
    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (isMenuOpen) {
            // Store current scroll position
            const scrollY = window.scrollY;
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.width = '100%';
        } else {
            // Restore scroll position
            const scrollY = body.style.top;
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    });

    // Scroll-based header behavior
    window.addEventListener('scroll', () => {
        if (isMenuOpen) return; // Don't handle scroll events when menu is open
        
        const currentScroll = window.pageYOffset;
        
        // Add/remove background based on scroll position
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 150) {
            // Scrolling down & past threshold
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up or at top
            navbar.classList.remove('nav-hidden');
        }

        lastScroll = currentScroll;
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && 
            !navLinks.contains(e.target) && 
            navLinks.classList.contains('active')) {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
        }
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
