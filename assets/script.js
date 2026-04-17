const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="2"/><path d="M10 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 17V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19 10H17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M3 10H1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 3.5L15.1 4.9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4.9 15.1L3.5 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M16.5 16.5L15.1 15.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4.9 4.9L3.5 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M17 10.346a7 7 0 1 1-13.876-1.997" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 3v4h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function setTheme(theme) {
  const themeButton = document.getElementById("theme-toggle");
  document.body.classList.toggle("light-theme", theme === "light");

  if (themeButton) {
    themeButton.innerHTML = theme === "light" ? moonIcon : sunIcon;
  }

  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem("theme") || "dark";
  setTheme(currentTheme === "dark" ? "light" : "dark");
}

function setupAccordion() {
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
}

function setupProgressBullets() {
  const progressContainer = document.getElementById("scroll-progress");
  const headings = document.querySelectorAll("main h1, main h2");

  if (!progressContainer || headings.length === 0) {
    return;
  }

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `section-${index + 1}`;
    }

    const bullet = document.createElement("a");
    bullet.href = `#${heading.id}`;
    bullet.className = "progress-bullet";
    bullet.title = heading.textContent.trim();
    bullet.setAttribute("aria-label", heading.textContent.trim());
    bullet.addEventListener("click", (event) => {
      event.preventDefault();
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    progressContainer.appendChild(bullet);
  });

  const bullets = progressContainer.querySelectorAll(".progress-bullet");

  const updateActiveBullet = () => {
    let currentIndex = 0;

    headings.forEach((heading, index) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.35) {
        currentIndex = index;
      }
    });

    bullets.forEach((bullet, index) => {
      bullet.classList.toggle("active", index === currentIndex);
    });
  };

  window.addEventListener("scroll", updateActiveBullet);
  updateActiveBullet();
}

document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById("theme-toggle");
  if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
  }

  setTheme(localStorage.getItem("theme") || "dark");
  setupAccordion();
  setupProgressBullets();
});