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
  products,
  getProduct,
  loadProducts,
} from "../modules/data/products.js";
import { on, select } from "../modules/utils/helpers.js";
import { calcPrecentDiscount, formatCurrency } from "../modules/utils/money.js";

loadPage();

// #LoadPage Function
//---------------------
async function loadPage() {
  await loadProducts("assets/backend/products.json");
  renderItemHTML();
  renderSaleProductsHTML();

  const itemSaleSwiper = new Swiper(".item-sale-slider", {
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
}

// #Render <itemDetailWrapper> element HTML
//------------------------------------------
function renderItemHTML() {
  const itemDetailWrapper = select("[data-item-detail-wrapper]");
  const productItem = getProduct(localStorage.getItem("productItemId"));

  if (productItem) {
    itemDetailWrapper.innerHTML = `
  <div class="item__img g-row__inner g-col-lg-5">
            <div>
              <img
                src=${productItem.image}
                alt="Image alt text"
                class="item__img__main"
                data-item-image
              />
            </div>
            <ul class="item__img__alts flex justify-center   offset-start-2 offset-end-12 offset-start-sm-3 offset-end-sm-11 gap-1 offset-start-lg-2 offset-end-lg-11" data-item-thumbs>
              <li>
                <img src="assets/imgs/product/product1.jpg" alt="Image alt text" />
              </li>
              <li>
                <img src="assets/imgs/product/product-1.jpg" alt="Image alt text" />
              </li>
              <li>
                <img src="assets/imgs/product/product2.jpg" alt="Image alt text" />
              </li>
              <li>
                <img src="assets/imgs/product/product-2.jpg" alt="Image alt text" />
              </li>
            </ul>
          </div>
          <div class="item__details flow g-col-lg-7">
            <h4>${productItem.name}</h4>
            <div class="product__rate">
              <img class="product__rate-stars" src="assets/imgs/ratings/rating-${
                productItem.rating.stars * 10
              }.png" alt="Rating stars">
            </div>
            <div class="product__price">
              <span class="new-price">$${formatCurrency(
                productItem.newPriceCents
              )}</span>
              <span class="old-price">$${formatCurrency(
                productItem.oldPriceCents
              )}</span>
            </div>
            <h6>
              Availability: <span class="text-primary-500">In Stock</span>
            </h6>
            <h6>
              SKU: <span class="text-primary-500">Sumsung G2345 M789</span>
            </h6>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut
              consectetur, nihil magni reiciendis tenetur, vero voluptatibus,
              iste quam voluptatem quo distinctio corrupti doloremque nostrum a
              dignissimos eos. Repudiandae sit fuga deserunt, obcaecati natus
              ipsum, voluptatum est nam, quod quas rem.
            </p>
            <h6>Hurry up! Only ${
              productItem.rating.count
            } products left in stock.</h6>
            <button class="btn align-center gap-2 m-block-end-3" data-type="primary" data-cart-add-btn data-product-id="${
              productItem.id
            }">
              Add to cart <i class="fa-solid fa-cart-arrow-down"></i>
            </button>
            <div class="item__icons flex gap-2">
              <button><i class="fa-regular fa-heart"></i></button>
              <button><i class="fa-solid fa-sliders"></i></button>
              <button><i class="fa-solid fa-print"></i></button>
              <button><i class="fa-solid fa-share-nodes"></i></button>
            </div>
          </div>
  
  `;
  }

  on(
    "click",
    "[data-item-thumbs] img",
    function () {
      select("[data-item-image]").src = this.src;
    },
    true
  );
}

// #Render <saleProducts> element HTML
//------------------------------------
function renderSaleProductsHTML() {
  const saleProducts = select("[data-sale-products-wrapper]");
  let saleProductsHTML = "";

  updateCartQuantity();

  products.forEach((product) => {
    const percentDiscount = calcPrecentDiscount(
      product.newPriceCents,
      product.oldPriceCents
    );
    if (product.type === "sale") {
      saleProductsHTML += `
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
    }
  });
  saleProducts.innerHTML = saleProductsHTML;

  on(
    "click",
    "[data-show-details-btn]",
    function () {
      localStorage.setItem("productItemId", this.dataset.productId);
    },
    true
  );
}
