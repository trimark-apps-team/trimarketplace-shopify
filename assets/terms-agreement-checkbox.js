document.addEventListener('DOMContentLoaded', function() {
  var checkbox   = document.getElementById('terms');
  var checkoutBtns = [
    document.getElementById('checkout'),
    document.getElementById('CartDrawer-Checkout')
  ].filter(Boolean);

  if (!checkbox || checkoutBtns.length === 0) return;

  // Ensure only one error under the checkbox
  var error = document.getElementById('terms-error');
  if (!error) {
    error = document.createElement('div');
    error.id = 'terms-error';
    error.style.color = 'red';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '0.5rem';
    error.style.display = 'none';
    error.textContent = 'You must agree to the Terms & Conditions before checkout.';
    checkbox.insertAdjacentElement('afterend', error);
  }

  function showError(show) {
    error.style.display = show ? 'block' : 'none';
  }

  function validate() {
    var checked = checkbox.checked;
    checkoutBtns.forEach(btn => { btn.disabled = !checked; });
    showError(!checked);
  }

  // Run once
  validate();

  // Toggle on checkbox change
  checkbox.addEventListener('change', validate);

  // Safety net: block submit for all forms
  checkoutBtns.forEach(function(btn) {
    var form = btn.closest('form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      if (!checkbox.checked) {
        e.preventDefault();
        btn.disabled = true;
        showError(true);
        checkbox.focus();
      }
    });
  });
});