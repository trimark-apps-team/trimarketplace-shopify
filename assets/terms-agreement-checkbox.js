document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.getElementById('terms');
  if (!checkbox) return;

  var checkoutBtns = [
    document.getElementById('checkout'),
    document.getElementById('CartDrawer-Checkout')
  ].filter(Boolean);

  if (checkoutBtns.length === 0) return;

  // Error message for cart page (under the checkbox)
  var errorPage = document.createElement('div');
  errorPage.id = 'terms-error-page';
  errorPage.style.color = 'red';
  errorPage.style.fontSize = '0.9rem';
  errorPage.style.marginTop = '0.5rem';
  errorPage.style.display = 'none';
  errorPage.textContent = 'You must agree to the Terms & Conditions before checkout.';
  checkbox.parentNode.appendChild(errorPage);

  // Error message for cart drawer
  var drawerBtn = document.getElementById('CartDrawer-Checkout');
  var errorDrawer;
  if (drawerBtn) {
    errorDrawer = document.createElement('div');
    errorDrawer.id = 'terms-error-drawer';
    errorDrawer.style.color = 'red';
    errorDrawer.style.fontSize = '0.9rem';
    errorDrawer.style.marginTop = '0.5rem';
    errorDrawer.style.display = 'none';
    errorDrawer.textContent = 'You must agree to the Terms & Conditions before checkout.';
    drawerBtn.insertAdjacentElement('afterend', errorDrawer);
  }

  function showError(show) {
    if (errorPage) errorPage.style.display = show ? 'block' : 'none';
    if (errorDrawer) errorDrawer.style.display = show ? 'block' : 'none';
  }

  function validate() {
    if (checkbox.checked) {
      checkoutBtns.forEach(btn => btn.disabled = false);
      showError(false);
    } else {
      checkoutBtns.forEach(btn => btn.disabled = true);
      showError(true);
    }
  }

  // Run once
  validate();

  // Update when checkbox changes
  checkbox.addEventListener('change', validate);

  // Safeguard on form submits
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