// ============================================
// אהוד שמואל — משרד עריכת דין
// Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // -------- Navbar scroll --------
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (!navbar) return;
        if (window.scrollY > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }

    window.addEventListener('scroll', () => {
        handleNavScroll();
        handleAOS();
    });
    handleNavScroll();

    // -------- Mobile menu --------
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('mobileOverlay');

    function toggleMenu() {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileToggle && navLinks && overlay) {
        mobileToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) toggleMenu();
            });
        });
    }

    // -------- Dropdowns --------
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = toggle.closest('.has-dropdown');
                document.querySelectorAll('.has-dropdown').forEach(dd => {
                    if (dd !== parent) dd.classList.remove('open');
                });
                parent.classList.toggle('open');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown').forEach(dd => dd.classList.remove('open'));
        }
    });

    // -------- Smooth scroll --------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // -------- AOS (Animate on Scroll) --------
    function handleAOS() {
        document.querySelectorAll('[data-aos]').forEach(el => {
            const rect = el.getBoundingClientRect();
            const delay = parseInt(el.dataset.aosDelay) || 0;
            if (rect.top < window.innerHeight * 0.88 && !el.classList.contains('aos-animate')) {
                setTimeout(() => el.classList.add('aos-animate'), delay);
            }
        });
    }
    handleAOS();

    // -------- HERO SLIDER --------
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function startSlideAuto() {
        slideInterval = setInterval(nextSlide, 6500);
    }

    function resetSlideAuto() {
        clearInterval(slideInterval);
        startSlideAuto();
    }

    if (slides.length > 0) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetSlideAuto();
            });
        });
        startSlideAuto();
    }

    // -------- Multi-step contact form --------
    let currentStep = 1;
    const totalSteps = 3;
    const submitBtn = document.getElementById('formSubmitBtn');
    const backBtn = document.getElementById('formBackBtn');
    const progressFill = document.getElementById('progressFill');
    const form = document.getElementById('contactForm');

    function showStep(step) {
        document.querySelectorAll('.form-step-content').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`formStep${step}`);
        if (target) target.classList.add('active');

        if (progressFill) progressFill.style.width = `${(step / totalSteps) * 100}%`;

        document.querySelectorAll('.progress-label').forEach((label, i) => {
            label.classList.toggle('active', i + 1 === step);
        });

        if (backBtn) backBtn.style.display = step > 1 ? 'flex' : 'none';

        if (submitBtn) {
            submitBtn.innerHTML = step === totalSteps
                ? 'שליחה <i class="fas fa-paper-plane"></i>'
                : 'המשך <i class="fas fa-arrow-left"></i>';
        }
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (currentStep < totalSteps) {
                if (currentStep === 1) {
                    const name = document.getElementById('name').value.trim();
                    const phone = document.getElementById('phone').value.trim();
                    if (!name || !phone) {
                        alert('אנא מלאו שם וטלפון');
                        return;
                    }
                }
                currentStep++;
                showStep(currentStep);
            } else {
                const formCard = document.querySelector('.contact-card-form');
                formCard.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>הפנייה נשלחה בהצלחה</h3>
                        <p>תודה שפניתם אלינו. אחד מאנשי המשרד יחזור אליכם בהקדם.</p>
                    </div>
                `;
            }
        });
    }

    // -------- FAQ Accordion --------
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // -------- Phone formatting --------
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^\d-]/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            e.target.value = value;
        });
    }

    // -------- Stats counter animation --------
    const statNums = document.querySelectorAll('.stat-num[data-count]');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        const statsSec = document.querySelector('.stats');
        if (!statsSec) return;
        const rect = statsSec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            statsAnimated = true;
            statNums.forEach(el => {
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const start = performance.now();

                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const value = Math.floor(target * eased);
                    el.innerHTML = value + (suffix ? `<span>${suffix}</span>` : '');
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
        }
    }
    window.addEventListener('scroll', animateStats);
    animateStats();
});
