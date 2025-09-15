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

// override wishlist app heading shenanigans

window.addEventListener("DOMContentLoaded", () => {

// Select the element that has the data attribute
const wishlistTitle = document.querySelector('[data-mywishlisttitle]');

if (wishlistTitle) {
  // Set text content
  wishlistTitle.textContent = 'Wishlists';

  // Add inline style
  wishlistTitle.style.fontSize = '21px';

  // Optionally enforce the tag name if you expect it to be an <h3>
  if (wishlistTitle.tagName !== 'H3') {
    const h3 = document.createElement('h3');
    h3.setAttribute('data-mywishlisttitle', '');
    h3.textContent = 'Wishlists';
    h3.style.fontSize = '21px';
    wishlistTitle.replaceWith(h3);
  }
}
});