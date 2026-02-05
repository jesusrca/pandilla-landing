// Horizontal Scroll Navigation
class HorizontalScroll {
    constructor() {
        this.container = document.querySelector('.scroll-container');
        this.sections = document.querySelectorAll('.section');
        this.dots = document.querySelectorAll('.dot');
        this.currentSection = 0;
        this.isScrolling = false;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        // Navigation dots click
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSection(index));
        });

        // Wheel event for smooth scrolling
        window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Touch events for mobile
        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Update on resize
        window.addEventListener('resize', () => this.updatePosition());

        // Initial position
        this.updatePosition();
    }

    handleWheel(e) {
        if (this.isScrolling) return;

        e.preventDefault();

        const delta = Math.sign(e.deltaY || e.deltaX);

        if (delta > 0) {
            this.nextSection();
        } else if (delta < 0) {
            this.prevSection();
        }
    }

    handleKeyboard(e) {
        if (this.isScrolling) return;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                this.nextSection();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                this.prevSection();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSection(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSection(this.sections.length - 1);
                break;
        }
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        if (this.isScrolling) return;

        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSection();
            } else {
                this.prevSection();
            }
        }
    }

    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.goToSection(this.currentSection + 1);
        }
    }

    prevSection() {
        if (this.currentSection > 0) {
            this.goToSection(this.currentSection - 1);
        }
    }

    goToSection(index) {
        if (index < 0 || index >= this.sections.length || index === this.currentSection) {
            return;
        }

        this.isScrolling = true;
        this.currentSection = index;

        this.updatePosition();
        this.updateDots();

        // Reset scrolling flag after animation
        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }

    updatePosition() {
        const offset = -this.currentSection * 100;
        this.container.style.transform = `translateX(${offset}vw)`;
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
}

// Section Animations Observer
class SectionAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.observerOptions = {
            root: null,
            threshold: 0.5,
            rootMargin: '0px'
        };

        this.init();
    }

    init() {
        // Create intersection observer for section animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateSection(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all sections
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    animateSection(section) {
        const sectionNumber = section.dataset.section;

        // Add specific animations based on section
        switch (sectionNumber) {
            case '0':
                this.animateHero(section);
                break;
            case '1':
                this.animateCharacters(section);
                break;
            case '2':
                this.animateMenu(section);
                break;
            case '4':
                this.animateTeam(section);
                break;
            case '5':
                this.animateDelicious(section);
                break;
        }
    }

    animateHero(section) {
        const logo = section.querySelector('.logo-main');
        const slogan = section.querySelector('.slogan');
        const badge = section.querySelector('.age-badge');

        if (logo) {
            logo.style.animation = 'float 3s ease-in-out infinite, fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    animateCharacters(section) {
        const characters = section.querySelector('.characters');
        if (characters) {
            characters.style.animation = 'slideInRight 1s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    animateMenu(section) {
        const menuItems = section.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-30px)';
                item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 50);
            }, index * 150);
        });
    }

    animateTeam(section) {
        const teamPhoto = section.querySelector('.team-photo');
        if (teamPhoto) {
            teamPhoto.style.animation = 'slideInLeft 1s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    animateDelicious(section) {
        const title = section.querySelector('.delicious-title');
        const subtitle = section.querySelector('.delicious-subtitle');
        const location = section.querySelector('.delicious-location');

        if (title) title.style.animation = 'slideInDown 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        if (subtitle) subtitle.style.animation = 'slideInUp 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.2s backwards';
        if (location) location.style.animation = 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards';
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.init();
    }

    init() {
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    handleMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Apply subtle parallax to certain elements
        const parallaxElements = document.querySelectorAll('.logo-main, .characters, .power-image');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;

            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}

// Preloader
class Preloader {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Trigger initial animations
            const firstSection = document.querySelector('.section[data-section="0"]');
            if (firstSection) {
                firstSection.classList.add('visible');
            }
        });
    }
}

// Menu Hover Effect for Floating Images
class MenuHoverEffect {
    constructor() {
        this.menuItems = document.querySelectorAll('.menu-item[data-image]');
        this.floatingImage = document.querySelector('.floating-image');
        this.floatingImg = document.querySelector('.floating-img');
        this.currentImage = null;

        if (this.floatingImage && this.floatingImg) {
            this.init();
        }
    }

    init() {
        this.menuItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => this.showImage(e, item));
            item.addEventListener('mousemove', (e) => this.moveImage(e));
            item.addEventListener('mouseleave', () => this.hideImage());
        });
    }

    showImage(e, item) {
        const imageSrc = item.dataset.image;

        if (imageSrc) {
            this.currentImage = imageSrc;
            this.floatingImg.src = imageSrc;
            this.floatingImage.classList.add('active');
            this.moveImage(e);
        }
    }

    moveImage(e) {
        if (this.floatingImage.classList.contains('active')) {
            const x = e.clientX + 20;
            const y = e.clientY + 20;

            // Keep image within viewport
            const maxX = window.innerWidth - 420; // 400px width + 20px padding
            const maxY = window.innerHeight - 320; // approximate height + padding

            this.floatingImage.style.left = `${Math.min(x, maxX)}px`;
            this.floatingImage.style.top = `${Math.min(y, maxY)}px`;
        }
    }

    hideImage() {
        this.floatingImage.classList.remove('active');
        this.currentImage = null;
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize horizontal scroll
    const horizontalScroll = new HorizontalScroll();

    // Initialize section animations
    const sectionAnimations = new SectionAnimations();

    // Initialize parallax effect
    const parallaxEffect = new ParallaxEffect();

    // Initialize preloader
    const preloader = new Preloader();

    // Initialize menu hover effect
    const menuHoverEffect = new MenuHoverEffect();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Prevent default scroll behavior
    document.body.style.overflow = 'hidden';

    console.log('🎉 Pandilla Landing Page initialized!');
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});
