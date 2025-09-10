function initDrawerTerms() {
  var checkbox    = document.getElementById('terms-drawer');
  var checkoutBtn = document.getElementById('CartDrawer-Checkout');
  var draftBtn    = document.querySelector('.draft-order-drawer');

  if (!checkbox || !checkoutBtn) return;

  // Prevent duplicate error element
  if (!checkbox.closest('.cart-terms').querySelector('.terms-error')) {
    var error = document.createElement('div');
    error.className = 'terms-error';
    error.style.color = 'red';
    error.style.fontSize = '0.9rem';
    error.style.marginTop = '0.5rem';
    error.style.display = 'none';
    error.textContent = 'You must agree to the Terms & Conditions before checkout.';
    checkbox.closest('.cart-terms').appendChild(error);
  }

  var error = checkbox.closest('.cart-terms').querySelector('.terms-error');

  function validate() {
    if (checkbox.checked) {
      checkoutBtn.disabled = false;
      if (draftBtn) draftBtn.disabled = false;
      error.style.display = 'none';
    } else {
      checkoutBtn.disabled = true;
      if (draftBtn) draftBtn.disabled = true;
      error.style.display = 'block';
    }
  }

  validate();
  checkbox.addEventListener('change', validate);
}

// Run on load
document.addEventListener('DOMContentLoaded', initDrawerTerms);

// MutationObserver for cart drawer re-render
var observer = new MutationObserver(function(mutations) {
  for (var mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Check if the drawer content got re-rendered
      if (document.getElementById('CartDrawer-Checkout')) {
        initDrawerTerms();
      }
    }
  }
});

// Watch the whole document body for changes
observer.observe(document.body, { childList: true, subtree: true });