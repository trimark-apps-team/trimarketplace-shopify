document.addEventListener('DOMContentLoaded', function() {
  var checkbox   = document.getElementById('terms-cart');   // or terms-drawer
  var checkoutBtns = [
    document.getElementById('checkout'),              // cart page
    document.getElementById('CartDrawer-Checkout'),   // drawer
    document.getElementById('create-draft-order')     // draft order
  ].filter(Boolean);

  if (!checkbox || checkoutBtns.length === 0) return;

  // Create error element under checkbox
  var error = document.createElement('div');
  error.style.color = 'red';
  error.style.fontSize = '0.9rem';
  error.style.marginTop = '0.5rem';
  error.style.display = 'none';
  error.textContent = 'You must agree to the Terms & Conditions before checkout.';
  checkbox.closest('.cart-terms').appendChild(error);

  function validate() {
    if (checkbox.checked) {
      checkoutBtns.forEach(btn => btn.disabled = false);
      error.style.display = 'none';
    } else {
      checkoutBtns.forEach(btn => btn.disabled = true);
      error.style.display = 'block';
    }
  }

  // Run once
  validate();

  // Update when checkbox changes
  checkbox.addEventListener('change', validate);
});