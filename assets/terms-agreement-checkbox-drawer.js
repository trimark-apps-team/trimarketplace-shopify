(function () {
  function initDrawerTerms() {
    var checkbox    = document.getElementById('terms-drawer');
    var checkoutBtn = document.getElementById('CartDrawer-Checkout');
    var draftBtn    = document.querySelector('.draft-order-drawer');

    if (!checkbox || !checkoutBtn) return;

    var container = checkbox.closest('.cart-terms');
    if (!container) return;

    // Prevent duplicate error element
    if (!container.querySelector('.terms-error')) {
      var error = document.createElement('div');
      error.className = 'terms-error';
      error.style.color = 'red';
      error.style.fontSize = '0.9rem';
      error.style.marginTop = '0.5rem';
      error.style.display = 'none';
      error.textContent = 'You must agree to the Terms & Conditions before checkout.';
      container.appendChild(error);
    }

    var error = container.querySelector('.terms-error');

    function validate() {
      var isChecked = checkbox.checked;
      checkoutBtn.disabled = !isChecked;
      if (draftBtn) draftBtn.disabled = !isChecked;
      error.style.display = isChecked ? 'none' : 'block';
    }

    validate();
    checkbox.addEventListener('change', validate);
  }

  document.addEventListener('DOMContentLoaded', initDrawerTerms);

  // MutationObserver for cart drawer re-render
  var observer = new MutationObserver(function (mutations) {
    for (var mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        if (document.getElementById('CartDrawer-Checkout')) {
          initDrawerTerms();
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
