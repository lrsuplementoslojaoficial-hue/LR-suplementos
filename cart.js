ldocument.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }

  function renderCart() {
    const list = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    if (!list || !totalEl) return;

    list.innerHTML = "";

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.product} - R$ ${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">❌</button>
      `;
      list.appendChild(li);
    });

    totalEl.textContent = getTotal().toFixed(2);
  }

  function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;

    countEl.textContent = cart.length;
    countEl.style.display = cart.length > 0 ? "flex" : "none";
  }

  window.addToCart = function(product, price) {
    cart.push({ product, price });
    saveCart();
    renderCart();
    updateCartCount();

    const cartEl = document.getElementById("cart");
    if (cartEl) cartEl.classList.add("open");
  }

  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCount();
  }

  window.toggleCart = function() {
    const cartEl = document.getElementById("cart");
    if (cartEl) cartEl.classList.toggle("open");
  }

  window.finalizarCompra = function() {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    let msg = "Olá! Quero finalizar minha compra:%0A%0A";

    cart.forEach(item => {
      msg += `- ${item.product} | R$ ${item.price.toFixed(2)}%0A`;
    });

    msg += `%0ATotal: R$ ${getTotal().toFixed(2)}`;

    window.open(
      `https://wa.me/5551920049759?text=${msg}`,
      "_blank"
    );
  }

  // inicialização segura
  renderCart();
  updateCartCount();

});