/*------------------------------------------
* Template Name: Topico
* Updated: Jul 14 2024
* Author: Ghostcode
* PSD Designer: GhostCode
--------------------------------------------*/

import {
  addToCart,
  renderCartHTML,
  updateCartQuantity,
} from "../modules/data/cart.js";
import {
  loadProducts,
  products,
} from "../modules/data/products.js";
import { on, select, toggleClass } from "../modules/utils/helpers.js";
import { calcPrecentDiscount, formatCurrency } from "../modules/utils/money.js";

loadPage();

// #LoadPage Function
//---------------------
async function loadPage() {
  await loadProducts("assets/backend/products.json");
  renderAllProductsHTML();
  renderCartHTML();

  const filterOpenBtn = select("[data-filter-btn-open]");

  on("click", filterOpenBtn, () => toggleClass(filterOpenBtn, "is-clicked"));
}

// #Render <allProducts> element HTML
//-----------------------------------
function renderAllProductsHTML() {
  const allProducts = select("[data-all-products-wrapper]");

  let allProductsHTML = "";

  updateCartQuantity();

  products.forEach((product) => {
    const percentDiscount = calcPrecentDiscount(
      product.newPriceCents,
      product.oldPriceCents
    );

    allProductsHTML += `
      <div class="slider__product swiper-slide flow">
                <div class="product__icons">
                  <button class="cart__add-btn" data-cart-add-btn data-product-id="${
                    product.id
                  }"><i class="fa-solid fa-cart-plus"></i></button>
                  <button><i class="fa-solid fa-heart"></i></button>
                  <button><i class="fa-solid fa-share"></i></button>
                </div>

                <span class="sale-percent">${percentDiscount}%</span>

                <div class="product__img">
                  <img src=${product.image} alt="Image text alt" />
                  <img
                    src=${product.imageHover}
                    alt="Image text alt"
                    class="product__img-hover"
                  />
                </div>
                <h5 class="product__name">
                  <a href="item.html"  data-show-details-btn data-product-id="${product.id}">${
      product.name
    }</a>
                </h5>
                <div class="product__rate">
                <img class="product__rate-stars" src="assets/imgs/ratings/rating-${
                  product.rating.stars * 10
                }.png" alt="Rating stars">
                <span class="product__rate-count">${product.rating.count}</span>
                </div>

      <div class="added-to-cart" data-added-to-cart data-added-to-cart-${
        product.id
      }>
        <img src="assets/imgs/checkmark.png">
        <span>Added</span>
      </div>
                <div class="product__price">
                  <span class="new-price">$${formatCurrency(
                    product.newPriceCents
                  )}</span>
                  <span class="old-price">$${formatCurrency(
                    product.oldPriceCents
                  )}</span>
                </div>
              </div>
      `;
  });

  allProducts.innerHTML = allProductsHTML;

  on(
    "click",
    "[data-cart-add-btn]",
    function () {
      const productId = this.dataset.productId;

      addToCart(productId);
      renderCartHTML();
      updateCartQuantity();
    },
    true
  );

  on(
    "click",
    "[data-show-details-btn]",
    function () {
      localStorage.setItem("productItemId", this.dataset.productId);
    },
    true
  );
}
