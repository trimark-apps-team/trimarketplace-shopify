document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.getElementById('terms-cart');
  var checkoutBtn = document.getElementById('checkout');
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

  checkoutBtn.closest('form').addEventListener('submit', function(e) {
    if (!checkbox.checked) {
      e.preventDefault();
      checkoutBtn.disabled = true;
      error.style.display = 'block';
      checkbox.focus();
    }
  });
});