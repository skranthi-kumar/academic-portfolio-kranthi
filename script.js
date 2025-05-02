// Navigation menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    const isExpanded = navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 160) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Dark mode toggle
const modeToggle = document.querySelector('.mode-toggle');
modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    modeToggle.querySelector('i').classList.toggle('fa-moon', !isDarkMode);
    modeToggle.querySelector('i').classList.toggle('fa-sun', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
});

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    modeToggle.querySelector('i').classList.remove('fa-moon');
    modeToggle.querySelector('i').classList.add('fa-sun');
}

// Publication filters
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        publicationItems.forEach(item => {
            const category = item.getAttribute('data-category');
            item.style.display = filter === 'all' || category === filter ? 'block' : 'none';
        });
    });
});

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || name.length < 2) {
            alert('Please enter a valid name.');
            return;
        }
        if (!email || !emailRegex.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        if (!subject || subject.length < 5) {
            alert('Please enter a subject (min 5 characters).');
            return;
        }
        if (!message || message.length < 10) {
            alert('Please enter a message (min 10 characters).');
            return;
        }

        alert(`Thank you, ${name}! Your message has been received.`);
        contactForm.reset();
    });
}

// Fade-in animations
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeInElements.forEach(element => observer.observe(element));