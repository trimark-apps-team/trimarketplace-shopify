document.addEventListener('DOMContentLoaded', function() {
  var checkbox   = document.getElementById('terms');
  var checkoutBtn = document.getElementById('checkout');

  if (!checkbox || !checkoutBtn) return;

  // Create error message element
  var error = document.createElement('div');
  error.id = 'terms-error';
  error.style.color = 'red';
  error.style.fontSize = '0.9rem';
  error.style.marginTop = '0.5rem';
  error.style.display = 'none';
  error.textContent = 'You must agree to the Terms & Conditions before checkout.';
  checkbox.parentNode.appendChild(error);

  function validate() {
    if (checkbox.checked) {
      checkoutBtn.disabled = false;
      error.style.display = 'none';
    } else {
      checkoutBtn.disabled = true;
      error.style.display = 'block';
    }
  }

  // Run once at load
  validate();

  // On checkbox toggle
  checkbox.addEventListener('change', validate);

  // Extra safeguard on click/submit
  checkoutBtn.closest('form').addEventListener('submit', function(e) {
    if (!checkbox.checked) {
      e.preventDefault();
      checkoutBtn.disabled = true; // re-enforce disabled
      error.style.display = 'block';
      checkbox.focus();
    }
  });
});