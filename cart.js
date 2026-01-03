/* =========================
   CARRINHO GLOBAL - LR SUPLEMENTOS
   ========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

// Atualiza tudo ao carregar a página
renderCart();
updateCartCount();

/* =========================
   FUNÇÕES AUXILIARES
   ========================= */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   ADICIONAR PRODUTO
   ========================= */

function addToCart(product, price) {
  cart.push({ product, price });
  total += price;

  saveCart();
  renderCart();
  updateCartCount();

  // Abre o carrinho automaticamente
  const cartElement = document.getElementById("cart");
  if (cartElement) {
    cartElement.classList.add("open");
  }
}

/* =========================
   REMOVER PRODUTO
   ========================= */

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);

  saveCart();
  renderCart();
  updateCartCount();
}

/* =========================
   RENDERIZAR CARRINHO
   ========================= */

function renderCart() {
  const list = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  if (!list || !totalElement) return;

  list.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.product} - R$ ${item.price.toFixed(2)}
      <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
    `;
    list.appendChild(li);
  });

  totalElement.textContent = total.toFixed(2);
}

/* =========================
   CONTADOR DO CARRINHO
   ========================= */

function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (!countElement) return;

  countElement.textContent = cart.length;
  countElement.style.display = cart.length > 0 ? "flex" : "none";
}

/* =========================
   ABRIR / FECHAR CARRINHO
   ========================= */

function toggleCart() {
  const cartElement = document.getElementById("cart");
  if (cartElement) {
    cartElement.classList.toggle("open");
  }
}

/* =========================
   FINALIZAR COMPRA (WHATSAPP)
   ========================= */

function finalizarCompra() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Quero finalizar minha compra:%0A%0A";

  cart.forEach(item => {
    mensagem += `- ${item.product} | R$ ${item.price.toFixed(2)}%0A`;
  });

  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

  const numero = "5551920049759"; // coloque seu número

  window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
}