// ─── UTILITIES ───
const $ = (id) => document.getElementById(id);
const q = (sel) => document.querySelector(sel);
const qA = (sel) => document.querySelectorAll(sel);

// ─── MARQUEE SETUP ───
const marqueeItems = [
    'Bespoke Fashion','·','Holiness Usen','·','Eket','·','Akwa Ibom',
    '·','Ankara','·','Evening Wear','·','Custom Design','·','Ray\'z Fashion Luxuria',
    '·','Unisex Wear','·','Made With Love','·','Bespoke Fashion','·','Holiness Usen','·','Eket','·','Akwa Ibom',
    '·','Ankara','·','Evening Wear','·','Custom Design','·','Ray\'z Fashion Luxuria',
    '·','Unisex Wear','·','Made With Love'
];

function initMarquee() {
    const track = JSON.parse(JSON.stringify($('marqueeTrack'))); // Simple way to clone if needed, but not necessary here
    const trackEl = $('marqueeTrack');
    if (!trackEl) return;
    marqueeItems.forEach(text => {
        const item = document.createElement('div');
        item.className = 'marquee-item' + (text === '·' ? ' gold' : '');
        item.textContent = text;
        trackEl.appendChild(item);
    });
}

// ─── NAVIGATION & MENU ───
function initNav() {
    const nav = $('mainNav');
    const menuToggle = $('menuToggle');
    const navLinks = $('navLinks');

    window.addEventListener('scroll', () => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// CAROUSEL LOGIC 
const designs = [
    { src: 'img/model.png', label: 'Ethereal Collection' },
    { src: 'img/model2.png', label: 'Luxe Traditional' },
    { src: 'img/model3.png', label: 'Modern Classic' },
    { src: 'img/model4.png', label: 'Urban Royalty' },
    { src: 'img/model5.png', label: 'Signature Suits' },
    { src: 'img/model6.png', label: 'Velvet Nights' },
    { src: 'img/model7.png', label: 'Golden Hour' }
];

let curIdx = 0;

function initCarousel() {
    const track = $('carouselTrack');
    const dotsContainer = $('carouselDots');
    if (!track || !dotsContainer) return;

    designs.forEach((img, i) => {
        // Create Item
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.label}">
            <div class="carousel-item-label">${img.label}</div>
        `;
        track.appendChild(item);

        // Create Dot
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    $('prevBtn').addEventListener('click', () => {
        curIdx = (curIdx - 1 + designs.length) % designs.length;
        updateCarousel();
    });

    $('nextBtn').addEventListener('click', () => {
        curIdx = (curIdx + 1) % designs.length;
        updateCarousel();
    });

    // Resize listener to fix track position
    window.addEventListener('resize', updateCarousel);
}

function updateCarousel() {
    const track = $('carouselTrack');
    const dots = qA('.dot');
    if (!track || !track.firstElementChild) return;

    const itemWidth = track.firstElementChild.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = curIdx * (itemWidth + gap);
    
    track.style.transform = `translateX(-${offset}px)`;
    
    dots.forEach((d, i) => d.classList.toggle('active', i === curIdx));
}

function goToSlide(index) {
    curIdx = index;
    updateCarousel();
}

// ─── WARDROBE GRID ───
const wardrobeItems = [
    { src: 'img/model4.png', label: 'Corporate Chic', class: 'tall' },
    { src: 'img/model5.png', label: 'Ebony Evening' },
    { src: 'img/model6.png', label: 'Fusion Wear' },
    { src: 'img/model7.png', label: 'The Akwa-Ibom Pride', class: 'tall' },
    { src: 'img/model2.png', label: 'Gold Trim Suit' },
    { src: 'img/model3.png', label: 'Lace Perfection' }
];

function initWardrobe() {
    const grid = $('wardrobeGrid');
    if (!grid) return;

    wardrobeItems.forEach(item => {
        const cell = document.createElement('div');
        cell.className = `wardrobe-cell ${item.class || ''}`;
        cell.innerHTML = `
            <img src="${item.src}" alt="${item.label}">
            <div class="wardrobe-cell-overlay">
                <span>${item.label}</span>
            </div>
        `;
        grid.appendChild(cell);
    });
}

// ─── SCROLL REVEAL ───
function initReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    qA('.reveal').forEach(el => observer.observe(el));
}

// ─── INITIALIZATION ───
document.addEventListener('DOMContentLoaded', () => {
    initMarquee();
    initNav();
    initCarousel();
    initWardrobe();
    initReveal();
    
    // Smooth Scroll for Nav Links
    qA('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = q(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
