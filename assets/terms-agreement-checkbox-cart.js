document.addEventListener('DOMContentLoaded', function() {
  var checkbox    = document.getElementById('terms-cart');
  var checkoutBtn = document.getElementById('checkout');
  var draftBtn    = document.querySelector('.draft-order-cart');



  var error = document.createElement('div');
  error.style.color = 'red';
  error.style.fontSize = '0.9rem';
  error.style.display = 'none';
  error.textContent = 'You must agree to the Terms & Conditions before checkout.';
  checkbox.closest('.cart-terms').appendChild(error);

  function validate() {
    if (checkbox.checked) {
      checkoutBtn.disabled = false;
      draftBtn.disabled = false;
      error.style.display = 'none';
    } else {
      checkoutBtn.disabled = true;
      draftBtn.disabled = true;
      error.style.display = 'block';
    }
  }

  validate();
  checkbox.addEventListener('change', validate);
});