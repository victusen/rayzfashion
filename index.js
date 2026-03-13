document.addEventListener('DOMContentLoaded', () => {
    // Essence Carousel Logic
    const words = document.querySelectorAll('.essence-word');
    let currentIndex = 0;

    function nextWord() {
        const activeWord = words[currentIndex];
        activeWord.classList.remove('active');
        activeWord.classList.add('exit');
        
        setTimeout(() => {
            activeWord.classList.remove('exit');
        }, 600);

        currentIndex = (currentIndex + 1) % words.length;
        words[currentIndex].classList.add('active');
    }

    if (words.length > 0) {
        setInterval(nextWord, 2000);
    }

    // Form Submission (Simulated)
    const form = document.querySelector('.concierge-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = "booking's sending...";
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.textContent = 'THANK YOU';
                btn.style.background = '#D4AF37';
                form.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.opacity = '1';
                    btn.style.background = '#F5F5F5';
                }, 3000);
            }, 1500);
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply basic entrance animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0.1';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
});
