/*******************************************
 * Template Name: Topico
 * Updated: Jul 13 2024
 * Author: Ghostcode
 * PSD Designer: GhostCode
 *******************************************/

import { select, on } from "../modules/utils/helpers.js";

import { loadProducts, products } from "../modules/data/products.js";
import {
  addToCart,
  renderCartHTML,
  updateCartQuantity,
} from "../modules/data/cart.js";
import { formatCurrency, calcPrecentDiscount } from "../modules/utils/money.js";

loadPage();

// #LoadPage Function
//--------------------
async function loadPage() {
  await loadProducts("assets/backend/products.json");
  renderProductsHTML();
  renderCartHTML();

  // Initialize Swiper sliders
  new Swiper(".hero__slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 2500,
      pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".hero__slider .swiper-pagination",
      clickable: true,
    },
  });

  new Swiper(".sale__slider", {
    speed: 400,
    loop: true,
    slidesPerView: 4,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1400: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 3,
      },
      350: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  new Swiper(".computer__slider", {
    speed: 400,
    loop: true,
    slidesPerView: 3,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      300: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  new Swiper(".phone__slider", {
    speed: 400,
    loop: true,
    slidesPerView: 3,
    spaceBetween: 10,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      300: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });
}

// #Render home page products HTML
//---------------------------------

function renderProductsHTML() {
  const saleProducts = select("[data-sale-products-wrapper]");
  const computerProducts = select("[data-computer-products-wrapper]");
  const phoneProducts = select("[data-phone-products-wrapper]");

  let saleProductsHTML = "";
  let computerProductsHTML = "";
  let phoneProductsHTML = "";

  updateCartQuantity();

  products.forEach((product) => {
    let productHTML;
    const percentDiscount = calcPrecentDiscount(
      product.newPriceCents,
      product.oldPriceCents
    );
    productHTML = `
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
                  <a href="item.html" data-show-details-btn data-product-id="${
                    product.id
                  }">${product.name}</a>
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

    product.type === "sale"
      ? (saleProductsHTML += productHTML)
      : product.type === "computer"
      ? (computerProductsHTML += productHTML)
      : (phoneProductsHTML += productHTML);
  });

  saleProducts.innerHTML = saleProductsHTML;
  computerProducts.innerHTML = computerProductsHTML;
  phoneProducts.innerHTML = phoneProductsHTML;

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
