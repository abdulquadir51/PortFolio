/* ============================================================
   ABDUL QUADIR PORTFOLIO – SCRIPT.JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. AOS INITIALIZATION
    // ============================================================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        mirror: false,
    });

    // ============================================================
    // 2. TYPED.JS – HERO TYPING EFFECT
    // ============================================================
    if (document.getElementById('role-text')) {
        new Typed('#role-text', {
            strings: [
                'Electronic &amp; Electrical Engineer Student',
                'Specializing in VLSI &amp; Embedded Systems',
                'Passionate about Chip Design &amp; Power Technologies',
            ],
            typeSpeed: 60,
            backSpeed: 35,
            backDelay: 2200,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    // ============================================================
    // 3. NAVBAR – SCROLL EFFECT & ACTIVE LINK HIGHLIGHTING
    // ============================================================
    const navbar = document.getElementById('mainNavbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Smooth close mobile menu on link click
    document.querySelectorAll('.nav-pill').forEach(link => {
        link.addEventListener('click', () => {
            const collapse = document.getElementById('navbarNav');
            const bsCollapse = bootstrap.Collapse.getInstance(collapse);
            if (bsCollapse) bsCollapse.hide();
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-pill');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.style.color = 'var(--accent-blue)';
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // ============================================================
    // 4. DARK / LIGHT MODE TOGGLE
    // ============================================================
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    const htmlEl = document.documentElement;

    const applyTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    };

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ============================================================
    // 5. SCROLL TO TOP BUTTON
    // ============================================================
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================
    // 6. FOOTER YEAR
    // ============================================================
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // ============================================================
    // 7. CONTACT FORM – FETCH API SUBMISSION
    // ============================================================
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const successAlert = document.getElementById('form-success');
    const errorAlert = document.getElementById('form-error');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading state
            btnText.classList.add('d-none');
            btnSpinner.classList.remove('d-none');
            submitBtn.disabled = true;
            successAlert.classList.add('d-none');
            errorAlert.classList.add('d-none');

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' },
                });

                if (response.ok) {
                    // Success
                    successAlert.classList.remove('d-none');
                    form.reset();
                    // Auto-hide after 5s
                    setTimeout(() => successAlert.classList.add('d-none'), 5000);
                } else {
                    throw new Error('Server Error');
                }
            } catch (err) {
                errorAlert.classList.remove('d-none');
                setTimeout(() => errorAlert.classList.add('d-none'), 5000);
            } finally {
                // Restore button
                btnText.classList.remove('d-none');
                btnSpinner.classList.add('d-none');
                submitBtn.disabled = false;
            }
        });
    }

    // ============================================================
    // 8. SKILL CHIPS – RIPPLE EFFECT ON CLICK
    // ============================================================
    document.querySelectorAll('.skill-chip').forEach(chip => {
        chip.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(56,189,248,0.3);
                top: ${e.clientY - rect.top - size / 2}px;
                left: ${e.clientX - rect.left - size / 2}px;
                transform: scale(0);
                animation: rippleAnim 0.5s ease forwards;
                pointer-events: none;
                z-index: 0;
            `;
            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });

    // Inject ripple keyframes dynamically
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleAnim {
            to { transform: scale(2); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ============================================================
    // 9. HERO IMAGE – FALLBACK CHAIN
    // ============================================================
    const heroImg = document.getElementById('hero-profile-img');
    if (heroImg) {
        heroImg.addEventListener('error', function () {
            // Final fallback with initials avatar
            this.src = 'https://ui-avatars.com/api/?name=Abdul+Quadir&size=400&background=38BDF8&color=0B1120&bold=true';
            this.onerror = null; // prevent loop
        });
    }


    // ============================================================
    // 11. PROJECT CARDS – TILT ON HOVER
    // ============================================================
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const maxTilt = 5;
            const tiltX = (y / (rect.height / 2)) * maxTilt;
            const tiltY = -(x / (rect.width / 2)) * maxTilt;
            this.style.transform = `translateY(-10px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.transition = 'transform 0.5s ease';
        });
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.1s ease';
        });
    });

    // ============================================================
    // 12. SCROLL PROGRESS INDICATOR (subtle top bar)
    // ============================================================
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        height: 3px;
        background: linear-gradient(90deg, #38BDF8, #2DD4BF);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s linear;
    `;
    document.body.prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });

    // ============================================================
    // 13. LAZY IMAGE LOADING OBSERVER
    // ============================================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imgObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }

    // ============================================================
    // 14. CONSOLE GREETING
    // ============================================================
    console.log(
        '%c 👋 Hey there, fellow dev! ',
        'background: linear-gradient(135deg, #38BDF8, #2DD4BF); color: #0B1120; font-weight: bold; padding: 10px 20px; border-radius: 4px; font-size: 14px;'
    );
    console.log(
        '%c Portfolio built with ❤️ by Abdul Quadir ',
        'color: #38BDF8; font-size: 12px; padding: 4px;'
    );

});
