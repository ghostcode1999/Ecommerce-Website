// Vanilla Javascript
// -------------------------
/*******************************************
 * Template Name: Sass Architecture
 * Updated: Nov 12 2023 with Bootstrap v5.3.1
 * Author: Ghostcode
 * PSD Designer: GhostCode
 *******************************************/
//
/** Select DOM Elements
 * @description Helper function to select DOM elements
 * @author Naim Zaaraoui
 * @param {string} selector - Element to select
 * @param {string} all [false] - Specify whether select all matched elements or only first one
 */
const select = (selector, all = false) => {
  selector = selector.trim();
  return all
    ? [...document.querySelectorAll(selector)]
    : document.querySelector(selector);
};

//** Event Listener Helper Function */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    all
      ? selectEl.forEach((e) => e.addEventListener(type, listener))
      : selectEl.addEventListener(type, listener);
  }
};

//** Images lazy loading */
const blurImgDivs = document.querySelectorAll(".blur-load");

blurImgDivs.forEach((div) => {
  const img = div.querySelector("img");

  function loaded() {
    div.classList.add("loaded");
  }

  if (img.complete) {
    loaded();
  } else {
    img.addEventListener("load", loaded);
  }
});

//** Load event listener helper function */
onLoad = (listener) => {
  window.addEventListener("load", listener);
};

//** Scroll event listener helper function */
const onScroll = (el, listener) => {
  el.addEventListener("scroll", listener);
};

//** Toggle nav menu */
const navList = select(".nav__list"),
  cart = select(".cart");

on("click", ".nav__toggler", function () {
  navList.classList.add("is-open");
});
on("click", ".nav__close-btn", function () {
  navList.classList.remove("is-open");
});
on("click", ".overlay", function () {
  navList.classList.remove("is-open");
  cart.classList.remove("is-open");
});

//** Open/Close cart menu */
on("click", ".cart__btn", function () {
  cart.classList.add("is-open");
});

on("click", ".cart__close-btn", function () {
  cart.classList.remove("is-open");
});

const heroSection = select(".hero"),
  header = select("header");

//** Add/remove products from cart */
const itemsInCart = select(".cart .cart__body"),
  cartTotalPrice = select(".cart__total-price", true),
  cartCount = select(".cart__count", true);

let cartProducts = [],
  cartItems = "",
  allProducts;

/* Count products added to cart */
function calcItemsCount() {
  cartCount.forEach((count) => {
    count.textContent = cartProducts.length;
  });
}

/* Calculate cart total price */
function calcCartTotal() {
  let totalPrice = 0;

  cartProducts.forEach((product) => {
    totalPrice += product.new_price;
  });

  cartTotalPrice.forEach((total) => {
    total.textContent = totalPrice;
  });
}

/* Add products info to cart */
function addCartItems() {
  let cartItems = "";

  for (let i = 0; i < cartProducts.length; i++) {
    cartItems += `
<div class="cart__item flex justify-center align-center gap-3">
              <img
                src=${cartProducts[i].img}
                alt="product description goes here"
              />
              <div>
                <h6 class="fs-200">${cartProducts[i].name}</h6>
                <span class="text-neutral-500 fw-medium">$${cartProducts[i].new_price}</span>
              </div>
              <button class="item__delete-btn">
                <i class="fa-solid fa-trash-can fa-lg" onclick="removeFromCart(${i})"></i>
              </button>
            </div>
`;
  }
  itemsInCart.innerHTML = cartItems;
  calcItemsCount();
  calcCartTotal();
}

/* Remove the idth item from cart */
function removeFromCart(id) {
  cartProducts.splice(id, 1);
  addCartItems();

  const addBtns = select(".cart__add-btn", true);
  addBtns.forEach((btn, i) => {
    btn.classList.remove("active");

    cartProducts.forEach((product) => {
      if ((product.id = i)) {
        btn.classList.add("active");
      }
    });
  });
}

