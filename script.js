// Video Background Controls
const video = document.getElementById('bg-video');
const closeBtn = document.getElementById('closeBtn');

video.addEventListener('click', function() {
    this.classList.add('clear');
    closeBtn.classList.add('show');
});

closeBtn.addEventListener('click', function() {
    video.classList.remove('clear');
    closeBtn.classList.remove('show');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Horizontal scroll effect for categories
function updateCategoryCards() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    const cards = grid.querySelectorAll('.category-card');
    const gridRect = grid.getBoundingClientRect();
    const centerX = gridRect.left + gridRect.width / 2;

    cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenterX);
        const maxDistance = gridRect.width / 2;
        const scale = Math.max(0.8, 1 - (distance / maxDistance) * 0.2);
        const rotateY = ((cardCenterX - centerX) / maxDistance) * 20;
        const opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4);

        if (distance < 200) {
            card.classList.add('center');
        } else {
            card.classList.remove('center');
        }

        card.style.transform = `scale(${scale}) rotateY(${-rotateY}deg)`;
        card.style.opacity = opacity;
    });
}

// Horizontal scroll effect for destinations
function updateDestinationCards() {
    const grid = document.getElementById('destinationsGrid');
    if (!grid) return;
    
    const cards = grid.querySelectorAll('.destination-large');
    const gridRect = grid.getBoundingClientRect();
    const centerX = gridRect.left + gridRect.width / 2;

    cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenterX);
        const maxDistance = gridRect.width / 2;
        const scale = Math.max(0.75, 1 - (distance / maxDistance) * 0.25);
        const rotateY = ((cardCenterX - centerX) / maxDistance) * 25;
        const opacity = Math.max(0.5, 1 - (distance / maxDistance) * 0.5);

        if (distance < 250) {
            card.classList.add('center');
        } else {
            card.classList.remove('center');
        }

        card.style.transform = `scale(${scale}) rotateY(${-rotateY}deg)`;
        card.style.opacity = opacity;
    });
}

const categoriesGrid = document.getElementById('categoriesGrid');
const destinationsGrid = document.getElementById('destinationsGrid');

if (categoriesGrid) {
    categoriesGrid.addEventListener('scroll', updateCategoryCards);
    // Initial update
    updateCategoryCards();
}

if (destinationsGrid) {
    destinationsGrid.addEventListener('scroll', updateDestinationCards);
    // Initial update
    updateDestinationCards();
}

// Click to scroll to center
document.querySelectorAll('.category-card').forEach((card, index) => {
    card.addEventListener('click', function() {
        const grid = document.getElementById('categoriesGrid');
        if (!grid) return;
        
        const cardWidth = card.offsetWidth + 30; // width + gap
        const scrollPosition = (index * cardWidth) - (grid.offsetWidth / 2) + (cardWidth / 2);
        grid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    });
});

document.querySelectorAll('.destination-large').forEach((card, index) => {
    card.addEventListener('click', function() {
        const grid = document.getElementById('destinationsGrid');
        if (!grid) return;
        
        const cardWidth = card.offsetWidth + 30;
        const scrollPosition = (index * cardWidth) - (grid.offsetWidth / 2) + (cardWidth / 2);
        grid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    });
});

// Scroll animations for other elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.tour-card, .guide-card').forEach(el => {
    observer.observe(el);
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing! Stay tuned for amazing safari deals and tips.');
        this.reset();
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Replace with your actual WhatsApp number (include country code without + or spaces)
    // Example: For +250 788 123 456, use: 250788123456
    const whatsappNumber = '250788123456'; // REPLACE THIS WITH YOUR ACTUAL NUMBER
    
    // Find all WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('a[href="#whatsapp"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pre-filled message for WhatsApp
            const message = encodeURIComponent('Hi! I\'m interested in booking a safari with Seek Wild Africa. Can you help me plan my trip?');
            
            // WhatsApp URL
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
        });
    });
    
    // Intersection Observer for Plan Section animations
    const planImages = document.querySelector('.plan-images');
    const planText = document.querySelector('.plan-text');
    
    if (planImages && planText) {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Stop observing after animation triggers
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(planImages);
        observer.observe(planText);
    }
});