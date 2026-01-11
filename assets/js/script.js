document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Sidebar Functionality
    // -------------------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const categoryTags = document.querySelectorAll('.category-tag');

    // Toggle Sidebar (Mobile)
    function toggleSidebar() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    // -------------------------------------------------------------------------
    // 2. Search & Filter Functionality
    // -------------------------------------------------------------------------
    const searchInput = document.getElementById('searchInput');
    const animationCards = document.querySelectorAll('.animation-card');
    const statsCount = document.querySelector('.stats-count');
    let currentCategory = 'all';

    if (searchInput) {
        searchInput.addEventListener('input', filterAnimations);
    }

    function filterAnimations() {
        if (!searchInput) return;

        const searchTerm = searchInput.value.toLowerCase();
        let visibleCount = 0;

        animationCards.forEach(card => {
            const title = card.querySelector('.animation-title').textContent.toLowerCase();
            const description = card.querySelector('.animation-description').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = currentCategory === 'all' || category === currentCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (statsCount) {
            statsCount.textContent = visibleCount;
        }
    }

    // Category Buttons Logic
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Update Active State
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // Update Filter
            currentCategory = tag.dataset.category;
            filterAnimations();

            // Auto-close sidebar on mobile after selection
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('active');
            }
        });
    });

    // -------------------------------------------------------------------------
    // 3. Performance Optimization (Intersection Observer)
    // -------------------------------------------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Find the animated element inside the card
            const animatedElement = entry.target.querySelector('[class*="animated-element"]');

            // Also handle any specific elements that might be animated differently
            // but generally they are children of .preview-area
            const allAnimatedChildren = entry.target.querySelectorAll('.preview-area *');

            if (entry.isIntersecting) {
                if (animatedElement) animatedElement.style.animationPlayState = 'running';
                allAnimatedChildren.forEach(el => el.style.animationPlayState = 'running');
            } else {
                if (animatedElement) animatedElement.style.animationPlayState = 'paused';
                allAnimatedChildren.forEach(el => el.style.animationPlayState = 'paused');
            }
        });
    }, observerOptions);

    animationCards.forEach(card => {
        animationObserver.observe(card);
    });

    // -------------------------------------------------------------------------
    // 4. Background Particles
    // -------------------------------------------------------------------------
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Clear existing to avoid duplicates on re-init if ever needed
        particlesContainer.innerHTML = '';

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // -------------------------------------------------------------------------
    // 5. Stats Init
    // -------------------------------------------------------------------------
    if (statsCount) {
        statsCount.textContent = animationCards.length;
    }

    // -------------------------------------------------------------------------
    // 6. User Customization (Settings Modal)
    // -------------------------------------------------------------------------

    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsBtns = document.querySelectorAll('[data-close="settingsModal"]');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Open Modal
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.add('active');
        });
    }

    // Close Modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    closeSettingsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.dataset.close);
        });
    });

    // Close on click outside (General for all modals)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });

    // Tabs Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to current
            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Design System Switcher
    const designSelect = document.getElementById('designSelect');
    if (designSelect) {
        designSelect.addEventListener('change', (e) => {
            document.body.setAttribute('data-design', e.target.value);
        });
        document.body.setAttribute('data-design', 'm3');
    }

    // Theme Switcher
    const themeToggle = document.getElementById('themeToggle');
    let isLightMode = false;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isLightMode = !isLightMode;
            if (isLightMode) {
                document.body.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '☀️ Light Mode';
            } else {
                document.body.removeAttribute('data-theme');
                themeToggle.innerHTML = '🌙 Dark Mode';
            }
        });
    }

    // Color Picker
    const accentColorInput = document.getElementById('accentColor');
    if (accentColorInput) {
        accentColorInput.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--primary', e.target.value);
        });
    }

    // -------------------------------------------------------------------------
    // 7. Animation Creator Playground
    // -------------------------------------------------------------------------
    const logo = document.querySelector('.logo');
    const creatorModal = document.getElementById('creatorModal');
    const closeCreatorBtns = document.querySelectorAll('[data-close="creatorModal"]');
    const animSelect = document.getElementById('animSelect');
    const creatorBox = document.getElementById('creatorBox');
    const playAnimBtn = document.getElementById('playAnimBtn');
    const durationRange = document.getElementById('durationRange');
    const durationValue = document.getElementById('durationValue');
    const easingSelect = document.getElementById('easingSelect');
    const copyCreatorBtn = document.getElementById('copyCreatorBtn');

    // Open Creator on Logo Click
    if (logo && creatorModal) {
        logo.addEventListener('click', () => {
            creatorModal.classList.add('active');
            populateAnimationOptions();
        });
    }

    closeCreatorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal('creatorModal');
        });
    });

    // Populate Select with existing animations
    function populateAnimationOptions() {
        if (animSelect.options.length > 1) return; // Already populated

        // Extract animation names from existing cards
        const cards = document.querySelectorAll('.animation-card');
        const animations = new Set();

        cards.forEach(card => {
            const preview = card.querySelector('.animated-element');
            if (preview) {
                // Get classes that aren't 'animated-element'
                const classes = Array.from(preview.classList).filter(c => c !== 'animated-element');
                classes.forEach(c => animations.add(c));
            }
        });

        animations.forEach(anim => {
            const option = document.createElement('option');
            option.value = anim;
            option.textContent = anim.charAt(0).toUpperCase() + anim.slice(1).replace(/([A-Z])/g, ' $1').trim();
            animSelect.appendChild(option);
        });
    }

    // Update Duration UI
    if (durationRange) {
        durationRange.addEventListener('input', (e) => {
            durationValue.textContent = e.target.value + 's';
        });
    }

    // Play Animation
    if (playAnimBtn) {
        playAnimBtn.addEventListener('click', () => {
            const animName = animSelect.value;
            const duration = durationRange.value;
            const easing = easingSelect.value;

            if (!animName) return;

            // Reset
            creatorBox.style.animation = 'none';
            creatorBox.className = 'creator-box'; // Reset classes

            // Trigger reflow
            void creatorBox.offsetWidth;

            // Apply new
            creatorBox.classList.add(animName);
            creatorBox.style.animationDuration = duration + 's';
            creatorBox.style.animationTimingFunction = easing;
            creatorBox.style.animationIterationCount = 'infinite';
        });
    }

    // Copy CSS
    if (copyCreatorBtn) {
        copyCreatorBtn.addEventListener('click', () => {
            const animName = animSelect.value;
            if (!animName) return;

            const duration = durationRange.value;
            const easing = easingSelect.value;

            const css = `/* ${animName} configuration */
.element {
    animation-name: ${animName};
    animation-duration: ${duration}s;
    animation-timing-function: ${easing};
    animation-iteration-count: infinite;
}`;

            navigator.clipboard.writeText(css).then(() => {
                const originalText = copyCreatorBtn.innerHTML;
                copyCreatorBtn.innerHTML = '✓ Copied!';
                setTimeout(() => {
                    copyCreatorBtn.innerHTML = originalText;
                }, 2000);
            });
        });
    }
});

// -------------------------------------------------------------------------
// 7. Global Copy Function (Needs to be outside DOMContentLoaded to be accessible via onclick)
// -------------------------------------------------------------------------
window.copyCode = function(button) {
    const codeBlock = button.previousElementSibling.querySelector('.code-block');
    if (!codeBlock) return;

    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<span>✓</span> Copied!';

        const originalBg = button.style.background;
        button.style.background = 'linear-gradient(135deg, var(--success), #00cc66)';

        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = originalBg;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        button.innerHTML = '<span>❌</span> Error';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    });
}
