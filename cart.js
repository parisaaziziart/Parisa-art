const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartEmptyEl = document.getElementById("cart-empty");
const cartContentEl = document.getElementById("cart-content");
const checkoutButtonEl = document.getElementById("checkout-button");
const checkoutStatusEl = document.getElementById("checkout-status");

// Stripe Sandbox payment links.
// Add each artwork's Stripe link here after we create it in Stripe.
const STRIPE_PAYMENT_LINKS = {
  "ocean 2": "https://buy.stripe.com/test_5kQ00kcni1uMcTVft5bQY00"
};

function normalizeArtworkName(name) {
  return String(name || "").trim().toLowerCase();
}

function configureCheckout(cart) {
  if (!checkoutButtonEl || !checkoutStatusEl) return;

  checkoutButtonEl.removeAttribute("href");
  checkoutButtonEl.setAttribute("aria-disabled", "true");
  checkoutButtonEl.classList.add("is-disabled");
  checkoutStatusEl.textContent = "";

  if (cart.length !== 1) {
    checkoutStatusEl.textContent = cart.length > 1
      ? "For this test, checkout is available for one artwork at a time."
      : "";
    return;
  }

  const item = cart[0];
  const paymentLink = STRIPE_PAYMENT_LINKS[normalizeArtworkName(item.name)];

  if (!paymentLink) {
    checkoutStatusEl.textContent = "Stripe checkout for this artwork will be added next.";
    return;
  }

  checkoutButtonEl.href = paymentLink;
  checkoutButtonEl.removeAttribute("aria-disabled");
  checkoutButtonEl.classList.remove("is-disabled");
  checkoutButtonEl.textContent = "Proceed to Payment";
  checkoutStatusEl.textContent = "Stripe Sandbox test checkout — no real charge will be made.";
}

function renderCart() {
  const cart = getCart();

  if (!cart.length) {
    cartEmptyEl.hidden = false;
    cartContentEl.hidden = true;
    updateCartCount();
    configureCheckout(cart);
    return;
  }

  cartEmptyEl.hidden = true;
  cartContentEl.hidden = false;
  cartItemsEl.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += Number(item.price) || 0;

    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>€${Number(item.price).toLocaleString()}</p>
      </div>
      <button class="remove-item" type="button" data-id="${item.id}">Remove</button>
    `;

    cartItemsEl.appendChild(row);
  });

  cartTotalEl.textContent = `€${total.toLocaleString()}`;
  configureCheckout(cart);

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const updated = getCart().filter(item => item.id !== button.dataset.id);
      saveCart(updated);
      renderCart();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCart);
