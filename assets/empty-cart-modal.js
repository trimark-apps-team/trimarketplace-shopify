document.addEventListener("DOMContentLoaded", function() {
  const emptyCartLink = document.getElementById("empty-cart-link");
  const modal = document.getElementById("empty-cart-modal");
  const confirmBtn = document.getElementById("confirm-empty-cart");
  const cancelBtn = document.getElementById("cancel-empty-cart");
  const closeBtn = document.getElementById("close-empty-cart");

  if (emptyCartLink && modal) {
    emptyCartLink.addEventListener("click", function(e) {
      e.preventDefault();
      modal.style.display = "flex";
    });
  }

  if (cancelBtn && modal) {
    cancelBtn.addEventListener("click", () => modal.style.display = "none");
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.style.display = "none");
  }

  if (confirmBtn && modal) {
    confirmBtn.addEventListener("click", () => {
      if (typeof clearCart === "function") clearCart();
      modal.style.display = "none";
    });
  }
});