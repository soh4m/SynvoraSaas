/**
 * Synvora SaaS Core Interactions System
 * Powered by AOS & GSAP (Design System v2.0)
 */

document.addEventListener('DOMContentLoaded', () => {
    initAosEngine();
    initGsapAnimations();
    initCommandMenu();
    initFaqAccordion();
    initScrollNavbarFallback();
});

/* ==========================================
   1. Initialize AOS (Animate On Scroll) Engine
   ========================================== */
function initAosEngine() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out',
            offset: 120
        });
    }
}

/* ==========================================
   2. Initialize GSAP Hover Micro-interactions
   ========================================== */
function initGsapAnimations() {
    if (typeof gsap !== 'undefined') {
        // 2.1 Premium Light Card Hover Elevation & Icon Shift
        document.querySelectorAll('.premium-card-light').forEach(card => {
            const icon = card.querySelector('.card-icon-wrapper-light');
            
            card.addEventListener('mouseenter', () => {
                // Elevate card using custom shadow and slight shift
                gsap.to(card, {
                    y: -8,
                    borderColor: '#CBD5E1',
                    boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
                    duration: 0.4,
                    ease: 'power3.out'
                });
                
                // Animate internal icon wrapper
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.12,
                        rotate: 3,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                // Restore card baseline
                gsap.to(card, {
                    y: 0,
                    borderColor: '#E2E8F0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
                    duration: 0.4,
                    ease: 'power3.out'
                });
                
                // Restore icon wrapper
                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotate: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });

        // 2.2 Large Rounded Button Scales (Primary & Secondary)
        document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom, .btn-header-cta').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.03,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            });
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            });
        });

        // 2.3 Navbar Navigation Links Scale & Shift
        document.querySelectorAll('.gsap-nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    y: -1,
                    scale: 1.04,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    y: 0,
                    scale: 1,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            });
        });
        
        // 2.4 Command Menu Button Highlight
        const searchBtn = document.querySelector('.gsap-search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('mouseenter', () => {
                gsap.to(searchBtn, {
                    scale: 1.02,
                    duration: 0.2
                });
            });
            searchBtn.addEventListener('mouseleave', () => {
                gsap.to(searchBtn, {
                    scale: 1,
                    duration: 0.2
                });
            });
        }
    }
}

/* ==========================================
   3. Command Menu Operations & Search Systems
   ========================================== */
let selectedCmdIndex = 0;

function initCommandMenu() {
    const backdrop = document.getElementById('cmdMenuBackdrop');
    
    // Toggle shortcuts (Cmd+K / Ctrl+K)
    document.addEventListener('keydown', e => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            toggleCmdMenu(true);
        }
        
        if (e.key === 'Escape' && backdrop.classList.contains('active')) {
            toggleCmdMenu(false);
        }
        
        if (backdrop.classList.contains('active')) {
            const items = getVisibleCmdItems();
            if (items.length === 0) return;
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                updateCmdSelection(items, (selectedCmdIndex + 1) % items.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                updateCmdSelection(items, (selectedCmdIndex - 1 + items.length) % items.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                items[selectedCmdIndex].click();
            }
        }
    });
}

function toggleCmdMenu(show) {
    const backdrop = document.getElementById('cmdMenuBackdrop');
    const input = document.getElementById('cmdMenuInput');
    
    if (show) {
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => input.focus(), 50);
        selectedCmdIndex = 0;
        filterCmdItems();
        
        // GSAP animate entrance
        gsap.fromTo('.cmd-menu-dialog', 
            { scale: 0.96, y: -10, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.25, ease: 'back.out(1.4)' }
        );
    } else {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
        input.value = '';
    }
}

function handleBackdropClick(e) {
    if (e.target.id === 'cmdMenuBackdrop') {
        toggleCmdMenu(false);
    }
}

function filterCmdItems() {
    const input = document.getElementById('cmdMenuInput');
    const filter = input.value.toLowerCase();
    const items = document.querySelectorAll('.cmd-menu-item');
    let visibleItems = [];
    
    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        const keywords = item.getAttribute('data-keywords') || '';
        
        if (text.includes(filter) || keywords.toLowerCase().includes(filter)) {
            item.style.display = 'flex';
            visibleItems.push(item);
        } else {
            item.style.display = 'none';
        }
    });
    
    items.forEach(item => item.classList.remove('selected'));
    selectedCmdIndex = 0;
    if (visibleItems.length > 0) {
        visibleItems[0].classList.add('selected');
    }
}

function getVisibleCmdItems() {
    return Array.from(document.querySelectorAll('.cmd-menu-item')).filter(
        item => item.style.display !== 'none'
    );
}

function updateCmdSelection(items, newIndex) {
    items.forEach(item => item.classList.remove('selected'));
    selectedCmdIndex = newIndex;
    items[selectedCmdIndex].classList.add('selected');
    items[selectedCmdIndex].scrollIntoView({ block: 'nearest' });
}

function navigateRoute(url) {
    toggleCmdMenu(false);
    window.location.href = url;
}

function toggleTheme() {
    toggleCmdMenu(false);
    
    // Switch primary color variable values
    const currentPrimary = document.documentElement.style.getPropertyValue('--color-primary');
    
    if (currentPrimary === '#06B6D4' || currentPrimary === 'rgb(6, 182, 212)') {
        document.documentElement.style.setProperty('--color-primary', '#2563EB');
        document.documentElement.style.setProperty('--color-primary-rgb', '37, 99, 235');
        alert("Primary Brand Color reset to Blue (#2563EB)");
    } else {
        document.documentElement.style.setProperty('--color-primary', '#06B6D4');
        document.documentElement.style.setProperty('--color-primary-rgb', '6, 182, 212');
        alert("Primary Brand Color switched to Cyan (#06B6D4)");
    }
}

/* ==========================================
   4. Scroll Navbar Glass Fallback
   ========================================== */
function initScrollNavbarFallback() {
    const header = document.querySelector('header.site-header');
    const navGlass = document.querySelector('.navbar-glass');
    
    if (header && navGlass) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                header.style.top = '0';
                navGlass.style.borderRadius = '0';
                navGlass.style.borderLeft = 'none';
                navGlass.style.borderRight = 'none';
                navGlass.style.borderTop = 'none';
                navGlass.style.background = 'rgba(255, 255, 255, 0.92)';
                navGlass.style.padding = '8px 24px';
                navGlass.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.05)';
            } else {
                header.style.top = '24px';
                navGlass.style.borderRadius = '100px';
                navGlass.style.borderLeft = '1px solid rgba(15, 23, 42, 0.06)';
                navGlass.style.borderRight = '1px solid rgba(15, 23, 42, 0.06)';
                navGlass.style.borderTop = '1px solid rgba(15, 23, 42, 0.06)';
                navGlass.style.background = 'rgba(255, 255, 255, 0.75)';
                navGlass.style.padding = '10px 24px';
                navGlass.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.03)';
            }
        }, { passive: true });
    }
}

/* ==========================================
   5. Accordion (FAQ System)
   ========================================== */
function initFaqAccordion() {
    const questions = document.querySelectorAll('.faq-question-light');
    
    questions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item-light').forEach(el => {
                el.classList.remove('active');
                // GSAP slide up answers
                const answer = el.querySelector('.faq-answer-light');
                if (answer) answer.style.display = 'none';
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer-light');
                if (answer) {
                    answer.style.display = 'block';
                    gsap.fromTo(answer, 
                        { opacity: 0, y: -5 },
                        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
                    );
                }
            }
        });
    });
}
