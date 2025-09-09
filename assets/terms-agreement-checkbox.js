document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.getElementById('terms');
  var pageBtn = document.getElementById('checkout');
  var drawerBtn = document.getElementById('CartDrawer-Checkout');

  if (!checkbox) return;

  // Add one error message under the checkbox
  var error = document.createElement('div');
  error.id = 'terms-error';
  error.style.color = 'red';
  error.style.fontSize = '0.9rem';
  error.style.marginTop = '0.5rem';
  error.style.display = 'none'; // hidden by default
  error.textContent = 'You must agree to the Terms & Conditions before checkout.';
  checkbox.insertAdjacentElement('afterend', error);

  function hideError() {
    error.style.display = 'none';
  }

  function showError() {
    error.style.display = 'block';
  }

  // Keep buttons disabled until checked
  function toggleButtons() {
    var checked = checkbox.checked;
    if (pageBtn) pageBtn.disabled = !checked;
    if (drawerBtn) drawerBtn.disabled = !checked;
    if (checked) hideError();
  }

  toggleButtons();

  // Update on checkbox change
  checkbox.addEventListener('change', toggleButtons);

  // Block form submit if not checked
  [pageBtn, drawerBtn].forEach(function(btn) {
    if (!btn) return;
    var form = btn.closest('form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      if (!checkbox.checked) {
        e.preventDefault();
        if (btn) btn.disabled = true;
        showError();
        checkbox.focus();
      }
    });
  });
});