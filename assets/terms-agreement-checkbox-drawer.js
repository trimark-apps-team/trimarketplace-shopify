document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.getElementById('terms-drawer');
  var checkoutBtn = document.getElementById('CartDrawer-Checkout');
  if (!checkbox || !checkoutBtn) return;

  var error = document.createElement('div');
  error.style.color = 'red';
  error.style.fontSize = '0.9rem';
  error.style.marginTop = '0.5rem';
  error.style.display = 'none';
  error.textContent = 'You must agree to the Terms & Conditions before checkout.';
  checkbox.insertAdjacentElement('afterend', error);

  function validate() {
    if (checkbox.checked) {
      checkoutBtn.disabled = false;
      error.style.display = 'none';
    } else {
      checkoutBtn.disabled = true;
    }
  }

  validate();
  checkbox.addEventListener('change', validate);
});