document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panel = button.nextElementSibling;

      button.setAttribute("aria-expanded", String(!expanded));
      if (!expanded && panel) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else if (panel) {
        panel.style.maxHeight = null;
      }
    });
  });
});

// Language toggle functionality
function toggleLanguage() {
    const currentLanguage = localStorage.getItem('language') || 'en';
    const newLanguage = currentLanguage === 'en' ? 'da' : 'en';
    setLanguage(newLanguage);
}

function setLanguage(language) {
    const elements = document.querySelectorAll('[data-en], [data-da]');
    const toggleButton = document.getElementById('language-toggle');

    elements.forEach(el => {
        if (language === 'da') {
            el.textContent = el.getAttribute('data-da') || el.textContent;
        } else {
            el.textContent = el.getAttribute('data-en') || el.textContent;
        }
    });

    if (toggleButton) {
        toggleButton.textContent = language === 'da' ? '🇬🇧' : '🇩🇰';
    }

    localStorage.setItem('language', language);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
});

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    const body = document.body;
    const themeButton = document.getElementById('theme-toggle');

    if (theme === 'light') {
        body.classList.add('light-theme');
        if (themeButton) {
            themeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style="vertical-align: middle;"><path d="M17 10.346a7 7 0 1 1-13.876-1.997" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3v4h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }
    } else {
        body.classList.remove('light-theme');
        if (themeButton) {
            themeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" style="vertical-align: middle;"><circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="2"/><path d="M10 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 17V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 10H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 10H1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 3.5L15.1 4.9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4.9 15.1L3.5 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 16.5L15.1 15.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4.9 4.9L3.5 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        }
    }

    localStorage.setItem('theme', theme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

// Scroll progress bar - Bullet navigation
document.addEventListener('DOMContentLoaded', () => {
    const progressContainer = document.getElementById('scroll-progress');
    if (!progressContainer) return;

    // Find all headers (h1 and h2)
    const headers = document.querySelectorAll('h1, h2');
    
    if (headers.length === 0) return;

    // Create bullets for each header
    headers.forEach((header, index) => {
        // Add ID if not present
        if (!header.id) {
            header.id = `section-${index}`;
        }

        // Create bullet
        const bullet = document.createElement('a');
        bullet.href = `#${header.id}`;
        bullet.className = 'progress-bullet';
        bullet.setAttribute('title', header.textContent);
        bullet.onclick = (e) => {
            e.preventDefault();
            header.scrollIntoView({ behavior: 'smooth' });
        };

        progressContainer.appendChild(bullet);
    });

    // Update active bullet on scroll
    const updateActiveBullet = () => {
        const bullets = document.querySelectorAll('.progress-bullet');
        let currentIndex = 0;

        headers.forEach((header, index) => {
            const rect = header.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2) {
                currentIndex = index;
            }
        });

        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === currentIndex);
        });
    };

    window.addEventListener('scroll', updateActiveBullet);
    updateActiveBullet(); // Initial call
});