/* Add item to cart when add button is clicked */
function addToCart(id, btn) {
  cartProducts.push(allProducts[id]);
  btn.classList.add("active");
  addCartItems();
}

//** Load products from .json file */

fetch("js/products.json")
  .then((response) => response.json())
  .then((data) => {
    const saleProducts = select("#sale__products"),
      computerProducts = select("#computer__products"),
      phoneProducts = select("#phone__products");
    allProducts = data;

    data.forEach((product) => {
      const percentDiscount = Math.floor(
        ((product.new_price - product.old_price) / product.old_price) * 100
      );
      if (saleProducts) {
        saleProducts.innerHTML += `
      <div class="slider__product swiper-slide flow">
                <div class="product__icons">
                  <button class="cart__add-btn" onclick="addToCart(${product.id}, this)"><i class="fa-solid fa-cart-plus"></i></button>
                  <button><i class="fa-solid fa-heart"></i></button>
                  <button><i class="fa-solid fa-share"></i></button>
                </div>

                <span class="sale-percent">${percentDiscount}%</span>

                <div class="product__img">
                  <img src=${product.img} alt="Image text alt" />
                  <img
                    src=${product.img_hover}
                    alt="Image text alt"
                    class="product__img-hover"
                  />
                </div>
                <h5 class="product__name">
                  <a href="#">${product.name}</a>
                </h5>
                <ul class="product__rate">
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
                <div class="product__price">
                  <span class="new-price">$${product.new_price}</span>
                  <span class="old-price">$${product.old_price}</span>
                </div>
              </div>
      `;
      }

      if (computerProducts) {
        computerProducts.innerHTML += `
      <div class="slider__product swiper-slide flow">
                <div class="product__icons">
                  <button class="cart__add-btn" onclick="addToCart(${product.id}, this)"><i class="fa-solid fa-cart-plus"></i></button>
                  <button><i class="fa-solid fa-heart"></i></button>
                  <button><i class="fa-solid fa-share"></i></button>
                </div>

                <div class="product__img">
                  <img src=${product.img} alt="Image text alt" />
                  <img
                    src=${product.img_hover}
                    alt="Image text alt"
                    class="product__img-hover"
                  />
                </div>
                <h5 class="product__name">
                  <a href="#">${product.name}</a>
                </h5>
                <ul class="product__rate">
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
                <div class="product__price">
                  <span class="new-price">$${product.new_price}</span>
                </div>
              </div>
      `;
      }
      if (phoneProducts) {
        phoneProducts.innerHTML += `
      <div class="slider__product swiper-slide flow">
                <div class="product__icons">
                  <button class="cart__add-btn" onclick="addToCart(${product.id}, this)"><i class="fa-solid fa-cart-plus"></i></button>
                  <button><i class="fa-solid fa-heart"></i></button>
                  <button><i class="fa-solid fa-share"></i></button>
                </div>

                <div class="product__img">
                  <img src=${product.img} alt="Image text alt" />
                  <img
                    src=${product.img_hover}
                    alt="Image text alt"
                    class="product__img-hover"
                  />
                </div>
                <h5 class="product__name">
                  <a href="#">${product.name}</a>
                </h5>
                <ul class="product__rate">
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                  <li><i class="fa fa-star"></i></li>
                </ul>
                <div class="product__price">
                  <span class="new-price">$${product.new_price}</span>
                </div>
              </div>
      `;
      }
    });
  });

//** Back to top button */
on("click", ".back-to-top", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//** Toggle between item images */
on("click", ".item__img__alts img", function() {
  select(".item__img__main").src = this.src;
}, true)

//** Initialize Swiper sliders */
const heroSwiper = new Swiper(".hero__slider", {
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

const saleSwiper = new Swiper(".sale__slider", {
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

const computerSwiper = new Swiper(".computer__slider", {
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

const phoneSwiper = new Swiper(".phone__slider", {
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
