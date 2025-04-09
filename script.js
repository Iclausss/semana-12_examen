const products = [
	{ id: 1, name: "Parrillera", price: 24, img: "https://i.ibb.co/F4vL446/photo-1549611016-3a70d82b5040.jpg" },
	{ id: 2, name: "Carnívora", price: 30, img: "https://i.ibb.co/85nTv6c/photo-1553979459-d2229ba7433b.jpg" },
	{ id: 3, name: "Crispy", price: 21, img: "https://i.ibb.co/Dgvt7nk/photo-1568901346375-23c9450c58cd.jpg" },
	{ id: 4, name: "Doble Todo", price: 26, img: "https://i.ibb.co/TRPsQFy/photo-1572802419224-296b0aeee0d9.jpg" },
	{ id: 5, name: "Combo 1", price: 35, img: "https://i.ibb.co/3cnFLSn/photo-1594212699903-ec8a3eca50f5.jpg" },
	{ id: 6, name: "Huachana", price: 25, img: "https://i.ibb.co/b5nHhYY/photo-1606755962773-d324e0a13086.jpg" }
  ];
  
  let cart = {};
  
  const container = document.getElementById("product-container");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const total = document.getElementById("total");
  const emptyCartBtn = document.getElementById("empty-cart");
  const cartPopup = document.getElementById("cart-popup");
  const cartToggle = document.getElementById("cart-toggle");
  
  products.forEach(p => {
	const div = document.createElement("div");
	div.classList.add("card");
	div.innerHTML = `
	  <img src="${p.img}" alt="${p.name}">
	  <h3>${p.name}</h3>
	  <p>S/. ${p.price}</p>
	  <button onclick="addToCart(${p.id})">Añadir al carrito</button>
	`;
	container.appendChild(div);
  });
  
  function addToCart(id) {
	if (cart[id]) {
	  cart[id].quantity += 1;
	} else {
	  const product = products.find(p => p.id === id);
	  cart[id] = { ...product, quantity: 1 };
	}
	updateCart();
  }
  
  function removeFromCart(id) {
	if (cart[id]) {
	  cart[id].quantity -= 1;
	  if (cart[id].quantity <= 0) {
		delete cart[id];
	  }
	}
	updateCart();
  }
  
  emptyCartBtn.addEventListener("click", () => {
	cart = {};
	updateCart();
  });
  
  function updateCart() {
	cartItems.innerHTML = "";
	let sum = 0;
	let count = 0;
  
	for (let id in cart) {
	  const item = cart[id];
	  sum += item.price * item.quantity;
	  count += item.quantity;
	  const li = document.createElement("li");
	  li.innerHTML = `
		${item.name} - S/. ${item.price} x ${item.quantity}
		<button onclick="removeFromCart(${item.id})">X</button>
	  `;
	  cartItems.appendChild(li);
	}
  
	total.textContent = sum.toFixed(2);
	cartCount.textContent = count;
  }
  
  // Mostrar u ocultar carrito con animación
  cartToggle.addEventListener("click", () => {
	if (cartPopup.classList.contains("show")) {
	  cartPopup.classList.remove("show");
	  setTimeout(() => cartPopup.classList.add("hidden"), 300);
	} else {
	  cartPopup.classList.remove("hidden");
	  setTimeout(() => cartPopup.classList.add("show"), 10);
	}
  });
  
  // Cerrar el carrito al hacer clic fuera
  document.addEventListener("click", (e) => {
	const isClickInside = cartPopup.contains(e.target) || cartToggle.contains(e.target);
	if (!isClickInside && cartPopup.classList.contains("show")) {
	  cartPopup.classList.remove("show");
	  setTimeout(() => cartPopup.classList.add("hidden"), 300);
	}
  });
  