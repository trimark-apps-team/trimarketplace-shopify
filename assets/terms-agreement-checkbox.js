document.addEventListener('DOMContentLoaded', function() {
  var checkbox   = document.getElementById('terms');
  var pageBtn    = document.getElementById('checkout');
  var drawerBtn  = document.getElementById('CartDrawer-Checkout');

  if (!checkbox) return;

  // Add one error message directly under the checkbox
  var error = document.createElement('div');
  error.id = 'terms-error';
  error.style.color = 'red';
  error.style.fontSize = '0.9rem';
  error.style.marginTop = '0.5rem';
  error.style.display = 'none';
  error.textContent = 'You must agree to the Terms & Conditions before checkout.';
  checkbox.insertAdjacentElement('afterend', error);

  function showError(show) {
    error.style.display = show ? 'block' : 'none';
  }

  function validate() {
    var checked = checkbox.checked;
    if (pageBtn) pageBtn.disabled = !checked;
    if (drawerBtn) drawerBtn.disabled = !checked;
    showError(!checked);
  }

  // Run once at load
  validate();

  // Toggle on checkbox change
  checkbox.addEventListener('change', validate);

  // Block submit for both forms
  [pageBtn, drawerBtn].forEach(function(btn) {
    if (!btn) return;
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