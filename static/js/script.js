/**
 * Smile Bright Dental - Main JavaScript
 * Handles interactive elements and enhancements for the dental clinic website
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Optimize image loading
    const lazyImages = document.querySelectorAll('.service-image img, .gallery-image img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px' // Load images 200px before they become visible
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.classList.add('fade-in');
        });
    }
    
    // Ensure proper image sizing regardless of zoom level
    function adjustImageSizes() {
        const serviceImages = document.querySelectorAll('.service-image img');
        serviceImages.forEach(img => {
            const container = img.closest('.service-image');
            if (container && window.innerWidth >= 992) {
                img.style.maxHeight = '400px';
            } else if (container) {
                img.style.maxHeight = '300px';
            }
        });
    }
    
    // Call on page load and resize
    adjustImageSizes();
    window.addEventListener('resize', adjustImageSizes);
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (empty anchor)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset by navbar height for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation enhancement
    const appointmentForm = document.querySelector('#appointment-form form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            // Email validation
            const emailField = this.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                    
                    // Add error message if not present
                    let errorMsg = emailField.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('invalid-feedback')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('invalid-feedback');
                        errorMsg.textContent = 'Please enter a valid email address.';
                        emailField.parentNode.appendChild(errorMsg);
                    }
                }
            }
            
            // Phone validation
            const phoneField = this.querySelector('#phone');
            if (phoneField && phoneField.value) {
                const phonePattern = /^[\d\s\-\(\)]+$/;
                if (!phonePattern.test(phoneField.value)) {
                    isValid = false;
                    phoneField.classList.add('is-invalid');
                    
                    // Add error message if not present
                    let errorMsg = phoneField.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('invalid-feedback')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('invalid-feedback');
                        errorMsg.textContent = 'Please enter a valid phone number.';
                        phoneField.parentNode.appendChild(errorMsg);
                    }
                }
            }
            
            if (isValid) {
                // Show success message
                appointmentForm.innerHTML = `
                    <div class="text-center">
                        <div class="mb-4">
                            <i class="fas fa-check-circle text-success" style="font-size: 3rem;"></i>
                        </div>
                        <h3>Thank You!</h3>
                        <p class="lead">Your appointment request has been submitted.</p>
                        <p>We'll contact you shortly to confirm your appointment.</p>
                        <a href="/" class="btn btn-primary mt-3">Return to Home</a>
                    </div>
                `;
                
                // Scroll to the success message
                appointmentForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Reset validation on input
        appointmentForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }
    
    // Testimonial readmore functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const testimonialId = this.getAttribute('data-testimonial');
            const shortText = document.querySelector(`#${testimonialId} .short-text`);
            const fullText = document.querySelector(`#${testimonialId} .full-text`);
            
            if (shortText && fullText) {
                shortText.classList.toggle('d-none');
                fullText.classList.toggle('d-none');
                
                if (this.textContent.includes('Read More')) {
                    this.textContent = 'Read Less';
                } else {
                    this.textContent = 'Read More';
                }
            }
        });
    });
    
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Gallery filter functionality
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    
    if (galleryFilters.length > 0) {
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all filters
                galleryFilters.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const galleryItems = document.querySelectorAll('.gallery-item');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Handle back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
