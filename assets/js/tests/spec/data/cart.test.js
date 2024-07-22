import {
  addToCart,
  removeFromCart,
  cart,
  loadFromStorage,
  calcCartQuantity,
  renderCartHTML,
} from "../../../modules/data/cart.js";
import { loadProducts } from "../../../modules/data/products.js";
import { select } from "../../../modules/utils/helpers.js";

describe("Test suite: addToCart()", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("Should ONLY increase item quantity when existing product is passed", () => {
    spyOn(localStorage, "getItem").and.callFake(() =>
      JSON.stringify([
        {
          productId: "1",
          quantity: 1,
        },
      ])
    );

    loadFromStorage();
    addToCart("1");

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("1");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("Should add a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([]));

    loadFromStorage();

    addToCart("2");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      '[{"productId":"2","quantity":1}]'
    );

    addToCart("3");
    expect(cart.length).toEqual(2);
    expect(cart[1].quantity).toEqual(1);

    expect(localStorage.getItem).toHaveBeenCalledBefore(localStorage.setItem);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });
});

describe("Test suite: removeFromCart()", () => {
  it("Should remove a product from the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() =>
      JSON.stringify([
        {
          productId: "3",
          quantity: 4,
        },
        {
          productId: "5",
          quantity: 2,
        },
      ])
    );

    loadFromStorage();
    removeFromCart("3");
    const cartQuantity = calcCartQuantity();

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("5");
    expect(cartQuantity).toEqual(2);

    removeFromCart("5");
    expect(localStorage.setItem).toHaveBeenCalledWith("cart", "[]");
  });
});

describe("Test suite: renderCartHTML()", () => {
  const productId1 = "0";
  const productId2 = "1";

  beforeAll(async () => {
    await loadProducts("../../../assets/backend/products.json");
  });

  beforeEach(async () => {
    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() =>
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
        },
        {
          productId: productId2,
          quantity: 4,
        },
      ])
    );

    loadFromStorage();
    renderCartHTML();
  });

  it("Should display the cart", () => {
    expect(select(".cart__item", true).length).toEqual(2);
    expect(select(`[data-item-quantity-${productId1}]`).textContent).toContain(
      "Quantity: 2"
    );
    expect(select(`[data-item-name-${productId1}`).textContent).toContain(
      "Original Mobile Android Dual SIM Smart Phone G3"
    );
  });

  it("Should removes an item", () => {
    select(`[data-cart-delete-btn][data-product-id="${productId1}"]`).click();

    expect(select(".cart__item", true).length).toEqual(1);
    expect(select(`[data-item-quantity-${productId1}]`)).toEqual(null);
    expect(select(`[data-item-quantity-${productId2}]`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  afterEach(() => {
    select("[data-cart-items-wrapper]").innerHTML = "";
  });
});
