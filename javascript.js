// --- FILTRO DE PRODUTOS ---
const navLinks = document.querySelectorAll('.main-nav a');
const produtos = document.querySelectorAll('.produto-card');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href').substring(1);
    produtos.forEach(produto => {
      if (target === 'produtos') {
        produto.style.display = 'block';
      } else if (produto.classList.contains(target)) {
        produto.style.display = 'block';
      } else {
        produto.style.display = 'none';
      }
    });
  });
});

// --- CARRINHO ---
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart');
const toast = document.getElementById('toast');
const cartCount = document.getElementById('cart-count');

let cart = [];

// Abrir e fechar carrinho
openCartBtn.addEventListener('click', () => cartModal.classList.remove('hidden'));
closeCartBtn.addEventListener('click', () => cartModal.classList.add('hidden'));

// Adicionar produto ao carrinho
document.querySelectorAll('.btn-comprar').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.produto-card');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
    showToast('Produto adicionado ao carrinho!');
  });
});

// Atualiza o carrinho
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name}</span>
      <div class="cart-controls">
        <button class="btn-qty" data-id="${item.id}" data-action="decrease">−</button>
        <span>${item.quantity}</span>
        <button class="btn-qty" data-id="${item.id}" data-action="increase">+</button>
      </div>
      <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = `R$ ${total.toFixed(2)}`;

  // Atualiza contador do botão 🛒
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Eventos dos botões + e -
  document.querySelectorAll('.btn-qty').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.target.dataset.id;
      const action = e.target.dataset.action;
      const produto = cart.find(p => p.id === id);
      if (produto) {
        if (action === 'increase') produto.quantity++;
        if (action === 'decrease') produto.quantity--;
        if (produto.quantity <= 0) cart = cart.filter(p => p.id !== id);
      }
      updateCart();
    });
  });
}

// Limpar carrinho
clearCartBtn.addEventListener('click', () => {
  cart = [];
  updateCart();
});

// Finalizar compra (abrir WhatsApp)
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  let mensagem = '📱 *Pedido via site:*\n\n';
  cart.forEach(item => {
    mensagem += `• ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
  });
  mensagem += `\n💰 *Total:* ${cartTotal.textContent}\n\nPor favor, confirme seu pedido.`;

  const numeroWhats = '5547991978372'; // 👈 coloque aqui seu número (com DDI 55 e DDD)
  const url = `https://wa.me/${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');

  showToast('Redirecionando para o WhatsApp...');
});

// Notificação rápida
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2000);
}
// --- CARROSSEL DE IMAGENS ---
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const imgs = carousel.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  let index = 0;

  nextBtn.addEventListener('click', () => {
    imgs[index].classList.remove('active');
    index = (index + 1) % imgs.length;
    imgs[index].classList.add('active');
  });

  prevBtn.addEventListener('click', () => {
    imgs[index].classList.remove('active');
    index = (index - 1 + imgs.length) % imgs.length;
    imgs[index].classList.add('active');
  });
});