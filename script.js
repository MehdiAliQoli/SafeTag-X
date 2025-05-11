/**
 * SafeTag X - Main JavaScript File
 * Handles interactive elements and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Transform hamburger to X
        const bars = mobileMenu.querySelectorAll('.bar');
        bars[0].style.transform = mobileMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        bars[1].style.opacity = mobileMenu.classList.contains('active') ? '0' : '1';
        bars[2].style.transform = mobileMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger
            const bars = mobileMenu.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Sticky Navigation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
    
    // Active Navigation Link on Scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            }
            showTestimonial(currentTestimonial);
        });
        
        nextBtn.addEventListener('click', function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto advance testimonials
    setInterval(function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const toggle = otherItem.querySelector('.faq-toggle i');
                    toggle.className = 'fas fa-plus';
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
            const toggle = item.querySelector('.faq-toggle i');
            
            if (item.classList.contains('active')) {
                toggle.className = 'fas fa-minus';
            } else {
                toggle.className = 'fas fa-plus';
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send this to a server
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateElements = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .pricing-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .step, .pricing-card, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on page load and scroll
    window.addEventListener('load', animateElements);
    window.addEventListener('scroll', animateElements);
});



document.getElementById('Dark-Theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

