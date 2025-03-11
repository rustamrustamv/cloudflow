// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Pricing Toggle
const pricingToggle = document.querySelector('.toggle');
const monthlyPrices = document.querySelectorAll('.plan-monthly-price');
const yearlyPrices = document.querySelectorAll('.plan-yearly-price');

pricingToggle.addEventListener('click', () => {
    pricingToggle.classList.toggle('yearly');
    
    if (pricingToggle.classList.contains('yearly')) {
        monthlyPrices.forEach(price => price.style.display = 'none');
        yearlyPrices.forEach(price => price.style.display = 'block');
    } else {
        monthlyPrices.forEach(price => price.style.display = 'block');
        yearlyPrices.forEach(price => price.style.display = 'none');
    }
});

// Testimonials Slider
const sliderTrack = document.querySelector('.testimonials-track');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

if (sliderDots.length > 0) {
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        sliderDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Auto slide testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % sliderDots.length;
        updateSlider();
    }, 5000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.getAttribute('href') !== '#') {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Dark Mode Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

// Apply the right theme based on saved preference or OS preference
if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

// Toggle dark mode on checkbox change
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Listen for OS theme changes
prefersDarkScheme.addEventListener('change', function(event) {
    if (!localStorage.getItem('theme')) {
        if (event.matches) {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.checked = false;
        }
    }
});

// FAQ Accordion Functionality
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        // Check if this item is already active
        const isActive = item.classList.contains('active');
        
        // First, close all items
        accordionItems.forEach(accItem => {
            accItem.classList.remove('active');
        });
        
        // If the clicked item wasn't active before, open it
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Authentication Modal Functionality
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.querySelector('.nav-links li:nth-last-child(2) a');
const signupBtn = document.querySelector('.nav-links li:last-child a');
const closeButtons = document.querySelectorAll('.close-modal');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');

// Open login modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Open signup modal
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close modals when clicking the X
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modals when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Switch between login and signup
if (showSignupLink && showLoginLink) {
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
}

// Form validation
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulated login (in a real app, this would call a backend API)
        console.log('Login attempt with:', { email });
        alert('Login successful! (This is a demo)');
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Simulated signup (in a real app, this would call a backend API)
        console.log('Signup attempt with:', { name, email });
        alert('Account created successfully! (This is a demo)');
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formFields = contactForm.querySelectorAll('input, textarea');

    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        subject: /^.{5,100}$/,
        message: /^.{10,1000}$/
    };

    // Error messages
    const errorMessages = {
        name: 'Please enter a valid name (2-50 characters, letters only)',
        email: 'Please enter a valid email address',
        subject: 'Subject must be between 5-100 characters',
        message: 'Message must be between 10-1000 characters'
    };

    // Validate on input
    formFields.forEach(field => {
        field.addEventListener('input', () => {
            validateField(field);
        });
        
        field.addEventListener('blur', () => {
            validateField(field);
        });
    });

    // Validate single field
    function validateField(field) {
        const fieldName = field.getAttribute('name');
        const errorElement = field.nextElementSibling;
        
        if (!field.value.trim()) {
            errorElement.textContent = 'This field is required';
            field.classList.add('invalid');
            return false;
        }
        
        if (patterns[fieldName] && !patterns[fieldName].test(field.value)) {
            errorElement.textContent = errorMessages[fieldName];
            field.classList.add('invalid');
            return false;
        }
        
        errorElement.textContent = '';
        field.classList.remove('invalid');
        return true;
    }

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate all fields
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // In a real application, you would send the form data to a server here
            
            // Show success message
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We'll get back to you soon.</p>
            `;
            
            // Hide the form and show success message
            contactForm.style.display = 'none';
            formContainer.prepend(successMessage);
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // After 5 seconds, hide success message and show form again
            setTimeout(() => {
                successMessage.style.display = 'none';
                contactForm.style.display = 'block';
            }, 5000);
        }
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Show button after scrolling down 500px
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animated Counters
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // The lower the faster

// Start counter animation when it comes into view
const statsSection = document.querySelector('.stats');
let counterStarted = false;

if (statsSection && counters.length > 0) {
    window.addEventListener('scroll', () => {
        if (isInViewport(statsSection) && !counterStarted) {
            counterStarted = true;
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText.replace(/,/g, '');
                    
                    // Calculate the increment
                    const increment = target / speed;
                    
                    // If counter is less than target, add increment
                    if (count < target) {
                        // Round up and set counter value
                        counter.innerText = Math.ceil(count + increment).toLocaleString();
                        // Call function every ms
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                
                updateCount();
            });
        }
    });
}

// Helper function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}