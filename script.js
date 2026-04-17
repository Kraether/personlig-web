document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panel = button.nextElementSibling;

      accordionButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          otherButton.setAttribute("aria-expanded", "false");
          const otherPanel = otherButton.nextElementSibling;
          if (otherPanel) {
            otherPanel.style.maxHeight = null;
          }
        }
      });

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
        toggleButton.textContent = language === 'da' ? 'EN' : 'DA';
    }

    localStorage.setItem('language', language);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
});