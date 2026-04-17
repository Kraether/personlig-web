// Accordion functionality
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    accordion.addEventListener('click', () => {
        // Close other open accordions
        accordions.forEach(item => {
            if (item !== accordion) {
                item.classList.remove('active');
                item.nextElementSibling.style.display = 'none';
            }
        });
        // Toggle current accordion
        accordion.classList.toggle('active');
        const panel = accordion.nextElementSibling;
        if (accordion.classList.contains('active')) {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    });
});

// Language toggle functionality with localStorage
const languageToggle = document.getElementById('language-toggle');
const currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(language) {
    localStorage.setItem('language', language);
    // Update language on the page based on selection
    // This is where you would include your logic to switch languages
}

languageToggle.addEventListener('change', (event) => {
    setLanguage(event.target.value);
});

// Set the initial language on page load
setLanguage(currentLanguage);