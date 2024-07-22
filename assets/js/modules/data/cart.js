import { select, on, addClass, removeClass } from "../utils/helpers.js";
import { formatCurrency } from "../utils/money.js";
import { getProduct } from "./products.js";

let cart;

loadFromStorage();

function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "4",
        quantity: 2,
      },
      {
        productId: "6",
        quantity: 2,
      },
    ];
  }
}

// #Save cart to localStorage
//---------------------------
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// #Add to cart
//--------------
let prevAddedTimer;
function addToCart(productId) {
  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId,
      quantity: 1,
    });
  }
  // Show "Added" message
  const allAddedMsgs = select("[data-added-to-cart]", true);
  const currentAddedMsg = select(`[data-added-to-cart-${productId}]`);

  if (allAddedMsgs && currentAddedMsg) {
    allAddedMsgs.forEach((el) => removeClass(el, "is-shown"));
    addClass(currentAddedMsg, "is-shown");

    if (prevAddedTimer) {
      clearInterval(prevAddedTimer);
    }

    // Hide message after 2s
    const addedTimer = setTimeout(
      () => removeClass(currentAddedMsg, "is-shown"),
      2000
    );

    prevAddedTimer = addedTimer;
  }

  saveCartToStorage();
}

// #Remove from cart
//--------------------
function removeFromCart(productId) {
  cart.forEach((item, index) => {
    if (item.productId === productId) {
      cart.splice(index, 1);
    }
  });
  saveCartToStorage();
}

// #Calculate total cart quantity
//-------------------------------
function calcCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => (cartQuantity += item.quantity));

  return cartQuantity;
}

// #Render Cart HTML
//--------------------
function renderCartHTML() {
  updateCartQuantity();

  const cartItemsWrapper = select("[data-cart-items-wrapper]");
  let cartHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    cartHTML += `
    <div class="cart__item flex justify-center align-center gap-3">
    <img
    src=${matchingProduct.image}
    alt="product description goes here"
                />
                <div>
                <h6 class="fs-200 cart__item-name" data-item-name-${
                  matchingProduct.id
                }>${matchingProduct.name}</h6>
                  <span class="text-neutral-500 fw-medium">$${formatCurrency(
                    matchingProduct.newPriceCents
                  )}</span>
                  <p class="cart__item-quantity" data-item-quantity-${
                    matchingProduct.id
                  }>Quantity: <span>${cartItem.quantity}</span></p>
                  </div>
                <button class="item__delete-btn" data-cart-delete-btn data-product-id="${
                  matchingProduct.id
                }">
                  <i class="fa-solid fa-trash-can fa-lg"></i>
                </button>
              </div>
              `;
  });

  if (cart.length === 0) {
    cartHTML = `
    <p>You have no items in your cart.</p>
    `;
  }

  cartItemsWrapper.innerHTML = cartHTML;

  const cartDeleteBtns = select("[data-cart-delete-btn]", true);
  on(
    "click",
    cartDeleteBtns,
    function () {
      const productId = this.dataset.productId;
      removeFromCart(productId);
      renderCartHTML();
    },
    true
  );

  select("[data-cart-total-price]", true).forEach(
    (el) => (el.textContent = formatCurrency(calcTotalPrice()))
  );
}

// #Update cart quantity HTML
//-----------------------------
function updateCartQuantity() {
  select("[data-cart-quantity]", true).forEach(
    (item) => (item.textContent = calcCartQuantity())
  );
}

// #Claculate the total price
//------------------------------
function calcTotalPrice() {
  let totalPriceCents = 0;

  cart.forEach((item) => {
    const matchingProduct = getProduct(item.productId);

    totalPriceCents += matchingProduct.newPriceCents * item.quantity;
  });

  return totalPriceCents;
}

export {
  cart,
  loadFromStorage,
  addToCart,
  removeFromCart,
  calcCartQuantity,
  updateCartQuantity,
  renderCartHTML,
  calcTotalPrice,
};
