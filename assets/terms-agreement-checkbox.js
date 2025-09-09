document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.getElementById('terms');
  var checkoutBtns = [
    document.getElementById('checkout'),
    document.getElementById('CartDrawer-Checkout')
  ].filter(Boolean);

  if (!checkbox || checkoutBtns.length === 0) {
    console.log("⚠️ No checkbox or checkout buttons found.");
    return;
  }

  // Insert one error message under the checkbox
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

  function toggleButtons() {
    console.log("🔄 Checkbox state:", checkbox.checked);
    if (checkbox.checked) {
      checkoutBtns.forEach(btn => {
        console.log("✅ Enabling button:", btn.id);
        btn.disabled = false;
      });
      hideError();
    } else {
      checkoutBtns.forEach(btn => {
        console.log("🚫 Disabling button:", btn.id);
        btn.disabled = true;
      });
    }
  }

  // Set initial state
  toggleButtons();

  // Update whenever the checkbox changes
  checkbox.addEventListener('change', toggleButtons);

  // Block form submit as a safeguard
  checkoutBtns.forEach(function(btn) {
    var form = btn.closest('form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      console.log("⛔ Attempted checkout with checkbox:", checkbox.checked);
      if (!checkbox.checked) {
        e.preventDefault();
        btn.disabled = true;
        showError();
        checkbox.focus();
      }
    });
  });
});