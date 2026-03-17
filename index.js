document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // HAMBURGER / MOBILE MENU DRAWER
    // =============================================
    const hamburger   = document.querySelector('.hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');
    const navOverlay  = document.getElementById('navOverlay');
    const mobileClose = document.getElementById('mobileMenuClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    function openMenu() {
        mobileMenu.classList.add('open');
        navOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburger)   hamburger.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (navOverlay)  navOverlay.addEventListener('click', closeMenu);
    mobileLinks.forEach(function(link) { link.addEventListener('click', closeMenu); });


    // =============================================
    // MODELS CAROUSEL  (spotlight / peek + infinite loop)
    // =============================================
    var track    = document.getElementById('modelsTrack');
    var dotsWrap = document.getElementById('modelsDots');
    var CARD_GAP = 24;
    var autoTimer        = null;
    var isDragging       = false;
    var dragStart        = 0;
    var dragOffset       = 0;
    var currentTranslate = 0;

    if (track) {
        // --- 1. Clone cards for infinite loop ---
        var realCards = Array.from(track.children);
        var totalReal = realCards.length;

        if (totalReal > 0) {
            // Append clones (forward loop)
            realCards.forEach(function(c) { track.appendChild(c.cloneNode(true)); });
            // Prepend clones (backward loop)
            realCards.slice().reverse().forEach(function(c) { track.prepend(c.cloneNode(true)); });

            var allCards = Array.from(track.children);

            // Start at first real card (after prepended clones)
            var mcIndex = totalReal;

            // --- 2. Centre-offset calculation ---
            // We want the active card centred in the wrapper viewport.
            // translate = (wrapperWidth / 2) - (cardWidth / 2)
            // --- Core translate ---
            // offsetWidth gives layout width (unaffected by CSS scale transforms)
            function getCardWidth() {
                return allCards[totalReal].offsetWidth;
            }

            function getWrapperWidth() { return track.parentElement.offsetWidth; }

            function centredTranslate(index) {
                var cw = getCardWidth();
                var ww = getWrapperWidth();
                return (ww / 2) - (cw / 2) - index * (cw + CARD_GAP);
            }

            // --- 3. Active-card highlight ---
            function updateActive() {
                allCards.forEach(function(c) { c.classList.remove('is-active'); });
                if (allCards[mcIndex]) allCards[mcIndex].classList.add('is-active');
            }

            // --- 4. Dots ---
            function buildDots() {
                dotsWrap.innerHTML = '';
                realCards.forEach(function(_, i) {
                    var btn = document.createElement('button');
                    btn.className = 'models-dot' + (i === 0 ? ' active' : '');
                    btn.setAttribute('aria-label', 'Go to model ' + (i + 1));
                    (function(idx) {
                        btn.addEventListener('click', function() { goTo(totalReal + idx, true); });
                    })(i);
                    dotsWrap.appendChild(btn);
                });
            }

            function updateDots() {
                var realIdx = ((mcIndex - totalReal) % totalReal + totalReal) % totalReal;
                dotsWrap.querySelectorAll('.models-dot').forEach(function(d, i) {
                    d.classList.toggle('active', i === realIdx);
                });
            }

            // --- 5. Core move ---
            function setTranslate(px, animated) {
                track.style.transition = animated
                    ? 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none';
                track.style.transform  = 'translateX(' + px + 'px)';
                currentTranslate = px;
            }

            function goTo(index, animated) {
                mcIndex = index;
                setTranslate(centredTranslate(mcIndex), animated !== false);
                updateActive();
                updateDots();
            }

            // --- 6. Infinite-loop snap (after CSS transition ends) ---
            track.addEventListener('transitionend', function() {
                if (mcIndex <= totalReal - 1) {
                    mcIndex += totalReal;
                    setTranslate(centredTranslate(mcIndex), false);
                    updateActive();
                } else if (mcIndex >= totalReal * 2) {
                    mcIndex -= totalReal;
                    setTranslate(centredTranslate(mcIndex), false);
                    updateActive();
                }
            });

            // --- 7. Auto advance ---
            function startAuto() {
                stopAuto();
                autoTimer = setInterval(function() { goTo(mcIndex + 1, true); }, 3000);
            }
            function stopAuto() { clearInterval(autoTimer); }

            // --- 8. Drag / swipe ---
            function onDragStart(clientX) {
                isDragging = true;
                dragStart  = clientX;
                dragOffset = 0;
                track.style.transition = 'none';
            }

            function onDragMove(clientX) {
                if (!isDragging) return;
                dragOffset = clientX - dragStart;
                track.style.transform = 'translateX(' + (currentTranslate + dragOffset) + 'px)';
            }

            function onDragEnd() {
                if (!isDragging) return;
                isDragging = false;
                track.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                var threshold = getCardWidth() * 0.18;
                if (dragOffset < -threshold) {
                    goTo(mcIndex + 1, true);
                } else if (dragOffset > threshold) {
                    goTo(mcIndex - 1, true);
                } else {
                    setTranslate(currentTranslate, true);
                }
            }

            // Mouse
            track.addEventListener('mousedown',  function(e) { stopAuto(); onDragStart(e.clientX); });
            track.addEventListener('mousemove',  function(e) { onDragMove(e.clientX); });
            track.addEventListener('mouseup',    function()  { onDragEnd(); startAuto(); });
            track.addEventListener('mouseleave', function()  { if (isDragging) { onDragEnd(); startAuto(); } });

            // Touch
            track.addEventListener('touchstart', function(e) { stopAuto(); onDragStart(e.touches[0].clientX); }, { passive: true });
            track.addEventListener('touchmove',  function(e) { onDragMove(e.touches[0].clientX); },              { passive: true });
            track.addEventListener('touchend',   function()  { onDragEnd(); startAuto(); });

            // Pause on hover
            track.addEventListener('mouseenter', stopAuto);
            track.addEventListener('mouseleave', startAuto);

            // Re-centre on resize
            window.addEventListener('resize', function() { goTo(mcIndex, false); });

            // Init
            buildDots();
            goTo(mcIndex, false);
            startAuto();
        }
    }


    // =============================================
    // FORM SUBMISSION
    // =============================================
    var form = document.querySelector('.concierge-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = e.target.querySelector('button');
            var originalText = btn.textContent;
            btn.textContent = "booking's sending...";
            btn.style.opacity = '0.7';
            setTimeout(function() {
                btn.textContent = 'THANK YOU';
                btn.style.background = '#D4AF37';
                form.reset();
                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.style.opacity = '1';
                    btn.style.background = '#000';
                }, 3000);
            }, 1500);
        });
    }


    // =============================================
    // INTERSECTION OBSERVER FADE-IN
    // =============================================
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(function(section) {
        // Skip the models carousel – it manages its own opacity per-card.
        // Applying section-level opacity here would override card .is-active opacity.
        if (section.id === 'models-section') return;
        section.style.opacity = '0.1';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });


    // =============================================
    // FLOATING BACK-TO-TOP BUTTON
    // =============================================
    var floatBtn = document.querySelector('.floating-btn');
    if (floatBtn) {
        window.addEventListener('scroll', function() {
            floatBtn.classList.toggle('show', window.scrollY > 300);
        });
        floatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
