window.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    const targetDiv = document.getElementById("button-align-div");
    const cartButton = document.querySelector(".button-share-save #view-cartButton button");

    if (targetDiv && targetDiv.hasAttribute("style")) {
      targetDiv.removeAttribute("style");
    }

    if (cartButton) {
      cartButton.setAttribute("style", "background-color: #42251d; color: #ffffff;");
    }

    if (targetDiv && cartButton) {
      observer.disconnect(); // Only disconnect once both tasks are done
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});