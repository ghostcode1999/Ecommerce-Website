/*******************************************
 * Template Name: Topico
 * Updated: Jul 13 2024
 * Author: Ghostcode
 * PSD Designer: GhostCode
 *******************************************/

import { renderCartHTML } from "../modules/data/cart.js";
import { loadProducts } from "../modules/data/products.js";
import {
  select,
  on,
  addClass,
  removeClass,
  onLoad,
} from "../modules/utils/helpers.js";

// #Select needed DOM elements
//-----------------------------
const preloader = select("[data-preloader]");

const navToggler = select("[data-nav-toggler]");
const navCloseBtns = select("[data-nav-close]", true);

const cartToggler = select("[data-cart-toggler]");
const cartCloseBtns = select("[data-cart-close]", true);

// #Hide preloader when page is loaded
//--------------------------------------
onLoad(() => addClass(preloader, "is-hidden"));

// #Render cart html after loading all products
//-----------------------------------------------
async function loadPage() {
  await loadProducts("assets/backend/products.json");
  renderCartHTML();
}

loadPage();

// #Show / Hide navbar menu
//--------------------------
on("click", navToggler, function () {
  addClass(this, "is-active");
});

on(
  "click",
  navCloseBtns,
  () => {
    removeClass(navToggler, "is-active");
  },
  true
);

// #Show / Hide cart menu
//-------------------------
on("click", cartToggler, function () {
  addClass(this, "is-active");
});

on(
  "click",
  cartCloseBtns,
  () => {
    removeClass(cartToggler, "is-active");
  },
  true
);

// #Back to top button
//--------------------
on("click", ".back-to-top", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
