document.addEventListener("DOMContentLoaded", function() {
  const emptyCartLink = document.getElementById("empty-cart-link");
  const modal = document.getElementById("empty-cart-modal");
  const confirmBtn = document.getElementById("confirm-empty-cart");
  const cancelBtn = document.getElementById("cancel-empty-cart");

  emptyCartLink.addEventListener("click", function(e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  cancelBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  confirmBtn.addEventListener("click", function() {
    clearCart(); // your existing function
    modal.style.display = "none";
  });
});