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
    // 6. User Customization (Settings)
    // -------------------------------------------------------------------------

    // Design System Switcher
    const designSelect = document.getElementById('designSelect');
    if (designSelect) {
        designSelect.addEventListener('change', (e) => {
            document.body.setAttribute('data-design', e.target.value);
        });

        // Set initial state
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
                themeToggle.innerHTML = '☀️';
            } else {
                document.body.removeAttribute('data-theme');
                themeToggle.innerHTML = '🌙';
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
});

// -------------------------------------------------------------------------
// 7. Global Copy Function
// -------------------------------------------------------------------------
window.copyCode = function(button) {
    const codeBlock = button.previousElementSibling.querySelector('.code-block');
    if (!codeBlock) return;

    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<span>✓</span> Copied!';

        // Use inline style to show success state, but respect theme otherwise
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
