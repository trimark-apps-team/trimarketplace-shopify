document.addEventListener("DOMContentLoaded", () => {
  function refreshCart() {
  const cartDrawer = document.getElementById('CartDrawer');
  const quickOrderForm = document.querySelector('.quick-order-list__contents');

  if (cartDrawer || quickOrderForm) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.href);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const parser = new DOMParser();
        const responseDoc = parser.parseFromString(xhr.responseText, 'text/html');

        if (cartDrawer) {
          const newDrawer = responseDoc.querySelector('#CartDrawer');
          if (newDrawer) cartDrawer.innerHTML = newDrawer.innerHTML;
        }

        if (quickOrderForm) {
          const newForm = responseDoc.querySelector('.quick-order-list__contents');
          if (newForm) quickOrderForm.innerHTML = newForm.innerHTML;
        }
      }
    };
    xhr.send();
  }
}

document.addEventListener("click", (e) => {
  if (e.target.id === "cart-click" || e.target.classList.contains("cart-items_count")) {
    document.querySelector("cart-drawer").classList.add("active");
    document.body.classList.add("overflow-hidden");
  }
});


  

document.addEventListener("click", async (e) => {
  const button = e.target.closest(".quick-add__submit");
  if (!button) return;

  e.preventDefault();

  const row = button.closest("tr.variant-item");
  if (!row) return;

  const variantId = row.dataset.variantId;

  const qtyInput = row.querySelector(".quantity__input");
  const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

  button.classList.add("load-data");

  button.querySelector(".loading__spinner").classList.remove("hidden");

  button.querySelector("span").innerText = "";

  button.disabled = true;

  try {
    const res = await fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id: variantId,
        quantity: quantity
      })
    });

    const data = await res.json();
    
    const linePrice = "$" + (data.line_price / 100).toFixed(2);
    row.querySelector(".variant-item__totals.small-hide span.price").textContent = linePrice;
    row.querySelector(".variant-item__totals.large-up-hide span.price").textContent = linePrice;
    
    refreshCart();
    
    if(document.querySelector("cart-drawer")?.classList.contains("is-empty")) {
      document.querySelector("cart-drawer").classList.remove("is-empty");
    }
    
    fetch('/cart.js')
      .then(res => res.json())
      .then(cart => {
        const cartCountBubble = document.querySelector('.cart-count-bubble');
        const cartItemsCount = document.querySelector('#cart-click .cart-items_count');
        
        if (cartCountBubble) cartCountBubble.innerText = cart.item_count;
        if (cartItemsCount) {
          cartItemsCount.innerText = `CART (${cart.items.length} PRODUCTS, ${cart.item_count} QUANTITY)`;
        }
      });



    const buttonText = button.querySelector("span");
    if (buttonText) {
      buttonText.innerText = "Added!";
              button.querySelector(".loading__spinner").classList.add("hidden");

        button.disabled = false;
      setTimeout(() => {
        buttonText.innerText = "Add to cart";
      }, 2000);
    }

  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    button.classList.remove("load-data");
  }
});



});


