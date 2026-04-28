// ===== GLOBAL VARIABLES =====
const WA_NUMBER = '628818671759'; // GANTI NOMOR WA ANDA

// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    // Active nav link
    updateActiveNav();

    // Hide/show header
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// ===== UPDATE ACTIVE NAV =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current || 
            link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ===== WHATSAPP ORDER FUNCTION =====
function orderService(serviceName) {
    const baseMessage = `Halo Joki FF Elite! 🚀

Saya tertarik dengan paket:
- ${serviceName}

Mohon info:
1. Harga terbaru
2. Estimasi waktu
3. Syarat & ketentuan

Terima kasih! 😊`;
    
    const url = `https://wa.me/${628818671759}?text=${encodeURIComponent(baseMessage)}`;
    window.open(url, '_blank');
}

// ===== SCROLL ANIMATIONS =====
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

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .service-card, .hero').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    observer.observe(el);
});

// ===== FORM HANDLER (KONTAK PAGE) =====
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.contact-form-group');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const message = `Pesan dari Website:\n\nNama: ${formData.get('name')}\nWA: ${formData.get('phone')}\nPesan: ${formData.get('message')}`;
            
            const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
            
            // Reset form
            form.reset();
            alert('Pesan terkirim! Admin akan segera merespon via WA.');
        });
    });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + (target > 1000 ? 'k+' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        if (window.scrollY > 100) {
            updateCounter();
        }
    });
}

window.addEventListener('scroll', animateCounters);