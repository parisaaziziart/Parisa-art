const CART_KEY = "parisaArtCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().length;
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
}

function addToCart(button) {
  if (!button || button.dataset.sold === "true" || button.disabled) {
    return; // programmatic SOLD OUT protection
  }

  const item = {
    id: `${button.dataset.name}|${button.dataset.image}`,
    name: button.dataset.name,
    image: button.dataset.image,
    price: Number(button.dataset.price)
  };

  const cart = getCart();
  if (!cart.some(x => x.id === item.id)) {
    cart.push(item);
    saveCart(cart);
    button.textContent = "Added";
    setTimeout(() => button.textContent = "Add to Cart", 1200);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => addToCart(button));
  });

  const menuButton = document.querySelector(".mobile-menu-button");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }
});
