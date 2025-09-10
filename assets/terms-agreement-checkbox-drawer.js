document.addEventListener('DOMContentLoaded', function() {
  var checkbox   = document.getElementById('terms-drawer');
  var checkoutBtns = [
    document.getElementById('CartDrawer-Checkout'), // drawer checkout
    document.getElementById('create-draft-order')   // draft order
  ].filter(Boolean);

  if (!checkbox || checkoutBtns.length === 0) return;

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

  // Run once at load
  validate();

  // Update when checkbox changes
  checkbox.addEventListener('change', validate);
});