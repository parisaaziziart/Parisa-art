const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartEmptyEl = document.getElementById("cart-empty");
const cartContentEl = document.getElementById("cart-content");

function renderCart() {
  const cart = getCart();

  if (!cart.length) {
    cartEmptyEl.hidden = false;
    cartContentEl.hidden = true;
    updateCartCount();
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

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const updated = getCart().filter(item => item.id !== button.dataset.id);
      saveCart(updated);
      renderCart();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCart);
