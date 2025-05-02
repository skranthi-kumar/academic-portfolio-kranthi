// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
});

// Dark Mode Toggle
const modeToggle = document.querySelector('.mode-toggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    modeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDarkMode);
});

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
    body.classList.add('dark-mode');
    modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Fade-in Animation on Scroll
const fadeInElements = document.querySelectorAll('.fade-in');

const handleScroll = () => {
    fadeInElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', handleScroll);
handleScroll(); // Trigger on page load

// Publication Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const publicationItems = document.querySelectorAll('.publication-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        publicationItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name && email && subject && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Visitor counter using CountAPI
document.addEventListener('DOMContentLoaded', () => {
    const visitorCountElement = document.getElementById('visitor-count');
    
    // Check if the user has visited before using localStorage
    const hasVisited = localStorage.getItem('hasVisited');

    // Function to fetch and display the visitor count
    const updateVisitorCount = () => {
        fetch('https://api.countapi.xyz/get/skranthi-kumar/academic-portfolio-kranthi')
            .then(response => response.json())
            .then(data => {
                visitorCountElement.textContent = data.value || 0;
            })
            .catch(error => {
                console.error('Error fetching visitor count:', error);
                visitorCountElement.textContent = 'N/A';
            });
    };

    // If the user hasn't visited before, increment the counter
    if (!hasVisited) {
        fetch('https://api.countapi.xyz/hit/skranthi-kumar/academic-portfolio-kranthi')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('hasVisited', 'true');
                visitorCountElement.textContent = data.value || 0;
            })
            .catch(error => {
                console.error('Error incrementing visitor count:', error);
                visitorCountElement.textContent = 'N/A';
            });
    } else {
        // If the user has visited, just fetch the current count
        updateVisitorCount();
    }
});