  document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('terms');
    var checkoutBtn = document.getElementById('checkout');


    function toggleCheckout() {
      checkoutBtn.disabled = !checkbox.checked;
    }

    // Run once on page load
    toggleCheckout();

    // Update whenever the checkbox changes
    checkbox.addEventListener('change', toggleCheckout);
  });