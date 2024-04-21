fetch("js/products.json")
  .then((response) => response.json())
  .then((data) => {
    const 
      allProducts = select(".all-products__list");

    data.forEach((product) => {
      const percentDiscount = Math.floor(
        ((product.new_price - product.old_price) / product.old_price) * 100
      );
      if (allProducts) {
        allProducts.innerHTML += `
      <div class="slider__product flow">
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
    });
  });
