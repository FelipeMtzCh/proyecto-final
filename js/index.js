let cart = [];

const btnCart = document.querySelector(".container-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");
const producstList = document.querySelector(".container-products");
const cartTotal = document.querySelector(".cart-total");
const productCounter = document.querySelector("#product-counter");

/* Guardado local de datos */
const savelocal = (clave, valor) => {
  localStorage.setItem(clave, JSON.stringify(valor));
};

const read = (clave) => {
  return JSON.parse(localStorage.getItem(clave));
};

const cartSaved = read("cartProducts");
//cart = cartSaved;

btnCart.onclick = () => {
  containerCartProducts.classList.toggle("hidden-cart");
};

producstList.onclick = (c) => {
  if (c.target.classList.contains("btn-add-cart")) {
    const product = c.target.parentElement;
    const infoProduct = {
      quantity: 1,
      name: product.querySelector(".name").textContent,
      price: product.querySelector(".price").textContent,
    };
    const exists = cart.some((product) => product.name === infoProduct.name);
    if (exists) {
      const products = cart.map((product) => {
        if (product.name === infoProduct.name) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      cart = [...products];
    } else {
      cart = [...cart, infoProduct];
    }
    showNotification();
    showHTML();
    savelocal("cartProducts", cart);
  }
  console.log(cart);
};

rowProduct.onclick = (z) => {
  if (z.target.classList.contains("icon-close")) {
    const product = z.target.parentElement;
    const name = product.querySelector(".product-cart-title").textContent;

    cart = cart.filter((product) => product.name !== name);
    showHTML();
  }
};

const showHTML = () => {
  rowProduct.innerHTML = "";
  let totalProducts = 0;
  let total = 0;

  cart.forEach((product) => {
    const containerProduct = document.createElement("div");
    containerProduct.classList.add("cart-product");
    containerProduct.innerHTML = `
    <div class="info-cart-product">
      <span class="product-quantity"> ${product.quantity} </span>
      <p class="product-cart-title"> ${product.name} </p>
      <span class="product-cart-price"> ${product.price} </span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" class="icon-close icon icon-tabler icon-tabler-circle-x"
      width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
      stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M10 10l4 4m0 -4l-4 4"></path>
    </svg>
    `;

    rowProduct.append(containerProduct);
    total += parseInt(product.quantity * product.price.slice(1));
    totalProducts += product.quantity;
  });
  cartTotal.innerText = `$${total}`;
  productCounter.innerText = totalProducts;
  savelocal("cartTotal", total);
};

function showNotification() {
  Toastify({
    text: "Producto agregado",
    duration: 2000,
    position: "left",
    gravity: "top",
    style: { background: "#734E40" },
    offset: { y: "64px" },
  }).showToast();
}