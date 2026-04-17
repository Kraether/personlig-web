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
