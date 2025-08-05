// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    }
});

function handleContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    form.reset();
}

function handleNewsletterForm(form) {
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    form.reset();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
    
    // Add ARIA labels and roles
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
    }
    
    // Update ARIA expanded state when menu is toggled
    const navMenu = document.querySelector('.nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.category-card, .resource-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Add CSS for mobile menu
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 2rem;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 99;
        }
        
        .nav-menu.active {
            transform: translateY(0);
        }
        
        .nav-menu {
            flex-direction: column;
            gap: 1rem;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileMenuStyles); 

// Global products array
let products = [];

// Faceted Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Product data
    products = [
        // Arts & Crafts Products
        {
            id: 1,
            name: "Adaptive Paint Brushes",
            brand: "Melissa & Doug",
            url: "https://www.melissaanddoug.com/",
            description: "Easy-grip paint brushes designed for children with motor challenges. Features ergonomic handles and washable paint.",
            categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["physical-development", "sensory-activities"],
                age: ["toddler", "preschool"],
                "product-type": ["arts-crafts"]
            }
        },
        {
            id: 2,
            name: "Sensory Play Dough Kit",
            brand: "Play-Doh",
            url: "https://www.hasbro.com/en-us/brands/play-doh",
            description: "Non-toxic, scented play dough with textured tools for sensory exploration and fine motor development.",
            categories: {
                condition: ["autism", "down-syndrome"],
                goal: ["sensory-activities", "physical-development"],
                age: ["toddler", "preschool"],
                "product-type": ["arts-crafts"]
            }
        },
        {
            id: 3,
            name: "Adaptive Scissors Set",
            brand: "Fiskars",
            url: "https://www.fiskars.com/en-us/crafting",
            description: "Safety scissors with spring-loaded handles for easier cutting. Perfect for developing fine motor skills.",
            categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["physical-development"],
                age: ["preschool", "teen"],
                "product-type": ["arts-crafts"]
            }
        },

        // Communication Tools
        {
            id: 4,
            name: "Picture Communication Board",
            brand: "PECS",
            url: "https://www.pecsusa.com/",
            description: "Portable communication board with clear symbols and words for non-verbal children to express needs.",
            categories: {
                condition: ["autism", "cerebral-palsy"],
                goal: ["language", "socialization"],
                age: ["preschool", "teen"],
                "product-type": ["communication-tools"]
            }
        },
        {
            id: 5,
            name: "Speech Therapy Cards",
            brand: "Super Duper Publications",
            url: "https://www.superduperinc.com/",
            description: "Colorful cards with common words and phrases to help develop speech and language skills.",
            categories: {
                condition: ["down-syndrome", "autism"],
                goal: ["language"],
                age: ["toddler", "preschool"],
                "product-type": ["communication-tools"]
            }
        },
        {
            id: 6,
            name: "Digital Communication Device",
            brand: "Tobii Dynavox",
            url: "https://www.tobiidynavox.com/",
            description: "Simple touch-screen device with customizable buttons for communication needs.",
            categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["language", "socialization"],
                age: ["preschool", "teen"],
                "product-type": ["communication-tools"]
            }
        },

        // Active Play Products
        {
            id: 7,
            name: "Adaptive Tricycle",
            brand: "Radio Flyer",
            url: "https://www.radioflyer.com/",
            description: "Three-wheel bike with safety harness and adjustable supports for children with balance challenges.",
            categories: {
                condition: ["cerebral-palsy", "down-syndrome"],
                goal: ["physical-development"],
                age: ["preschool", "teen"],
                "product-type": ["active-play"]
            }
        },
        {
            id: 8,
            name: "Sensory Swing",
            brand: "Harkla",
            url: "https://www.harkla.co/",
            description: "Therapeutic swing that provides vestibular input and helps with balance and coordination.",
            categories: {
                condition: ["autism", "cerebral-palsy"],
                goal: ["sensory-activities", "physical-development"],
                age: ["toddler", "preschool"],
                "product-type": ["active-play"]
            }
        },
        {
            id: 9,
            name: "Adaptive Basketball Hoop",
            brand: "Little Tikes",
            url: "https://www.littletikes.com/",
            description: "Adjustable height basketball hoop with larger rim and softer ball for inclusive play.",
            categories: {
                condition: ["cerebral-palsy", "down-syndrome"],
                goal: ["physical-development", "socialization"],
                age: ["preschool", "teen"],
                "product-type": ["active-play"]
            }
        },

        // Puzzles
        {
            id: 10,
            name: "Large Piece Puzzle Set",
            brand: "Ravensburger",
            url: "https://www.ravensburger.com/",
            description: "Extra-large puzzle pieces with easy-grip handles for children with fine motor challenges.",
            categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["cognition", "physical-development"],
                age: ["toddler", "preschool"],
                "product-type": ["puzzles"]
            }
        },
        {
            id: 11,
            name: "Sound Puzzle Box",
            brand: "Melissa & Doug",
            url: "https://www.melissaanddoug.com/puzzles/",
            description: "Interactive puzzle that plays sounds when pieces are placed correctly, aiding auditory development.",
            categories: {
                condition: ["autism", "down-syndrome"],
                goal: ["cognition", "sensory-activities"],
                age: ["toddler", "preschool"],
                "product-type": ["puzzles"]
            }
        },
        {
            id: 12,
            name: "Tactile Memory Game",
            brand: "Educational Insights",
            url: "https://www.educationalinsights.com/",
            description: "Memory game with textured pieces to help develop tactile recognition and memory skills.",
            categories: {
                condition: ["autism", "cerebral-palsy"],
                goal: ["cognition", "sensory-activities"],
                age: ["preschool", "teen"],
                "product-type": ["puzzles"]
            }
        },

        // Additional Products for Variety
        {
            id: 13,
            name: "Weighted Blanket",
            brand: "Sensory Solutions",
            url: "https://www.sensorysolutions.com/",
            description: "Therapeutic weighted blanket providing deep pressure stimulation for sensory regulation.",
            categories: {
                condition: ["autism", "cerebral-palsy"],
                goal: ["sensory-activities"],
                age: ["preschool", "teen"],
                "product-type": ["active-play"]
            }
        },
        {
            id: 14,
            name: "Social Skills Board Game",
            brand: "ThinkFun",
            url: "https://www.thinkfun.com/",
            description: "Educational board game designed to teach social skills, turn-taking, and emotional regulation.",
            categories: {
                condition: ["autism", "down-syndrome"],
                goal: ["socialization", "cognition"],
                age: ["preschool", "teen"],
                "product-type": ["puzzles"]
            }
        },
        {
            id: 15,
            name: "Adaptive Writing Tools",
            brand: "PenAgain",
            url: "https://www.penagain.com/",
            description: "Set of ergonomic pens and pencils with grip supports for easier writing and drawing.",
            categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["physical-development", "language"],
                age: ["preschool", "teen"],
                "product-type": ["arts-crafts"]
            }
        },      

        {
              id: 16,
              name: "Kinetic Sand",
              brand: "Brand-generic",
              url: "https://www.cerebralpalsyguide.com/",
              description: "Moldable sand that never dries—great for fine motor, sensory and cognition.",
              categories: {
                condition: ["cerebral-palsy", "autism", "down-syndrome"],
                goal: ["sensory activities", "physical-development", "cognition"],
                age: ["preschool", "teen"],
                "product-type": ["arts-crafts"]
              }
            },
            {
              id: 17,
              name: "Teeter Popper",
              brand: "Fat Brain Toys",
              url: "https://www.cerebralpalsyguide.com/",
              description: "Suction-cup wobbler toy to build balance, coordination and gross motor.",
              categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["physical-development", "cognition"],
                age: ["toddler", "preschool"],
                "product-type": ["active-play"]
              }
            },
            {
              id: 18,
              name: "Spin Art Adapted Kit",
              brand: "Enabling Devices",
              url: "https://www.enablingdevices.com/product-category/adapted-toys-games/arts-crafts/",
              description: "Switch-activated spin-art to let users create visual art with a button.",
              categories: {
                condition: ["cerebral-palsy", "autism", "down-syndrome"],
                goal: ["sensory activities", "cognition", "socialization"],
                age: ["preschool", "teen"],
                "product-type": ["arts-crafts"]
              }
            },
            {
              id: 19,
              name: "Adapted Musical Cymbal",
              brand: "Enabling Devices",
              url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
              description: "Large-switch-activated cymbal to produce sound—supports cause-effect, sensory and social play.",
              categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["sensory activities", "language", "socialization"],
                age: ["preschool", "teen"],
                "product-type": ["communication-tools"]
              }
            },
            {
              id: 20,
              name: "Adapted Mini Dome Activity Center",
              brand: "Enabling Devices",
              url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
              description: "Switch-activated spinning, lights and music dome for sensory stimulation and motor planning.",
              categories: {
                condition: ["cerebral-palsy", "autism", "down-syndrome"],
                goal: ["sensory activities", "cognition", "physical-development"],
                age: ["toddler", "preschool"],
                "product-type": ["active-play"]
              }
            },
            {
              id: 21,
              name: "B-Woofer Switch-Adapted Guitar",
              brand: "Enabling Devices",
              url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
              description: "Switch-adapted guitar playing familiar melodies to promote interaction and sensory feedback.",
              categories: {
                condition: ["cerebral-palsy", "autism", "down-syndrome"],
                goal: ["sensory activities", "language", "cognition", "socialization"],
                age: ["preschool", "teen"],
                "product-type": ["active-play", "communication-tools"]
              }
            },
            {
              id: 22,
              name: "Adaptive grips & pencil holders",
              brand: "Crayola Adaptive Art Supplies",
              url: "https://www.crayola.com/products/featured/adaptive-art-supplies",
              description: "Adaptive art tools (crayons, markers, grips) for easier holding and fine motor.",
              categories: {
                condition: ["cerebral-palsy", "autism", "down-syndrome"],
                goal: ["physical-development", "cognition", "sensory activities"],
                age: ["toddler", "preschool"],
                "product-type": ["arts-crafts"]
              }
            },
            {
              id: 23,
              name: "Zot Artz Adaptive Art Tools",
              brand: "Zot Artz",
              url: "https://zotartz.com/",
              description: "Wheelchair-mounted adaptive art tools for creative expression, motor skills, concentration and social interaction.",
              categories: {
                condition: ["cerebral-palsy", "down-syndrome", "autism"],
                goal: ["motor skills", "cognition", "socialization"],
                age: ["preschool", "teen"],
                "product-type": ["arts-crafts"]
              }
            },
            {
              id: 24,
              name: "TACPAC Sensory Communication Package",
              brand: "TACPAC",
              url: "https://en.wikipedia.org/wiki/Tacpac",
              description: "Tactile + musical modules to foster communication of likes/dislikes via sensory response.",
              categories: {
                condition: ["autism", "down-syndrome", "cerebral-palsy"],
                goal: ["sensory activities", "language", "socialization"],
                age: ["toddler", "teen"],
                "product-type": ["communication-tools"]
              }
            },
            {
              id: 25,
              name: "Avaz AAC App",
              brand: "Avaz",
              url: "https://en.wikipedia.org/wiki/Avaz_app",
              description: "AAC picture-symbol speech-generating app for non-verbal children with ASD, CP, Down syndrome.",
              categories: {
                condition: ["autism", "cerebral-palsy", "down-syndrome"],
                goal: ["language", "socialization", "cognition"],
                age: ["preschool", "teen"],
                "product-type": ["communication-tools"]
              }
            },
            {
              id: 26,
              name: "PicTalky AAC System",
              brand: "PicTalky",
              url: "https://arxiv.org/abs/2109.12941",
              description: "AI-based AAC software with pictograms to improve language and expressive communication.",
              categories: {
                condition: ["autism", "language developmental delay", "down-syndrome"],
                goal: ["language", "cognition"],
                age: ["preschool", "teen"],
                "product-type": ["communication-tools"]
              }
            },
            {
            id: 27,
              name: "CosmoBot Therapy Robot",
              brand: "CosmoBot",
              url: "https://en.wikipedia.org/wiki/Cosmobot",
              description: "Robotic telerehab system supporting turn-taking, language and motor therapy for children with CP, ASD, Down syndrome.",
              categories: {
                condition: ["autism", "cerebral-palsy", "down-syndrome"],
                goal: ["socialization", "language", "physical-development"],
                age: ["toddler", "teen"],
                "product-type": ["active-play", "communication-tools"]
              }
            },
            {
              id: 28,
              name: "Foosbots Spinning Fidget Robot",
              brand: "Foosbots",
              url: "https://www.cerebralpalsyguide.com/",
              description: "Small squeeze-activated robots that kick a ball—improve fine motor and cause-effect play.",
              categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["cognition", "physical-development"],
                age: ["preschool", "teen"],
                "product-type": ["active-play", "puzzles"]
              }
            },
            {
              id: 29,
              name: "Musical Plush Caterpillar",
              brand: "Generic",
              url: "https://www.cerebralpalsyguide.com/",
              description: "Soft caterpillar with sections that play notes—sensory, motor and auditory stimulation.",
              categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["sensory activities", "physical-development", "cognition"],
                age: ["toddler", "preschool"],
                "product-type": ["active-play"]
              }
            },
            {
              id: 30,
              name: "Mozart Magic Cube",
              brand: "Generic",
              url: "https://www.cerebralpalsyguide.com/",
              description: "Six soft instrument buttons allowing combination play—musical cognition and motor skill.",
              categories: {
                condition: ["cerebral-palsy", "autism"],
                goal: ["sensory activities", "cognition"],
                age: ["toddler", "teen"],
                "product-type": ["active-play"]
              }
            },
            {
              id: 31,
              name: "Fat Brain Toys Dimpl Baby",
              brand: "Fat Brain Toys",
              url: "https://www.parents.com/",
              description: "Push-button sensory toy with soft bubbles—fine-motor, sensory feedback and early cognition.",
              categories: {
                condition: ["autism", "cerebral-palsy"],
                goal: ["sensory activities", "cognition", "physical-development"],
                age: ["toddler"],
                "product-type": ["active-play"]
              }
            },
            {
              id: 32,
              name: "Play-Doh Modeling Compound",
              brand: "Play-Doh (Hasbro)",
              url: "https://www.parents.com/",
              description: "Moldable clay promoting creativity, fine motor, cognition and language interaction.",
              categories: {
                condition: ["autism", "cerebral-palsy", "down-syndrome"],
                goal: ["sensory activities", "cognition", "language"],
                age: ["preschool"],
                "product-type": ["arts-crafts"]
              }
            },
            {
              id: 33,
              name: "Wooden Song Puzzle",
              brand: "Melissa & Doug",
              url: "https://www.parents.com/",
              description: "Puzzle playing songs—supports hand–eye, cognition and language.",
              categories: {
                condition: ["autism", "cerebral-palsy", "down-syndrome"],
                goal: ["cognition", "language", "physical-development"],
                age: ["preschool"],
                "product-type": ["puzzles"]
              }
            },
            {
              id: 34,
              name: "Magnetic Matching Game",
              brand: "Fat Brain Toys / Disney",
              url: "https://www.parents.com/",
              description: "Image pairing game to build vocabulary, memory and social matching.",
              categories: {
                condition: ["autism", "down-syndrome"],
                goal: ["cognition", "language", "socialization"],
                age: ["preschool", "teen"],
                "product-type": ["puzzles"]
              }
            },
            {
            id: 35,
              name: "Fat Brain Toys PlayTab Sensory Board",
              brand: "Fat Brain Toys",
              url: "https://www.parents.com/",
              description: "Modular tactile boardset for sensory exploration and fine motor/cognition play.",
              categories: {
                condition: ["autism", "cerebral-palsy"],
                goal: ["sensory activities", "physical-development", "cognition"],
                age: ["toddler", "preschool"],
                "product-type": ["arts-crafts"]
              }
            },

                {
                  id: 36,
                  name: "Totally Tactile Communicator",
                  brand: "Enabling Devices",
                  url: "https://www.enablingdevices.com/product/totally-tactile-communicator/",
                  description: "Tactile-symbol AAC communicator for non-verbal users; supports tactile access to communication.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["language", "socialization", "cognition"],
                    age: ["preschool", "teen"],
                    "product-type": ["communication-tools"]
                  }
                },
                {
                  id: 37,
                  name: "PECS Picture Exchange Communication System",
                  brand: "Pyramid Educational Consultants",
                  url: "https://www.pecsusa.com/",
                  description: "Proven-picture-exchange boards and cards for initiating functional communication.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["language", "socialization"],
                    age: ["toddler", "preschool", "teen"],
                    "product-type": ["communication-tools"]
                  }
                },
                {
                  id: 38,
                  name: "TalkTablet Pro Speech Tablet",
                  brand: "Gus Communication Devices",
                  url: "https://usaspeechtablets.com/",
                  description: "AAC speech tablet pre-loaded with TalkTablet app to support non-verbal communication.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["language", "cognition", "socialization"],
                    age: ["preschool", "teen"],
                    "product-type": ["communication-tools"]
                  }
                },
                {
                  id: 39,
                  name: "Mega Bloks / DUPLO Blocks",
                  brand: "LEGO",
                  url: "https://www.lego.com/",
                  description: "Chunky building blocks enhance gross and fine motor, cognition, language via cooperative play.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["cognition", "language", "physical-development", "socialization"],
                    age: ["toddler", "preschool"],
                    "product-type": ["active-play", "puzzles"]
                  }
                },
                {
                  id: 40,
                  name: "See & Spell Learning Toy",
                  brand: "Melissa & Doug",
                  url: "https://www.melissaanddoug.com/",
                  description: "Spelling puzzle boards to support vocabulary, language formation, and visual recognition.",
                  categories: {
                    condition: ["autism", "down-syndrome"],
                    goal: ["language", "cognition"],
                    age: ["preschool", "teen"],
                    "product-type": ["puzzles"]
                  }
                },
                {
                  id: 41,
                  name: "Harkla Sensory Swing",
                  brand: "Harkla",
                  url: "https://www.harkla.co/",
                  description: "Indoor sensory swing to support vestibular input, balance, motor planning and calming.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["sensory activities", "physical-development"],
                    age: ["toddler", "preschool"],
                    "product-type": ["active-play"]
                  }
                },
                {
                  id: 42,
                  name: "Music-Therapy Robot Platform",
                  brand: "CosmoBot (research prototype)",
                  url: "https://en.wikipedia.org/wiki/Cosmobot",
                  description: "Robotic system for turn-taking, motor control and social-communication therapy.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["language", "physical-development", "socialization", "cognition"],
                    age: ["preschool", "teen"],
                    "product-type": ["active-play", "communication-tools"]
                  }
                },
                {
                  id: 43,
                  name: "CoVoL Cooperative Vocabulary Game",
                  brand: "CoVoL (research prototype)",
                  url: "",
                  description: "Two-player digital vocabulary game to foster turn-taking and real-world word use.",
                  categories: {
                    condition: ["autism"],
                    goal: ["language", "socialization", "cognition"],
                    age: ["preschool", "teen"],
                    "product-type": ["puzzles"]
                  }
                },
                {
                  id: 44,
                  name: "TangToys Peer-Touch Smart Toy",
                  brand: "TangToys",
                  url: "",
                  description: "Sensor-enabled tangible toys that communicate peer presence and emotions via play.",
                  categories: {
                    condition: ["autism"],
                    goal: ["socialization", "cognition", "sensory activities"],
                    age: ["preschool", "teen"],
                    "product-type": ["active-play"]
                  }
                },
                {
                  id: 45,
                  name: "LiteBrite Pegboard Puzzle",
                  brand: "LiteBrite",
                  url: "https://litebrite.hasbro.com/",
                  description: "Pegboard puzzles with bright pegs, encouraging color sorting, fine motor and creativity.",
                  categories: {
                    condition: ["autism", "down-syndrome", "cerebral-palsy"],
                    goal: ["cognition", "sensory activities", "physical-development"],
                    age: ["preschool", "teen"],
                    "product-type": ["arts-crafts", "puzzles"]
                  }
                },
                {
                  id: 46,
                  name: "Beanbag Toss / Bocce Ball Set",
                  brand: "Various",
                  url: "",
                  description: "Toss-and-catch beanbag/bocce games for motor planning, coordination, turn-taking.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["physical-development", "socialization", "cognition"],
                    age: ["preschool", "teen"],
                    "product-type": ["active-play"]
                  }
                },
                {
                  id: 47,
                  name: "Weighted Blanket",
                  brand: "Therapy blankets",
                  url: "",
                  description: "Deep pressure sensory input to calm and support focus in sensory-seeking individuals.",
                  categories: {
                    condition: ["autism", "down-syndrome", "cerebral-palsy"],
                    goal: ["sensory activities", "cognition"],
                    age: ["toddler", "preschool"],
                    "product-type": ["active-play"]
                  }
                },
                {
                  id: 48,
                  name: "Sturdy Shape Sorter",
                  brand: "Fat Brain Toys",
                  url: "https://www.fatbraintoys.com/",
                  description: "Large-piece shape sorter for fine motor, cognitive matching and cause‐effect play.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["cognition", "physical-development", "sensory activities"],
                    age: ["toddler", "preschool"],
                    "product-type": ["puzzles"]
                  }
                },
                {
                  id: 49,
                  name: "Switch-Activated Bubble Blower",
                  brand: "TFH Special Needs Toys",
                  url: "https://specialneedstoys.com/usa/",
                  description: "Switched bubble blower to engage cause-effect, motor and sensory play.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["sensory activities", "cognition", "physical-development"],
                    age: ["toddler", "preschool"],
                    "product-type": ["active-play"]
                  }
                },
                {
                  id: 50,
                  name: "Alphabet Story Cards / Social Stories",
                  brand: "Social Stories / Carol Gray",
                  url: "",
                  description: "Visual story-based cards to teach social routines and communication skills.",
                  categories: {
                    condition: ["autism", "down-syndrome"],
                    goal: ["language", "socialization"],
                    age: ["preschool", "teen"],
                    "product-type": ["communication-tools"]
                  }
                },
                {
                  id: 51,
                  name: "Yoga Flashcards for Movement",
                  brand: "ChoosePT toolkit",
                  url: "",
                  description: "Yoga/animal movement flashcards to model imitation, body awareness and communication.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["physical-development", "language", "socialization"],
                    age: ["toddler", "preschool"],
                    "product-type": ["active-play"]
                  }
                },
                {
                  id: 52,
                  name: "Foam Tunnel & Crash Mat Set",
                  brand: "Generic sensory gym",
                  url: "",
                  description: "Gross-motor foam tunnel/mat for crawling, balance and sensory movement play.",
                  categories: {
                    condition: ["autism", "cerebral-palsy"],
                    goal: ["physical-development", "sensory activities", "socialization"],
                    age: ["toddler", "preschool"],
                    "product-type": ["active-play"]
                  }
                },
                {
                  id: 53,
                  name: "Switch-Adapted Art Spinner",
                  brand: "Enabling Devices",
                  url: "https://www.enablingdevices.com/product-category/adapted-toys-games/arts-crafts/",
                  description: "Spinner kit activated by button for making art and exploring cause-effect and creativity.",
                  categories: {
                    condition: ["autism", "cerebral-palsy", "down-syndrome"],
                    goal: ["creative production", "sensory activities", "cognition"],
                    age: ["preschool", "teen"],
                    "product-type": ["arts-crafts"]
                  }
                },
                {
                  id: 54,
                  name: "Dimpl Baby Button Sensory Toy",
                  brand: "Fat Brain Toys",
                  url: "https://www.fatbraintoys.com/",
                  description: "Press-button bubbles with colorful sensory feedback—great for early cognition and fine motor.",
                  categories: {
                    condition: ["autism", "cerebral-palsy"],
                    goal: ["sensory activities", "cognition", "physical-development"],
                    age: ["toddler"],
                    "product-type": ["active-play"]
                  }
                },
                {
                  id: 55,
                  name: "Light Up Magic Ball",
                  brand: "ArtCreativity",
                  url: "",
                  description: "Visual-calming light ball ideal for sensory regulation and focus.",
                  categories: {
                    condition: ["autism", "down-syndrome"],
                    goal: ["sensory activities", "cognition"],
                    age: ["preschool", "toddler"],
                    "product-type": ["active-play"]
                  }
                },
                    {
                      id: 56,
                      name: "7-Level Communication Builder",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product/7-level-communication-builders/",
                      description: "Progressive communicator for speech-generation across multiple message levels.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["language", "socialization", "cognition"],
                        age: ["preschool", "teen"],
                        "product-type": ["communication-tools"]
                      }
                    },
                    {
                      id: 57,
                      name: "Adapted Battery-Operated Scissors",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                      description: "Switch-adapted scissors for arts & crafts via accessible activation.",
                      categories: {
                        condition: ["cerebral-palsy", "autism", "down-syndrome"],
                        goal: ["physical-development", "cognition"],
                        age: ["preschool", "teen"],
                        "product-type": ["arts-crafts"]
                      }
                    },
                    {
                      id: 58,
                      name: "Activity Wall Panels",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                      description: "Sensory wall-mounted panels for tactile, visual and interactive play.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["sensory activities", "cognition"],
                        age: ["preschool", "teen"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 59,
                      name: "Adapted Musical Crystal Ball",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                      description: "Switch-activated kaleidoscopic light and music dome for sensory-cognitive play.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["sensory activities", "cognition"],
                        age: ["preschool", "teen"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 60,
                      name: "Activity Gym (Switch-Adapted)",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                      description: "Multi-activity switch-activated gym: music, mirror, tactile surfaces.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["sensory activities", "physical-development", "cognition"],
                        age: ["toddler", "preschool"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 61,
                      name: "Switch Plate Bead Chains",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                      description: "Bead-chain toys activated via switch for fine motor and sensory cause-effect play.",
                      categories: {
                        condition: ["autism", "cerebral-palsy"],
                        goal: ["physical-development", "sensory activities", "cognition"],
                        age: ["toddler", "preschool"],
                        "product-type": ["puzzles", "active-play"]
                      }
                    },
                    {
                      id: 62,
                      name: "Fiber Flash Lamp w/ Music",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                      description: "Fiber-optic light display with music, activated by switch for soothing sensory use.",
                      categories: {
                        condition: ["autism", "down-syndrome", "cerebral-palsy"],
                        goal: ["sensory activities", "cognition"],
                        age: ["toddler", "preschool", "teen"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 63,
                      name: "Switch-Adapted Pie Face Game",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                      description: "Adapted game where pressing a switch triggers the pie face action—fun cause-effect play.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["cognition", "socialization", "physical-development"],
                        age: ["preschool", "teen"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 64,
                      name: "Sip & Puff Switch (Easy Flex)",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product-category/switches/",
                      description: "Sip-and-puff switch for users with limited motor control to access adapted toys.",
                      categories: {
                        condition: ["cerebral-palsy", "autism", "down-syndrome"],
                        goal: ["physical-development", "cognition"],
                        age: ["toddler", "teen"],
                        "product-type": ["communication-tools"]
                      }
                    },
                    {
                      id: 65,
                      name: "Totally Tactile Communicator",
                      brand: "Enabling Devices",
                      url: "https://www.enablingdevices.com/product/totally-tactile-communicator/",
                      description: "Tactile-symbol AAC communicator providing touch-based message selection.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["language", "socialization", "cognition"],
                        age: ["preschool", "teen"],
                        "product-type": ["communication-tools"]
                      }
                    },
                    {
                      id: 66,
                      name: "Magicarpet Interactive Play Carpet",
                      brand: "Magicarpet",
                      url: "",
                      description: "Interactive carpet platform encouraging parent-child play for autistic kids to bond & engage.",
                      categories: {
                        condition: ["autism"],
                        goal: ["socialization", "physical-development", "cognition"],
                        age: ["toddler", "preschool"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 67,
                      name: "TangToys Sensor-Enabled Toys",
                      brand: "TangToys",
                      url: "",
                      description: "Communication-aware toys that detect peer presence and encourage emotion-based play.",
                      categories: {
                        condition: ["autism"],
                        goal: ["socialization", "cognition", "sensory activities"],
                        age: ["preschool", "teen"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 68,
                      name: "LoopBoxes Musical Instrument Set",
                      brand: "LoopBoxes",
                      url: "",
                      description: "Modular accessible music devices for collaborative looping and social music creation.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["sensory activities", "socialization", "cognition"],
                        age: ["preschool", "teen"],
                        "product-type": ["communication-tools", "active-play"]
                      }
                    },
                    {
                      id: 69,
                      name: "SPRITE Tabletop Robot",
                      brand: "SPRITE",
                      url: "",
                      description: "Socially assistive tabletop robot engaging through affective movement and interaction.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["socialization", "language", "cognition"],
                        age: ["preschool", "teen"],
                        "product-type": ["communication-tools", "active-play"]
                      }
                    },
                    {
                      id: 70,
                      name: "Soft Textured Balls Pack",
                      brand: "LearningSpace UK",
                      url: "",
                      description: "Textured balls for tactile, grip, coordination and motor skill stimulation.",
                      categories: {
                        condition: ["down-syndrome", "autism", "cerebral-palsy"],
                        goal: ["sensory activities", "physical-development"],
                        age: ["toddler", "preschool"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 71,
                      name: "Sensory Tactile Board",
                      brand: "LearningSpace UK",
                      url: "",
                      description: "Sensory board with varied textures, shapes and colors for tactile exploration.",
                      categories: {
                        condition: ["down-syndrome", "autism"],
                        goal: ["sensory activities", "cognition"],
                        age: ["toddler", "preschool"],
                        "product-type": ["arts-crafts", "active-play"]
                      }
                    },
                    {
                      id: 72,
                      name: "Bubble Tube Sensory Lamp",
                      brand: "LearningSpace UK",
                      url: "",
                      description: "Bubble tube with flowing bubbles and color changes for visual sensory calming.",
                      categories: {
                        condition: ["down-syndrome", "autism"],
                        goal: ["sensory activities", "cognition"],
                        age: ["toddler", "preschool"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 73,
                      name: "Weighted Sensory Pillow",
                      brand: "UK Sensory Products",
                      url: "",
                      description: "Vibration or weighted pillow for proprioceptive regulation and self-soothing.",
                      categories: {
                        condition: ["down-syndrome", "autism", "cerebral-palsy"],
                        goal: ["sensory activities", "cognition"],
                        age: ["preschool"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 74,
                      name: "Foam Tunnel & Crash Mat Set",
                      brand: "Physical Therapy Sensory Gym",
                      url: "",
                      description: "Gross motor tunnel for crawling, balance, proprioceptive and social play.",
                      categories: {
                        condition: ["autism", "cerebral-palsy"],
                        goal: ["physical-development", "sensory activities", "socialization"],
                        age: ["toddler", "preschool"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 75,
                      name: "Shape Sorter Large Pieces",
                      brand: "Fat Brain Toys",
                      url: "https://www.fatbraintoys.com/",
                      description: "Chunky shape sorter promoting matching, coordination and cognitive sorting.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["cognition", "physical-development", "sensory activities"],
                        age: ["toddler", "preschool"],
                        "product-type": ["puzzles"]
                      }
                    },
                    {
                      id: 76,
                      name: "Yoga Movement Flashcards",
                      brand: "ChoosePT Toolkit",
                      url: "https://www.choosept.com/health-tips/tips-select-toys-children-with-special-needs",
                      description: "Yoga-themed movement cards to encourage imitation, body-awareness and social turn-taking.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["physical-development", "language", "socialization"],
                        age: ["toddler", "preschool"],
                        "product-type": ["active-play"]
                      }
                    },
                    {
                      id: 77,
                      name: "Play-Doh Modeling Compound",
                      brand: "Hasbro Play-Doh",
                      url: "",
                      description: "Moldable clay encouraging creativity, fine motor, sensory and language interaction.",
                      categories: {
                        condition: ["autism", "cerebral-palsy", "down-syndrome"],
                        goal: ["sensory activities", "cognition", "language"],
                        age: ["preschool"],
                        "product-type": ["arts-crafts"]
                      }
                    },
                    {
                      id: 78,
                      name: "LiteBrite Pegboard",
                      brand: "LiteBrite/Hasbro",
                      url: "https://litebrite.hasbro.com/",
                      description: "Pegboard puzzle with colored pegs to support visual sorting, fine motor and cognition.",
                      categories: {
                        condition: ["autism", "down-syndrome", "cerebral-palsy"],
                        goal: ["cognition", "sensory activities", "physical-development"],
                        age: ["preschool", "teen"],
                        "product-type": ["arts-crafts", "puzzles"]
                      }
                    },


                        {
                          id: 79,
                          name: "Talkable 4 In-Line Direct Communicator",
                          brand: "Enabling Devices (Cheap Talk)",
                          url: "https://www.enablingdevices.com/product/cheap-talk-4-in-line-direct/",
                          description: "Four-message communicator—direct-select buttons let nonverbal users play recorded speech.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["language", "socialization", "cognition"],
                            age: ["preschool", "teen"],
                            "product-type": ["communication-tools"]
                          }
                        },
                        {
                          id: 80,
                          name: "Talkable II / III / IV Communicators",
                          brand: "Enabling Devices",
                          url: "https://www.at.mo.gov/aac/",
                          description: "Portable communicators with 2–4 message buttons and icon covers for tactile access.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["language", "socialization"],
                            age: ["preschool", "teen"],
                            "product-type": ["communication-tools"]
                          }
                        },
                        {
                          id: 81,
                          name: "Classroom Communication Kit",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product/classroom-communication-kit/",
                          description: "Kit with multiple communicators and icon-making software—supports language & peer interaction.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["language", "socialization", "cognition"],
                            age: ["preschool", "teen"],
                            "product-type": ["communication-tools"]
                          }
                        },
                        {
                          id: 82,
                          name: "Activity Gym (Switch-Adapted)",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Switch-activated multi-activity gym with mirror, music, tactile surfaces for sensory and motor play.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["physical-development", "sensory activities", "cognition"],
                            age: ["toddler", "preschool"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                          id: 83,
                          name: "Adapted Battery-Operated Scissors",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Switch-adapted craft scissors for independent cutting practice and fine motor development.",
                          categories: {
                            condition: ["cerebral-palsy", "autism", "down-syndrome"],
                            goal: ["physical-development", "cognition"],
                            age: ["preschool", "teen"],
                            "product-type": ["arts-crafts"]
                          }
                        },
                        {
                          id: 84,
                          name: "Activity Wall Panels (set)",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Wall-mounted sensory/tactile play panels to integrate fine motor, touch and cause-effect learning.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["sensory activities", "cognition"],
                            age: ["preschool", "teen"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                          id: 85,
                          name: "Adapted Musical Crystal Ball",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Switch-activated kaleidoscopic ball with lights and music for sensory-cognitive interaction.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["sensory activities", "cognition"],
                            age: ["preschool", "teen"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                          id: 86,
                          name: "Baby Monkey Drum",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Drum-playing toy—with switch access—teaches animal sounds, colors, rhythm & motor skills.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["sensory activities", "language", "cognition"],
                            age: ["toddler", "preschool"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                          id: 87,
                          name: "Baby Retriever / Terrier Plush",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Switch-activated realistic plush dogs that bark, wag tail & move—engaging sensory & motor response.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["sensory activities", "socialization", "cognition"],
                            age: ["toddler", "preschool"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                          id: 88,
                          name: "Busy Ball Popper",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Switch-triggered air-ball popper that releases balls—teaches cause-effect and fine motor track play.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["physical-development", "cognition", "socialization"],
                            age: ["preschool", "teen"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                          id: 89,
                          name: "Bongo Drums (adapted)",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Real bongo drums adapted for switch use—promote rhythm, coordination and expressive motor play.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["sensory activities", "physical-development", "cognition"],
                            age: ["preschool", "teen"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                        id: 90,
                          name: "Bubble Blower (switch-activated)",
                          brand: "Enabling Devices (TFH)",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Switch-activated bubble blower for sensory cause-effect play and motor control practice.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["sensory activities", "physical-development", "cognition"],
                            age: ["toddler", "preschool"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                          id: 91,
                          name: "Big Water Toy",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Water-play toy with tactile experiences, switch-accessible activation and cause-effect learning.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["sensory activities", "cognition", "physical-development"],
                            age: ["toddler", "preschool"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                          id: 92,
                          name: "Adapted Pie Face Game",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Switch-adapted version of Pie Face game—pressing switch triggers the action, fun social play.",
                          categories: {
                            condition: ["autism", "cerebral-palsy", "down-syndrome"],
                            goal: ["cognition", "socialization", "physical-development"],
                            age: ["preschool", "teen"],
                            "product-type": ["active-play"]
                          }
                        },
                        {
                        id: 93,
                          name: "Battery Interrupter Kit",
                          brand: "Enabling Devices",
                          url: "https://www.enablingdevices.com/product-category/adapted-toys-games/",
                          description: "Convert non-adapted battery toys into switch-accessible devices for inclusive play.",
                          categories: {
                            condition: ["cerebral-palsy", "autism", "down-syndrome"],
                            goal: ["cognition", "physical-development"],
                            age: ["preschool", "teen"],
                            "product-type": ["active-play"]
                          }
                        }

                      

          
    ];

    // Initialize faceted search
    initializeFacetedSearch(products);
});

function initializeFacetedSearch(products) {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const sortSelect = document.getElementById('sortSelect');
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');

    // Render initial products
    renderProducts(products, productsGrid);

    // Filter event listeners
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const filteredProducts = filterProducts(products);
            renderProducts(filteredProducts, productsGrid);
            updateProductCount(filteredProducts.length, products.length);
        });
    });

    // Clear filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            renderProducts(products, productsGrid);
            updateProductCount(products.length, products.length);
        });
    }

    // Sort products
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const currentProducts = getVisibleProducts();
            const sortedProducts = sortProducts(currentProducts, sortSelect.value);
            renderProducts(sortedProducts, productsGrid);
        });
    }
}

function filterProducts(products) {
    const activeFilters = getActiveFilters();
    
    if (Object.keys(activeFilters).length === 0) {
        return products;
    }

    return products.filter(product => {
        // Check if product matches all active filter categories
        for (const [filterType, filterValues] of Object.entries(activeFilters)) {
            if (filterValues.length === 0) continue;
            
            const productCategories = product.categories[filterType] || [];
            const hasMatch = filterValues.some(filterValue => 
                productCategories.includes(filterValue)
            );
            
            if (!hasMatch) return false;
        }
        
        return true;
    });
}

function getActiveFilters() {
    const checkboxes = document.querySelectorAll('.filter-checkbox:checked');
    const filters = {
        condition: [],
        goal: [],
        age: [],
        'product-type': []
    };

    checkboxes.forEach(checkbox => {
        const filterType = checkbox.getAttribute('data-filter');
        const filterValue = checkbox.value;
        
        if (filterType === 'goal') {
            filters.goal.push(filterValue);
        } else if (filterType === 'age') {
            filters.age.push(filterValue);
        } else if (filterType === 'product-type') {
            filters['product-type'].push(filterValue);
        } else {
            filters.condition.push(filterValue);
        }
    });

    // Remove empty filter categories
    Object.keys(filters).forEach(key => {
        if (filters[key].length === 0) {
            delete filters[key];
        }
    });

    return filters;
}

function renderProducts(products, container) {
    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters to see more products.</p>
            </div>
        `;
        return;
    }

    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);

    const categories = getAllCategories(product);
    
    card.innerHTML = `
        <div class="product-row">
            <div class="product-info">
                <div class="product-header">
                    <div class="product-title-section">
                        <a href="${product.url}" class="product-title" target="_blank">${product.name}</a>
                        <div class="product-brand">${product.brand}</div>
                    </div>
                </div>
                <div class="product-categories">
                    ${categories.conditions.map(cat => `<span class="product-category condition-category">${cat}</span>`).join('')}
                    ${categories.goals.map(cat => `<span class="product-category goal-category">${cat}</span>`).join('')}
                </div>
                <p class="product-description">${product.description}</p>
            </div>
        </div>
    `;

    return card;
}

function getAllCategories(product) {
    const conditionCategories = [];
    const goalCategories = [];
    
    // Add condition categories
    if (product.categories.condition) {
        product.categories.condition.forEach(condition => {
            const label = getCategoryLabel(condition);
            if (label) conditionCategories.push(label);
        });
    }
    
    // Add goal categories
    if (product.categories.goal) {
        product.categories.goal.forEach(goal => {
            const label = getCategoryLabel(goal);
            if (label) goalCategories.push(label);
        });
    }
    
    return {
        conditions: conditionCategories.slice(0, 2), // Limit to 2 condition categories
        goals: goalCategories.slice(0, 2) // Limit to 2 goal categories
    };
}

function getCategoryLabel(value) {
    const labels = {
        'cerebral-palsy': 'Cerebral Palsy',
        'autism': 'Autism',
        'down-syndrome': 'Down Syndrome',
        'cognition': 'Cognition',
        'language': 'Language',
        'physical-development': 'Physical',
        'sensory-activities': 'Sensory',
        'socialization': 'Social',
        'toddler': 'Toddler',
        'preschool': 'Preschool',
        'teen': 'Teen',
        'arts-crafts': 'Arts & Crafts',
        'communication-tools': 'Communication',
        'active-play': 'Active Play',
        'puzzles': 'Puzzles'
    };
    
    return labels[value] || value;
}

function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'brand':
            sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
        case 'popularity':
            // For now, sort by ID as a proxy for popularity
            sortedProducts.sort((a, b) => a.id - b.id);
            break;
    }
    
    return sortedProducts;
}

function getVisibleProducts() {
    const visibleCards = document.querySelectorAll('.product-card:not(.hidden)');
    const productIds = Array.from(visibleCards).map(card => 
        parseInt(card.getAttribute('data-product-id'))
    );
    
    return products.filter(product => productIds.includes(product.id));
}

function updateProductCount(visibleCount, totalCount) {
    const productCount = document.getElementById('productCount');
    if (productCount) {
        if (visibleCount === totalCount) {
            productCount.textContent = `Showing all ${totalCount} products`;
        } else {
            productCount.textContent = `Showing ${visibleCount} of ${totalCount} products`;
        }
    }
} 