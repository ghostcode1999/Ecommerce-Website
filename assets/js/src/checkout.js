/*------------------------------------------
* Template Name: Topico
* Updated: Jul 14 2024
* Author: Ghostcode
* PSD Designer: GhostCode
--------------------------------------------*/

import { cart, renderCartHTML } from "../modules/data/cart.js";
import { getProduct, loadProducts } from "../modules/data/products.js";
import { on, select } from "../modules/utils/helpers.js";
import { formatCurrency } from "../modules/utils/money.js";

loadPage();

// #LoadPage Function
//---------------------
async function loadPage() {
  await loadProducts("assets/backend/products.json");
  renderCartHTML();
  renderOrderSummaryHTML();
}

// #Render <orderSummaryList> element HTML
//-----------------------------------
function renderOrderSummaryHTML() {
  const orderSummaryList = select("[data-order-summary-list]");
  let orderSummaryHTML = "";

  cart.forEach((item) => {
    const matchingProduct = getProduct(item.productId);

    orderSummaryHTML += `
    <li>
                  <div
                    class="cart__item flex align-center gap-3"
                  >
                    <img
                      src=${matchingProduct.image}
                      alt="product description goes here"
                    />
                    <div>
                      <h6 class="fs-300">
                       ${matchingProduct.name}
                      </h6>
                      <span class="text-neutral-500 fw-medium">$${formatCurrency(
                        matchingProduct.newPriceCents
                      )}</span>
                      <p class="cart__item-quantity">Quantity: <span>${
                        item.quantity
                      }</span></p>
                    </div>
                  </div>
                </li>
    `;
  });

  if (cart.length === 0) {
    orderSummaryHTML = `
    <p>You have no items in your cart.</p>
    `;
  }

  orderSummaryList.innerHTML = orderSummaryHTML;

  const cartDeleteBtns = select("[data-cart-delete-btn]", true);
  on("click", cartDeleteBtns, renderOrderSummaryHTML, true);
}
