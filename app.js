document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScrollEffect();
    initIntersectionAnimations();
    startTypingAnimation();
});

function initMobileMenu() {
    const toggleButtons = document.querySelectorAll('.menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const panel = menu ? menu.querySelector('.tech-menu-panel') : null;
    const overlay = menu ? menu.querySelector('.tech-menu-overlay') : null;
    const links = menu ? menu.querySelectorAll('.mobile-link') : [];

    if (!menu || !panel || toggleButtons.length === 0) {
        return;
    }

    const body = document.body;
    const iconButtons = Array.from(toggleButtons).filter(btn => btn.querySelector('i'));

    const applyMenuGlassState = () => {
        if (menu.classList.contains('menu-open')) {
            panel.classList.add('glass-panel');
        } else {
            panel.classList.remove('glass-panel');
        }
    };

    const setButtonState = isOpen => {
        iconButtons.forEach(btn => {
            btn.classList.toggle('is-active', isOpen);
        });
        toggleButtons.forEach(btn => btn.setAttribute('aria-expanded', String(isOpen)));
    };

    const openMenu = () => {
        if (menu.classList.contains('menu-open')) {
            return;
        }
        menu.classList.remove('menu-closed');
        menu.classList.add('menu-open');
        body.classList.add('menu-open');
        applyMenuGlassState();
        setButtonState(true);
    };

    const closeMenu = () => {
        if (!menu.classList.contains('menu-open')) {
            return;
        }
        menu.classList.remove('menu-open');
        menu.classList.add('menu-closed');
        body.classList.remove('menu-open');
        applyMenuGlassState();
        setButtonState(false);
    };

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (menu.classList.contains('menu-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    });

    overlay?.addEventListener('click', closeMenu);

    links.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('scroll', applyMenuGlassState, { passive: true });
    window.addEventListener('resize', () => {
        applyMenuGlassState();
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    const menu = document.getElementById('mobile-menu');
    const panel = menu ? menu.querySelector('.tech-menu-panel') : null;

    if (!navbar) {
        return;
    }

    const updateNavbar = () => {
        const scrolled = window.scrollY > 20;
        navbar.classList.toggle('shadow-lg', scrolled);
        navbar.classList.remove('glass', 'glass-nav');
        navbar.classList.add(scrolled ? 'glass' : 'glass-nav');

        if (menu && panel) {
            if (menu.classList.contains('menu-open')) {
                panel.classList.add('glass-panel');
            } else {
                panel.classList.remove('glass-panel');
            }
        }
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

function initIntersectionAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, intersectionObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                entry.target.classList.remove('opacity-0');
                intersectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll('section h2, section p, .glass, .glass-card');

    targets.forEach(target => {
        if (target.closest('#home')) {
            return;
        }
        target.classList.add('opacity-0');
        target.style.animationDuration = '0.6s';
        observer.observe(target);
    });
}

function startTypingAnimation() {
    const titleEl = document.getElementById('typing-title');
    if (!titleEl) {
        return;
    }

    const actions = [
        { type: 'type', text: 'Guilherme Sce', delay: 150 },
        { type: 'wait', delay: 300 },
        { type: 'type', text: 'ca', delay: 200 },
        { type: 'wait', delay: 1000 },
        { type: 'delete', count: 5, delay: 120 },
        { type: 'wait', delay: 300 },
        { type: 'type', text: 'Seca', delay: 160 },
        { type: 'wait', delay: 700 },
        { type: 'delete', count: 1, delay: 140 },
        { type: 'wait', delay: 280 },
        { type: 'type', text: 'ca', delay: 150 },
        { type: 'finish' },
    ];

    let actionIndex = 0;
    let currentText = '';

    function executeAction() {
        const action = actions[actionIndex];
        if (!action) {
            return;
        }

        switch (action.type) {
            case 'type': {
                let i = 0;
                const typeChar = () => {
                    if (i < action.text.length) {
                        currentText += action.text[i];
                        titleEl.innerHTML = currentText;
                        i += 1;
                        setTimeout(typeChar, action.delay);
    } else {
                        actionIndex += 1;
                        executeAction();
                    }
                };
                typeChar();
                break;
            }
            case 'wait':
                setTimeout(() => {
                    actionIndex += 1;
                    executeAction();
                }, action.delay);
                break;
            case 'delete': {
                let count = 0;
                const deleteChar = () => {
                    if (count < action.count) {
                        currentText = currentText.slice(0, -1);
                        titleEl.innerHTML = currentText;
                        count += 1;
                        setTimeout(deleteChar, action.delay);
                    } else {
                        actionIndex += 1;
                        executeAction();
                    }
                };
                deleteChar();
                break;
                }
            case 'finish':
                titleEl.classList.add('finished-typing');
                break;
            default:
                break;
        }
    }
    
    setTimeout(executeAction, 200);
}

