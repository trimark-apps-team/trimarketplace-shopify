
document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.getElementById('terms');
  var pageBtn = document.getElementById('checkout');
  var drawerBtn = document.getElementById('CartDrawer-Checkout');

  // Exit early if checkbox doesn't exist
  if (!checkbox) return;

  // Add error under the checkbox (cart page)
  var errorPage = document.createElement('div');
  errorPage.id = 'terms-error-page';
  errorPage.style.color = 'red';
  errorPage.style.fontSize = '0.9rem';
  errorPage.style.marginTop = '0.5rem';
  errorPage.style.display = 'none';
  errorPage.textContent = 'You must agree to the Terms & Conditions before checkout.';
  checkbox.insertAdjacentElement('afterend', errorPage);

  // Add error under the drawer checkout button if it exists
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
    errorPage.style.display = show ? 'block' : 'none';
    if (errorDrawer) errorDrawer.style.display = show ? 'block' : 'none';
  }

  function validate() {
    var checked = checkbox.checked;
    if (pageBtn) pageBtn.disabled = !checked;
    if (drawerBtn) drawerBtn.disabled = !checked;
    showError(!checked);
  }

  // Run once on load
  validate();

  // Update when checkbox changes
  checkbox.addEventListener('change', validate);

  // Safety net: block submit on either form
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